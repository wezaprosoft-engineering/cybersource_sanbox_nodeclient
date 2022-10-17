const verifyPayload = async (req, res, next) => {
  try {
    console.log("Payload ====>", req.body);
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
