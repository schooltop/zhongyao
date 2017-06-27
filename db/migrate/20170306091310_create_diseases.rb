class CreateDiseases < ActiveRecord::Migration[5.0]
  def change
    create_table :diseases do |t|
      t.string    :name ,comment:"病名称"
      t.string    :link ,comment:"拓展连接"
      t.text      :latin_name ,comment:"病描述"
      t.timestamps
    end
  end
end
