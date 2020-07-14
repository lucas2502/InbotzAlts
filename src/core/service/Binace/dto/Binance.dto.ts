import { IsNotEmpty, IsString, MinLength, MaxLength, IsObject, IsNumber } from 'class-validator'
import {} from 'class-transformer'

export class BinanceBookTickerDTO {
    @IsNotEmpty()
    @IsNumber()
    @MinLength(1)
    @MaxLength(100)
    readonly askPrice: number;

    @IsNotEmpty()
    @IsNumber()
    @MinLength(1)
    @MaxLength(100)
    readonly askQty: number;

    @IsNotEmpty()
    @IsNumber()
    @MinLength(1)
    @MaxLength(100)
    readonly bidPrice: number;

    @IsNotEmpty()
    @IsNumber()
    @MinLength(1)
    @MaxLength(100)
    readonly bidQty: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    readonly symbol: string;
}

export class BinanceTickerPriceDTO {
    @IsNotEmpty()
    @IsNumber()
    @MinLength(1)
    @MaxLength(100)
    readonly price: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    readonly symbol: symbol;
}

