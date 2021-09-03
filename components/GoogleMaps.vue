<template>
  <div :id="mapIdentifier" ref="map"></div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';

export default {
  props: {
    lat: {
      default: 25.276987,
    },
    long: {
      default: 55.316666,
    },
    mapIdentifier: {
      default: 'map',
    },
    mapOptions: { // merged with default map options
      default: () => {},
    },
    markerOptions: { // merged with default marker options
      default: () => {},
    },
  },
  data() {
    return {
      // eslint-disable-next-line no-undef
      geocoder: null, // new google.maps.Geocoder(),
      marker: null,
      map: null,
    };
  },
  methods: {
    onDragend() {
      const { geocoder, marker } = this;
      // eslint-disable-next-line no-undef
      geocoder.geocode({ latLng: marker.getPosition() }, (results, status) => {
        // eslint-disable-next-line no-undef
        if (status === google.maps.GeocoderStatus.OK) {
          const lat = marker.getPosition().lat();
          const long = marker.getPosition().lng();
          const addressComponents = results[0].address_components;
          let address = null;
          let city = null;
          let country = null;
          let zip = null;
          let area = null;

          // eslint-disable-next-line camelcase
          addressComponents.forEach((address_component) => {
            if (address_component.types.includes('postal_code')) {
              zip = address_component.long_name;
            }

            if (address_component.types.includes('sublocality')) {
              area = address_component.long_name;
            }
          });

          let result = false;

          if (results[0]) {
            [result] = results;
          } else if (results.address_components) {
            result = results;
          }

          if (result) {
            // eslint-disable-next-line camelcase
            const { address_components, formatted_address } = result;
            const totalAddress = address_components.length;
            city = address_components[totalAddress - 2].long_name;
            country = address_components[totalAddress - 1].long_name;
            // eslint-disable-next-line camelcase
            address = formatted_address;
          }

          const mapData = {
            address, area, city, country, zip, lat, long,
          };

          this.$emit('map-updated', mapData);
        }
      });
    },
    initialize(google) {
      this.geocoder = new google.maps.Geocoder();
      const location = new google.maps.LatLng(this.lat, this.long);
      const options = {
        zoom: 10,
        center: location,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

      // create map and marker
      this.map = new google.maps.Map(this.$refs.map, { ...options, ...this.mapOptions });
      const markerOptions = {
        map: this.map,
        position: location,
        draggable: true,
      };
      this.marker = new google.maps.Marker({ ...markerOptions, ...this.markerOptions });
      google.maps.event.addListener(this.marker, 'dragend', this.onDragend);
      this.$emit('map-loaded');
    },
  },
  watch: {
    lat() { // reset map position and re-center the map canvas
      this.marker.setPosition(new google.maps.LatLng(this.lat, this.long));
      this.map.setCenter(this.marker.getPosition());
    },
    long() { // reset map position and re-center the map canvas
      this.marker.setPosition(new google.maps.LatLng(this.lat, this.long));
      this.map.setCenter(this.marker.getPosition());
    },
  },
  mounted() {
    const loader = new Loader({
      apiKey: this.$config.googleApiKey,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(this.initialize).catch((e) => {
      console.error(e);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
