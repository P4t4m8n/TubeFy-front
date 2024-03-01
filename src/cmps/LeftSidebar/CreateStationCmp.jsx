import { Link } from "react-router-dom";
import { Libary, Plus } from "../../services/icons.service"

export function CreateStation({createStation }) {
    return (
        <section className="creation-and-toggle flex">
            <p className="your-library flex" >
                <Libary></Libary>
                <span>Library</span>
            </p>
            <button className="mobile your-library flex" >
                <Link to={"/mobile/libary"}>
                    <Libary></Libary>
                    <span>Library</span>
                </Link>
            </button>
            <div className="right-buttons flex animate__animated animate__rubberBand">
                <button onClick={createStation} className="plus-icon-left animate__animated animate__rubberBand">
                    <Plus></Plus>
                </button>
            </div>
        </section>
    )
}