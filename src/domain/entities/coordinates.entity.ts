import { CustomError } from "../errors/custom.errors";

export class Coordinates {
    constructor(
        public readonly longitud: number,
        public readonly latitud: number
    ) { }

    static fromObject(obj: { [key: string]: any }): [CustomError?, Coordinates?] {
        const { longitud, latitud } = obj;

        if (longitud === undefined) {
            return [CustomError.badRequest('Missing longitud'), undefined];
        }
        if (latitud === undefined) {
            return [CustomError.badRequest('Missing latitud'), undefined];
        }

        return [undefined, new Coordinates(longitud, latitud)];
    }
}