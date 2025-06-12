import crypto from 'crypto';
import { getAllShortLinks, getShortLinkByShortCode, inserShortLink } from '../services/shortener.services.js';


export const postURLShortner = async (req, res) => {

    try {
        const { url, shortCode } = req.body;
        //const links = await getAllShortLinks();
        const finalShortCode = shortCode || crypto.randomBytes(4).toString('hex');
        const link = await getShortLinkByShortCode(finalShortCode);
        if (link) {
            return res.status(400).send('Short code already exist. Please choose another');
        }

        // await saveLinks({ url, shortCode })
        await inserShortLink({ url, shortCode });
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

export const getShortenerPage = async (req, res) => {
    try {
        // const links = await loadLinks();
        const links =await getAllShortLinks();
        // console.log("Links");
        //console.log(links);
        //const isLoggedIn = req.cookies.isLoggedIn;
        // let isLoggedIn = req.headers.cookie;
        // console.log("isLoggedIn",isLoggedIn);
        // isLoggedIn= isLoggedIn.split(';');
        // console.log(isLoggedIn);
        // const data = isLoggedIn?.find((cookie) => cookie.trim().startsWith("isLoggedIn"));
        // console.log(data);
        // const arr = data.split('=');
        // console.log(Boolean(arr[1]));
        //     isLoggedIn=Boolean(arr[1]);
        return res.render('index', { links: Array.isArray(links) ? links : [] , host: req.host });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}

export const getRepost = (req, res) => {
    const student = [
        {
            name: "Raju",
            grade: "10th",
            fav: "Maths"
        },
        {
            name: "amit",
            grade: "12th",
            fav: "Science"
        }
    ];
    return res.render('report', { student });
}

export const redirectToShortLink = async (req, res) => {
    try {
        const { shortCode } = req.params;
        //const link = await getLinkByShortCode(shortCode);
        const link = await getShortLinkByShortCode(shortCode);
        console.log(link);
        // const links = await loadLinks();

        if (!link)
            return res.status(404).send("404 error occured");

        return res.redirect(link.url);

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}