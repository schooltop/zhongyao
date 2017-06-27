class Prescription < ApplicationRecord
  has_many :attachments, as: :attachment_entity
  belongs_to :user
  has_many :prescription_details
  has_many :prescription_diseases
end
