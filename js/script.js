
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
        this. serpent = new Serpent();
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
    constructor() {
        console.log("Création du serpent");
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