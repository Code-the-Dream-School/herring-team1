class CreateVolunteerApplications < ActiveRecord::Migration[7.1]
  def change
    create_table :volunteer_applications do |t|
      t.integer :volunteer_id
      t.integer :request_id
      t.integer :application_status, default: 0
      t.string :message

      t.timestamps
    end
  end
end
