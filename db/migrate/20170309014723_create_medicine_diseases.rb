class CreateMedicineDiseases < ActiveRecord::Migration[5.0]
  def change
    create_table :medicine_diseases do |t|
      t.references :medicine,comment: "药"	
      t.references :disease,comment: "病"
      t.timestamps
    end
  end
end
