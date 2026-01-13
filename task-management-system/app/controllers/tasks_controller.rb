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

