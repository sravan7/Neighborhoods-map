(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(t,e,n){},17:function(t,e,n){},19:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),i=n(8),r=n.n(i),c=(n(15),n(2)),l=n(3),s=n(5),u=n(4),d=n(6),p=n(1),m=(n(17),function(t){function e(){return Object(c.a)(this,e),Object(s.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return a.a.createElement("div",{id:"map",role:"application"})}}]),e}(o.Component)),h=function(t){function e(){var t,n;Object(c.a)(this,e);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return(n=Object(s.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(a)))).currentLocation=[],n.state={query:[],mapIsReady:!1,condition:!1,map:{}},n.initMap=function(){var t=document.createElement("script");t.src="https://maps.googleapis.com/maps/api/js?key=".concat("AIzaSyDTB3tbX3dMTxpoxaXHa-VaB0WQqNXAuOA"),t.async=!0,t.defer=!0,t.addEventListener("load",function(){n.setState({mapIsReady:!0})}),document.body.appendChild(t)},n.buildMap=function(){var t=window.google,e=Object(p.a)(Object(p.a)(n)),o=new t.maps.LatLngBounds,a=new t.maps.InfoWindow,i=new t.maps.Map(document.getElementById("map"),{center:{lat:e.currentLocation[0].lat,lng:e.currentLocation[0].lng},mapTypeControl:!0,mapTypeControlOptions:{style:t.maps.MapTypeControlStyle.HORIZONTAL_BAR,position:t.maps.ControlPosition.RIGHT_BOTTOM},zoom:11,zoomControlOptions:{position:t.maps.ControlPosition.RIGHT_CENTER},streetViewControlOptions:{position:t.maps.ControlPosition.RIGHT_CENTER}});function r(t){a.marker!==t?(a.marker=t,a.setContent("<div>"+t.title+"</div>"),a.open(i,t)):a.addListener("closeclick",function(){a.marker=null})}function c(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(e){i.setCenter(new t.maps.LatLng(e.location.lat,e.location.lng));var a=new t.maps.Marker({position:{lat:e.location.lat,lng:e.location.lng},map:i,title:e.name,icon:{url:n},animation:t.maps.Animation.DROP,id:e.location.id});return a.addListener("click",function(){r(a)}),o.extend(a.position),a}}c({location:{lat:e.currentLocation[0].lat,lng:e.currentLocation[0].lng,id:"1"},name:"your location"},"http://maps.google.com/mapfiles/ms/icons/blue-dot.png");var l=[];return n.state.query.length>0&&(l=n.state.query.map(c)),function(t){l.length>0&&(l.filter(function(e){return e.title===t}).map(r),i.fitBounds(o))}},n.getData=function(t){if("Enter"===t.key&&n.currentLocation.length>0){var e=Object(p.a)(Object(p.a)(n)),o=n.currentLocation[0].lat,a=n.currentLocation[0].lng;fetch("".concat("https://api.foursquare.com/v2/venues/search","?client_id=").concat("WVUL2XKHDR5KGZR1QUCEWPFCLX2MDEG3CMYGRB433X1YDT2J","&client_secret=").concat("Z0D12P1T5LAYCUDPHSPVKF5SEHWUAKM2KAJORQFCDXE2YDKZ","&v=20180323&limit=10&ll=").concat(o,",").concat(a,"&query=").concat(t.target.value)).then(function(t){return t.json()}).then(function(t){e.setState({query:t.response.venues})}).catch(function(t){return document.alert(t+"error in fetching the data")})}},n}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.initMap()}},{key:"componentDidUpdate",value:function(){var t=null,e=null,n=this;navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(o){t=o.coords.latitude,e=o.coords.longitude,n.currentLocation.push({lat:t,lng:e}),n.state.mapIsReady&&n.buildMap()},function(t){console.error("(".concat(t.code,"): ").concat(t.message))},{enableHighAccuracy:!0,maximumAge:0})}},{key:"handle",value:function(){this.setState({condition:!this.state.condition})}},{key:"justCall",value:function(t){this.buildMap()(t.currentTarget.dataset.id)}},{key:"render",value:function(){var t=this;return a.a.createElement("div",{className:"App"},this.state.mapIsReady?a.a.createElement(m,null):a.a.createElement("h2",null,"Cant able to load the map"),a.a.createElement("div",{id:"search"},a.a.createElement("input",{id:"searchField",type:"text",placeholder:"coffee or chicken or Newyork ",onKeyPress:function(e){return t.getData(e)},"aria-label":"search field",tabIndex:"1"})),a.a.createElement("button",{onClick:this.handle.bind(this),tabIndex:"1","arira-label":"toggle list"},"\u2630"),a.a.createElement("ul",{className:"cardList",id:this.state.condition?"menu-hidden":"",role:"tablist"},this.state.query.length>0?this.state.query.map(function(e){return a.a.createElement("li",{id:"card",key:String(e.id),role:"presentation",tabIndex:"-1"},a.a.createElement("a",{href:"#",onClick:t.justCall.bind(t),"data-id":String(e.name),role:"tab",tabIndex:"1"}," ",a.a.createElement("h4",null,String(e.name))," ",a.a.createElement("p",null,"Distance ",a.a.createElement("span",null,parseInt(.001*parseInt(e.location.distance)),"Kms")))," ")}):a.a.createElement("h5",null," Search something")))}}]),e}(o.Component),f=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function g(t,e){navigator.serviceWorker.register(t).then(function(t){t.onupdatefound=function(){var n=t.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),e&&e.onUpdate&&e.onUpdate(t)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(t)))})}}).catch(function(t){console.error("Error during service worker registration:",t)})}r.a.render(a.a.createElement(h,null),document.getElementById("root")),function(t){if("serviceWorker"in navigator){if(new URL("/Neighborhoods-map",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/Neighborhoods-map","/service-worker.js");f?(function(t,e){fetch(t).then(function(n){var o=n.headers.get("content-type");404===n.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then(function(t){t.unregister().then(function(){window.location.reload()})}):g(t,e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e,t),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):g(e,t)})}}()},9:function(t,e,n){t.exports=n(19)}},[[9,2,1]]]);
//# sourceMappingURL=main.04753435.chunk.js.map