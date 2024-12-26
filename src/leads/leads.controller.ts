import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { LeadsService } from "./leads.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { Lead } from "./entities/lead.entity";
import { UpdateLeadDto } from "./dto/update-lead.dto";
import { AssignLeadDto } from "./dto/assign-lead.dto";

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async create(@Body() createLeadDto: CreateLeadDto): Promise<Lead> {
    return this.leadsService.create(createLeadDto); // Calls the service to create a Lead
  }

  @Get()
  async findAll(): Promise<Lead[]> {
    return this.leadsService.getAllLeads();
  }
  @Get(':id')
  async findOne(@Param('id')id:string):Promise<Lead>{
return this.leadsService.getLeadById(id)
  }
  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateLeadDto: UpdateLeadDto, 
  ): Promise<Lead> {
    return this.leadsService.update(id, updateLeadDto); 
  }
   @Delete(':id')
   async remove(@Param('id')id:string):Promise<void>{
    return this.leadsService.deleteLead(id);
   }
   @Post(':leadId/assign')
   async assignLead(
     @Param('leadId') leadId: string,
     @Body() assignLeadDto: AssignLeadDto,
   ): Promise<Lead> {
     return this.leadsService.assignLead(leadId, assignLeadDto);
   }
}
