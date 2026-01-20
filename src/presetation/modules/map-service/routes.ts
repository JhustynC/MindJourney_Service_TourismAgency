import { Router, Request, Response } from "express";

export class MapServiceRoutes{
    static get routes(): Router {
        const router = Router();

        router.post('/compute-route', async (req: Request, res: Response) => {

            const { origin, destination, waypoints } = req.body;

            if ( !origin || !destination) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const api_map_service_url = "https://mindjourney-map-services.onrender.com/map/compute-route";

            try {
                const fetchResponse = await fetch(api_map_service_url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ origin, destination, waypoints })
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

        router.post('/route-by-interests', async (req: Request, res: Response) => {

            const { interests, startLocation, maxDistanceKm } = req.body;

            if (!interests || !startLocation || !maxDistanceKm) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const api_map_service_url = "https://mindjourney-map-services.onrender.com/map/route-by-interests";

            try {
                const fetchResponse = await fetch(api_map_service_url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ interests, startLocation, maxDistanceKm })
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