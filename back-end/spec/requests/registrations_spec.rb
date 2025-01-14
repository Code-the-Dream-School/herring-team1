# Tests for the Auth controller.
require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe "Registrations", type: :request do
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

        auth_id = json['user']['id']
        expect(auth_id).to be_present
        auth = Auth.find(auth_id)
        expect(auth).to be_persisted
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

  describe "POST /auth/login" do
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
    end

    let(:email) { Faker::Internet.unique.email }
    let(:password) { 'V3ry$tr0ngP@6$m0rd4!' }

    it 'logs in as an organization successfully' do
      auth = create(:auth, email: email, isOrganization: true)
      expect(auth).to be_persisted

      login_params = { auth: { email: auth.email, password: password } }
      post '/auth/login', params: login_params.to_json, headers: {
        'Content-Type' => 'application/json'
      }
      expect(response).to have_http_status(201)
      expect(json['message']).to eq('You are logged in.')
      expect(json['user']['id']).to eq(auth.id)
      expect(json['user']['email']).to eq(auth.email)
      expect(json['user']['isOrganization']).to eq(auth.isOrganization)
    end

    it 'logs in and sets the session correctly' do
      auth = create(:auth, email: email, isOrganization: true)
      expect(auth).to be_persisted

      login_params = { auth: { email: auth.email, password: password } }
      post '/auth/login', params: login_params.to_json, headers: {
        'Content-Type' => 'application/json',
        'Accept' => 'application/json'
      }
      expect(response).to have_http_status(201)
      expect(json['message']).to eq('You are logged in.')

      session_data = session.to_hash

      # Verify the session data
      expect(session_data['session_id']).to be_present
      expect(session_data['warden.user.auth.key']).to be_present
      expect(session_data['_csrf_token']).to be_present
    end

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
end
# rubocop:enable Metrics/BlockLength
