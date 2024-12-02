# This migration adds an email column to the organizations table.
class AddEmailToOrganizations < ActiveRecord::Migration[7.1]
  def change
    add_column :organizations, :email, :string
  end
end
