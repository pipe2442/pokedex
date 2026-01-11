class ApplicationController < ActionController::API
  include ActionController::Cookies

  # def authenticate_user!
  #   token = cookies.signed[:jwt]
  #   return render json: { error: "Unauthorized" }, status: :unauthorized unless token

  #   payload = JwtService.decode(token)
  #   @current_user = User.find(payload["user_id"])
  # rescue
  #   render json: { error: "Invalid token" }, status: :unauthorized
  # end

  # this one decrypts the token
  def authenticate_user!
    token = cookies.encrypted[:jwt]
    return render json: { error: "Unauthorized" }, status: :unauthorized unless token

    payload = JwtService.decode(token)
    user_id = payload&.fetch("user_id", nil)
    @current_user = User.find_by(id: user_id)

    return if @current_user
    render json: { error: "Unauthorized" }, status: :unauthorized
  end
end
