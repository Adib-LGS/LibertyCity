class Map {
  constructor() {
    this.stationData = [];
  }

  /* Setup de la map */
  setMap() {
    this.map = L.map("map").setView([48.77741, 2.45315], 13);
    this.layer = L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 11,
        maxZoom: 19
      }
    ).addTo(this.map);
  }

  /* Traitement Data API Asynchrone
  Avec Résolution de Promise
  */
   loadApi() {
      fetch("https:api.jcdecaux.com/vls/v1/stations?contract=creteil&apiKey=c830f8cc9d106f985a9368a038b44c12c127c37e")
      .then(result => result.json()) //Si résolut le resultat return Objet format JSON
      .then(stationData => {
        this.stationData = stationData; 
        this.setMarker(); //Si tout est OK apl de la func pr création Markers
      })
      //Si erreur dans le code cela va afficher une alerte Client/Side
      .catch(error => alert("ErrorrR in fetch function"));
  }

  /* Setup des markers */
  setMarker() {
    this.markerCluster = L.markerClusterGroup();
    for (let i in this.stationData) {
      //console.log(this.stationData[0]);
      const station = this.stationData[i];

      let imageLink = "marker_blue"; //tout les markers sont blue de base
      if (station.available_bikes > 10 && station.status === "OPEN") {
        imageLink = "marker_green";
      }
      if (station.available_bikes < 10 || station.available_bike_stands < 10) {
        imageLink = "marker_orange";
      } else if (station.available_bikes <= 0 || station.status === "CLOSE") {
        imageLink = "marker_red";
      }

      //Stock l'URL img et la Size des markers
      const markerIcon = L.icon({
        iconUrl: `img/${imageLink}.png`,
        iconSize: [20, 30]
      });
      this.marker = L.marker(station.position, {
        icon: markerIcon
      });
      this.marker.bindPopup(station.name);
      this.markerCluster.addLayer(this.marker);

      this.showInfo(station);
    }
    this.map.addLayer(this.markerCluster);
  }

  /* Setup des info Stations*/
  showInfo(station) {
    this.marker.addEventListener("click", () => {
      fetch("https://api.jcdecaux.com/vls/v3/stations/" + station.number + "?contract=creteil&apiKey=c830f8cc9d106f985a9368a038b44c12c127c37e")
        .then(result => result.json()) //Récuperer l'info de chaque station en temps réel
        .then(json => station); 
      //console.log(station.address);

      //Block Information Station
      const informationBlock = document.getElementById("informationBlock");
      const infoStation = document.getElementById("info-station");
      const reservationBtn = document.getElementById("resaBtn");
      const myForm = document.getElementById("myForm");
      informationBlock.style.display = "block";
      reservationBtn.style.display = 'none';
      myForm.style.display = 'flex';

      //Traduction en FR du status.
      if (station.status === "OPEN") {
        station.status = "Ouvert";
      } else if (station.status === "CLOSE") {
        station.status = "En travaux";
      }

      //Ajout dans l'html des infos Station
      infoStation.innerHTML = `
     <p>Détails de la station:</p>
     <p>Adresse: ${station.address}</p>
     <p>Etat: ${station.status}</p>
     <p>${station.available_bike_stands} :places</p>
     <p>${station.available_bikes} :vélos disponibles</p>`;
      this.setReservationButton(station);
    });
  }

  /* 
  Evenement Button-Reservation
  */
  setReservationButton(station) {
    const reservationBtn = document.querySelector("#resaBtn");
    const infoStation = document.getElementById("info-station");
    reservationBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
    //Pour faire semblant qu'un Vélo est louer pour de vrai :)
    if((!sessionStorage.getItem(station.available_bikes))){
        sessionStorage.setItem('stationVelo', station.available_bikes -1);
        infoStation.innerHTML = `
        <p>Détails de la station:</p>
        <p>Adresse: ${station.address}</p>
        <p>Etat: ${station.status}</p>
        <p>${station.available_bike_stands} :places</p>
        <p><span style='color:red'>`+sessionStorage.getItem("stationVelo")+'</span> ' + ' ' + `:vélos disponibles</p>`;
      }
      //Logic Apparition et disparation des Block InfoStation Form et Button Réserver + Block Reservation
      if (station.available_bikes <= 0 || station.status === "En travaux") {
        informationBlock.style.display = "none";
        myForm.style.display = 'none';
        reservationBtn.style.display = 'none';
        //Récupération ds le sessionStorage de la valeur station.address
      } else if ((!sessionStorage.getItem(station.address))) {
        sessionStorage.setItem('stationAddress', station.address);
        informationBlock.style.display = "none";
        reservationBlock.style.display = "block";
      }
    });
  }
}