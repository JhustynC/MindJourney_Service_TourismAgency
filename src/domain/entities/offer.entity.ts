import { CustomError } from "../errors/custom.errors";

export class OfferEntity {

    constructor(
        public readonly id: string,
        public readonly partnerId: string,
        public readonly title: string,
        public readonly description: string,
        public readonly validFrom: Date,
        public readonly validTo: Date,
        public readonly price: number,
    ) { }

    static fromObject(obj: { [key: string]: any }): [CustomError?, OfferEntity?] {
        const { id, _id, partnerId, title, description, validFrom, validTo, price } = obj;

        if (!id && !_id) {
            return [CustomError.badRequest('Missing id'), undefined];
        }
        if (!partnerId) {
            return [CustomError.badRequest('Missing partnerId'), undefined];
        }
        if (!title) {
            return [CustomError.badRequest('Missing title'), undefined];
        }
        if (!description) {
            return [CustomError.badRequest('Missing description'), undefined];
        }
        if (!validFrom) {
            return [CustomError.badRequest('Missing validFrom'), undefined];
        }
        if (!validTo) {
            return [CustomError.badRequest('Missing validTo'), undefined];
        }
        if (price === undefined) {
            return [CustomError.badRequest('Missing price'), undefined];
        }
        if (price < 0) {
            return [CustomError.badRequest('Price cannot be negative'), undefined];
        }

        const fromDate = new Date(validFrom);
        const toDate = new Date(validTo);

        if (fromDate >= toDate) {
            return [CustomError.badRequest('validFrom must be before validTo'), undefined];
        }

        return [undefined, new OfferEntity(
            id || _id.toString(),
            partnerId,
            title,
            description,
            fromDate,
            toDate,
            price,
        )]
    }

}