import { useState } from 'react'
import { useTab } from 'app/data/context/TabContext'
import { TabsContainer, Tab, StyledIcon } from './styles'

export const Navigation = props => {
  const TabType = { Simple: Tab, StyledIcons: StyledIcon }[props.type] || Tab

  const [tabState, tabDispatch] = useTab()
  const [previousActiveTab, setPreviousActiveTab] = useState(null)
  const handleTabClick = tab => {
    if (tab.id !== tabState.currentTab.id) {
      setPreviousActiveTab(tabState.currentTab)
      tabDispatch({
        type: 'SET_TAB',
        tab: tab
      })
    }
  }

  return (
    <TabsContainer>
      {tabState.tabs.map(
        tab =>
          props.type === 'StyledIcons' &&
          tab.icon && (
            <TabType //this is whats changing styles
              type={props.type}
              label={tab.label.toUpperCase()}
              orientation={'horizontal'} // vertical or horizontal
              $active={(tab.id === tabState.currentTab.id).toString()}
              $wasactive={(tab.id === previousActiveTab?.id).toString()} // Pass the previous active tab
              key={tab.id}
              onClick={() => handleTabClick(tab)}
            >
              {props.type === 'StyledIcons' && tab.icon}
              {props.type === 'Simple' && tab.label}
            </TabType>
          )
      )}
    </TabsContainer>
  )
}
