import { RouteEntity } from "../../../domain/entities/route.entity";

export class RouteService{
    async updateRoute(route: RouteEntity){
        console.log(route);
        return route;
    }
}