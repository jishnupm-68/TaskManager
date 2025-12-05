const express = require('express');
const Todo = require('../model/todo');
const filterRouter = express.Router();

filterRouter.post('/search',async(req,res)=>{
    try {
        const {search} = req.body;
        const todo = await Todo.find({
                title: { $regex: search, $options: "i" }   
                });
        return res.status(200).json({
                status:true,
                message:"Search completed",
                data:todo
        })
    } catch (error) {
        console.log("Error in searching  "+ error.message);
        res.status(500).json({
            status:false,
            message:error.message
        })
    }
})

filterRouter.post("/filter",async(req,res)=>{
    try {
        const {filterKey, filterValue} = req.body;
        let filterQuery, sortQuery ;
        if(filterValue==true ) sortQuery = {[filterKey] :1}
        else if(filterValue==false) sortQuery = {[filterKey] :-1}
        else filterQuery = {[filterKey] :filterValue}
        const todo = await Todo.find(filterQuery).sort(sortQuery);
        res.status(200).json({
            status:true,
            message:"Filter completed",
            data:todo
        })
    } catch (error) {
        console.log("Error in filtering  "+ error.message);
        res.status(500).json({
            status:false,
            message:error.message
        })
    }

});

module.exports = filterRouter