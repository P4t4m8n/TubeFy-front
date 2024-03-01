import { useCallback, useState } from "react"
import { apiService } from "../../services/api.service"
import { utilService } from "../../services/util.service"
import { Playlist } from "../Playlist"
import { SearchBox } from "../SearchBox"

export function EditSearch({ user, onChangePlaylist }) {

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
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <SearchBox searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            {
                (searchResults && searchResults.length > 0) &&
                < div >
                    <Playlist onChangePlaylist={onChangePlaylist} user={user} songs={searchResults} isSearch={true} />
                </div>
            }
        </>
    )
}