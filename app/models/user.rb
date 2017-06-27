class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :prescriptions       


  def is_active?
    self.status.to_i == 1
  end

  def is_worker?
    self.role_id.to_i == 2
  end

  
end