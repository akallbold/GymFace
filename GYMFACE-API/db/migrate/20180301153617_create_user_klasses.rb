class CreateUserKlasses < ActiveRecord::Migration[5.1]
  def change
    create_table :user_klasses do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :klass, foreign_key: true

      t.timestamps
    end
  end
end
