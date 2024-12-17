# This migration creates the `requests` table, which stores information
# about requests made by organizations for specific services.

class CreateRequests < ActiveRecord::Migration[7.1]
  def change
    create_table :requests do |t|
      t.string :title
      t.string :description
      t.references :org_service, null: false, foreign_key: true
      t.string :status, default: 'open'

      t.timestamps
    end
  end
end
