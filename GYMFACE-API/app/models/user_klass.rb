class UserKlass < ApplicationRecord
  belongs_to :user
  belongs_to :klass

  validates_uniqueness_of :user_id, :scope => :klass_id
end
