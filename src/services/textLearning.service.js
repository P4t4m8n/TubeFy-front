import { httpService } from "./http.service"

export function fetchParsedTitle(title) {
console.log("title:", title)

    return httpService.post('parse-title', {title})

}


