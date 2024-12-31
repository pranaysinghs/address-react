import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Select from 'react-select';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LocationModal = () => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [manualSelect, setManualSelect] = useState(false);
  const [position, setPosition] = useState(null);
  const [house, setHouse] = useState('');
  const [area, setArea] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddressManagement, setShowAddressManagement] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBYegVei91gWwktbIXIDHQWPAaRvg2Z06Y', // Replace with your actual API key
  });

  const handleEnableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ lat: latitude, lng: longitude });
          setLocationEnabled(true);
        },
        () => {
          alert('Failed to retrieve your location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleMapClick = (event) => {
    setPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  const handleSaveAddress = async () => {
    try {
      const newAddress = {
        id: editingAddressId || savedAddresses.length + 1,
        label: selectedOption.value,
        lat: position.lat,
        lng: position.lng,
        house,
        area,
        favorite: isFavorite,
      };
      const response = await saveAddress(newAddress);
      alert(response.data.message);
      // Update saved addresses list
      if (editingAddressId) {
        setSavedAddresses(savedAddresses.map(address => address.id === editingAddressId ? response.data.address : address));
      } else {
        setSavedAddresses([...savedAddresses, response.data.address]);
      }
      // Reset form fields
      setHouse('');
      setArea('');
      setSelectedOption('');
      setIsFavorite(false);
      setEditingAddressId(null);
      // Show address management section
      setShowAddressManagement(true);
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save the address. Please try again.');
    }
  };

  const saveAddress = async (addressData) => {
    // Replace this with your actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Address saved successfully!', address: addressData } });
      }, 1000);
    });
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ lat: latitude, lng: longitude });
        },
        () => {
          alert('Failed to retrieve your location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleDeleteAddress = (id) => {
    setSavedAddresses(savedAddresses.filter(address => address.id !== id));
  };

  const handleUpdateAddress = (id) => {
    const updatedAddress = savedAddresses.find(address => address.id === id);
    setPosition({ lat: updatedAddress.lat, lng: updatedAddress.lng });
    setHouse(updatedAddress.house);
    setArea(updatedAddress.area);
    setSelectedOption({ value: updatedAddress.label, label: getOptionLabel(updatedAddress.label) });
    setIsFavorite(updatedAddress.favorite);
    setEditingAddressId(id);
    setShowAddressManagement(false); // Redirect to the first window
  };

  const filteredAddresses = savedAddresses.filter(address =>
    address.label && address.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteAddresses = savedAddresses.filter(address => address.favorite);

  const getOptionLabel = (label) => {
    switch (label) {
      case 'Home':
        return <span><i className="fas fa-home"></i> Home</span>;
      case 'Office':
        return <span><i className="fas fa-briefcase"></i> Office</span>;
      case 'Friends & Family':
        return <span><i className="fas fa-users"></i> Friends & Family</span>;
      default:
        return label;
    }
  };

  const options = [
    { value: 'Home', label: getOptionLabel('Home') },
    { value: 'Office', label: getOptionLabel('Office') },
    { value: 'Friends & Family', label: getOptionLabel('Friends & Family') },
  ];

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="location-modal">
      {!showAddressManagement ? (
        <>
          {!locationEnabled && !manualSelect ? (
            <div className="modal-content">
              <h2>Location permission is off</h2>
              <p>
                We need your location to find the nearest store & provide you a seamless delivery experience.
              </p>
              <button className="enable-button" onClick={handleEnableLocation}>
                Enable Location
              </button>
              <button className="manual-button" onClick={() => setManualSelect(true)}>
                Search your Location Manually
              </button>
            </div>
          ) : (
            <div className='map-container' style={{ width: '100%' }}>
              <h2>{manualSelect ? 'Select Location Manually' : 'Location Enabled'}</h2>
              <div style={{ position: 'relative', width: '100%' }}>
                <GoogleMap
                  zoom={10}
                  center={position || { lat: 18.5204, lng: 73.8567 }} // Default location is set to Pune
                  mapContainerStyle={{ width: '730px', height: '400px' }}
                  onClick={manualSelect ? handleMapClick : null}
                >
                  {manualSelect && (
                    <button className="locate-me-button" onClick={handleLocateMe}>
                      Locate Me
                    </button>
                  )}
                  {position && <Marker position={position} />}
                </GoogleMap>
              </div>
              <div className="address-details">
                <input
                  type="text"
                  placeholder="House/Building"
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Area/Street"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
                <Select
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  placeholder="Select an option"
                />
                <div className="favorite-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={isFavorite}
                      onChange={(e) => setIsFavorite(e.target.checked)}
                    />
                    Save as Favorite
                  </label>
                </div>
                <button onClick={handleSaveAddress}>Save Address</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="address-management">
          <h2>Manage Your Addresses</h2>
          <input
            type="text"
            placeholder="Search addresses"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <h3>Favorite Addresses</h3>
          <ul className="address-list">
            {favoriteAddresses.map(address => (
              <li key={address.id}>
                <span>{getOptionLabel(address.label)} {address.label}: {address.house}, {address.area}</span>
                <button onClick={() => handleUpdateAddress(address.id)}>Update</button>
                <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <h3>All Addresses</h3>
          <ul className="address-list">
            {filteredAddresses.map(address => (
              <li key={address.id}>
                <span>{getOptionLabel(address.label)} {address.label}: {address.house}, {address.area}</span>
                <button onClick={() => handleUpdateAddress(address.id)}>Update</button>
                <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationModal;