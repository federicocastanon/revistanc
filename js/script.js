$(document).ready(function() {

	$('#logoNC').click(function() {
		window.location.href = "index.html";
	});
	$('#logoVerticalNC').click(function() {
		window.location.href = "index.html";
	});
	$('#logoAfidi').click(function() {
		window.open("http://www.afidi.com.ar/", '_blank');
	});
	$('#logoItineris').click(function() {
		window.open("http://www.itineris.org.ar/", '_blank');
	});
	var a = window.location.toString();
	var name = a.indexOf("suscripcion");
	if (name > 0) {
		$("#accordion").accordion({
			active : false,
			heightStyle : "content",
			collapsible : true
		});
	}
});
function mandarDatosSuscripcion() {
var nombre = $('#nombre').val();
	var telefono = $('#telefono').val();
	var mail = $('#mail').val();
	var dir = $('#dir').val();
	var susc = $('#susc').val();
	var hasError = false;
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	$(".error").hide();

	if (nombre == '') {
		$("#nombre").after('<span class="error">No olvide ingresar su nombre</span>');
		hasError = true;
	}
	if (dir == '') {
		$("#dir").after('<span class="error">No olvide ingresar su dirección</span>');
		hasError = true;
	}
	if (susc == '' || susc == '0') {
		$("#susc").after('<span class="error">No olvide seleccionar el año al que desea suscribirse</span>');
		hasError = true;
	}

	if (mail == '') {
		$("#mail").after('<span class="error">No olvide ingresar su correo electrónico</span>');
		hasError = true;
	} else if (!emailReg.test(mail)) {
		$("#mail").after('<span class="error">Es importante que ingrese una direccion de correo v&aacute;lida para que podamos ponernos en contacto con usted</span>');
		hasError = true;
	}
	var regex = /[0-9]|\./;

	if (telefono != '' && !regex.test(telefono)) {
		$("#telefono").after('<span class="error">Solo ponga n&uacute;meros en su teléfono!</span>');
		hasError = true;
	}

	if (hasError) {
		return false;
	}
	var html = nombre + ' cuyo teléfono es ' + telefono + ' se suscribió al año ' + susc + '. Su correo es ' + mail + ' y la dirección que ingreso fue: ' + dir;
	mandarMail(html, nombre, mail, 'Sus datos fueron enviados, a la brevedad nos pondremos en contacto', 'Ocurrió un error y sus datos no fueron enviados! Por favor intente nuevamente o escribanos un correo a info@revistanc.org.ar');

}

function mandarDatosEjemplar() {
	var nombre = $('#nombre').val();
	var telefono = $('#telefono').val();
	var mail = $('#mail').val();
	var dir = $('#dir').val();
	var ejemplar = $('#ejemplar').val();
	var hasError = false;
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	$(".error").hide();

	if (nombre == '') {
		$("#nombre").after('<span class="error">No olvide ingresar su nombre</span>');
		hasError = true;
	}
	if (dir == '') {
		$("#dir").after('<span class="error">No olvide ingresar su dirección</span>');
		hasError = true;
	}
	if (ejemplar == '' || ejemplar == '0') {
		$("#ejemplar").after('<span class="error">No olvide seleccionar un ejemplar</span>');
		hasError = true;
	}

	if (mail == '') {
		$("#mail").after('<span class="error">No olvide ingresar su correo electrónico</span>');
		hasError = true;
	} else if (!emailReg.test(mail)) {
		$("#mail").after('<span class="error">Es importante que ingrese una direccion de correo v&aacute;lida para que podamos ponernos en contacto con usted</span>');
		hasError = true;
	}
	var regex = /[0-9]|\./;

	if (telefono != '' && !regex.test(telefono)) {
		$("#telefono").after('<span class="error">Solo ponga n&uacute;meros en su teléfono!</span>');
		hasError = true;
	}

	if (hasError) {
		return false;
	}
	var html = nombre + ' cuyo teléfono es ' + telefono + ' compró el ejemplar ' + ejemplar + '. Su correo es ' + mail + ' y la dirección que ingreso fue: ' + dir;
	mandarMail(html, nombre, mail, 'Sus datos fueron enviados, a la brevedad nos pondremos en contacto', 'Ocurrió un error y sus datos no fueron enviados! Por favor intente nuevamente o escribanos un correo a info@revistanc.org.ar');
}

function mandarMensaje() {
	var nombre = $('#nombre').val();
	var organizacion = $('#organizacion').val();
	var telefono = $('#telefono').val();
	var mail = $('#mail').val();
	var consulta = $('#consulta').val();
	var hasError = false;
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	$(".error").hide();

	if (nombre == '') {
		$("#nombre").after('<span class="error">No olvide ingresar su nombre</span>');
		hasError = true;
	}

	if (mail == '') {
		$("#mail").after('<span class="error">No olvide ingresar su correo electrónico</span>');
		hasError = true;
	} else if (!emailReg.test(mail)) {
		$("#mail").after('<span class="error">Es importante que ingrese una direccion de correo v&aacute;lida para que podamos ponernos en contacto con usted</span>');
		hasError = true;
	}
	var regex = /[0-9]|\./;

	if (telefono != '' && !regex.test(telefono)) {
		$("#telefono").after('<span class="error">Solo ponga n&uacute;meros en su teléfono!</span>');
		hasError = true;
	}

	if (hasError) {
		return false;
	}
	var html = nombre + ' que de la organizacion ' + organizacion + ' cuyo teléfono es ' + telefono + ' pregunta: \n' + consulta + '. Su correo es ' + mail;
	mandarMail(html, nombre, mail, 'Su consulta fue enviada, le responderemos a la brevedad', 'Ocurrió un error y su consulta no fue enviada! Por favor intente nuevamente o escribanos un correo a info@revistanc.org.ar');
}

function mandarMail(html, nombre, mail, exito, error) {

	var emailToVal = 'info@revistanc.org.ar';

	$.post("sendemail.php", {
		emailTo : emailToVal,
		emailFrom : mail,
		asunto : 'consulta de ' + nombre,
		cuerpo : html
	}, function(data) {
		if (data == 'enviado') {
			$(".formContacto").before('<div id="muchasGracias"></div><p>' + exito + '</p>');

		} else {
			$(".formContacto").before('<div id="ocurrioError"><h1>Atención!</h1><p>' + error + '</p></div>');
		}
	});
}

