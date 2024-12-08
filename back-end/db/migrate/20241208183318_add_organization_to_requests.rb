# This migration adds a foreign key `organization_id` to the `requests` table,
# linking each request to a specific organization.

class AddOrganizationToRequests < ActiveRecord::Migration[7.1]
  def change
    add_reference :requests, :organization, null: false, foreign_key: true
  end
end
