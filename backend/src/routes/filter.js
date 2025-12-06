const express = require('express');
const isLoggedIn = require('../../middleware/auth');
const User = require('../model/user');
const filterRouter = express.Router();

filterRouter.post("/search", isLoggedIn, async (req, res) => {
  try {
    const { search } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId)
      .populate({
        path: "todos",
        match: {
          title: { $regex: search, $options: "i" },
        },
      })
      .select("-password")
      .exec();
    return res.status(200).json({
      status: true,
      message: "Search completed",
      data: user.todos,
    });
  } catch (error) {
    console.log("Error in searching  " + error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

filterRouter.post("/filter", isLoggedIn, async (req, res) => {
  try {
    const { filterKey, filterValue } = req.body;
    const userId = req.user._id;
    let filterQuery = {};
    let sortQuery = {};
    if (
      filterKey != "dueDate" &&
      filterValue !== undefined &&
      filterValue !== ""
    ) {
      filterQuery = { [filterKey]: filterValue };
    }
    if (filterKey && (filterValue === true || filterValue === false)) {
      sortQuery = { [filterKey]: filterValue ? 1 : -1 };
    }
    const user = await User.findById(userId)
      .populate({
        path: "todos",
        match: filterQuery,
        options: { sort: sortQuery },
      })
      .select("-password")
      .exec();
    res.status(200).json({
      status: true,
      message: "Filter completed",
      data: user.todos,
    });
  } catch (error) {
    console.log("Error in filtering  " + error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

module.exports = filterRouter