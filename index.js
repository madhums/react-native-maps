import MapView from './lib/components/MapView';

export { default as Marker } from './lib/components/MapMarker.js';
export { default as Polyline } from './lib/components/MapPolyline.js';
export { default as Heatmap } from './lib/components/MapHeatmap.js';
export { default as Polygon } from './lib/components/MapPolygon.js';
export { default as Circle } from './lib/components/MapCircle.js';
export { default as UrlTile } from './lib/components/MapUrlTile.js';
export { default as WMSTile } from './lib/components/MapWMSTile.js';
export { default as LocalTile } from './lib/components/MapLocalTile.js';
export { default as MbTile } from './lib/components/MapMbTile.js';
export { default as Overlay } from './lib/components/MapOverlay.js';
export { default as Callout } from './lib/components/MapCallout.js';
export {
  default as CalloutSubview,
} from './lib/components/MapCalloutSubview.js';
export { default as AnimatedRegion } from './lib/components/AnimatedRegion.js';
export { default as Geojson } from './lib/components/Geojson.js';

export {
  Animated,
  MAP_TYPES,
  ProviderPropType,
} from './lib/components/MapView';

export const PROVIDER_GOOGLE = MapView.PROVIDER_GOOGLE;
export const PROVIDER_DEFAULT = MapView.PROVIDER_DEFAULT;

export default MapView;
