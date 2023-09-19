export interface JwtDto {
  userId: number;
  /**
   * Issued at
   */
  iat: number;
  /**
   * Expiration time
   */
  exp: number;

  role_id: number;

  role: string;
}
