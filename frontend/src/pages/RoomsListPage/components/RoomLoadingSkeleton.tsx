import React from 'react'
import ContentLoader from 'react-content-loader'

export const RoomLoadingSkeleton = () => {
  return (
    <ContentLoader 
      speed={2}
      width={300}
      height={200}
      viewBox="0 0 300 200"
      backgroundColor="#9dabe2"
      foregroundColor="#8997e6"
    >
      <rect x="0" y="0" rx="4" ry="4" width="300" height="200" /> 
      <rect x="134" y="219" rx="0" ry="0" width="17" height="8" />
    </ContentLoader>
  )
}
