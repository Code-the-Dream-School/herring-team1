# Migration to remove the null constraint
class RemoveNullConstraintFromAuthIdInOrganizations < ActiveRecord::Migration[7.1]
  def change
    change_column_null :organizations, :auth_id, true
    change_column_null :organizations, :name, true
  end
end
