import express from "express";
import viewController from "../controller/view-controller.js";
import userController from "../controller/user-controller.js";
import { authLoginMiddleware } from "../middleware/auth-middleware.js";
import multer from "multer";
import path from "path";
import postController from "../controller/post-controller.js";
import { logger } from "../application/logging.js";

// Konfigurasi penyimpanan gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./views/img-public/" + req.session.username + "/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const namaGambar = `${timestamp}${ext}`;
    cb(null, namaGambar);
  },
});

// Konfigurasi penyimpanan gambar
const storagePostingan = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./views/img-public/" + req.session.username + "/postingan/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const namaGambar = `${timestamp}${ext}`;
    cb(null, namaGambar);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const ext = file.originalname
      .toLowerCase()
      .substr(file.originalname.lastIndexOf("."));
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      req.multer = "error";
      cb(null);
    }
  },
});
const uploadPostingan = multer({
  storage: storagePostingan,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const ext = file.originalname
      .toLowerCase()
      .substr(file.originalname.lastIndexOf("."));
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      req.multer = "error";
      cb(null);
    }
  },
});

const publicRouter = new express.Router();
const authRouter = new express.Router();
authRouter.use(authLoginMiddleware);
authRouter.use("/views", express.static("views"));
// get
authRouter.get("/index", viewController.getBeranda);
authRouter.get("/profil", viewController.getProfil);
authRouter.get("/cari", viewController.getCari);
authRouter.get("/keluar", userController.logout);
publicRouter.get("/login", viewController.getLogin);
authRouter.get("/cari/:username", viewController.getCariPengguna);
authRouter.get("/ikuti/:username", userController.getMengikuti);
authRouter.get("/lihat/:postingan", postController.getPostingan);
authRouter.get("/suka/:postingan", postController.getSukaPostingan);
authRouter.get(
  "/berhenti-ikuti/:username",
  userController.getBerhentiMengikuti
);

// delete
publicRouter.get("/coba", postController.coba);
publicRouter.get("/posting/:id", postController.removePosting);
// post
authRouter.post("/cari", viewController.postCari);
publicRouter.post("/daftar", userController.postDaftar);
publicRouter.post("/masuk", userController.postMasuk);
authRouter.post("/editProfil", userController.editProfil);
authRouter.post(
  "/editFotoProfil",
  upload.single("foto"),
  userController.editFotoProfil
);
authRouter.post(
  "/editFotoLatar",
  upload.single("foto"),
  userController.editFotoLatar
);
authRouter.post(
  "/posting",
  uploadPostingan.single("gambar"),
  postController.postPosting
);
export { publicRouter, authRouter, uploadPostingan };
