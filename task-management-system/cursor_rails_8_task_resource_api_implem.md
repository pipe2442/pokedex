# Rails 8 Task resource API implementation
_Exported on 1/12/2026 at 20:37:37 GMT-5 from Cursor (2.2.44)_

---

**User**

You are a senior Ruby on Rails engineer.

Generate a Rails 8 API implementation for a Task resource (CRUD) with the following requirements:

Domain:
- Task fields: title (string, required), description (text, optional), status (enum), due_date (date), user_id (required FK).
- A basic User model exists.
- All Task access must be scoped to the authenticated user.

Auth / Security:
- Assume we already have JWT auth implemented with a current_user helper and a before_action :authenticate_user!.
- Never allow user_id to be set via params. Always assign task.user = current_user.
- If a user tries to access another user's task, respond with 404 (do not leak existence).

API:
- Routes: index, show, create, update, destroy under /tasks.
- JSON responses only. Use proper status codes (200, 201, 204, 401, 404, 422).
- Provide consistent error responses: { error: "...", details: {...} } for 422.

Model:
- status enum: todo, in_progress, done (default: todo).
- Validations: title presence, status inclusion.

Implementation:
- Include: migration, model, controller, strong params, and a simple serializer/presenter (plain Ruby method is fine).
- Add DB indexes for user_id and due_date.

Testing:
- Add request specs (RSpec preferred) for:
  1) auth required (401),
  2) index returns only current_user tasks,
  3) create validates fields (422),
  4) cannot access another user's task (404),
  5) update and delete happy path.

Output:
- Provide the code with file paths and explain any assumptions.


---

**Cursor**

```gemfile
source "https://rubygems.org"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 8.1.2"
# Use postgresql as the database for Active Record
gem "pg", "~> 1.1"
# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ windows jruby ]

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin Ajax possible
# gem "rack-cors"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "rspec-rails"
  gem "factory_bot_rails"
end

group :test do
  gem "shoulda-matchers"
end

```

```ruby
class ApplicationController < ActionController::API
  before_action :authenticate_user!

  def current_user
    # Simplified assumed JWT logic
    @current_user ||= User.find_by(id: decode_auth_token) if request.headers['Authorization'].present?
  end

  def authenticate_user!
    render json: { error: 'Not Authorized' }, status: :unauthorized unless current_user
  end

  private

  def decode_auth_token
    # In a real app, this would decode the JWT.
    # For this exercise, we'll assume the token IS the user ID.
    request.headers['Authorization']&.split(' ')&.last
  end
end

```

```ruby
class AddIndexToTasksDueDate < ActiveRecord::Migration[8.0]
  def change
    add_index :tasks, :due_date
  end
end

```

```ruby
class CreateTasks < ActiveRecord::Migration[8.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.integer :status, default: 0, null: false
      t.date :due_date
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :tasks, :due_date
  end
end

```

```ruby
class Task < ApplicationRecord
  belongs_to :user

  enum :status, { todo: 0, in_progress: 1, done: 2 }, default: :todo

  validates :title, presence: true
  validates :status, inclusion: { in: statuses.keys }
end

```

```ruby
class TasksController < ApplicationController
  before_action :set_task, only: %i[show update destroy]

  # GET /tasks
  def index
    @tasks = current_user.tasks
    render json: @tasks.map { |task| serialize(task) }
  end

  # GET /tasks/1
  def show
    render json: serialize(@task)
  end

  # POST /tasks
  def create
    @task = current_user.tasks.build(task_params)

    if @task.save
      render json: serialize(@task), status: :created
    else
      render_error(@task.errors)
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: serialize(@task)
    else
      render_error(@task.errors)
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
    head :no_content
  end

  private

  # Scoping task access to the current user.
  # If the task doesn't exist or belongs to someone else, it will raise ActiveRecord::RecordNotFound.
  def set_task
    @task = current_user.tasks.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Task not found' }, status: :not_found
  end

  # Strong parameters, excluding user_id.
  def task_params
    params.require(:task).permit(:title, :description, :status, :due_date)
  end

  # Simple serializer method.
  def serialize(task)
    {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date,
      user_id: task.user_id,
      created_at: task.created_at,
      updated_at: task.updated_at
    }
  end

  # Consistent error formatting for 422.
  def render_error(errors)
    render json: {
      error: 'Unprocessable Entity',
      details: errors.as_json
    }, status: :unprocessable_entity
  end
end

```

```ruby
Rails.application.routes.draw do
  resources :tasks
end

```

```ruby
class User < ApplicationRecord
  has_many :tasks, dependent: :destroy
end

```

```ruby
FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
  end
end

```

