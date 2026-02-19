import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  const appServiceMock = {
    getHello: jest.fn<Promise<string>, []>(),
  };

  beforeEach(async () => {
    appServiceMock.getHello.mockResolvedValue('hello');

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: appServiceMock }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return app service payload', async () => {
      await expect(appController.getHello()).resolves.toBe('hello');
    });
  });
});
