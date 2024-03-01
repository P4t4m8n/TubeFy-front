import { useState } from "react"
import { SearchSvg, Sort } from "../../services/icons.service"
import { Input } from "@mui/joy"
import { SortByModal } from "./SortModal"

export function UserLibaryFilter({ handleChange, filterSort, setFilterSort }) {

    const [showSearch, setShowSearch] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() { setIsModalOpen(true) }
    function closeModal() { setIsModalOpen(false) }

    const inputStyle = {
        backgroundColor: "gray", opacity: "70%",
        width: '11.75rem', height: "2rem",
        padding: ".5rem"
    }

    return (
        <section className="side-bar-filtersort">
            <div className="search-sort-view">

                <div  className="search-sort-toggle-buttons flex">
                    <button onClick={() => setShowSearch(!showSearch)}>
                        <SearchSvg></SearchSvg>
                    </button>
                    {showSearch &&
                        <Input
                            color="neutral"
                            type="search"
                            placeholder="Search your library"
                            size="sm"
                            variant="soft"
                            onChange={handleChange}
                            sx={inputStyle}
                        />
                    }
                    <button className="sort" onClick={openModal}>
                        <Sort></Sort>
                        {filterSort.sortBy}
                        {isModalOpen && <SortByModal setFilterSort={setFilterSort} isOpen={isModalOpen} onClose={closeModal} filterSort={filterSort}> </SortByModal>}
                    </button>
                </div>

            </div>
        </section >
    )
}