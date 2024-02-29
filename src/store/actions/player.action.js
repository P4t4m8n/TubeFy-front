import { SET_PLAYER } from "../redcuers/player.redcuer";
import { store } from "../store";

export function setPlayer(player) {
    store.dispatch({ type: SET_PLAYER, player })
}


