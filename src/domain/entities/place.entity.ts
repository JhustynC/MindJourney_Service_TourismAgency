import { Coordinates } from "./coordinates.entity"
import { CustomError } from "../errors/custom.errors"

export enum PlaceCategory{
    CITY,
    HOTEL,
    ATTRACTION,
    RESTAURANT,
    ACTIVITY
}

export class Place {

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly coordinates: Coordinates,
        public readonly category: PlaceCategory
    ) { }

    static fromObject(obj: { [key: string]: any }): [CustomError?, Place?] {
        const { id, _id, name, coordinates, category } = obj;

        if (!id && !_id) {
            return [CustomError.badRequest('Missing id'), undefined];
        }
        if (!name) {
            return [CustomError.badRequest('Missing name'), undefined];
        }
        if (!coordinates) {
            return [CustomError.badRequest('Missing coordinates'), undefined];
        }
        if (category === undefined) {
            return [CustomError.badRequest('Missing category'), undefined];
        }

        // Validar y transformar coordinates a instancia de Coordinates
        const [coordError, coordinatesEntity] = Coordinates.fromObject(coordinates);
        if (coordError) {
            return [coordError, undefined];
        }

        return [undefined, new Place(
            id || _id.toString(),
            name,
            coordinatesEntity!,
            category
        )];
    }

}