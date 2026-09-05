import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return application info', () => {
      const result = appController.getInfo();
      expect(result).toHaveProperty('name', 'Black Desert Progress Tracker');
      expect(result).toHaveProperty('version', '0.5.0');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('environment');
    });
  });
});
