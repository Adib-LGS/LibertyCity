/* Initialisation de Slider */
const slides = new Slider();
slides.buttonEvents(); 
slides.intervalId = setInterval(() => { 
    slides.nextSlide()
}, 5000);

/* Initialisation de la Map*/
const map2 = new Map();
map2.setMap(); 
map2.loadApi(); 

/* Initialisation du formulaire */
const form2 = new Form();
form2.formVerification();
form2.formValiderDataUser();
form2.formRecupererDataUser();
form2.formValidation();
form2.formAnnulation();

/* Initialisation Canvas*/
const canvas2 = new Canvas();
canvas2.initMouse();
canvas2.initTouch();
canvas2.clearCanvas();

/* Initialisation Timer*/
//On impopse Min et Sec au Timer
let minute = 20;
let seconde = 0; 

// L'orsque je refresh la page je regarde ce qu'il y a en storage + reprend l'affichage si pas de minute et sec stocké = Aucune reservation = Aucun décompte
if((sessionStorage.getItem('Minutes') != null)  && (sessionStorage.getItem('Seconds') != null)){
    minute = Number(sessionStorage.getItem('Minutes'));
    seconde = Number(sessionStorage.getItem('Seconds'));
}

const timer2 = new Timer(minute,seconde);
if((sessionStorage.getItem('Minutes') != null)  && (sessionStorage.getItem('Seconds') != null)){
    timer2.intervalId2 = setInterval(() => { 
        timer2.start(); //Le counter part tt de suite 
        timer2.startCountdown();//Prend en compte l'evenement sur le bouton qui refait un apl au counter
    }, 1000);
        timer2.stopCountDown();
} else { //En attente du click sur l'evenement ds startCountdown
    timer2.intervalId2 = setInterval(() => { 
        timer2.startCountdown();
        }, 1000);
        timer2.stopCountDown();
}