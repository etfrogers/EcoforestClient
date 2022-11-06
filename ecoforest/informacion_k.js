Chart.defaults.global.defaultFontSize = 15;
Chart.defaults.global.defaultFontColor = 'rgb(54,54,54)';
var color = Chart.helpers.color;
digitals = new Array;
integers = new Array;
analogs = new Array;
datos_correctos_mod = new Array;
var cont_err = 0;
var cont = 0;
var heat = 0;
var cool = 0;
var eeu = 0;
var pf = 0;
var timer_repeat;
var grafica_mensual;
var consumida;
var calor;
var refrigeracion;
var enero;
var febrero;
var marzo;
var abril;
var mayo;
var junio;
var julio;
var agosto;
var septiembre;
var octubre;
var noviembre;
var diciembre;
var medida_anual;
var spf_mensual;
var parcial;
var calor;
var frio;
var consumo;
var spf_anual;
var entero;
var calor1;
var frio1;
var consumo1;
var actual_anterior;
var medida_anual;
var anual;
var fecha = new Date();
var yyyy = fecha.getFullYear();
var ano = yyyy - 1;
var enero_ano;
var febrero_ano;
var marzo_ano;
var abril_ano;
var mayo_ano;
var junio_ano;
var julio_ano;
var agosto_ano;
var septiembre_ano;
var octubre_ano;
var noviembre_ano;
var diciembre_ano;

function Inicializar() {
    traducir();
    getVariablescgi();
}

function getVariablescgi() {
    window.clearTimeout(timer_repeat);
    en_1();
}

function en_1() {
    var reg_ini = 5096;
    var num_reg = 1;
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
    var reg_ini = 5144;
    var num_reg = 36;
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
            setTimeout("en_2()", 141);
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
        setTimeout("en_2()", 141);
        return;
    });
    grafica();
    traducir();
}

function traducir() {
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
    document.getElementById("icon_inf1").style.color = '#85b724';
    document.getElementById("user").style.color = '#85b724';
    consumida = modo_operacion.yellow;
    calor = modo_operacion.red;
    refrigeracion = modo_operacion.blue;
    grafica_mensual = info.tcontador_mensual;
    enero = cambio.tenero + " " + enero_ano;
    febrero = cambio.tfebrero + " " + febrero_ano;
    marzo = cambio.tmarzo + " " + marzo_ano;
    abril = cambio.tabril + " " + abril_ano;
    mayo = cambio.tmayo + " " + mayo_ano;
    junio = cambio.tjunio + " " + junio_ano;
    julio = cambio.tjulio + " " + julio_ano;
    agosto = cambio.tagosto + " " + agosto_ano;
    septiembre = cambio.tseptiembre + " " + septiembre_ano;
    octubre = cambio.toctubre + " " + octubre_ano;
    noviembre = cambio.tnoviembre + " " + noviembre_ano;
    diciembre = cambio.tdiciembre + " " + diciembre_ano;
    spf_anual = nuevas_paginas.spf_anual;
    calor2 = nuevas_paginas.produc_termica_total;
    consumo2 = system.grafica_total;
    anual = info.tcontador_anual;
    calor1 = modo_operacion.red;
    frio1 = modo_operacion.blue;
    consumo1 = modo_operacion.yellow;
    spf_mensual = nuevas_paginas.spf_mensual_mayus;
    actual_anterior = ano + '/' + yyyy;
}

