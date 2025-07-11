# CAC Optimizer Pro - ML-Powered Ad Automation Platform

A comprehensive full-stack application that eliminates the need for expensive ad agencies by automating campaign optimization and providing unified Customer Acquisition Cost (CAC) visibility across all marketing channels.

## Features

### 🧠 ML-Powered Campaign Automation
- Automated targeting, budget allocation, and creative selection
- Real-time CAC optimization
- Meta and Google Ads API integration
- Campaign Success Manager (CSM) monitoring

### 📊 Unified CAC Dashboard
- Track CAC across Meta, Google, Billboard, Influencer, and Email campaigns
- Real-time performance analytics
- Visual charts and trend analysis
- Performance insights and recommendations

### 🗺️ Billboard Attribution
- Geo-location based conversion tracking
- Haversine formula for distance calculations
- 1km radius attribution tracking
- Interactive heatmap visualization

### 💰 Expense Management
- Employee expense submission system
- Admin approval workflow
- Receipt upload and management
- Category-based expense tracking

### 📝 Admin Notes System
- Strategy logging and documentation
- Notes management with localStorage
- Admin-only access for internal findings

## Tech Stack

### Frontend
- React 18 with JavaScript
- Tailwind CSS for styling
- Lucide React for icons
- Recharts for data visualization
- Responsive design with mobile-first approach

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cac-optimizer-pro
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   npm run backend:install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cac-optimizer
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system.

6. **Run the application**
   
   In one terminal (for backend):
   ```bash
   npm run backend
   ```
   
   In another terminal (for frontend):
   ```bash
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Demo Credentials

- **Admin Login**: admin@demo.com / password123
- **Employee Login**: employee@demo.com / password123

## Project Structure

```
cac-optimizer-pro/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── forms/        # Form components
│   │   └── charts/       # Chart components
│   ├── pages/            # Page components
│   ├── utils/            # Utility functions
│   └── App.jsx           # Main application component
├── backend/
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── controllers/      # Route controllers
│   └── server.js         # Express server
└── public/               # Static assets
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Campaigns
- `GET /api/campaigns` - Get all campaigns (admin only)
- `POST /api/campaigns` - Create new campaign (admin only)
- `PUT /api/campaigns/:id` - Update campaign (admin only)
- `DELETE /api/campaigns/:id` - Delete campaign (admin only)

### Expenses
- `GET /api/expenses` - Get expense reports
- `POST /api/expenses` - Create expense report
- `PUT /api/expenses/:id/status` - Update expense status (admin only)

### Billboards
- `GET /api/billboards` - Get billboard attributions (admin only)
- `POST /api/billboards` - Create billboard attribution (admin only)
- `POST /api/billboards/:id/conversion` - Track conversion

## Features Overview

### For Administrators
- **Campaign Management**: Create and manage ML-optimized campaigns
- **Analytics Dashboard**: Comprehensive performance tracking
- **Expense Approval**: Review and approve employee expenses
- **Notes Management**: Internal strategy documentation
- **User Management**: Manage employee accounts

### For Employees
- **Expense Submission**: Submit expenses with receipts
- **Status Tracking**: Monitor approval status
- **History View**: View past submissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.

# Project Structure Update

The project is now organized into two main folders:

- `backend/`: Contains all backend code, including API, models, controllers, and configuration.
- `frontend/`: Contains all frontend code, including React components, pages, routes, assets, and configuration files for the frontend build.

## Backend
- All files and folders previously in `backend/` remain unchanged.

## Frontend
- All files and folders previously in `src/` are now in `frontend/src/`.
- Frontend configuration files (`vite.config.js`, `postcss.config.js`, `tailwind.config.js`, `index.html`, etc.) are now in `frontend/`.
- The `dist/` folder (frontend build output) is now in `frontend/dist/`.

## Data
- The `data/` folder remains at the root, as it may be used by both backend and frontend.

---

Please update your scripts and documentation to use the new paths.