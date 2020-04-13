class MedicineDisease < ApplicationRecord
  belongs_to :medicine
  belongs_to :disease
end