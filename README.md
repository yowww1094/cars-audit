
# 🚗 Cars Audit

Cars Audit is a web-based application designed to manage and monitor vehicle audit records. It provides a simple interface to add, view, and update car details, including brand, model, year, and notes. The app is built using Node.js, Express, and EJS for server-side rendering, with a MongoDB database for storage.


## 🔧 Features

 - Add new car records with details such as brand, model, year, and audit notes
 - View all recorded cars in a simple tabular format
 - Edit existing records directly from the interface
 - Built with a minimalist UI using Tailwind CSS and EJS
 - MongoDB for persistent storage
 - RESTful routes and clean structure
## 📸 Screenshots



## 📦 Tech Stack

 - **Backend:** Node.js, Express.js.
 - **Frontend:** ReactJS.
 - **Database:** MongoDB (via Mongoose).
 - **Styling:** Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

 - [Node.js](https://nodejs.org/en)
 - [MongoDB](https://www.mongodb.com/) (running locally or using MongoDB Atlas)

### Installation

#### **1. Clone the repository:**

```bash
git clone https://github.com/yowww1094/cars-audit.git
cd cars-audit
```

#### **2. Install dependencies:**

```bash
npm install
```

#### **3. Set up environment variables:**

Create a `.env` file in the root with the following content:
```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

#### **4. Run the app:**

```bash
npm start
```
The app will be running at http://localhost:3000.


## 📁 Project Structure

```bash
cars-audit/
│
├── public/            # Static files (CSS)
├── routes/            # Express routes
│   └── carRoutes.js   # Car-related routes
├── views/             # EJS templates
├── models/            # Mongoose models
│   └── Car.js
├── .env               # Environment variables
├── app.js             # Main Express application
├── package.json
└── README.md
```

## 🛠️ Future Improvements

 - Export audit reports (PDF/CSV).

 - Add filtering and sorting.

 - External integrations with a mobile app.
