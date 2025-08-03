# Tuito 📚💰🔔

**Tuito** is a mobile application designed for tutors to manage their students' tuition fees with ease. It helps track payment status, send WhatsApp reminders, and stay organized.

## 🚀 Features

- 📋 Add and view student details
- 💳 Track fee due dates manually
- 🔔 Send WhatsApp reminders (manual)
- ✏️ Edit student details
- 🔐 User authentication (Email & Password)
- ⚙️ Settings screen (logout, reminder toggle)
- 🧾 Sorted list view by name/due date
- 📱 Push notifications for due reminders (via Expo or Firebase)

## 🔧 Tech Stack

- **Frontend:** React Native (Expo)
- **Backend:** Spring Boot (REST APIs, JWT Auth)
- **Database:** PostgreSQL / MySQL
- **Auth:** JWT-based login/signup
- **Notifications:** Expo Push Notification API
- **Messaging:** WhatsApp via `Linking.openURL()`

## 📲 Screens

- Home screen with filters & due tracking
- Add/Edit Student Form
- Settings (Logout & Preferences)
- Splash and login/signup screens

## 🛠️ Setup Instructions

1. Clone the repo
2. Install dependencies

```bash
npm install
