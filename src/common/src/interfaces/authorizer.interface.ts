export interface IDecodedToken {
  user_id: string;
  email: string;
}

export interface IUserManagmentApp {
  init(appName: string): void;
  destroy(): Promise<void>;
  setCustomUserClaims(
    user_id: string,
    claims: { [key: string]: string | number | boolean | null | undefined },
  ): Promise<void>;
  verifyToken(token: string): Promise<IDecodedToken>;
}
