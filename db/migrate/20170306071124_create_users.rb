class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string   "name"
      t.string   "name_en"
      t.string   "qq"
      t.string   "email",     null: false
      t.string   "mobile"
      t.string   "telephone"
      t.string   "encrypted_password",  null: false
      t.string   "reset_password_token"
      t.datetime "reset_password_sent_at"
      t.datetime "remember_created_at"
      t.integer  "sign_in_count",          default: 0,    null: false
      t.datetime "current_sign_in_at"
      t.datetime "last_sign_in_at"
      t.string   "current_sign_in_ip"
      t.string   "last_sign_in_ip"
      t.boolean  "is_valid",               default: true
      t.integer  "status",                                             comment: "用户状态1active"
      t.integer  "role_id",                                             comment: "1用户，2管理员"
      t.timestamps
      t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
      t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    end
  end
end
