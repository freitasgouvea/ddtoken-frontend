export interface Wallet {
    address: string;
    assets:[{
        coin: string,
        balance: number
    }],
    shares:[{
        vault: string,
        balance: number
    }]
}