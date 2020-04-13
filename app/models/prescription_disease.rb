class PrescriptionDisease < ApplicationRecord
  belongs_to :prescription
  belongs_to :disease
end