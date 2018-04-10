class CreateReservations < ActiveRecord::Migration[5.1]
  def change
    create_table :reservations do |t|
      t.string :restaurant
      t.datetime :when

      t.timestamps
    end
  end
end