```ruby
FactoryBot.define do
  factory :task do
    title { "Sample Task" }
    description { "This is a sample task description" }
    status { :todo }
    due_date { Date.today + 7.days }
    association :user
  end
end

```

```ruby
require 'rails_helper'

RSpec.describe "Tasks", type: :request do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  # Our assumed auth logic: Authorization header is just the user id.
  let(:headers) { { 'Authorization' => "Bearer #{user.id}" } }
  let(:other_user_headers) { { 'Authorization' => "Bearer #{other_user.id}" } }

  describe "GET /tasks" do
    it "returns 401 if not authenticated" do
      get tasks_path
      expect(response).to have_http_status(:unauthorized)
    end

    it "returns only current_user tasks" do
      create(:task, user: user, title: "My Task")
      create(:task, user: other_user, title: "Other User Task")

      get tasks_path, headers: headers
      
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.size).to eq(1)
      expect(json.first['title']).to eq("My Task")
    end
  end

  describe "GET /tasks/:id" do
    let(:task) { create(:task, user: user) }
    let(:other_task) { create(:task, user: other_user) }

    it "returns the task if it belongs to current_user" do
      get task_path(task), headers: headers
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['id']).to eq(task.id)
    end

    it "returns 404 if the task belongs to another user" do
      get task_path(other_task), headers: headers
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /tasks" do
    let(:valid_attributes) { { task: { title: "New Task", description: "Desc", due_date: "2026-12-31" } } }
    let(:invalid_attributes) { { task: { title: "", status: "invalid_status" } } }

    it "creates a new task for the current user" do
      expect {
        post tasks_path, params: valid_attributes, headers: headers
      }.to change(Task, :count).by(1)

      expect(response).to have_http_status(:created)
      expect(Task.last.user).to eq(user)
    end

    it "returns 422 with error details for invalid attributes" do
      post tasks_path, params: invalid_attributes, headers: headers
      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json).to have_key('error')
      expect(json).to have_key('details')
    end

    it "does not allow setting user_id via params" do
      post tasks_path, params: { task: { title: "Spaced", user_id: other_user.id } }, headers: headers
      expect(Task.last.user).to eq(user)
    end
  end

  describe "PATCH /tasks/:id" do
    let(:task) { create(:task, user: user) }

    it "updates the task" do
      patch task_path(task), params: { task: { title: "Updated Title" } }, headers: headers
      expect(response).to have_http_status(:ok)
      expect(task.reload.title).to eq("Updated Title")
    end

    it "returns 404 for another user's task" do
      other_task = create(:task, user: other_user)
      patch task_path(other_task), params: { task: { title: "Sneaky" } }, headers: headers
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "DELETE /tasks/:id" do
    let!(:task) { create(:task, user: user) }

    it "deletes the task" do
      expect {
        delete task_path(task), headers: headers
      }.to change(Task, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end

    it "returns 404 for another user's task" do
      other_task = create(:task, user: other_user)
      expect {
        delete task_path(other_task), headers: headers
      }.not_to change(Task, :count)
      expect(response).to have_http_status(:not_found)
    end
  end
end

```

```ruby
# This file is copied to spec/ when you run 'rails generate rspec:install'
require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
# Uncomment the line below in case you have `--require rails_helper` in the `.rspec` file
# that will avoid rails generators crashing because migrations haven't been run yet
# return unless Rails.env.test?
require 'rspec/rails'
# Add additional requires below this line. Rails is not loaded until this point!

# Requires supporting ruby files with custom matchers and macros, etc, in
# spec/support/ and its subdirectories. Files matching `spec/**/*_spec.rb` are
# run as spec files by default. This means that files in spec/support that end
# in _spec.rb will both be required and run as specs, causing the specs to be
# run twice. It is recommended that you do not name files matching this glob to
# end with _spec.rb. You can configure this pattern with the --pattern
# option on the command line or in ~/.rspec, .rspec or `.rspec-local`.
#
# The following line is provided for convenience purposes. It has the downside
# of increasing the boot-up time by auto-requiring all files in the support
# directory. Alternatively, in the individual `*_spec.rb` files, manually
# require only the support files necessary.
#
# Rails.root.glob('spec/support/**/*.rb').sort_by(&:to_s).each { |f| require f }

# Ensures that the test database schema matches the current schema file.
# If there are pending migrations it will invoke `db:test:prepare` to
# recreate the test database by loading the schema.
# If you are not using ActiveRecord, you can remove these lines.
begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  abort e.to_s.strip
end
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
  # ...
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_paths = [
    Rails.root.join('spec/fixtures')
  ]

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true

  # You can uncomment this line to turn off ActiveRecord support entirely.
  # config.use_active_record = false

  # RSpec Rails uses metadata to mix in different behaviours to your tests,
  # for example enabling you to call `get` and `post` in request specs. e.g.:
  #
  #     RSpec.describe UsersController, type: :request do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://rspec.info/features/8-0/rspec-rails
  #
  # You can also this infer these behaviours automatically by location, e.g.
  # /spec/models would pull in the same behaviour as `type: :model` but this
  # behaviour is considered legacy and will be removed in a future version.
  #
  # To enable this behaviour uncomment the line below.
  # config.infer_spec_type_from_file_location!

  # Filter lines from Rails gems in backtraces.
  config.filter_rails_from_backtrace!
  # arbitrary gems may also be filtered via:
  # config.filter_gems_from_backtrace("gem name")
end

```

