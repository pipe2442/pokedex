# api/app/services/poke_api.rb
class PokeApi
  include HTTParty
  BASE = "https://pokeapi.co/api/v2"
  PER_PAGE = 151

  class << self
    def list(page: 1)
      page = normalize_page(page)
      offset = (page - 1) * PER_PAGE

      response = get("#{BASE}/pokemon?offset=#{offset}&limit=#{PER_PAGE}")
      map_list(response.parsed_response, page)
    end

    def fetch(id)
      pokemon = get("#{BASE}/pokemon/#{id}").parsed_response
      species = get("#{BASE}/pokemon-species/#{id}").parsed_response

      pokemon.merge(
        "number" => format_number(pokemon["id"]),
        "description" => description_from(species)
      )
    end

    private

    def normalize_page(value)
      page = value.to_i
      page.clamp(1, 100)
    end

    def format_number(id)
      id.to_s.rjust(3, "0")
    end

    def map_list(data, page)
      {
        page: page,
        total: data["count"],
        results: data["results"].map { |p| format_pokemon_item(p) }
      }
    end

    def format_pokemon_item(p)
      id = p["url"].split("/").last.to_i
      {
        id: id,
        number: format_number(id),
        name: p["name"],
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/#{id}.png"
      }
    end

    def description_from(species)
      entry = species.dig("flavor_text_entries")&.find { |e| e.dig("language", "name") == "en" }
      entry&.fetch("flavor_text", "")&.squish || ""
    end
  end
end
