import { SET_PLAYER, SET_VOLUME } from "../redcuers/player.redcuer";
import { store } from "../store";


export function setPlayer(player) {
    store.dispatch({ type: SET_PLAYER, player })
}


export function setVolume(lvl) {
    store.dispatch({ type: SET_VOLUME, volume: lvl })
}