CarrierWave.configure do |config|
    config.fog_credentials = {
      provider:              'Cloudinary',
      cloud_name:            ENV['CLOUDINARY_CLOUD_NAME'],
      api_key:               ENV['CLOUDINARY_API_KEY'],
      api_secret:            ENV['CLOUDINARY_API_SECRET']
    }
    config.cache_storage = :file
  end