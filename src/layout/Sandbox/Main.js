import { ColorPicker, Form, InputField } from '../../components'
import { Body } from '../Body'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { Sidebar } from '../Sidebar'

export const Sandbox = props => {
  return (
    <div className='ViewPort'>
      {/* <InputField value={'here'}/> */}
      {/* <Form /> */}
      {/* <ColorPicker /> */}
      <div style={{ border: '1px solid red', width:'100%', height:'100%'}}>
        <Sidebar />
        <Header type={'Simple_Header'} />
        <Body />
        <Footer />
      </div>
    </div>
  )
}
