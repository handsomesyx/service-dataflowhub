// import { HeadersDataInterface } from 'src/common/decorators/dto/headerData';
// import { HeadersData } from 'src/common/decorators/header.decorator';
// import { UserEntity } from 'src/common/decorators/user.decorator';
// // import {
// //   Operation,
// //   type UserLoginMeta,
// // } from 'src/common/winston-logger/dto/info';
// import { MyLoggerService } from 'src/common/winston-logger/logger';
// import { User } from 'src/modules/users/models/user.model';
// import { Req } from '@nestjs/common';
// import {
//   Args,
//   Context,
//   Mutation,
//   Parent,
//   ResolveField,
//   Resolver,
// } from '@nestjs/graphql';

// import { AuthService } from './auth.service';
// import { LoginInput } from './dto/login.input';
// import { RefreshTokenInput } from './dto/refresh-token.input';
// // import { SignupInput } from './dto/signup.input';
// import { Auth } from './models/auth.model';
// import { Token } from './models/token.model';

// @Resolver(() => Auth)
// export class AuthResolver {
//   constructor(
//     private readonly auth: AuthService,
//     private myLoggerService: MyLoggerService
//   ) {}

//   // @Mutation(() => Auth)
//   // async signup(@Args('data') data: SignupInput): Promise<Token> {
//   //   data.username = data.username.toLowerCase();
//   //   const { accessToken, refreshToken } = await this.auth.createUser(data);
//   //   return {
//   //     accessToken,
//   //     refreshToken,
//   //   };
//   // }

//   @Mutation(() => Auth)
//   async login(
//     @Args('data') { username, password }: LoginInput,
//     @HeadersData() headersData: HeadersDataInterface
//   ): Promise<{
//     accessToken: string;
//     refreshToken: string;
//   }> {
//     const { token, userId } = await this.auth.login(
//       username.toLowerCase(),
//       password
//     );
//     const { accessToken, refreshToken } = token;
//     console.log('headersData', headersData);

//     const userLoginObject: UserLoginMeta = {
//       operation: Operation.AddPopulation,
//       status: 0,
//       user_agent: headersData.user_agent,
//       ip: headersData.ip,
//       username: username,
//       creator_id: userId,
//     };
//     // 用来记录登录日志并且存储
//     await this.myLoggerService.logToDatabase({
//       level: 'login',
//       message: '登录日志记录',
//       meta: userLoginObject,
//     });

//     return {
//       accessToken,
//       refreshToken,
//     };
//   }

//   @Mutation(() => Token)
//   async refreshToken(@Args() { token }: RefreshTokenInput): Promise<Token> {
//     return this.auth.refreshToken(token);
//   }

//   @ResolveField('user', () => User)
//   async user(@Parent() auth: Auth): Promise<User> {
//     console.log('查看是否执行了');

//     return await this.auth.getuserFromToken(auth.accessToken);
//   }
// }
