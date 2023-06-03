import { User } from "../models/index.mjs";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        //generate hash salt for password
        const salt = await bcrypt.genSalt(12);

        //generate the hashed version of users password
        const hashed_password = await bcrypt.hash(password, salt);

        const user = await User.create({ email, password: hashed_password });
        if (user) {
            res.status(201).json({ message: "new user created!" });
        }
    } catch (e) {
        console.log(e);
    }
};

export const homePage = async (req, res) => {
    if (!req.user) {
        return res.redirect("/");
    }

    res.render("home", {
        sessionID: req.sessionID,
        sessionExpireTime: new Date(req.session.cookie.expires) - new Date(),
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
    });
}

export const loginPage = async (req, res) => {
    res.render("auth/login");
}

export const registerPage = (req, res) => {
    res.render('auth/register');
}

export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect("/");
    });
}