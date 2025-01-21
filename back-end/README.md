# README
Welcome to the front-end repository for CareConnect is a platform that bridges the gap between organizations seeking help and volunteers eager to make a positive impact in their communities. Our mission is simple yet powerful: **Creating connections for good**.

This repository contains Ruby application code, which interfaces with our Front-end Repository.
Setting Up Your Environment

Clone the repo: https://github.com/Code-the-Dream-School/herring-team1.git

Create a dev branch: git checkout -b dev

Creating your Dotenv file
In your root directory, create a new file named ".env"

VITE_REACT_URL=http://127.0.0.1:3000/

DB_USERNAME=

DB_PASSWORD=

DB_HOST=

DB_PORT=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=


Setting up the master key for the development environment
MASTER_KEY =

Getting Started
Dependencies
Installing
To get the application up and running after cloning:

you'll need to run Ruby v3.3.4
** ruby -v or ** rbenv install 3.3.4

bundle update

rails db:migrate

Executing program
bin/rails s


Testing
To run tests: bin/rspec

After following the steps in the document, run the following command to verify that there are no errors

bin/rails credentials:show


