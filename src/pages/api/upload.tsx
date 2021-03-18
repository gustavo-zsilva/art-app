import { NextApiRequest, NextApiResponse } from 'next';

import nextConnect from 'next-connect';
import multer from 'multer';

import mongoose from 'mongoose';
import connectToDatabase from '../../database/connection';
import ImageSchema from '../../database/models/Image';

connectToDatabase(process.env.DATABASE_URI);

interface MulterRequest extends NextApiRequest {
    file: any;
    image: any;
}

const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads',
        filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
})

// Application Middlewares
const connectionConfigMiddleware = async (req: MulterRequest, res: NextApiResponse, next) => {

    let Image: any;

    try {
        Image = mongoose.model('Image');
    } catch {
        Image = mongoose.model('Image', ImageSchema);
    }

    req.image = Image;

    next();
}

const apiRoute = nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
        res.status(501).json({ error: `Sorry, something happened! ${error.message}`, success: false });
    },

    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed`, success: false });
    },
})

const uploadMiddleware = upload.single('artFiles');

apiRoute.use(uploadMiddleware);
apiRoute.use(connectionConfigMiddleware);

// Application Routes
apiRoute.post((req: MulterRequest, res: NextApiResponse) => {
    const filePath = req.file.path;
    const Image = req.image;

    const newImage = new Image({
        img: {
            path: filePath,
            contentType: req.file.mimetype,
        }
    })

    newImage.save();

    console.log('Saved Image to Database');
    return res.status(200).json({ success: true });
})

apiRoute.get(async (req: MulterRequest, res: NextApiResponse) => {
    const Image = req.image;
    const images = await Image.find();
    
    return res.status(200).json({ success: true, data: images });
})

apiRoute.delete(async (req: MulterRequest, res: NextApiResponse) => {
    const Image = req.image;
    await Image.deleteMany();

    console.log('Deleted all Images from Database');
    return res.status(200).json({ success: true });
})

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    }
}