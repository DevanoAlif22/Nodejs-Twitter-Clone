import { validate } from "../validation/validation.js";
import {
  idValidation,
  postingNoImageValidation,
  postingValidation,
} from "../validation/user-validation.js";
import postService from "../service/post-service.js";
import { logger } from "../application/logging.js";

const postPosting = async (req, res, next) => {
  try {
    if (req.multer !== "error") {
      if (!req.file) {
        const validasi = await validate(postingNoImageValidation, req.body.isi);
        await postService.postPostingNoImage(validasi, req.session.username);
      } else {
        const namaGambar = req.file.filename;
        const size = req.file.size;
        const isi = req.body.isi;
        const data = { isi: isi, name: namaGambar, size: size };
        const validasi = await validate(postingValidation, data);
        const dataValidasi = { isi: validasi.isi, gambar: validasi.name };
        await postService.postPosting(dataValidasi, req.session.username);
      }
    }
    res.redirect("/profil");
  } catch (error) {
    res.redirect("/profil");
  }
};

const removePosting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const validasi = await validate(idValidation, id);
    const result = await postService.removePosting(
      validasi,
      req.session.username
    );
    if (result !== "200") {
    } else {
      res.redirect("/profil");
    }
  } catch (error) {}
};

const getPostingan = async (req, res, next) => {
  try {
    const postingan = req.params.postingan;
    const result = await postService.getPostingan(
      postingan,
      req.session.username
    );
    if (result.cekSuka) {
      res.render("postingan", {
        data: result.data,
        dataPostingan: result.postingan,
        hitungSuka: result.hitungSuka,
        cekSuka: result.cekSuka,
      });
    } else {
      res.render("postingan", {
        data: result.data,
        dataPostingan: result.postingan,
        hitungSuka: result.hitungSuka,
      });
    }
  } catch (error) {}
};

const coba = async (req, res, next) => {
  res.render("coba");
};

const getSukaPostingan = async (req, res, next) => {
  try {
    const postingan = req.params.postingan;
    const result = await postService.getSukaPostingan(
      postingan,
      req.session.username
    );
    if (result === "400") {
      res.redirect("/profil");
    }
    res.redirect("/lihat/" + postingan);
  } catch (error) {
    res.redirect("/profil");
  }
};
export default {
  postPosting,
  removePosting,
  getPostingan,
  getSukaPostingan,
  coba,
};
