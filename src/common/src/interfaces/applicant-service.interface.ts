import { ICommand as Command } from './command.interface';

export interface IApplicationService<CommandBase extends Command = Command> {
  process<T extends CommandBase>(command: T): Promise<unknown>;
}
