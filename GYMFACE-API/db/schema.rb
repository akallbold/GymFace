# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180306152132) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "klasses", force: :cascade do |t|
    t.string "name"
    t.string "instructor"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "location_id"
    t.datetime "start_time"
    t.datetime "end_time"
  end

  create_table "reservations", force: :cascade do |t|
    t.string "restaurant"
    t.datetime "when"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_reservations_on_user_id"
  end

  create_table "user_klasses", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "klass_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["klass_id"], name: "index_user_klasses_on_klass_id"
    t.index ["user_id"], name: "index_user_klasses_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password_digest"
    t.integer "home_club_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
    t.string "face_id"
  end

  add_foreign_key "reservations", "users"
  add_foreign_key "user_klasses", "klasses"
  add_foreign_key "user_klasses", "users"
end
