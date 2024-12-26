import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { Lead } from "./entities/lead.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from "typeorm"
import { UpdateLeadDto } from "./dto/update-lead.dto";
import { AssignLeadDto } from "./dto/assign-lead.dto";

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const lead = this.leadRepository.create(createLeadDto); // Creating the Lead from DTO
    return this.leadRepository.save(lead); // Saving the Lead
  }

  async getAllLeads(): Promise<Lead[]> {
    return this.leadRepository.find();
  }
  async getLeadById(id:string):Promise<Lead>{
    return this.leadRepository.findOneBy({id});
  }
  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    
const lead=await this.leadRepository.findOneBy({id});
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

   
    Object.assign(lead, updateLeadDto);

   
    return this.leadRepository.save(lead);
  }
  async deleteLead(id:string):Promise<void>{
    await this.leadRepository.delete(id);
  }
  async assignLead(leadId: string, assignLeadDto: AssignLeadDto): Promise<Lead> {
    const lead = await this.leadRepository.findOne({ where: { id: leadId } });

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${leadId} not found.`);
    }

    // Update the assigned agent
    lead.assignedAgent = assignLeadDto.assignedAgent;
    return this.leadRepository.save(lead);
  }
}
