# Health Monitoring and Notification System

## Project Overview
This system monitors patient health metrics and triggers notifications when patient health metircs crosses the set thresholds. Notifications are stored in a database and displayed on a web application. Physicians can view and manage threshold settings and real-time notifications.

---

## Backend Documentation

### Setup Instructions

1. **Environment Setup:**
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file:
     ```env
     DB_HOST=localhost
	 DB_PORT=5432
	 DB_USER=postgres
	 DB_PASSWORD=admin
	 DB_NAME=postgres
	 SERVER_PORT=3000
	 WEBSOCKET_PORT=3001
     ```
   - Start the backend:
     ```bash
     npm start
     ```

2. **Database Schema:**
   - Create the database:
     ```sql
     CREATE DATABASE health_monitor;
     ```
   - Create tables:
     ```sql
     CREATE TABLE health_metrics_threshold (
         id SERIAL PRIMARY KEY,
         metric VARCHAR(50),
         lower_limit NUMERIC,
         upper_limit NUMERIC,
         unit VARCHAR(50)
     );

     CREATE TABLE patient_information (
         patient_id SERIAL PRIMARY KEY,
         name VARCHAR(50),
		 age INT,
		 gender VARCHAR(10),
		 contact VARCHAR(20),
		 address TEXT
     );

     CREATE TABLE patient_health_data (
         id SERIAL PRIMARY KEY,
         patient_id INT NOT NULL,
		 name VARCHAR(50) NOT NULL,
         heart_rate INT,
         blood_pressure_systolic INT,
         blood_pressure_diastolic INT,
         temperature FLOAT,
         spo2 INT,
         respiratory_rate INT,
         cholesterol INT,
         weight FLOAT,
         timestamp TIMESTAMP
     );

     CREATE TABLE notifications (
         id INT PRIMARY KEY,
         patient_id INT,
         patient_name VARCHAR(50),
         breached_metrics JSON NOT NULL,
         timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         read BOOLEAN DEFAULT FALSE
     );
     ```

---

### API Documentation

#### 1. **Thresholds**
   - **Get All Thresholds**
     - **Endpoint:** `GET /api/thresholds`
     - **Response:**
       ```json
       [
         {
           "id": 1,
           "metric": "Heart Rate",
           "lower_limit": 60,
           "upper_limit": 100,
           "unit": "bpm"
         }
       ]
       ```

   - **Update Threshold**
     - **Endpoint:** `PUT /api/thresholds/update`
     - **Body:**
       ```json
       {
         "metric": "Heart Rate",
         "lower_limit": 55,
         "upper_limit": 95
       }
       ```
     - **Response:**
       ```json
       { "message": "Threshold updated successfully." }
       ```

#### 2. **Notifications**
   - **Get All Notifications**
     - **Endpoint:** `GET /api/notifications`
     - **Response:**
       ```json
       [
         {
           "id": 1,
		   "patient_id": 101,
           "patient_name": "John Doe",
           "metrics": [
             { "metric": "Heart Rate", "value": 110, "lower": 60, "upper": 100 }
           ],
           "timestamp": "2023-01-01T12:00:00Z",
           "read": false
         }
       ]
       ```

   - **Mark Notification as Read**
     - **Endpoint:** `PUT /api/notifications/:id/read`
     - **Response:**
       ```json
       { "message": "Notification marked as read." }
       ```

#### 3. **Real-Time Notifications**
   - **WebSocket Connection**
     - **Endpoint:** `ws://localhost:3001`
     - **Message Example:**
       ```json
       {
         "id": 2,
		 "patient_id": 101,
         "patient_name": "Jane Doe",
         "metrics": [
           { "metric": "Temperature", "value": 101, "lower": 97, "upper": 99 }
         ],
		 read: false
       }
       ```

---

## Frontend Documentation

### Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file:
   ```env
   VITE_BASE_URL=http://localhost:3000
   VITE_WEBSOCKET_URL=ws://localhost:3001
   ```
   
3. Start the application:
   ```bash
   npm run dev
   ```

### Key Pages

#### 1. **Edit Thresholds**
   - Accessible at `/`
   - Allows editing of health metric thresholds with real-time updates to the backend.

#### 2. **Notifications**
   - Accessible at `/notifications`
   - Displays real-time and historical notifications.
   - Mark notifications as read by clicking on them.

---

### Key Components

#### **NavBar**
- Displays links to **Edit Thresholds** and **Notifications** pages.

#### **SlidingNotification**
- A pop-up notification displayed when a threshold is breached.
- Clicking the notification redirects to the **Notifications** page.

---


