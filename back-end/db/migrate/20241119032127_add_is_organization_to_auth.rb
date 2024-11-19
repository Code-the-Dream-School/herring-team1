class AddIsOrganizationToAuth < ActiveRecord::Migration[7.1]
  def change
    add_column :auths, :isOrganization, :boolean, default: false, null: false
  end
end
