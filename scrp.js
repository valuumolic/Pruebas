let donaciones = {
    educacion: 0,
    salud: 0,
    alimentacion: 0,
};

function cargarDonaciones() {
    const donacionesGuardadas = localStorage.getItem('donaciones');
    if (donacionesGuardadas) {
        donaciones = JSON.parse(donacionesGuardadas);
        actualizarGrafico();
        actualizarBarras();
    }
}

function guardarDonaciones() {
    localStorage.setItem('donaciones', JSON.stringify(donaciones));
}

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

function registrarDonacion(event) {
    event.preventDefault(); 

    const monto = parseFloat(document.getElementById("monto").value.replace(/,/g, ''));
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingresa un monto válido.");
        return;
    }

    const organizacionSeleccionada = document.getElementById("organizacion").value;

    donaciones[organizacionSeleccionada] += monto;

    guardarDonaciones();

    actualizarGrafico();
    actualizarBarras();

    document.getElementById("form-donacion").reset();
}

function actualizarGrafico() {
    const totalDonaciones = donaciones.educacion + donaciones.salud + donaciones.alimentacion;

    grafico.data.datasets[0].data = [
        donaciones.educacion,
        donaciones.salud,
        donaciones.alimentacion,
    ];

    grafico.update();
}

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

window.onload = cargarDonaciones;

