import { Injectable } from '@nestjs/common';
import { UserDTO } from '@app/shared';

@Injectable()
export class AppService {
  getHello(): string {
    const user: UserDTO = {
      id: 1,
      name: 'John Doe',
      email: 'user@mail.com',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return JSON.stringify({ user });
  }
}
