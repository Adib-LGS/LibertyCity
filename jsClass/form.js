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
            } else {
                this.reservationBtn.style.display = 'inline-block';
                this.errorForm.style.display = 'none';
            }   
        });
    }

    /* Enregiste le Nom et Prenom de L'utilisateur */
    formValiderDataUser(){
        this.reservationBtn.addEventListener("click", (e) =>{
        e.preventDefault(); 
        if((!localStorage.getItem('nom'))&&(!localStorage.getItem('prenom'))) {
                localStorage.setItem('Nom', this.nomForm.value);
                localStorage.setItem('Prenom', this.prenomForm.value);
            }
        });
    }

    /* Recupere le Nom et Prenom dans formValiderData et le colle dans le Formulaire*/
    formRecupererDataUser(){
        this.myForm.addEventListener("click", (e) => {
            e.preventDefault();
            if((localStorage.getItem('Nom'))&&(localStorage.getItem('Prenom'))) {
                this.nomForm.value = localStorage.getItem('Nom');
                this.prenomForm.value = localStorage.getItem('Prenom'); 
                this.reservationBtn.style.display = 'inline-block';
            } 
        });
    }

    /* Refait apparaite le Block d'info et fait disparaitre le Canvas*/
    formValidation() {
        this.validerButton.addEventListener("click", (e) => {
            e.preventDefault();
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
