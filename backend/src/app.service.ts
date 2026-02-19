import { Injectable } from '@nestjs/common';
import type { UserDTO } from '@app/shared';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHealth(): { status: 'ok' } {
    return { status: 'ok' };
  }

  async getHello(): Promise<string> {
    const dbUser = await this.prisma.user.upsert({
      where: { email: 'user@mail.com' },
      update: { name: 'John Doe', role: 'admin' },
      create: {
        name: 'John Doe',
        email: 'user@mail.com',
        role: 'admin',
      },
    });

    const user: UserDTO = {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
      createdAt: dbUser.createdAt,
      updatedAt: dbUser.updatedAt,
    };

    return JSON.stringify({ user });
  }
}
