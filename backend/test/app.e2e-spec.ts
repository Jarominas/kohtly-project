import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  const prismaServiceMock = {
    user: {
      upsert: jest.fn(),
    },
  };

  beforeEach(async () => {
    prismaServiceMock.user.upsert.mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'user@mail.com',
      role: 'admin',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((response) => {
        const payload = JSON.parse(response.text) as {
          user: {
            id: number;
            name: string;
            email: string;
            role: string;
            createdAt: string;
            updatedAt: string;
          };
        };

        expect(payload.user.email).toBe('user@mail.com');
        expect(payload.user.role).toBe('admin');
      });
  });
});
