class ChangeTimeToDatetime < ActiveRecord::Migration[5.1]
  def change
    remove_column :klasses, :start_time, :time
    remove_column :klasses, :end_time, :time
    add_column :klasses, :start_time, :datetime
    add_column :klasses, :end_time, :datetime
  end
end
