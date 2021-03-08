import { NextApiRequest, NextApiResponse } from 'next';

import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads',
        filename: (req, file, cb) => cb(null,  Date.now() + '-' + file.originalname),
    })
})

const apiRoute = nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
        res.status(501).json({ error: `Sorry, something happened! ${error.message}`, success: false });
    },

    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed`, success: false });
    },
})

const uploadMiddleware = upload.array('artFiles');

apiRoute.use(uploadMiddleware);

// Process a POST request
apiRoute.post((req: NextApiRequest, res: NextApiResponse) => {    
    res.status(200).json({ success: true });
})

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    }
}