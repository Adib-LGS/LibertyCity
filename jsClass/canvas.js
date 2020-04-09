class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.effacerButton = document.querySelector("#effacer");
        this.validerButton = document.querySelector("#button-valider");
        this.context.lineWidth = 3; //La propriété lineWidth définit la largeur de ligne en pixels(ne pas mettre d'unité a la valeur).
        this.isDrawing = false; //sur false de base
    }

    /* Signature a la souris*/
    initMouse() {
        this.canvas.addEventListener("mousedown", (e) => this.start(this.getPositionSouris(e)));
        this.canvas.addEventListener("mouseup", (e) => this.stop());
        this.canvas.addEventListener("mousemove", (e) => this.move(this.getPositionSouris(e)));
    }

    /* Signature Tactile*/ 
    initTouch() {
        this.canvas.addEventListener("touchstart", (e) => {
            e.preventDefault();
            if (e.touches.length > 0) this.start(this.getPositionTouch(e));
        });
        this.canvas.addEventListener("touchend", (e) => this.stop());

        this.canvas.addEventListener("touchmove", (e) => {
            e.preventDefault();
            if (e.touches.length > 0) this.move(this.getPositionTouch(e));
        });
    }

    /* Recuperation de la position du curseur par rapport au Canvas*/
    getPosition(pos) {
        //getBoundingClientRect() renvoie la taille du canvas et sa position par rapport au viewport.
        const canvas = this.canvas.getBoundingClientRect();
        const x = (pos.x - canvas.left) / (canvas.right - canvas.left) * this.canvas.width; //récupère la position exacte de la souris (position X)
        const y = (pos.y - canvas.top) / (canvas.bottom - canvas.top) * this.canvas.height;
        return {
            x,
            y
        };
    }

    /* Récupere position au click*/
    getPositionSouris(e) {
        return this.getPosition({
            x: e.clientX,
            y: e.clientY,
        });
    }

    /* Récupere position au touché*/
    getPositionTouch(e) {
        return this.getPosition({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        });
    }

    start(position) {
        const { x, y } = position;
        this.context.moveTo(x, y); //1er Point de départ
        //Nouveau dessin
        this.context.beginPath(); //Début d'un nouveau tracé
        this.isDrawing = true;
    }

    stop() {
        this.isDrawing = false;
        this.validerButton.style.display = 'block';
    }

    /* Gére le mouvement du dessin*/
    move(position) {
        if (this.isDrawing) {
            const {x, y } = position;
            this.context.lineTo(x, y); //Suite du point de depart moveTo()
            this.context.stroke();//Function stroke qui permet de tracer la ligne
        }
    }
    
    /* Effacement de la Signature*/
    clearCanvas() {
        this.effacerButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.validerButton.style.display = 'none';
            //0 = décalage gauche Canvas, 0 = décalage Top idem, width && height du rectangle a effacer
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        });
    }
}