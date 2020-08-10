const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const createController = require('./src/controller')
const { getCustomerIndex, singleCustomer, isoDateConverter } = require('./src/serverUtils')
const defaultData = require('./customer-sample.json')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = 5000
const HOST = '0.0.0.0'
const customerDatabase = [...defaultData]

const {
  getCustomers,
  getSingleCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = createController(customerDatabase, getCustomerIndex, singleCustomer, isoDateConverter)

// Get All Customers
app.get('/', getCustomers)

// Create Customer
app.post('/new_customer', createCustomer)

// Get Customer by ID
app.get('/customer/:id', getSingleCustomer)

// Update Customer Details by ID
app.put('/edit_customer/:id', updateCustomer)

// Delete Customer by ID
app.delete('/delete_customer/:id', deleteCustomer)

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`)
})
