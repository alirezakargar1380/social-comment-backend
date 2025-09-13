import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entitys/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    // JwtModule.register({
    //   secret: process.env.JWT_AUTH_SECRET,
    //   signOptions: { expiresIn: process.env.JWT_AUTH_TIME },
    // })
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
