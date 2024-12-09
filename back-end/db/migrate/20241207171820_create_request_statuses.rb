# This migration creates the `request_statuses` table, which contains
# different statuses that a request can have.

class CreateRequestStatuses < ActiveRecord::Migration[7.1]
  def change
    create_table :request_statuses do |t|
      t.string :request_status_name

      t.timestamps
    end
  end
end
