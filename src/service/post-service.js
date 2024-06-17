import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import fs from "fs";
import path from "path";
import userService from "./user-service.js";

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("id-ID", options).format(date);
};

const postPosting = async (data, user) => {
  const pengguna = await prismaClient.pengguna.findFirst({
    where: {
      username: user,
    },
  });
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  return prismaClient.postingan.create({
    data: {
      deskripsi: data.isi,
      gambar: data.gambar,
      pengguna_id: pengguna.id,
      tanggal: formattedDate,
    },
  });
};
const postPostingNoImage = async (data, user) => {
  const pengguna = await prismaClient.pengguna.findFirst({
    where: {
      username: user,
    },
  });

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  return prismaClient.postingan.create({
    data: {
      deskripsi: data,
      pengguna_id: pengguna.id,
      tanggal: formattedDate,
    },
  });
};

const removePosting = async (id, user) => {
  const postingan = await prismaClient.postingan.findFirst({
    where: {
      id: id,
    },
  });

  if (!postingan) {
    return "404";
  }
  if (postingan.gambar !== null) {
    const namaGambar = postingan.gambar;
    const lokasiGambar = path.join(
      "views/img-public/",
      user,
      "/postingan/",
      namaGambar
    );
    fs.unlink(lokasiGambar, (err) => {
      if (err) {
        logger.info("salah");
      }
    });
  }
  await prismaClient.postingan.delete({
    where: {
      id: id,
    },
  });
  return "200";
};

const getPostingan = async (postingan, user) => {
  const pengguna = await userService.getPengguna(user);
  const dataLogin = await userService.getPengguna(user);
  const dataPostingan = await prismaClient.pengguna.findFirst({
    where: {
      postingan: {
        some: {
          id: parseInt(postingan),
        },
      },
    },
    include: {
      postingan: true,
      suka: true,
    },
  });

  const hitungSuka = await prismaClient.suka.count({
    where: {
      postingan_id: parseInt(postingan),
    },
  });
  const cekSuka = await prismaClient.suka.count({
    where: {
      pengguna_id: pengguna.id,
      postingan_id: parseInt(postingan),
    },
  });
  if (cekSuka === 1) {
    return {
      data: dataLogin,
      postingan: dataPostingan,
      hitungSuka: hitungSuka,
      cekSuka: true,
    };
  } else {
    return {
      data: dataLogin,
      postingan: dataPostingan,
      hitungSuka: hitungSuka,
    };
  }
};

const getSukaPostingan = async (postingan, user) => {
  const pengguna = await userService.getPengguna(user);
  const count = await prismaClient.suka.count({
    where: {
      pengguna_id: pengguna.id,
      postingan_id: parseInt(postingan),
    },
  });

  if (count === 1) {
    return "400";
  }

  await prismaClient.suka.create({
    data: {
      pengguna_id: pengguna.id,
      postingan_id: parseInt(postingan),
    },
  });
};
export default {
  postPosting,
  postPostingNoImage,
  removePosting,
  getPostingan,
  getSukaPostingan,
};
