class AddFaceIdToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :face_id, :string
  end
end
