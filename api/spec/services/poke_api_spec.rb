require 'rails_helper'

RSpec.describe PokeApi do
  describe ".normalize_page" do
    it "returns 1 if the page is less than 1" do
      expect(PokeApi.send(:normalize_page, 0)).to eq(1)
      expect(PokeApi.send(:normalize_page, -5)).to eq(1)
    end

    it "returns 100 if the page is greater than 100" do
      expect(PokeApi.send(:normalize_page, 150)).to eq(100)
    end

    it "keeps the number if it is within range" do
      expect(PokeApi.send(:normalize_page, 5)).to eq(5)
    end
  end

  describe ".format_number" do
    it "prepends zeros to complete 3 digits" do
      expect(PokeApi.send(:format_number, 1)).to eq("001")
      expect(PokeApi.send(:format_number, 25)).to eq("025")
      expect(PokeApi.send(:format_number, 150)).to eq("150")
    end
  end
end