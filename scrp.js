// Variables de donación y meta
let donaciones = {
    educacion: 0,
    salud: 0,
    alimentacion: 0
};

// Actualización del contador animado
function actualizarContador() {
    const organizacionSeleccionada = document.getElementById("organizacion").value;
    const montoAcumulado = donaciones[organizacionSeleccionada];
    document.getElementById("contador-recaudado").textContent = montoAcumulado.toFixed(2);
}

// Configuración del gráfico de donaciones
const ctx = document.getElementById("graficoDonaciones").getContext("2d");
const grafico = new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Educación", "Salud", "Alimentación"],
        datasets: [
            {
                label: "Distribución de Donaciones",
                data: [0, 0, 0], // Inicialmente en cero
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

    // Obtener la organización seleccionada
    const organizacionSeleccionada = document.getElementById("organizacion").value;

    // Sumar la donación a la organización seleccionada
    donaciones[organizacionSeleccionada] += monto;

    // Actualizar el contador
    actualizarContador();

    // Actualizar gráfico de donaciones
    const totalDonaciones = donaciones.educacion + donaciones.salud + donaciones.alimentacion;
    const porcentajeEducacion = (donaciones.educacion / totalDonaciones) * 100;
    const porcentajeSalud = (donaciones.salud / totalDonaciones) * 100;
    const porcentajeAlimentacion = (donaciones.alimentacion / totalDonaciones) * 100;

    grafico.data.datasets[0].data = [porcentajeEducacion, porcentajeSalud, porcentajeAlimentacion];
    grafico.update();

    // Limpiar el campo del formulario
    document.getElementById("form-donacion").reset();
}
