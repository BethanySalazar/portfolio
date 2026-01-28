import { useEffect, useState } from 'react'
import { savedplacesgoogle } from 'app/files/savedplacesgoogle'
import { loadPlaces } from 'utilities'
import { Button, Gallery, MapView } from 'components'

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export const Locations = props => {
  const {} = props
  const [places, setPlaces] = useState([])
  const [showMap, setShowMap] = useState(true)

  useEffect(() => {
    const storedPlaces = localStorage.getItem('savedplacesgoogle')

    // If places are stored in localStorage, use them; otherwise, fetch from default data
    if (storedPlaces) {
      setPlaces(JSON.parse(storedPlaces))
    } else {
      if (!savedplacesgoogle?.features) return

      const fetchPlaces = async () => {
        const loadedPlaces = await loadPlaces(
          savedplacesgoogle.features,
          GOOGLE_API_KEY
        )
        // Initialize the properties for the icons
        const initializedPlaces = loadedPlaces.map(place => ({
          ...place,
          favorite: place.favorite || false,
          starred: place.starred || false,
          flagged: place.flagged || true
        }))

        const placesInSA = initializedPlaces.filter(place =>
          place.location.toLowerCase().includes('san antonio')
        )
        const placesInAustin = initializedPlaces.filter(place =>
          place.location.toLowerCase().includes('austin')
        )
        console.log(placesInSA)
        setPlaces(placesInSA)
      }

      fetchPlaces()
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ padding: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={() => {
            // Save the updated places to localStorage as a JSON string
            localStorage.setItem('savedplacesgoogle', JSON.stringify(places))
            alert('Changes saved!')
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4285F4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Save Changes
        </button>
        <button
          onClick={() => setShowMap(!showMap)}
          style={{
            padding: '10px 20px',
            backgroundColor: showMap ? '#34A853' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showMap ? '🖼️ Gallery View' : '📍 Map View'}
        </button>
        <div style={{ marginLeft: 'auto', fontSize: '14px', color: '#666' }}>
          <span style={{ marginRight: '15px' }}>⭐ Starred: {places.filter(p => p.starred).length}</span>
          <span style={{ marginRight: '15px' }}>❤️ Favorites: {places.filter(p => p.favorite).length}</span>
          <span>Total: {places.length}</span>
        </div>
      </div>
      {showMap ? (
        <MapView places={places} />
      ) : (
        <Gallery items={places} setItems={setPlaces} />
      )}
    </div>
  )
}
