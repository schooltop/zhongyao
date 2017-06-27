class Disease < ApplicationRecord
  has_many :medicine_diseases
  has_many :prescription_diseases	
end
