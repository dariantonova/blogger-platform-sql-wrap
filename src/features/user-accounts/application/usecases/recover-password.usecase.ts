import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { randomBytes } from 'node:crypto';
import { UsersRepository } from '../../infrastructure/users.repository';
import { CryptoService } from '../../../user-accounts/application/crypto.service';
import { UserAccountsConfig } from '../../../user-accounts/user-accounts.config';
import { PasswordRecoveryRequestedEvent } from '../../../user-accounts/domain/events/password-recovery-requested.event';

export class RecoverPasswordCommand {
  constructor(public email: string) {}
}

@CommandHandler(RecoverPasswordCommand)
export class RecoverPasswordUseCase
  implements ICommandHandler<RecoverPasswordCommand>
{
  constructor(
    private usersRepository: UsersRepository,
    private cryptoService: CryptoService,
    private userAccountsConfig: UserAccountsConfig,
    private eventBus: EventBus,
  ) {}

  async execute({ email }: RecoverPasswordCommand): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      return;
    }

    const recoveryCode = randomBytes(32).toString('hex');
    const recoveryCodeHash =
      this.cryptoService.createPasswordRecoveryCodeHash(recoveryCode);

    user.setPasswordRecoveryCodeHash(
      recoveryCodeHash,
      this.userAccountsConfig.passwordRecoveryCodeLifetimeInSeconds,
    );

    await this.usersRepository.save(user);

    this.eventBus.publish(
      new PasswordRecoveryRequestedEvent(user.email, recoveryCode),
    );
  }
}
