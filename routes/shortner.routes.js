
import { Router } from 'express';
import {
     redirectToShortLink,
     postURLShortner,
     getShortenerPage,
     getRepost,
    getShortenerEditPage,
    postShortenerEditPage,
    deleteShortCode
 } from '../controllers/postShortener.controller.js';

const router = Router();

router.get("/report", getRepost);

router.get('/', getShortenerPage);

router.post("/",postURLShortner);

router.get('/:shortCode',  redirectToShortLink);

router.route("/edit/:id").get(getShortenerEditPage).post(postShortenerEditPage);

router.route("/delete/:id").post(deleteShortCode);

export const shortnerRoutes = router;