const router = require('express').Router()
const {
    getEmployees,
    getEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employee')

router.get('/', getEmployees)
router.get('/:id', getEmployee)
router.post('/', addEmployee)
router.delete('/:id', deleteEmployee)
router.put('/:id', updateEmployee)

module.exports = router