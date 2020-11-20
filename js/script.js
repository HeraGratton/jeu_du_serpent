
document.addEventListener("DOMContentLoaded", function(event) {

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

        this.dessineCarre(nextX, nextY);
        this.currentX = nextX;
        this.currentY = nextY;
    }

    dessineCarre(x, y) {

    }

    supprimeSerpent() {

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