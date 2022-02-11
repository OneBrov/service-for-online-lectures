import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface ModalRoomLinkProps {
    roomId: string
    isOpen: boolean
}

export const ModalRoomLink: React.FC<ModalRoomLinkProps> = ({
  roomId, isOpen
}) => {
  const [copyButtonText, setCopyButtonText] = React.useState<string>('Скопировать ссылку')

  const newRoomLink = `${window.location.href}/${roomId}`

  const addLinkToClipboard = () => {
    navigator.clipboard.writeText(newRoomLink)
    setCopyButtonText('Ссылка скопирована!')
  }

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        Ссылка на созданную комнату
      </DialogTitle>
      <DialogContent>
        <Link style={{ textDecoration: 'none' }} to={roomId}>
          <Button sx={{textTransform: 'none'}}>
            <Typography>
              {newRoomLink}
            </Typography>
          </Button>
        </Link>
      </DialogContent>
      <DialogActions>
        <Tooltip title={copyButtonText}>
          <Button onClick={addLinkToClipboard}>
            Копировать ссылку
          </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  )
}
