import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {

    // @ApiProperty({
    //     default: 10,
    //     description: 'How many rows do you need?',
    //     nullable: false,
    //     minLength: 1
    // })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    offset?: number;
}