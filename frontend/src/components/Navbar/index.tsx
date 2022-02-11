import { Button, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../App'
import { LoginPage } from '../../pages/LoginPage'

interface NavLink {
    picture: string,
    text: string,
    link: string,
    onClick?: ()=>void
}

interface IconButtonProps extends NavLink {
    onClick?: ()=>void
}

const IconButton:React.FC<IconButtonProps> = ({
  picture, text, link, onClick
}) => {
  return ( 
    <Button 
      onClick={onClick}
      key='text' 
      variant='text'
      sx={{textTransform: 'none'}}
   
      color='secondary'
      startIcon={<img src={picture}/>}
    >
      <Typography color={'white'} variant='h6' sx={{textDecoration: 'none'}}>
        {text} 
      </Typography>
    </Button>
  )}

const LeftLinks: NavLink[] = [
  {
    picture: '/svg/home.svg',
    text: 'Classroom',
    link: 'home'
  },
  {
    picture: '/svg/rooms.svg',
    text: 'Комнаты',
    link: 'rooms'
  },
]



export const Navbar = () => {

  const [isLoginOpen, setIsLoginOpen] = React.useState<boolean>(false)
  const authContext = React.useContext(AuthContext)

  const RightButtons: { auth: NavLink, leave: NavLink} = {
    auth: {
      link: '',
      picture: '/svg/profile.svg' ,
      text: 'Авторизация',
      onClick: ()=>setIsLoginOpen(true)
    },
    leave: {
      link: '',
      picture: '/svg/door.svg' ,
      text: 'Выйти',
      onClick: ()=>authContext.setIsAuth(false)
    }
  }

  return (
    <Box sx={{ p: '2', backgroundColor: '#556CD6', minHeight: '70px' }}>
      <Container 
        maxWidth='xl'
        sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          height: '100%'
        }}
      >
        <Box display={'flex'} alignItems={'center'}  >
          {LeftLinks.map(linkItem => 
            <Link style={{ textDecoration: 'none' }} to={linkItem.link} key={linkItem.text}>
              <IconButton {...linkItem}/>
            </Link>
          )}
        </Box>
        <Box display={'flex'} alignItems={'center'}> 
          { authContext.isAuth 
            ? <>
              <Typography >
                {authContext.username}
              </Typography>
              <IconButton {...RightButtons.leave}/>
            </>
            : <IconButton {...RightButtons.auth}/>
          }
          <LoginPage open={isLoginOpen} handleClose={()=>setIsLoginOpen(false)} />
        </Box>
      </Container> 
    </Box>
  )
}
