export interface IAuthJwt {
    signToken(): string;
    verifyToken(token:string): IResponseToken;
}


export interface IResponseToken {
    id: string;
    iat: number;
    exp: string;
}