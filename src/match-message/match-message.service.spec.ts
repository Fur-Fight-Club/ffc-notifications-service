import { Test, TestingModule } from '@nestjs/testing';
import { MatchMessageService } from './match-message.service';

describe('MatchMessageService', () => {
  let service: MatchMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchMessageService],
    }).compile();

    service = module.get<MatchMessageService>(MatchMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
