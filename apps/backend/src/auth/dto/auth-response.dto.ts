import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.entity';

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ type: () => User })
  user: User;
}
