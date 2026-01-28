import { useState } from 'react'
import './App.css'
import { TabProvider, useTheme } from './app/data/context'
import { tabReducer, initialTabState } from './app/data/reducer'

import { Body, Footer, Header, Sandbox, Sidebar, ViewPort } from './layout'

function App () {
  const [themeState, themeDispatch] = useTheme()
  const [showSideBar, setShowSidebar] = useState(false)
  console.log('themeState', themeState)
  return (
    <TabProvider initialState={initialTabState} reducer={tabReducer}>
      {/* <Sandbox /> */}
      {/* <ViewPort /> */}
      <div className='App'>
        {showSideBar && <Sidebar />}
        <Header type={'Simple_Header'} />
        <Body />
        <Footer />
      </div>
    </TabProvider>
  )
}

export default App
