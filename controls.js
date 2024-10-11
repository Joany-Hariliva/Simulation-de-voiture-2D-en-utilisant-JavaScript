class Controls {
    constructor() {
        // Initialisation des états des contrôles
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        this.#addKeyboardListeners(); // Ajout des écouteurs d'événements pour le clavier
    }

    #addKeyboardListeners() {
        // Écouteur pour les touches enfoncées
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true; // Active le contrôle gauche
                    break;
                case "ArrowRight":
                    this.right = true; // Active le contrôle droit
                    break;
                case "ArrowUp":
                    this.forward = true; // Active le contrôle avant
                    break;
                case "ArrowDown":
                    this.reverse = true; // Active le contrôle arrière
                    break;
            }
        }

        // Écouteur pour les touches relâchées
        document.onkeyup = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = false; // Désactive le contrôle gauche
                    break;
                case "ArrowRight":
                    this.right = false; // Désactive le contrôle droit
                    break;
                case "ArrowUp":
                    this.forward = false; // Désactive le contrôle avant
                    break;
                case "ArrowDown":
                    this.reverse = false; // Désactive le contrôle arrière
                    break;
            }
        }
    }
}
