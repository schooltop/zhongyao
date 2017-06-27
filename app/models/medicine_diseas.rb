class MedicineDiseas < ApplicationRecord
  belongs_to :medicine
  belongs_to :diseas
end