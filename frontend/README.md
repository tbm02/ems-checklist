# Employee Management System - Frontend

A modern, responsive React frontend application for the Employee Management System with role-based navigation, beautiful UI components, and seamless backend integration.

## 🏗️ Tech Stack

- **Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.5
- **Styling**: Tailwind CSS 3.3.3
- **Routing**: React Router DOM 6.15.0
- **HTTP Client**: Axios 1.5.0
- **Icons**: Lucide React 0.263.1
- **Forms**: React Hook Form 7.45.4
- **Notifications**: React Hot Toast 2.4.1
- **Charts**: Recharts 2.7.2
- **Date Handling**: date-fns 2.30.0

## 🎨 Features

### Authentication & Security

- JWT-based authentication
- Role-based routing and access control
- Secure API communication with interceptors
- Automatic token refresh and logout

### User Interface

- Responsive design with Tailwind CSS
- Modern, clean interface
- Dark mode support (configurable)
- Loading states and error handling
- Toast notifications for user feedback

### Role-Based Features

#### Admin Features

- Comprehensive dashboard with statistics
- Employee management (view, create, edit)
- Leave request management (approve/reject)
- Project management and assignment
- Policy management
- Company announcements
- System notifications

#### Employee Features

- Personal dashboard with project overview
- Leave application and tracking
- Project timeline and details
- Company policy access
- Profile management
- Notification center
- Announcement feed

### Core Modules

1. **Dashboard**: Role-specific overview pages
2. **Leave Management**: Apply, track, and manage leaves
3. **Project Management**: View assigned projects and timelines
4. **Policy Center**: Access company policies
5. **Profile Management**: Update personal information
6. **Notification System**: Real-time notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm 8+ or yarn 1.22+
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd EMS/frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create environment configuration:

```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Default Login Credentials

- **Admin User**

  - Username: `admin`
  - Password: `admin123`

- **Employee User**
  - Username: `john.doe`
  - Password: `employee123`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout wrapper
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── Header.jsx      # Top header with notifications
│   └── LoadingSpinner.jsx
├── contexts/           # React context providers
│   └── AuthContext.jsx # Authentication state management
├── pages/              # Page components
│   ├── auth/          # Authentication pages
│   ├── admin/         # Admin-specific pages
│   └── employee/      # Employee-specific pages
├── services/          # API service layer
│   ├── authService.js # Authentication API calls
│   └── apiService.js  # All other API endpoints
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── styles/            # Additional styling
└── App.jsx            # Main application component
```

## 🛠️ Development Workflow

### Code Style

The project uses:

- ESLint for code linting
- Prettier for code formatting
- Consistent component structure

### Component Guidelines

1. Use functional components with hooks
2. Follow the single responsibility principle
3. Implement proper error boundaries
4. Use TypeScript for type safety (optional)

### API Integration

The frontend communicates with the backend through:

- Axios interceptors for automatic token handling
- Centralized error handling
- Request/response transformation
- Loading state management

## 🎨 UI/UX Design

### Design System

- **Colors**: Primary blue palette with semantic colors
- **Typography**: System fonts with consistent sizing
- **Spacing**: Tailwind's spacing scale
- **Components**: Consistent button styles, form inputs, cards

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly interfaces

### Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Screen reader compatibility

## 📊 State Management

### Authentication State

- Managed through React Context
- Persistent login with localStorage
- Automatic logout on token expiration

### Component State

- Local state with useState
- Effect hooks for side effects
- Custom hooks for reusable logic

## 🔌 API Integration

### Service Layer

All API calls are centralized in service files:

```javascript
// Authentication
authService.login(credentials);
authService.logout();

// Employee services
leaveService.applyLeave(data);
userService.getProfile();
projectService.getMyProjects();

// Admin services
leaveService.getAllLeaves();
userService.getAllEmployees();
```

### Error Handling

- Global error interceptors
- User-friendly error messages
- Automatic retry for failed requests
- Network error detection

## 🧪 Testing

Run tests with:

```bash
npm run test
# or
yarn test
```

### Testing Strategy

- Unit tests for components
- Integration tests for API services
- End-to-end tests for critical user flows

## 📦 Building for Production

1. Create production build:

```bash
npm run build
# or
yarn build
```

2. Preview production build:

```bash
npm run preview
# or
yarn preview
```

The build artifacts will be stored in the `dist/` directory.

## 🚀 Deployment

### Static Hosting

The app can be deployed to any static hosting service:

- **Netlify**: Connect GitHub repo for automatic deployments
- **Vercel**: Zero-config deployment with Git integration
- **AWS S3 + CloudFront**: For enterprise deployments
- **GitHub Pages**: For open-source projects

### Environment Configuration

Set production environment variables:

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_APP_VERSION=1.0.0
```

### Build Optimization

- Automatic code splitting
- Tree shaking for smaller bundles
- Asset optimization
- Gzip compression

## 🔧 Configuration

### Vite Configuration

Key configurations in `vite.config.js`:

- Proxy settings for API calls
- Build optimization
- Plugin configuration

### Tailwind Configuration

Customization in `tailwind.config.js`:

- Color palette
- Typography scales
- Custom components
- Responsive breakpoints

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Progressive Web App

The application includes PWA features:

- Service worker for caching
- Offline functionality
- App manifest for installability
- Push notifications (planned)

## 🔍 Performance Optimization

### Techniques Used

- React.memo for component optimization
- Lazy loading for route components
- Image optimization and lazy loading
- Bundle splitting and caching
- Efficient re-rendering strategies

### Monitoring

- Performance metrics tracking
- Error boundary implementation
- User experience monitoring
- Bundle size analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

## 🗺️ Roadmap

### Upcoming Features

- [ ] Real-time notifications with WebSocket
- [ ] Advanced project Gantt charts
- [ ] Mobile application
- [ ] Dark mode toggle
- [ ] Advanced reporting and analytics
- [ ] File upload and document management
- [ ] Calendar integration
- [ ] Multi-language support

### Technical Improvements

- [ ] TypeScript migration
- [ ] Unit test coverage increase
- [ ] Performance monitoring
- [ ] Accessibility audit
- [ ] SEO optimization
