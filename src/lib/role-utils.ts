/**
 * Role utility functions for checking user permissions
 */

export function isSuperAdmin(role: string | undefined): boolean {
  return role === 'super_admin'
}

export function isAdmin(role: string | undefined): boolean {
  return role === 'admin' || role === 'super_admin'
}

export function canAccessAdminRoute(role: string | undefined): boolean {
  return isAdmin(role)
}

export function getRoleDisplayName(role: string): string {
  switch (role) {
    case 'super_admin':
      return 'Super Admin'
    case 'admin':
      return 'Admin'
    case 'user':
      return 'User'
    default:
      return 'Unknown'
  }
}
