import { useEffect, useState } from 'react'
import { GalleryStyled } from './styles/Main'
import { savedplacesgoogle } from 'app/files'
import { loadPlaces } from 'utilities'
import { Gallery } from 'components'
import { Body, Footer, Header, Sidebar } from 'layout'

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
