require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
# require "rails/test_unit/railtie"
require "rack/session/abstract/id"

# require 'dotenv'

# Dotenv.load(File.expand_path('../herring-team1/back-end/.env', __dir__))

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SetCookiePartitionFlag
  def set_cookie(key, value)
    cookie_header = get_header 'set-cookie'
    set_header 'set-cookie', add_cookie_to_header(cookie_header, key, value)
  end

  # rubocop:disable Metrics/CyclomaticComplexity
  def add_cookie_to_header(header, key, value)
    case value
    when Hash
      domain  = "; domain=#{value[:domain]}"   if value[:domain]
      path    = "; path=#{value[:path]}"       if value[:path]
      max_age = "; max-age=#{value[:max_age]}" if value[:max_age]
      expires = "; expires=#{value[:expires].httpdate}" if value[:expires]
      secure = "; secure" if value[:secure]
      partitioned = "; partitioned" if value[:partitioned]
      httponly = "; HttpOnly" if value.key?(:httponly) ? value[:httponly] : value[:http_only]
      same_site =
        case value[:same_site]
        when false, nil
          nil
        when :none, 'None', :None
          '; SameSite=None'
        when :lax, 'Lax', :Lax
          '; SameSite=Lax'
        when true, :strict, 'Strict', :Strict
          '; SameSite=Strict'
        else
          raise ArgumentError, "Invalid SameSite value: #{value[:same_site].inspect}"
        end
      value = value[:value]
    end
    value = [value] unless value.is_a?(Array)

    cookie = "#{escape(key)}=#{value.map { |v| escape v }.join('&')}#{domain}" \
             "#{path}#{max_age}#{expires}#{secure}#{partitioned}#{httponly}#{same_site}"

    case header
    when nil, ''
      cookie
    when String
      [header, cookie].join("\n")
    when Array
      (header + [cookie]).join("\n")
    else
      raise ArgumentError, "Unrecognized cookie header value. Expected String, Array, or nil, got #{header.inspect}"
    end
  end
  # rubocop:enable Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/MethodLength, Metrics/PerceivedComplexity

  # rubocop:disable Naming/MethodParameterName
  def escape(s)
    URI.encode_www_form_component(s)
  end
  # rubocop:enable Naming/MethodParameterName
end

module Rack
  class Response
    module Helpers
      prepend SetCookiePartitionFlag
    end
  end
end

# We need to be able to send a secure cookie in non-SSL cases
module SendSessionForLocalHost
  # In particular, for localhost, or as typically deployed in production, where a proxy
  # handles the SSL.  This "monkeypatch" is not safe for cases where the server is neither
  # behind such a proxy or on localhost.

  private

  def security_matches?(request, options)
    @assume_ssl ||= @default_options.delete(:assume_ssl)
    return true unless options[:secure]

    request.ssl? || @assume_ssl == true  
  end 
end

module Rack
  module Session
    module Abstract
      class Persisted
        prepend SendSessionForLocalHost
      end
    end
  end
end

module RestRails
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1
    config.action_controller.forgery_protection_origin_check = false

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: ['assets', 'tasks'])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
    config.middleware.use ActionDispatch::Cookies
    ActionDispatch::Cookies::CookieJar.always_write_cookie = true 
    config.middleware.use ActionDispatch::Session::CookieStore
    # this will send secure cookies without SSL
    config.middleware.use ActionDispatch::Session::CookieStore, same_site: :None, 
                                                                secure: true, partitioned: true, assume_ssl: true
  end
end
