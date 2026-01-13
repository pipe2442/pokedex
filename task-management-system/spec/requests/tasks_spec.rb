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
