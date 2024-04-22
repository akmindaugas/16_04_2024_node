import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers);
  const decoded = jwt.decode(token);
  console.log(decoded);

  if (!token) {
    return res.status(401).json({ message: "bad auth, no token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "bad auth, wrong token" });
    }

    req.body.userId = decoded.user_id;

    return next();
  });
};
