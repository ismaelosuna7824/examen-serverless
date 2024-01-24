import { HandleEnvironment } from '@commons/helpers/handle-environment.helper';
import { IEnvironment } from '@commons/interfaces/environment.interface';

const { database, emailMailer } = new HandleEnvironment();

export const EnvConfig: Required<Pick<IEnvironment, 'database' | 'emailMailer'>> = {
  database,
  emailMailer
};
