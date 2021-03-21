import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import connectToDatabase from '../../../database/connection';
import { modelConfigMiddleware, ImageRequest } from '../../../database/middlewares/images/modelConfigMiddleware';

connectToDatabase(process.env.DATABASE_URI);

const apiRoute = nextConnect({
    onError: (error, req: NextApiRequest, res: NextApiResponse) => {
        res.status(501).json({ success: false, error: `Sorry, something happened! ${error.message}` })
    },

    onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
        res.status(405).json({ success: false, error: `Method ${req.method} not allowed.`})
    }
})

apiRoute.use(modelConfigMiddleware);

apiRoute.get(async (req: ImageRequest, res: NextApiResponse) => {
    try {
        const Image = req.image;
        const images = await Image.find();

        return res.status(201).json({ success: true, data: images });
    } catch (err) {
        return res.status(500).json({ success: false, error: `There was an error getting the images data. ${err}` });
    }
})

apiRoute.delete(async (req: ImageRequest, res: NextApiResponse) => {
    try {
        const Image = req.image;
        await Image.deleteMany();

        return res.status(201).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, error: `There was an error trying to delete all images. ${err}` });
    }
})

export default apiRoute;