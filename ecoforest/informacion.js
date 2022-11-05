digitals = new Array;
integers = new Array;
analogs = new Array;
datos_correctos_mod = new Array;
var cont_err = 0;
var cont = 0;
var timer_repeat;
var primera_carga = 0;
var version = "Easynet Geo 2.14";

function Inicializar() {
    document.getElementById('icono_espera').style.display = "inline";
    document.getElementById("web_version").innerHTML = "Web version: " + version;
    traducir();
    getVariablescgi();
}

function getVariablescgi() {
    window.clearTimeout(timer_repeat);
    di_1();
}

function di_1() {
    var reg_ini = 61;
    var num_reg = 25;
    var digital_ini = Number(reg_ini);
    var cadena = "idOperacion=2001&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("di_1()", 141);
            return;
        } else {
            digitals[61] = datos_correctos[0 + 2];
            digitals[64] = datos_correctos[3 + 2];
            digitals[65] = datos_correctos[4 + 2];
            digitals[85] = datos_correctos[24 + 2];
            cont_err = 0;
            di_2();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("di_1()", 141);
        return;
    });
}

function di_2() {
    var reg_ini = 101;
    var num_reg = 97;
    var digital_ini = Number(reg_ini);
    var cadena = "idOperacion=2001&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("di_2()", 141);
            return;
        } else {
            for (var i = 0; i < 3; i++) {
                var digital = digital_ini + i;
                digitals[digital] = datos_correctos[i + 2];
            }
            digitals[121] = datos_correctos[20 + 2];
            for (var i = 49; i < 53; i++) {
                var digital = digital_ini + i;
                digitals[digital] = datos_correctos[i + 2];
            }
            for (var i = 58; i < 66; i++) {
                var digital = digital_ini + i;
                digitals[digital] = datos_correctos[i + 2];
            }
            digitals[190] = datos_correctos[89 + 2];
            digitals[197] = datos_correctos[96 + 2];
            cont_err = 0;
            di_3();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("di_2()", 141);
        return;
    });
}

function di_3() {
    var reg_ini = 206;
    var num_reg = 62;
    var digital_ini = Number(reg_ini);
    var cadena = "idOperacion=2001&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("di_3()", 141);
            return;
        } else {
            for (var i = 0; i < 6; i++) {
                var digital = digital_ini + i;
                digitals[digital] = datos_correctos[i + 2];
            }
            for (var i = 21; i < 31; i++) {
                var digital = digital_ini + i;
                digitals[digital] = datos_correctos[i + 2];
            }
            for (var i = 41; i < 45; i++) {
                var digital = digital_ini + i;
                digitals[digital] = datos_correctos[i + 2];
            }
            for (var i = 56; i < 57; i++) {
                var digital = digital_ini + i;
                digitals[digital] = datos_correctos[i + 2];
            }
            for (var i = 60; i < num_reg; i++) {
                var digital = digital_ini + i;
                digitals[digital] = datos_correctos[i + 2];
            }
            cont_err = 0;
            en_1();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("di_3()", 141);
        return;
    });
}

function en_1() {
    var reg_ini = 5033;
    var num_reg = 2;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("en_1()", 141);
            return;
        } else {
            for (var i = 0; i < num_reg; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            cont_err = 0;
            en_2();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("en_1()", 141);
        return;
    });
}

function en_2() {
    var reg_ini = 5066;
    var num_reg = 18;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({type: "POST", url: "../../../../recepcion_datos_4.cgi", data: cadena, async: true,}).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("en_2()", 141);
            return;
        } else {
            datos_correctos_mod[0] = parseInt(datos_correctos[0 + 2], 16);
            if (datos_correctos_mod[0] > 32768) {
                integers[65] = datos_correctos_mod[0] - 65536;
            } else {
                integers[65] = datos_correctos_mod[0];
            }
            datos_correctos_mod[16] = parseInt(datos_correctos[16 + 2], 16);
            if (datos_correctos_mod[16] > 32768) {
                integers[81] = datos_correctos_mod[16] - 65536;
            } else {
                integers[81] = datos_correctos_mod[16];
            }
            datos_correctos_mod[17] = parseInt(datos_correctos[17 + 2], 16);
            if (datos_correctos_mod[17] > 32768) {
                integers[82] = datos_correctos_mod[17] - 65536;
            } else {
                integers[82] = datos_correctos_mod[17];
            }
            cont_err = 0;
            en_3();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("en_2()", 141);
        return;
    });
}

function en_3() {
    var reg_ini = 5113;
    var num_reg = 31;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({type: "POST", url: "../../../../recepcion_datos_4.cgi", data: cadena, async: true,}).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("en_3()", 141);
            return;
        } else {
            datos_correctos_mod[0] = parseInt(datos_correctos[0 + 2], 16);
            if (datos_correctos_mod[0] > 32768) {
                integers[112] = datos_correctos_mod[0] - 65536;
            } else {
                integers[112] = datos_correctos_mod[0];
            }
            for (var i = 6; i < 13; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            datos_correctos_mod[30] = parseInt(datos_correctos[30 + 2], 16);
            if (datos_correctos_mod[30] > 32768) {
                integers[142] = datos_correctos_mod[30] - 65536;
            } else {
                integers[142] = datos_correctos_mod[30];
            }
            cont_err = 0;
            en_4();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("en_3()", 141);
        return;
    });
}

function en_4() {
    var reg_ini = 5185;
    var num_reg = 27;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({type: "POST", url: "../../../../recepcion_datos_4.cgi", data: cadena, async: true,}).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("en_4()", 141);
            return;
        } else {
            datos_correctos_mod[0] = parseInt(datos_correctos[0 + 2], 16);
            if (datos_correctos_mod[0] > 32768) {
                integers[184] = datos_correctos_mod[0] - 65536;
            } else {
                integers[184] = datos_correctos_mod[0];
            }
            datos_correctos_mod[12] = parseInt(datos_correctos[12 + 2], 16);
            if (datos_correctos_mod[12] > 32768) {
                integers[196] = datos_correctos_mod[12] - 65536;
            } else {
                integers[196] = datos_correctos_mod[12];
            }
            for (var i = 21; i < num_reg; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            cont_err = 0;
            en_5();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("en_4()", 141);
        return;
    });
}

