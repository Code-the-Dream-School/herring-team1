# Migration to change the data type of `auth_id` in the organizations table
class ChangeAuthIdTypeInOrganizations < ActiveRecord::Migration[7.1]
  def change
    change_column :organizations, :auth_id, :integer, null: false
  end
end
