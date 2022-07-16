import React, { useState, useEffect } from 'react'
import { getPosts } from '../api/axios'

const usePosts = (pageNum = 1) => {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)
  const [hasNextPage, setHasNextPage] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setError(false)
    setError(null)

    const controller = new AbortController()
    const { signal } = controller

    getPosts(pageNum, {
      signal,
    })
      .then((data) => {
        setResults((prev) => [...prev, ...data])
        setIsLoading(false)
        setHasNextPage(Boolean(data.length))
      })
      .catch((err) => {
        setIsLoading(false)
        if (signal.aborted) return
        setIsError(true)
        setError({
          message: err.message,
        })
      })

    return () => {
      controller.abort()
    }
  }, [pageNum])

  return { isLoading, isError, error, hasNextPage, results }
}

export default usePosts
