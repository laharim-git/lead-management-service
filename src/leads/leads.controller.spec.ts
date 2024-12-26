import { Test, TestingModule } from '@nestjs/testing';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { Lead } from './entities/lead.entity';

describe('LeadsController', () => {
  let controller: LeadsController;
  let service: LeadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [
        {
          provide: LeadsService,
          useValue: {
            create: jest.fn(),
            getAllLeads: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
    service = module.get<LeadsService>(LeadsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  
     

  describe('create', () => {
    it('should create and return a lead', async () => {
      // Given
      const createLeadDto: CreateLeadDto = {
        "title": "lead5",
        "type": "Urgent",
        "status": 'Contacted',
        "customer": "ramesh",
        "leadSource": "Website",
        "client": "ABC Corp",
        "company": "wyz Corp",
        "phone": "9075432190",
        "email": "ramesh@gmail.com",
        "paymentMethod": "Credit Card",
        "currency": "INR",
        "budget": 5000.00,
        "deposit": 1000.00,
        "assignedAgent": "Agent 1"
      };
      

      const createdLead: Lead = {
        id: "8404d454-3b3e-47cf-b92e-aa54c2e1dc37", 
        ...createLeadDto,
      };

      // Mock the service method `create` to return a lead
      jest.spyOn(LeadsService, 'create').mockResolvedValue(createdLead);

      // When
      const result = await LeadsController.create(createLeadDto);

      // Then
      expect(result).toEqual(createdLead);
      expect(LeadsService.create).toHaveBeenCalledWith(createLeadDto);
    });

   
  });
 
});
