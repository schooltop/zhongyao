class CreatePrescriptionDetails < ActiveRecord::Migration[5.0]
  def change
    create_table :prescription_details do |t|
      t.references :medicine,comment: "药"
      t.references :prescription,comment: "药方"
      t.integer  :package ,comment: "包装数量"
      t.integer  :package_unit ,comment: "包装类型"
      t.timestamps
    end
  end
end
