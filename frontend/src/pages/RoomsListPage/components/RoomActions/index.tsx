import { Box, Button, formControlLabelClasses, Grid, TextField, Tooltip, Typography } from '@mui/material'
import React, { ChangeEvent } from 'react'
import { AuthContext } from '../../../../App'
import { ModalRoomCreation } from './ModalRoomCreation'

interface RoomActionsProps {
  searchWord: string,
  setSearchWord: (value: string)=>void
}

export const RoomActions:React.FC<RoomActionsProps> = ({
  searchWord, setSearchWord
}) => {

  const [roomCreationOpen, setRoomCreationOpen] = React.useState<boolean>(false)
  const authContext = React.useContext(AuthContext)

  const openRoomCreation = () => {
    setRoomCreationOpen(true)
  }

  const closeRoomCreation = () => {
    setRoomCreationOpen(false)
  }

  const handleChangeSearchWord = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }

  return (
    <Box
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent:'space-between', 
        p:2, 
        backgroundColor: '#353535', 
        height: '200px',
        minWidth: '300px',
        borderRadius: '2px',
        mt: '6px'
      }}
    >
      <Box sx={{marginBottom: 2}}>
        <Typography textAlign={'center'} variant='h5'> 
          Найти комнату
        </Typography>
        <Tooltip title='Введите имя комнаты, имя организотора или название предмета'> 
          <TextField 
            value={searchWord} 
            onChange={handleChangeSearchWord} 
            variant='filled' 
            fullWidth 
            label='Комната или организатор' 
          />
        </Tooltip>
        
      </Box>
      { authContext.isAuth &&
      <>
        <Button 
          startIcon={<img src='/svg/add.svg'/>} 
          sx={{ textTransform:'none' }}
          onClick={openRoomCreation}
        >
          <Typography color='secondary' noWrap variant='h5'>
            Создать комнату
          </Typography>
        </Button>
      </>
      }
      <ModalRoomCreation 
        isOpen={roomCreationOpen} 
        onClose={closeRoomCreation}
      />
     

    </Box>
  )
}
