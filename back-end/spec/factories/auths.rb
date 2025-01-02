require 'faker'

FactoryBot.define do
  factory :auth do
    email { Faker::Internet.email }
    password { 'V3ry$tr0ngP@6$m0rd4!' }
    password_confirmation { 'V3ry$tr0ngP@6$m0rd4!' }

    trait :organization do
      isOrganization { true }
    end

    trait :volunteer do
      isOrganization { false }
    end
  end
end