function grafica(data) {
    if (integers[95] == 1) {
        enero_ano = yyyy;
        febrero_ano = ano;
        marzo_ano = ano;
        abril_ano = ano;
        mayo_ano = ano;
        junio_ano = ano;
        julio_ano = ano;
        agosto_ano = ano;
        septiembre_ano = ano;
        octubre_ano = ano;
        noviembre_ano = ano;
        diciembre_ano = ano;
        traducir();
    }
    if (integers[95] == 2) {
        enero_ano = yyyy;
        febrero_ano = yyyy;
        marzo_ano = ano;
        abril_ano = ano;
        mayo_ano = ano;
        junio_ano = ano;
        julio_ano = ano;
        agosto_ano = ano;
        septiembre_ano = ano;
        octubre_ano = ano;
        noviembre_ano = ano;
        diciembre_ano = ano;
        traducir();
    }
    if (integers[95] == 3) {
        enero_ano = ano;
        yyyy;
        febrero_ano = yyyy;
        marzo_ano = yyyy;
        abril_ano = ano;
        mayo_ano = ano;
        junio_ano = ano;
        julio_ano = ano;
        agosto_ano = ano;
        septiembre_ano = ano;
        octubre_ano = ano;
        ano;
        noviembre_ano = ano;
        diciembre_ano = ano;
        traducir();
    }
    if (integers[95] == 4) {
        enero_ano = ano;
        yyyy;
        febrero_ano = yyyy;
        marzo_ano = yyyy;
        abril_ano = yyyy;
        mayo_ano = ano;
        junio_ano = ano;
        julio_ano = ano;
        agosto_ano = ano;
        septiembre_ano = ano;
        octubre_ano = ano;
        noviembre_ano = ano;
        diciembre_ano = ano;
        traducir();
    }
    if (integers[95] == 5) {
        enero_ano = yyyy;
        febrero_ano = yyyy;
        marzo_ano = yyyy;
        abril_ano = yyyy;
        mayo_ano = yyyy;
        junio_ano = ano;
        julio_ano = ano;
        agosto_ano = ano;
        septiembre_ano = ano;
        octubre_ano = ano;
        noviembre_ano = ano;
        diciembre_ano = ano;
        traducir();
    }
    if (integers[95] == 6) {
        enero_ano = yyyy;
        febrero_ano = yyyy;
        marzo_ano = yyyy;
        abril_ano = yyyy;
        mayo_ano = yyyy;
        junio_ano = yyyy;
        julio_ano = ano;
        agosto_ano = ano;
        septiembre_ano = ano;
        octubre_ano = ano;
        noviembre_ano = ano;
        diciembre_ano = ano;
        traducir();
    }
    if (integers[95] == 7) {
        enero_ano = yyyy;
        febrero_ano = yyyy;
        marzo_ano = yyyy;
        abril_ano = yyyy;
        mayo_ano = yyyy;
        junio_ano = yyyy;
        julio_ano = yyyy;
        agosto_ano = ano;
        septiembre_ano = ano;
        octubre_ano = ano;
        noviembre_ano = ano;
        diciembre_ano = ano;
        traducir();
    }
    if (integers[95] == 8) {
        enero_ano = yyyy;
        febrero_ano = yyyy;
        marzo_ano = yyyy;
        abril_ano = yyyy;
        mayo_ano = yyyy;
        junio_ano = yyyy;
        julio_ano = yyyy;
        agosto_ano = yyyy;
        septiembre_ano = ano;
        octubre_ano = ano;
        noviembre_ano = ano;
        diciembre_ano = ano;
        traducir();
    }
    if (integers[95] == 9) {
        enero_ano = yyyy;
        febrero_ano = yyyy;
        marzo_ano = yyyy;
        abril_ano = yyyy;
        mayo_ano = yyyy;
        junio_ano = yyyy;
        julio_ano = yyyy;
        agosto_ano = yyyy;
        septiembre_ano = yyyy;
        octubre_ano = ano;
        noviembre_ano = ano;
        diciembre_ano = ano;
        traducir();
    }
    if (integers[95] == 10) {
        enero_ano = yyyy;
        febrero_ano = yyyy;
        marzo_ano = yyyy;
        abril_ano = yyyy;
        mayo_ano = yyyy;
        junio_ano = yyyy;
        julio_ano = yyyy;
        agosto_ano = yyyy;
        septiembre_ano = yyyy;
        octubre_ano = yyyy;
        noviembre_ano = ano;
        diciembre_ano = ano;
        traducir();
    }
    if (integers[95] == 11) {
        enero_ano = yyyy;
        febrero_ano = yyyy;
        marzo_ano = yyyy;
        abril_ano = yyyy;
        mayo_ano = yyyy;
        junio_ano = yyyy;
        julio_ano = yyyy;
        agosto_ano = yyyy;
        septiembre_ano = yyyy;
        octubre_ano = yyyy;
        noviembre_ano = yyyy;
        diciembre_ano = ano;
        traducir();
    }
    if (integers[95] == 12) {
        enero_ano = yyyy;
        febrero_ano = yyyy;
        marzo_ano = yyyy;
        abril_ano = yyyy;
        mayo_ano = yyyy;
        junio_ano = yyyy;
        julio_ano = yyyy;
        agosto_ano = yyyy;
        septiembre_ano = yyyy;
        octubre_ano = yyyy;
        noviembre_ano = yyyy;
        diciembre_ano = yyyy;
        traducir();
    }
    data1 = integers[167];
    data2 = integers[168];
    data3 = integers[169];
    data4 = integers[170];
    data5 = integers[171];
    data6 = integers[172];
    data7 = integers[173];
    data8 = integers[174];
    data9 = integers[175];
    data10 = integers[176];
    data11 = integers[177];
    data12 = integers[178];
    data13 = integers[143];
    data14 = integers[144];
    data15 = integers[145];
    data16 = integers[146];
    data17 = integers[147];
    data18 = integers[148];
    data19 = integers[149];
    data20 = integers[150];
    data21 = integers[151];
    data22 = integers[152];
    data23 = integers[153];
    data24 = integers[154];
    data25 = integers[155];
    data26 = integers[156];
    data27 = integers[157];
    data28 = integers[158];
    data29 = integers[159];
    data30 = integers[160];
    data31 = integers[161];
    data32 = integers[162];
    data33 = integers[163];
    data34 = integers[164];
    data35 = integers[165];
    data36 = integers[166];
    datacalorfrio = data13 + data14 + data15 + data16 + data17 + data18 + data19 + data20 + data21 + data22 + data23 + data24 + data25 + data26 + data27 + data28 + data29 + data30 + data31 + data32 + data33 + data34 + data35 + data36;
    dataconsumototal = data1 + data2 + data3 + data4 + data5 + data6 + data7 + data8 + data9 + data10 + data11 + data12;
    if (dataconsumototal > 90000 || datacalorfrio > 90000) {
        data37 = datacalorfrio / 1000;
        data38 = dataconsumototal / 1000;
        medida_mensual = "MWh";
    } else {
        data37 = datacalorfrio;
        data38 = dataconsumototal;
        medida_mensual = "kWh";
    }
    if (data38 != 0) {
        data39 = data37 / data38;
    } else {
        data39 = 0.0;
    }
    if (data39 > 0) {
        document.getElementById('numero_spf').innerHTML = data39.toFixed(1);
    } else {
        document.getElementById('numero_spf').innerHTML = 0;
    }
    dataconsumo = data1 + data2 + data3 + data4 + data5 + data6 + data7 + data8 + data9 + data10 + data11 + data12;
    datacalor = data13 + data14 + data15 + data16 + data17 + data18 + data19 + data20 + data21 + data22 + data23 + data24;
    datafrio = data25 + data26 + data27 + data28 + data29 + data30 + data31 + data32 + data33 + data34 + data35 + data36;
    if (dataconsumo > 90000 || datacalor > 90000 || datafrio > 90000) {
        data40 = dataconsumo / 1000;
        data41 = datacalor / 1000;
        data42 = datafrio / 1000;
        medida_anual = "MWh";
    } else {
        data40 = dataconsumo;
        data41 = datacalor;
        data42 = datafrio;
        medida_anual = "kWh";
    }
    if (data1 == 0) {
        data45 = 0;
    } else {
        dataenero = (data13 + data25) / data1;
        data45 = dataenero.toFixed(1);
    }
    if (data2 == 0) {
        data46 = 0;
    } else {
        datafebrero = (data14 + data26) / data2;
        data46 = datafebrero.toFixed(1);
    }
    if (data3 == 0) {
        data47 = 0;
    } else {
        datamarzo = (data15 + data27) / data3;
        data47 = datamarzo.toFixed(1);
    }
    if (data4 == 0) {
        data48 = 0;
    } else {
        dataabril = (data16 + data28) / data4;
        data48 = dataabril.toFixed(1);
    }
    if (data5 == 0) {
        data49 = 0;
    } else {
        datamayo = (data17 + data29) / data5;
        data49 = datamayo.toFixed(1);
    }
    if (data6 == 0) {
        data50 = 0;
    } else {
        datajunio = (data18 + data30) / data6;
        data50 = datajunio.toFixed(1);
    }
    if (data7 == 0) {
        data51 = 0;
    } else {
        datajulio = (data19 + data31) / data7;
        data51 = datajulio.toFixed(1);
    }
    if (data8 == 0) {
        data52 = 0;
    } else {
        dataagosto = (data20 + data32) / data8;
        data52 = dataagosto.toFixed(1);
    }
    if (data9 == 0) {
        data53 = 0;
    } else {
        dataseptiembre = (data21 + data33) / data9;
        data53 = dataseptiembre.toFixed(1);
    }
    if (data10 == 0) {
        data54 = 0;
    } else {
        dataoctubre = (data22 + data34) / data10;
        data54 = dataoctubre.toFixed(1);
    }
    if (data11 == 0) {
        data55 = 0;
    } else {
        datanoviembre = (data23 + data35) / data11;
        data55 = datanoviembre.toFixed(1);
    }
    if (data12 == 0) {
        data56 = 0;
    } else {
        datadiciembre = (data24 + data36) / data12;
        data56 = datadiciembre.toFixed(1);
    }
    var config = {
        type: 'horizontalBar',
        data: {
            labels: [enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre],
            datasets: [{
                label: consumida,
                backgroundColor: color(window.chartColors.green2).alpha(0.8).rgbString(),
                pointRadius: 0,
                borderColor: 'rgb(0, 255, 0)',
                borderWidth: 2,
                data: [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12],
                fill: true,
            }, {
                label: calor,
                fill: false,
                backgroundColor: color(window.chartColors.red2).alpha(0.8).rgbString(),
                pointRadius: 0,
                borderColor: 'rgb(255,0,0)',
                borderWidth: 2,
                data: [data13, data14, data15, data16, data17, data18, data19, data20, data21, data22, data23, data24],
                fill: true,
            }, {
                label: refrigeracion,
                fill: false,
                backgroundColor: color(window.chartColors.blue2).alpha(0.8).rgbString(),
                pointRadius: 0,
                borderColor: 'rgb(0,153,255)',
                borderWidth: 2,
                data: [data25, data26, data27, data28, data29, data30, data31, data32, data33, data34, data35, data36],
                fill: true,
            }]
        },
        options: {
            responsive: true,
            title: {display: true, fontSize: 16, text: grafica_mensual},
            tooltips: {mode: 'index', intersect: false,},
            hover: {mode: 'nearest', intersect: true},
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {display: true, fontSize: 16, fontStyle: 'bold', labelString: medida_mensual},
                    gridLines: {color: "rgba(162,162,162,1)"},
                    ticks: {fontColor: "rgba(54,54,54,1)", beginAtZero: true}
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {display: true, fontSize: 16, fontStyle: 'bold', labelString: ''},
                    gridLines: {color: "rgba(162,162,162,1)"},
                    ticks: {beginAtZero: true, fontColor: "rgba(54,54,54,1)"}
                }]
            }
        }
    };
    var config1 = {
        type: 'doughnut',
        data: {
            labels: [calor2, consumo2],
            datasets: [{
                labels: [],
                backgroundColor: [color(window.chartColors.purple2).alpha(0.8).rgbString(), color(window.chartColors.green2).alpha(0.5).rgbString()],
                borderColor: ['rgb(128,104,164)', 'rgb(0,255,0)'],
                pointRadius: 0,
                data: [data37, data38],
            },]
        },
        options: {
            cutoutPercentage: 60,
            maintainAspectRatio: true,
            responsive: true,
            legend: {display: true},
            animation: {animateScale: true, animateRotate: true},
            title: {display: true, fontSize: 16, text: spf_anual},
        },
    };
    var config2 = {
        type: 'horizontalBar',
        data: {
            labels: [actual_anterior],
            datasets: [{
                label: consumo1,
                backgroundColor: color(window.chartColors.green2).alpha(0.8).rgbString(),
                pointRadius: 0,
                borderColor: 'rgb(0, 255, 0)',
                borderWidth: 2,
                data: [data40],
                fill: false,
            }, {
                label: calor1,
                fill: false,
                backgroundColor: color(window.chartColors.red2).alpha(0.8).rgbString(),
                pointRadius: 0,
                borderColor: 'rgb(255,0,0)',
                borderWidth: 2,
                data: [data41],
                fill: false,
            }, {
                label: frio1,
                fill: false,
                backgroundColor: color(window.chartColors.blue2).alpha(0.8).rgbString(),
                pointRadius: 0,
                borderColor: 'rgb(0,153,255)',
                borderWidth: 2,
                data: [data42],
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {display: true, fontSize: 16, text: anual},
            tooltips: {mode: 'index', intersect: false,},
            hover: {mode: 'nearest', intersect: true},
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {display: true, fontSize: 16, fontStyle: 'bold', labelString: medida_anual},
                    gridLines: {color: "rgba(162,162,162,1)"},
                    ticks: {fontColor: "rgba(54,54,54,1)", beginAtZero: true}
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {display: true, fontSize: 16, fontStyle: 'bold', labelString: ''},
                    gridLines: {color: "rgba(162,162,162,1)"},
                    ticks: {beginAtZero: true, fontColor: "rgba(54,54,54,1)"}
                }]
            },
        }
    };
    var config3 = {
        type: 'horizontalBar',
        data: {
            labels: [enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre],
            datasets: [{
                label: 'SPF',
                backgroundColor: color(window.chartColors.orange2).alpha(0.8).rgbString(),
                pointRadius: 0,
                borderColor: 'rgb(255,200,0)',
                borderWidth: 2,
                data: [data45, data46, data47, data48, data49, data50, data51, data52, data53, data54, data55, data56],
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {display: true, fontSize: 16, text: spf_mensual},
            tooltips: {mode: 'index', intersect: false,},
            hover: {mode: 'nearest', intersect: true},
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {display: true, fontSize: 16, fontStyle: 'bold', labelString: ''},
                    gridLines: {color: "rgba(162,162,162,1)"},
                    ticks: {fontColor: "rgba(54,54,54,1)", beginAtZero: true}
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {display: true, fontSize: 16, fontStyle: 'bold', labelString: ''},
                    gridLines: {color: "rgba(162,162,162,1)"},
                    ticks: {beginAtZero: true, fontColor: "rgba(54,54,54,1)"}
                }]
            }
        }
    };
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.canvas.width = 190;
    ctx.canvas.height = 190;
    window.myLine = new Chart(ctx, config);
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    ctx1.canvas.width = 190;
    ctx1.canvas.height = 80;
    window.myLine1 = new Chart(ctx1, config1);
    var ctx2 = document.getElementById('canvas2').getContext('2d');
    ctx2.canvas.width = 190;
    ctx2.canvas.height = 100;
    window.myLine2 = new Chart(ctx2, config2);
    var ctx3 = document.getElementById('canvas3').getContext('2d');
    ctx3.canvas.width = 190;
    ctx3.canvas.height = 190;
    window.myLine2 = new Chart(ctx3, config3);
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