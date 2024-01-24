import { useSelector } from "react-redux";
import { updateUser } from "../../store/actions/user.actions";
import { useEffect, useState } from "react";
import { LikeCard } from "../main/LikeCard";
import { MOBILE } from "../CustomHooks/UseDeviceCheck";
import { PlayCard } from "../main/PlayCard";
import { useBackgroundFromImage } from "../CustomHooks/useBackgroundFromImage";


export function PlayerPlayingCard() {

    const song = useSelector(storeState => storeState.songMoudle.currSong)
    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const device = useSelector(storeState => storeState.appMoudle.device)


    if (device === MOBILE) useBackgroundFromImage(song.imgUrl, true)
    return (
        <div className={"playing-card"}>
            <img src={`${song.imgUrl}`}></img>
            <div className="playing-card-info">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
            <LikeCard item={song}></LikeCard>
            {(device === MOBILE) && <PlayCard item={song}></PlayCard>}
        </div>

    )
}