```ruby
class ApplicationController < ActionController::API
  before_action :authenticate_user!

  rescue_from ArgumentError do |e|
    render json: { error: 'Invalid argument', details: e.message }, status: :unprocessable_entity
  end

  def current_user
    # Simplified assumed JWT logic
    @current_user ||= User.find_by(id: decode_auth_token) if request.headers['Authorization'].present?
  end

  def authenticate_user!
    render json: { error: 'Not Authorized' }, status: :unauthorized unless current_user
  end

  private

  def decode_auth_token
    # In a real app, this would decode the JWT.
    # For this exercise, we'll assume the token IS the user ID.
    request.headers['Authorization']&.split(' ')&.last
  end
end

```

I have implemented the Rails 8 API for the `Task` resource as requested.

### Implementation Details & Assumptions

1.  **Authentication**: Since the codebase was empty, I implemented a simplified version of the "assumed" JWT authentication in `ApplicationController`. It looks for a `Bearer` token in the `Authorization` header and treats the token as the `user_id`.
2.  **Scoping**: All task operations are performed through `current_user.tasks`. This ensures that users can only access their own data.
3.  **Security**: The `task_params` explicitly excludes `user_id` to prevent mass-assignment vulnerabilities. The `set_task` method uses `current_user.tasks.find(params[:id])`, which automatically raises an `ActiveRecord::RecordNotFound` (rendered as 404) if the task belongs to another user.
4.  **Error Handling**: I added a global rescue in `ApplicationController` for `ArgumentError` to handle invalid enum values gracefully with a 422 response.
5.  **Database**: I used PostgreSQL with proper indexes on `user_id` (via `references`) and `due_date`.

### Code Files

#### 1. Task Migration

```1:16:db/migrate/20260113011619_create_tasks.rb
class CreateTasks < ActiveRecord::Migration[8.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.integer :status, default: 0, null: false
      t.date :due_date
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :tasks, :due_date
  end
end
```

#### 2. Task Model

```1:8:app/models/task.rb
class Task < ApplicationRecord
  belongs_to :user

  enum :status, { todo: 0, in_progress: 1, done: 2 }, default: :todo

  validates :title, presence: true
  validates :status, inclusion: { in: statuses.keys }
end
```

#### 3. Tasks Controller

```1:62:app/controllers/tasks_controller.rb
class TasksController < ApplicationController
  before_action :set_task, only: %i[show update destroy]

  # GET /tasks
  def index
    @tasks = current_user.tasks
    render json: @tasks.map { |task| serialize(task) }
  end

  # GET /tasks/1
  def show
    render json: serialize(@task)
  end

  # POST /tasks
  def create
    @task = current_user.tasks.build(task_params)

    if @task.save
      render json: serialize(@task), status: :created
    else
      render_error(@task.errors)
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: serialize(@task)
    else
      render_error(@task.errors)
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_task
    @task = current_user.tasks.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Task not found' }, status: :not_found
  end

  def task_params
    params.require(:task).permit(:title, :description, :status, :due_date)
  end

  def serialize(task)
    {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date,
      user_id: task.user_id,
      created_at: task.created_at,
      updated_at: task.updated_at
    }
  end

  def render_error(errors)
    render json: {
      error: 'Unprocessable Entity',
      details: errors.as_json
    }, status: :unprocessable_entity
  end
end
```

#### 4. Application Controller (Auth Context)

```1:21:app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  before_action :authenticate_user!

  rescue_from ArgumentError do |e|
    render json: { error: 'Invalid argument', details: e.message }, status: :unprocessable_entity
  end

  def current_user
    # Simplified assumed JWT logic for this exercise
    @current_user ||= User.find_by(id: decode_auth_token) if request.headers['Authorization'].present?
  end

  def authenticate_user!
    render json: { error: 'Not Authorized' }, status: :unauthorized unless current_user
  end

  private

  def decode_auth_token
    request.headers['Authorization']&.split(' ')&.last
  end
end
```

