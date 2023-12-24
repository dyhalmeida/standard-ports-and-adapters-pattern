import { IReverseProvider } from "../core/ports/ReverseProvider.interface";

export class ReversePassword implements IReverseProvider {
    reverse(value: string): string {
        return value.split('').reverse().join('')
    }
    compare(value: string, valueToCompare: string): boolean {
        return this.reverse(value) === valueToCompare
    }
}
