# db/migrate/20241207170526_create_org_services.rb
# This migration creates the `org_services` table, which links organizations
# with the services they provide.

class CreateOrgServices < ActiveRecord::Migration[7.1]
  def change
    create_table :org_services do |t|
      t.references :organization, null: false, foreign_key: true
      t.references :service, null: false, foreign_key: true

      t.timestamps
    end
  end
end
