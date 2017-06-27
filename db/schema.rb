# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170309025622) do

  create_table "alias_names", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "medicine_id",              comment: "药"
    t.string   "name",                     comment: "别名称"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["medicine_id"], name: "index_alias_names_on_medicine_id", using: :btree
  end

  create_table "attachments", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "attachment_entity_type", limit: 64
    t.integer  "attachment_entity_id"
    t.string   "path",                                           comment: "文件类容"
    t.string   "name",                                           comment: "文件名"
    t.string   "content_type",                                   comment: "文件类型"
    t.integer  "file_size",                                      comment: "文件大小"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.string   "created_by",             limit: 64
    t.index ["attachment_entity_id"], name: "attachments_entity_idx", using: :btree
  end

  create_table "diseases", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name",                                  comment: "病名称"
    t.string   "link",                                  comment: "拓展连接"
    t.text     "latin_name", limit: 65535,              comment: "病描述"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "efficacies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name",                    comment: "药效"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "medicine_diseases", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "medicine_id",              comment: "药"
    t.integer  "disease_id",               comment: "病"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["disease_id"], name: "index_medicine_diseases_on_disease_id", using: :btree
    t.index ["medicine_id"], name: "index_medicine_diseases_on_medicine_id", using: :btree
  end

  create_table "medicine_efficacies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "medicine_id",              comment: "药"
    t.integer  "efficacy_id",              comment: "药效"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["efficacy_id"], name: "index_medicine_efficacies_on_efficacy_id", using: :btree
    t.index ["medicine_id"], name: "index_medicine_efficacies_on_medicine_id", using: :btree
  end

  create_table "medicines", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name",                                      comment: "药名称"
    t.string   "latin_name",                                comment: "学名"
    t.string   "other_name",                                comment: "别名：a,A"
    t.string   "source",                                    comment: "记录出处"
    t.string   "diseases_list",                             comment: "治疗什么病：感冒,咳嗽"
    t.string   "efficacie_list",                            comment: "有什么药效：清热,解毒"
    t.string   "resistance",                                comment: "药性：甘平／苦寒"
    t.string   "shape",                                     comment: "形态"
    t.string   "region",                                    comment: "产地"
    t.string   "harvest",                                   comment: "采收季节"
    t.string   "officinal",                                 comment: "药用部分"
    t.text     "indications",    limit: 65535,              comment: "主治描述"
    t.text     "note",           limit: 65535,              comment: "附，注"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  create_table "prescription_details", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "medicine_id",                  comment: "药"
    t.integer  "prescription_id",              comment: "药方"
    t.integer  "package",                      comment: "包装数量"
    t.integer  "package_unit",                 comment: "包装类型"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["medicine_id"], name: "index_prescription_details_on_medicine_id", using: :btree
    t.index ["prescription_id"], name: "index_prescription_details_on_prescription_id", using: :btree
  end

  create_table "prescription_diseases", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "disease_id",                   comment: "病"
    t.integer  "prescription_id",              comment: "处方"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["disease_id"], name: "index_prescription_diseases_on_disease_id", using: :btree
    t.index ["prescription_id"], name: "index_prescription_diseases_on_prescription_id", using: :btree
  end

  create_table "prescriptions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id",                                  comment: "贡献者"
    t.string   "link",                                     comment: "拓展连接"
    t.string   "name",                                     comment: "名称"
    t.string   "diseases_list",                            comment: "治疗什么病：感冒,咳嗽"
    t.text     "detail",        limit: 65535,              comment: "药方明细"
    t.text     "note",          limit: 65535,              comment: "药方描述"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["user_id"], name: "index_prescriptions_on_user_id", using: :btree
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "name_en"
    t.string   "qq"
    t.string   "email",                                 null: false
    t.string   "mobile"
    t.string   "telephone"
    t.string   "encrypted_password",                    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,    null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.boolean  "is_valid",               default: true
    t.integer  "status",                                             comment: "用户状态"
    t.integer  "role_id"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
