import { Search } from "@mui/icons-material";


export function SearchBox({ searchTerm, handleSearchChange }) {
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