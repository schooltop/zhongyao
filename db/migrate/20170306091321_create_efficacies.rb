class CreateEfficacies < ActiveRecord::Migration[5.0]
  def change
    create_table :efficacies do |t|
      t.string    :name ,comment:"药效"
      t.timestamps
    end
  end
end
