class CreateKlasses < ActiveRecord::Migration[5.1]
  def change
    create_table :klasses do |t|
      t.string :name
      t.string :instructor
      t.date :date
      t.time :start_time
      t.time :end_time

      t.timestamps
    end
  end
end
