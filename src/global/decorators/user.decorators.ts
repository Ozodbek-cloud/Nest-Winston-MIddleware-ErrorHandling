import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from '../guards/roles.guard';
import { UserRole } from '../type/user';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(                        // << Yangicha Usul , Info -> user.controller.ts
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
  );

}

export const UserParam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();        // UserParam Info -> user.controller.ts
    const user = request.user;

    return data ? user?.[data] : user;
  },
);


export const UserQuery = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();          // UserQuery Info -> user.controller.ts

    if (data) return request.query[data]; 
    
    return request.query; 
  },

);

export const UserBody = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
                                                               // << UserBody Info -> user.controller.ts
        return data ? request.body?.[data] : request.body
    }
)

