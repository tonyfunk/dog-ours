class Dog < ApplicationRecord
  SIZES = %w[Small Medium Large]
  belongs_to :breed
  belongs_to :user
  has_one_attached :photo
  validates :size, inclusion: { in: SIZES }
end
