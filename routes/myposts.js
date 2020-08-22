const router = require("express").Router();
const verify = require("./verifytoken");

router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      label: "Post 1",
      description: "Desc 1",
    },
  });
});

module.exports = router;
