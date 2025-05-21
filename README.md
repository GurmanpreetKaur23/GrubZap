# 🍔 GrubZap - Online Food Ordering Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://grub-zap.onrender.com/)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-MERN-blueviolet?style=for-the-badge)](#tech-stack)


**GrubZap** is an online food ordering platform where users can explore nearby restaurants, view dynamic menus, and place food orders with ease. It also includes an admin panel for restaurant management.

🚀 **[Live Demo](https://grub-zap.onrender.com/)**

---

## 🌟 Features

- 📍 Location-based restaurant filtering
- 🛒 Add to Cart and Order Management
- 📦 Backend APIs for users, orders, restaurants
- 🧑‍💼 Admin panel for menu & order control (coming soon)
- 🎨 Beautiful UI with Tailwind CSS

---

## 🧰 Tech Stack

| Layer        | Tech                                |
|--------------|-------------------------------------|
| Frontend     | React, Tailwind CSS, React Router   |
| Backend      | Node.js, Express.js, SQL            |
| Database     | PostgreSQL / MySQL (configurable)   |
| Admin Panel  | React (Modular Dashboard UI)        |
| Hosting      | Render (Live Demo)                  |

---

## 📁 Project Structure

```bash
GrubZap/
├── client/       # Frontend (User interface)
├── server/       # Backend (API & DB integration)
└── admin/        # Admin Panel (Restaurant/Order Control)
```

## 🔧 Installation & Setup

Follow the steps below to run the project locally on your machine.

📦 1. Clone the Repository
``` bash
git clone https://github.com/GurmanpreetKaur23/GrubZap.git
cd GrubZap
```

🌐 2. Setup Frontend (Client)
``` bash
cd client
npm install
npm run dev
```
Dev Server: http://localhost:5173

Tech: React, Tailwind CSS, React Router

🖥️ 3. Setup Backend (Server)
```bash
cd ../server
npm install
npm run dev
```

API Server: http://localhost:5000

Handles: Authentication, Orders, Restaurant Data

🔐 Backend Environment Setup
Create a .env file inside /server with the following:

``` bash
PORT=5000
DATABASE_URL=your_database_url_here
JWT_SECRET=your_jwt_secret_here
```

🧑‍💼 4. Setup Admin Panel
```bash
cd ../admin
npm install
npm run dev
```
Admin UI: http://localhost:5174 (if using Vite default port)

Role: Manage menus, orders, users

## 👩‍💻 Authors

**Gurmanpreet Kaur**  🔗 [LinkedIn](https://www.linkedin.com/in/gurmanpreet-kaur) | 💻 [GitHub](https://github.com/GurmanpreetKaur23)

**Gurnimrat Singh**   🔗 [LinkedIn](https://www.linkedin.com/in/gurnimrat-singh) | 💻 [GitHub](https://github.com/gurnimrat-singh1)

**Guntas Singh**      🔗 [LinkedIn](https://www.linkedin.com/in/guntas15) | 💻 [GitHub](https://github.com/guntas15)

