class AddPackageInfoToPrescriptionDetails < ActiveRecord::Migration[5.0]
  def change
  	add_column :prescription_details, :package_info, :string, comment: '数量信息'
  end
end
