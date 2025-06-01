# ♟ PoliChess

**PoliChess** is a web platform designed to help educational institutions organize chess tournaments and manage player participation easily. Built with Angular and Node.js, this system allows administrators to create news, register tournaments, and view student sign-ups. Students (players) can register, log in, and enroll in tournaments through a clean and intuitive interface.

---

## 📸 Preview

![polichess screen](https://github.com/user-attachments/assets/a2d9fdcb-6cb7-4299-84f7-262331d5d814)

---


## 🛠 Technologies Used

### Frontend
- Angular 18
- Angular CLI 18.2.12
- Custom CSS

### Backend
- Node.js 20.10.0
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication

---

## ✨ Features

- ✅ User registration and login (players)
- ✅ Admin dashboard to create tournaments and post news
- ✅ Comment section under each news post
- ✅ Tournament sign-ups by users
- ✅ Various filters for users, news and tournaments
- ✅ Roles: regular user vs admin (different privileges)
- ✅ Clean and responsive UI

---

## 🎯 Purpose

PoliChess was developed to support schools or educational institutions that run chess tournaments. The system gives staff a way to:
- Create and manage tournaments
- Monitor which students sign up
- Share news related to chess events

Students can register themselves, see upcoming events, and sign up to participate.

---

## 🚀 How to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/lautaroeberle/Polichess.git
cd Polichess
```
### 2. Install dependencies

# Backend
```bash
cd back
npm install
```
# Frontend
```bash
cd ../front
npm install
```

### 3. Add environment information
Inside the back folder, modify the environment infomation of the files ".env.develompent" and ".env.test":
DB_NAME=your_database_name
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
// Info must be in quotes ""

### 4. Run the project

### Frontend
```bash
cd front
ng serve
```
### Backend
```bash
cd back
npm run dev
```
Then open your browser and go to: http://localhost:4200

