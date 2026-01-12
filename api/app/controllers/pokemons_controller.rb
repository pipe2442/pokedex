class PokemonsController < ApplicationController
  before_action :authenticate_user!

  def index
    page = params[:page]
    render json: PokeApi.list(page: page)
  end

  def show
    id = params[:id].to_s.strip
    return render json: { error: "id is required" }, status: :bad_request if id.empty?

    render json: PokeApi.fetch(id)
  end
end
