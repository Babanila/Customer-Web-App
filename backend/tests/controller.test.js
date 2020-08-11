const createController = require('../src/controller')
const mockedDatabase = require('../customer-sample.json')

describe('Check createController', () => {
  let dataStorage, handleGetIndex, handleGetItem, isoDateConverter
  beforeEach(() => {
    dataStorage = [...mockedDatabase]
    handleGetIndex = jest.fn()
    handleGetItem = jest.fn()
    isoDateConverter = jest.fn()
  })

  describe('Check getCustomers', () => {
    const { getCustomers } = createController(
      dataStorage,
      handleGetIndex,
      handleGetItem,
      isoDateConverter
    )
    it('should return all the customers', async () => {
      const res = {
        end: function () {},
        status: function () {
          this.statusCode = 200
          return this
        },
        send: () => dataStorage
      }
      const req = {}
      const results = await getCustomers(req, res)
      expect(getCustomers).toBeDefined()
      expect(getCustomers).toBeInstanceOf(Function)
      expect(results).toBeDefined()
      expect(results).toEqual(dataStorage)
      expect(results).toHaveLength(5)
    })
  })

  describe('Check getSingleCustomer', () => {
    const { getSingleCustomer } = createController(
      dataStorage,
      handleGetIndex,
      handleGetItem,
      isoDateConverter
    )

    it('should return customer with the given customerId', async () => {
      const payload = [
        {
          customerID: 1,
          name: {
            first: 'Peter',
            last: 'Smith'
          },
          birthday: '1996-10-12',
          gender: 'm',
          lastContact: '2017-06-01T23:28:56.782Z',
          customerLifetimeValue: 191.12
        }
      ]

      const res = {
        end: function () {},
        status: function () {
          this.statusCode = 200
          return this
        },
        send: () => payload
      }
      const req = { params: { id: 1 } }
      const results = await getSingleCustomer(req, res)
      expect(getSingleCustomer).toBeDefined()
      expect(getSingleCustomer).toBeInstanceOf(Function)
      expect(results).toBeDefined()
      expect(results).toEqual([dataStorage[0]])
      expect(results).toHaveLength(1)
    })

    it('should return message if the given customerId does not exist', async () => {
      const payload = `Customer with customerID 7 does not exist !!!`
      const res = {
        end: function () {},
        status: function () {
          this.statusCode = 200
          return this
        },
        send: () => payload
      }
      const req = { params: { id: '7' } }
      const results = await getSingleCustomer(req, res)
      expect(results).toBeDefined()
      expect(results).toEqual(payload)
    })

    it('should return error if no customerId is provided', async () => {
      const payload = 'Invalid customerID'
      const res = {
        end: function () {},
        status: function () {
          this.statusCode = 400
          return this
        },
        send: () => payload
      }
      const req = { params: { id: '-1' } }
      const results = await getSingleCustomer(req, res)
      expect(results).toBeDefined()
      expect(results).toEqual('Invalid customerID')
    })
  })

  describe('Check createCustomer', () => {
    const { createCustomer } = createController(
      dataStorage,
      handleGetIndex,
      handleGetItem,
      isoDateConverter
    )

    it('should create new customer', async () => {
      const payload = 'Customer data created.'
      const res = {
        end: function () {},
        status: function () {
          this.statusCode = 200
          return this
        },
        send: () => payload
      }
      const req = {
        body: {
          customerID: 6,
          name: {
            first: 'John',
            last: 'Bull'
          },
          birthday: '1997-05-15',
          gender: 'm',
          lastContact: '2019-08-08T15:12:56.888Z',
          customerLifetimeValue: 1050.26
        }
      }
      const results = await createCustomer(req, res)
      expect(createCustomer).toBeDefined()
      expect(results).toBeDefined()
      expect(results).toEqual('Customer data created.')
    })

    it('should shows that customer exist', async () => {
      const payload = 'Customer with ID: 3 already exist !!!'
      const res = {
        end: function () {},
        status: function () {
          this.statusCode = 404
          return this
        },
        send: () => payload
      }
      const req = {
        body: {
          customerID: 3,
          name: {
            first: 'Gareth',
            last: 'Bale'
          },
          birthday: '1991-02-05',
          gender: 'w',
          lastContact: '2015-10-02T03:08:36.888Z',
          customerLifetimeValue: 100.99
        }
      }
      const results = await createCustomer(req, res)
      expect(results).toBeDefined()
      expect(results).toEqual('Customer with ID: 3 already exist !!!')
    })

    it('should shows that customerID is not valid ', async () => {
      const payload = 'Please provide a number greater than 0 for the customerID.'
      const res = {
        end: function () {},
        status: function () {
          this.statusCode = 400
          return this
        },
        send: () => payload
      }
      const req = {
        body: {
          customerID: '',
          name: {
            first: 'Agnes',
            last: 'Gold'
          },
          birthday: '1891-01-30',
          gender: 'w',
          lastContact: '1915-08-10T16:09:43.000Z',
          customerLifetimeValue: 100.99
        }
      }
      const results = await createCustomer(req, res)
      expect(results).toBeDefined()
      expect(results).toEqual('Please provide a number greater than 0 for the customerID.')
    })
  })

  describe('Check updateCustomer', () => {
    const { updateCustomer } = createController(
      dataStorage,
      handleGetIndex,
      handleGetItem,
      isoDateConverter
    )
    it('should update customer details', async () => {
      const payload = 'Customer data updated sucessfully.'
      const res = {
        end: function () {},
        status: function () {
          this.statusCode = 200
          return this
        },
        send: () => payload
      }
      const req = {
        params: { id: '5' },
        body: {
          customerID: 5,
          name: {
            first: 'Baba',
            last: 'Willy'
          },
          customerLifetimeValue: 3519.91
        }
      }
      const results = await updateCustomer(req, res)
      expect(updateCustomer).toBeDefined()
      expect(results).toBeDefined()
      expect(results).toEqual('Customer data updated sucessfully.')
    })

    it('should not update details of non exist customer', async () => {
      const payload = "Customer doesn't exist."
      const res = {
        end: function () {},
        status: function () {
          this.statusCode = 400
          return this
        },
        send: () => payload
      }
      const req = {
        params: { id: '10' },
        body: {
          customerID: 10,
          name: {
            first: 'Gorge',
            last: 'Bush'
          },
          customerLifetimeValue: 900
        }
      }
      const results = await updateCustomer(req, res)
      expect(updateCustomer).toBeDefined()
      expect(results).toBeDefined()
      expect(results).toEqual("Customer doesn't exist.")
    })

    it('should not update customerID of a customer', async () => {
      const payload = 'CustomerID can not be changed.'
      const res = {
        end: function () {},
        status: function () {
          this.statusCode = 501
          return this
        },
        send: () => payload
      }
      const req = {
        params: { id: '4' },
        body: {
          customerID: 6,
          customerLifetimeValue: 900
        }
      }
      const results = await updateCustomer(req, res)
      expect(updateCustomer).toBeDefined()
      expect(results).toBeDefined()
      expect(results).toEqual('CustomerID can not be changed.')
    })
  })

  describe('Check deleteCustomer', () => {
    const { deleteCustomer } = createController(
      dataStorage,
      handleGetIndex,
      handleGetItem,
      isoDateConverter
    )

    it('should delete customer successfully with the given customerID', async () => {
      const payload = 'Customer with customerID: 3 sucessfully deleted'
      const res = {
        end: function () {},
        status: function () {
          this.statusCode = 200
          return this
        },
        send: () => payload
      }
      const req = {
        params: { id: '2' }
      }
      const results = await deleteCustomer(req, res)
      expect(deleteCustomer).toBeDefined()
      expect(results).toBeDefined()
      expect(results).toEqual(payload)
    })

    it('should not delete customer with wrong customerID', async () => {
      const payload = "Customer with customerID: 10 doesn't exist."
      const res = {
        end: function () {},
        status: function () {
          this.statusCode = 400
          return this
        },
        send: () => payload
      }
      const req = {
        params: { id: '10' }
      }
      const results = await deleteCustomer(req, res)
      expect(results).toBeDefined()
      expect(results).toEqual(payload)
    })
  })
})
