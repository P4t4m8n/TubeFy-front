
import { Heart } from '../services/icons.service'
import { FullHeart } from '../services/icons.service'
import { useLike } from "./CustomHooks/useLike"

export function LikeCard({ item }) {

    const { onLike, isLiked } = useLike(item)

    return (
        <button className={"like animate__animated "
            +
            (isLiked ? 'fill empty animate__heartBeat' : 'fill animate__shakeX')}
            onClick={onLike}>
            {isLiked ? <FullHeart /> : <Heart />}
        </button>

    )
}