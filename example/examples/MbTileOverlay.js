import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

// replace PROJECT_ROOT with the right path
// You can generate mbtiles from QGIS
const PATH_TO_MBTILES = '/PROJECT_ROOT/netherlands.mbtiles';
const MIN_ZOOM = 5;
const MAX_ZOOM = 15;
const ASPECT_RATIO = width / height;

// Co-ordinates for Delft, Netherlands
const LATITUDE = 52.00667;
const LONGITUDE = 4.35556;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      offlineMap: false,
    };
  }

  _toggleOfflineMap = () => {
    this.setState({
      offlineMap: !this.state.offlineMap,
    });
  };

  onLayout = () => {
    this.setState({ minZoomLevel: MIN_ZOOM });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onLayout={this.onLayout}
          maxZoomLevel={MAX_ZOOM}
          minZoomLevel={this.state.minZoomLevel}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          loadingEnabled
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          mapType={
            Platform.OS === 'android' && this.state.offlineMap
              ? 'none'
              : 'standard'
          }
        >
          {this.state.offlineMap ? (
            <MapView.MbTile pathTemplate={PATH_TO_MBTILES} tileSize={256} />
          ) : null}
        </MapView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this._toggleOfflineMap()}
        >
          <Text>
            {' '}
            {this.state.offlineMap
              ? 'Switch to Online Map'
              : 'Switch to Offline Map'}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'lightblue',
    zIndex: 999999,
    height: 50,
    width: width / 2,
    borderRadius: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
