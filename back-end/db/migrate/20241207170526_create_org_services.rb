# db/migrate/20241207170526_create_org_services.rb
# Migration to create the org_services table, joining organizations and services
class CreateOrgServices < ActiveRecord::Migration[7.1]
  def change
    create_table :org_services do |t|
      t.references :organization, null: false, foreign_key: true
      t.references :service, null: false, foreign_key: true

      t.timestamps
    end
  end
end
