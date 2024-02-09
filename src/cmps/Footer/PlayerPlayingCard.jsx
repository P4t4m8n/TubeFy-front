import { useSelector } from "react-redux";
import { LikeCard } from "../main/LikeCard";

export function PlayerPlayingCard() {

    const song = useSelector(storeState => storeState.songMoudle.currSong)

    return (
        <div className={"playing-card"}>
            <img src={`${song.imgUrl}`}></img>
            <div className="playing-card-info">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
            <LikeCard item={song}></LikeCard>
        </div>

    )
}