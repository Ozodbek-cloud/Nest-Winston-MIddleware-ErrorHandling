import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../type/user";

export const Roles = (...roles: UserRole[]) => SetMetadata("roles",roles)


