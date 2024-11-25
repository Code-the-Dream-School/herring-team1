# Steps to Deploy on Render

We want to deploy the project to Render.com, so that it is available
on the internet.  This takes several steps.

## Step 1: Having Rails Serve Up React

We could have put the front end and back end code in different
repositories, as many other teams are doing.  But we didn't do
it this way.  Render.com will get a copy of the entire git repository.
We want to serve up the React code from the back end Rails server.
That way, there is only one service to start.  How do we do this?

The idea is to do a React (Vite, in this case) build, and to deliver
the content of the build to the back-end/public directory.  So, we'll
create the necessary `.env.local file`, with `VITE_REACT_URL=/`.  We
also change the configuration of the build, by adding the following
stanza to `front-end\vite.config.js` in `defineConfig()`:
```javascript
  build: {
    outDir: '../back-end/public', 
  },
```
We don't want the results of the build to be propagated to github,
so we create a `back-end\public\.gitignore` file, with the following
contents:
```
*
!.gitignore
!robots.txt
```
Now we run the build.  From within the front-end directory, run:
```shell
npm run build
```
Note that if you change front end code or the environment file, you have
to re-run the build.

Then start the rails server.  Do not start the front end!  To get to
the front end, do:
```
http://localhost:3000
```
You see the front end.  Verify that you can do a registration operation.
You won't typically run your front end this way in development, but that's
the way it will run on Render.com.

## Step 2: Convert to Postgres

The project has been started with SQLite.  You can't use that on
Render.com, because SQLite just writes to a local file, and that won't
work on Render.com or other cloud deployments. So you have to convert
to Postgres.  Whenever you configure the database for your application,
you need three databases.  This is because you don't want test or development
data operations to affect one another, and you certainly don't want them
to affect production data.  SQLite configuration sets up the following:
```yml
# SQLite. Versions 3.8.0 and up are supported.
#   gem install sqlite3
#
#   Ensure the SQLite 3 gem is defined in your Gemfile
#   gem "sqlite3"
#
default: &default
  adapter: sqlite3
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  timeout: 5000

development:
  <<: *default
  database: storage/development.sqlite3

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: storage/test.sqlite3

production:
  <<: *default
  database: storage/production.sqlite3
```
Ok, three databases are needed.  But, we're using the Render.com free
plan, which only lets you create one database.  Of course, you could
pony up some money to Render.com so that you can create more.  But, we'll
install Postgres on the local machine and create the dev and test
databases there.  We can't use a local machine database for a Render.com
deployment, so we'll create the production database on Render.com.

The exact steps you need to follow to install Postgresql depends on your
platform.  After installing Postgresql, you have to grant full acces to
the user account you use to run the Rails server.   On linux, the command
is:
```shell
sudo -u postgres createuser <your_id_here>
```
Then you have to start the postgresql service.  If
you restart your computer, you then have to start Postgresql again, although
you can configure it to start automatically.  See the Postgresql documentation
for instructions on all of this.

You might be thinking that you could use SQLite for
development and test, and Postgres for production ... but that would be a *bad*
idea.  Database implementations don't work quite the same, so things that work
for one SQL may not work for another. 

The following steps assume that you have the Postgresql
service installed and running, and that the Rails server has been stopped for
the moment.  You first change `back-end/Gemfile` to comment out this line:
```ruby
gem "sqlite3", ">= 1.4"
```
Add this line:
```ruby
gem "pg"
```
Then run `bin/bundle install` to get the postgres gem.

Next, you edit the `back-end/config/database.yml` as follows:
```yml
default: &default
  adapter: postgresql
  encoding: utf8
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  timeout: 5000

development:
  <<: *default
  database: herring1-dev

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: herring1-test
```
We're not ready for the production one at this point, because
the production one will poitn to a Postgres instance on Render.com,
and we haven't created that one yet.
The dev and test databases should now work.  Do a `bin/rails db:create`
to create them.
if they do.Do a `bin/rails db:migrate` to create the development database schema.
Then start the server and see if you can
register a user.  Then stop the server, and do `RAILS_ENV=test bin/rails db:migrate`
to load the schema into the test database.  Then start the server again, 
with `RAILS_ENV=test bin/rails server` to bring up the Rails server in test mode,
and verify that you can register a user.  If all is working, you have converted
the application to Postgres ... except, of course, for production.

## Step 3: Creating the Production Database

