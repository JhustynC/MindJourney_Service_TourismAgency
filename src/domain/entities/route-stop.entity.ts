import { Place } from "./place.entity";
import { CustomError } from "../errors/custom.errors";

export class RouteStop {
    constructor(
        public readonly order: number,
        public readonly place: Place
    ) { }

    static fromObject(obj: { [key: string]: any }): [CustomError?, RouteStop?] {
        const { order, place } = obj;

        if (order === undefined) {
            return [CustomError.badRequest('Missing order'), undefined];
        }
        if (!place) {
            return [CustomError.badRequest('Missing place'), undefined];
        }

        // Validar y transformar place a instancia de Place
        const [placeError, placeEntity] = Place.fromObject(place);
        if (placeError) {
            return [placeError, undefined];
        }

        return [undefined, new RouteStop(
            order,
            placeEntity!
        )];
    }
} 