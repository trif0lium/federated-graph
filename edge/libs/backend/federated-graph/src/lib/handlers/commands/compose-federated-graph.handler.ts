import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ComposeFederatedGraphCommand } from '@edge/backend/commands'

@CommandHandler(ComposeFederatedGraphCommand)
export class ComposeFederatedGraphHandler implements ICommandHandler<ComposeFederatedGraphCommand> {
  constructor() { }

  execute(command: ComposeFederatedGraphCommand): Promise<any> {
    console.log(command)
    return
  }
}