You need to create a production database on Render.com.  If you don't
have a Render.com account, create one.  For the moment, stick to the free
plan.  I recommend that you tie your Render.com login to your Github account,
because you'll want to have access to your private Github repositories from
your Render.com account.

There are a bunch of limitations to the Render.com free plan:

- Only one Postgres database
- Slow build times for service deployment
- Slow startup times for services
- Not much memory for services, which can be a problem, for example
if your Rails application uses active storage.

Because of these limitations, I recommend that you not demo your
code using a free Render account.  It is good to know how to deploy
to the cloud, but if you want to make serious use of your Render.com
deployed services, you'll need to pay them.  For the moment, we're
just learning how to deploy, so a free account is enough.

Once you've signed in, go to the dashboard and create a project, which
you might call `herring1`.  You can use the default environment.  Then
click on the `+ New` in the menu bar, and select PosgreSQL.  You might
give the database name `herring1-prod`, and associate it with the `herring1`
project.  Take the free plan option, and use the other defaults.  Note: On the
free plan, the database and all its data disappears one month after it is created.

Once the database is created, you can scroll down to the external database URL.
Copy that to the clipboard.

Now, this URL contains a credential.  We don't want to put that in the code!
Rails provides a good place to keep it, in the `credentials.yml.enc`.  This
is an encrypted file.  You edit it with this command (you need to be in the back-end folder):
```shell
EDITOR="code --wait" bin/rails credentials:edit
```
Of course, as this is a `.yml` file, careful indentation is important.
You want the following:
```yml

renderpostgres:
  prod_uri: postgresql://herring1_prod...gobbledygook
```
where the prod_uri value is the external database URL you copied to the clipboard.
Save and close this file.  You have stored the connection information for
the production database as described in the database.yml.  THere are actually
two secrets in the credentials.yml.enc that your service uses.  The other is
the secret_key_base, which is used for the credentials that Devise generates.

Now, add these lines to the `config/database.yml`.
```yml

production:
  <<: *default
  url: <%= Rails.application.credentials.renderpostgres[:prod_uri] %>
  sslmode: "require"
```
You are referencing the entry you created in the credentials.yml.enc.

To test, stop the Rails server, if it is running, and load the schema into
the production database as follows
```shell
RAILS_ENV=production bin/rails db:migrate
```
We want to run the rails server locally, as if it were in production mode.
However, production mode requires SSL.  So edit `config/production.env`, and
comment out the line that says:
```ruby
config.force_ssl = true
```
This is a *temporary* change, just for testing!
Then start the rails server in production mode, as follows:
```shell
RAILS_ENV=production bin/rails server
```
Again, test that you can register a user.  Then do a git restore on
`config/production.env` to undo your temporary change.

There is one more thing you need to do to make Render.com happy.  The
project uses Ruby 3.2.1.  For some reason, Render.com wants a `.ruby_version`
file in the root of the project.  The one in the back-end folder doesn't
suffice.  So copy that file into the root.

## Step 4: Creating the Render Service

These are all the changes you need to deploy to Render.com.  Render.com
deploys from your Github repository.  So, add and commit your changes
and push your branch.

Then, go back to the Render.com dashboard, and click on the `+ New` again.
This time, you specify a web service.  If your repository is public, you
can point Render.com at that repository.  If not, you select Git Provider
and, after Render.com cranks for a while, it lets you choose one.  You may
have to click on the credentials pulldown to set up the connection.  (I
can't remember the exact steps here.  It's pretty easy for public repositories,
but a little more complicated for private ones.)  Then, select the
herring-team1 repository and the herring1 project.  For language, select Ruby.
Select the branch you just pushed.  Next you have to specify the build command.
In our case, this is a little complicated.  As follows:
```shell
cd front-end && npm install && npm run build && cd ../back-end && bin/bundle install && bin/rails db:migrate
```
You also have to specify the start command:
```shell
cd back-end && bin/rails server
```
Finally, you need some environment variables:
```
VITE_REACT_URL=/
RAILS_ENV=production
RAILS_MASTER_KEY= ...
```
The value you need for the RAILS_MASTER_KEY is in back-end/config/master.key.  That's
the encryption key for the credentials.yml.enc.

After you do that, click on `Deploy Web Service`.  This takes a few minutes, especially
on the free plan.  Eventually, it gives you a URL to try.  Test it out!

