import React, { useContext, useState } from 'react'

const DataContext = React.createContext()

const UpdateDataContext = React.createContext()

export function useData() {
  return useContext(DataContext)
}

export function useUpdateData() {
  return useContext(UpdateDataContext)
}

export function DataProvider({ children }) {
  const [data, setData] = useState([])
  // const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  async function getData(url, callback) {
    const response = await fetch(url)

    if (response.status !== 200) {
      throw new Error('Failed to fetch the data..')
    }

    const data = await response.json()

    setData(data.results)

    callback()

    return data
  }

  async function getDetails(url, callback) {
    const response = await fetch(url)

    if (response.status !== 200) {
      throw new Error('Failed to fetch the data..')
    }

    const data = await response.json()

    return data
  }

  function toggleLoading(bool) {
    setLoading(bool)
  }

  const value = {
    getData,
    getDetails,
    toggleLoading,
  }

  const dataState = {
    data,
    loading,
  }

  return (
    <DataContext.Provider value={dataState}>
      <UpdateDataContext.Provider value={value}>
        {children}
      </UpdateDataContext.Provider>
    </DataContext.Provider>
  )
}
