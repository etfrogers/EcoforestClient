var a;
var b;
var c;
var d;
var e;
var f;
var valor;

function set_reg(a, b, c, f, e, d) {
    var valor = document.getElementById(c).value;
    var verif = isNaN(valor);
    if (verif == true) {
        alert(no_numero);
        if (a == 1) {
            document.getElementById(c).value = digitals[b];
        } else if (a == 2) {
            document.getElementById(c).value = analogs[b];
        } else if (a == 3) {
            document.getElementById(c).value = integers[b];
        }
    } else {
        if (valor < e || valor > d) {
            if (a == 1) {
                document.getElementById(c).value = digitals[b];
            } else if (a == 2) {
                document.getElementById(c).value = analogs[b];
            } else if (a == 3) {
                document.getElementById(c).value = integers[b];
            }
            alert(txtlimits);
        } else {
            if (a == 1) {
                var valore = valor;
                var cadena = "idOperacion=2011&dir=" + b + "&num=" + f + "&" + valor;
                $.ajax({
                    type: "POST",
                    url: "../../../../recepcion_datos_4.cgi",
                    data: cadena,
                    async: false,
                }).done(function (data) {
                    var datos1 = data.split("\n");
                    var datos2 = datos1[0].split("=");
                    if (datos2[1] == 0 && datos1[1] == 0) {
                        document.getElementById(c).value = valore;
                        digitals[b] = valore;
                        alert(guardok);
                    } else {
                        document.getElementById(c).value = digitals[b];
                        alert(mensaje_reintentar);
                    }
                }).fail(function () {
                    document.getElementById(c).value = digitals[b];
                    alert(mensaje_reintentar);
                });
            } else if (a == 2) {
                var valore = valor;
                valor = valor * 10;
                if (valor < 0) {
                    valor = 65536 - Math.abs(valor);
                } else {
                    valor = Number(valor);
                }
                valor = valor.toString(16);
                if (valor.length < 4) {
                    if (valor.length == 3) {
                        valor = "0" + valor;
                    } else if (valor.length == 2) {
                        valor = "00" + valor;
                    } else if (valor.length == 1) {
                        valor = "000" + valor;
                    } else {
                        valor = "0000";
                    }
                }
                var cadena = "idOperacion=2012&dir=" + b + "&num=" + f + "&" + valor;
                $.ajax({
                    type: "POST",
                    url: "../../../../recepcion_datos_4.cgi",
                    data: cadena,
                    async: false,
                }).done(function (data) {
                    var datos1 = data.split("\n");
                    var datos2 = datos1[0].split("=");
                    if (datos2[1] == 0 && datos1[1] == 0) {
                        document.getElementById(c).value = valore;
                        analogs[b] = valore;
                        alert(guardok);
                    } else {
                        document.getElementById(c).value = analogs[b];
                        alert(mensaje_reintentar);
                    }
                }).fail(function () {
                    document.getElementById(c).value = analogs[b];
                    alert(mensaje_reintentar);
                });
            } else if (a == 3) {
                var valore = valor;
                if (valor < 0) {
                    valor = 65536 - Math.abs(valor);
                } else {
                    valor = Number(valor);
                }
                valor = valor.toString(16);
                if (valor.length < 4) {
                    if (valor.length == 3) {
                        valor = "0" + valor;
                    } else if (valor.length == 2) {
                        valor = "00" + valor;
                    } else if (valor.length == 1) {
                        valor = "000" + valor;
                    } else {
                        valor = "0000";
                    }
                }
                b = Number(b) + 5001;
                var cadena = "idOperacion=2012&dir=" + b + "&num=" + f + "&" + valor;
                $.ajax({
                    type: "POST",
                    url: "../../../../recepcion_datos_4.cgi",
                    data: cadena,
                    async: false,
                }).done(function (data) {
                    var datos1 = data.split("\n");
                    var datos2 = datos1[0].split("=");
                    if (datos2[1] == 0 && datos1[1] == 0) {
                        document.getElementById(c).value = valore;
                        integers[b - 5001] = valore;
                        alert(guardok);
                    } else {
                        document.getElementById(c).value = integers[b - 5001];
                        alert(mensaje_reintentar);
                    }
                }).fail(function () {
                    document.getElementById(c).value = integers[b - 5001];
                    alert(mensaje_reintentar);
                });
            }
        }
    }
}