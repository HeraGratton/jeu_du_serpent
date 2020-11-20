
document.addEventListener("DOMContentLoaded", function(event) {

//Le .s sont en lien avec le snap.svg

//Le jeu
class Jeu {
    constructor(_idSvg, _idPointage) {
        console.log("Création du jeu");
        this.s = Snap(_idSvg);
        this.sortiePointage =  document.querySelector(_idPointage);

        this.grandeurCarre = 20;
        this. grandeurGrille = 15;
    }

    nouvellePartie() {
        this.finPartie();
        this.affichagePointage(1);

        this.pomme = new Pomme(this);
        this. serpent = new Serpent(this);
    }

    finPartie() {
        if(this.pomme !== undefined) {
            this.pomme.supprimerPomme();
            this.pomme = undefined;
        }

        if(this.serpent !== undefined) {
            this.serpent.supprimeSerpent();
            this.serpent = undefined;
        }

    }

    affichagePointage(_lePointage) {
        this.sortiePointage.innerHTML = _lePointage;
    }
}

//Le serpent
class Serpent {
    constructor(_leJeu) {
        console.log("Création du serpent");

        this.leJeu = _leJeu;

        this.currentX = -1;
        this.currentY = 0;
        this.nextMoveX = 1;
        this.nextMoveY = 0;

        //Longueur du serpent
        this.serpentLongueur = 1;
        this.tableauCarreSerpent = [];

        this.touche = false;

        this.vitesse = 250;
        this.timing = setInterval(this.controleSerpent.bind(this), this.vitesse);

        //Bind permet que le this reste dans le contexte vu que le document est celui qui appelle verifTouche via un Event, donc sans le .bind, une erreur se produit
        document.addEventListener("keydown", this.verifTouche.bind(this))
    }

    verifTouche(_evt){
        var evt = _evt;

        console.log(evt.keyCode);
        this.deplacement(evt.keyCode);
    }

    deplacement(dirCode) {
        switch(dirCode) {
            case 37:
                this.nextMoveX = -1;
                this.nextMoveY = 0;
                break;
            case 38:
                this.nextMoveX = 0;
                this.nextMoveY = -1;
                break;
            case 39:
                this.nextMoveX = 1;
                this.nextMoveY = 0;
                break;
            case 40:
                this.nextMoveX = 0;
                this.nextMoveY = 1;
                break;
        }

        //console.log(this.nextMoveX, this.nextMoveY);
    }

    controleSerpent() {
        var nextX = this.currentX + this.nextMoveX;
        var nextY = this.currentY + this.nextMoveY;

        //Vérifier si touche à lui-même
        this.tableauCarreSerpent.forEach(function(element) {
            if(nextX === element[1] && nextY === element[2]) {
                console.log("Touche moi-même!");
                this.leJeu.finPartie();
                this.touche = true;
            }
        }.bind(this));

        //Vérifier si touche limites du contour
        if(nextY < 0 || nextX < 0 || nextY > this.leJeu.grandeurGrille-1 || nextX > this.leJeu.grandeurGrille-1) {
            console.log("Touche limite!");
            this.leJeu.finPartie();
            this.touche = true;
        }

        if(!this.touche) {
            if(this.currentX === this.leJeu.pomme.pomme[1] && this.currentY === this.leJeu.pomme.pomme[2]) {
                this.serpentLongueur++;

                this.leJeu.affichagePointage(this.serpentLongueur);
                this.leJeu.pomme.supprimerPomme();
                this.leJeu.pomme.ajoutePomme();
            }

            this.dessineCarre(nextX, nextY);
            this.currentX = nextX;
            this.currentY = nextY;
        }
    }

    dessineCarre(x, y) {
        var unCarre = [this.leJeu.s.rect(x * this.leJeu.grandeurCarre, y * this.leJeu.grandeurCarre, this.leJeu.grandeurCarre, this.leJeu.grandeurCarre), x, y];
        this.tableauCarreSerpent.push(unCarre);
        if(this.tableauCarreSerpent.length > this.serpentLongueur) {
            this.tableauCarreSerpent[0] [0].remove();
            this.tableauCarreSerpent.shift();
        }
    }

    supprimeSerpent() {
        //Arrêter de vérifier s'il touche lui-même
        clearInterval(this.timing);

        while(this.tableauCarreSerpent.length > 0) {
            this.tableauCarreSerpent[0] [0].remove();
            this.tableauCarreSerpent.shift();
        }
    }

}

//La pomme
class Pomme {
    constructor(_leJeu) {
        console.log("Création de la pomme");

        this.leJeu = _leJeu;
        this.pomme = [];
        this.ajoutePomme();
    }

    ajoutePomme() {
        var posX = Math.floor( Math.random() * this.leJeu.grandeurGrille );
        var posY = Math.floor( Math.random() * this.leJeu.grandeurGrille );

        //Faire un carré représentant la pomme
        this.pomme = [this.leJeu.s.rect(posX * this.leJeu.grandeurCarre, posY * this.leJeu.grandeurCarre, this.leJeu.grandeurCarre, this.leJeu.grandeurCarre).attr({fill: 'red'}), posX, posY];
    }

    supprimerPomme() {
        //Le 0 entre les crochets représente l'élément de la pomme
        this.pomme[0].remove();
    }
}

var unePartie = new Jeu("#jeu", "#pointage");
    var btnJouer = document.querySelector("#btnJouer");
    btnJouer.addEventListener('click', nouvellePartie);

    //Fait référence à nouvellePartie qui se trouve dans le class Jeu
    function nouvellePartie() {
        unePartie.nouvellePartie();
    }

});