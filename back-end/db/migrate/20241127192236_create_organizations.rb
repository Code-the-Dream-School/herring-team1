# CreateOrganizations migration creates the organizations table in the database.
class CreateOrganizations < ActiveRecord::Migration[7.1]
  def change
    create_table :organizations do |t|
      t.references :auth, null: false, foreign_key: true
      t.string :name, null: false, limit: 150
      t.string :website, limit: 100
      t.string :phone, limit: 15
      t.string :description, limit: 255
      t.string :mission, limit: 255
      t.string :logo

      t.timestamps
    end
  end
end
