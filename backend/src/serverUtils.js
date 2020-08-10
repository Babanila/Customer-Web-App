function getCustomerIndex(customerArray, id) {
  return customerArray.findIndex((customer) => customer.customerID === parseInt(id))
}
exports.getCustomerIndex = getCustomerIndex

function singleCustomer(customerArray, id) {
  return customerArray.find((customer) => customer.customerID === parseInt(id))
}
exports.singleCustomer = singleCustomer
