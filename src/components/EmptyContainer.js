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

  //
  // ───👉🏼👉🏼👉🏼 SOMETHING TO DISPLAY WHEN TASKS ARE EMPTY ──────────────────────────────────
  //

  return (
    <div className='emptyBox'>
      <h3 style={{ textAlign: 'center' }}>Start by adding some tasks above</h3>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  )
}
