import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  console.log(req.body);

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "bad auth, but why?" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "bad auth" });
    }
    // kadangi ikeliant itema userId nera perduodama headeryje, userid reikia paimti is kitos vietos - autentifikacijos, kur turime dekoduota user id
    req.body.userId = decoded.user_id;

    return next();
  });
};
