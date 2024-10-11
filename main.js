// Sélectionne l'élément canvas dans le document HTML
const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight; // Définit la hauteur du canvas à la hauteur de la fenêtre
canvas.width = 200; // Définit la largeur du canvas à 200 pixels

// Obtient le contexte 2D du canvas pour dessiner
const ctx = canvas.getContext("2d");

// Crée une nouvelle instance de la classe Road
const road = new Road(canvas.width / 2, canvas.width * 0.9);

// Crée une nouvelle instance de la classe Car
const car = new Car(road.getLaneCenter(1), 100, 30, 50);
car.draw(ctx); // Dessine la voiture sur le canvas

// Fonction d'animation pour mettre à jour et redessiner la scène
animate();
function animate() {
    car.update(); // Met à jour la position de la voiture

    canvas.height = window.innerHeight; // Réinitialise la hauteur du canvas pour effacer l'ancien dessin

    ctx.save(); // Sauvegarde l'état actuel du contexte
    ctx.translate(0, -car.y + canvas.height * 0.7); // Déplace le contexte pour suivre la voiture

    road.draw(ctx); // Dessine la route
    car.draw(ctx); // Dessine la voiture

    ctx.restore(); // Restaure l'état précédent du contexte
    requestAnimationFrame(animate); // Demande au navigateur d'appeler cette fonction avant le prochain rafraîchissement
}
