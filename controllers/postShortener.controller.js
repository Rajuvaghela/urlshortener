import crypto from 'crypto';
import {
    getAllShortLinks,
    getShortLinkByShortCode,
    inserShortLink,
    findShortLinkById,
    updateShortCode,
    deleteShortCodeById
} from '../services/shortener.services.js';
import z from 'zod';


export const postURLShortner = async (req, res) => {

    try {
        if (!req.user) return res.redirect("/login");

        const { url, shortCode } = req.body;
        //const links = await getAllShortLinks();
        const finalShortCode = shortCode || crypto.randomBytes(4).toString('hex');
        const link = await getShortLinkByShortCode(finalShortCode);
        if (link) {
            // return res.status(400).send('Short code already exist. Please choose another');
            req.flash(
                "errors",
                "Url with that shortcode alredy exists, please choose another"
            );
            return res.redirect('/');
        }

        // await saveLinks({ url, shortCode })
        await inserShortLink({
            url,
            shortCode,
            userId: req.user.id
        });
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

export const getShortenerPage = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/login");
        const links = await getAllShortLinks(req.user.id);
        return res.render('index', {
            links: Array.isArray(links) ? links : [],
            host: req.host,
            errors: req.flash("errors"),
        });
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

//getShortenerEditPage
export const getShortenerEditPage = async (req, res) => {
    if (!req.user) return res.redirect("/login");
    // const id = req.params;
    const { data: id, error } = z.coerce.number().int().safeParse(req.params.id);
    if (error) return res.redirect("/404");

    try {
        const shortLink = await findShortLinkById(id);
        if (!shortLink) return res.redirect("/404");

        res.render("edit-shortLink", {
            id: shortLink.id,
            url: shortLink.url,
            shortCode: shortLink.shortCode,
            errors: req.flash("errors"),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

export const postShortenerEditPage = async (req, res) => {
    if (!req.user) return res.redirect("/login");
    // const id = req.params;
    const { data: id, error } = z.coerce.number().int().safeParse(req.params.id);
    if (error) return res.redirect("/404");

    try {
        const { url, shortCode } = req.body;
        const newUpdateShortCode = await updateShortCode({ id, url, shortCode });
        if (!newUpdateShortCode) return res.redirect("/404");

        res.redirect("/");
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            req.flash("errors", "Shortcode already exists, please choose another");
            return res.redirect(`/edit/${id}`);
        }

        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

//deleteShortCode
export const deleteShortCode = async (req, res) => {
  try {
    const { data: id, error } = z.coerce
      .number()
      .int()
      .safeParse(req.params.id);
    if (error) return res.redirect("/404");

    await deleteShortCodeById(id);
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};