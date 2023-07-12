var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send(res.status(200).json({ message: "success", from: `signUpUser` }));
});

module.exports = router;
