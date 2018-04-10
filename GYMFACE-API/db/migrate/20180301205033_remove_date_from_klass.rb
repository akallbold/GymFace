class RemoveDateFromKlass < ActiveRecord::Migration[5.1]
  def change
    remove_column :klasses, :date, :date
  end
end
