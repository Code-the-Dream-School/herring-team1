FactoryBot.define do
  factory :volunteer do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    phone { Faker::PhoneNumber.unique.phone_number.gsub(/\D/, '')[0, 10] }
    about { Faker::Lorem.paragraph }
    profile_img { Faker::Internet.url.present? ? Faker::Internet.url : 'http://example.com/default_image.jpg' }

    auth { association :auth, :volunteer }

    after(:create) do |volunteer|
      create(:address, volunteer: volunteer)
    end
  end
end
