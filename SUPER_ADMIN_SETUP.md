# Super Admin Configuration

This document explains how the super admin functionality works in the application.

## Overview

The application includes a super admin user that can access the system even when the database is not available. This is useful for emergency access and initial system setup.

## Environment Variables

Add these to your `.env` file:

```env
SUPER_ADMIN_EMAIL=your-super-admin-email@example.com
SUPER_ADMIN_PASSWORD=your-secure-password
```

## How It Works

### Authentication Flow

1. **Super Admin Check First**: When a user tries to log in, the system first checks if the credentials match the super admin credentials from environment variables.

2. **Database Fallback**: If the credentials don't match the super admin, the system attempts to authenticate against the database.

3. **Database Independent**: The super admin authentication works completely independently of the database connection.

### User Role Hierarchy

- **super_admin**: Highest level, can access all admin routes
- **admin**: Can access admin routes, managed through database
- **user**: Regular user access

### Access Control

The super admin has access to:
- All admin routes (`/admin/*`)
- All admin functionality
- Can manage other users (including admins)

## Implementation Details

### Files Modified

1. **`src/lib/auth.ts`**: Added super admin credential checking
2. **`src/types/index.ts`**: Updated User interface to include `super_admin` role
3. **`src/lib/admin-auth.ts`**: Updated to allow both admin and super_admin roles
4. **`src/proxy-old.ts`**: Updated middleware to allow super_admin access
5. **`src/components/EditUser.tsx`**: Added super_admin option to role selection
6. **`src/lib/role-utils.ts`**: Created utility functions for role checking

### Role Utility Functions

The `src/lib/role-utils.ts` file provides helper functions:

```typescript
isSuperAdmin(role)      // Checks if user is super admin
isAdmin(role)           // Checks if user is admin or super admin
canAccessAdminRoute(role)  // Checks if user can access admin routes
getRoleDisplayName(role)   // Gets display name for role
```

## Security Considerations

1. **Strong Password**: Always use a strong, unique password for the super admin
2. **Environment Security**: Keep the `.env` file secure and never commit it to version control
3. **Limited Usage**: Use the super admin account only when necessary
4. **Regular Rotation**: Consider rotating the super admin credentials periodically

## Usage

1. Set up the environment variables with your desired super admin credentials
2. Restart the application
3. Log in using the super admin email and password
4. The super admin will have full access to all admin functionality

## Troubleshooting

### Super Admin Not Working

1. Check that both `SUPER_ADMIN_EMAIL` and `SUPER_ADMIN_PASSWORD` are set in `.env`
2. Ensure the application has been restarted after adding the environment variables
3. Verify there are no typos in the email or password

### Database Connection Issues

The super admin should work even when:
- Database is down
- Database connection fails
- User table doesn't exist
- Database credentials are incorrect

If the super admin isn't working during database issues, check the application logs for any errors in the authentication flow.
