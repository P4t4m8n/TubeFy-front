import { useState } from "react"

export function ImageConvertor({ itemToEdit,setItemToEdit }) {
    const [image, setImage] = useState(null)

    function handleImageChange(ev) {
        const file = ev.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const imgElement = document.createElement("img")
                imgElement.src = event.target.result
                imgElement.onload = () => {
                    const canvas = document.createElement("canvas")
                    canvas.width = imgElement.width
                    canvas.height = imgElement.height
                    const ctx = canvas.getContext("2d")
                    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height)
                    canvas.toBlob((blob) => {
                        const file = new File([blob], 'image.png', {
                            type: 'image/png',
                        })
                        setImage(file)
                    }, 'image/png')
                }
            }
            reader.readAsDataURL(file)
        }
    }

    function handleSaveImage () {
        if (image) {
            if (item.type === 'Playlist'){
                setItemToEdit(prev=>({...prev,imgUrl:image}))
            }
        }
    }

    return (
        <div>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {image && (
                <button onClick={handleSaveImage}>Save Image as PNG</button>
            )}
        </div>
    )
}