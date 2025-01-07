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
    Service.all.each { |s| puts "Service ID: #{s.id}, Name: #{s.name}" }
  end

  let(:email) { Faker::Internet.unique.email }
  let(:password) { 'V3ry$tr0ngP@6$m0rd4!' }

  describe 'GET #index' do
    it 'returns a list of organizations for unauthenticated users' do
      auth = create(:auth, email: Faker::Internet.unique.email, isOrganization: true)
      create(:organization, auth: auth)

      get '/organizations'
      expect(response).to have_http_status(:ok)
      organizations = json['organizations']
      expect(organizations.size).to eq(1)
      expect(organizations).to be_an_instance_of(Array)
    end

    it 'returns a list of organizations for authenticated users' do
      auth = create(:auth, email: Faker::Internet.unique.email, isOrganization: true)
      create(:organization, auth: auth)

      login_params = { auth: { email: auth.email, password: password } }
      post '/auth/login', params: login_params.to_json, headers: {
        'Content-Type' => 'application/json'
      }
      get '/organizations'
      expect(response).to have_http_status(:ok)

      organizations = json['organizations']
      expect(organizations.size).to eq(1)
      expect(organizations).to be_an_instance_of(Array)
    end
  end

  describe 'GET #show' do
    it 'returns the organization details' do
      auth = create(:auth, email: Faker::Internet.unique.email, isOrganization: true)
      organization = create(:organization, auth: auth)

      get "/organizations/#{organization.id}"
      expect(response).to have_http_status(:ok)
      expect(json['organization']['id']).to eq(organization.id)
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
      organizations = json['organizations']
      expect(organizations.size).to eq(3)
    end

    it "returns a list of organizations for authenticated users" do
      sign_in auths.first
      get '/organizations'
      expect(response).to have_http_status(200)
      organizations = json['organizations']
      expect(organizations.size).to eq(3)
    end
  end

  describe 'GET my_organization' do
    it 'returns a 401 if not logged in' do
      get '/organizations/my_organization'
      expect(response).to have_http_status(:unauthorized)
      expect(json['message']).to eq('No auth is authenticated.')
    end
  end
end
# rubocop:enable Metrics/BlockLength
