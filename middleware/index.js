const verifyPayload = async (req, res, next) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log("Body ====>", req.body);
    if (req.body === {}) {
      res.send({ message: "Body can't be empty" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyPayload };
