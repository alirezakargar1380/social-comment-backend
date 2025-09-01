import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { CreateInstagramDto } from './dto/create-instagram.dto';
import { UpdateInstagramDto } from './dto/update-instagram.dto';
import { Response } from 'express';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) { }

  // @Post()
  // create(@Body() createInstagramDto: CreateInstagramDto) {
  //   return this.instagramService.create(createInstagramDto);
  // }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const result = await this.instagramService.checkPageExist("alireza_kargarr");
      // await this.instagramService.captureInstagram();
      res.status(200).send('doe!' + " page exist:" + `${result}`)
    } catch (error) {
      console.log(error)
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.instagramService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInstagramDto: UpdateInstagramDto) {
  //   return this.instagramService.update(+id, updateInstagramDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.instagramService.remove(+id);
  // }
}
