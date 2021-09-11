const express = require("express");
const router = express.Router();
const passport = require("passport");
const cookieSession = require("cookie-session");
require("../config/passport");

router.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

router.use(passport.initialize());
router.use(passport.session());

router.get("/", (req, res) => res.sendStatus(200));

router.get("/failed", (req, res) => res.send("gagal login"));

router.get("/home", isLoggedIn, (req, res) =>
  res.send(`halo ${req.user.displayName}!`)
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    res.redirect("/home");
  }
);

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

module.exports = router;
