import React, { Component } from 'react';
import './App.css';
import Map from './map'
class App extends Component {
      currentLocation = [];
      state = {
        query:[],
        mapIsReady: false,
        condition: false,
        map: {}
      }

initMap = () =>{
  const ApiKey = 'AIzaSyDTB3tbX3dMTxpoxaXHa-VaB0WQqNXAuOA';
  const script = document.createElement('script');
   script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}`;
   script.async = true;
   script.defer = true;
   script.addEventListener('load', () => {
     this.setState({ mapIsReady: true });
   });
   document.body.appendChild(script);
}
buildMap =() => {
  const google = window.google;
  let bounds = new google.maps.LatLngBounds()
  const Infowindow = new google.maps.InfoWindow();
  let map= new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: true,
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.RIGHT_BOTTOM
          },
    zoom: 11,
    zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER
          },
    streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
          },
  })
  function showWindow(marker){
    if (Infowindow.marker !== marker) {
      //console.log("called")
      Infowindow.marker = marker;
      Infowindow.setContent('<div>' + marker.title + '</div>');
      Infowindow.open(map, marker);

    }
    else {
      Infowindow.addListener('closeclick', function() {
        Infowindow.marker = null;
      });
    }
  }
 function  marker (one){
   //console.log(one);
     //console.log(here.state.query[0].location.lat,typeof(here.state.query[0]) );

     if(one) {
       map.setCenter(new google.maps.LatLng(one.location.lat, one.location.lng))
       let marker = new google.maps.Marker({
       position: {lat: one.location.lat, lng: one.location.lng},
       map: map,
       title: one.name,
       animation: google.maps.Animation.DROP,
       id: one.location.id
     })
     marker.addListener("click", ()=>{
       showWindow(marker)
     })
     bounds.extend(marker.position)
     //console.log(typeof(marker));
     return marker;
     }

  }
  let markers =[];
  if(this.state.query.length>0){
    markers = this.state.query.map(marker)
  }
  function filterMarker(value) {
    //console.log(value);
    if(markers.length>0) {
      markers.filter(marker => marker.title===value).map(showWindow)
      map.fitBounds(bounds);
    }
  }
  return filterMarker
}

componentDidMount(){
  this.initMap();
  if(this.state.mapIsReady) {
    //console.log("map is ready");
    this.buildMap()
  }
}
componentDidUpdate(){
  let lat= null;
  let lng= null;
  const here = this
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
       lat = position.coords.latitude;
       lng = position.coords.longitude;
       //console.log("sravanf");
       here.currentLocation.push({lat: lat, lng: lng})
       //here.currentLocation.push(pos)
      here.buildMap()
       //here.getData();
    }, function(error) { document.alert("location not supported")})
    //console.log(pos.lat);
    //console.log(pos);
}
}
getData = (event) =>{
  //console.log(event);
  if (event.key==="Enter"){
    //this.setState({query:event.target.value})
    //console.log(event.target.value);
    //console.log(this.state.query);
    //const query = event.target.value;
    const here = this
    const end_point = "https://api.foursquare.com/v2/venues/search"
    const client_id = "WVUL2XKHDR5KGZR1QUCEWPFCLX2MDEG3CMYGRB433X1YDT2J";
    const client_secret = "Z0D12P1T5LAYCUDPHSPVKF5SEHWUAKM2KAJORQFCDXE2YDKZ"
    const lat = this.currentLocation[0].lat;
    const lng = this.currentLocation[0].lng;
    fetch(`${end_point}?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=10&ll=${lat},${lng}&query=${event.target.value}`)
    .then(response => response.json()).then(sample).catch(e => document.alert(e+"error in fetching the data"))
    function sample(data) {
      //console.log(JSON.stringify(data));
      //data = JSON.stringify(data)
      //console.log(data.response);
      here.setState({query: data.response.venues})
    }
  }
}
handle() {
  this.setState({
    condition: !this.state.condition
  })
}
justCall(event){
  //console.log(this,event.currentTarget.dataset.id,"just call");
  this.buildMap()(event.currentTarget.dataset.id)
}
render() {
  //console.log( this.state.mapIsReady, this.currentLocation, this.state.query)
    return (
      <div className="App">
        {
          this.state.mapIsReady ? <Map/> : <h2>Cant able to load the map</h2>
        }
        <div id="search">
            <input id="searchField" type="text" placeholder="coffee or chicken or Newyork "  onKeyPress={(event)=>this.getData(event)} aria-label={"search field"} />
        </div>
        <button onClick={this.handle.bind(this)}  tabIndex={"0"} arira-label={"toggle list"} >&#9776;</button>
        <ul className="cardList" id={this.state.condition ? "menu-hidden" : ""} role="tablist" tabIndex={"0"} >
            {
              this.state.query.length>0 ?  this.state.query.map(data =>(<li id="card" key={String(data.id)} role="presentation" tabIndex={"-1"} >
            <a href="#" onClick={this.justCall.bind(this)} data-id={String(data.name)} role="tab" tabIndex={"0"}  > <h4>{String(data.name)}</h4> <p>Distance <span>{parseInt(parseInt(data.location.distance)*0.001)}Kms</span></p>
           </a> </li>)): <h5> Search something</h5>
            }
        </ul>
      </div>
    );
  }
}

export default App;
