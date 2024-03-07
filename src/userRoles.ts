export const userRoles = {
  ADMIN: "ADMIN",
  COLLABORATOR: "COLLABORATOR",
  VIEWER: "VIEWER",
  ADVISOR: "ADVISOR",
} as const;

export type UserRolesType = (typeof userRoles)[keyof typeof userRoles];
