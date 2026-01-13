class CreateTasks < ActiveRecord::Migration[8.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.integer :status, default: 0, null: false
      t.date :due_date
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :tasks, :due_date
  end
end
