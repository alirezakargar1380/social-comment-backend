import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstagramModule } from './instagram/instagram.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'mysql',
      host: process.env.T_DB_HOST,
      port: 3306,
      username: process.env.T_DB_USERNAME,
      password: process.env.T_DB_PASSWORD,
      database: process.env.T_DB_DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true  
    }),
    InstagramModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
