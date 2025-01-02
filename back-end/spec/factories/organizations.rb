require 'faker'

FactoryBot.define do
  factory :organization do
    name { Faker::Company.name }
    website { Faker::Internet.url }
    phone { Faker::PhoneNumber.unique.phone_number.gsub(/\D/, '')[0, 10] }
    logo { Faker::Company.logo }
    description { Faker::Lorem.paragraph }
    mission { Faker::Lorem.sentence }

    association :auth

    transient do
      service_ids { (1..10).to_a.sample(3) }
    end

    after(:create) do |organization, evaluator|
      # Fetch services and create OrgService instances for the provided service IDs
      evaluator.service_ids.each do |service_id|
        create(:org_service, organization: organization, service_id: service_id)
      end
      create(:address, organization: organization)
    end
  end
end
