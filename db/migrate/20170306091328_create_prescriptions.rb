class CreatePrescriptions < ActiveRecord::Migration[5.0]
  def change
    create_table :prescriptions do |t|
      t.references :user,comment: "贡献者"
      t.string     :link ,comment:"拓展连接"
      t.string :name ,comment: "名称"
      t.string :diseases_list ,comment:"治疗什么病：感冒,咳嗽"
      t.text :detail ,comment:"药方明细"
      t.text :note ,comment:"药方描述"
      t.timestamps
      # 生成一条pdf药方，加盖章。
    end
  end
end
