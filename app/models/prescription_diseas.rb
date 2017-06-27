class PrescriptionDiseas < ApplicationRecord
  belongs_to :prescription
  belongs_to :diseas
end