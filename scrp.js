// Variables de donación y meta
let donaciones = {
    educacion: 0,
    salud: 0,
    alimentacion: 0,
};

// Configuración inicial del gráfico
const ctx = document.getElementById("graficoDonaciones").getContext("2d");
const grafico = new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Educación", "Salud", "Alimentación"],
        datasets: [
            {
                data: [0, 0, 0],
                backgroundColor: ["#FFD700", "#4CAF50", "#FF5733"],
                borderWidth: 1,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    },
});

// Registrar donación
function registrarDonacion(event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    const monto = parseFloat(document.getElementById("monto").value.replace(/,/g, ''));
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingresa un monto válido.");
        return;
    }

    // Obtener la organización seleccionada
    const organizacionSeleccionada = document.getElementById("organizacion").value;

    // Actualizar el total de donaciones para la organización seleccionada
    donaciones[organizacionSeleccionada] += monto;

    // Actualizar el gráfico y las barras de porcentajes
    actualizarGrafico();
    actualizarBarras();

    // Limpiar el formulario
    document.getElementById("form-donacion").reset();
}

// Actualizar gráfico de donaciones
function actualizarGrafico() {
    const totalDonaciones = donaciones.educacion + donaciones.salud + donaciones.alimentacion;

    grafico.data.datasets[0].data = [
        donaciones.educacion,
        donaciones.salud,
        donaciones.alimentacion,
    ];

    grafico.update();
}

// Actualizar las barras de porcentajes
function actualizarBarras() {
    const totalDonaciones = donaciones.educacion + donaciones.salud + donaciones.alimentacion;

    const porcentajeEducacion = totalDonaciones
        ? ((donaciones.educacion / totalDonaciones) * 100).toFixed(2)
        : 0;
    const porcentajeSalud = totalDonaciones
        ? ((donaciones.salud / totalDonaciones) * 100).toFixed(2)
        : 0;
    const porcentajeAlimentacion = totalDonaciones
        ? ((donaciones.alimentacion / totalDonaciones) * 100).toFixed(2)
        : 0;

    document.getElementById("porcentaje-educacion").textContent = `${porcentajeEducacion}%`;
    document.getElementById("porcentaje-salud").textContent = `${porcentajeSalud}%`;
    document.getElementById("porcentaje-alimentacion").textContent = `${porcentajeAlimentacion}%`;
}



