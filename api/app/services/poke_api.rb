class PokeApi
  include HTTParty
  BASE = "https://pokeapi.co/api/v2"
  PER_PAGE = 151

  def self.list(page: 1)
    page = normalize_page(page)
    offset = (page - 1) * PER_PAGE

    res = get("#{BASE}/pokemon?offset=#{offset}&limit=#{PER_PAGE}")
    map_list(res.parsed_response, page)
  end

  private

  def self.normalize_page(value)
    page = value.to_i
    page = 1 if page <= 0
    page = 100 if page > 100
    page
  end

  def self.map_list(data, page)
    {
      page: page,
      total: data["count"],
      results: data["results"].map do |p|
        id = extract_id(p["url"])
        {
          id: id,
          number: format_number(id),
          name: p["name"],
          image: sprite(id)
        }
      end
    }
  end

  def self.format_number(id)
    id.to_s.rjust(3, "0")
  end


  def self.extract_id(url)
    url.split("/").last.to_i
  end

  def self.sprite(id)
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/#{id}.png"
  end

  def self.fetch(id)
    res = get("#{BASE}/pokemon/#{id}")
    body = res.parsed_response

    raw_number =
      if body.is_a?(Hash) && body["id"]
        body["id"]
      else
        id
      end

    number = raw_number.to_i.to_s.rjust(3, "0") # "2" => "002"

    body.merge("number" => number)
  end
end
