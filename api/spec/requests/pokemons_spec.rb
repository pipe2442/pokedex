require 'rails_helper'

RSpec.describe "Pokemons", type: :request do
  let(:user) { User.create!(username: "tester", email: "test@test.com", password: "password", role: "trainer") }

  describe "GET /pokemons" do
    context "when the user is not logged in" do
      it "returns a 401 unauthorized error" do
        get "/pokemons"
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when the user is logged in" do
      before { sign_in_as(user) }

      it "returns a list of pokemons successfully" do
        get "/pokemons"
        expect(response).to have_http_status(:ok)

        json = JSON.parse(response.body)
        expect(json).to have_key("results")
        expect(json).to have_key("page")
      end
    end
  end

  describe "GET /pokemon/:id" do
    before { sign_in_as(user) }

    it "returns the details of a pokemon" do
      get "/pokemon/1"
      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json["number"]).to eq("001")
      expect(json).to have_key("name")
      expect(json).to have_key("description")
    end
  end
end
