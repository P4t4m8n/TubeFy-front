import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { apiService } from '../../services/api.service'

export function VideoInfoComponent() {

    const [videoData, setVideoData] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])



    useEffect(() => {

    }, [searchTerm])



    async function loadVideoInfo() {
        try {

            const info = await apiService.getContent('song', searchTerm)
        }
        catch (err) { console.log('err:', err) }
    }

    function handleChange({ target }) {
        setSearchTerm(target.value)
    }

    function handleSearch(ev) {
        loadVideoInfo()

    }

    if (videoData) {

        const { snippet } = videoData
        console.log("videoData:", videoData)
    }

    console.log('render video')

    return (
        <section>
            {videoData &&
                <div className="video-info">
                    <h2>{snippet.title}</h2>
                    <p>{snippet.description}</p>
                    <img
                        src={snippet.thumbnails.medium.url}
                        alt={snippet.title}
                        width={snippet.thumbnails.medium.width}
                        height={snippet.thumbnails.medium.height}
                    />
                </div>
            }

            <div className="video-search">
                <h2>Search for a YouTube Video</h2>
                <input
                    type="text"
                    placeholder="Enter video name..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button onClick={handleSearch}>Search</button>
                <ul>
                    {searchResults.map((result) => (
                        <li key={result.id.videoId}>
                            <p>{result.snippet.title}</p>
                            <button onClick={() => onVideoSelect(result.id.videoId)}>Select</button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

