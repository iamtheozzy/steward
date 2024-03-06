export const userRoles = {
  ADMIN: "ADMIN",
  COLLABORATOR: "COLLABORATOR",
  VIEWER: "VIEWER",
  ADVISOR: "ADVISOR",
} as const;

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
