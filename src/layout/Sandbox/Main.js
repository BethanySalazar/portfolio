import { useEffect, useState } from 'react'
import { GalleryStyled } from './styles/Main'
import { savedplacesgoogle } from '../../app/files/savedplacesgoogle'
import { loadPlaces } from '../../utilities/location'
import { Gallery } from '../../components'
import { Body } from '../Body'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { Sidebar } from '../Sidebar'

export const Sandbox = () => {
  return (
    <div className='ViewPort'>
      {/* <Gallery items={places} /> */}
      {/* <InputField value={'here'}/> */}
      {/* <Form /> */}
      {/* <ColorPicker /> */}
      <div style={{ border: '1px solid red', width: '100%', height: '100%' }}>
        <Sidebar />
        <Header type={'Simple_Header'} />
        <Body />
        <Footer />
      </div>
    </div>
  )
}
