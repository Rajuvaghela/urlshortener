
import { Router } from 'express';
import { redirectToShortLink,postURLShortner,getShortenerPage,getRepost } from '../controllers/postShortener.controller.js';

const router = Router();

router.get("/report", getRepost);

router.get('/', getShortenerPage);

router.post("/",postURLShortner);

router.get('/:shortCode',  redirectToShortLink);


export const shortnerRoutes = router;