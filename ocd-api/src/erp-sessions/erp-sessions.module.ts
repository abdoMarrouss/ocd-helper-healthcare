import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErpSession } from './erp-session.entity';
import { ErpSessionsService } from './erp-sessions.service';
import { ErpSessionsController } from './erp-sessions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ErpSession])],
  providers: [ErpSessionsService],
  controllers: [ErpSessionsController],
})
export class ErpSessionsModule {}
