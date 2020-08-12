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
      return res.status(400).send('Network Error')
    }
  }

  const getSingleCustomer = async (req, res) => {
    if (parseInt(req.params.id) <= 0 || req.params.id === '') {
      res.status(400).send('Invalid customerID')
    }

    try {
      const results = await handleGetItem(dataStorage, req.params.id)
      return results
        ? res.status(200).send(results)
        : res.status(200).send(`Customer with customerID ${req.params.id} does not exist !!!`)
    } catch (e) {
      return res.status(500).send('HTTP Error')
    }
  }

  const createCustomer = async (req, res) => {
    try {
      const { customerID, name, birthday, gender, lastContact, customerLifetimeValue } = req.body
      if (parseInt(customerID) <= 0 || customerID === '') {
        return res.status(400).send(`Please provide a number greater than 0 for the customerID.`)
      }

      if (!customerID || !name.first || !name.last || !birthday || !gender || !lastContact) {
        return res.status(406).send(`Missing parameters, please all the fields are required`)
      }

      const duplicateCustomer = await handleGetItem(dataStorage, customerID)
      if (duplicateCustomer) {
        return res.status(409).send(`Customer with ID: ${customerID} already exist !!!`)
      }

      const newCustomer = {
        customerID: parseInt(customerID),
        name: { ...name },
        birthday,
        gender,
        lastContact: isoDateConverter(lastContact),
        customerLifetimeValue: !customerLifetimeValue ? 0 : customerLifetimeValue
      }

      dataStorage.push({ ...newCustomer })
      return res.status(200).send('Customer data created.')
    } catch (e) {
      return res.status(500).send('Internal Server Error')
    }
  }

  const updateCustomer = async (req, res) => {
    try {
      const index = await handleGetIndex(dataStorage, req.params.id)
      if (index === -1) {
        return res.status(404).send("Customer doesn't exist.")
      }

      const { customerID, name, lastContact, birthday, gender, customerLifetimeValue } = req.body
      if (dataStorage[index].customerID !== parseInt(customerID)) {
        return res.status(401).send('CustomerID can not be changed.')
      }

      const modifiedData = {
        ...dataStorage[index],
        ...req.body,
        name: {
          first: name.first ? name.first : dataStorage[index].name.first,
          last: name.last ? name.last : dataStorage[index].name.last
        },
        gender: gender ? gender : dataStorage[index].gender,
        birthday: birthday ? birthday : dataStorage[index].birthday,
        lastContact: lastContact ? isoDateConverter(lastContact) : dataStorage[index].lastContact,
        customerLifetimeValue: parseInt(customerLifetimeValue)
          ? parseInt(customerLifetimeValue)
          : dataStorage[index].customerLifetimeValue
      }

      dataStorage[index] = modifiedData
      return res.status(200).send('Customer data updated sucessfully.')
    } catch (e) {
      return res.status(500).send('Internal Server Error')
    }
  }

  const deleteCustomer = async (req, res) => {
    try {
      const index = handleGetIndex(dataStorage, req.params.id)

      if (index === -1) {
        return res.status(400).send(`Customer with customerID: ${req.params.id} doesn't exist.`)
      }

      dataStorage.splice(index, 1)
      return res.status(200).send(`Customer with customerID: ${req.params.id} sucessfully deleted`)
    } catch (e) {
      return res.status(500).send('HTTP Error !!!')
    }
  }

  return { getCustomers, getSingleCustomer, createCustomer, updateCustomer, deleteCustomer }
}
