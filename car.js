class Car {
    constructor(x, y, width, height) {
        // Initialisation des propriétés de la voiture
        this.x = x; // Position horizontale de la voiture
        this.y = y; // Position verticale de la voiture
        this.width = width; // Largeur de la voiture
        this.height = height; // Hauteur de la voiture

        this.speed = 0; // Vitesse initiale de la voiture
        this.acceleration = 0.2; // Accélération de la voiture
        this.maxSpeed = 3; // Vitesse maximale de la voiture
        this.friction = 0.05; // Friction appliquée à la voiture
        this.angle = 0; // Angle de direction de la voiture

        this.controls = new Controls(); // Création d'une instance de la classe Controls pour gérer les contrôles de la voiture
    }

    update() {
        this.#move(); // Mise à jour de la position de la voiture
    }

    #move() {
        // Gestion de l'accélération et de la décélération
        if (this.controls.forward) {
            this.speed += this.acceleration; // Augmente la vitesse si la touche avant est enfoncée
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration; // Diminue la vitesse si la touche arrière est enfoncée
        }

        // Limitation de la vitesse maximale
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }

        // Application de la friction pour ralentir la voiture
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }

        // Arrêt de la voiture si la vitesse est très faible
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        // Gestion de la direction de la voiture
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1; // Détermine la direction de la rotation
            if (this.controls.left) {
                this.angle += 0.03 * flip; // Tourne à gauche
            }
            if (this.controls.right) {
                this.angle += 0.03 * flip; // Tourne à droite
            }
        }

        // Mise à jour de la position de la voiture en fonction de l'angle et de la vitesse
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    draw(ctx) {
        ctx.save(); // Sauvegarde l'état actuel du contexte
        ctx.translate(this.x, this.y); // Déplace le contexte à la position de la voiture
        ctx.rotate(-this.angle); // Tourne le contexte selon l'angle de la voiture

        ctx.beginPath();
        ctx.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        ); // Dessine un rectangle représentant la voiture
        ctx.fill(); // Remplit le rectangle

        ctx.restore(); // Restaure l'état précédent du contexte
    }
}
