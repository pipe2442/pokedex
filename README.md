## 🚀 Running the project locally

This repository contains two separate applications:

- api → Rails backend  
- frontend → Next.js frontend  

Both must be running at the same time.

---

## Requirements

To run this project you will need:

- Ruby **3.3+**
- Rails **8+**
- Node.js **20+**
- npm
- SQLite3 (used as the database)

If you don’t have Ruby, Rails or Node installed yet, I love the official GoRails tutorials:

https://gorails.com/setup/macos/26-tahoe  
https://gorails.com/setup/ubuntu/22.04  
https://gorails.com/setup/windows/11  

These guides will walk you through installing Ruby, Rails, Node.js and SQLite in a clean and safe way.  
You are free to use any other setup method if you prefer.

---

## Backend (Rails API)

cd api  
bundle install  
rails db:prepare  
rails s

Rails will be available at:
http://localhost:8000

---

## Demo user

After seeding the database, the application provides a default user:

Username: admin  
Password: admin  

---

## Frontend (Next.js)

Open a new terminal and run:

cd frontend  
npm install  
npm run dev  

The frontend will be available at:
http://localhost:3000

---

## Open the app

Open your browser and go to:
http://localhost:3000

Both servers must be running for the app to work properly.
