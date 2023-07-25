import { IsString, IsNumber, IsOptional, IsPositive, IsInt, MinLength, IsArray, IsIn, Min } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsInt()
    @Min(0)
    @IsOptional()
    stock?: number;

    @IsString({each: true})
    @IsArray()
    sizes: string[];

    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;

    @IsString({each: true})
    @IsArray()
    @IsOptional()
    tags: string[];

    @IsString({each: true})
    @IsArray()
    @IsOptional()
    images: string[];

}
