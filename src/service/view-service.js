import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import userService from "./user-service.js";

const getCari = async (user) => {
  return userService.getPengguna(user);
};
const postCari = async (data, user) => {
  const dataBelumDiikuti = await prismaClient.pengguna.findMany({
    where: {
      OR: [
        {
          name: {
            contains: data,
          },
        },
        {
          username: {
            contains: data,
          },
        },
      ],
      NOT: {
        OR: [
          {
            username: user,
          },
          {
            diikuti: {
              some: {
                diikuti: user,
              },
            },
          },
        ],
      },
    },
    select: {
      username: true,
      name: true,
      gambarprofil: true,
      bio: true,
      mengikuti: true,
      diikuti: true,
    },
  });

  if (dataBelumDiikuti.length === 0) {
    return "404";
  }

  const dataDiikuti = await prismaClient.pengguna.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              name: {
                contains: data,
              },
            },
            {
              username: {
                contains: data,
              },
            },
          ],
        },
        {
          diikuti: {
            some: {
              diikuti: user,
            },
          },
        },
      ],
    },
    select: {
      username: true,
      name: true,
      gambarprofil: true,
      bio: true,
      mengikuti: true,
      diikuti: true,
    },
  });

  return { dataBelumDiikuti, dataDiikuti };
};

const getCariPengguna = async (username, usernameLogin) => {
  const pengguna = await prismaClient.pengguna.findFirst({
    where: {
      username: username,
    },
    include: {
      postingan: true,
      mengikuti: true,
      diikuti: true,
    },
  });
  if (!pengguna) {
    return "404";
  }

  const penggunaLogin = await userService.getPengguna(usernameLogin);
  const cari = await prismaClient.mengikuti.findFirst({
    where: {
      pengguna_id: penggunaLogin.id,
      mengikuti: pengguna.username,
    },
  });
  pengguna.mengikuti = pengguna.mengikuti.length;
  pengguna.diikuti = pengguna.diikuti.length;
  if (cari !== null) {
    return { data: pengguna, dataLogin: penggunaLogin, cekMengikuti: "true" };
  } else {
    return { data: pengguna, dataLogin: penggunaLogin, cekMengikuti: null };
  }
};

export default {
  postCari,
  getCariPengguna,
  getCari,
};
