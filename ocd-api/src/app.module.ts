import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { YbocsModule } from './ybocs/ybocs.module';
import { FearHierarchyModule } from './fear-hierarchy/fear-hierarchy.module';
import { ErpSessionsModule } from './erp-sessions/erp-sessions.module';
import { ThoughtRecordsModule } from './thought-records/thought-records.module';
import { User } from './users/user.entity';
import { YbocsAssessment } from './ybocs/ybocs-assessment.entity';
import { FearHierarchyItem } from './fear-hierarchy/fear-hierarchy-item.entity';
import { ErpSession } from './erp-sessions/erp-session.entity';
import { ThoughtRecord } from './thought-records/thought-record.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, YbocsAssessment, FearHierarchyItem, ErpSession, ThoughtRecord],
      synchronize: true,
      connectTimeout: 10000,
      extra: {
        connectionLimit: 5,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
      },
    }),
    AuthModule,
    UsersModule,
    YbocsModule,
    FearHierarchyModule,
    ErpSessionsModule,
    ThoughtRecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
