const express = require("express")
const employee = require("../models/employee")

const router = express.Router();

// here we create our Route
router.post("/employee", async (req, res) => {
    console.log(req.body)
    const data = new employee(req.body)
    const result = await data.save()

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Employee not created."
        })
    }
    else {
        res.json({
            status: "SUCCESS",
            message: "Employee created",
            data: result
        })
    }
})

//get records
router.get("/employee", async (req, res) => {
    try {
        const result = await employee.find()
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Not found"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Success",
                data: result
            })
        }
    }
    catch (e) {
        console.log(e)
    }
})

//get single record
router.get("/employee/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await employee.findById(_id);
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Could not find this record"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Success",
                data: result
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})
// update records
router.put("/employee/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await employee.findByIdAndUpdate(_id,req.body,{new: true});
        console.log(result)
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Failed to update",
                data: result
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Success",
                data: result
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})
// Delete Records
router.delete("/employee/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await employee.findByIdAndDelete(_id);
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Failed to delete"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Success"
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})


module.exports = router;