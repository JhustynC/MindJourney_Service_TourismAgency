import { CustomError } from "../errors/custom.errors";
import { RouteStop } from "./route-stop.entity";

export class RouteEntity {

    constructor(
        public readonly id: string,
        public readonly totalDistanceKm: number,
        public readonly totalDurationMin: number,
        public readonly polyline: string,
        public readonly stops: RouteStop[],
    ) { }

    static fromObject(obj: { [key: string]: any }): [CustomError?, RouteEntity?] {
        const { id, _id, totalDistanceKm, totalDurationMin, polyline, stops } = obj;

        if (!id && !_id) {
            return [CustomError.badRequest('Missing id'), undefined];
        }
        if (totalDistanceKm === undefined) {
            return [CustomError.badRequest('Missing totalDistanceKm'), undefined];
        }
        if (totalDurationMin === undefined) {
            return [CustomError.badRequest('Missing totalDurationMin'), undefined];
        }
        if (!polyline) {
            return [CustomError.badRequest('Missing polyline'), undefined];
        }
        if (!stops || !Array.isArray(stops)) {
            return [CustomError.badRequest('Missing or invalid stops'), undefined];
        }

        // Transformar stops planos a instancias de RouteStop
        const transformedStops: RouteStop[] = [];
        for (const stopObj of stops) {
            const [stopError, routeStop] = RouteStop.fromObject(stopObj);
            if (stopError) {
                return [stopError, undefined];
            }
            transformedStops.push(routeStop!);
        }

        return [undefined, new RouteEntity(
            id || _id.toString(),
            totalDistanceKm,
            totalDurationMin,
            polyline,
            transformedStops,
        )];
    }

}