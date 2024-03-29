import './App.css'
import { TabProvider } from './app/data/context/TabContext'
import { initialState, tabReducer } from './app/data/reducer/TabReducer'
import { Body, Footer, Header, Sandbox, ViewPort } from './layout'

function App () {
  return (
    <TabProvider initialState={initialState} reducer={tabReducer}>
      {/* <Sandbox /> */}
      <ViewPort />
      <div className='App'>
        {/* <Sidebar /> */}
        <Header type={'Simple_Header'} />
        <div className='Body'>
          <Body />
        </div>
        <div className='Footer'>
          <Footer />
        </div>
      </div>
    </TabProvider>
  )
}

export default App
