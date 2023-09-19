import { applyDecorators, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RolesGuard } from 'src/auth/gql-role.guard';

export const Auth = (): MethodDecorator & ClassDecorator => {
    return applyDecorators(UseGuards(GqlAuthGuard, RolesGuard));
};
