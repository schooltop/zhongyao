class CreateAttachments < ActiveRecord::Migration[5.0]
  def change
    create_table :attachments do |t|
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
  end
end
