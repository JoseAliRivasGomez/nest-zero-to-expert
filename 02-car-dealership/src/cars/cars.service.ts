import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import {v4 as uuid} from 'uuid';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // },
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string){

        const car = this.cars.find(car => car.id === id);

        if(!car) throw new NotFoundException(`Car with ID '${id}' not found`);
        
        return car;
    }

    create(body: CreateCarDTO){

        //const {brand, model} = body;

        const newCar: Car = {
            id: uuid(),
            ...body
        }

        this.cars.push(newCar);

        return newCar;

    }

    update(id: string, body: UpdateCarDTO){

        let carDB = this.findOneById(id);

        if(body.id && body.id !== id) throw new BadRequestException('Car ID in body is not valid');

        this.cars = this.cars.map(car => {
            if(car.id === id){
                carDB = {
                    ...carDB,
                    ...body,
                    id,
                }
                return carDB;
            }
            return car;
        })

        return carDB;

    }

    delete(id: string){

        const carDB = this.findOneById(id);

        this.cars = this.cars.filter(car => car.id !== id);

        return carDB;

    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }

}
