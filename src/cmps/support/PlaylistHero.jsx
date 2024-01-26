
import React, { useState } from 'react'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import Stack from '@mui/joy/Stack'
import { Note, Pencil } from '../../services/icons.service'
import { stationService } from '../../services/station.service'

export function PlaylistHero({ handleChange, stationToEdit, onSaveStation, onUplodImg }) {
    const [open, setOpen] = useState(false)

    const { type, name, createdBy, imgUrl,description } = stationToEdit
    const duration = stationService.convertTimeFormat(stationToEdit.duration)
    const amount = stationToEdit.songs.length || 0

    return (
        <header className="station-hero">
            <form className="flex">

                <label htmlFor="file-input">
                    <input type="file" id="file-input" name="image" onChange={onUplodImg} hidden />
                    <Note></Note>
                    <img onLoad={(ev) => ev.target.style.visibility = 'visible'} onError={(ev) => ev.target.style.visibility = 'hidden'} src={imgUrl}></img>
                    <div>
                        <Pencil></Pencil>
                        <p>Choose Photo</p>
                    </div>
                </label>
                <div className="hero-right-section flex">
                    <p>{type}</p>
                    <div className='hero-moudle'>
                        <React.Fragment>
                            <Button
                                variant="outlined"
                                color="neutral"
                                onClick={() => setOpen(true)}
                            >
                                {name}
                            </Button>
                            <Modal open={open} onClose={() => setOpen(false)}>
                                <ModalDialog>
                                    <DialogTitle>{name}</DialogTitle>
                                    <DialogContent>Edit details</DialogContent>
                                    <form
                                        onSubmit={(event) => {
                                            event.preventDefault()
                                            onSaveStation()
                                            setOpen(false)
                                        }}
                                    >
                                        <Stack spacing={2}>
                                            <FormControl>
                                                <FormLabel>Name</FormLabel>
                                                <Input autoFocus required name='name' value={name} onChange={(event) => handleChange(event)} />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Description</FormLabel>
                                                <Input   name='description' value={description} onChange={(event) => handleChange(event)} />
                                            </FormControl>
                                            <Button type="submit">Save</Button>
                                        </Stack>
                                    </form>
                                </ModalDialog>
                            </Modal>
                        </React.Fragment>
                    </div>
                    <div className='hero-details'>
                        <p className='user-dot'>{createdBy.username || 'TubiFy'}</p>
                        <p>{amount} songs,</p>
                        <p>about {duration}</p>
                    </div>
                </div>
            </form>
        </header>
    )
}