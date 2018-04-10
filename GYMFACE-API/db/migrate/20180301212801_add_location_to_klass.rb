class AddLocationToKlass < ActiveRecord::Migration[5.1]
  def change
    add_column :klasses, :location_id, :integer
  end
end
