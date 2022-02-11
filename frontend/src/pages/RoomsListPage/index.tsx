import { Button, Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDebouncedEffect } from '../../hooks/useDebounceEffect'
import RoomsService, { Room } from '../../utils/api/services/RoomsService'
import { RoomActions } from './components/RoomActions'
import { RoomItem } from './components/RoomItem'
import { RoomLoadingSkeleton } from './components/RoomLoadingSkeleton'



// const mockRooms = [
//   {name: 'Введение в программирование', subject: 'Програмирование', adminName: 'Евдокимов Д.Д.', userCount: 2,  roomId: '1'},
//   {name: 'Введение в программирование', subject: 'Програмирование', adminName: 'Евдокимов Д.Д.', userCount: 2,  roomId: '1'},
//   {name: 'Введение в программирование', subject: 'Програмирование', adminName: 'Евдокимов Д.Д.', userCount: 2,  roomId: '1'},
//   {name: 'Введение в программирование', subject: 'Програмирование', adminName: 'Евдокимов Д.Д.', userCount: 2,  roomId: '1'},
//   {name: 'Введение в программирование', subject: 'Програмирование', adminName: 'Евдокимов Д.Д.', userCount: 2,  roomId: '1'},
//   {name: 'Введение в программирование', subject: 'Програмирование', adminName: 'Евдокимов Д.Д.', userCount: 2,  roomId: '1'},
//   {name: 'Введение в программирование', subject: 'Програмирование', adminName: 'Евдокимов Д.Д.', userCount: 2,  roomId: '1'},
//   {name: 'Введение в программирование', subject: 'Програмирование', adminName: 'Евдокимов Д.Д.', userCount: 2,  roomId: '1'},
//   {name: 'Введение в программирование', subject: 'Програмирование', adminName: 'Евдокимов Д.Д.', userCount: 2,  roomId: '1'},
// ]

export const RoomsListPage = () => {
  const limit = 15

  const [page, setPage] = React.useState<number>(0)
  const [rooms, setRooms] = React.useState<Room[]>([])
  const [searchWord, setSearchWord] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [hasMore, setHasMore] = React.useState<boolean>(true)
  const loader = React.useRef(null)

  React.useEffect(() => {
    if (!hasMore || isLoading) return 
    getRoomsPage()
  }, [page])


  useDebouncedEffect(() => {
    replaceRooms()
  }, [searchWord], 500)

  const replaceRooms = async () => {
    setPage(0)
    const rooms = await getRoomsData(true)
    setRooms(rooms)
  }

  const getRoomsPage = async () => {
    const rooms = await getRoomsData()
    setRooms(prev => [...prev, ...rooms])
  }

  const getRoomsData = async (isReplace = false) => {
    setIsLoading(true)
    const { data } = await RoomsService.getRooms(limit, isReplace? 0 : page, searchWord)
    if (data.length === 0) {
      setHasMore(false)
    }  else {
      setHasMore(true)
    }
    setIsLoading(false)
    return data
  }

  const handleObserver = React.useCallback((entries) => {
   
    const target = entries[0]
    if (target.isIntersecting) {
      setPage((prev) => prev + 1)
    }
  }, [])

  React.useEffect(() => {
    const option = {
      root: null,
      rootMargin: '10px',
      threshold: 0
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) observer.observe(loader.current)
  }, [handleObserver])

  return (
    <Container maxWidth='xl' >
      <Box 
        display='flex' 
        flex='1 1' 
        height='100%'
      >
        <Box 
          display={'flex'}
          flexDirection='column'
          flex='1 1'
        >

    
          <Grid container spacing={3}>
            { isLoading && !rooms.length && 
              Array(9).fill(0).map((v, index) => 
                <Grid item key={index}> 
                  <Button >
                    <RoomLoadingSkeleton />
                  </Button>
                </Grid>
              )
            }
            {rooms.map((room, index) => 
              <Grid item key={room._id}> 
                <RoomItem roomId={room._id} {...room}/>
              </Grid>
            )}
          </Grid>
          <Typography marginTop={2} color='primary' textAlign={'center'} variant='h5' ref={loader}> {!hasMore && 'Больше комнат не найдено!'} </Typography>
        </Box>
        <RoomActions searchWord={searchWord} setSearchWord={setSearchWord} />
      </Box>
    </Container>
  )
}
