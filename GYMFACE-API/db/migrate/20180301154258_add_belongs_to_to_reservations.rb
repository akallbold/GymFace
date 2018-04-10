class AddBelongsToToReservations < ActiveRecord::Migration[5.1]
  def change
    change_table :reservations do |t|
      t.belongs_to :user, foreign_key: true
    end
  end
end
