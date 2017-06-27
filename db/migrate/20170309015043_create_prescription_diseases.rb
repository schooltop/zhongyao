class CreatePrescriptionDiseases < ActiveRecord::Migration[5.0]
  def change
    create_table :prescription_diseases do |t|
      t.references :disease,comment: "病"	
      t.references :prescription,comment: "处方"
      t.timestamps
    end
  end
end
