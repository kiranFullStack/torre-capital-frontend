import React from 'react'
import emptyImg from './assets/illustration.png'

export default function EmptyContainer() {
  return (
    <div className='emptyBox'>
      <h5>Start by adding some tasks above</h5>
      <img src={emptyImg} alt='' />
    </div>
  )
}
