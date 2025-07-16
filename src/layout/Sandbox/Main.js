import { useEffect, useState } from 'react'
import { GalleryStyled } from './styles/Main'
import { savedplacesgoogle } from '../../app/files/savedplacesgoogle'
import { loadPlaces } from '../../utilities/location'
import { Gallery } from '../../components'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export const Sandbox = () => {
  const incomeTypes = [
    { id: 'hourly_wage', value: 'Hourly Wage' },
    { id: 'salary', value: 'Salary' },
    { id: 'neither', value: 'Neither' }
  ]
  const tabs = []
  return (
    <div className='ViewPort'>
      <div
        style={{
          // border: '1px solid red',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            background: '#EFBF04',
            width: '100%',
            height: '100px',
            padding: '20px'
          }}
        >
          <FaChevronLeft />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            // border: '1px solid red',
            width: '100%',
            height: '100%',
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              // border: '1px solid red',
              width: '100%',
              // height: '100%',
              // padding: '20px',
              boxSizing: 'border-box'
            }}
          >
            <h1>Want to invest but dont know where to start?</h1>
            <h4>Whats your income?</h4>
            {incomeTypes.map(type => (
              <div>
                <input
                  type='radio'
                  id={type.id}
                  name='drone'
                  value={type.value}
                  checked
                />
                <label for={type.id}>{type.value}</label>
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              boxSizing: 'border-box',
              background: '#EFBF04'
            }}
          >
            Hello
          </div>
        </div>
      </div>
      {/* <Gallery items={places} /> */}
    </div>
  )
}
