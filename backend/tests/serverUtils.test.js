const { getCustomerIndex, singleCustomer, isoDateConverter } = require('../src/serverUtils')
const tempDatabase = require('../customer-sample.json')

describe('Check all the Utils functions', () => {
  it('getCustomerIndex should return the index of a customer in the database', () => {
    const id = 2
    const actualIndex = getCustomerIndex(tempDatabase, id)

    expect(getCustomerIndex).toBeInstanceOf(Function)
    expect(actualIndex).toBeDefined()
    expect(actualIndex).toBe(1)
  })

  it('singleCustomer should return a single customer', () => {
    const id = 3
    const actual = singleCustomer(tempDatabase, id)

    expect(singleCustomer).toBeInstanceOf(Function)
    expect(actual).toBeDefined()
    expect(actual).toBe(tempDatabase[2])
    expect(actual).toEqual(
      expect.objectContaining({
        name: {
          first: 'Christian',
          last: 'Cox'
        },
        birthday: '1991-02-21',
        gender: 'm'
      })
    )
  })

  it('isoDateConverter should return the ISO format of the input date', () => {
    const sampleDate = 'Sat, 08 Jul 2017 13:18:56 GMT'
    const isoDateFormat = isoDateConverter(sampleDate)

    expect(isoDateConverter).toBeInstanceOf(Function)
    expect(isoDateFormat).toBeDefined()
    expect(isoDateFormat).toBe('2017-07-08T13:18:56.000Z')
  })
})