### Testing

I implemented comprehensive request specs covering all the required scenarios. All 11 examples pass.

```bash
bundle exec rspec spec/requests/tasks_spec.rb
```

The specs verify:
- **401 Unauthorized** when no token is provided.
- **Scoped index** returns only the current user's tasks.
- **404 Not Found** when attempting to access another user's task.
- **422 Unprocessable Entity** for validation failures (title presence, invalid enum status).
- **Strong params** protection against setting `user_id`.
- **Happy path** for create, update, and destroy.

```ruby
class CreateTasks < ActiveRecord::Migration[8.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.integer :status, default: 0, null: false
      t.date :due_date
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :tasks, :due_date
  end
end
```

```ruby
class Task < ApplicationRecord
  belongs_to :user

  enum :status, { todo: 0, in_progress: 1, done: 2 }, default: :todo

  validates :title, presence: true
  validates :status, inclusion: { in: statuses.keys }
end
```

```ruby
class TasksController < ApplicationController
  before_action :set_task, only: %i[show update destroy]

  # GET /tasks
  def index
    @tasks = current_user.tasks
    render json: @tasks.map { |task| serialize(task) }
  end

  # GET /tasks/1
  def show
    render json: serialize(@task)
  end

  # POST /tasks
  def create
    @task = current_user.tasks.build(task_params)

    if @task.save
      render json: serialize(@task), status: :created
    else
      render_error(@task.errors)
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: serialize(@task)
    else
      render_error(@task.errors)
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_task
    @task = current_user.tasks.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Task not found' }, status: :not_found
  end

  def task_params
    params.require(:task).permit(:title, :description, :status, :due_date)
  end

  def serialize(task)
    {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date,
      user_id: task.user_id,
      created_at: task.created_at,
      updated_at: task.updated_at
    }
  end

  def render_error(errors)
    render json: {
      error: 'Unprocessable Entity',
      details: errors.as_json
    }, status: :unprocessable_entity
  end
end
```

```ruby
class ApplicationController < ActionController::API
  before_action :authenticate_user!

  rescue_from ArgumentError do |e|
    render json: { error: 'Invalid argument', details: e.message }, status: :unprocessable_entity
  end

  def current_user
    # Simplified assumed JWT logic for this exercise
    @current_user ||= User.find_by(id: decode_auth_token) if request.headers['Authorization'].present?
  end

  def authenticate_user!
    render json: { error: 'Not Authorized' }, status: :unauthorized unless current_user
  end

  private

  def decode_auth_token
    request.headers['Authorization']&.split(' ')&.last
  end
end
```

```shellscript
bundle exec rspec spec/requests/tasks_spec.rb
```

---

**User**

You are a senior Ruby on Rails engineer focused on quality, testing, and production readiness.

Review the existing Task Management API codebase and improve the test suite with the following goals:

1. Add comprehensive model-level RSpec tests for the Task model, covering:
   - title presence validation
   - status enum inclusion (todo, in_progress, done)
   - default status behavior
   - association with User
   - due_date type and basic validity

2. Add edge-case tests to ensure:
   - A Task cannot be created without a user
   - A Task cannot be created with an invalid status
   - user_id cannot be mass-assigned via params

3. Refactor any fragile or duplicated request specs to keep the suite clean and maintainable.

4. Ensure the entire test suite passes and reflects idiomatic RSpec style.

Provide only the additional specs and any minimal code changes required.


---

**Cursor**

