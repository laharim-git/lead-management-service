import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsModule } from './leads/leads.module'; // Import LeadsModule
import { Lead } from './leads/entities/lead.entity'; // Import the Lead entity
import { AuditLog } from './leads/entities/auditlogs.entity'; // Import AuditLog entity if needed

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306, 
      username: 'root', 
      password: 'root', 
      database: 'Lead_management', 
      entities: [Lead, AuditLog],
      synchronize: false, 
      logging: true, 
    }),
    LeadsModule, // Import LeadsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
