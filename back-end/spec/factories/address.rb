require 'faker'

FactoryBot.define do
  factory :address do |f|
    f.street { Faker::Address.street_address }
    f.city { Faker::Address.city }
    f.state { Faker::Address.state_abbr }
    f.zip_code { Faker::Address.zip_code }
  end
end
