import { Request, Response } from "express";
import { RouteService } from "./routes.service";
import { RouteEntity } from "../../../domain/entities/route.entity";
import { CustomError } from "../../../domain/errors/custom.errors";

export class RouteController{
    
    constructor(private readonly routeService: RouteService){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message: error.message});
        }
        console.log(`${error}`);
        return res.status(500).json({message: 'Internal Server Error'});
    }

    public updateRoute = async(req: Request, res: Response) => {
        const routeUpdate = req.body;
        const [error, routeEntity] = RouteEntity.fromObject(routeUpdate);
        if(error) return this.handleError(error, res);

        return this.routeService.updateRoute(routeEntity!)
        .then(update => res.status(200).json(`New route was received successfully\n${update}`))
        .catch(err => this.handleError(err, res))
    }

}