import { IsNotEmpty, IsString, MinLength, MaxLength, IsObject } from 'class-validator'
import {} from 'class-transformer'

export class PairTickerDTO {
    readonly symbol: string;
    readonly bid: number;
    readonly ask: number;
    readonly exchange:  string;
}
