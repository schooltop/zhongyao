class Medicine < ApplicationRecord
	has_many :alias_names
	has_many :medicine_diseases
	has_many :medicine_efficacies
end