```ruby
# This file is copied to spec/ when you run 'rails generate rspec:install'
require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
# Uncomment the line below in case you have `--require rails_helper` in the `.rspec` file
# that will avoid rails generators crashing because migrations haven't been run yet
# return unless Rails.env.test?
require 'rspec/rails'
# Add additional requires below this line. Rails is not loaded until this point!

# Requires supporting ruby files with custom matchers and macros, etc, in
# spec/support/ and its subdirectories. Files matching `spec/**/*_spec.rb` are
# run as spec files by default. This means that files in spec/support that end
# in _spec.rb will both be required and run as specs, causing the specs to be
# run twice. It is recommended that you do not name files matching this glob to
# end with _spec.rb. You can configure this pattern with the --pattern
# option on the command line or in ~/.rspec, .rspec or `.rspec-local`.
#
# The following line is provided for convenience purposes. It has the downside
# of increasing the boot-up time by auto-requiring all files in the support
# directory. Alternatively, in the individual `*_spec.rb` files, manually
# require only the support files necessary.
#
# Rails.root.glob('spec/support/**/*.rb').sort_by(&:to_s).each { |f| require f }

# Ensures that the test database schema matches the current schema file.
# If there are pending migrations it will invoke `db:test:prepare` to
# recreate the test database by loading the schema.
# If you are not using ActiveRecord, you can remove these lines.
begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  abort e.to_s.strip
end
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
  # ...
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_paths = [
    Rails.root.join('spec/fixtures')
  ]

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true

  # You can uncomment this line to turn off ActiveRecord support entirely.
  # config.use_active_record = false

  # RSpec Rails uses metadata to mix in different behaviours to your tests,
  # for example enabling you to call `get` and `post` in request specs. e.g.:
  #
  #     RSpec.describe UsersController, type: :request do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://rspec.info/features/8-0/rspec-rails
  #
  # You can also this infer these behaviours automatically by location, e.g.
  # /spec/models would pull in the same behaviour as `type: :model` but this
  # behaviour is considered legacy and will be removed in a future version.
  #
  # To enable this behaviour uncomment the line below.
  # config.infer_spec_type_from_file_location!

  # Filter lines from Rails gems in backtraces.
  config.filter_rails_from_backtrace!
  # arbitrary gems may also be filtered via:
  # config.filter_gems_from_backtrace("gem name")
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

```

```ruby
require 'rails_helper'

RSpec.describe Task, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
    
    it 'is invalid without a user' do
      task = build(:task, user: nil)
      expect(task).not_to be_valid
      expect(task.errors[:user]).to include('must exist')
    end

    it 'is valid with a todo status' do
      task = build(:task, status: :todo)
      expect(task).to be_valid
    end

    it 'is valid with an in_progress status' do
      task = build(:task, status: :in_progress)
      expect(task).to be_valid
    end

    it 'is valid with a done status' do
      task = build(:task, status: :done)
      expect(task).to be_valid
    end

    it 'is invalid with an invalid status' do
      expect {
        build(:task, status: :invalid_status)
      }.to raise_error(ArgumentError, "'invalid_status' is not a valid status")
    end
  end

  describe 'defaults' do
    it 'defaults status to todo' do
      task = Task.new
      expect(task.status).to eq('todo')
    end
  end

  describe 'due_date' do
    it 'allows a valid date' do
      task = build(:task, due_date: Date.today)
      expect(task).to be_valid
    end

    it 'allows nil due_date' do
      task = build(:task, due_date: nil)
      expect(task).to be_valid
    end

    it 'handles date types correctly' do
      task = build(:task, due_date: '2026-01-12')
      expect(task.due_date).to be_a(Date)
    end
  end
end

```

```ruby
require 'rails_helper'

RSpec.describe "Tasks API", type: :request do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:headers) { { 'Authorization' => "Bearer #{user.id}" } }
  
  # Helper to parse JSON response
  def json_response
    JSON.parse(response.body)
  end

  describe "GET /tasks" do
    context "when unauthenticated" do
      it "returns 401 Unauthorized" do
        get tasks_path
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when authenticated" do
      before do
        create_list(:task, 3, user: user)
        create_list(:task, 2, user: other_user)
      end

      it "returns only tasks belonging to the current user" do
        get tasks_path, headers: headers
        
        expect(response).to have_http_status(:ok)
        expect(json_response.size).to eq(3)
        expect(json_response.all? { |t| t['user_id'] == user.id }).to be true
      end
    end
  end

  describe "GET /tasks/:id" do
    let(:task) { create(:task, user: user) }
    let(:other_task) { create(:task, user: other_user) }

    it "returns the task when it belongs to the user" do
      get task_path(task), headers: headers
      expect(response).to have_http_status(:ok)
      expect(json_response['id']).to eq(task.id)
    end

    it "returns 404 when the task belongs to another user" do
      get task_path(other_task), headers: headers
      expect(response).to have_http_status(:not_found)
      expect(json_response['error']).to eq('Task not found')
    end
  end

  describe "POST /tasks" do
    let(:valid_params) do
      { task: { title: "New Task", description: "Task description", status: "todo", due_date: Date.tomorrow } }
    end

    it "creates a new task and assigns it to the current user" do
      expect {
        post tasks_path, params: valid_params, headers: headers
      }.to change(user.tasks, :count).by(1)

      expect(response).to have_http_status(:created)
      expect(json_response['title']).to eq("New Task")
      expect(json_response['user_id']).to eq(user.id)
    end

    it "ignores user_id in params and assigns to current_user" do
      params_with_user_id = valid_params.deep_merge(task: { user_id: other_user.id })
      
      post tasks_path, params: params_with_user_id, headers: headers
      
      expect(json_response['user_id']).to eq(user.id)
      expect(Task.last.user_id).not_to eq(other_user.id)
    end

    it "returns 422 for missing required fields" do
      post tasks_path, params: { task: { title: "" } }, headers: headers
      
      expect(response).to have_http_status(:unprocessable_entity)
      expect(json_response['error']).to eq('Unprocessable Entity')
      expect(json_response['details']['title']).to include("can't be blank")
    end

    it "returns 422 for invalid status" do
      post tasks_path, params: { task: { title: "Task", status: "invalid" } }, headers: headers
      
      expect(response).to have_http_status(:unprocessable_entity)
      expect(json_response['error']).to eq('Invalid argument')
    end
  end

  describe "PATCH /tasks/:id" do
    let(:task) { create(:task, user: user) }

    it "updates the task when authorized" do
      patch task_path(task), params: { task: { title: "Updated Title" } }, headers: headers
      
      expect(response).to have_http_status(:ok)
      expect(task.reload.title).to eq("Updated Title")
    end

    it "cannot update another user's task" do
      other_task = create(:task, user: other_user)
      patch task_path(other_task), params: { task: { title: "Hack" } }, headers: headers
      
      expect(response).to have_http_status(:not_found)
      expect(other_task.reload.title).not_to eq("Hack")
    end
  end

  describe "DELETE /tasks/:id" do
    let!(:task) { create(:task, user: user) }

    it "deletes the task when authorized" do
      expect {
        delete task_path(task), headers: headers
      }.to change(user.tasks, :count).by(-1)
      
      expect(response).to have_http_status(:no_content)
    end

    it "cannot delete another user's task" do
      other_task = create(:task, user: other_user)
      expect {
        delete task_path(other_task), headers: headers
      }.not_to change(Task, :count)
      
      expect(response).to have_http_status(:not_found)
    end
  end
end

```

