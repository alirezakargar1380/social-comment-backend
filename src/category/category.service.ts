import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entitys/category.entity';
import { IsNull, Repository } from 'typeorm';
import { IBody, ICategoryCreateInput } from './interfaces/body.interface';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) { }

    async save(data: ICategoryCreateInput | any) {
        return await this.categoryRepository.save(data);
    }

    findOne(id: string) {
        return this.categoryRepository.findOne({ where: { id: Number(id) } });
    }

    updateOne(id: string, data: ICategoryCreateInput | any) {
        return this.categoryRepository
            .update({
                id: Number(id)
            }, data)
    }

    deleteId(id: string) {
        return this.categoryRepository.delete(Number(id))
    }

    async findCategoryProducts(id: string, user: any | undefined) {
        // const products = await this.productsRepository.find({
        //     where: { category: { id: Number(id) }, active: true },
        //     relations: {
        //         category: true,
        //         images: true,
        //         code: true,
        //     }
        // });

        // return products.sort((a, b) => {
        //     if (a.sort === null && b.sort === null) return 0
        //     if (a.sort === null) return 1
        //     if (b.sort === null) return -1
        //     return a.sort - b.sort
        // })
    }

    async find() {
        let cat = await this.categoryRepository.find();
        return cat.sort((a, b) => {
            if (a.sort === null && b.sort === null) return 0
            if (a.sort === null) return 1
            if (b.sort === null) return -1
            return a.sort - b.sort
        })
    }
}
