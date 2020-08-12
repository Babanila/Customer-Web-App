import axios from 'axios'
const { utcDateConverter, fetcher, dataPoster } = require('../src/components/Utils')

describe('Check all the Utils functions', () => {
  jest.mock('axios')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Check utcDateConverter function', () => {
    it('should return the UTC format of the input date', () => {
      const sampleDate = '2017-07-08T13:18:56.000Z'
      const utcDateFormat = utcDateConverter(sampleDate)

      expect(utcDateConverter).toBeInstanceOf(Function)
      expect(utcDateFormat).toBeDefined()
      expect(utcDateFormat).toBe('Sat, 08 Jul 2017 13:18:56 GMT')
    })
  })

  describe('Check fetcher function', () => {
    let url, methodType, handleSetData, handleSetError, handleSetLoading, returnData

    beforeEach(() => {
      url = 'http://localhost:5000'
      methodType = 'get'
      handleSetData = jest.fn((data) => data)
      handleSetError = jest.fn((msg) => msg)
      handleSetLoading = jest.fn(() => false)
      returnData = [
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
        },
        {
          customerID: 2,
          name: {
            first: 'Anna',
            last: 'Hopp'
          },
          birthday: '1987-05-03',
          gender: 'w',
          lastContact: '2017-07-08T13:18:56.888Z',
          customerLifetimeValue: 50.99
        }
      ]
    })

    it('should get data successfully from the API', async () => {
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          data: [...returnData]
        })
      )

      const results = await fetcher(url, handleSetData, handleSetError, handleSetLoading)
      expect(axios).toHaveBeenCalled()
      expect(axios).toBeCalledWith(url)
      expect(axios).toHaveBeenCalledTimes(1)
      expect(results.handleSetData).toEqual([...returnData])
      expect(results.handleSetLoading).toEqual(false)
      expect(results.handleSetError).toEqual(undefined)
    })

    it('should show error if url is wrong', async () => {
      axios.mockImplementationOnce(() =>
        Promise.reject({
          message: 'Network Error'
        })
      )
      const url2 = 'http://localhost:500'
      const results = await fetcher(url2, handleSetData, handleSetError, handleSetLoading)
      expect(axios).toHaveBeenCalled()
      expect(axios).toBeCalledWith(url2)
      expect(axios).toHaveBeenCalledTimes(1)
      expect(results.handleSetError).toEqual('Network Error')
      expect(results.handleSetLoading).toEqual(false)
      expect(results.handleSetData).toEqual(undefined)
    })
  })

  describe('Check dataPoster function', () => {
    let postData, postData2
    let baseUrl, postUrl, putUrl, deleteUrl
    beforeEach(() => {
      baseUrl = 'http://localhost:5000'
      postUrl = `${baseUrl}/new_customer`
      putUrl = `${baseUrl}/edit_customer`
      deleteUrl = `${baseUrl}/edit_customer`

      postData = {
        customerID: 7,
        name: {
          first: 'Sarah',
          last: 'Conol'
        },
        birthday: '1986-03-21',
        gender: 'w',
        lastContact: '2017-06-01T23:28:56.782Z',
        customerLifetimeValue: 2191
      }

      postData2 = {
        customerID: 2,
        name: {
          first: 'Sarah',
          last: 'Conol'
        },
        birthday: '1986-03-21',
        gender: 'w',
        lastContact: '2017-06-01T23:28:56.782Z',
        customerLifetimeValue: 2191
      }
    })
    it('should post customer data successfully to the API', async () => {
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          data: 'Customer data created.'
        })
      )

      const { data } = await dataPoster(postUrl, 'post', postData)
      expect(axios).toBeCalledWith({ url: postUrl, method: 'post', data: postData })
      expect(data).toEqual('Customer data created.')
    })

    it('should not create customer if customerId already exist', async () => {
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          data: 'Customer with ID: 2 already exist !!!'
        })
      )

      const { data } = await dataPoster(postUrl, 'post', postData2)
      expect(axios).toBeCalledWith({ url: postUrl, method: 'post', data: postData2 })
      expect(data).toEqual('Customer with ID: 2 already exist !!!')
    })

    it('should update customer data if customerId exist', async () => {
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          data: 'Customer data updated sucessfully.'
        })
      )

      const url = `${putUrl}/2`
      const { data } = await dataPoster(url, 'put', postData2)
      expect(axios).toBeCalledWith({ url: url, method: 'put', data: postData2 })
      expect(data).toEqual('Customer data updated sucessfully.')
    })

    it('dataPoster should delete customer data if customerId exist', async () => {
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          data: 'Customer with customerID: 2 sucessfully deleted'
        })
      )

      const url = `${deleteUrl}/2`
      const { data } = await dataPoster(url, 'delete', '')
      expect(axios).toBeCalledWith({ url: url, method: 'delete', data: '' })
      expect(data).toEqual('Customer with customerID: 2 sucessfully deleted')
    })
  })
})
