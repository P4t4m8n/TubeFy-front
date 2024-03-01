import { utilService } from '../services/util.service'
import { apiService } from '../services/api.service'
import { useEffect, useRef, useState } from 'react'
import { PlayCard } from '../cmps/main/PlayCard'
import { LikeCard } from '../cmps/main/LikeCard'
import { useDragAndDrop } from '../cmps/CustomHooks/useDND'
import { DEF_IMG } from '../store/actions/app.actions'
import { Link, useParams } from 'react-router-dom'
import { Loading } from "../cmps/support/Loading"

export function SearchPage() {

    const [searchList, setSearchList] = useState(null)
    const elGenres = useRef(null)

    const genres = [
        'Pop', 'Rap', 'Latino', 'indie', 'Rock', 'Podcusts',
        'Live', 'Sport', 'Meditation', 'Party', 'Electronic',
        'For sleep', 'Metal', 'K-pop', 'Chill', 'Country', 'Soul'
    ]

    const { handleDragStart } = useDragAndDrop()

    const params = useParams()

    useEffect(() => {
        if (params.searchTerm) fetchSearchResults()
    }, [params.searchTerm])

    async function fetchSearchResults() {
        try {
            const searchList = await apiService.getContent(params.searchTerm)
            setSearchList(searchList)
        }
        catch (err) { console.log(err) }
    }

    if ((!searchList && params.searchTerm)) return (<Loading></Loading>)
    if (searchList) {
        const heroList = searchList.slice(0, 2)
        const list = searchList.slice(1)
    }

    return (
        <>
            {!params.searchTerm &&
                <>
                    <h1 className='browse-all'>Browse all</h1>
                    <ul ref={elGenres} className="ganeres-list">
                        {genres.map((ganere, idx) =>
                            <Link key={idx} to={'/search/' + ganere}>
                                <li key={idx} style={{ backgroundColor: utilService.getRandomColor() }} >
                                    <span>{ganere}</span>
                                    <img src='https://res.cloudinary.com/dpnevk8db/image/upload/v1706098525/t2v2nmq5dlzgnybtuqut.jpg'></img>
                                </li>
                            </Link>
                        )}
                    </ul>
                </>
            }
            {searchList &&
                <div className='search-hero grid'>
                    <h2 className="section-title">Top result</h2>
                    <ul className='top-result-section'>
                        {
                            heroList.map(song =>
                                <li key={song._id}>
                                    <div className='image-container'>
                                        <img className='top-result-image' src={song.imgUrl || DEF_IMG}></img>
                                        <PlayCard item={song}></PlayCard>
                                    </div>
                                    <div className='details-container'>
                                        <h3>{song.name}</h3>
                                        <h4>{song.artist}</h4>
                                    </div>
                                </li>

                            )}
                    </ul>

                    <div>
                        <h2 className="section-title">Songs</h2>
                    </div>

                    <div className='results-section'>
                        <ul className='search-result-list clean-list'>
                            {list.map(song =>
                                <li draggable onDragStart={(ev) => handleDragStart(ev, song)} className='single-song-result grid' key={song._id}>
                                    <div className='img-play-title-artist-container grid'>
                                        <div className='song-image-play'>
                                            <img src={song.imgUrl}></img>
                                            <PlayCard item={song}></PlayCard>
                                        </div>

                                        <div className='song-title-artist'>
                                            <p>{song.name}</p>
                                            <p>{song.artist}</p>
                                        </div>
                                    </div>
                                    <LikeCard item={song}></LikeCard>
                                    <p>{song.duration}</p>
                                </li>
                            )}
                        </ul>
                    </div>

                </div>
            }
        </>
    )

}
