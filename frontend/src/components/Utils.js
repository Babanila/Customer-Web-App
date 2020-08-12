import axios from 'axios'

export const initialState = {
  customerID: '',
  name: {
    first: '',
    last: ''
  },
  birthday: '',
  gender: '',
  lastContact: '',
  customerLifetimeValue: 0
}

export const baseUrl = 'http://localhost:5000'

export const utcDateConverter = (dateValue) => {
  const newDate = new Date(dateValue)
  return newDate.toUTCString()
}

export const fetcher = async (url, handleSetData, handleSetError, handleSetLoading) => {
  try {
    const { data } = await axios(url)
    handleSetData(data)
    handleSetLoading(false)
  } catch (err) {
    handleSetError(err.message)
    handleSetLoading(false)
  }
}

export const dataPoster = async (url, methodType, postData) => {
  try {
    const option = {
      url,
      method: methodType,
      data: postData
    }

    const returnData = await axios(option)
    return returnData
  } catch (err) {
    return err
  }
}
