import { useCallback, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { utilService } from "../../services/util.service"
import { Search } from "@mui/icons-material"


export function SearchCmp() {

  const [searchTerm, setSearchTerm] = useState('')

  const params = useParams()
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
        <p style={{ marginRight: "10px" }}></p>
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