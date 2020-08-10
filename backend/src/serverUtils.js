function getCustomerIndex(customerArray, id) {
  return customerArray.findIndex((customer) => customer.customerID === parseInt(id))
}
exports.getCustomerIndex = getCustomerIndex

function singleCustomer(customerArray, id) {
  return customerArray.find((customer) => customer.customerID === parseInt(id))
}
exports.singleCustomer = singleCustomer

function isoDateConverter(dateValue) {
  const newDate = new Date(dateValue)
  return newDate.toISOString()
}

exports.isoDateConverter = isoDateConverter
