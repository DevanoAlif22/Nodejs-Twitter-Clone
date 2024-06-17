import { prismaClient } from "../application/database.js";
import bcrypt from "bcrypt";
import { logger } from "../application/logging.js";
import fs from "fs";
import path from "path";

const postDaftar = async (data, bergabung) => {
  const count = await prismaClient.pengguna.count({
    where: {
      username: data.username,
    },
  });

  if (count > 0) {
    return "400";
  }

  const password = await bcrypt.hash(data.password, 10);
  await prismaClient.pengguna.create({
    data: {
      username: data.username,
      name: data.username,
      password: password,
      lahir: data.lahir,
      bergabung: bergabung,
    },
  });

  // buat folder
  const imgPublicPath = "views/img-public/" + data.username + "/postingan"; // Nama folder img-public
  logger.info("jangan di lewat");
  logger.info(imgPublicPath);
  fs.mkdirSync(imgPublicPath, { recursive: true });

  return "200";
};

const postMasuk = async (data) => {
  const count = await prismaClient.pengguna.count({
    where: {
      username: data.username,
    },
  });
  if (count !== 1) {
    return "400";
  }
  const findPengguna = await prismaClient.pengguna.findFirst({
    where: {
      username: data.username,
    },
  });

  const compare = await bcrypt.compare(data.password, findPengguna.password);
  if (compare == false) {
    return "400";
  } else {
    return "200";
  }
};

const getPengguna = async (data) => {
  return prismaClient.pengguna.findFirst({
    where: {
      username: data,
    },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      situs: true,
      lahir: true,
      bergabung: true,
      gambarlatar: true,
      gambarprofil: true,
      postingan: true,
      mengikuti: true,
      diikuti: true,
    },
  });
};

const editProfil = async (data, user) => {
  return prismaClient.pengguna.update({
    where: {
      username: user,
    },
    data: data,
  });
};

const editFotoProfil = async (data, user) => {
  const findPengguna = await getPengguna(user);
  if (findPengguna.gambarprofil !== null) {
    const namaGambar = findPengguna.gambarprofil;
    const lokasiGambar = path.join("views/img-public/", user, "/", namaGambar);
    logger.info(lokasiGambar);
    fs.unlink(lokasiGambar, (err) => {
      if (err) {
        logger.info("salah");
      }
    });
  }
  await prismaClient.pengguna.update({
    where: {
      username: user,
    },
    data: {
      gambarprofil: data.name,
    },
  });
};

const editFotoLatar = async (data, user) => {
  const findPengguna = await getPengguna(user);
  if (findPengguna.gambarlatar !== null) {
    const namaGambar = findPengguna.gambarlatar;
    const lokasiGambar = path.join("views/img-public/", user, "/", namaGambar);
    logger.info(lokasiGambar);
    fs.unlink(lokasiGambar, (err) => {
      if (err) {
        logger.info("salah");
      }
    });
  }
  await prismaClient.pengguna.update({
    where: {
      username: user,
    },
    data: {
      gambarlatar: data.name,
    },
  });
};

const getMengikuti = async (data, user) => {
  const pengikut = await getPengguna(user);
  const count = await prismaClient.mengikuti.findFirst({
    where: {
      AND: [
        {
          pengguna_id: pengikut.id,
        },
        {
          mengikuti: data,
        },
      ],
    },
  });
  if (count === null) {
    const diikuti = await prismaClient.pengguna.findFirst({
      where: {
        username: data,
      },
      select: {
        id: true,
        username: true,
      },
    });
    logger.info("tessssx");
    await prismaClient.mengikuti.create({
      data: {
        pengguna_id: pengikut.id,
        mengikuti: diikuti.username,
      },
    });
    logger.info("tessssx");
    await prismaClient.diikuti.create({
      data: {
        pengguna_id: diikuti.id,
        diikuti: pengikut.username,
      },
    });
    return "200";
  } else {
    logger.info("tessssxz");
    return "400";
  }
};

const getBerhentiMengikuti = async (user, userLogin) => {
  const count = await prismaClient.pengguna.count({
    where: {
      AND: [
        {
          username: user,
        },
        {
          diikuti: {
            some: {
              diikuti: userLogin,
            },
          },
        },
      ],
    },
  });
  logger.info("count");
  logger.info(count);
  if (count !== 1) {
    return "404";
  }
  const pengikut = await getPengguna(userLogin);
  logger.info("pengikut");
  logger.info(pengikut);
  const diikuti = await prismaClient.pengguna.findFirst({
    where: {
      username: user,
    },
    select: {
      id: true,
      username: true,
    },
  });
  logger.info("diikuti");
  logger.info(diikuti);
  logger.info(pengikut.id);
  logger.info(diikuti.username);

  const dataMengikuti = await prismaClient.mengikuti.findFirst({
    where: {
      pengguna_id: pengikut.id,
      mengikuti: diikuti.username,
    },
  });
  await prismaClient.mengikuti.delete({
    where: {
      id: dataMengikuti.id,
    },
  });

  const dataDiikuti = await prismaClient.diikuti.findFirst({
    where: {
      pengguna_id: diikuti.id,
      diikuti: pengikut.username,
    },
  });
  await prismaClient.diikuti.delete({
    where: {
      id: dataDiikuti.id,
    },
  });
  logger.info("tesssszz2");
  return "200";
};
export default {
  postDaftar,
  postMasuk,
  getPengguna,
  editProfil,
  editFotoProfil,
  editFotoLatar,
  getMengikuti,
  getBerhentiMengikuti,
};
