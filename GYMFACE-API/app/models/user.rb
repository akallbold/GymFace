class User < ApplicationRecord
  has_many :user_klasses
  has_many :klasses, through: :user_klasses
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
  validates :home_club_id, presence: true
  validates :face_id, presence: true

end
