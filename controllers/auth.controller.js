import { createUser, getUserByEmail, hashPassword ,comparePassword, generateToken} from "../services/auth.services.js";

export const getRegisterPage = (req, res) => {
    //below both method are equal
    //return res.render('../views/auth/register')
    return res.render('auth/register');
}

export const postRegister = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    const userExists = await getUserByEmail(email);
    console.log(userExists);
    if (userExists) return res.redirect('/register');

    const hashedPassword = await hashPassword(password);

    const [user] = await createUser({ name, email, password:hashedPassword });
    console.log(user);

    res.redirect('/login');
}

export const getLoginPage = (req, res) => {
    return res.render('../views/auth/login');
}

export const postLogin = async (req, res) => {
    //old method
    // res.setHeader("Set-Cookie","isLoggedIn=true;path=/;")
    console.log(req.body);

    const {  email, password } = req.body;

    const user = await getUserByEmail(email);
    console.log(user);
    if (!user) return res.redirect('/login');

    const isPasswordValid = await comparePassword(password, user.password);


    if (!isPasswordValid) return res.redirect('/login');

    //return res.redirect('/');
    //res.cookie("isLoggedIn", true);

    const token = generateToken({
            id:user.id,
            name: user.name,
            email:user.email
    });
    res.cookie('access_token',token);
    return res.redirect('/');
}