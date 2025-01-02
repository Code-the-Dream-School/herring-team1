require 'faker'

FactoryBot.define do
  factory :request do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    status { 'open' }
    association :org_service

    # Traits for other statuses
    trait :in_progress do
      status { 'in-progress' }
    end

    trait :closed do
      status { 'closed' }
    end

    trait :canceled do
      status { 'canceled' }
    end
  end
end
