import React, { createContext } from 'react'
import { Event, OpenVidu, Publisher, PublisherSpeakingEvent, Session, Stream, StreamEvent, StreamManager, StreamPropertyChangedEvent, Subscriber } from 'openvidu-browser'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { changeUserRTCProperty, selectMe, setIsSpeak } from '../../../store/usersSlice'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { Exception } from 'sass'
import SessionsService from '../../../utils/api/services/SessionsService'

interface WebRTCValues {
  streamManager?: StreamManager,
  publisher?: Publisher,
  subscribers: Subscriber[],
  session?: Session,
  screenPublisher?: Publisher,
  toggleScreenSharing?: (state: boolean) => void
}

export const WebRTCContext = createContext<WebRTCValues>({
  streamManager: undefined,
  publisher: undefined,
  subscribers: [],
  session: undefined,
  screenPublisher: undefined,
  toggleScreenSharing: undefined
})

export const WebRTCProvider:React.FC = ({ children }) => {

  const dispatch = useAppDispatch()


  const OPENVIDU_SERVER_URL = process.env.REACT_APP_WEBRTC_URL as string || 'https://' + window.location.hostname + ':4443'
  const OPENVIDU_SERVER_SECRET = process.env.REACT_APP_WEBRTC_SECRET as string || 'MY_SECRET'



  const { roomId } = useParams()
  const mySessionId = roomId

  const [session, setSession] = React.useState<Session>() 
  const [mainStreamManager, setMainSteamManager] = React.useState<StreamManager>()
  const [publisher, setPublisher] = React.useState<Publisher>()
  const [subscribers, setSubscribers] = React.useState<Subscriber[]>([])
  const [OV, setOV] = React.useState<OpenVidu>()

  const [screenSharingOV, setScreenSharingOV] = React.useState<OpenVidu>() 
  const [screenPublisher, setScreenPublisher] = React.useState<Publisher>()
  
  const [contextValues, setContextValues] = React.useState<WebRTCValues>()

  React.useEffect(()=>{
    if (mainStreamManager && publisher && subscribers && session) {
      setContextValues({
        streamManager: mainStreamManager, 
        publisher: publisher, 
        subscribers: subscribers, 
        session: session,
        toggleScreenSharing: toggleScreenSharing,
        screenPublisher: screenPublisher
      })
    }
  },[mainStreamManager, publisher, subscribers, screenPublisher])

  //Обработка входа и выхода со страницы
  React.useEffect(()=>{
    leaveSession()
    //Присоединение к сессии(к медиа серверу)
    joinSession()
    //При выходе со страницы - окончание сессии
    return ()=>leaveSession()
  }, [])

  // Добавление слушателей событий
  React.useEffect(()=>{
    if (session && OV) {

      // --- 3) Specify the actions when events take place in the session ---

      // On every new Stream received...
      session.on('streamCreated', (event: any) => {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        const subscriber = session.subscribe(event.stream, '')
        
        // Update the state with the new subscribers
        setSubscribers(prev => [...prev, subscriber])
      })

      // On every Stream destroyed...
      session.on('streamDestroyed', (event:any) => {

        // Remove the stream from 'subscribers' array
        setSubscribers(prev => prev.filter(sub => sub !== event.stream.streamManager))
        // deleteSubscriber(event.stream.streamManager)
      })

      // On every asynchronous exception...
      session.on('exception', (exception) => {
        console.warn(exception)
      })
    
      session.on('publisherStartSpeaking', (event: any) => {
        console.log('User ' + event.connection.connectionId + ' start speaking')
        dispatch(setIsSpeak({RTCId: event.connection.connectionId, isSpeak: true}))
      })
    
      session.on('publisherStopSpeaking', (event: any) => {
        console.log('User ' + event.connection.connectionId + ' stop speaking')
        dispatch(setIsSpeak({RTCId: event.connection.connectionId, isSpeak: false}))
      })

      session.on('streamPropertyChanged', (event: any) => {
        if (event.changedProperty === 'audioActive') {
          dispatch(
            changeUserRTCProperty({
              propertyName: 'isMicroOn', 
              RTCId: event.stream.connection.connectionId,
              isTrue: event.newValue
            })
          )
        }

        if (event.changedProperty === 'videoActive') {
          dispatch(
            changeUserRTCProperty({
              propertyName: 'isCameraOn', 
              RTCId: event.stream.connection.connectionId,
              isTrue: event.newValue
            })
          )
        }
      
      })

      //after set all event listeners connect me to the server
      connectAndPublishMe()
    }
  }, [session])

  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---
    const newOv = new OpenVidu()
    newOv.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 100,   // Frequency of the polling of audio streams in ms (default 100)
        threshold: -60  // Threshold volume in dB (default -50)
      }
    })
    setOV(newOv)
    
    // --- 2) Init a session --
    setSession(newOv.initSession())
  }

  const connectAndPublishMe = async () => {
    try {
      if (!session || !OV) throw new Error('Session or OV not initialized')
      // --- 4) Connect to the session with a valid user token ---
      const token = await getToken() 
      if (typeof token !== 'string') return
      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      await session?.connect(token,'cameraPublisher')
 
      // --- 5) Get your own camera stream ---
      // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
      // element: we will manage it on our own) and with the desired properties
      const publisher = OV?.initPublisher('', {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: undefined, // The source of video. If undefined default webcam
        publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: false, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: false, // Whether to mirror your local video or not
      })

      // --- 6) Publish your stream ---
      session.publish(publisher)

      // Set the main video in the page to display our webcam and store our Publisher
      setMainSteamManager(publisher)
      setPublisher(publisher)

    } catch (error: any) {
      console.log('There was an error connecting to the session:', error.code, error.message)
    }
  }

  const leaveSession = () => {

    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
      OV?.publishers[0]&&session.unpublish(OV?.publishers[0])
      OV?.session.disconnect()
      session.disconnect()
    }
    // Empty all properties...
    setOV(undefined)
    setSession(undefined)
    setSubscribers([])
    setMainSteamManager(undefined)
    setPublisher(undefined)
    setScreenPublisher(undefined)
    setScreenSharingOV(undefined)
    setContextValues(undefined)
  }

  const toggleScreenSharing = async (isStartSharing: boolean) => {
    if (screenSharingOV) {
      screenSharingOV?.session?.unpublish(screenSharingOV.publishers[0])
      setScreenPublisher(undefined)
      setScreenSharingOV(undefined)
      return 
    } 

    //creating new OpenVidu object because opeVidu can't handle with 2 stream simultaneously
    const screenOV = new OpenVidu()
    //also connecting to the session
    screenOV.initSession()

    const screenSession = screenOV.initSession()
    const token = await getToken()
    if (typeof token !== 'string') return
    screenSession.connect(token as string, 'screenPublisher')
    
    const displayMediaOptions = {
      video: true,
      audio: true
    }

    setScreenSharingOV(screenOV)
    const mediaDevices = navigator.mediaDevices as MediaDevices
    const screenStream = await mediaDevices.getDisplayMedia(displayMediaOptions)
    
    const screenVideoTrack = screenStream.getVideoTracks()[0]
    const screenAudioTrack = screenStream.getAudioTracks()[0]

    const screenMuted = !screenAudioTrack || screenAudioTrack?.muted
    
    if (screenOV) {
      const screenPublisher = screenOV.initPublisher('',{
        videoSource: screenVideoTrack,
        audioSource: screenAudioTrack,
        publishAudio: !screenMuted, 
        publishVideo: true,
        resolution: '1280x720',
        frameRate: 30,
        mirror: false,
      })
      
      //publish the screen sharing
      setScreenPublisher(screenPublisher)
      screenSession?.publish(screenPublisher)
    }
  }

  const  getToken = async () => {
    if (!mySessionId) return ()=>console.log('Invalid room id!!!')
    const { data } = await SessionsService.getToken(mySessionId)
    return data
  }

  return (
    <WebRTCContext.Provider value={contextValues as WebRTCValues}>
      {children}
    </WebRTCContext.Provider>
  )
}

