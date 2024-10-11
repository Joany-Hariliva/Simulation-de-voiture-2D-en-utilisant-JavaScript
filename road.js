class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x; // Position horizontale du centre de la route
        this.width = width; // Largeur totale de la route
        this.laneCount = laneCount; // Nombre de voies sur la route

        this.left = x - width / 2; // Calcul de la position du bord gauche de la route
        this.right = x + width / 2; // Calcul de la position du bord droit de la route

        const infinity = 1000000; // Valeur utilisée pour représenter une grande distance
        this.top = -infinity; // Position du bord supérieur de la route (très loin en haut)
        this.bottom = infinity; // Position du bord inférieur de la route (très loin en bas)

        // Définition des coins de la route
        const topLeft = { x: this.left, y: this.top };
        const topRight = { x: this.right, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom };
        const bottomRight = { x: this.right, y: this.bottom };
        
        // Définition des bordures de la route
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    getLaneCenter(laneIndex) {
        const laneWidth = this.width / this.laneCount; // Calcul de la largeur d'une voie
        return this.left + laneWidth / 2 + 
               Math.min(laneIndex, this.laneCount - 1) * laneWidth; // Calcul de la position centrale d'une voie
    }

    draw(ctx) {
        ctx.lineWidth = 5; // Largeur des lignes dessinées
        ctx.strokeStyle = "white"; // Couleur des lignes dessinées

        // Dessin des lignes de séparation des voies
        for (let i = 1; i <= this.laneCount - 1; i++) {
            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount
            );
            
            ctx.setLineDash([20, 20]); // Définition du style de ligne en pointillés
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
        
        ctx.setLineDash([]); // Réinitialisation du style de ligne

        // Dessin des bordures de la route
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }
}
