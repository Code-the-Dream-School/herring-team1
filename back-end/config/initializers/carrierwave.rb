CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: 'Cloudinary',
    cloud_name: ENV.fetch('CLOUDINARY_CLOUD_NAME', nil),
    api_key: ENV.fetch('CLOUDINARY_API_KEY', nil),
    api_secret: ENV.fetch('CLOUDINARY_API_SECRET', nil)
  }
  config.cache_storage = :file
end
