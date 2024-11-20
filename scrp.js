// Variables de donación y meta
let cantidadRecaudada = 0; // Monto inicial
const meta = 1000; // Meta de donaciones

// Actualización del contador animado
function actualizarContador() {
    const incremento = Math.random() * 10; // Simula una donación aleatoria
    cantidadRecaudada = Math.min(cantidadRecaudada + incremento, meta); // Evita que supere la meta
    document.getElementById("contador-recaudado").textContent = $${cantidadRecaudada.toFixed(2)};

    if (cantidadRecaudada < meta) {
        setTimeout(actualizarContador, 100); // Actualiza cada 100ms
    } else {
        document.getElementById("contador-recaudado").style.color = "#4CAF50"; // Cambia el color al completar la meta
    }
}

// Iniciar contador
actualizarContador();

// Configuración del gráfico de donaciones
const ctx = document.getElementById("graficoDonaciones").getContext("2d");
const grafico = new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Educación", "Salud", "Alimentación"],
        datasets: [
            {
                label: "Distribución de Donaciones",
                data: [40, 35, 25], // Porcentajes iniciales
                backgroundColor: ["#FFD700", "#4CAF50", "#FF5733"],
                borderWidth: 1,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    },
});

// Registrar donación
function registrarDonacion(event) {
    event.preventDefault(); // Evitar que el formulario se envíe y recargue la página

    const monto = parseFloat(document.getElementById("monto").value);
    
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
    }

    // Actualizar la cantidad recaudada
    cantidadRecaudada += monto;
    document.getElementById("contador-recaudado").textContent = $${cantidadRecaudada.toFixed(2)};

    // Actualizar gráfico de donaciones (simulando cambios)
    const porcentaje = (cantidadRecaudada / meta) * 100;
    if (porcentaje < 100) {
        grafico.data.datasets[0].data = [porcentaje * 0.4, porcentaje * 0.35, porcentaje * 0.25];
        grafico.update();
    } else {
        grafico.data.datasets[0].data = [40, 35, 25];
        grafico.update();
        alert("¡Gracias por tu donación! Hemos alcanzado nuestra meta.");
    }

    // Limpiar el campo del formulario
    document.getElementById("form-donacion").reset();
}