const express = require("express");
const router = express.Router();
const db = require("../DB/Connection");
const Msg = db.get("msg");
const MsgSchema = require("../DB/MsgSchema");

// Route 1: Create a message
router.post("/createMsg", async (req, res, next) => {
  try {
    // validate the body
    const value = await MsgSchema.validateAsync(req.body);
    if (value) {
      // insert to DB
      const created = await Msg.insert(value);
      return res.status(200).json({
        message: created,
      });
    }
  } catch (error) {
    next(error);
  }
});

// 638dba0b1056b510798eece1
// Route 2: Read a message
router.get("/readMsg/:id", async (req, res, next) => {
  try {
    // find the user
    const { id } = req.params;
    const value = await Msg.findOne({
      _id: id,
    });
    // const value = await Msg.find();
    res.json(value);
  } catch (error) {
    next(error);
  }
});

// Route 3: Read all message
router.get("/readAll", async (req, res, next) => {
  try {
    // find the user
    const value = await Msg.find();
    res.json(value);
  } catch (error) {
    next(error);
  }
});

// Route 4: Update a message
router.put("/updateMsg/:id", async (req, res, next) => {
  try {
    // validate the body
    const value = await MsgSchema.validateAsync(req.body);
    if (value) {
      const { id } = req.params;
      const result = await Msg.findOne({
        _id: id,
      });
      if (!result) {
        return res.status(404).json({
          message: "Not Found ❎",
        });
      }
      const updatedMsg = await Msg.update(
        {
          _id: id,
        },
        {
          $set: value,
        }
      );
    }
    res.json(value);
  } catch (error) {
    next(error);
  }
});

// Route 5 : Delete a Msg
router.delete("/deleteMsg/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Msg.remove({
      _id: id,
    });
    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
