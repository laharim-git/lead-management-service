import { IsEnum } from "class-validator";
import { LeadStatus } from "../entities/lead.entity";
export class AssignLeadDto {



  @IsString()
    
    assignedAgent?: string;
  
}