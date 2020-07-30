import { IsNotEmpty, IsString, MinLength, MaxLength, IsObject, IsNumber } from 'class-validator'
import {} from 'class-transformer'

export class BinanceBookTickerDTO {
    readonly askPrice: string;
    readonly askQty: string;
    readonly bidPrice: string;
    readonly bidQty: string;
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

