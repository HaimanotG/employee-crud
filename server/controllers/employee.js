const Employee = require('../models/employee')
const error = require('../error')

const getEmployees = async(req, res, next) => {
    Employee.find({})
        .exec()
        .then((employees, error) => {
            if (error) throw error
            res.status(200).json(employees)
        })
        .catch((e) => {
            return next(error(e.message))
        })
}

const getEmployee = async(req, res, next) => {
    Employee.findOne({ _id: req.params.id })
        .exec()
        .then((employee, error) => {
            if (error) throw error
            res.status(200).json(employee)
        })
        .catch((e) => {
            return next(error(e.message))
        })
}

const addEmployee = async(req, res, next) => {
    try {
        const { name, dateOfBirth, gender, salary } = req.body;

        const employee = await new Employee({
            name,
            dateOfBirth,
            gender,
            salary,
        }).save()

        res.status(201).json({ success: true })
    } catch (e) {
        return next(error(e.message))
    }
}

const updateEmployee = async(req, res, next) => {
    try {
        const response = await Employee.updateOne({
            _id: req.params.id,
        }, {
            $set: req.body,
        }, )
        if (response.nModified <= 0) {
            return next(error(400, 'Unable to Update Employee'))
        }
        res.status(201).json({
            success: true,
        })
    } catch (e) {
        return next(error(e.message))
    }
}

const deleteEmployee = async(req, res, next) => {
    try {
        const response = await Employee.deleteOne({
            _id: req.params.id,
        })
        if (response.deletedCount <= 0) {
            return next(error(400, 'Unable to delete Employee'))
        }
        res.status(201).json({
            success: true,
        })
    } catch (e) {
        return next(error(e.message))
    }
}

module.exports = {
    getEmployees,
    getEmployee,
    addEmployee,
    deleteEmployee,
    updateEmployee,
}