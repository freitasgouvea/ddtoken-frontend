export interface Vault {
    id: string;
    name: string;
    coinId: string;
    symbol: string;
    source: string;
    network: string;
    pattern: string;
    address: string;
    balance: number;
    apy: string;
    abi: any;
    active: boolean;
    txs: number;
    holders:[
        {
            name: string,
            value: number
        }
    ]
}