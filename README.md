# Scanetrix

**Scanetrix** is a full-stack web application that enables users to upload and visualize medical scan data in 3D. Utilizing machine learning for volumetric transformation and VTK.js for high-performance rendering, the platform is designed for clinicians, radiologists, and medical researchers who require an efficient and interactive way to view and analyze medical imaging data.

The application provides core functionalities such as 3D volume rendering, slice navigation, multi-planar reconstruction (MPR) views, secure file upload handling, a dashboard for previous visualizations, and user authentication.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Installation and Setup](#installation-and-setup)
- [Machine Learning Pipeline](#machine-learning-pipeline)
- [Database and Storage Strategy](#database-and-storage-strategy)
- [Future Roadmap](#future-roadmap)
---

## Features

- Upload support for DICOM, NIfTI, PNG, and JPG medical imaging files
- Machine learning pipeline to convert raw scans into 3D volume data
- Interactive 3D volume rendering using VTK.js
- Slice navigation and multi-planar reconstruction (MPR) views
- Export functionality for rendered views and specific slice images
- User authentication using JWT (JSON Web Tokens)
- Dashboard view for accessing and managing previous uploads
- Minimalist, responsive user interface built with modern design principles

---

## Technology Stack

**Frontend:**
- React.js (ES6+)
- CSS Modules (no external frameworks like Tailwind)
- VTK.js for 3D visualization

**Backend:**
- Python 3.10+
- Flask (REST API)
- Flask-JWT-Extended for authentication
- Flask-CORS for cross-origin resource sharing
- Flask-SQLAlchemy ORM

**Database:**
- PostgreSQL or SQLite (configurable)
- SQLAlchemy for schema and query management

**Storage:**
- Local disk storage for development
- Optional: Cloud storage (AWS S3, GCP Storage) for production environments

**Machine Learning:**
- PyTorch or TensorFlow model for volume reconstruction
- Preprocessing and postprocessing pipelines in Python

---

## System Architecture

The system is divided into three major layers:

1. **Frontend Layer** (React + VTK.js)
   - Handles UI rendering and visualization
   - Communicates with Flask API via `fetch`

2. **Backend API** (Flask)
   - Manages file uploads, ML inference, user authentication, and data access

3. **Persistence Layer**
   - Stores uploaded files (temporarily or permanently)
   - Maintains user session data and previous scans in a relational database

---


---

## Installation and Setup

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Flask server will be running at: http://localhost:5000
```

Frontend (React)
```bash
Copy code
cd client
npm install
npm run dev
React app will run at: http://localhost:3000
```

## Machine Learning Pipeline:
   
The backend includes a placeholder for integrating a trained ML model that processes DICOM or NIfTI input files into a 3D volume. This output is then served to the frontend for visualization via VTK.js.

## Database and Storage Strategy:
   
**Relational Database**: SQLAlchemy handles user data and metadata of uploaded scans.

**File Storage**: Uploaded scans are stored on the filesystem under uploads/ by default. Cloud-based storage is recommended for production use.

**Scalability**: System is designed to support eventual migration to PostgreSQL and distributed object storage.


