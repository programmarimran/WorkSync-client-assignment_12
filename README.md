# 🚀 WorkSync – Smart Employee Management System  
📁 Category: Employee Monitoring & Salary Management  
🌐 Live Website: [https://worksync-by-imran.web.app/](https://worksync-by-imran.web.app/)

📦 Client Repo: [GitHub - WorkSync Client](https://github.com/programmarimran/WorkSync-client-assignment_12)  
🛠️ Server Repo: [GitHub - WorkSync Server](https://github.com/programmarimran/WorkSync-server-assignment_12)

---

## 📌 Overview

**WorkSync** is a full-featured employee management platform where Admins, HRs, and Employees collaborate to track work, process payments, and manage roles securely. It features role-based dashboards, real-time task logs, employee salary processing, and beautiful data visualizations. This project is built as a full-stack MERN app and fulfills all criteria for Assignment-12.

---

## 🖼️ Preview

### 🔹 Main Dashboard Preview

![Main Dashboard](https://i.ibb.co/wZyMVgDb/Screenshot-2025-07-22-003509.png)

### 🔗 Other Screenshots (click to view):
- [📷 Screenshot View](https://i.ibb.co/YFhWjnTC/Screenshot-2025-07-22-003400.png)
- [📷 Screenshot View](https://i.ibb.co/gk7x61k/Screenshot-2025-07-22-003628.png)
- [📷 Screenshot View](https://i.ibb.co/MxTqzX1t/Screenshot-2025-07-22-003801.png)

---

## 🌟 Core Features

- 👥 **Role-based Access Control**  
  - Admin / HR / Employee dashboard with protected routes via JWT

- 📝 **Employee Work Log**  
  - Add/Edit/Delete daily work updates  
  - Filter by task, hours, or date (with React Datepicker)  
  - Dynamic table with instant updates (TanStack Query + React Table)

- 💸 **Salary & Payment History**  
  - HR pays salary to verified employees via Stripe  
  - Admin confirms payroll request with audit trail  
  - Employees can view monthly payment history

- 📊 **Dashboard Analytics**  
  - Salary vs Month bar charts (Recharts)  
  - Work hour summary & visual indicators

- 🔐 **Secure Auth System**  
  - Firebase Auth with email/password and Google OAuth  
  - JWT-based backend protection (role-specific)

- 📤 **Image Upload System**  
  - User photos uploaded to imgbb during registration

- 🔍 **Search & Filters**  
  - HR filters work records by employee/month  
  - Admin filters employee list and adjusts salary

- 🎨 **Modern & Clean UI**  
  - Fully responsive (mobile/tablet/desktop)  
  - Framer Motion + Lottie Animations + Keen Slider

- 🌙 **Dark/Light Mode Support**  
  - Toggle switch available across all pages

- ✅ **Sweet Alerts & Toasts**  
  - No browser alerts! Fully integrated SweetAlert2 and Toastify

---

## 🧰 Tech Stack & Tools

| Category       | Tools / Libraries |
|----------------|-------------------|
| Frontend       | React.js, React Router, TanStack Query, Context API |
| Styling        | Tailwind CSS, DaisyUI |
| Animations     | Framer Motion, Lottie, Keen Slider |
| Charts         | Recharts |
| Auth           | Firebase Auth, JWT |
| Payment        | Stripe Payment Gateway |
| HTTP Client    | Axios (withCredentials) |
| Alerts         | SweetAlert2, React Toastify |
| Datepicker     | react-datepicker |
| Icons & UI     | Lucide React, React Icons |
| Deployment     | Firebase Hosting |
| Backend        | Express.js, MongoDB, Stripe, Firebase Admin SDK |

---

## 🔐 Admin Credentials

| Role  | Email             | Password  |
|-------|------------------|-----------|
| Admin | imran@gmail.com  | Abc123*   |

---

## ⚙️ Getting Started (Run Locally)

```bash
# 1. Clone the Repositories
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-programmarimran.git
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-programmarimran.git

# 2. Install Dependencies
cd b11a12-client-side-programmarimran
npm install

cd ../b11a12-server-side-programmarimran
npm install

# 3. Set up Environment Variables

# In client/.env:
VITE_API_URL=https://your-server-api.com
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-id
VITE_FIREBASE_APP_ID=your-id

# In server/.env:
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=your-stripe-secret-key

# 4. Run Development Servers
# Client:
npm run dev

# Server:
npm run start

# App should be available at:
http://localhost:5173
```

---

## 📬 Developer Info

| Field        | Info                         |
|--------------|------------------------------|
| 👨‍💻 Name      | Md Imran Hasan               |
| 💼 Role      | MERN Stack Developer          |
| 📧 Email     | programmarimran@gmail.com     |
| 🌐 Portfolio | [https://imran-dev-portfolio.vercel.app/](https://imran-dev-portfolio.vercel.app/)                   |

---

✅ **40+ GitHub Commits (Client)**  
✅ **15+ GitHub Commits (Server)**  
✅ **Fully Responsive for All Devices**  
✅ **Dark Mode & Clean Design**  
✅ **JWT-Protected Role-Based Routes**  
✅ **Stripe Payment Gateway Integrated**

---

> Thank you for visiting WorkSync – Stay Productive, Stay Synced! 🕒✨
