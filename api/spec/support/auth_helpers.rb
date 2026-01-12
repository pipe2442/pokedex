module AuthHelpers
  def sign_in_as(user)
    token = JwtService.encode(user_id: user.id)

    # RSpec request specs use Rack::Test, which doesn't support .encrypted cookies.
    # We use Rails' internal CookieJar to encrypt the token so the controller can read it.
    request = ActionDispatch::TestRequest.create
    jar = ActionDispatch::Cookies::CookieJar.build(request, {})
    jar.encrypted[:jwt] = token

    # Now we set the encrypted string in the test cookies
    cookies[:jwt] = jar[:jwt]
  end
end
