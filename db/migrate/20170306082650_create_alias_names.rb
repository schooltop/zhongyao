class CreateAliasNames < ActiveRecord::Migration[5.0]
  def change
  	# 别名
    create_table :alias_names do |t|
      t.references :medicine ,comment:"药"
      t.string :name ,comment:"别名称"
      t.timestamps
    end
  end
end
