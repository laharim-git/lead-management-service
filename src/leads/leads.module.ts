import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { Lead } from './entities/lead.entity'; // Import your Lead entity
import { AuditLog } from './entities/auditlogs.entity'; // Import AuditLog entity if needed

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead, AuditLog]), // Register the entities for use with TypeORM
  ],
  controllers: [LeadsController], // Register LeadsController
  providers: [LeadsService], // Register LeadsService
})
export class LeadsModule {}
