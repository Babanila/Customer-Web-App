module.exports = function createController(
  dataStorage,
  handleGetIndex,
  handleGetItem,
  isoDateConverter
) {
  const getCustomers = async (req, res) => {
    try {
      return res.status(200).send(dataStorage)
    } catch (e) {
      return res.status(400).send('HTTP Error')
    }
  }

  const getSingleCustomer = async (req, res) => {
    try {
      const results = handleGetItem(dataStorage, req.params.id)
      return results
        ? res.status(200).send(results)
        : res.status(200).send(`Customer with customerID ${req.params.id} does not exist !!!`)
    } catch (e) {
      return res.status(404).send('HTTP Error')
    }
  }

  const createCustomer = async (req, res) => {
    try {
      const { customerID, name, birthday, gender, lastContact, customerLifetimeValue } = req.body

      if (parseInt(customerID) <= 0 || customerID === '') {
        return res.status(200).send(`Please provide a number greater than 0 for the customerID`)
      }

      const duplicateCustomer = handleGetItem(dataStorage, customerID)
      if (duplicateCustomer) {
        return res.status(200).send(`Customer with ID: ${customerID} already exist !!!`)
      }

      const newCustomer = {
        customerID: parseInt(customerID),
        name: { ...name },
        birthday,
        gender,
        lastContact: isoDateConverter(lastContact),
        customerLifetimeValue
      }

      dataStorage.push({ ...newCustomer })
      return res.status(200).send('Customer data created')
    } catch (e) {
      return res.status(500).send('Internal Server Error')
    }
  }

  const updateCustomer = async (req, res) => {
    try {
      const index = handleGetIndex(dataStorage, req.params.id)
      if (index === -1) {
        return res.status(200).send("Customer doesn't exist ")
      }

      const { customerID, name, lastContact } = req.body
      if (dataStorage[index].customerID !== parseInt(customerID)) {
        return res.status(500).send('CustomerID can not be changed')
      }

      const modifiedData = {
        ...dataStorage[index],
        ...req.body,
        name: {
          first: name.first ? name.first : dataStorage[index].name.first,
          last: name.last ? name.last : dataStorage[index].name.last
        },
        lastContact: lastContact ? isoDateConverter(lastContact) : dataStorage[index].lastContact
      }

      dataStorage[index] = modifiedData
      return res.status(200).send('Customer data updated sucessfully')
    } catch (e) {
      return res.status(500).send('Internal Server Error')
    }
  }

  const deleteCustomer = async (req, res) => {
    try {
      const index = handleGetIndex(dataStorage, req.params.id)
      if (index !== -1) {
        dataStorage.splice(index, 1)
        return res.status(200).send(`Customer with customerID:${req.params.id} sucessfully deleted`)
      } else {
        return res.status(200).send("Customer doesn't exist ")
      }
    } catch (e) {
      return res.status(500).send('Delete Error !!!')
    }
  }

  return { getCustomers, getSingleCustomer, createCustomer, updateCustomer, deleteCustomer }
}
