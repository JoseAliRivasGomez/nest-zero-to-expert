import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

@Controller('cars')
//@UsePipes(ValidationPipe)
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ){}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {

        return this.carsService.findOneById(id);
    }

    @Post()
    //@UsePipes(ValidationPipe)
    createCar(@Body() body: CreateCarDTO) {
        return this.carsService.create(body);
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body: UpdateCarDTO, 
    ) {
        return this.carsService.update(id, body);
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.delete(id);
    }

}
