class Form {
    constructor() {
        this.myForm = document.getElementById("myForm");
        this.reservationBlock = document.getElementById('reservationBlock');
        this.informationBlock = document.getElementById('informationBlock');
        this.errorForm = document.getElementById("error")
        this.nomForm = document.getElementById("nom");
        this.prenomForm = document.getElementById("prenom");
        this.reservationBtn = document.querySelector("#resaBtn");
        this.validerButton = document.querySelector("#button-valider");
        this.annulerButton = document.querySelector('#button-annuler');
        this.myRegex = /^[a-zA-Z-\s]+$/;
        //Recuperation des data du Formualire
        if((localStorage.getItem(this.nomForm) != null) && (localStorage.getItem(this.prenomForm) != null)) {
            this.nomForm = localStorage.getItem('Nom');
            this.prenomForm = localStorage.getItem('Prenom');
        }
    }

    /* Verification Users Input avec REGEX*/
    formVerification() {
        this.myForm.addEventListener("input", (e) => {
            e.preventDefault();
            if (this.myRegex.test(this.nomForm.value && this.prenomForm.value) == false) {
                this.errorForm.innerHTML = "SVP, veuillez utiliser des lettres et tirets";
                this.errorForm.style.color = 'red';
                this.errorForm.style.display = 'block';
                this.reservationBtn.style.display = 'none';
                //trim() == function qui empeche prise en compte des "espaces" comme valeur ds Formulaire
            } else if ((!this.nomForm.value.trim()) || (!this.prenomForm.value.trim())) {
                this.errorForm.innerHTML = "SVP, veuillez remplir tout les champs";
                this.errorForm.style.color = 'orange';
                this.errorForm.style.display = 'block';
                this.reservationBtn.style.display = 'none';
            } else {
                this.reservationBtn.style.display = 'block';
                this.errorForm.style.display = 'none';
            }
        });
    }

    /* Verifier si le Nom et Prenom User reste enregistrer dans Browser au moment du click Valider*/
    formValidation() {
        this.validerButton.addEventListener("click", (e) => {
            e.preventDefault();
            if ((!localStorage.getItem(this.nomForm.value)) && (!localStorage.getItem(this.prenomForm.vale))) {
                localStorage.setItem('Nom', this.nomForm.value);
                localStorage.setItem('Prenom', this.prenomForm.value);
            } 
            this.reservationBlock.style.display = 'none';
            this.informationBlock.style.display = 'block';
        });
    }

    /* Dispartition des Block et effacement du Storage*/
    formAnnulation() {
        this.annulerButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.reservationBlock.style.display = 'none';
            this.informationBlock.style.display = 'block';
            this.errorForm.style.display = 'none';
            
        });
    }
}