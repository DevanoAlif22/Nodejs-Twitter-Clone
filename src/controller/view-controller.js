import { logger } from "../application/logging.js";
import { validate } from "../validation/validation.js";
import { postDaftarValidation } from "../validation/user-validation.js";
import userService from "../service/user-service.js";
import viewService from "../service/view-service.js";

const getLogin = async (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {}
};

const getBeranda = async (req, res, next) => {
  try {
    const data = await userService.getPengguna(req.session.username);
    if (data.gambarprofil === null) {
      data.gambarProfilNull = "profil.png";
    }
    res.render("index", { data: data });
  } catch (error) {}
};
const getProfil = async (req, res, next) => {
  try {
    const data = await userService.getPengguna(req.session.username);
    data.mengikuti = data.mengikuti.length;
    data.diikuti = data.diikuti.length;
    if (data.gambarprofil == null) {
      data.gambarProfilNull = "profil.png";
    }
    if (data.gambarlatar == null) {
      data.gambarLatarNull = "latar.png";
    }
    res.render("profil", { data: data });
  } catch (error) {}
};
const getCari = async (req, res, next) => {
  try {
    const data = await viewService.getCari(req.session.username);
    res.render("cari", { dataPengguna: data });
  } catch (error) {}
};
const postCari = async (req, res, next) => {
  try {
    const data = req.body.cari;
    const result = await viewService.postCari(data, req.session.username);
    const pengguna = await viewService.getCari(req.session.username);
    if (result === "404") {
      res.render("cari", { notFound: "tidak ada" });
    } else {
      res.render("cari", {
        dataPengguna: pengguna,
        data: result.dataBelumDiikuti,
        dataDiikuti: result.dataDiikuti,
      });
    }
  } catch (error) {
    res.render("cari", { notFound: "tidak ada" });
  }
};

const getCariPengguna = async (req, res, next) => {
  try {
    const getUsername = req.params.username;
    const result = await viewService.getCariPengguna(
      getUsername,
      req.session.username
    );
    if (result === "404") {
      res.render("cari", {
        notFound: "tidak ada",
        dataPengguna: result.dataLogin,
      });
    } else {
      res.render("cariPengguna", {
        data: result.data,
        dataLogin: result.dataLogin,
        cekMengikuti: result.cekMengikuti,
      });
    }
  } catch (error) {
    res.render("cari", { notFound: "tidak ada" });
  }
};

export default {
  getLogin,
  getBeranda,
  getProfil,
  getCari,
  postCari,
  getCariPengguna,
};
