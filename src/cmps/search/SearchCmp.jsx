import { useCallback, useState } from "react"
import { utilService } from "../../services/util.service"
import { useNavigate } from "react-router-dom"
import { SearchBox } from "../SearchBox"

export function SearchCmp() {

  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  const debouncedNavigate = useCallback(utilService.debounce((value) => {
    navigate('/search/' + value)
  }), [])

  function handleSearchChange(ev) {
    ev.preventDefault()

    const value = ev.target.value
    
    setSearchTerm(value)
    debouncedNavigate(ev.target.value)
  }

  return (
    <SearchBox searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
  )

}