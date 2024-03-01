

import { stationService } from '../../services/station.service'
import { PlaylistEditHeroImgUpload } from './PlaylistEditHeroImgUpload'
import { PlaylistEditHeroModal } from './PlaylistEditHeroModal'

export function PlaylistEditHero({ handleChange, stationToEdit, onSaveStation, onUploadImg }) {

    const { type, name, createdBy, imgUrl, description } = stationToEdit
    const duration = stationService.convertTimeFormat(stationToEdit.duration)
    const amount = stationToEdit.songs.length || 0

    return (
        <header className="station-hero">
            <form className="flex">

                <PlaylistEditHeroImgUpload
                    imgUrl={imgUrl}
                    onUploadImg={onUploadImg} />

                <div className="hero-right-section flex">
                    <p>{type}</p>

                    <PlaylistEditHeroModal
                        name={name}
                        onSaveStation={onSaveStation}
                        handleChange={handleChange}
                        description={description} />
                        
                    <div className='hero-details'>
                        <p className='user-dot'>{createdBy.username || 'TubeFy'}</p>
                        <p>{amount} songs,</p>
                        <p>about {duration}</p>
                    </div>
                </div>
            </form>
        </header>
    )
}