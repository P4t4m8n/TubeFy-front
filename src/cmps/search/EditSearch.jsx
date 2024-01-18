import { useCallback, useState } from "react"
import { apiService } from "../../services/api.service"
import { utilService } from "../../services/util.service"
import { Search } from "@mui/icons-material"
import { Playlist } from "../main/Playlist"


export function EditSearch({ user, onSaveSong, }) {

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState(null)

    function handleSearchChange(ev) {
        ev.preventDefault()
        const value = ev.target.value
        setSearchTerm(value)
        debouncedSearch(value)
    }

    const debouncedSearch = useCallback(utilService.debounce((value) => {
        fetchSearchResults(value)
    }), [])

    async function fetchSearchResults(value) {
        try {

            const searchResults = await apiService.getContent(value)
            setSearchResults(searchResults)
        }
        catch (err) { console.log(err) }
    }

    async function addSong(ev, song) {
        ev.preventDefault()
        setSearchResults(prevResults => {
            const newResults = prevResults.filter(res => res._id !== song._id)
            onSaveSong(song)
            return newResults
        })


    }


    return (
        <>
            <section className="search-box">
                <form  >
                    <Search></Search>
                    <input
                        value={searchTerm}
                        onChange={handleSearchChange}
                        type="search"
                        id="searchTerm"
                        name="searchTerm"
                        placeholder="Looking for songs?" />

                </form>
            </section>
            {
                (searchResults && searchResults.length > 0) &&
                < div >
                    <Playlist onChangePlaylist={addSong} user={user} songs={searchResults} isSearch={true} />
                </div>
            }
        </>
    )
}