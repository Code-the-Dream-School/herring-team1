require 'rails_helper'

RSpec.describe "Registrations", type: :request do
  # rubocop:disable Metrics/BlockLength
  describe 'POST /auth' do
    let(:valid_email) { Faker::Internet.unique.email }
    let(:strong_password) { 'V3ry$tr0ngP@6$m0rd4!' }
    let(:weak_password) { 'password123!' }
    let(:registration_params) do
      {
        auth: {
          email: valid_email,
          password: strong_password,
          password_confirmation: strong_password,
          isOrganization: true
        }
      }
    end

    context 'when registration is successful' do
      it 'returns success and user details' do
        post '/auth', params: registration_params
        expect(response).to have_http_status(:created)
        expect(json['message']).to eq('Signed up successfully.')
        expect(json['user']['email']).to eq(valid_email)
        expect(json['user']['isOrganization']).to eq(true)
      end
    end

    context 'when using the same email' do
      before { post '/auth', params: registration_params } # Create user first

      it 'returns email already taken error' do
        post '/auth', params: registration_params
        expect(response).to have_http_status(:bad_request)
        expect(json['message']).to include('Email has already been taken')
      end
    end

    context 'when using a weak password' do
      it 'returns weak password error' do
        post '/auth', params: registration_params.merge(auth: {
                                                          password: weak_password,
                                                          password_confirmation: weak_password
                                                        }).inspect
        expect(response).to have_http_status(:bad_request)
        expect(json['message']).to include('Password is too weak')
      end
    end

    context 'when email is empty' do
      it 'returns email missing error' do
        post '/auth', params: registration_params.merge(auth: { email: '', password: strong_password })
        expect(response).to have_http_status(:bad_request)
        expect(json['message']).to include("Email can't be blank")
      end
    end

    context 'when password is empty' do
      it 'returns password missing error' do
        post '/auth', params: registration_params.merge(auth: { password: '', password_confirmation: '' })
        expect(response).to have_http_status(:bad_request)
        expect(json['message']).to include("Password can't be blank")
      end
    end
  end

  describe "POST /auth and /organizations" do
    let(:registration_params) do
      {
        auth: {
          email: Faker::Internet.unique.email,
          password: 'V3ry$tr0ngP@6$m0rd4!',
          password_confirmation: 'V3ry$tr0ngP@6$m0rd4!',
          isOrganization: true
        }
      }
    end

    before do
      # Create services before running the tests
      load Rails.root.join('db', 'seeds.rb')
    end

    it 'verifies that services are created' do
      expect(Service.count).to eq(10)
      expect(Service.pluck(:name)).to include(
        'Food service',
        'Transportation',
        'Education',
        'Sports&Recreation',
        'Attractions',
        'Housing&Facilities',
        'Legal&Advocacy',
        'Hobbies&Crafts',
        'Arts&Culture',
        'Health&Medicine'
      )
      puts "Service count: #{Service.count}"
    end

    let(:email) { Faker::Internet.unique.email }
    let(:password) { 'V3ry$tr0ngP@6$m0rd4!' }

    it 'creates an organization with address and services using the factory' do
      auth = create(:auth, email: email, isOrganization: true)
      expect(auth).to be_persisted
      expect(auth.email).to eq(email)
      expect(auth.isOrganization).to eq(true)

      create(:organization, auth: auth)
      organization = Organization.last

      expect(organization).to be_persisted
      expect(organization.auth_id).to eq(auth.id)
      expect(organization.name).to be_present
      expect(organization.website).to be_present
      expect(organization.phone).to be_present
      expect(organization.description).to be_present
      expect(organization.mission).to be_present
      expect(organization.logo).to be_present

      address = organization.address
      expect(address).to be_present
      expect(address.street).to be_present
      expect(address.city).to be_present
      expect(address.state).to be_present
      expect(address.zip_code).to be_present

      org_services = organization.org_services
      expect(org_services.count).to eq(3)
      org_services.each do |org_service|
        expect(org_service.service_id).to be_between(1, 10)
      end
    end
  end
  # rubocop:enable Metrics/BlockLength
end
