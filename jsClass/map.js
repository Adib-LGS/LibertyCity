class Map {
  constructor() {
    this.stationData = [];
    this.informationBlock = document.getElementById("informationBlock");
    this.reservationBlock = document.getElementById("reservationBlock");
    this.infoStation = document.getElementById("info-station");
    this.reservationBtn = document.getElementById("resaBtn");
    this.myForm = document.getElementById("myForm");
    this.validerButton = document.querySelector("#button-valider");
  }

  /* Setup de la map*/
  setMap() {
    this.map = L.map("map").setView([48.77741, 2.45315], 13);
    this.layer = L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 11,
        maxZoom: 19
      }
    ).addTo(this.map);
  }

  /* Traitement Data API Asynchrone Avec Résolution de Promise*/
   loadApi() {
      fetch('https://api.jcdecaux.com/vls/v1/stations?contract=creteil&apiKey=c830f8cc9d106f985a9368a038b44c12c127c37e')
      .then(result => result.json()) //Si résolut le resultat return Objet format JSON
      .then(stationData => {
        this.stationData = stationData; 
        this.setMarker(); //Si tout est OK apl de la func pr création Markers
      })
      //Si erreur dans le code cela va afficher une alerte Client/Side
      .catch(error => alert("ErrorrR in fetch function"));
  }

  /* Setup des markers*/
    setMarker() {
      this.markerCluster = L.markerClusterGroup();
      for (let i in this.stationData) {
        //console.log(this.stationData[0]);
        const station = this.stationData[i];

        let imageLink = "marker_blue"; 
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
      fetch('https://api.jcdecaux.com/vls/v3/stations/' + station.number + '?contract=creteil&apiKey=c830f8cc9d106f985a9368a038b44c12c127c37e')
        .then(result => result.json()) //Récuperer l'info de chaque station en temps réel
        .then(json => station); 
      //console.log(station.address);

      //Setup des Blocks d'Informations Station
      this.informationBlock.style.display = "block";
      this.reservationBtn.style.display = 'none';
      this.myForm.style.display = 'flex';

      //Traduction en FR du status.
      if (station.status === "OPEN") {
        station.status = "Ouvert";
      } else if (station.status === "CLOSE") {
        station.status = "En travaux";
      }

      //Logic Apparition et disparation des Block InfoStation Formulaire et Button Réserver
      if (station.available_bikes <= 0 || station.status === "En travaux") {
        this.informationBlock.style.display = "none";
        this.myForm.style.display = 'none';
        this.reservationBtn.style.display = 'none';
      } 

      //Ajout dans l'html des infos Station dans le Block Infostation
      this.infoStation.innerHTML = `
     <p>Détails de la station:</p>
     <p>Adresse: ${station.address}</p>
     <p>Etat: ${station.status}</p>
     <p>${station.available_bike_stands} :places</p>
     <p>${station.available_bikes} :vélos disponibles</p>`;

      //Fait apparaitre le Block de Reservation Au click sur le bouton Envoyer du Block Information
      this.reservationBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.informationBlock.style.display = "none";
        this.reservationBlock.style.display = "block";
      });

      this.setValidationButton(station);
    });
  }

  /* Envois des data au click sur Button-Validation*/
  setValidationButton(station) {
    this.validerButton.addEventListener("click", (e) => {
      e.preventDefault();
    //Pour faire semblant qu'un Vélo est louer pour de vrai :)
    if((!sessionStorage.getItem(station.available_bikes))){
        sessionStorage.setItem('stationVelo', station.available_bikes -1);
        this.infoStation.innerHTML = `
        <p>Détails de la station:</p>
        <p>Adresse: ${station.address}</p>
        <p>Etat: ${station.status}</p>
        <p>${station.available_bike_stands} :places</p>
        <p><span style='color:red'>`+sessionStorage.getItem("stationVelo")+'</span> ' + ' ' + `:vélos disponibles</p>`;
      }
    //Récupération ds le sessionStorage de la valeur station.address
    if((!sessionStorage.getItem(station.address))) {
        sessionStorage.setItem('stationAddress', station.address);
      }
    });
  }
}
