module.exports = function createController(dataStorage, handleGetIndex, handleGetItem) {
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
      const duplicateCustomer = handleGetItem(dataStorage, req.params.id)
      const { customerID, name, birthday, gender, lastContact, customerLifetimeValue } = req.body
      const newCustomer = {
        customerID,
        name: { ...name },
        birthday,
        gender,
        lastContact,
        customerLifetimeValue
      }

      if (duplicateCustomer) {
        return res.status(200).send(`Customer with ID: ${customerID} already exist !!!`)
      } else {
        dataStorage.push({ ...newCustomer })
        return res.status(200).send('Customer Data created')
      }
    } catch (e) {
      console.log('error', e)
      return res.status(500).send('Server Error')
    }
  }

  const updateCustomer = async (req, res) => {
    try {
      const index = handleGetIndex(dataStorage, req.params.id)
      if (index !== -1) {
        const { name } = req.body
        const modifiedData = {
          ...dataStorage[index],
          ...req.body,
          name: {
            first: name.first ? name.first : dataStorage[index].name.first,
            last: name.last ? name.last : dataStorage[index].name.last
          }
        }
        dataStorage[index] = modifiedData
        return res.status(200).send('Customer Details Updated Sucessfully')
      } else {
        return res.status(200).send("Customer doesn't exist ")
      }
    } catch (e) {
      return res.status(500).send('Error occur !!!')
    }
  }
  const deleteCustomer = async (req, res) => {
    try {
      const index = handleGetIndex(dataStorage, req.params.id)
      if (index !== -1) {
        dataStorage.splice(index, 1)
        return res.status(200).send(`Customer with customerID:${req.params.id} Sucessfully Deleted`)
      } else {
        return res.status(200).send("Customer doesn't exist ")
      }
    } catch (e) {
      return res.status(500).send('Error occur !!!')
    }
  }

  return { getCustomers, getSingleCustomer, createCustomer, updateCustomer, deleteCustomer }
}
