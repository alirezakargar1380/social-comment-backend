import { Controller, Get, HttpStatus, Res, Query, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Response } from 'express';
import { IBody } from './interfaces/body.interface';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Post('/')
    async addCategory(@Query() query: any, @Body() body: IBody, @Res() response: Response) {
        try {
            const data: any = await this.categoryService.save(body)

            response.status(HttpStatus.ACCEPTED).send(data)
        } catch (e) {
        }
    }

    @Delete('/:id')
    async deleteCategory(@Param("id") id: string, @Res() response: Response) {
        try {
            response.status(HttpStatus.ACCEPTED).send(await this.categoryService.deleteId(id))
        } catch (e) {
            console.log(e)
        }
    }

    @Get('/')
    async getCategory(@Res() response: Response) {
        try {
            const data: any = await this.categoryService.find()

            response.status(HttpStatus.ACCEPTED).send(data)
        } catch (e) {
            console.log(e)
        }
    }

    @Get('/:id')
    async getOne(@Param("id") id: string, @Res() response: Response) {
        try {
            const data: any = await this.categoryService.findOne(id)
            response.status(HttpStatus.ACCEPTED).send(data)
        } catch (e) {
            console.log(e)
        }
    }

    // @Get('/:id/products')
    // async getProductsByCategoryId(@Param("id") id: string, @Res() response: Response) {
    //     try {
    //         const userFavoriteProducts: any = response.locals.user ? await this.favoriteService.findUserFavorites(response.locals.user, +id) : []
    //         const data: any = await this.categoryService.findCategoryProducts(id, response.locals.user)
    //         response.status(HttpStatus.ACCEPTED).send({
    //             favProductIds: userFavoriteProducts,
    //             data
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    @Put('/:id')
    async updateOne(@Param("id") id: string, @Body() body: IBody, @Res() response: Response) {
        try {
            const data: any = await this.categoryService.updateOne(id, body)
            response.status(HttpStatus.ACCEPTED).send(data)
        } catch (e) {
            console.log(e)
        }
    }
}
