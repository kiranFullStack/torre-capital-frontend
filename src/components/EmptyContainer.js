import React from 'react'
import Lottie from 'react-lottie'
import Blogging from '../components/assets/Blogging'

export default function EmptyContainer() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Blogging,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div className='emptyBox'>
      <h5>Start by adding some tasks above</h5>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  )
}
