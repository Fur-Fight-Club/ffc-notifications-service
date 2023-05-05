import { Test, TestingModule } from '@nestjs/testing';
import { MatchMessageController } from './match-message.controller';
import { MatchMessageService } from './match-message.service';

describe('MatchMessageController', () => {
  let controller: MatchMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchMessageController],
      providers: [MatchMessageService],
    }).compile();

    controller = module.get<MatchMessageController>(MatchMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
