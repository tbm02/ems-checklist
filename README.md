# Employee Management System (EMS)

A comprehensive, full-stack Employee Management System built with Spring Boot and React.js, featuring role-based access control, leave management, project tracking, and administrative tools.

## 🏗️ Architecture Overview

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   React.js      │ ───────────────▶ │   Spring Boot   │
│   Frontend      │                 │   Backend       │
│   (Port 3000)   │ ◀─────────────── │   (Port 5001)   │
└─────────────────┘    JSON/JWT     └─────────────────┘
                                              │
                                              │ JPA/Hibernate
                                              ▼
                                    ┌─────────────────┐
                                    │   PostgreSQL    │
                                    │   Database      │
                                    └─────────────────┘
```

## 🚀 Tech Stack

### Backend

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT
- **ORM**: Spring Data JPA
- **Migration**: Flyway
- **Build**: Maven

### Frontend

- **Framework**: React 18.2.0
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Context
- **UI Components**: Lucide React Icons

## ✨ Features

### 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (ADMIN/EMPLOYEE)
- Secure password hashing
- Session management

### 📋 Core Modules

#### 👥 User Management

- **ADMIN**: Create employee accounts
- **BOTH**: Profile management with photo upload
- User directory and search

#### 🗓️ Leave Management

- **EMPLOYEE**: Apply for different leave types
- **EMPLOYEE**: View leave history and status
- **ADMIN**: Approve/reject leave requests
- **ADMIN**: Leave analytics and reporting

#### 📂 Project Management

- **ADMIN**: Create and manage projects
- **ADMIN**: Assign project leads and team members
- **EMPLOYEE**: View assigned projects
- **EMPLOYEE**: Project timeline visualization

#### 📜 Policy Management

- **ADMIN**: Create/update company policies
- **EMPLOYEE**: Read-only access to policies
- Policy versioning and effective dates

#### ✋ Resignation Module

- **EMPLOYEE**: Submit resignation requests
- **ADMIN**: Review and approve resignations
- Exit process management

#### 🔔 Notification System

- Real-time notifications for actions
- **ADMIN**: Leave request alerts
- **EMPLOYEE**: Status update notifications
- Notification history and management

#### 📊 Dashboards

- **ADMIN**: Organization overview, statistics, pending requests
- **EMPLOYEE**: Personal dashboard, project timeline, leave balance
- Interactive charts and analytics

#### 📢 Announcements

- **ADMIN**: Create company announcements
- **EMPLOYEE**: View announcement feed
- Priority levels and targeting

## 🏃‍♂️ Quick Start

### Prerequisites

- Java 17+
- Node.js 16+
- PostgreSQL 12+
- Maven 3.6+
- Git

### 1. Database Setup

```sql
CREATE DATABASE ems_db;
CREATE USER ems_user WITH PASSWORD 'ems_password';
GRANT ALL PRIVILEGES ON DATABASE ems_db TO ems_user;
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies and run migrations
mvn clean install
mvn flyway:migrate

# Start the Spring Boot application
mvn spring-boot:run
```

Backend will be available at `http://localhost:5001`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will be available at `http://localhost:3000`

### 4. Access the Application

#### Default Admin User

- **Username**: `admin`
- **Password**: `admin123`
- **Role**: ADMIN

#### Default Employee User

- **Username**: `john.doe`
- **Password**: `employee123`
- **Role**: EMPLOYEE

## 📁 Project Structure

```
EMS/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/com/ems/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── repository/     # Data access layer
│   │   ├── entity/         # JPA entities
│   │   ├── security/       # Security configuration
│   │   └── dto/           # Data transfer objects
│   ├── src/main/resources/
│   │   ├── db/migration/  # Flyway migrations
│   │   └── application.yml
│   └── pom.xml
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── contexts/      # React contexts
│   │   └── hooks/         # Custom React hooks
│   ├── public/
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication

```
POST /api/auth/login          # User login
POST /api/auth/register       # Register employee (Admin only)
POST /api/auth/logout         # User logout
```

### Employee Endpoints

```
GET  /api/employee/dashboard     # Dashboard data
GET  /api/employee/profile      # User profile
PUT  /api/employee/profile      # Update profile
POST /api/employee/leaves       # Apply for leave
GET  /api/employee/leaves       # Get user leaves
GET  /api/employee/projects     # Get assigned projects
GET  /api/employee/policies     # Get company policies
```

### Admin Endpoints

```
GET  /api/admin/dashboard       # Admin dashboard
GET  /api/admin/employees       # All employees
GET  /api/admin/leaves          # All leave requests
PUT  /api/admin/leaves/{id}/approve  # Approve leave
PUT  /api/admin/leaves/{id}/reject   # Reject leave
```

## 🗄️ Database Schema

### Core Tables

- `users` - User authentication and profiles
- `leaves` - Leave requests and approvals
- `policies` - Company policies
- `projects` - Project information
- `project_members` - Project team assignments
- `resignations` - Resignation requests
- `notifications` - System notifications
- `announcements` - Company announcements

## 🧪 Testing

### Backend Testing

```bash
cd backend
mvn test
```

### Frontend Testing

```bash
cd frontend
npm run test
```

## 📦 Production Build

### Backend

```bash
cd backend
mvn clean package -Pproduction
java -jar target/employee-management-system-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## 🚀 Deployment

### Docker Deployment

```dockerfile
# Backend Dockerfile
FROM openjdk:17-jre-slim
COPY target/*.jar app.jar
EXPOSE 5001
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Environment Variables

```env
# Backend
DB_URL=jdbc:postgresql://localhost:5432/ems_db
DB_USERNAME=ems_user
DB_PASSWORD=ems_password
JWT_SECRET=your-secret-key

# Frontend
VITE_API_BASE_URL=http://localhost:5001/api
```

## 📊 Features Showcase

### Admin Dashboard

- Employee count and statistics
- Pending leave requests overview
- Active projects summary
- Recent notifications

### Employee Dashboard

- Personal project timeline
- Leave balance and upcoming leaves
- Company announcements
- Quick action buttons

### Leave Management

- Multiple leave types (Annual, Sick, Maternity, etc.)
- Approval workflow
- Leave balance tracking
- Calendar integration

### Project Management

- Project creation and assignment
- Team member management
- Progress tracking
- Timeline visualization

## 🔒 Security Features

- JWT token-based authentication
- Role-based access control
- Password encryption with BCrypt
- CORS configuration
- SQL injection prevention
- XSS protection

## 🎨 UI/UX Features

- Responsive design for all devices
- Modern, clean interface
- Role-based navigation
- Real-time notifications
- Loading states and error handling
- Accessibility compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the [Backend README](backend/README.md)
- Check the [Frontend README](frontend/README.md)

## 🗺️ Roadmap

### Phase 2 Features

- [ ] Real-time chat system
- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Document management system
- [ ] Calendar integration
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Advanced project Gantt charts

### Technical Improvements

- [ ] Microservices architecture
- [ ] Kubernetes deployment
- [ ] CI/CD pipeline
- [ ] Performance monitoring
- [ ] Automated testing
- [ ] Security audit
