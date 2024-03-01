export const userRoles = {
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
  VIEWER: "VIEWER",
  ADVISOR: "ADVISOR",
} as const;

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
