class Task < ApplicationRecord
  belongs_to :user

  enum :status, { todo: 0, in_progress: 1, done: 2 }, default: :todo

  validates :title, presence: true
  validates :status, inclusion: { in: statuses.keys }
end
