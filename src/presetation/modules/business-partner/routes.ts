import { Router } from "express";
import { Request, Response } from "express";

export class BusinesPartnerRoutes{
    static get routes(): Router {
        const router = Router();

        router.get('/:partnerId', async (req: Request, res: Response) => {
            const { partnerId } = req.params;
            if (!partnerId) {
                return res.status(400).json({ message: "Missing partnerId" });
            }

            const api_map_service_url = `https://businesspartnerbackend.onrender.com/v1/business/information/${partnerId}`;

            try {
                const fetchResponse = await fetch(api_map_service_url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!fetchResponse.ok) {
                    const errorText = await fetchResponse.text();
                    return res.status(fetchResponse.status).json({
                        message: "Error fetching data from Map Service",
                        details: errorText
                    });
                }

                const data = await fetchResponse.json();
                return res.status(200).json(data);

            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal Server Error" });
            }   
        });
       
        return router;
    }
}