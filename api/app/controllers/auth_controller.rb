class AuthController < ApplicationController
  include ActionController::Cookies
  before_action :authenticate_user!, only: [ :me ]

  # def login
  #   user = User.find_by("username = ? OR email = ?", params[:login], params[:login])
  #   return render json: { error: "Invalid credentials" }, status: 401 unless user&.authenticate(params[:password])

  #   token = JwtService.encode(user_id: user.id)

  #   cookies.signed[:jwt] = {
  #     value: token,
  #     httponly: true,
  #     secure: false,
  #     same_site: :lax
  #   }

  #   render json: { user: user }
  # end

  # this one encrypts the token
  def login
    user = User.find_by("username = ? OR email = ?", params[:login], params[:login])
    return render json: { error: "Invalid credentials" }, status: :unauthorized unless user&.authenticate(params[:password])

    token = JwtService.encode(user_id: user.id)

    cookies.encrypted[:jwt] = {
      value: token,
      httponly: true,
      secure: Rails.env.production?,
      same_site: (Rails.env.production? ? :none : :lax)
    }

    render json: { user: user }
  end

  def me
    render json: {
      username: @current_user.username,
      role: @current_user.role
    }
  end

  def logout
    cookies.delete(:jwt)
    head :ok
  end
end
