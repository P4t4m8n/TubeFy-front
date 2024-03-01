
import YouTube from 'react-youtube'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { loadSong } from '../../store/actions/song.action'
import { utilService } from '../../services/util.service'
import { setPlayer } from '../../store/actions/player.action'
import { PlayCard } from '../PlayCard'
import { Next, Prev, Shuffle, Repeat } from '../../services/icons.service'
import { ProgressBar } from './ProgressBar'


export function YouTubeAudioPlayer({ volume }) {

  const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)
  const song = useSelector(storeState => storeState.songMoudle.currSong)
  const station = useSelector(storeState => storeState.stationsMoudle.currStation)
  const player = useSelector(storeState => storeState.playerMoudle.player)

  const stationIdx = useRef(0)
  const isRepeat = useRef(false)
  const isShuffle = useRef(false)

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: (isPlaying) ? 1 : 0,
      controls: 0,
    },
  }

  useEffect(() => {
    if (!song) loadSong(station.songs[0])
  }, [song])

  function onEnd(ev) {
    if (!isRepeat.current && !isShuffle.current) {
      stationIdx.current++
      if (stationIdx.current >= station.songs.length) stationIdx.current = 0
    }

    if (isShuffle.current) {
      stationIdx.current = utilService.getRandomIntInclusive(0, station.songs.length)
    }
    loadSong(station.songs[stationIdx.current])
  }

  function onShuffle(ev) {
    isRepeat.current = false
    isShuffle.current = !isShuffle.current
  }

  function onRepeat(ev) {
    isShuffle.current = false
    isRepeat.current = !isRepeat.current
  }

  function onChangeSong(dir) {

    if (isShuffle.current) {
      stationIdx.current = utilService.getRandomIntInclusive(0, station.songs.length)
    }

    else if (isRepeat.current) { }

    else {
      stationIdx.current += dir
      if (stationIdx.current >= station.songs.length) stationIdx.current = 0
      if (stationIdx.current < 0) stationIdx.current = station.songs.length - 1
    }

    loadSong(station.songs[stationIdx.current])
  }

  function onReady(ev) {
    setPlayer(ev.target)
    ev.target.setVolume(volume)
  }

  if (!song) return

  const {  _id } = song

  return (
    <section className='audio'>
      <div className='audio-control'>
        <button className='shuffle' onClick={onShuffle}><Shuffle></Shuffle></button>
        <button className='dir' onClick={(() => onChangeSong(-1))}><Prev></Prev></button>
        <PlayCard item={song}></PlayCard>
        <button className='dir' onClick={(() => onChangeSong(1))}><Next></Next></button>
        <button className='repeat' onClick={onRepeat}><Repeat></Repeat></button>
      </div>
      <ProgressBar song={song} player={player} />
      <YouTube className='video' videoId={_id} opts={opts} onEnd={onEnd} onReady={onReady} />
    </section >

  )
}

