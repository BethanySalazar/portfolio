import { contactinfo } from 'app/files'
import { Navigation } from 'components'
import { MainContainer, Title } from './styles'

export const SimpleHeader = props => {
  return (
    <MainContainer>
      {contactinfo.map(
        field =>
          field.id === 'name' && <Title key={field.id}>{field.value}</Title>
      )}
      <Navigation type={'StyledIcons'} />
    </MainContainer>
  )
}
