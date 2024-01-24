import { IDecodedToken } from './authorizer.interface';

export interface IAuthorizationService {
  isValidToken(token: string, strategy?: string): Promise<IDecodedToken>;
  setClaims(
    id: string,
    claims: { [key: string]: string | number | boolean | null | undefined },
  ): Promise<void>;
}
