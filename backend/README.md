# Employee Management System - Backend

A comprehensive Spring Boot backend application for employee management with JWT authentication, role-based access control, and modular architecture.

## 🏗️ Tech Stack

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT
- **ORM**: Spring Data JPA
- **Migration**: Flyway
- **Build Tool**: Maven

## 📋 Features

### Authentication & Authorization

- JWT-based authentication
- Role-based access control (ADMIN, EMPLOYEE)
- Secure password hashing with BCrypt
- Protected REST endpoints

### Core Modules

1. **Leave Management**

   - Apply for leaves
   - Approve/reject leave requests
   - Leave balance tracking
   - Different leave types support

2. **Policy Management**

   - CRUD operations for company policies
   - Effective date tracking
   - Active/inactive policy management

3. **Project Management**

   - Project creation and assignment
   - Team member management
   - Project lead assignment
   - Status tracking

4. **Resignation Module**

   - Resignation request submission
   - Admin approval workflow
   - Last working date tracking

5. **Notification System**

   - Real-time notifications for actions
   - User-specific notifications
   - Read/unread status tracking

6. **Dashboard & Analytics**
   - Admin dashboard with statistics
   - Employee dashboard with personal data
   - Real-time data aggregation

## 🚀 Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+
- Git

### Database Setup

1. Create PostgreSQL database:

```sql
CREATE DATABASE ems_db;
CREATE USER ems_user WITH PASSWORD 'ems_password';
GRANT ALL PRIVILEGES ON DATABASE ems_db TO ems_user;
```

2. Update database configuration in `src/main/resources/application.yml` if needed:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ems_db
    username: ems_user
    password: ems_password
```

### Installation & Running

1. Clone the repository:

```bash
git clone <repository-url>
cd EMS/backend
```

2. Install dependencies:

```bash
mvn clean install
```

3. Run database migrations:

```bash
mvn flyway:migrate
```

4. Start the application:

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:5001`

### Default Users

After running migrations, the following users are available:

- **Admin User**

  - Username: `admin`
  - Password: `admin123`
  - Role: ADMIN

- **Employee User**
  - Username: `john.doe`
  - Password: `employee123`
  - Role: EMPLOYEE

## 📁 Project Structure

```
src/
├── main/
│   ├── java/com/ems/
│   │   ├── config/          # Configuration classes
│   │   ├── controller/      # REST controllers
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entity/         # JPA entities
│   │   ├── repository/     # Data repositories
│   │   ├── security/       # Security configuration
│   │   └── service/        # Business logic services
│   └── resources/
│       ├── db/migration/   # Flyway migration scripts
│       └── application.yml # Application configuration
└── test/                   # Test files
```

## 🛡️ Security

### JWT Configuration

JWT tokens are configured with:

- Secret key (configurable in application.yml)
- 24-hour expiration time
- Automatic token validation
- Role-based access control

### API Security

- `/api/auth/**` - Public endpoints
- `/api/admin/**` - Admin role required
- `/api/employee/**` - Employee role required

## 📊 Database Schema

### Key Tables

- `users` - User accounts and authentication
- `leaves` - Leave requests and approvals
- `policies` - Company policies
- `projects` - Project information
- `project_members` - Project team assignments
- `resignations` - Resignation requests
- `notifications` - System notifications
- `announcements` - Company announcements

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new employee (Admin only)
- `POST /api/auth/logout` - User logout

### Employee Endpoints

- `GET /api/employee/dashboard` - Employee dashboard data
- `GET /api/employee/profile` - Get user profile
- `PUT /api/employee/profile` - Update user profile
- `POST /api/employee/leaves` - Apply for leave
- `GET /api/employee/leaves` - Get user's leaves
- `GET /api/employee/projects` - Get assigned projects
- `GET /api/employee/policies` - Get company policies
- `GET /api/employee/notifications` - Get notifications

### Admin Endpoints

- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/employees` - Get all employees
- `GET /api/admin/leaves` - Get all leave requests
- `PUT /api/admin/leaves/{id}/approve` - Approve leave
- `PUT /api/admin/leaves/{id}/reject` - Reject leave
- `GET /api/admin/notifications` - Get admin notifications

## 🧪 Testing

Run tests with Maven:

```bash
mvn test
```

## 📦 Building for Production

1. Create production build:

```bash
mvn clean package -Pproduction
```

2. Run the JAR file:

```bash
java -jar target/employee-management-system-0.0.1-SNAPSHOT.jar
```

## 🔧 Configuration

### Environment Variables

Key configuration options:

- `DB_URL` - Database connection URL
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRATION` - JWT token expiration time

### Profiles

- `development` - Development profile with debug logging
- `production` - Production profile with optimized settings

## 🚀 Deployment

### Docker Support

Create a Dockerfile:

```dockerfile
FROM openjdk:17-jre-slim
COPY target/*.jar app.jar
EXPOSE 5001
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Production Considerations

- Use environment-specific configuration
- Set up proper database connections
- Configure logging levels
- Set up monitoring and health checks
- Use HTTPS in production
- Implement rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.
