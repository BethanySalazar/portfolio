import { useEffect, useState } from 'react'
import { GalleryStyled } from './styles/Main'
import { savedplacesgoogle } from '../../app/files/savedplacesgoogle'
import { loadPlaces } from '../../utilities/location'
import { Gallery } from '../../components'

export const Sandbox = () => {

  return (
    <div className='ViewPort'>
      {/* <Gallery items={places} /> */}
    </div>
  )
}
