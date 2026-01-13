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
