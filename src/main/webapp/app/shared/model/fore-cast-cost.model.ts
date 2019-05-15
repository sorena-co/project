export const enum ForeCastCostType {
    CONSUME = 'CONSUME',
    COST = 'COST',
    SUPPORT = 'SUPPORT',
    SPACE = 'SPACE',
    SELL_CONTRACT = 'SELL_CONTRACT',
    OTHER = 'OTHER'
}

export interface IForeCastCost {
    id?: number;
    deviceName?: string;
    builderCompany?: string;
    count?: number;
    costDetail?: string;
    basePriceRial?: number;
    basePriceDollar?: number;
    totalPriceRial?: number;
    totalPriceDollar?: number;
    space?: number;
    sellContractType?: string;
    type?: ForeCastCostType;
}

export class ForeCastCost implements IForeCastCost {
    constructor(
        public id?: number,
        public deviceName?: string,
        public builderCompany?: string,
        public count?: number,
        public costDetail?: string,
        public basePriceRial?: number,
        public basePriceDollar?: number,
        public totalPriceRial?: number,
        public totalPriceDollar?: number,
        public space?: number,
        public sellContractType?: string,
        public type?: ForeCastCostType
    ) {}
}
