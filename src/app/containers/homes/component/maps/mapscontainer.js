import styles from "../../home.style";
import MapView, {Callout, MAP_TYPES, Marker, Polygon, PROVIDER_GOOGLE} from 'react-native-maps';
import React from "react";
import {Image, PixelRatio, View} from "react-native";

const g = require('../../../../util/index');

const MapContainer = ({onCurrentLocation, region, onRegionChange, data, makerPress, getProjectID}) => {
    function onCurrentLocal() {
        onCurrentLocation();
        this.maps && this.maps.animateToCoordinate(region, 1000)
    }

    function imageMaker(type) {
        if (type === 'idea') {
            switch (PixelRatio.get()) {
                default:
                    return require('../../../../assets/icons/icon_light.png');
            }
        } else if(type==='raiseFunding') {
            switch (PixelRatio.get()) {
                default:
                    return require('../../../../assets/icons/icon_money2.png');
            }
        }else if(type==='docu'){
            return require('../../../../assets/icons/iconsh_circle.png')
        }else{
            return require('../../../../assets/icons/iconbds_circle.png')
        }
    }

    let makerV;
    if (data) {
        makerV = data && data.map((value, index) => {
            return (<MapView.Marker
                key={index}
                coordinate={value.coordinate}
                identifier={value.key}
                onPress={() => requestAnimationFrame(() => {
                    try {
                        makerPress({
                            modalVisible: true
                        });
                        getProjectID(value.key)
                    } catch (error) {
                        console.log(error)
                    }
                })}
            >
                <Image source={imageMaker(value.type)} style={styles.imgMarker}/>
            </MapView.Marker>)
        })
    } else {
        makerV = (<View/>)
    }
    return (
        <MapView
            style={styles.mapV}
            ref={c => {
                this.maps = c
            }}
            mapType={"standard"}
            followsUserLocation={true}
            showsUserLocation={true}
            showsCompass={false}
            zoomEnabled={true}
            rotateEnabled={true}
            scrollEnabled={true}
            onMapReady={onCurrentLocal.bind(this)}
            region={region}
            initialRegion={{
                latitude: region.latitude ? region.latitude : 21.004934,
                longitude: region.longitude ? region.longitude : 105.7808754,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05 * g.rw
            }}
            onRegionChangeComplete={onRegionChange}>
            {
                makerV
            }

        </MapView>
    )
};
export default MapContainer;