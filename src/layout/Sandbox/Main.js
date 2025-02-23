import { useEffect, useState } from 'react'
import { GalleryStyled } from './styles/Main'
import { savedplacesgoogle } from '../../app/files/savedplacesgoogle'

export const Sandbox = () => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    if (!savedplacesgoogle?.features) return

    const fetchPlacePhoto = async placeName => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
            placeName
          )}&inputtype=textquery&fields=photos,place_id&key=${GOOGLE_API_KEY}`
        )
        const data = await response.json()
        if (data.candidates?.[0]?.photos?.[0]?.photo_reference) {
          return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data.candidates[0].photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
        }
      } catch (error) {
        console.error('Error fetching place photo:', error)
      }
      return null
    }

    const loadPlaces = async () => {
      const places = savedplacesgoogle.features.filter(
        feature =>
          feature?.properties?.location?.name &&
          !feature?.properties?.location?.name.toLowerCase().includes('iglesia')
      )
      const placeData = await Promise.all(
        places.map(async (feature, index) => {
          const name = feature?.properties?.location?.name || ''
          const address = feature?.properties?.location?.address || ''
          const lat = feature?.geometry?.coordinates[1]
          const lng = feature?.geometry?.coordinates[0]

          let mapUrl = name
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                name
              )}`
            : address
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                address
              )}`
            : `https://www.google.com/maps?q=${lat},${lng}`

          let image = await fetchPlacePhoto(name)

          // If no image found, use static map
          // if (!image) {
          //   image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x400&key=${GOOGLE_API_KEY}`
          // }

          return {
            id: index,
            name: name || 'Unnamed Place',
            location: address || 'Unknown Location',
            lat,
            lng,
            mapUrl,
            image
          }
        })
      )

      setPlaces(placeData)
    }

    loadPlaces()
  }, [])

  return (
    <div className='ViewPort'>
      <GalleryStyled>
        <div className='gallery'>
          {places.map(place => (
            <div key={place.id} className='card'>
              <img src={place.image} alt={place.name} />
              <h3>{place.name}</h3>
              <a href={place.mapUrl} target='_blank' rel='noopener noreferrer'>
                {place.location}
              </a>
            </div>
          ))}
        </div>
      </GalleryStyled>
    </div>
  )
}
