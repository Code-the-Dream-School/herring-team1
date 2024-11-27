class CreateAddresses < ActiveRecord::Migration[7.1]
  def change
    create_table :addresses do |t|
      t.string :address, null: false, limit: 200
      t.string :city, null: false, limit: 100
      t.string :state, null: false, limit: 50
      t.string :zip_code, null: false, limit: 10

      t.timestamps
    end
  end
end
