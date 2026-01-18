import { OfferEntity } from "../../../domain/entities/offer.entity";

export class BusinessInformationService {

    async pushPartnerOffers(offer: OfferEntity) {
        console.log(offer);
        return offer;
    }


}