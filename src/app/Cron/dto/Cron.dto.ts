import { IsNotEmpty, IsString, MinLength, MaxLength, IsObject } from 'class-validator'
import {} from 'class-transformer'

export class PairTickerDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    readonly symbol: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    readonly bid: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    readonly ask: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    readonly exchange:  string;
}
