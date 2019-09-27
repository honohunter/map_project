/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Async from 'react-async';
import { Col, Row } from 'react-bootstrap';
import Map from './map/map';
import MarkerTable from './table/markerTable';
import AppNavbar from './appNavbar/appNavbar';
import AuthHelperMethods from '../_authentication/authHelperMethods';
import withAuth from '../_authentication/withAuth';
import CrudHelperMethods from '../_crud/crudHelperMethods';
import './app.css';

const crudMarker = new CrudHelperMethods();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerListMap: [],
      markerListTable: [],
    };
    this.Auth = new AuthHelperMethods();
    this.handleLogout = this.handleLogout.bind(this);
    this.addFeatures = this.addFeatures.bind(this);
    this.flyToMarker = this.flyToMarker.bind(this);
    this.getData = this.getData.bind(this);
    this.updateFeatures = this.updateFeatures.bind(this);
  }

  getData() {
    return crudMarker.readMarker().then(markers => {
      const { markerListMap, markerListTable } = this.state;
      markers.forEach(marker => {
        markerListMap.push([
          {
            coordinates: [marker.lon, marker.lat],
            properties: { comments: marker.comments, name: marker.name, location_id: marker.location_id },
          },
        ]);
        markerListTable.push({ location: [marker.lon, marker.lat], comments: marker.comments, name: marker.name });
      });
      this.state = { markerListMap, markerListTable };
      return this.state;
    });
  }

  handleLogout() {
    this.Auth.logout();
    this.props.history.replace('/login');
  }

  addFeatures(lastMarker) {
    const { markerListTable } = this.state;
    markerListTable.push(lastMarker);
    this.setState({ markerListTable });
  }

  flyToMarker(location) {
    const { map } = this.map;
    map.flyTo({
      center: location,
      zoom: 15,
    });
  }

  updateFeatures(markers) {
    console.log('update', markers);
    const markerListMap = [];
    const markerListTable = [];
    markers.forEach(marker => {
      markerListMap.push([
        {
          coordinates: [marker.lon, marker.lat],
          properties: { comments: marker.comments, name: marker.name, location_id: marker.location_id },
        },
      ]);
      markerListTable.push({ location: [marker.lon, marker.lat], comments: marker.comments, name: marker.name });
    });
    this.setState({ markerListMap, markerListTable });
    // this.forceUpdate();
  }

  // Render the protected component
  render() {
    let identity = null;
    if (this.props.confirm) {
      identity = this.props.confirm.identity;
    }
    return (
      <Async promiseFn={this.getData}>
        {({ data, error, isPending }) => {
          if (isPending) return 'Loading...';
          if (error) return `Something went wrong: ${error.message}`;
          if (data)
            return (
              <div className="app">
                <Row className="mx-0">
                  <Col md={8} className="px-0">
                    <Map
                      identity={identity}
                      markerList={this.state.markerListMap}
                      addFeatures={this.addFeatures}
                      ref={e => {
                        this.map = e;
                      }}
                      updateFeatures={this.updateFeatures}
                    />
                  </Col>
                  <Col md={4} className="px-0">
                    <AppNavbar identity={identity} handleLogout={this.handleLogout} />
                    <MarkerTable data={this.state.markerListTable} handelRowClick={this.flyToMarker} />
                  </Col>
                </Row>
              </div>
            );
          return null;
        }}
      </Async>
    );
  }
}

// In order for this component to be protected, we must wrap it with what we call a 'Higher Order Component' or HOC.

export default withAuth(App);
