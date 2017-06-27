class MedicineEfficacy < ApplicationRecord
  belongs_to :medicine
  belongs_to :efficacy
end