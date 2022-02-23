import { Grid } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../../../hooks/reduxHooks'
import { selectMe } from '../../../../../store/usersSlice'
import { WebRTCContext } from '../../../providers/WebRTCProvider'
import { UserVideo } from './UserVideo'

export const CameraList = () => {
  const rtc = React.useContext(WebRTCContext)
  const me = selectMe()
  const users = useAppSelector(state=>state.users.users)

  const getUser = (rtcId: string) => {
    return users.find(user => user.RTCId === rtcId)
  }

  // отображаем сначала свою вебкамеру, а после всех остальных
  return (
    <Grid
      minHeight={'200px'} 
      container 
      spacing={1} 
      flex='1' 
      marginTop={1}  
    >
      {rtc?.publisher && me && 
          <Grid 
            sm={6} md={6} lg={3} xl={2} 
            item 
          >
            <UserVideo 
              streamManager={rtc.publisher} 
              user={me}
            />
          </Grid>
      }
      {rtc?.subscribers.map((sub, i) =>
        sub.stream.connection.data !== 'screenPublisher' && 
        getUser(sub.stream.connection.connectionId) &&
        <Grid 
          xs={4} sm={4} md={4} lg={3} xl={2}  
          key={`camera-${i}-${sub.id}`} 
          item 
        >
          <UserVideo 
            streamManager={sub} 
            user={getUser(sub.stream.connection.connectionId)}
          />
        </Grid>
      )}
    </Grid>
  )}
