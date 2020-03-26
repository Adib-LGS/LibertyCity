class Slider {
  constructor() {
    this.slide = document.getElementsByClassName("slide"); //Récupération des IMG ds la class .slide
    this.counterImg = 0; //Compteur d'Image pour le Slider
    this.nextImg = -100 * (this.slide.length - 1); //Ajustement des width IMG en %  permet défilement IMG
    this.playSlider = true; //Sert pour lancer le Slider Automatiquement
    this.buttonNext = document.getElementById("next-slide"); //Recuperation des Bouttons ds le DOM
    this.buttonPrev = document.getElementById("prev-slide");
    this.buttonPlay = document.getElementById("play-slide");
  }

  /* Texte dans l'incone Play/pause*/
  playSlide() {
    if ((this.playSlider)) {
      this.buttonPlay.innerText = "Lecture";
      this.playSlider = false;
      //lancement de l'Interval
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 5000);

    } else {
      this.buttonPlay.innerText = "Pause";
      this.playSlider = true;
      //relancer l'interval de temps
      clearInterval(this.intervalId);
    }
  }

  /* Evenement des Bouttons*/
  buttonEvents() {
    this.buttonNext.addEventListener("click", () => this.nextSlide());
    this.buttonPrev.addEventListener("click", () => this.prevSlide());
    this.buttonPlay.addEventListener("click", () => this.playSlide());
    document.addEventListener("keydown", e => this.keyboardEvent(e));
  }

  /* Defilement des Slides*/
  nextSlide() {
    if (this.playSlider) {
      if (this.counterImg > this.nextImg) {
        this.counterImg = this.counterImg - 100;
        //les IMG défilent de -100%
      } else {
        this.counterImg = 0;
        //Retour a la 1ére IMG a 0%
      }
      for (let i in this.slide) {
        this.slide.item(i).style.left = this.counterImg + "%";
      }
    }
  }

  prevSlide() {
    if (this.playSlider) {
      if (this.counterImg < 0) {
        this.counterImg = this.counterImg + 100;
      } else {
        this.counterImg = -200;
        //les IMG défilent de -200% pour atteindre la (3iéme est derniére IMG)
      }
      for (let i in this.slide) {
        this.slide.item(i).style.left = this.counterImg + "%";
      }
    }
  }

  /*Evenement Clavier Fléches L/R */
  keyboardEvent(e) {
    const code = e.keyCode;
    if (code === 37) {
      this.prevSlide();
    } else if (code === 39) {
      this.nextSlide();
    }
  }
}

/*Initilisation de class dans main.js*/