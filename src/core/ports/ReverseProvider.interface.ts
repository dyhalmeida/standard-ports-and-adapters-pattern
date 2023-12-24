export interface IReverseProvider {
    reverse(value: string): string
    compare(value: string, valueToCompare: string): boolean
}
