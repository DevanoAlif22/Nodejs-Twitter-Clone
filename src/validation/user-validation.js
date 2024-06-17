import Joi from "joi";

export const postDaftarValidation = Joi.object({
  lahir: Joi.string().max(30).min(5).required(),
  password: Joi.string().max(30).min(5).required(),
  username: Joi.string().max(30).min(5).required(),
});
export const postMasukValidation = Joi.object({
  username: Joi.string().max(30).min(5).required(),
  password: Joi.string().max(30).min(5).required(),
});
export const editProfilValidation = Joi.object({
  name: Joi.string().max(30).min(5),
  bio: Joi.string().max(100).min(5),
  lahir: Joi.string().max(100).min(5),
  situs: Joi.string().max(100).min(5),
});

export const fotoValidation = Joi.object({
  name: Joi.string()
    .regex(/\.(jpg|jpeg|png)$/)
    .required(),
  size: Joi.number().max(2 * 1024 * 1024),
});

export const postingValidation = Joi.object({
  isi: Joi.string().max(250).required(),
  name: Joi.string().regex(/\.(jpg|jpeg|png)$/),
  size: Joi.number().max(2 * 1024 * 1024),
});
export const postingNoImageValidation = Joi.string().max(250).required();
export const idValidation = Joi.number().positive().required();
