# 📘 Bench Allocation System - User Guide (v2.0)

Welcome to the **Premium Bench Allocation Management System**. This guide covers the installation, setup, and detailed usage instructions for all user roles (CEO, Manager, Employee).

---

## 🚀 Key Features
*   **Premium Glassmorphism UI**: Modern aesthetic with animated gradients, blur effects, and smooth transitions.
*   **Role-Based Access Control**: Distinct portals for CEOs, Managers, and Employees.
*   **Employee Directory**: Searchable database of **200+ employees** with filtering by Name and Skills.
*   **Advanced Dashboard**: Real-time visualization of occupancy rates, total benches, and pending requests.
*   **Profile Management**: Detailed employee profiles displaying **Skills** (e.g., React, Python) and **Experience**.
*   **Interactive Bench Map**: Visual grid system for assigning and deallocating seats.

---

## 🛠️ Installation & Setup

### Prerequisites
*   Node.js (v14+)
*   MongoDB (Local or Atlas)
*   Git

### 1. Clone & Install
```bash
git clone https://github.com/Chankrish7274/project2.o.git
cd project2.o/bench-allocation-system
```

### 2. Backend Setup
```bash
cd server
npm install
# Create a .env file with:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/bench_allocation
# JWT_SECRET=your_secret_key

# SEED THE DATABASE (Crucial Step!)
# This generates 200+ dummy users and default admin accounts.
node seed.js

npm run dev
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
Access the app at: **`http://localhost:5173`** (Check terminal if port differs).

---

## 👤 User Login Credentials (Default)

The system comes pre-loaded with these accounts:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **CEO** | `ceo@company.com` | `admin123` | Full Access (Stats, Directory, Benches, Requests) |
| **Manager** | `manager@company.com` | `manager123` | Full Access (Stats, Directory, Benches, Requests) |
| **Employee** | `robert.garcia1@company.com` | `password123` | Limited Access (Profile, My Bench, Request) |

*Note: The system contains 200 other employees with the password `password123`.*

---

## 📖 Feature Walkthrough

### 1. Brand New Landing Page
*   A stunning entry point featuring "Mesh Gradients" and a features overview.
*   Click **"Sign In"** or **"Get Started"** to access the login portal.

### 2. Dashboard
*   **CEO/Manager View**:
    *   **Stat Cards**: View live data for Total Benches, Occupancy Rate (%), and Pending Requests.
    *   **Office Updates**: Quick view of system status.
*   **Employee View**:
    *   **My Profile**: Shows your Name, Role, **Skills** (e.g., Node.js, AWS), and **Experience** (e.g., 5 years).
    *   **My Bench**: Shows your currently assigned seat number (e.g., B-104) or "Not Assigned".

### 3. Employee Directory (New!)
*   **Access**: Available to Managers & CEOs via the Navbar.
*   **Functionality**:
    *   View cards for all 200+ employees.
    *   **Search Bar**: Type "React" to find all React developers, or "Smith" to find specific people.
    *   **Status Indicators**: See who is "Allocated" (Green) vs "Unassigned" (Orange) at a glance.

### 4. Bench Allocation
*   **Visual Grid**: Benches are displayed as cards.
    *   🔴 **Red Dot**: Occupied. Hover to see who is sitting there.
    *   🟢 **Green Dot**: Available.
*   **Actions**:
    *   **Add Bench**: Create new seat capacity.
    *   **Assign**: Click on an available bench -> Select a User ID -> Confirm.
    *   **Deallocate**: Free up an occupied bench instantly.

### 5. Request Management
*   **Employees**: Can submit specific requests (e.g., "Need a seat near the window" or "Project changed").
*   **Managers**:
    *   View a clean table of all pending requests.
    *   **Approve/Reject** with a single click.
    *   Status updates are reflected instantly on the Employee's dashboard.

---

## 🔧 Troubleshooting

*   **White Screen / Crash**: 
    *   If you see an error box, click **"Clear Cache & Restart"**. This fixes issues caused by old browser data conflicting with the new database.
*   **"User Not Found"**:
    *   Ensure you ran `node seed.js` in the server directory to populate the users.
