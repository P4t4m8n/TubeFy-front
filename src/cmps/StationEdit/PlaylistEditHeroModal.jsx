import { useState } from 'react'

import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import Stack from '@mui/joy/Stack'

export function PlaylistEditHeroModal({ name, onSaveStation, handleChange,description }) {
    
    const [open, setOpen] = useState(false)

    const submit = (ev) => {
        ev.preventDefault()
        onSaveStation()
        setOpen(false)
    }

    return (
        <div className='hero-moudle'>
            <>
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
                            onSubmit={submit}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input autoFocus required
                                        name='name' value={name} onChange={(ev) => handleChange(ev)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Input name='description'
                                        value={description} onChange={(ev) => handleChange(ev)} />
                                </FormControl>
                                <Button type="submit">Save</Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
            </>
        </div>
    )
}