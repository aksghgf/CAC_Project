# 🚀 CAC Optimizer Pro - Postman API Testing Guide

## 📋 Prerequisites

1. **Backend Server Running**: Make sure your backend is running on `http://localhost:5000`
2. **MongoDB Running**: Ensure MongoDB is connected and running
3. **Postman Installed**: Download from [postman.com](https://www.postman.com/downloads/)

## 📥 Import Collection

1. Open Postman
2. Click **Import** button
3. Select **File** tab
4. Choose `CAC_Optimizer_Pro_APIs.postman_collection.json`
5. Click **Import**

## 🔧 Environment Setup

The collection includes variables:
- `base_url`: `http://localhost:5000/api`
- `auth_token`: Auto-populated after login

## 🧪 Testing Workflow

### Step 1: Authentication Testing

#### 1.1 Register Users
```
POST /auth/register
```
- **Register Admin User**: Creates admin with email `admin@demo.com`
- **Register Employee User**: Creates employee with email `employee@demo.com`

#### 1.2 Login Users
```
POST /auth/login
```
- **Login Admin**: Automatically saves token for admin operations
- **Login Employee**: Saves token for employee operations

### Step 2: Campaign Management (Admin Only)

#### 2.1 Create Campaigns
```
POST /campaigns
```
Test different campaign types:
- Meta-only campaigns
- Google-only campaigns  
- Both platforms campaigns

#### 2.2 Manage Campaigns
```
GET /campaigns      # View all campaigns
PUT /campaigns/:id  # Update campaign
DELETE /campaigns/:id # Delete campaign
```

### Step 3: Expense Management

#### 3.1 Submit Expenses (Any User)
```
POST /expenses
```
Test different expense categories:
- Billboard expenses
- Influencer payments
- Email marketing costs
- Other expenses

#### 3.2 Manage Expenses (Admin Only)
```
GET /expenses           # View all expenses
PUT /expenses/:id/status # Approve/Reject expenses
```

### Step 4: Billboard Attribution

#### 4.1 Setup Billboard Tracking
```
POST /billboards
```
Create billboard attribution points with:
- Billboard ID
- GPS coordinates
- Campaign association

#### 4.2 Track Conversions
```
POST /billboards/:id/conversion
```
Test geo-proximity conversion tracking

## 📊 Expected Responses

### ✅ Success Responses

#### Registration Success (201)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "email": "admin@demo.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

#### Login Success (200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "email": "admin@demo.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

#### Campaign Creation (201)
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "name": "Summer Sale Campaign",
  "goal": "conversions",
  "budget": 50000,
  "platform": "meta",
  "status": "active",
  "mlOptimizations": {
    "targeting": ["ML-optimized demographic", "Interest-based targeting"],
    "budgetSplit": { "meta": 100, "google": 0 },
    "suggestedCreatives": ["Video ads", "Carousel ads", "Single image ads"]
  }
}
```

### ❌ Error Responses

#### Unauthorized (401)
```json
{
  "message": "No token, authorization denied"
}
```

#### Forbidden (403)
```json
{
  "message": "Access denied. Admin only."
}
```

#### Invalid Credentials (400)
```json
{
  "message": "Invalid credentials"
}
```

## 🔍 Testing Scenarios

### Scenario 1: Complete Admin Workflow
1. Register admin user
2. Login as admin
3. Create multiple campaigns
4. View all campaigns
5. Create billboard attributions
6. Submit expense reports
7. Approve/reject expenses

### Scenario 2: Employee Workflow
1. Register employee user
2. Login as employee
3. Try accessing admin routes (should fail)
4. Submit expense reports
5. View own expenses only

### Scenario 3: Billboard Attribution
1. Create billboard with GPS coordinates
2. Test conversion tracking with nearby location
3. Test conversion tracking with far location
4. Verify distance calculations

### Scenario 4: Error Handling
1. Test without authentication tokens
2. Test with invalid credentials
3. Test employee accessing admin routes
4. Test invalid data formats

## 🎯 Key Testing Points

### Authentication
- ✅ User registration works
- ✅ Login returns valid JWT token
- ✅ Token is automatically used in subsequent requests
- ✅ Invalid credentials are rejected

### Authorization
- ✅ Admin routes require admin role
- ✅ Employee routes work for both roles
- ✅ Unauthorized access is blocked

### Data Validation
- ✅ Required fields are enforced
- ✅ Email format validation
- ✅ Enum values are validated
- ✅ Numeric fields accept numbers only

### Business Logic
- ✅ ML optimizations are generated
- ✅ Budget splits are calculated correctly
- ✅ Expense status updates work
- ✅ Billboard distance calculations are accurate

## 🐛 Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check if backend server is running on port 5000
   - Verify MongoDB connection

2. **Authentication Errors**
   - Ensure you've logged in first
   - Check if token is saved in collection variables

3. **Permission Denied**
   - Verify user role (admin vs employee)
   - Check if using correct login credentials

4. **Database Errors**
   - Ensure MongoDB is running
   - Check database connection string

### Debug Tips

1. **Check Console**: View Postman console for detailed logs
2. **Verify Variables**: Check collection variables for auth_token
3. **Test Endpoints**: Start with simple GET requests
4. **Check Headers**: Ensure Authorization header is set correctly

## 📈 Performance Testing

Use Postman's **Collection Runner** to:
- Test multiple scenarios in sequence
- Verify API performance under load
- Automate regression testing
- Generate test reports

Happy Testing! 🎉