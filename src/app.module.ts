import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "postgres",
        host: 'postgres',
        port: 5432,
        username: 'postgres' ,
        password: 'postgres_password' ,
        database: 'nik',
        entities: [User],
        synchronize: false,
      }
    ) 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() { }
}
