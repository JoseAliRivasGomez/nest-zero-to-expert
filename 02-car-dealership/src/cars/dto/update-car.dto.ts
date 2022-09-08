import { IsString, MinLength, IsUUID, IsOptional } from "class-validator";


export class UpdateCarDTO {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString({message: 'The brand must be a string'})
    @IsOptional()
    readonly brand?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    readonly model?: string;

}