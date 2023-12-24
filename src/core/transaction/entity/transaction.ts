export interface Transaction {
    id?: string;
    description: string;
    value: number;
    expiration: Date;
    userId: string;
}
