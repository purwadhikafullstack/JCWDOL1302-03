'use client';
import React, { useEffect, useState } from 'react';

interface GeolocationCoords {
  latitude: number;
  longitude: number;
}

interface GeolocationPosition {
  coords: GeolocationCoords;
}

const GeoLocation = () => {
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            localStorage.setItem(
              'location',
              JSON.stringify({ latitude, longitude }),
            );
          },
          (error) => {
            console.error('Error getting location:', error);
          },
        );
      }
    };

    getLocation();
  }, []);

  return <></>;
};

export default GeoLocation;