```ruby
require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:tasks).dependent(:destroy) }
  end
end

```

I have enhanced the test suite for the Task Management API, ensuring comprehensive coverage and idiomatic RSpec style.

### Key Improvements

1.  **Shoulda Matchers Integration**: Configured `shoulda-matchers` in `rails_helper.rb` for cleaner association and validation tests.
2.  **Comprehensive Model Specs**: Added `spec/models/task_spec.rb` to cover:
    *   **Validations**: Presence of `title`, validity of `user` reference, and `status` inclusion.
    *   **Associations**: Verifying `belong_to :user`.
    *   **Defaults**: Ensuring new tasks default to `todo` status.
    *   **Edge Cases**: Testing behavior with invalid statuses and `due_date` type handling.
3.  **Refactored Request Specs**: Rewrote `spec/requests/tasks_spec.rb` for better maintainability:
    *   **Descriptive Contexts**: Grouped tests by authentication state and specific scenarios.
    *   **JSON Helper**: Added a local `json_response` helper to reduce boilerplate.
    *   **Mass-Assignment Protection**: Explicitly tested that `user_id` cannot be hijacked via params.
    *   **Error Consistency**: Verified the structure and content of error responses for 404 and 422 codes.
4.  **User Model Spec**: Added basic association testing to `spec/models/user_spec.rb` to ensure `has_many :tasks` is properly implemented with `dependent: :destroy`.

### Updated Files

#### 1. Model Spec: Task

```1:60:spec/models/task_spec.rb
require 'rails_helper'

RSpec.describe Task, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
    
    it 'is invalid without a user' do
      task = build(:task, user: nil)
      expect(task).not_to be_valid
      expect(task.errors[:user]).to include('must exist')
    end

    it 'is valid with a todo status' do
      task = build(:task, status: :todo)
      expect(task).to be_valid
    end

    it 'is valid with an in_progress status' do
      task = build(:task, status: :in_progress)
      expect(task).to be_valid
    end

    it 'is valid with a done status' do
      task = build(:task, status: :done)
      expect(task).to be_valid
    end

    it 'is invalid with an invalid status' do
      expect {
        build(:task, status: :invalid_status)
      }.to raise_error(ArgumentError, "'invalid_status' is not a valid status")
    end
  end

  describe 'defaults' do
    it 'defaults status to todo' do
      task = Task.new
      expect(task.status).to eq('todo')
    end
  end

  describe 'due_date' do
    it 'allows a valid date' do
      task = build(:task, due_date: Date.today)
      expect(task).to be_valid
    end

    it 'allows nil due_date' do
      task = build(:task, due_date: nil)
      expect(task).to be_valid
    end

    it 'handles date types correctly' do
      task = build(:task, due_date: '2026-01-12')
      expect(task.due_date).to be_a(Date)
    end
  end
end
```

