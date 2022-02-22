import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DbDailyActivity } from './db.daily-activity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "postgres",
        host: process.env.host || 'ec2-54-158-26-89.compute-1.amazonaws.com',
        port: 5432,
        username: process.env.username || 'lhrgparcipqcci',
        password: process.env.password || '27d619686584051a95e4a3400a8bdcd41eaf39124431d8039a59284f98201120',
        database: process.env.db || 'dbn9pt7tmklkh',
        entities: [User],
        synchronize: false,
        ssl: {
          rejectUnauthorized:false
        }
      }
    )
  ],
  controllers: [AppController, DbDailyActivity],
  providers: [AppService],
})
export class AppModule {
  constructor() { }
}
