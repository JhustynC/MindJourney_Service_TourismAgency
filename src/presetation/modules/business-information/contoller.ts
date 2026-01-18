import { Request, Response } from "express";
import { BusinessInformationService } from "./business-information.service";
import { OfferEntity } from "../../../domain/entities/offer.entity";
import { CustomError } from "../../../domain/errors/custom.errors";

export class BusinessInformationController{
    
    constructor(private readonly businessInformationService: BusinessInformationService){}
    
    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message: error.message});
        }
        console.log(`${error}`);
        return res.status(500).json({message: 'Internal Server Error'});
    }

    public pushPartnerOffers = async(req: Request, res: Response) => {
        const offer = req.body;
        const [error, offerEntity] = OfferEntity.fromObject(offer);
        if(error) return this.handleError(error, res);

        return this.businessInformationService.pushPartnerOffers(offerEntity!)
        .then(offer => res.status(200).json({
            message: 'New offer was received successfully',
            data: offer
        }))
        .catch(err => this.handleError(err, res))
    }
}