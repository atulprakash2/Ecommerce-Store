🛒 Ecommerce Store

A full-stack Ecommerce Store built using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

✨ Features

- 🛍️ Product listing
- 🔎 Product details
- 🛒 Add to Cart
- ⚡ Buy Now
- 👤 User Registration
- 🔐 User Login
- 📦 Order Processing
- 💳 Checkout & Payment UI
- 📋 Order History
- 🗄️ MongoDB database
- 📱 Responsive design

🛠️ Technologies Used

Frontend

- HTML5
- CSS3
- JavaScript

Backend

- Node.js
- Express.js

Database

- MongoDB
- Mongoose

📁 Project Structure

Ecommerce-Store/
│
├── config/
├── middleware/
├── models/
├── public/
│   ├── css/
│   ├── js/
│   └── *.html
├── routes/
├── seeds/
├── package.json
├── package-lock.json
└── server.js

🚀 Installation

1. Clone the repository

git clone https://github.com/atulprakash2/Ecommerce-Store.git

2. Go to the project folder

cd Ecommerce-Store

3. Install dependencies

npm install

4. Create ".env" file

Create a ".env" file in the project folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

«Never upload the ".env" file to GitHub.»

5. Start the server

node server.js

The server will run on:

http://localhost:5000

🗄️ Database

This project uses MongoDB to store:

- Users
- Products
- Cart
- Orders

📌 Project Purpose

This project was developed as a Full Stack Development / Ecommerce Store project to demonstrate frontend, backend, database, authentication, cart management, and order processing.

👨‍💻 Author

Atul Prakash

📄 License

This project is created for educational and project purposes.
