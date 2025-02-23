import { GalleryStyled } from './styles'
import { FaFlag, FaHeart, FaStar } from 'react-icons/fa'

export const Gallery = props => {
  const { items, setItems } = props

  const handleIconClick = (id, iconType) => {
    const updated = items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          favorite: false,
          starred: false,
          flagged: false,
          [iconType]: true
        }
      }
      return item
    })
    setItems(updated)
  }

  // Grouping items by their icon state
  const groupedItems = items.reduce((acc, item) => {
    const group = item.favorite
      ? 'favorite'
      : item.starred
      ? 'starred'
      : 'flagged' // Default group is flagged

    // Push the item into the appropriate group
    if (!acc[group]) {
      acc[group] = []
    }
    acc[group].push(item)

    return acc
  }, {})

  // Create a new object to map through the groups only once
  const groups = [
    { title: 'Favorite', items: groupedItems.favorite || [] },
    { title: 'Starred', items: groupedItems.starred || [] },
    { title: 'Flagged', items: groupedItems.flagged || [] }
  ]

  return (
    <GalleryStyled>
      {groups.map(group => (
        <div key={group.title} className='group'>
          <h2>{group.title}</h2>
          <div className='gallery'>
            {group.items.map(item => (
              <div key={item.id} className='card'>
                <div className='icons-container'>
                  <div
                    className='icon-circle'
                    onClick={() => handleIconClick(item.id, 'favorite')}
                  >
                    <FaHeart color={item.favorite ? 'red' : 'black'} />
                  </div>
                  <div
                    className='icon-circle'
                    onClick={() => handleIconClick(item.id, 'starred')}
                  >
                    <FaStar color={item.starred ? 'yellow' : 'black'} />
                  </div>
                  <div
                    className='icon-circle'
                    onClick={() => handleIconClick(item.id, 'flagged')}
                  >
                    <FaFlag color={item.flagged ? 'blue' : 'black'} />
                  </div>
                </div>
                <div className='image-container'>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className='info-container'>
                  <h3>{item.name}</h3>
                  <a
                    href={item.mapUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {item.location}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </GalleryStyled>
  )
}
