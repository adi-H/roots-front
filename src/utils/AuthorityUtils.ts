import { Roles } from "../enums/Roles";

export type AuthorityCheck = (roleId: number) => boolean;

const authorityCheck =
  (roles: Roles[]): AuthorityCheck =>
  (roleId: number) =>
    [...roles, Roles.ADMINISTRATOR]
      .map((role) => role.valueOf())
      .includes(roleId);

export default {
  canEditRoles: authorityCheck([Roles.SAMP]),
  canRequestClass: authorityCheck([Roles.KAHAD_PLUGA, Roles.KAHAD_TZEVET]),
  canApproveClass: authorityCheck([Roles.KAHAD_PLUGA]),
};
