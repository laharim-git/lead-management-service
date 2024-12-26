import { Test, TestingModule } from '@nestjs/testing';
import { LeadsService } from './leads.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';

describe('LeadsService', () => {
  let service: LeadsService;
  let repository: Repository<Lead>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: getRepositoryToken(Lead),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
    repository = module.get<Repository<Lead>>(getRepositoryToken(Lead));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
