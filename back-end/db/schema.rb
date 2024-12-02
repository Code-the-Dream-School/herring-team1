# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

# rubocop:disable Metrics/BlockLength, Layout/CommentIndentation
ActiveRecord::Schema[7.1].define(version: 2024_11_25_013056) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string "address", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "zip_code", null: false
    t.string "addressable_type", null: false
    t.bigint "addressable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable"
  end

  create_table "auths", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "isOrganization", default: false, null: false
    t.index ["email"], name: "index_auths_on_email", unique: true
    t.index ["reset_password_token"], name: "index_auths_on_reset_password_token", unique: true
  end

  create_table "organizations", force: :cascade do |t|
    t.bigint "auth_id", null: false
    t.string "name", limit: 150, null: false
    t.string "website", limit: 100
    t.string "phone", limit: 15
    t.string "description", limit: 255
    t.string "mission", limit: 255
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["auth_id"], name: "index_organizations_on_auth_id"
  end

  create_table "volunteers", force: :cascade do |t|
    t.integer "auth_id"
    t.string "first_name"
    t.string "last_name"
    t.string "profile_img"
    t.string "phone"
    t.string "email"
    t.text "about"
    t.text "services"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "organizations", "auths"
# rubocop:enable Metrics/BlockLength, Layout/CommentIndentation
end
