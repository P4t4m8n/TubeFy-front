import { useDispatch } from 'react-redux'
import { saveSong } from '../store/actions/song.action'

export function useSong() {

  const onSaveSong = async (song, stationToEdit, setStationToEdit) => {
    try {
      const savedSong = await dispatch(saveSong(song))
      setStationToEdit((prevStation) => ({
        ...prevStation,
        songs: [...prevStation.songs, savedSong],
      }))
    } catch (err) {
      console.log(err)
    }
  }

  return { onSaveSong }
}
