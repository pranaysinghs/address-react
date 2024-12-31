# Location Flow

Location Flow is a React application that allows users to manage their addresses with features like geolocation, manual location selection, and saving addresses as favorites. The application uses Google Maps API for location services and `react-select` for enhanced dropdowns.

## Features

- **Enable Location Services**: Automatically detect the user's location using the browser's geolocation API.
- **Manual Location Selection**: Allow users to manually select a location on the map.
- **Save Addresses**: Save addresses with labels like Home, Office, and Friends & Family.
- **Favorite Addresses**: Mark addresses as favorites for quick access.
- **Manage Addresses**: Update or delete saved addresses.
- **Search Addresses**: Search through saved addresses.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Google Maps API**: Provides location services and map functionalities.
- **react-select**: A flexible and customizable dropdown component.
- **Font Awesome**: Icon library for adding icons to the application.
- **CSS**: Styling the application.

## Usage

-Open the application in your browser.
-Enable location services or manually select a location on the map.
-Fill in the address details and select a label from the dropdown.
-Optionally, mark the address as a favorite.
-Save the address.
-Manage your saved addresses by updating or deleting them.

## File Structure

- **LocationModal.jsx**: Main component for managing locations.
- **App.css**: Styles for the application.

## LocationModal.jsx

- This component handles the main functionality of the application, including enabling location services, manually selecting 
  a location, saving addresses, and managing saved addresses.

## Key Functions:

- **handleEnableLocation**: Enables location services to automatically detect the user's location.
- **handleMapClick**: Handles manual location selection on the map.
- **handleSaveAddress**: Saves the address with the provided details and updates the saved addresses list.
- **handleLocateMe**: Locates the user's current position.
- **handleDeleteAddress**: Deletes a saved address.
- **handleUpdateAddress**: Updates an existing address with new details.

## App.css

- This file contains the styles for the application, including layout, colors, and animations.

## Key Styles:
**location-modal**: Styles for the main modal container.
**modal-content**: Styles for the modal content.
**enable-button**: manual-button: Styles for the buttons.
**address-details**: Styles for the address input fields and dropdown.
**favorite-checkbox**: Styles for the "Save as Favorite" checkbox.
**address-management**: Styles for the address management section.
**address-list**: Styles for the list of saved addresses.

## Contributing
- Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

