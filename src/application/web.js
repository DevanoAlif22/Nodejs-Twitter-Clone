import express from "express";
import { publicRouter, authRouter } from "../route/public-web.js";
import mustacheExpress from "mustache-express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import path from "path";

const __dirname = path.resolve(); // Mendapatkan __dirname untuk ESM

export const web = express();

// Konfigurasi body-parser sebagai middleware
web.use(bodyParser.urlencoded({ extended: false }));
web.use(bodyParser.json());

// Konfigurasi Mustache sebagai templating engine
web.engine("html", mustacheExpress());
web.set("view engine", "html");
web.set("views", path.join(__dirname, "src/views/html"));

console.log("Views directory:", path.join(__dirname, "src/views/html")); // Debugging

// Mengatur direktori untuk file statis
web.use(express.static(path.join(__dirname, "src/views")));

// Konfigurasi session middleware dengan secret key bcrypt
const saltRounds = 10;
const sessionSecret = bcrypt.genSaltSync(saltRounds);

web.use(
  session({
    secret: sessionSecret, // Menggunakan bcrypt hash sebagai secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3 * 60 * 60 * 1000, // Waktu kadaluarsa dalam milidetik (3 jam)
    },
  })
);

web.use(express.json());
web.use(publicRouter);
web.use(authRouter);
