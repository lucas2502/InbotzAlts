import { IsNotEmpty, IsString, MinLength, MaxLength, IsObject } from 'class-validator'
import {} from 'class-transformer'

export class CostOperationDTO {
    readonly costOperation: number;
    readonly bid: number;
    readonly ask: number;
    readonly exchangeBid: string;
    readonly exchangeAsk: string;
}
