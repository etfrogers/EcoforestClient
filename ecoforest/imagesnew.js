digitals = new Array;
integers = new Array;
analogs = new Array;
datos_correctos_mod = new Array;
var cont_err = 0;
var cont = 0;
var timer_repeat;
Chart.defaults.global.defaultFontSize = 15;
Chart.defaults.global.defaultFontColor = 'rgb(54,54,54)';
var color = Chart.helpers.color;
var n_lineas;
var auxiliar = [];
var etiqX = [];
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];
var data6 = [];
var data7 = [];
var data8 = [];
var data9 = [];
var data10 = [];
var data11 = [];
var data12 = [];
var data13 = [];
var data14 = [];
var data15 = [];
var data16 = [];
var horagrafica;
var i;
var potencias;
var temperaturas;
var temperaturas2;
var consumida;
var calor;
var refrigeracion;
var acs;
var exterior;
var piscina;
var iner_cale;
var iner_refri;
var imp_cale;
var re_cale;
var imp_cap;
var re_cap;
var real1;
var real2;
var real3;
var real4;
var nombrecsv = "";
var nombrecsv2 = "";
calculanombre(0);
var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth() + 1;
var yyyy = hoy.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}

function calculanombre(indice) {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();
    if (indice == 0) {
        hoy = new Date();
        dd = hoy.getDate();
        mm = hoy.getMonth() + 1;
        yyyy = hoy.getFullYear();
    } else {
        dd = document.getElementById("dia").value;
        mm = document.getElementById("mes").value;
        yyyy = document.getElementById("ano").value;
    }
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var fecha = yyyy + '-' + mm + '-' + dd;
    numero_serie();
    nombrecsv = '../../../../historic/' + fecha + '_' + serie + '_1_historico.csv';
    nombrecsv2 = '../../../../historic/backup/' + fecha + '_' + serie + '_1_historico.csv';
    if (indice == 1) {
        pintar();
    }
}

function Inicializar() {
    document.getElementById("ano").selectedIndex = 1;
    document.getElementById('anoactual').value = yyyy;
    document.getElementById("ano").selectedIndex = 2;
    document.getElementById('anoanterior').value = yyyy - 1;
    document.getElementById('anoactual').innerHTML = yyyy;
    document.getElementById('anoanterior').innerHTML = yyyy - 1;
    document.getElementById("dia").selectedIndex = parseInt(dd);
    document.getElementById("mes").selectedIndex = parseInt(mm);
    document.getElementById("ano").selectedIndex = 1;
    consumida = system.e_consumo_cargas;
    calor = selectmenu.tcalefaccion;
    refrigeracion = selectmenu.tfrio_pasivo;
    acs = selectmenu.tacs_legionela;
    exterior = nuevas_paginas.grafica_exterior;
    piscina = selectmenu.tpiscina;
    iner_cale = info.tinercia_heat;
    ;iner_refri = info.tinercia_cool;
    imp_cale = nuevas_paginas.grafica_imp_pro;
    re_cale = nuevas_paginas.grafica_re_pro;
    imp_cap = nuevas_paginas.grafica_imp_cap;
    re_cap = nuevas_paginas.grafica_re_cap;
    real1 = nuevas_paginas.grafica_zona1;
    real2 = nuevas_paginas.grafica_zona2;
    real3 = nuevas_paginas.grafica_zona3;
    real4 = nuevas_paginas.grafica_zona4;
    potencias = nuevas_paginas.grafica_potencias;
    temperaturas = nuevas_paginas.grafica_temp_agua;
    temperaturas2 = nuevas_paginas.grafica_temp_aire;
    horagrafica = system.grafica_horas;
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
    document.getElementById("icon8").style.color = '#85b724';
    document.getElementById("icon_inf2").style.color = '#85b724';
    document.getElementById("user").style.color = '#85b724';
    document.getElementById('txtdia').innerHTML = fecha.tfecha;
    document.getElementById('botonG').innerHTML = nuevas_paginas.actualizar;
    getVariablescgi();
}

function getVariablescgi() {
    window.clearTimeout(timer_repeat);
    di_1();
}

function di_1() {
    var reg_ini = 64;
    var num_reg = 2;
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
            for (var i = 0; i < num_reg; i++) {
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
        setTimeout("di_1()", 141);
        return;
    });
}

function en_1() {
    var reg_ini = 5241;
    var num_reg = 6;
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
    pintar();
}

function numero_serie() {
    var cadena = "idOperacion=1900";
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos = data.split("\n");
        serie = datos[0];
    }).fail(function () {
        alert(modo_operacion.nomodo);
        setTimeout("numero_serie()", 1000);
    });
}

