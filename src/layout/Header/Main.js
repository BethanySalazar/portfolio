import { SimpleHeader } from './SimpleHeader'

export const Header = props => {
  function getHeader (headertype) {
    switch (headertype) {
      case 'Simple_Header':
        return <SimpleHeader {...props} />
      default:
        return <SimpleHeader {...props} />
    }
  }

  return <div className='header'>{getHeader(props.type)}</div>
}
