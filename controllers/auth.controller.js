import { createUser, getUserByEmail, hashPassword, comparePassword, generateToken } from "../services/auth.services.js";

export const getRegisterPage = (req, res) => {
    //below both method are equal
    //return res.render('../views/auth/register')
    if (req.user) return res.redirect('/');
    return res.render('auth/register', { errors: req.flash("errors") });
}

export const postRegister = async (req, res) => {
    if (req.user) return res.redirect('/');
    console.log(req.body);
    const { name, email, password } = req.body;

    const userExists = await getUserByEmail(email);
    console.log(userExists);
    // if (userExists) return res.redirect('/register');
    if (userExists) {
        req.flash('errors', "User already exists");
        return res.redirect('/register');
    }

    const hashedPassword = await hashPassword(password);

    const [user] = await createUser({ name, email, password: hashedPassword });
    console.log(user);

    res.redirect('/login');
}

export const getLoginPage = (req, res) => {
    if (req.user) return res.redirect('/');
    return res.render('../views/auth/login',{errors:req.flash('errors')});
}

export const postLogin = async (req, res) => {
    //old method
    // res.setHeader("Set-Cookie","isLoggedIn=true;path=/;")

    if (req.user) return res.redirect('/');
    console.log(req.body);

    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    //console.log(user);
    if (!user) {
        req.flash("errors", "Invalid Email or Password");
        return res.redirect('/login');
    }

    const isPasswordValid = await comparePassword(password, user.password);


    if (!isPasswordValid) {
        req.flash("errors", "Invalid Email or Password");
        return res.redirect('/login');
    }

    //return res.redirect('/');
    //res.cookie("isLoggedIn", true);

    const token = await generateToken({
        id: user.id,
        name: user.name,
        email: user.email
    });
    res.cookie('access_token', token);
    return res.redirect('/');
}


export const getMe = (req, res) => {
    if (!req.user) return res.send("Not logged in");
    return res.send(`<h1> Hey ${req.user.name} - ${req.user.email}</h1>`);
}

export const logoutUser = (req, res) => {
    res.clearCookie('access_token');
    res.redirect('/login');
}