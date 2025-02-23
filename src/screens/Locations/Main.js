import { useEffect, useState } from 'react'
import { savedplacesgoogle } from '../../app/files/savedplacesgoogle'
import { loadPlaces } from '../../utilities/location'
import { Button, Gallery } from '../../components'

const GOOGLE_API_KEY =
  process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyCVm2HxzxcubIiq6Z0L_devsVTcWrIfpqo'

export const Locations = props => {
  const {} = props
  const [places, setPlaces] = useState([])

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
    <>
      <button
        onClick={() => {
          // Save the updated places to localStorage as a JSON string
          localStorage.setItem('savedplacesgoogle', JSON.stringify(places))
          alert('Changes saved!')
        }}
      >
        Save
      </button>
      <Gallery items={places} setItems={setPlaces} />
    </>
  )
}
