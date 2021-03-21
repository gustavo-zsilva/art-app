import { NextApiRequest, NextApiResponse } from 'next';

import mongoose from 'mongoose';
import ImageSchema from '../../models/Image';

export interface ImageRequest extends NextApiRequest {
    image: any;
}

export const modelConfigMiddleware = (req: ImageRequest, res: NextApiResponse, next) => {
    let Image: any;

    try {
        Image = mongoose.model('Image');
    } catch {
        Image = mongoose.model('Image', ImageSchema);
    }

    req.image = Image;

    next();
}