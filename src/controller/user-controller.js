import { validate } from "../validation/validation.js";
import userService from "../service/user-service.js";
import {
  editProfilValidation,
  fotoValidation,
  postDaftarValidation,
  postMasukValidation,
  postingValidation,
} from "../validation/user-validation.js";
import { logger } from "../application/logging.js";
// post
const postDaftar = async (req, res, next) => {
  try {
    const inputDate = new Date();
    const options = { year: "numeric", month: "long", timeZone: "UTC" };
    const formatter = new Intl.DateTimeFormat("id-ID", options);
    const bergabung = formatter.format(inputDate);

    const validasi = await validate(postDaftarValidation, req.body);
    const result = await userService.postDaftar(validasi, bergabung);
    if (result === "400") {
      const errorMessage = { error: "username sudah ada" };
      res.render("login", errorMessage);
    } else {
      req.session.username = validasi.username;
      res.redirect("index");
    }
  } catch (error) {
    const processedString = error.message.replace(/(\..)/g, "\n");
    const errorMessage = { error: processedString };
    res.render("login", errorMessage);
  }
};

const postMasuk = async (req, res, next) => {
  try {
    const validasi = await validate(postMasukValidation, req.body);
    const result = await userService.postMasuk(validasi, req.session.username);
    if (result === "400") {
      const errorMessage = { error: "username or password wrong" };
      res.render("login", errorMessage);
    } else {
      req.session.username = validasi.username;
      logger.info(req.session.username);
      res.redirect("index");
    }
  } catch (error) {
    const processedString = error.message.replace(/(\..)/g, "\n");
    const errorMessage = { error: processedString };
    res.render("login", errorMessage);
  }
};

const logout = async (req, res, next) => {
  req.session.destroy();
  res.redirect("login");
};

const editProfil = async (req, res, next) => {
  try {
    const data = req.body;
    const validasi = await validate(editProfilValidation, data);
    await userService.editProfil(validasi, req.session.username);
    res.redirect("/profil");
  } catch (error) {
    res.redirect("/profil");
  }
};

const editFotoProfil = async (req, res, next) => {
  try {
    if (req.multer === "error") {
      res.redirect("/profil");
    } else {
      const namaFoto = req.file.filename;
      const objValidasi = { name: namaFoto, size: req.file.size };
      const validasi = await validate(fotoValidation, objValidasi);
      await userService.editFotoProfil(validasi, req.session.username);
      res.redirect("/profil");
    }
  } catch (error) {
    res.redirect("/profil");
  }
};

const editFotoLatar = async (req, res, next) => {
  try {
    if (req.multer === "error") {
      res.redirect("profil");
    } else {
      const namaFoto = req.file.filename;
      const objValidasi = { name: namaFoto, size: req.file.size };
      const validasi = await validate(fotoValidation, objValidasi);
      await userService.editFotoLatar(validasi, req.session.username);
      res.redirect("profil");
    }
  } catch (error) {}
};

const getMengikuti = async (req, res, next) => {
  try {
    const username = req.params.username;
    const result = await userService.getMengikuti(
      username,
      req.session.username
    );
    if (result === "400") {
      res.redirect("/profil");
    } else {
      res.redirect("/cari/" + username);
    }
  } catch (error) {
    res.redirect("/profil");
  }
};

const getBerhentiMengikuti = async (req, res, next) => {
  try {
    const username = req.params.username;
    const result = await userService.getBerhentiMengikuti(
      username,
      req.session.username
    );
    logger.info("result");
    logger.info(result);
    if (result === "404") {
      res.redirect("/profil");
    } else {
      res.redirect("/cari/" + username);
    }
  } catch (error) {
    res.redirect("/profil");
  }
};

export default {
  postDaftar,
  postMasuk,
  logout,
  editProfil,
  editFotoProfil,
  editFotoLatar,
  getMengikuti,
  getBerhentiMengikuti,
};
