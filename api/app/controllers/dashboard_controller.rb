class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: {
      message: "Bienvenido #{@current_user.username}",
      role: @current_user.role
    }
  end
end
