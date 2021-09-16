const tarjeta = document.querySelector('#tarjeta');
const btnAbrirFormulario = document.querySelector('#btn-abrir-formulario');
const formulario = document.querySelector('#formulario-tarjeta');
const numeroTarjeta = document.querySelector('#tarjeta .numero');
const nombreTarjeta = document.querySelector('#tarjeta .nombre');
const logoMarca = document.querySelector('#logo-marca');
const firma = document.querySelector('#tarjeta .firma p');
const mesExpiracion = document.querySelector('#tarjeta .mes');
const yearExpiracion = document.querySelector('#tarjeta .year');
const ccv = document.querySelector('#tarjeta .ccv');
const btnEnviar = document.querySelector('.btn-enviar');


const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')){
		tarjeta.classList.remove('active');
	}
}

//Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

//Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');
});

//Select del mes generado dinamicamente.
for(let i = 1; i <= 12; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

//Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 8; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

//Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	.replace(/\s/g, '')
	.replace(/\D/g, '')
	.replace(/([0-9]{4})/g, '$1 ')
	.trim();

	numeroTarjeta.textContent = valorInput;

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';
	}

	mostrarFrente();
});

//Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'Carlos Lopez';
	}

	mostrarFrente();
});

//Select mes
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
	mostrarFrente();
});

//Select Año
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);
	mostrarFrente();
});

//CCV
formulario.inputCCV.addEventListener('keyup', () => {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	.replace(/\s/g, '')
	.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
});



