import { NextApiRequest, NextApiResponse } from 'next';

import nextConnect from 'next-connect';
import multer from 'multer';

import connectToDatabase from '../../../database/connection';
import { modelConfigMiddleware } from '../../../database/middlewares/images/modelConfigMiddleware';

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

// Api Route Instance
const apiRoute = nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
        res.status(501).json({ success: false, error: `Sorry, something happened! ${error.message}` });
    },

    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
        res.status(405).json({ success: false, error: `Method '${req.method}' Not Allowed` });
    },
})

const uploadMiddleware = upload.single('artFiles');

apiRoute.use(uploadMiddleware);
apiRoute.use(modelConfigMiddleware);

// Application Routes
apiRoute.post((req: MulterRequest, res: NextApiResponse) => {
    const filePath = req.file.path;
    const Image = req.image;

    const newImage = new Image({
        img: {
            path: filePath,
            contentType: req.file.mimetype,
        },
        author: 'Gustavo Silva',
        votes: {
            upvotes: 0,
            downvotes: 0,
        }
    })

    newImage.save();

    console.log('Saved Image to Database');
    return res.status(200).json({ success: true });
})

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    }
}