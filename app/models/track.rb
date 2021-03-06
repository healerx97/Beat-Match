class Track < ApplicationRecord
  belongs_to :user
  has_many :track_tags, dependent: :destroy
  has_many :tags, through: :track_tags

  validates :user_id, :title, :song_url, presence: true
end
