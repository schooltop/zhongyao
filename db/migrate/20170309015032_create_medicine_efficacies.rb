class CreateMedicineEfficacies < ActiveRecord::Migration[5.0]
  def change
    create_table :medicine_efficacies do |t|
      t.references :medicine,comment: "药" 
      t.references :efficacy,comment: "药效"	
      t.timestamps
    end
  end
end
