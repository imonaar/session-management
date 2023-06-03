import express from "express"
import { homePage, loginPage, logout, signup, registerPage } from "../controllers/index.mjs"

export const router = express.Router();
import passport from "passport";

router.route("/").get(loginPage);
router.route("/register").get(registerPage);
router.route("/home").get(homePage);
router.route("/api/v1/signin").post(
    passport.authenticate("local", {
        failureRedirect: "/",
        successRedirect: "/home"
    }),
    function (req, res) { }
);
router.route("/api/v1/signup").post(signup);
router.route("/logout").get(logout);