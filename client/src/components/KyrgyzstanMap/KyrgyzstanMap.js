import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const KyrgyzstanMap = () => {
    const kyrgyzstanCoordinates = [42.8666, 74.5698];
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser.');
        }
    }, []);

    return (
        <div className="h-screen w-full bg-gray-800">
            <div className="mx-auto max-w-screen-xl p-8">
                <MapContainer
                    center={userLocation || kyrgyzstanCoordinates}
                    zoom={userLocation ? 20 : 13}
                    className="h-96 md:h-80 lg:h-72 xl:h-80 border-2 border-gray-600 rounded-md overflow-hidden"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {userLocation && (
                        <Marker position={userLocation}>
                            <Popup>Ваше текущее местоположение</Popup>
                        </Marker>
                    )}
                    <Marker position={kyrgyzstanCoordinates}>
                        <Popup>
                            Добро пожаловать в Киргизию! <br /> Это центральная часть страны.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default KyrgyzstanMap;

