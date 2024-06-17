export const authLoginMiddleware = async (req, res, next) => {
  if (!req.session.username) {
    const errorMessage = { error: "Kamu belum login" };
    res.render("login", errorMessage);
  } else {
    next();
  }
};
