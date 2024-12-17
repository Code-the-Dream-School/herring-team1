class AddIsOrganizationToAuths < ActiveRecord::Migration[7.1]
  def change
    add_column :auths, :isOrganization, :boolean
  end
end