#### 2. Request Spec: Tasks API

```1:117:spec/requests/tasks_spec.rb
require 'rails_helper'

RSpec.describe "Tasks API", type: :request do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:headers) { { 'Authorization' => "Bearer #{user.id}" } }
  
  # Helper to parse JSON response
  def json_response
    JSON.parse(response.body)
  end

  describe "GET /tasks" do
    context "when unauthenticated" do
      it "returns 401 Unauthorized" do
        get tasks_path
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when authenticated" do
      before do
        create_list(:task, 3, user: user)
        create_list(:task, 2, user: other_user)
      end

      it "returns only tasks belonging to the current user" do
        get tasks_path, headers: headers
        
        expect(response).to have_http_status(:ok)
        expect(json_response.size).to eq(3)
        expect(json_response.all? { |t| t['user_id'] == user.id }).to be true
      end
    end
  end

  describe "GET /tasks/:id" do
    let(:task) { create(:task, user: user) }
    let(:other_task) { create(:task, user: other_user) }

    it "returns the task when it belongs to the user" do
      get task_path(task), headers: headers
      expect(response).to have_http_status(:ok)
      expect(json_response['id']).to eq(task.id)
    end

    it "returns 404 when the task belongs to another user" do
      get task_path(other_task), headers: headers
      expect(response).to have_http_status(:not_found)
      expect(json_response['error']).to eq('Task not found')
    end
  end

  describe "POST /tasks" do
    let(:valid_params) do
      { task: { title: "New Task", description: "Task description", status: "todo", due_date: Date.tomorrow } }
    end

    it "creates a new task and assigns it to the current user" do
      expect {
        post tasks_path, params: valid_params, headers: headers
      }.to change(user.tasks, :count).by(1)

      expect(response).to have_http_status(:created)
      expect(json_response['title']).to eq("New Task")
      expect(json_response['user_id']).to eq(user.id)
    end

    it "ignores user_id in params and assigns to current_user" do
      params_with_user_id = valid_params.deep_merge(task: { user_id: other_user.id })
      
      post tasks_path, params: params_with_user_id, headers: headers
      
      expect(json_response['user_id']).to eq(user.id)
      expect(Task.last.user_id).not_to eq(other_user.id)
    end

    it "returns 422 for missing required fields" do
      post tasks_path, params: { task: { title: "" } }, headers: headers
      
      expect(response).to have_http_status(:unprocessable_entity)
      expect(json_response['error']).to eq('Unprocessable Entity')
      expect(json_response['details']['title']).to include("can't be blank")
    end

    it "returns 422 for invalid status" do
      post tasks_path, params: { task: { title: "Task", status: "invalid" } }, headers: headers
      
      expect(response).to have_http_status(:unprocessable_entity)
      expect(json_response['error']).to eq('Invalid argument')
    end
  end

  describe "PATCH /tasks/:id" do
    let(:task) { create(:task, user: user) }

    it "updates the task when authorized" do
      patch task_path(task), params: { task: { title: "Updated Title" } }, headers: headers
      
      expect(response).to have_http_status(:ok)
      expect(task.reload.title).to eq("Updated Title")
    end

    it "cannot update another user's task" do
      other_task = create(:task, user: other_user)
      patch task_path(other_task), params: { task: { title: "Hack" } }, headers: headers
      
      expect(response).to have_http_status(:not_found)
      expect(other_task.reload.title).not_to eq("Hack")
    end
  end

  describe "DELETE /tasks/:id" do
    let!(:task) { create(:task, user: user) }

    it "deletes the task when authorized" do
      expect {
        delete task_path(task), headers: headers
      }.to change(user.tasks, :count).by(-1)
      
      expect(response).to have_http_status(:no_content)
    end

    it "cannot delete another user's task" do
      other_task = create(:task, user: other_user)
      expect {
        delete task_path(other_task), headers: headers
      }.not_to change(Task, :count)
      
      expect(response).to have_http_status(:not_found)
    end
  end
end
```

The entire suite now passes with **24 examples** and **0 failures**.

