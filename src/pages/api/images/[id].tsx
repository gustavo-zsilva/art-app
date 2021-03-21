import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import connectToDatabase from '../../../database/connection';

import { modelConfigMiddleware, ImageRequest } from '../../../database/middlewares/images/modelConfigMiddleware';

connectToDatabase(process.env.DATABASE_URI);

const apiRoute = nextConnect({
    onError: (error, req: NextApiRequest, res: NextApiResponse) => {
        res.status(501).json({ success: false, error: `Sorry, something happened! ${error.message}` });
    },
    
    onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
        res.status(405).json({ success: false, error: `Method '${req.method}' Not Allowed` });
    }
})

apiRoute.use(modelConfigMiddleware);

apiRoute.get(async (req: ImageRequest, res: NextApiResponse) => {
    const Image = req.image;

    const {
        id
    } = req.query;

    try {
        const imageData = await Image.findById(id);

        res.status(200).json({ success: true, data: imageData });
    } catch (err) {
        res.status(200).json({ success: false });
    }
})

export default apiRoute;