function pintar2() {
    $.ajax({url: nombrecsv2, dataType: "text", contentType: "charset-utf-8",}).done(grafica).fail(function () {
        alert(no_disponible);
    });
}

function pintar() {
    $.ajax({url: nombrecsv, dataType: "text", contentType: "charset-utf-8",}).done(grafica).fail(function () {
        pintar2();
    });
}

function grafica(data) {
    etiqX = [];
    data1 = [];
    data2 = [];
    data3 = [];
    data4 = [];
    data5 = [];
    data6 = [];
    data7 = [];
    data8 = [];
    data9 = [];
    data10 = [];
    data11 = [];
    data12 = [];
    data13 = [];
    data14 = [];
    data15 = [];
    data16 = [];
    let lines = data.split(/\n/);
    n_lineas = lines.length - 1;
    for (i = 1; i < n_lineas; i++) {
        auxiliar = lines[i].split(";");
        hora = auxiliar[1].split(" ");
        etiqX[i - 1] = hora[1];
        data1[i - 1] = auxiliar[26] / 10;
        data2[i - 1] = auxiliar[27] / 10;
        data3[i - 1] = auxiliar[28] / 10;
        if (digitals[64] == 1) {
            data4[i - 1] = auxiliar[12] / 10;
        } else {
        }
        if (digitals[65] == 1) {
            data4[i - 1] = auxiliar[12] / 10;
        } else {
        }
        if (integers[240] == 2) {
            data6[i - 1] = auxiliar[15] / 10;
        } else {
        }
        if (integers[245] == 2) {
            data7[i - 1] = auxiliar[16] / 10;
        } else {
        }
        data8[i - 1] = auxiliar[17] / 10;
        data9[i - 1] = auxiliar[18] / 10;
        data10[i - 1] = auxiliar[19] / 10;
        data11[i - 1] = auxiliar[20] / 10;
        data12[i - 1] = auxiliar[13] / 10;
        if (integers[241] == 1 || integers[241] == 2) {
            data13[i - 1] = auxiliar[21] / 10;
        } else {
        }
        if (integers[242] == 1 || integers[242] == 2) {
            data14[i - 1] = auxiliar[22] / 10;
        } else {
        }
        if (integers[243] == 1 || integers[243] == 2) {
            data15[i - 1] = auxiliar[23] / 10;
        } else {
        }
        if (integers[244] == 1 || integers[244] == 2) {
            data16[i - 1] = auxiliar[24] / 10;
        } else {
        }
    }
    var config = {
        type: 'line',
        data: {
            labels: etiqX,
            datasets: [
                {
                    label: consumida, //consumption
                    backgroundColor: window.chartColors.green2,
                    pointRadius: 0, borderColor: 'rgb(0,255,0)',
                    data: data1, fill: false,
                },
                {
                    label: calor, //heating
                    fill: false,
                    backgroundColor: window.chartColors.red2,
                    pointRadius: 0,
                    borderColor: 'rgb(255,0,0)',
                    data: data2, fill: false,
                },
                {
                    label: refrigeracion, //cooling
                    fill: false,
                    backgroundColor: window.chartColors.blue2,
                    pointRadius: 0,
                    borderColor: 'rgb(0,153,255)',
                    data: data3,
                    fill: false,
                }]
        },
        options: {
            responsive: true,
            title: {display: true, fontSize: 16, text: potencias},
            tooltips: {mode: 'index', intersect: false,},
            hover: {mode: 'nearest', intersect: true},
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {display: true, fontSize: 16, fontStyle: 'bold', labelString: horagrafica},
                    gridLines: {color: "rgba(191,191,191,1)"},
                    ticks: {fontColor: "rgba(54,54,54,1)"}
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {display: true, fontSize: 16, fontStyle: 'bold', labelString: 'kW'},
                    gridLines: {color: "rgba(191,191,191,1)"},
                    ticks: {fontColor: "rgba(54,54,54,1)"}
                }]
            }
        }
    };

    var config1 = {
        type: 'line',
        data: {
            labels: etiqX,
            datasets: [
                {
                    label: acs,
                    backgroundColor: window.chartColors.red2,
                    pointRadius: 0,
                    borderColor: 'rgb(255,0,0)',
                    data: data4, fill: false,
                },
                {
                    label: piscina,
                    fill: false,
                    backgroundColor: 'rgb(252,134,0)',
                    pointRadius: 0,
                    borderColor: 'rgb(252,134,0)',
                    data: data5, fill: false,
                },
                {
                    label: iner_cale,
                    fill: false,
                    backgroundColor: 'rgb(240,222,49)',
                    pointRadius: 0,
                    borderColor: 'rgb(240,222,49)',
                    data: data6, fill: false,
                },
                {
                    label: iner_refri,
                    fill: false,
                    backgroundColor: window.chartColors.blue2,
                    pointRadius: 0,
                    borderColor: 'rgb(0,153,255)',
                    data: data7, fill: false,
                },
                {
                    label: imp_cale,
                    fill: false,
                    backgroundColor: 'rgb(236,0,255)',
                    pointRadius: 0,
                    borderColor: 'rgb(236,0,255)',
                    data: data8, fill: false,
                },
                {
                    label: re_cale,
                    fill: false,
                    backgroundColor: 'rgb(240,119,252)',
                    pointRadius: 0, borderColor: 'rgb(240,119,252)',
                    data: data9, fill: false,
                },
                {
                    label: imp_cap, fill: false,
                    backgroundColor: 'rgb(0,135,0)',
                    pointRadius: 0,
                    borderColor: 'rgb(0,135,0)',
                    data: data10, fill: false,
                },
                {
                    label: re_cap, fill: false,
                    backgroundColor: window.chartColors.green2,
                    pointRadius: 0,
                    borderColor: 'rgb(0,255,0)',
                    data: data11, fill: false,
                }]
        },
        options: {
            responsive: true,
            title: {display: true, fontSize: 16, fontStyle: 'bold', text: temperaturas},
            tooltips: {mode: 'index', intersect: false,},
            hover: {mode: 'nearest', intersect: true},
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {display: true, fontSize: 16, fontStyle: 'bold', labelString: horagrafica},
                    gridLines: {color: "rgba(191,191,191,1)"},
                    ticks: {fontColor: "rgba(54,54,54,1)"}
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {display: true, fontSize: 16, fontStyle: 'bold', labelString: 'ºC'},
                    gridLines: {color: "rgba(191,191,191,1)"},
                    ticks: {fontColor: "rgba(54,54,54,1)"}
                }]
            }
        }
    };

    var config2 = {
        type: 'line',
        data: {
            labels: etiqX,
            datasets: [
                {
                    label: exterior,
                    backgroundColor: window.chartColors.green2,
                    pointRadius: 0, borderColor: 'rgb(0,255,0)',
                    data: data12, fill: false,
                },
                {
                    label: real1, fill: false,
                    backgroundColor: 'rgb(252,134,0)'
                    , pointRadius: 0, borderColor: 'rgb(252,134,0)',
                    data: data13, fill: false,
                },
                {
                    label: real2, fill: false,
                    backgroundColor: 'rgb(240,222,49)',
                    pointRadius: 0, borderColor: 'rgb(240,222,49)',
                    data: data14, fill: false,
                },
                {
                    label: real3,
                    fill: false,
                    backgroundColor: window.chartColors.blue2,
                    pointRadius: 0,
                    borderColor: 'rgb(0,153,255)',
                    data: data15, fill: false,
                },
                {
                    label: real4,
                    fill: false,
                    backgroundColor: window.chartColors.red2,
                    pointRadius: 0,
                    borderColor: 'rgb(248,0,0)',
                    data: data16, fill: false,
                },]
        },
        options: {
            responsive: true,
            title: {display: true, fontSize: 16, fontStyle: 'bold', text: temperaturas2},
            tooltips: {mode: 'index', intersect: false,},
            hover: {mode: 'nearest', intersect: true},
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {display: true, fontSize: 16, fontStyle: 'bold', labelString: horagrafica},
                    gridLines: {color: "rgba(191,191,191,1)"},
                    ticks: {fontColor: "rgba(54,54,54,1)"}
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {display: true, fontSize: 16, fontStyle: 'bold', labelString: 'ºC'},
                    gridLines: {color: "rgba(191,191,191,1)"},
                    ticks: {fontColor: "rgba(54,54,54,1)"}
                }]
            }
        }
    };
    var ctx = document.getElementById('canvas').getContext('2d');
    if (window.myLine) {
        window.myLine.clear();
        window.myLine.destroy();
    }
    window.myLine = new Chart(ctx, config);
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    if (window.myLine1) {
        window.myLine1.clear();
        window.myLine1.destroy();
    }
    window.myLine1 = new Chart(ctx1, config1);
    var ctx2 = document.getElementById('canvas2').getContext('2d');
    if (window.myLine2) {
        window.myLine2.clear();
        window.myLine2.destroy();
    }
    window.myLine2 = new Chart(ctx2, config2);
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