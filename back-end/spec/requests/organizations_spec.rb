# Tests for the Organization controller.
require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe "Organizations", type: :request do
  before(:all) do
    load Rails.root.join('db', 'seeds.rb')
    puts "Service count creating: #{Service.count}"
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
    Service.all.each { |s| puts "Service ID: #{s.id}, Name: #{s.name}" }
  end

  let(:email) { Faker::Internet.unique.email }
  let(:password) { 'V3ry$tr0ngP@6$m0rd4!' }

  describe 'GET #index' do
    it 'returns a list of organizations for unauthenticated users' do
      auth = create(:auth, email: Faker::Internet.unique.email, isOrganization: true)
      create(:organization, auth: auth)
      sign_in auth

      get '/organizations'
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(1)
      expect(JSON.parse(response.body)).to be_an_instance_of(Array)
    end

    it 'returns a list of organizations for authenticated users' do
      auth = create(:auth, email: Faker::Internet.unique.email, isOrganization: true)
      create(:organization, auth: auth)

      get '/organizations'
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(1)
      expect(JSON.parse(response.body)).to be_an_instance_of(Array)
    end
  end

  describe 'GET #show' do
    it 'returns the organization details' do
      auth = create(:auth, email: Faker::Internet.unique.email, isOrganization: true)
      organization = create(:organization, auth: auth)

      get "/organizations/#{organization.id}"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['organization']['id']).to eq(organization.id)
    end

    it 'returns a 404 if the organization is not found' do
      get '/organizations/999'
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "GET list of organizations" do
    let(:auths) { [] }
    before do
      3.times do
        auth = create(:auth, email: Faker::Internet.unique.email, isOrganization: true)
        create(:organization, auth: auth)
        auths << auth
      end
    end

    it "returns a list of organizations for unauthenticated users" do
      get '/organizations'
      expect(response).to have_http_status(200)
      expect(json.size).to eq(3)
    end

    it "returns a list of organizations for authenticated users" do
      sign_in auths.first
      get '/organizations'
      expect(response).to have_http_status(200)
      expect(json.size).to eq(3)
    end
  end

  describe 'GET my_organization' do
    it 'prohibited for not authorized accsess' do
      registration_params = {
        auth: {
          email: Faker::Internet.unique.email,
          password: password,
          password_confirmation: password,
          isOrganization: false
        }
      }
      post '/auth', params: registration_params
      expect(response).to have_http_status(:created)

      response_body = JSON.parse(response.body)
      auth = Auth.find(response_body['user']['id'])
      puts "auth: #{auth}"

      # Simulate authentication by setting the session
      Rails.application.config.session_store :cookie_store, key: '_session_id'
      session = ActionDispatch::Integration::Session.new(Rails.application)
      session_cookie = response.cookies['_session_id']

      FactoryBot.create(:volunteer, auth: auth)
      allow(controller).to receive(:current_auth).and_return(auth)

      login_params = { auth: { email: auth.email, password: password } }
      session.post '/auth/login', params: login_params.to_json, headers: {
        'Content-Type' => 'application/json',
        'Accept' => 'application/json',
        'Cookie' => "_session_id=#{session_cookie}"
      }
      expect(session.response).to have_http_status(201)

      session.request.session[:user_id] = auth.id
      csrf_token = session.response.headers['X-CSRF-Token']
      session_cookie = session.response.cookies['_session_id']

      # fetch the organization (logged as volunteer)
      session.get '/organizations/my_organization', headers: {
        'Content-Type' => 'application/json',
        'X-CSRF-Token' => csrf_token,
        'Cookie' => "_session_id=#{session_cookie}"
      }
      puts "get /my_organization: #{session.response.body}"

      expect(session.response).to have_http_status(:unauthorized)
      expect(JSON.parse(session.response.body)['message']).to eq('You are not authorized to access this resource.')
    end

    it 'returns a 401 if not logged in' do
      get '/organizations/my_organization'

      puts "get /my_organization - not logged: #{response.body}"
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
# rubocop:enable Metrics/BlockLength
