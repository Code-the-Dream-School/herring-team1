# db/migrate/20241207165657_create_services.rb
# Migration to create the services table
class CreateServices < ActiveRecord::Migration[7.1]
  def change
    create_table :services do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
