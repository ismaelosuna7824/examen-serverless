import { IEmail } from "./email";


export interface IEmailService {
    sendEmail(email: IEmail): Promise<void>;
}