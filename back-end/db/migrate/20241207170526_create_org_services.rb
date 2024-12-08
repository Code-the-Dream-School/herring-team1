class CreateOrgServices < ActiveRecord::Migration[7.1]
  def change
    create_table :org_services do |t|
      t.references :organization, null: false, foreign_key: true
      t.references :service, null: false, foreign_key: true

      t.timestamps
    end
  end
end
