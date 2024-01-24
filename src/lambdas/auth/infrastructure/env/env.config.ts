import { HandleEnvironment } from '@commons/helpers/handle-environment.helper';
import { IEnvironment } from '@commons/interfaces/environment.interface';

const { jwt } = new HandleEnvironment();

export const EnvConfig: Required<Pick<IEnvironment, 'jwt'>> = {
  jwt,
};
