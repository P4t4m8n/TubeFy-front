
import { Note, Pencil } from '../../services/icons.service'

export function PlaylistEditHeroImgUpload({ imgUrl, onUploadImg }) {
    return (
        <label htmlFor="file-input">
            <input type="file" id="file-input" name="image" onChange={onUploadImg} hidden />
            <Note></Note>
            <img onLoad={(ev) => ev.target.style.visibility = 'visible'}
                onError={(ev) => ev.target.style.visibility = 'hidden'}
                src={imgUrl}></img>
            <div>
                <Pencil></Pencil>
                <p>Choose Photo</p>
            </div>
        </label>
    )
}