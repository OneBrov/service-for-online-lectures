import { Box } from '@mui/material'
import React from 'react'
import { OutlinedText } from '../../../../../components/OutlinedText'
import { useAppSelector } from '../../../../../hooks/reduxHooks'

export const SpeakersList = () => {
  
  const users = useAppSelector(state => state.users.users)
  
  const [speakerList, setSpeakerList] = React.useState<string[]>([])

  React.useEffect(() => {
    // получить имена всех говорящих в данный момент
    const speakers = users.filter(u => u.isSpeak === true).map(u => u.username)
    setSpeakerList(speakers)
  },[users])


  return (
    <Box sx={{display: 'flex',  marginTop: '20px', height: '20px'}}>
      {speakerList.map(speaker => 
        <OutlinedText key={speaker}>
          {speaker}
        </OutlinedText>
      )}
    </Box>
  )
}
