import RNGooglePlaces from 'react-native-google-places';
import reactotronReactNative from 'reactotron-react-native';

export const getCurrentAddressData = (data) => {
    return {
        type: "FETCHING_CURRENT_ADDRESS",
        data
    }
};
export const toggleSearchResultModal = (data) => {
    return (dispatch) => {
        dispatch({ type: 'SEARCH_RESULT_MODAL', data })
    }
};
export const getNameAddress = () => {
    return (dispatch) => {

    }
};
export const getAddressPredictions = (data) => {
    return (dispatch) => {
        reactotronReactNative.log("ât", data);
        RNGooglePlaces.getAutocompletePredictions(data)
            .then((results) => {
                reactotronReactNative.log("ât", results);
                console.log(JSON.stringify(results));
                dispatch({ type: 'FETCH_LIST_SEARCH_RESULT', data: results })
            })
            .catch((error) => console.log(error));
    }
};
export const getSelectedAddress = (id) => {
    return (dispatch) => {
        RNGooglePlaces.lookUpPlaceByID(id)
            .then((results) => {
                console.log(JSON.stringify(results));
                dispatch({
                    type: 'FETCH_ADDRESS_RESULT', data: {
                        latitude: results.latitude,
                        longitude: results.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }
                })
            })
            .catch((error) => console.log(error.message));
    }
};
export const getCurrentAddress = () => {
    return (dispatch) => {
        try {
            navigator.geolocation.getCurrentPosition((position) => {
                dispatch(getCurrentAddressData({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }));
            }, error => console.log(error))
        } catch (error) {
            navigator.geolocation.stopObserving();
            console.log(error)
        }
    }
};