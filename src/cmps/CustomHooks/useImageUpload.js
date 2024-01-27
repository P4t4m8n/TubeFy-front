import { uploadService } from "../../services/upload.service"
import { useStationEdit } from "./useStationEdit"

export function useImageUpload() {

    const onUploadImg = async (ev) => {
        const file = ev.target.files[0]
        try {
            const imgUrl = await uploadService.uploadImg(file)
            setStationToEdit((prevStation) => {
                const updatedStation = {
                    ...prevStation,
                    imgUrl: imgUrl,
                }
                onSaveStation(updatedStation)
                return updatedStation
            })

        } catch (err) {
            console.log('err:', err)
        }
    }

    return { onUploadImg }
}
