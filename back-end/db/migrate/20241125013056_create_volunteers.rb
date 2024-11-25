class CreateVolunteers < ActiveRecord::Migration[7.1]
  def change
    create_table :volunteers do |t|
      t.integer :auth_id
      t.string :first_name
      t.string :last_name
      t.string :profile_img
      t.string :address
      t.string :city
      t.string :state
      t.string :zip_code
      t.string :phone
      t.string :email
      t.text :about
      t.text :services

      t.timestamps
    end
  end
end
