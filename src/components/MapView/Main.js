import React, { useState, useCallback, useEffect, useRef } from 'react'
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api'

// Keep libraries array as a constant to prevent reloading
const libraries = ['marker']

const containerStyle = {
  width: '100%',
  height: '800px'
}

const defaultCenter = {
  lat: 29.4241, // San Antonio center
  lng: -98.4936
}

// Create marker content for different pin types
const createMarkerContent = (place) => {
  const div = document.createElement('div')
  div.style.cursor = 'pointer'
  
  let svg = ''
  if (place.starred) {
    svg = `<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12 2 L 15.09 8.26 L 22 9.27 L 17 14.14 L 18.18 21.02 L 12 17.77 L 5.82 21.02 L 7 14.14 L 2 9.27 L 8.91 8.26 Z" 
            fill="#FFD700" stroke="#FFA500" stroke-width="1.5"/>
    </svg>`
  } else if (place.favorite) {
    svg = `<svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            fill="#FF1744" stroke="#C51162" stroke-width="1.5"/>
    </svg>`
  } else {
    svg = `<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
            fill="#4285F4" stroke="#1967D2" stroke-width="1.5"/>
    </svg>`
  }
  
  div.innerHTML = svg
  return div
}

export const MapView = ({ places = [] }) => {
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [map, setMap] = useState(null)
  const markersRef = useRef([])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries
  })

  const onLoad = useCallback(function callback(map) {
    // Fit bounds to show all markers
    if (places.length > 0) {
      const bounds = new window.google.maps.LatLngBounds()
      places.forEach(place => {
        if (place.lat && place.lng) {
          bounds.extend(new window.google.maps.LatLng(place.lat, place.lng))
        }
      })
      map.fitBounds(bounds)
    }
    setMap(map)
  }, [places])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  // Create AdvancedMarkerElements when map and places are ready
  useEffect(() => {
    if (!map || !isLoaded || !window.google?.maps?.marker?.AdvancedMarkerElement) {
      return
    }

    // Clear existing markers
    markersRef.current.forEach(marker => {
      marker.map = null
    })
    markersRef.current = []

    // Create new markers
    places.forEach((place) => {
      if (place.lat && place.lng) {
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: place.lat, lng: place.lng },
          content: createMarkerContent(place),
          title: place.name
        })

        marker.addListener('click', () => {
          setSelectedPlace(place)
        })

        markersRef.current.push(marker)
      }
    })

    return () => {
      // Cleanup markers on unmount
      markersRef.current.forEach(marker => {
        marker.map = null
      })
      markersRef.current = []
    }
  }, [map, places, isLoaded])

  if (!isLoaded) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading map...</div>
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapId: 'DEMO_MAP_ID', // Required for Advanced Markers
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true
      }}
    >
      {selectedPlace && (
        <InfoWindow
          position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div style={{ maxWidth: '250px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
              {selectedPlace.name}
            </h3>
            {selectedPlace.starred && (
              <span style={{ color: '#FFD700', marginRight: '8px' }}>⭐ Starred</span>
            )}
            {selectedPlace.favorite && (
              <span style={{ color: '#FF1744', marginRight: '8px' }}>❤️ Favorite</span>
            )}
            <p style={{ margin: '8px 0', fontSize: '14px', color: '#666' }}>
              {selectedPlace.location}
            </p>
            {selectedPlace.mapUrl && (
              <a
                href={selectedPlace.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#4285F4', textDecoration: 'none', fontSize: '14px' }}
              >
                View on Google Maps →
              </a>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}
