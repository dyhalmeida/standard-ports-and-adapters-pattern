import { v4 as uuid} from 'uuid'

export class Identifier {
    static generate() {
        return uuid()
    }
}
