class PokemonsController < ApplicationController
  # before_action :authenticate_user!

  def index
    page = params[:page]
    render json: PokeApi.list(page: page)
  end
end
