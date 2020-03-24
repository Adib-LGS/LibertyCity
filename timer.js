class Timer {
    constructor(min, sec) {
        this.countdownTexte = document.getElementById("countdown");
        this.validerButton = document.querySelector("#button-valider");
        this.stopTimerButton = document.querySelector("#stop");
        //this.startingMinutes = 20; //les 20 min de Départ du Timer
        this.time = (min * 60) + sec; //Obtenir toutes les secondes des 20min (1200 Seconds)
    }

    /* Mise en place du Counter*/
    setCountdown() {
        this.intervalId2 = setInterval(() => {

            const minutes = Math.floor(this.time / 60); //RECUPERE TTES LES SECONDES ET ON / PAR 60 PR RECUPERER LES MINUTES, PUI SON ARRONDIS LES DECIMALES AVEC MATH.FLOOR
            let seconds = this.time % 60; //RECUPERE LE RESTE DES SECONDES AVEC OPERATEUR MODULO

            if (seconds < 10) {//AFFICHER UN '0' AVEC LA SECONDE SI < 10secondes---
                seconds = '0' + seconds;
            } 
            this.time--;
            if (this.time < 0) { //EMPECHE DÉCOMPTE NOMBRE NEGATIF   
                this.time = 0; 
            } 
            sessionStorage.setItem('Seconds', seconds);
            sessionStorage.setItem('Minutes', minutes);
            //Utiliser le sessionStorage pr afficher data station.adress de map.js
            this.countdownTexte.innerHTML = `<p>Vélo réservé a la station` + " " + sessionStorage.getItem("stationAddress") + " " + `par: ` + " " + localStorage.getItem("Nom") + " " + localStorage.getItem("Prenom") + ",<br> " + `Temps restant:` + " " +  sessionStorage.getItem('Minutes') + ':' + sessionStorage.getItem('Seconds') + " " + `Bonne jounée !</p>`;
        }, 1000);
    }

    /* Départ du Counter Initial (Commencer une nvl Resa a 20min Uniquement)*/
    startCountdown() {
        this.validerButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.time = 20 * 60; //Remet le counter a 20 min
            clearInterval(this.intervalId2);
            this.setCountdown();
            this.countdownTexte.style.visibility = "visible";
            this.stopTimerButton.style.visibility = "visible";
        });
    }

    /* Annulation du Counter*/
    stopCountDown() {
        this.stopTimerButton.addEventListener("click", (e) => {
            e.preventDefault();
            clearInterval(this.intervalId2);
            sessionStorage.clear();
            this.countdownTexte.style.visibility = "hidden";
            this.stopTimerButton.style.visibility = "hidden";
        });
    }

    /* Repartir avec les data Storage pour éviter de revenir a 20:00min Uniquement(Voir Main.js)*/
    start(){
        clearInterval(this.intervalId2);
            this.setCountdown();
            this.countdownTexte.style.visibility = "visible";
            this.stopTimerButton.style.visibility = "visible";
    }
}