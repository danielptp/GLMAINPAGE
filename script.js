// Función para restaurar el estado de los perfiles de color guardados en localStorage
function restoreSettings() {
    const savedColor = localStorage.getItem('vignetteColor');
    const savedIntensity = localStorage.getItem('vignetteIntensity') || 0.7;
    const savedBgColor = localStorage.getItem('bgcolor') || '#ffcccb';

    if (savedColor) {
        document.getElementById('vignetteColor').value = savedColor;
    }
    document.getElementById('vignetteIntensity').value = savedIntensity;
    document.getElementById('bgcolor').value = savedBgColor;

    // Aplicar los valores restaurados
    document.body.style.backgroundColor = savedBgColor;
    updateVignette();
}

// Función para actualizar el Vignette con los valores actuales
function updateVignette() {
    const vignette = document.querySelector('.vignette');
    const currentColor = document.getElementById('vignetteColor').value;
    const intensity = document.getElementById('vignetteIntensity').value;

    vignette.style.background = `radial-gradient(circle, transparent, ${hexToRgba(currentColor, intensity)} 70%, ${hexToRgba(currentColor, intensity)})`;
}

// Función para convertir hex a rgba
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Guardar las configuraciones cuando se cambian
document.getElementById('vignetteColor').addEventListener('input', function() {
    localStorage.setItem('vignetteColor', this.value);
    updateVignette();
});

document.getElementById('vignetteIntensity').addEventListener('input', function() {
    localStorage.setItem('vignetteIntensity', this.value);
    updateVignette();
});

document.getElementById('bgcolor').addEventListener('input', function() {
    localStorage.setItem('bgcolor', this.value);
    document.body.style.backgroundColor = this.value;
});

// Cargar y mostrar una frase aleatoria
function loadRandomQuote() {
    fetch('quotes.json')
        .then(response => response.json())
        .then(quotes => {
            const quoteElement = document.getElementById('quote');
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteElement.textContent = randomQuote;
        })
        .catch(error => console.error('Error al cargar las frases:', error));
}


// Restaurar configuración y cargar frase al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    restoreSettings();
    loadRandomQuote();
});

// Función para alternar el menú
function toggleMenu() {
    document.getElementById('menu').classList.toggle("open-menu");
}
