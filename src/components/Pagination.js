import React from 'react'
import { Link } from "react-router-dom"
import { useUpdateData } from "../context/DataContext"
import { nextUrl } from "../utilities/links"

export default function Pagination({ location, match }) {
  const { getData, toggleLoading } = useUpdateData()

  let paramNumber = +match.params.num
  let prev = paramNumber > 1 ? paramNumber - 1 : paramNumber
  let next = paramNumber + 1

  const nextPage = (num) => {
    getData(nextUrl(num), () => toggleLoading(false))
  }

  return (
    <div className="pagination">
      {paramNumber > 1 ?
        <div className="pagination-btn prev" onClick={() => nextPage(prev)} >
          <Link className="pagination-link" to={`/popular/${prev.toString()}`} >&larr;</Link>
        </div>
        : null
      }

      <div className="pagination-btn btn-number" onClick={() => nextPage(paramNumber + 1)}>
        <Link className="pagination-link" to={`/popular/${(paramNumber + 1)}`}>{(paramNumber + 1)}</Link>
      </div>
      <div className="pagination-btn btn-number" onClick={() => nextPage(paramNumber + 2)}>
        <Link className="pagination-link" to={`/popular/${(paramNumber + 2)}`}>{(paramNumber + 2)}</Link>
      </div>
      <div className="pagination-btn btn-number" onClick={() => nextPage(paramNumber + 3)}>
        <Link className="pagination-link" to={`/popular/${(paramNumber + 3)}`}>{(paramNumber + 3)}</Link>
      </div>
      <div className="pagination-btn next" onClick={() => nextPage(next)}>
        <Link className="pagination-link" to={`/popular/${next.toString()}`} >&rarr;</Link>
      </div>
    </div>
  )
}
