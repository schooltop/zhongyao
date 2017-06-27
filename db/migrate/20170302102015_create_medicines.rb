class CreateMedicines < ActiveRecord::Migration[5.0]
  def change
    create_table :medicines do |t|
      t.string   :name ,comment:"药名称"
      t.string   :latin_name ,comment:"学名"
      t.string   :other_name ,comment:"别名：a,A"
      t.string   :source  ,comment: "记录出处"
      t.string   :diseases_list  ,comment:"治疗什么病：感冒,咳嗽"
      t.string   :efficacie_list ,comment:"有什么药效：清热,解毒"
      t.string   :resistance  ,comment: "药性：甘平／苦寒"
      t.string   :shape    ,comment: "形态"
      t.string   :region   ,comment: "产地"
      t.string   :harvest  ,comment: "采收季节"
      t.string   :officinal   ,comment: "药用部分"
      t.text     :indications ,comment: "主治描述"
      t.text     :note ,comment: "附，注"
      t.timestamps
    end
  end
end
