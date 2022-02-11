import { Box, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import { UserType } from '../../../../../utils/types/UserType'

interface ParticipantsProps {
  users: UserType[]
}

export const Participants:React.FC<ParticipantsProps> = ({
  users
}) => {
  const [sortedUsers, setSortedUsers] = React.useState(users)

  React.useEffect(() => {
    const sorted = [...users].sort(
      (u1, u2) => u1.username.toLowerCase() > u2.username.toLowerCase() ? 1 : -1)
    setSortedUsers(sorted)

  }, [users])

  return (
    <Box sx={{ minHeight: '0',  flexDirection: 'column', width: '350px'}}>
     
      <List dense sx={{flex:'1 1'}}
      >
        {sortedUsers.map((user, index) => (
          <ListItem  
            sx={{display: 'flex'}} 
            key={`user-${user.socketId}-${user.username}`}
          >
            <Typography width={'2em'} color={'primary'}>
              {index+1}.
            </Typography>
            <ListItemText  primary={user.username} />
          </ListItem>
        ))}
      </List>
    </Box>
    
  )
}
