import type { User } from 'src/modules/users/models/user.model';

import { Token } from './token.model';

export class Auth extends Token {
  user: User;
}
