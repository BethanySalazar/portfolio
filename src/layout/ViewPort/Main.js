import { useTab } from '../../app/data/context/TabContext'
import { Button } from '../../components'
import { MainContainer } from './styles/Main'

export const ViewPort = props => {
  const [tabState] = useTab()
  return (
    <div className='ViewPort' >
      <div
        style={{
          display: 'flex',
          flexGrow: '1',
          // border: '1px solid red'
        }}
      >
        {/* <button>BUtton</button> */}
      </div>
      <div
        style={{
          display: 'flex',
          flexGrow: '2',
          // border: '1px solid red'
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          flexGrow: '1',
          // border: '1px solid red'
        }}
      >
        <div
          style={{
            // flexGrow: '1',
            border: '1px solid red',
            width: '100px',
            height: '100px',
            position: 'fixed',
            bottom: '20px',
            right: '20px'
          }}
        >
          <Button type={'HTML_Button'} text={'Button'} />
        </div>
      </div>
    </div>
  )
}
