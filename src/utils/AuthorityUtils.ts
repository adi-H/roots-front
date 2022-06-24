import { Roles } from "../enums/Roles";

const authorityCheck = (roles: Roles[]) => (roleId: number) =>
  roles.map((role) => role.valueOf()).includes(roleId);

export default {
  canEditRoles: authorityCheck([Roles.ADMINISTRATOR, Roles.SAMP]),
};