```ruby
require 'rails_helper'

RSpec.describe Task, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
    
    it 'is invalid without a user' do
      task = build(:task, user: nil)
      expect(task).not_to be_valid
      expect(task.errors[:user]).to include('must exist')
    end

    it 'is valid with a todo status' do
      task = build(:task, status: :todo)
      expect(task).to be_valid
    end

    it 'is valid with an in_progress status' do
      task = build(:task, status: :in_progress)
      expect(task).to be_valid
    end

    it 'is valid with a done status' do
      task = build(:task, status: :done)
      expect(task).to be_valid
    end

    it 'is invalid with an invalid status' do
      expect {
        build(:task, status: :invalid_status)
      }.to raise_error(ArgumentError, "'invalid_status' is not a valid status")
    end
  end

  describe 'defaults' do
    it 'defaults status to todo' do
      task = Task.new
      expect(task.status).to eq('todo')
    end
  end

  describe 'due_date' do
    it 'allows a valid date' do
      task = build(:task, due_date: Date.today)
      expect(task).to be_valid
    end

    it 'allows nil due_date' do
      task = build(:task, due_date: nil)
      expect(task).to be_valid
    end

    it 'handles date types correctly' do
      task = build(:task, due_date: '2026-01-12')
      expect(task.due_date).to be_a(Date)
    end
  end
end
```

```ruby
require 'rails_helper'

RSpec.describe "Tasks API", type: :request do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:headers) { { 'Authorization' => "Bearer #{user.id}" } }
  
  # Helper to parse JSON response
  def json_response
    JSON.parse(response.body)
  end

  describe "GET /tasks" do
    context "when unauthenticated" do
      it "returns 401 Unauthorized" do
        get tasks_path
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when authenticated" do
      before do
        create_list(:task, 3, user: user)
        create_list(:task, 2, user: other_user)
      end

      it "returns only tasks belonging to the current user" do
        get tasks_path, headers: headers
        
        expect(response).to have_http_status(:ok)
        expect(json_response.size).to eq(3)
        expect(json_response.all? { |t| t['user_id'] == user.id }).to be true
      end
    end
  end

  describe "GET /tasks/:id" do
    let(:task) { create(:task, user: user) }
    let(:other_task) { create(:task, user: other_user) }

    it "returns the task when it belongs to the user" do
      get task_path(task), headers: headers
      expect(response).to have_http_status(:ok)
      expect(json_response['id']).to eq(task.id)
    end

    it "returns 404 when the task belongs to another user" do
      get task_path(other_task), headers: headers
      expect(response).to have_http_status(:not_found)
      expect(json_response['error']).to eq('Task not found')
    end
  end

  describe "POST /tasks" do
    let(:valid_params) do
      { task: { title: "New Task", description: "Task description", status: "todo", due_date: Date.tomorrow } }
    end

    it "creates a new task and assigns it to the current user" do
      expect {
        post tasks_path, params: valid_params, headers: headers
      }.to change(user.tasks, :count).by(1)

      expect(response).to have_http_status(:created)
      expect(json_response['title']).to eq("New Task")
      expect(json_response['user_id']).to eq(user.id)
    end

    it "ignores user_id in params and assigns to current_user" do
      params_with_user_id = valid_params.deep_merge(task: { user_id: other_user.id })
      
      post tasks_path, params: params_with_user_id, headers: headers
      
      expect(json_response['user_id']).to eq(user.id)
      expect(Task.last.user_id).not_to eq(other_user.id)
    end

    it "returns 422 for missing required fields" do
      post tasks_path, params: { task: { title: "" } }, headers: headers
      
      expect(response).to have_http_status(:unprocessable_entity)
      expect(json_response['error']).to eq('Unprocessable Entity')
      expect(json_response['details']['title']).to include("can't be blank")
    end

    it "returns 422 for invalid status" do
      post tasks_path, params: { task: { title: "Task", status: "invalid" } }, headers: headers
      
      expect(response).to have_http_status(:unprocessable_entity)
      expect(json_response['error']).to eq('Invalid argument')
    end
  end

  describe "PATCH /tasks/:id" do
    let(:task) { create(:task, user: user) }

    it "updates the task when authorized" do
      patch task_path(task), params: { task: { title: "Updated Title" } }, headers: headers
      
      expect(response).to have_http_status(:ok)
      expect(task.reload.title).to eq("Updated Title")
    end

    it "cannot update another user's task" do
      other_task = create(:task, user: other_user)
      patch task_path(other_task), params: { task: { title: "Hack" } }, headers: headers
      
      expect(response).to have_http_status(:not_found)
      expect(other_task.reload.title).not_to eq("Hack")
    end
  end

  describe "DELETE /tasks/:id" do
    let!(:task) { create(:task, user: user) }

    it "deletes the task when authorized" do
      expect {
        delete task_path(task), headers: headers
      }.to change(user.tasks, :count).by(-1)
      
      expect(response).to have_http_status(:no_content)
    end

    it "cannot delete another user's task" do
      other_task = create(:task, user: other_user)
      expect {
        delete task_path(other_task), headers: headers
      }.not_to change(Task, :count)
      
      expect(response).to have_http_status(:not_found)
    end
  end
end
```

