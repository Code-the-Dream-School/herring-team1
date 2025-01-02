FactoryBot.define do
  factory :org_service do
    association :organization
    association :service
  end
end
