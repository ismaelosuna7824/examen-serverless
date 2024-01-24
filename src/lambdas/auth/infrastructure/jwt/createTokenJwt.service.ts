import { ENVIRONMENT } from "@commons/config/injection-tokens.config";
import { IEnvironment, IJwtConfiguration } from "@commons/interfaces/environment.interface";
import { inject, injectable } from "tsyringe";
import { IAuthJwt, IResponseToken } from '../interfaces/authJwt.interface';
import jwt from 'jsonwebtoken';



@injectable()
export class AuthJwtService implements IAuthJwt {
    private readonly _authJwt: IJwtConfiguration;
    constructor(
        @inject(ENVIRONMENT) {jwt}: Required<Pick<IEnvironment, 'jwt'>>
    ){
        this._authJwt = jwt;
    }

    signToken(): string {
        const rmd = Math.random().toString(36).slice(2);
        return jwt.sign({id: rmd}, this._authJwt.secret, {expiresIn: this._authJwt.expiresIn});
    }

    verifyToken(token:string): IResponseToken {
        try {
            return jwt.verify(token, this._authJwt.secret) as unknown as IResponseToken;
        } catch (error) {
            throw error;
        }
    }

}