function en_5() {
    var reg_ini = 5241;
    var num_reg = 34;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({type: "POST", url: "../../../../recepcion_datos_4.cgi", data: cadena, async: true,}).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("en_5()", 141);
            return;
        } else {
            for (var i = 0; i < 10; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            for (var i = 30; i < num_reg; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            cont_err = 0;
            en_6();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("en_5()", 141);
        return;
    });
}

function en_6() {
    var reg_ini = 5285;
    var num_reg = 14;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({type: "POST", url: "../../../../recepcion_datos_4.cgi", data: cadena, async: true,}).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("en_6()", 141);
            return;
        } else {
            for (var i = 0; i < 5; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            for (var i = 8; i < num_reg; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            cont_err = 0;
            an_1();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("en_6()", 141);
        return;
    });
}

function an_1() {
    var reg_ini = 1;
    var num_reg = 39;
    var analog_ini = Number(reg_ini);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("an_1()", 141);
            return;
        } else {
            for (var i = 0; i < 5; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            for (var i = 7; i < 15; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            datos_correctos_mod[18] = parseInt(datos_correctos[18 + 2], 16);
            if (datos_correctos_mod[18] > 32768) {
                analogs[19] = (datos_correctos_mod[18] - 65536) / 10;
            } else {
                analogs[19] = datos_correctos_mod[18] / 10;
            }
            datos_correctos_mod[21] = parseInt(datos_correctos[21 + 2], 16);
            if (datos_correctos_mod[21] > 32768) {
                analogs[22] = (datos_correctos_mod[21] - 65536) / 10;
            } else {
                analogs[22] = datos_correctos_mod[21] / 10;
            }
            for (var i = 28; i < 31; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            for (var i = 37; i < num_reg; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            cont_err = 0;
            an_2();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("an_1()", 141);
        return;
    });
}

function an_2() {
    var reg_ini = 40;
    var num_reg = 19;
    var analog_ini = Number(reg_ini);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("an_2()", 141);
            return;
        } else {
            for (var i = 0; i < 5; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            datos_correctos_mod[15] = parseInt(datos_correctos[15 + 2], 16);
            if (datos_correctos_mod[15] > 32768) {
                analogs[55] = (datos_correctos_mod[15] - 65536) / 10;
            } else {
                analogs[55] = datos_correctos_mod[15] / 10;
            }
            datos_correctos_mod[18] = parseInt(datos_correctos[18 + 2], 16);
            if (datos_correctos_mod[18] > 32768) {
                analogs[58] = (datos_correctos_mod[18] - 65536) / 10;
            } else {
                analogs[58] = datos_correctos_mod[18] / 10;
            }
            cont_err = 0;
            an_3();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("an_2()", 141);
        return;
    });
}

function an_3() {
    var reg_ini = 97;
    var num_reg = 30;
    var analog_ini = Number(reg_ini);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("an_3()", 141);
            return;
        } else {
            for (var i = 0; i < 3; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            for (var i = 23; i < num_reg; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            cont_err = 0;
            an_4();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("an_3()", 141);
        return;
    });
}

function an_4() {
    var reg_ini = 176;
    var num_reg = 29;
    var analog_ini = Number(reg_ini);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("an_4()", 141);
            return;
        } else {
            for (var i = 0; i < 4; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            for (var i = 10; i < num_reg; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            cont_err = 0;
            an_5();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("an_4()", 141);
        return;
    });
}

function an_5() {
    var reg_ini = 214;
    var num_reg = 14;
    var analog_ini = Number(reg_ini);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("an_5()", 141);
            return;
        } else {
            for (var i = 0; i < 3; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            for (var i = 5; i < 9; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            for (var i = 11; i < num_reg; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            cont_err = 0;
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("an_5()", 141);
        return;
    });
    parseResults();
}

function traducir() {
    document.getElementById('txtcaptacion_a').innerHTML = info.tcaptacion;
    document.getElementById('txtclimatizacion_a').innerHTML = info.tclimatizacion;
    document.getElementById('txttida').innerHTML = reg_clima.timpulsion;
    document.getElementById('txttret').innerHTML = nuevas.tret;
    document.getElementById('txtporc_vent').innerHTML = act_man_comp.tventilador;
    document.getElementById('txtasf').innerHTML = nuevas.tasf;
    document.getElementById('txtdt_air_u').innerHTML = nuevas.tdt_aerotermo;
    document.getElementById('txtdt_desesc').innerHTML = nuevas.tdtdesescarche;
    document.getElementById('txtaerotermo').innerHTML = nuevas.txtaerotermo1;
    document.getElementById('txtida_1').innerHTML = reg_clima.timpulsion;
    document.getElementById('txtret_1').innerHTML = nuevas.tret;
    document.getElementById('txtratio').innerHTML = nuevas.tratio;
    document.getElementById('txtaire').innerHTML = nuevas.taire;
    document.getElementById('txttierra').innerHTML = nuevas.ttierra;
    document.getElementById('txthibrido').innerHTML = nuevas.txthibrido1;
    document.getElementById("txtdemandas_activas1").innerHTML = nuevas.demandas_activas;
    document.getElementById("txtcogeneracion").innerHTML = nuevas_paginas.cabecera_cogeneracion;
    document.getElementById("txtregulacion_calor").innerHTML = info.tval_des_calor;
    document.getElementById("txtregulacion_frio").innerHTML = info.tval_des_frio;
    document.getElementById('txtcabecera_temp_exterior').innerHTML = info.txtcabecera_temp_exterior;
    document.getElementById('txttemp_exterior').innerHTML = info.ttemp_exterior;
    document.getElementById('txttemp_corte').innerHTML = info.ttemp_corte;
    document.getElementById('txtfor_calefaccion').innerHTML = info.tfor_calefaccion;
    document.getElementById('txtfor_refrigeracion').innerHTML = info.tfor_refrigeracion;
    document.getElementById('txtfor_act_refrigeracion').innerHTML = info.tfor_act_refrigeracion;
    document.getElementById('txtinercia_heat').innerHTML = hc1.tiner1;
    document.getElementById('txtinercia_cool').innerHTML = hc1.tiner2;
    document.getElementById('txtset_inercia_heat').innerHTML = calefaccion.tconsigna_inercia;
    document.getElementById('txtset_inercia_cool').innerHTML = calefaccion.tconsigna_inercia;
    document.getElementById('txttemp_dep_heat').innerHTML = calefaccion.ttemp_dep_inercia;
    document.getElementById('txttemp_dep_cool').innerHTML = calefaccion.ttemp_dep_inercia;
    document.getElementById('txtoffset_inercia_heat').innerHTML = calefaccion.toffset_inercia;
    document.getElementById('txtoffset_inercia_cool').innerHTML = calefaccion.toffset_inercia;
    document.getElementById('txtcabecera_calefaccion').innerHTML = nuevas.theat_groups;
    document.getElementById('set_cab').innerHTML = info.tset_cab;
    document.getElementById('real_t_cab').innerHTML = info.treal_t_cab;
    document.getElementById('reg_cab').innerHTML = info.treg_cab;
    document.getElementById('txtz1a').innerHTML = hc1.tgd1;
    document.getElementById('txtz2a').innerHTML = hc1.tgd2;
    document.getElementById('txtz3a').innerHTML = hc1.tgd3;
    document.getElementById('txtz4a').innerHTML = hc1.tgd4;
    document.getElementById('txtcabecera_refrigeracion').innerHTML = nuevas.tcool_groups;
    document.getElementById('set_cab_1').innerHTML = info.tset_cab;
    document.getElementById('real_t_cab_1').innerHTML = info.treal_t_cab;
    document.getElementById('reg_cab_1').innerHTML = info.treg_cab;
    document.getElementById('txtz1a_1').innerHTML = hc1.tgd1;
    document.getElementById('txtz2a_1').innerHTML = hc1.tgd2;
    document.getElementById('txtz3a_1').innerHTML = hc1.tgd3;
    document.getElementById('txtz4a_1').innerHTML = hc1.tgd4;
    document.getElementById("txtcabecera_terminales_interiores").innerHTML = test.tcabecera_terminales_interiores;
    document.getElementById("txtgd1").innerHTML = "T1";
    document.getElementById("txtgd2").innerHTML = "T2";
    document.getElementById("txtgd3").innerHTML = "T3";
    document.getElementById("txtgd4").innerHTML = "T4";
    document.getElementById("txtt_con").innerHTML = info.tconsigna_pool;
    document.getElementById("txtt_real").innerHTML = info.treal_t_cab;
    document.getElementById("txthr").innerHTML = nuevas.thr;
    document.getElementById('txtacs').innerHTML = info.tacs;
    document.getElementById('txttemp_acum_acs').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txtoffset').innerHTML = info.toffset;
    document.getElementById('txtconsigna_acs').innerHTML = info.tconsigna_acs;
    document.getElementById('txtcomp_on_t').innerHTML = info.tcomp_on_t;
    document.getElementById('txtretorno_setp').innerHTML = info.tretorno_setp;
    document.getElementById('txtretorno').innerHTML = info.tretornodhw;
    document.getElementById('txtdtretorno').innerHTML = info.toffset_ret;
    document.getElementById('txtpool').innerHTML = piscina.txtcabecera_piscina;
    document.getElementById('txtestado_piscina').innerHTML = on_off.testado;
    document.getElementById('txtimp_pool').innerHTML = reg_clima.timpulsion;
    document.getElementById('txtenergia_mes_anno').innerHTML = info.tenergia_mes_anno;
    document.getElementById('txtenergia_util_heat').innerHTML = mf3.tenergia_util_heat;
    document.getElementById('txtenergia_util_cool').innerHTML = mf3.tenergia_util_cool;
    document.getElementById('txtenerg_elect').innerHTML = info.tenerg_elect;
    document.getElementById('txtcontadores_emanager').innerHTML = system.contadores_emanager;
    document.getElementById('txtconsumo_emanager').innerHTML = system.e_consumo_cargas;
    document.getElementById('txtinyeccion_emanager').innerHTML = system.e_inyeccion1;
    document.getElementById('txtcontrol_excedente').innerHTML = system.e_excedente_mayus;
    document.getElementById('txtestado_excedente').innerHTML = on_off.testado;
    document.getElementById('txtreal_excedente').innerHTML = comunes.real;
    document.getElementById('txtconsigna_excedente').innerHTML = comunes.consigna;
    document.getElementById('txtlimite').innerHTML = system.e_limite_consumo_mayus;
    document.getElementById('txtestado_limite').innerHTML = on_off.testado;
    document.getElementById('txtreal_limite').innerHTML = comunes.real;
    document.getElementById('txtconsigna_limite').innerHTML = comunes.consigna;
    document.getElementById('txtcabecera_secado').innerHTML = installer.txtcabecera_secado_suelo;
    document.getElementById('txtsetpoint').innerHTML = installer.tsetpoint;
    document.getElementById('txttiempo').innerHTML = installer.ttiempo;
    document.getElementById('icon1').innerHTML = on_off.ton_off;
    document.getElementById('icon2').innerHTML = selectmenu.tcalendario;
    document.getElementById('icon3').innerHTML = selectmenu.tcalefaccion;
    document.getElementById('icon4').innerHTML = selectmenu.tfrio_pasivo;
    document.getElementById('icon5').innerHTML = selectmenu.tacs_legionela;
    document.getElementById('icon6').innerHTML = selectmenu.tpiscina;
    document.getElementById('icon7').innerHTML = nuevas_paginas.icono_emanager;
    document.getElementById('icon8').innerHTML = selectmenu.tinformacion;
    document.getElementById('icon9').innerHTML = selectmenu.talarma;
    document.getElementById('installer').innerHTML = nuevas_paginas.instalador;
    document.getElementById('user').innerHTML = nuevas_paginas.usuario;
    document.getElementById('home').innerHTML = nuevas_paginas.home;
    document.getElementById('icon_inf1').innerHTML = nuevas_paginas.informacion_1;
    document.getElementById('icon_inf2').innerHTML = nuevas_paginas.informacion_2;
    document.getElementById('icon_inf3').innerHTML = nuevas_paginas.informacion_grafica;
    document.getElementById('txtcabecera_versiones').innerHTML = nuevas_paginas.tcabecera_versiones;
    document.getElementById("icon8").style.color = '#85b724';
    document.getElementById("icon_inf3").style.color = '#85b724';
    document.getElementById("user").style.color = '#85b724';
}

function parseResults() {
    document.getElementById("TIP_a").innerHTML = analogs[1] + " &deg;C";
    document.getElementById("TRP_a").innerHTML = analogs[2] + " &deg;C";
    document.getElementById("TIC_a").innerHTML = analogs[3] + " &deg;C";
    document.getElementById("TRC_a").innerHTML = analogs[4] + " &deg;C";
    document.getElementById("PCP_a").innerHTML = analogs[13] + " bar";
    document.getElementById("PCC_a").innerHTML = analogs[14] + " bar";
    document.getElementById('tida').innerHTML = analogs[1] + " &deg;C";
    document.getElementById('tret').innerHTML = analogs[29] + " &deg;C";
    document.getElementById('porc_vent').innerHTML = analogs[9] + " %";
    document.getElementById('dt_air_u').innerHTML = analogs[204] + " &deg;C";
    document.getElementById('ratio_tierra').innerHTML = integers[295] + " %";
    document.getElementById('ratio_aire').innerHTML = integers[296] + " %";
    document.getElementById('regulacion_calor').innerHTML = analogs[219] + " %";
    document.getElementById('regulacion_frio').innerHTML = analogs[220] + " %";
    y = analogs[1];
    x = analogs[2];
    z = Math.abs(x - y);
    w = z.toFixed(1);
    document.getElementById("saltopozos_a").innerHTML = w + " K";
    a = analogs[3];
    b = analogs[4];
    c = Math.abs(a - b);
    d = c.toFixed(1);
    document.getElementById("saltoclima_a").innerHTML = d + " K";
    if (digitals[247] == 1) {
        document.getElementById("Reg_BP_a").innerHTML = "---%";
        document.getElementById("Reg_BC_a").innerHTML = "---%";
    } else if (digitals[247] == 0) {
        document.getElementById("Reg_BP_a").innerHTML = (integers[33] / 10).toFixed(1) + " %";
        document.getElementById("Reg_BC_a").innerHTML = (integers[32] / 10).toFixed(1) + " %";
    }
    var desesc = integers[294] / 10;
    document.getElementById('dt_desesc').innerHTML = desesc.toFixed(1) + " &deg;C";
    if (integers[293] < 0) {
        document.getElementById('asf').innerHTML = "-" + integers[292] + "." + Math.abs(integers[293]);
    } else if (integers[293] >= 0 && integers[293] < 10) {
        document.getElementById('asf').innerHTML = integers[292] + ".0" + integers[293];
    } else if (integers[293] < 100 && integers[293] > 9) {
        document.getElementById('asf').innerHTML = integers[292] + "." + integers[293];
    }
    if (digitals[101] == 0) {
        document.getElementById('ida_aire').innerHTML = " ";
        document.getElementById('retorno_aire').innerHTML = " ";
    } else if (digitals[101] == 1) {
        document.getElementById('ida_aire').innerHTML = analogs[1] + " &deg;C";
        document.getElementById('retorno_aire').innerHTML = analogs[29] + " &deg;C";
    }
    if (digitals[102] == 0) {
        document.getElementById('ida_tierra').innerHTML = " ";
        document.getElementById('retorno_tierra').innerHTML = " ";
    } else if (digitals[102] == 1) {
        document.getElementById('ida_tierra').innerHTML = (integers[297] / 10).toFixed(1) + " &deg;C";
        document.getElementById('retorno_tierra').innerHTML = analogs[2] + " &deg;C";
    }
    if (integers[142] == 0) {
        document.getElementById('tida').innerHTML = "----";
        document.getElementById('tret').innerHTML = "----";
        document.getElementById('porc_vent').innerHTML = "----";
        document.getElementById('asf').innerHTML = "----";
        document.getElementById('dt_air_u').innerHTML = "----";
        document.getElementById('dt_desesc').innerHTML = "----";
        document.getElementById('ida_tierra').innerHTML = "----";
        document.getElementById('retorno_tierra').innerHTML = "----";
        document.getElementById('ratio_tierra').innerHTML = "----";
        document.getElementById('ida_aire').innerHTML = "----";
        document.getElementById('retorno_aire').innerHTML = "----";
        document.getElementById('ratio_aire').innerHTML = "----";
    }
    if (integers[142] == 1) {
        document.getElementById('ida_tierra').innerHTML = "----";
        document.getElementById('retorno_tierra').innerHTML = "----";
        document.getElementById('ratio_tierra').innerHTML = "----";
        document.getElementById('ida_aire').innerHTML = "----";
        document.getElementById('retorno_aire').innerHTML = "----";
        document.getElementById('ratio_aire').innerHTML = "----";
    }
    if (digitals[206] == 1) {
        document.getElementById("top_1").style.display = "inline";
        document.getElementById("top_1").src = "../../../imagesnew/calefaccion_directa.png";
    } else if (digitals[206] == 0 && digitals[249] == 0) {
        document.getElementById("top_1").style.display = "none";
    }
    if (digitals[249] == 1) {
        document.getElementById("top_1").style.display = "inline";
        document.getElementById("top_1").src = "../../../imagesnew/calefaccion_inercia.png";
    } else if (digitals[206] == 0 && digitals[249] == 0) {
        document.getElementById("top_1").style.display = "none";
    }
    if (digitals[207] == 1) {
        document.getElementById("top_2").style.display = "inline";
        document.getElementById("top_2").src = "../../../imagesnew/refrigeracion_directa.png";
    } else if (digitals[207] == 0 && digitals[250] == 1) {
        document.getElementById("top_2").style.display = "none";
    }
    if (digitals[250] == 1) {
        document.getElementById("top_2").style.display = "inline";
        document.getElementById("top_2").src = "../../../imagesnew/refrigeracion_inercia.png";
    } else if (digitals[206] == 0 && digitals[250] == 0) {
        document.getElementById("top_2").style.display = "none";
    }
    if (digitals[208] == 1) {
        document.getElementById("top_3").style.display = "inline";
        document.getElementById("top_3").src = "../../../imagesnew/acs.png";
    } else if (digitals[208] == 0) {
        document.getElementById("top_3").style.display = "none";
    }
    if (digitals[209] == 1) {
        document.getElementById("top_4").style.display = "inline";
        document.getElementById("top_4").src = "../../../imagesnew/piscina.png";
    } else if (digitals[209] == 0) {
        document.getElementById("top_4").style.display = "none";
    }
    if (digitals[210] == 1) {
        document.getElementById("top_5").style.display = "inline";
        document.getElementById("top_5").src = "../../../imagesnew/HTR.png";
    } else if (digitals[210] == 0) {
        document.getElementById("top_5").style.display = "none";
    }
    if (integers[270] == 0) {
        document.getElementById("number_1").style.display = "none";
        document.getElementById("zone_1").style.display = "none";
    } else {
        document.getElementById("number_1").style.display = "inline";
        document.getElementById("zone_1").style.display = "inline";
        if (integers[270] == 1) {
            document.getElementById("zone_1").src = "../../../imagesnew/grupos_calefaccion.png";
        } else if (integers[270] == 2) {
            document.getElementById("zone_1").src = "../../../imagesnew/grupos_refrigeracion.png";
        }
    }
    if (integers[271] == 0) {
        document.getElementById("number_2").style.display = "none";
        document.getElementById("zone_2").style.display = "none";
    } else {
        document.getElementById("number_2").style.display = "inline";
        document.getElementById("zone_2").style.display = "inline";
        if (integers[271] == 1) {
            document.getElementById("zone_2").src = "../../../imagesnew/grupos_calefaccion.png";
        } else if (integers[271] == 2) {
            document.getElementById("zone_2").src = "../../../imagesnew/grupos_refrigeracion.png";
        }
    }
    if (integers[272] == 0) {
        document.getElementById("number_3").style.display = "none";
        document.getElementById("zone_3").style.display = "none";
    } else {
        document.getElementById("number_3").style.display = "inline";
        document.getElementById("zone_3").style.display = "inline";
        if (integers[272] == 1) {
            document.getElementById("zone_3").src = "../../../imagesnew/grupos_calefaccion.png";
        } else if (integers[272] == 2) {
            document.getElementById("zone_3").src = "../../../imagesnew/grupos_refrigeracion.png";
        }
    }
    if (integers[273] == 0) {
        document.getElementById("number_4").style.display = "none";
        document.getElementById("zone_4").style.display = "none";
    } else {
        document.getElementById("number_4").style.display = "inline";
        document.getElementById("zone_4").style.display = "inline";
        if (integers[273] == 1) {
            document.getElementById("zone_4").src = "../../../imagesnew/grupos_calefaccion.png";
        } else if (integers[273] == 2) {
            document.getElementById("zone_4").src = "../../../imagesnew/grupos_refrigeracion.png";
        }
    }
    if (digitals[211] == 0) {
        document.getElementById("recirc_acs").style.display = "none";
    } else {
        document.getElementById("recirc_acs").style.display = "inline";
        document.getElementById("recirc_acs").src = "../../../imagesnew/recirculacion.png";
    }
    document.getElementById("sel_progr").style.display = "inline";
    if (integers[142] == 1) {
        document.getElementById("tabla_hibr").style.display = "none";
        document.getElementById("tabla_aero").style.display = "inline-table";
    } else if (integers[142] == 2) {
        document.getElementById("tabla_hibr").style.display = "inline-table";
        document.getElementById("tabla_aero").style.display = "inline-table";
    } else {
        document.getElementById("tabla_hibr").style.display = "none";
        document.getElementById("tabla_aero").style.display = "none";
    }
    partent = integers[284];
    partdec = integers[285];
    if (integers[286] < 10) {
        beta = "00" + integers[286];
    } else {
        if (integers[286] < 100) {
            beta = "0" + integers[286];
        } else {
            beta = integers[286];
        }
    }
    document.getElementById('version').innerHTML = ("Program version: " + "V" + partent + partdec + "." + "B" + beta);
    if (digitals[247] == 0) {
        document.getElementById("tabla_cogeneracion").style.display = "none";
    } else {
        document.getElementById("tabla_cogeneracion").style.display = "inline-table";
    }
    document.getElementById('temp_exterior').innerHTML = analogs[11] + " &deg;C";
    document.getElementById('temp_cal').innerHTML = analogs[22] + " &deg;C";
    document.getElementById('temp_ref').innerHTML = analogs[126] + " &deg;C";
    document.getElementById('temp_ref_act').innerHTML = analogs[125] + " &deg;C";
    document.getElementById("set_inercia_heat").innerHTML = analogs[215] + " &deg;C";
    document.getElementById("temp_dep_heat").innerHTML = analogs[200] + " &deg;C";
    document.getElementById("offset_inercia_heat").innerHTML = analogs[58] + " &deg;C";
    document.getElementById("set_inercia_cool").innerHTML = analogs[216] + " &deg;C";
    document.getElementById("temp_dep_cool").innerHTML = analogs[201] + " &deg;C";
    document.getElementById("offset_inercia_cool").innerHTML = analogs[55] + " &deg;C";
    document.getElementById('set_th1').innerHTML = analogs[97] + " &deg;C";
    document.getElementById('set_th2').innerHTML = (integers[65] / 10).toFixed(1) + " &deg;C";
    document.getElementById('set_th3').innerHTML = (integers[112] / 10).toFixed(1) + " &deg;C";
    document.getElementById('set_th4').innerHTML = (integers[205] / 10).toFixed(1) + " &deg;C";
    if (integers[240] == 2 || integers[240] == 3) {
        document.getElementById('real_t_th1').innerHTML = analogs[200] + " &deg;C";
    } else {
        document.getElementById('real_t_th1').innerHTML = analogs[3] + " &deg;C";
    }
    document.getElementById('real_t_th2').innerHTML = analogs[194] + " &deg;C";
    document.getElementById('real_t_th3').innerHTML = analogs[195] + " &deg;C";
    document.getElementById('real_t_th4').innerHTML = analogs[196] + " &deg;C";
    document.getElementById('reg_th2').innerHTML = (integers[209] / 10).toFixed(1) + "%";
    document.getElementById('reg_th3').innerHTML = (integers[208] / 10).toFixed(1) + "%";
    document.getElementById('reg_th4').innerHTML = (integers[210] / 10).toFixed(1) + "%";
    document.getElementById('set_th1_1').innerHTML = analogs[98] + " &deg;C";
    document.getElementById('set_th2_1').innerHTML = analogs[99] + " &deg;C";
    document.getElementById('set_th3_1').innerHTML = analogs[120] + " &deg;C";
    document.getElementById('set_th4_1').innerHTML = analogs[123] + " &deg;C";
    if (integers[245] == 2) {
        document.getElementById('real_t_th1_1').innerHTML = analogs[201] + " &deg;C";
    } else {
        document.getElementById('real_t_th1_1').innerHTML = analogs[197] + " &deg;C";
    }
    document.getElementById('real_t_th2_1').innerHTML = analogs[194] + " &deg;C";
    document.getElementById('real_t_th3_1').innerHTML = analogs[195] + " &deg;C";
    document.getElementById('real_t_th4_1').innerHTML = analogs[196] + " &deg;C";
    document.getElementById('reg_th2_1').innerHTML = (integers[209] / 10).toFixed(1) + "%";
    document.getElementById('reg_th3_1').innerHTML = (integers[208] / 10).toFixed(1) + "%";
    document.getElementById('reg_th4_1').innerHTML = (integers[210] / 10).toFixed(1) + "%";
    document.getElementById("c_dg1").innerHTML = analogs[176] + " &deg;C";
    document.getElementById("c_dg2").innerHTML = analogs[177] + " &deg;C";
    document.getElementById("c_dg3").innerHTML = analogs[178] + " &deg;C";
    document.getElementById("c_dg4").innerHTML = analogs[179] + " &deg;C";
    document.getElementById("d_dg1").innerHTML = analogs[186] + " &deg;C";
    document.getElementById("d_dg2").innerHTML = analogs[187] + " &deg;C";
    document.getElementById("d_dg3").innerHTML = analogs[188] + " &deg;C";
    document.getElementById("d_dg4").innerHTML = analogs[189] + " &deg;C";
    document.getElementById("h_dg1").innerHTML = analogs[190] + " %";
    document.getElementById("h_dg2").innerHTML = analogs[191] + " %";
    document.getElementById("h_dg3").innerHTML = analogs[192] + " %";
    document.getElementById("h_dg4").innerHTML = analogs[193] + " %";
    document.getElementById("temp_acum_acs").innerHTML = analogs[8];
    document.getElementById("offset").innerHTML = analogs[15];
    document.getElementById("consigna_acs").innerHTML = analogs[214];
    document.getElementById("comp_on_t").innerHTML = analogs[198];
    document.getElementById("e_elect").innerHTML = integers[81] + " W";
    document.getElementById("cop_value").innerHTML = analogs[30];
    document.getElementById("eer_value").innerHTML = analogs[202];
    document.getElementById("pf_value").innerHTML = analogs[31];
    if (digitals[262] == 1) {
        document.getElementById("consumo").innerHTML = analogs[225] + "kW";
        document.getElementById("inyeccion").innerHTML = analogs[226] + "kW";
        document.getElementById("contador_emanager").style.display = "inline-table";
    } else {
        document.getElementById("contador_emanager").style.display = "none";
    }
    if (digitals[262] == 1) {
        if (digitals[266] == 0) {
            document.getElementById('estado_excedente').innerHTML = comunes.toff;
        } else {
            document.getElementById('estado_excedente').innerHTML = comunes.ton;
        }
        if (digitals[267] == 0) {
            document.getElementById('estado_limite').innerHTML = comunes.toff;
        } else {
            document.getElementById('estado_limite').innerHTML = comunes.ton;
        }
        document.getElementById("real_excedente").innerHTML = analogs[227] + "kW";
        document.getElementById("consigna_excedente").innerHTML = analogs[222] + "kW";
        document.getElementById("real_limite").innerHTML = analogs[227] + "kW";
        document.getElementById("consigna_limite").innerHTML = analogs[221] + "kW";
        document.getElementById("tabla_excedente").style.display = "inline-table";
        document.getElementById("tabla_limite").style.display = "inline-table";
    } else {
        document.getElementById("tabla_excedente").style.display = "none";
        document.getElementById("tabla_limite").style.display = "none";
    }
    if (digitals[85] == 1) {
        document.getElementById('zona_cal').hidden = false;
    }
    if (digitals[159] == 1) {
        document.getElementById('zona_act_ref').hidden = false;
    }
    if (digitals[160] == 1) {
        document.getElementById('zona_ref').hidden = false;
    }
    if (digitals[85] == 1 || digitals[159] == 1 || digitals[160] == 1) {
        document.getElementById('zona1_th').hidden = false;
    }
    if (digitals[85] == 0 && digitals[159] == 0 && digitals[160] == 0) {
        document.getElementById('zona1_th').hidden = true;
        document.getElementById('zona_cal').hidden = true;
        document.getElementById('zona_act_ref').hidden = true;
        document.getElementById('zona_ref').hidden = true;
    }
    if ((integers[240] == 2 || integers[240] == 3) && digitals[85] == 1) {
        document.getElementById("heat0").hidden = false;
        document.getElementById("heat1").hidden = false;
        document.getElementById("heat2").hidden = false;
        document.getElementById("heat3").hidden = false;
    }
    if (integers[245] == 2 && (digitals[159] == 1 || digitals[160] == 1)) {
        document.getElementById("cool0").hidden = false;
        document.getElementById("cool1").hidden = false;
        document.getElementById("cool2").hidden = false;
        document.getElementById("cool3").hidden = false;
    }
    if (digitals[150] == 0) {
        document.getElementById('set_th1').innerHTML = "----";
        document.getElementById('real_t_th1').innerHTML = "----";
    }
    if (digitals[151] == 0) {
        document.getElementById('set_th2').innerHTML = "----";
        document.getElementById('real_t_th2').innerHTML = "----";
        document.getElementById('reg_th2').innerHTML = "----";
    }
    if (digitals[152] == 0) {
        document.getElementById('set_th3').innerHTML = "----";
        document.getElementById('real_t_th3').innerHTML = "----";
        document.getElementById('reg_th3').innerHTML = "----";
    }
    if (digitals[153] == 0) {
        document.getElementById('set_th4').innerHTML = "----";
        document.getElementById('real_t_th4').innerHTML = "----";
        document.getElementById('reg_th4').innerHTML = "----";
    }
    first_t();
    if (digitals[163] == 0) {
        document.getElementById('set_th1_1').innerHTML = "----";
        document.getElementById('real_t_th1_1').innerHTML = "----";
    }
    if (digitals[164] == 0) {
        document.getElementById('set_th2_1').innerHTML = "----";
        document.getElementById('real_t_th2_1').innerHTML = "----";
        document.getElementById('reg_th2_1').innerHTML = "----";
    }
    if (digitals[165] == 0) {
        document.getElementById('set_th3_1').innerHTML = "----";
        document.getElementById('real_t_th3_1').innerHTML = "----";
        document.getElementById('reg_th3_1').innerHTML = "----";
    }
    if (digitals[166] == 0) {
        document.getElementById('set_th4_1').innerHTML = "----";
        document.getElementById('real_t_th4_1').innerHTML = "----";
        document.getElementById('reg_th4_1').innerHTML = "----";
    }
    first_t_1();
    check_gd1();
    check_gd2();
    check_gd3();
    check_gd4();
    if (digitals[190] == 1) {
        document.getElementById("retorno1").hidden = false;
        document.getElementById("retorno2").hidden = false;
        document.getElementById("retorno3").hidden = false;
    }
    first_t_2();
    if (digitals[61] == 0) {
        document.getElementById('estado_piscina').innerHTML = comunes.toff;
    } else {
        document.getElementById('estado_piscina').innerHTML = comunes.ton;
    }
    document.getElementById("imp_pool").innerHTML = analogs[19] + " &deg;C";
    if (digitals[228] == 1) {
        document.getElementById("energ_util_heat").innerHTML = integers[82] + " W";
    } else if (digitals[228] == 0) {
        document.getElementById("energ_util_heat").innerHTML = 0 + "W";
    }
    if (digitals[227] == 1) {
        document.getElementById("energ_util_cool").innerHTML = integers[184] + " W";
    } else if (digitals[227] == 0) {
        document.getElementById("energ_util_cool").innerHTML = 0 + "W";
        ;
    }
    if (digitals[121] == 1) {
        if (primera_carga < 1) {
            primera_carga++;
            first_load();
        }
    } else {
        document.getElementById("tabla").style.display = "none";
    }
    if (digitals[231] == 1) {
        document.getElementById("p1").style.backgroundColor = "green";
    } else if (digitals[231] == 0) {
        document.getElementById("p1").style.backgroundColor = "white";
    }
    if (digitals[232] == 1) {
        document.getElementById("p2").style.backgroundColor = "green";
    } else if (digitals[232] == 0) {
        document.getElementById("p2").style.backgroundColor = "white";
    }
    if (digitals[233] == 1) {
        document.getElementById("p3").style.backgroundColor = "green";
    } else if (digitals[233] == 0) {
        document.getElementById("p3").style.backgroundColor = "white";
    }
    if (digitals[234] == 1) {
        document.getElementById("p4").style.backgroundColor = "green";
    } else if (digitals[234] == 0) {
        document.getElementById("p4").style.backgroundColor = "white";
    }
    if (digitals[235] == 1) {
        document.getElementById("p5").style.backgroundColor = "green";
    } else if (digitals[235] == 0) {
        document.getElementById("p5").style.backgroundColor = "white";
    }
    if (digitals[236] == 1) {
        document.getElementById("p6").style.backgroundColor = "green";
    } else if (digitals[236] == 0) {
        document.getElementById("p6").style.backgroundColor = "white";
    }
    if (integers[241] == 0) {
        document.getElementById('gd1').hidden = true;
    } else {
        document.getElementById('gd1').hidden = false;
    }
    if (integers[242] == 0) {
        document.getElementById('gd2').hidden = true;
    } else {
        document.getElementById('gd2').hidden = false;
    }
    if (integers[243] == 0) {
        document.getElementById('gd3').hidden = true;
    } else {
        document.getElementById('gd3').hidden = false;
    }
    if (integers[244] == 0) {
        document.getElementById('gd4').hidden = true;
    } else {
        document.getElementById('gd4').hidden = false;
    }
    if (integers[241] == 0 && integers[242] == 0 && integers[243] == 0 && integers[244] == 0) {
        document.getElementById('gd0').hidden = true;
        document.getElementById('ocultar_terminales_interiores').hidden = true;
    } else {
        document.getElementById('gd0').hidden = false;
        document.getElementById('ocultar_terminales_interiores').hidden = false;
    }
    if (digitals[64] == 0) {
        document.getElementById("tabla_acs").style.display = "none";
    } else {
        document.getElementById("tabla_acs").style.display = "inline-table";
    }
    if (digitals[85] == 0) {
        document.getElementById("grupos_calefaccion").style.display = "none";
    } else {
        document.getElementById("grupos_calefaccion").style.display = "inline-table";
    }
    if (digitals[159] == 0 && digitals[160] == 0) {
        document.getElementById("grupos_refrigeracion").style.display = "none";
    } else {
        document.getElementById("grupos_refrigeracion").style.display = "inline-table";
    }
    if (digitals[65] == 0) {
        document.getElementById("tabla_piscina").style.display = "none";
    } else {
        document.getElementById("tabla_piscina").style.display = "inline-table";
    }
    timer_repeat = setTimeout("getVariablescgi()", 3500);
    document.getElementById('icono_espera').style.display = "none";
    document.getElementById('div_izquierda_informacion').style.display = "inline";
}

function check_gd1() {
    if ((digitals[150] == 1 || digitals[163] == 1) && (integers[241] == 1 || integers[241] == 2)) {
    } else {
        document.getElementById("c_dg1").innerHTML = "---";
        document.getElementById("d_dg1").innerHTML = "---";
        document.getElementById("h_dg1").innerHTML = "---";
    }
}

function check_gd2() {
    if ((digitals[151] == 1 || digitals[164] == 1) && (integers[242] == 1 || integers[242] == 2)) {
    } else {
        document.getElementById("c_dg2").innerHTML = "---";
        document.getElementById("d_dg2").innerHTML = "---";
        document.getElementById("h_dg2").innerHTML = "---";
    }
}

function check_gd3() {
    if ((digitals[152] == 1 || digitals[165] == 1) && (integers[243] == 1 || integers[243] == 2)) {
    } else {
        document.getElementById("c_dg3").innerHTML = "---";
        document.getElementById("d_dg3").innerHTML = "---";
        document.getElementById("h_dg3").innerHTML = "---";
    }
}

function check_gd4() {
    if ((digitals[153] == 1 || digitals[166] == 1) && (integers[244] == 1 || integers[244] == 2)) {
    } else {
        document.getElementById("c_dg4").innerHTML = "---";
        document.getElementById("d_dg4").innerHTML = "---";
        document.getElementById("h_dg4").innerHTML = "---";
    }
}

function first_t() {
    if ((digitals[150] == 1 || digitals[163] == 1) && (integers[241] == 1 || integers[241] == 2)) {
        true_1 = 1;
    } else if ((digitals[151] == 1 || digitals[164] == 1) && (integers[242] == 1 || integers[242] == 2)) {
        true_1 = 1;
    } else if ((digitals[152] == 1 || digitals[165] == 1) && (integers[243] == 1 || integers[243] == 2)) {
        true_1 = 1;
    } else if ((digitals[153] == 1 || digitals[166] == 1) && (integers[244] == 1 || integers[244] == 2)) {
        true_1 = 1;
    }
}

function first_t_1() {
    if ((digitals[150] == 1 || digitals[163] == 1) && (integers[241] == 1 || integers[241] == 2)) {
        true_1 = 1;
    } else if ((digitals[151] == 1 || digitals[164] == 1) && (integers[242] == 1 || integers[242] == 2)) {
        true_1 = 1;
    } else if ((digitals[152] == 1 || digitals[165] == 1) && (integers[243] == 1 || integers[243] == 2)) {
        true_1 = 1;
    } else if ((digitals[153] == 1 || digitals[166] == 1) && (integers[244] == 1 || integers[244] == 2)) {
        true_1 = 1;
    }
}

function first_t_2() {
    if ((digitals[150] == 1 || digitals[163] == 1) && (integers[241] == 1 || integers[241] == 2)) {
        true_1 = 1;
    } else if ((digitals[151] == 1 || digitals[164] == 1) && (integers[242] == 1 || integers[242] == 2)) {
        true_1 = 1;
    } else if ((digitals[152] == 1 || digitals[165] == 1) && (integers[243] == 1 || integers[243] == 2)) {
        true_1 = 1;
    } else if ((digitals[153] == 1 || digitals[166] == 1) && (integers[244] == 1 || integers[244] == 2)) {
        true_1 = 1;
    }
}

function first_load() {
    document.getElementById("t1").innerHTML = analogs[38] + " &deg;C";
    document.getElementById("t2").innerHTML = analogs[39] + " &deg;C";
    document.getElementById("t3").innerHTML = analogs[40] + " &deg;C";
    document.getElementById("t4").innerHTML = analogs[41] + " &deg;C";
    document.getElementById("t5").innerHTML = analogs[42] + " &deg;C";
    document.getElementById("t6").innerHTML = analogs[43] + " &deg;C";
    document.getElementById("h1").innerHTML = integers[118] + " h";
    document.getElementById("h2").innerHTML = integers[119] + " h";
    document.getElementById("h3").innerHTML = integers[120] + " h";
    document.getElementById("h4").innerHTML = integers[121] + " h";
    document.getElementById("h5").innerHTML = integers[122] + " h";
    document.getElementById("h6").innerHTML = integers[123] + " h";
    document.getElementById("tabla").style.display = "inline-table";
}

function eliminarErrores(string) {
    var j = 0;
    var temp = new Array();
    for (var i = 0; i < string.length - 1; i++) {
        if (string[i].indexOf("error") < 0) {
            temp[j] = string[i];
            j++;
        }
    }
    temp[j] = string[i];
    return temp;
}