import { useCallback, useState } from "react"
import { utilService } from "../../services/util.service"
import { Search } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

export function SearchCmp() {

  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  const debouncedNavigate = useCallback(utilService.debounce((value) => {
    navigate('/search/' + value)
  }),[])
  
  function handleSearchChange(ev) {
    ev.preventDefault()
    const value = ev.target.value
    setSearchTerm(value)
    debouncedNavigate(ev.target.value)
  }

  return (
    <section className="search-box">
      <form  >
        <p></p>
        <Search></Search>
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          type="text"
          id="searchTerm"
          name="searchTerm"
          placeholder="What do you want to listen to?" />
     
      </form>
    </section>
  )

}