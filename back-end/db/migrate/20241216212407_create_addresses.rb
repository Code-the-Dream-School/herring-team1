class CreateAddresses < ActiveRecord::Migration[7.1]
  def change
    create_table :addresses do |t|
      t.string :street
      t.string :city
      t.string :state
      t.string :zip_code
      t.references :volunteer, foreign_key: true, null: true
      t.references :organization, foreign_key: true, null: true

      t.timestamps
    end
  end
end
