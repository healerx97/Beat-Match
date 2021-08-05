class CreateTrackTags < ActiveRecord::Migration[6.1]
  def change
    create_table :track_tags do |t|
      t.belongs_to :track, null: false, foreign_key: true
      t.belongs_to :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
