class CreateVolunteers < ActiveRecord::Migration[7.1]
  def change
    create_table :volunteers do |t|
      t.references :auth, null: false, foreign_key: true
      t.string :first_name
      t.string :last_name
      t.string :phone
      t.text :about
      t.string :profile_img

      t.timestamps
    end
  end
end
