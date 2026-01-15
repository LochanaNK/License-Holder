# 🚗 V-Alert: Vehicle Document Manager

**V-Alert** is a mobile application built with React Native and Expo, designed to help vehicle owners in Sri Lanka manage their critical documents. The app tracks **Licenses, Insurance, and Emission Certificates**, providing automated "Smart Notifications" to ensure you never miss an expiry date.

---

## 🚀 Key Features

### 1. Document Lifecycle Management (CRUD)
* **Centralized Tracking:** Manage Driving Licenses, Insurance Policies, and Emission Test Certificates in one place.
* **Dedicated Categories:** Customized forms for different document types (e.g., Company Names for Insurance, Holder Names for Licenses).
* **Persistent Storage:** Uses **SQLite** via `expo-sqlite` for local, offline-first data persistence.

### 2. Smart Notification Engine 🔔
Unlike standard reminders, V-Alert uses custom-built logic to handle time-sensitive alerts:
* **Dual-Alert System:** Automatically schedules reminders **5 days** and **1 day** before expiry.
* **9:00 AM Scheduling:** Future alerts are scheduled for 9:00 AM to ensure they are seen at the start of the day.
* **Instant Fallback:** If a user adds a document that expires tomorrow, the app detects that 9:00 AM has already passed and triggers an **Instant Notification** within 5 seconds.
* **Identifier-Based Sync:** When a record is updated or deleted, the app automatically cancels the old scheduled notifications using a unique naming convention (`type-id-days`) to prevent "ghost" alerts.

### 3. User Experience & UI
* **Toast Feedback:** Uses `react-native-root-toast` for immediate UI confirmation on Save/Update/Delete actions.
* **Responsive Design:** Styled with **NativeWind (Tailwind CSS)** for a modern, clean look.
* **Header Optimization:** Fixed header truncation issues to ensure screen titles are readable across all device sizes.
* **Platform Specifics:** Custom notification channels for Android to ensure high-priority delivery.

---

## 🛠️ Tech Stack

* **Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
* **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
* **Database:** [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
* **Styling:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
* **Notifications:** [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
* **Icons:** [@expo/vector-icons](https://docs.expo.dev/guides/icons/) (FontAwesome 6 & Fontisto)

---

## 🏗️ Project Structure

```text
├── app/                  # Expo Router directory (Screens & Layouts)
├── components/           # Reusable UI components (Modals, List Items)
├── controllers/          # Database logic (SQLite CRUD operations)
├── services/             # Business logic (Smart Notification Service)
├── util/                 # Database initialization & utility helpers
└── assets/               # Images and local fonts

```
