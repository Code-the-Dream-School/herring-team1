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

ActiveRecord::Schema[7.1].define(version: 2024_12_16_224628) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.string "street"
    t.string "city"
    t.string "state"
    t.string "zip_code"
    t.integer "volunteer_id"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_addresses_on_organization_id"
    t.index ["volunteer_id"], name: "index_addresses_on_volunteer_id"
  end

  create_table "auths", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "isOrganization"
    t.index ["email"], name: "index_auths_on_email", unique: true
    t.index ["reset_password_token"], name: "index_auths_on_reset_password_token", unique: true
  end

  create_table "org_services", force: :cascade do |t|
    t.integer "organization_id", null: false
    t.integer "service_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_org_services_on_organization_id"
    t.index ["service_id"], name: "index_org_services_on_service_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.integer "auth_id", null: false
    t.string "name", limit: 150, null: false
    t.string "website", limit: 100
    t.string "phone", limit: 15
    t.string "description", limit: 255
    t.string "mission", limit: 255
    t.string "logo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["auth_id"], name: "index_organizations_on_auth_id"
  end

  create_table "requests", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.integer "org_service_id", null: false
    t.string "status", default: "open"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["org_service_id"], name: "index_requests_on_org_service_id"
  end

  create_table "services", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "volunteer_applications", force: :cascade do |t|
    t.integer "volunteer_id"
    t.integer "request_id"
    t.integer "application_status", default: 0
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "volunteers", force: :cascade do |t|
    t.integer "auth_id", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "phone"
    t.text "about"
    t.string "profile_img"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["auth_id"], name: "index_volunteers_on_auth_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "addresses", "organizations"
  add_foreign_key "addresses", "volunteers"
  add_foreign_key "org_services", "organizations"
  add_foreign_key "org_services", "services"
  add_foreign_key "organizations", "auths"
  add_foreign_key "requests", "org_services"
  add_foreign_key "volunteers", "auths"
end
