import { contactinfo } from '../../app/files'
import { MainContainer, StyledLink } from './styles/Main'

export const Footer = props => {
  return (
    <MainContainer className='Footer'>
      {contactinfo.map((field, index) => (
        <div
          key={index + '_' + field.id}
          style={{
            // border: '1px solid white',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {field?.icons && (
            <StyledLink href={field?.link}>{field?.icons?.filled}</StyledLink>
          )}
          {field?.value && (
            <StyledLink
              bold={field.id === 'name' ? 'true' : 'false'}
              href={field?.link}
            >
              {field.value}
            </StyledLink>
          )}
        </div>
      ))}
    </MainContainer>
  )
}
