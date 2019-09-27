/* eslint-disable react/no-unused-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/style-prop-object */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import ReactMapboxGL, { Layer, Feature, Popup, MapContext } from 'react-mapbox-gl';
import FormModal from './_fromModal/formModal';
import Panel from './_pannel/panel';
import CrudHelperMethods from '../../_crud/crudHelperMethods';

import './map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Icon from './mapbox-icon.png';

const crudMarker = new CrudHelperMethods();
const TOKEN = 'pk.eyJ1IjoieW9uZGFpbWU5NCIsImEiOiJjanpvNTNmbjkwN2tvM2xucHlpdmVoNWFxIn0.ckm-DWnb7YLlmQ-ZHTBcuA';

class Map extends Component {
  constructor(props) {
    super(props);
    this.styleLoaded = this.styleLoaded.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.currentViewPoint = this.currentViewPoint.bind(this);
    this.featureMouseEnter = this.featureMouseEnter.bind(this);
    this.featureMouseLeave = this.featureMouseLeave.bind(this);
    this.markerClick = this.markerClick.bind(this);
    this._markerValidation = this._markerValidation.bind(this);
    this.state = {
      action: false,
      viewPoint: {
        center: [7.753406, 36.902452],
      },
      markerList: this.props.markerList,
      popupCoordinates: [null, null],
      event: {},
      cursor: '',
      modalShow: false,
      comments: '',
      name: '',
    };
    this.MapBox = ReactMapboxGL({
      accessToken: TOKEN,
    });
    this.map = {};
  }

  styleLoaded(map) {
    map.loadImage(Icon, (error, image) => {
      if (error) throw error;
      map.addImage('icon', image);
    });
  }

  _markerValidation(form) {
    const { markerList, event, action } = this.state;
    console.log(form);
    switch (action) {
      case 'add':
        crudMarker
          .createMarker(event.lngLat.lng, event.lngLat.lat, form.comments, form.name)
          .then(res => {
            markerList.push([
              {
                coordinates: [res.lon, res.lat],
                properties: { comments: res.comments, name: res.name, location_id: res.location_id },
              },
            ]);
            this.props.addFeatures({ location: [res.lon, res.lat], comments: res.comments, name: res.name });
          })
          .finally(() => {
            this.setState({ modalShow: false, action: false, cursor: '', name: '', comments: '' });
          });
        break;
      case 'edit':
        crudMarker
          .updateMarker(this.state.event, form.comments, form.name)
          .then(markers => {
            this.props.updateFeatures(markers);
          })
          .finally(() => {
            this.setState({ modalShow: false, action: false, cursor: '', name: '', comments: '' });
          });
        break;
      case 'delete':
        crudMarker
          .deleteMarker(this.state.event, form.comments, form.name)
          .then(markers => {
            this.props.updateFeatures(markers);
          })
          .finally(() => {
            this.setState({ modalShow: false, cursor: '', name: '', comments: '' });
          });
        break;

      default:
        break;
    }
  }

  addMarker(map, event) {
    const { action } = this.state;
    if (action === 'add') {
      this.setState({ modalShow: true, event });
    }
  }

  currentViewPoint(map) {
    this.state.viewPoint = {
      zoom: [map.getZoom()],
      bearing: [map.getBearing()],
      pitch: [map.getPitch()],
      center: [map.getCenter().lng, map.getCenter().lat],
    };

    console.log(this.state.viewpoint);
  }

  featureMouseEnter(mapWithEvt) {
    const { action } = this.state;
    if (!action) {
      const coordinates = mapWithEvt.features[0].geometry.coordinates.slice();
      const { name } = mapWithEvt.feature.properties;
      const { comments } = mapWithEvt.feature.properties;

      while (Math.abs(mapWithEvt.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += mapWithEvt.lngLat.lng > coordinates[0] ? 360 : -360;
        coordinates[1] += mapWithEvt.lngLat.lat > coordinates[1] ? 360 : -360;
      }
      console.log('mapWithEvt', mapWithEvt);
      this.setState({
        popupCoordinates: coordinates,
        cursor: 'pointer',
        name,
        comments,
      });
    }
  }

  markerClick(mapWithEvt) {
    const { action } = this.state;
    const { properties } = mapWithEvt.feature;
    switch (action) {
      case 'edit':
        console.log('prop', properties);
        this.setState({
          cursor: 'pointer',
          name: properties.name,
          comments: properties.comments,
          modalShow: true,
          event: properties.location_id,
        });
        break;
      case 'delete':
        console.log('prop', properties);
        this.setState({
          cursor: 'pointer',
          name: properties.name,
          comments: properties.comments,
          modalShow: true,
          event: properties.location_id,
        });
        break;

      default:
        break;
    }
  }

  featureMouseLeave() {
    const { action } = this.state;
    if (!action) {
      this.setState({
        popupCoordinates: [null, null],
        cursor: '',
      });
    }
  }

  render() {
    return (
      <div className="map">
        <Panel
          onClick={state => {
            const { cursor, action } = state;
            console.log(state);

            this.setState({ cursor, action });
          }}
        />
        <this.MapBox
          className="mapContainer"
          style="mapbox://styles/mapbox/streets-v11"
          center={this.state.viewPoint.center}
          onStyleLoad={this.styleLoaded}
          onClick={this.addMarker}
          // onMove={this.currentViewPoint}
        >
          <MapContext.Consumer>
            {map => {
              this.map = map;
              map.getCanvas().style.cursor = this.state.cursor;
            }}
          </MapContext.Consumer>
          <Layer id="points" layout={{ 'icon-image': 'icon', 'icon-size': 0.25 }}>
            {this.props.markerList.map((feature, index) => {
              return (
                <Feature
                  key={`feature${index}`}
                  coordinates={feature[0].coordinates}
                  properties={feature[0].properties}
                  onClick={this.markerClick}
                  onMouseEnter={this.featureMouseEnter}
                  onMouseLeave={this.featureMouseLeave}
                />
              );
            })}
          </Layer>
          <Popup className="popup" coordinates={this.state.popupCoordinates}>
            <h3>{this.state.name}</h3>
            <p>{this.state.comments}</p>
          </Popup>
        </this.MapBox>
        <FormModal
          show={this.state.modalShow}
          onHide={() => {
            this.setState({
              modalShow: false,
              action: false,
              cursor: '',
              name: '',
              comments: '',
            });
          }}
          handleSave={this._markerValidation}
          nameValue={this.state.name}
          commentsValue={this.state.comments}
          action={this.state.action}
        />
      </div>
    );
  }
}

export default Map;
