//Conexion a base de datos
const db = require('../public/db/conn');
const controller = {};

//Require Funciones
const funcion = require('../public/js/controllerFunctions');
const funcionE = require('../public/js/empleadosFunctions');

// Index GET
controller.index_GET = (req, res) => {
    res.render('index.ejs');

};


controller.crear_mandril_GET = (req, res) => {
    res.render('login.ejs');
};

//Login
controller.login = (req, res) => {
    loginId = req.params.id
    if (loginId == 'verificacion') {
        funcionE.empleadosAccessAll(2, '>=', (err, result) => {

            res.render('login.ejs', {
                data: loginId, data2: result
            });
        });
    } else
        if (loginId == 'crear_equipo') {
            funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                res.render('login.ejs', {
                    data: loginId, data2: result
                });
            });
        } else
            if (loginId == 'movimiento') {
                funcionE.empleadosAccessAll(1, '>=', (err, result) => {

                    res.render('login.ejs', {
                        data: loginId, data2: result
                    });
                });
            } else
                if (loginId == 'modificar') {
                    funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                        res.render('login.ejs', {
                            data: loginId, data2: result
                        });
                    });
                } else
                    if (loginId == 'alta_notificar') {
                        funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                            res.render('login.ejs', {
                                data: loginId, data2: result
                            });
                        });
                    } else
                        if (loginId == 'alta_acceso') {
                            funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                                res.render('login.ejs', {
                                    data: loginId, data2: result
                                });
                            });
                        } else

                            if (loginId == 'alta_baja') {
                                funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                                    res.render('login.ejs', {
                                        data: loginId, data2: result
                                    });
                                });
                            } else
                                if (loginId == 'entrada_cedula') {
                                    funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                                        res.render('login.ejs', {
                                            data: loginId, data2: result
                                        });
                                    });
                                } else
                                    if (loginId == 'plataforma') {
                                        funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                                            res.render('login.ejs', {
                                                data: loginId, data2: result
                                            });
                                        });
                                    } else
                                        if (loginId == 'reporte') {
                                            funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                                                res.render('login.ejs', {
                                                    data: loginId, data2: result
                                                });
                                            });
                                        }
}


controller.crear_mandril_POST = (req, res) => {

    numeroEmpleado = req.body.user;
    nuevo = "false"
    funcion.controllerAreas((err, result6) => {
        if (err) throw err;

        funcion.controllerAllEquipo((err, result4) => {
            if (err) throw err;
            funcionE.empleadosNombre(numeroEmpleado, (err, result3) => {
                if (err) throw err;
                funcion.controllerPlataforma((err, result1) => {
                    if (err) throw err;


                    res.render('crear_mandril.ejs', {
                        data: result1, data3: result3, data4: numeroEmpleado, data5: result4, data7: result6, data8: nuevo
                    });
                });
            });
        });
    });

};




controller.alta_baja_POST = (req, res) => {

    numeroEmpleado = req.body.user;
    nuevo = "false"

    funcionE.empleadosNombre(numeroEmpleado, (err, result3) => {
        if (err) throw err;


        funcion.controllerMandriles((err, result8) => {
            if (err) throw err;


            res.render('alta_baja.ejs', {
                data3: result3, data8: result8, numeroEmpleado, result3, data9: nuevo
            });

        });
    });
};





controller.guardar_mandril_POST = (req, res) => {

    let id = (req.body.id)
    let plataforma = (req.body.plataforma)
    let periodo = (req.body.periodo)
    let fecha_verificacion = (req.body.fecha_verificacion)
    let total = req.body.total;
    let parte = req.body.parte
    let ubicacion = req.body.ubicacion
    let nombre = req.body.nombreempleado
    nuevo = 'true'


    funcion.controllerInsertMovimiento(id, "Alta", "", nombre, "1", total, "", (err, result) => {
        if (err) throw err;
    });

    funcion.controllerInsertEquipoN(id, plataforma, periodo, parte, ubicacion, fecha_verificacion, (err, result) => {
        if (err) throw err;
    });


    funcion.controllerInsertStock(id, 1, total, (err, result) => {
        if (err) throw err;
    });

    funcion.controllerUbicacion((err, result2) => {
        if (err) throw err;

        for (let i = 1; i < result2.length; i++) {
            funcion.controllerInsertStock(id, result2[i].ubicacion_id, 0, (err, result) => {
                if (err) throw err;
            });

        }


    });

    funcion.controllerAreas((err, result6) => {
        if (err) throw err;

        funcion.controllerAllEquipo((err, result4) => {
            if (err) throw err;
            funcionE.empleadosNombre(numeroEmpleado, (err, result3) => {
                if (err) throw err;
                funcion.controllerPlataforma((err, result1) => {
                    if (err) throw err;


                    res.render('crear_mandril.ejs', {
                        data: result1, data3: result3, data4: numeroEmpleado, data5: result4, data7: result6, data8: nuevo
                    });
                });
            });
        });
    });



};



controller.movimiento_POST = (req, res) => {
    numeroEmpleado = req.body.user;
    nuevo = 'false'
    funcionE.empleadosNombre(numeroEmpleado, (err, result5) => {
        if (err) throw err;
        funcion.controllerAllEquipoMov((err, result4) => {
            if (err) throw err;
            funcion.controllerPlataforma((err, result1) => {
                if (err) throw err;
                funcion.controllerUbicacion((err, result2) => {
                    if (err) throw err;
                    funcionE.empleadosAll((err, result3) => {
                        if (err) throw err;

                        res.render('movimiento.ejs', {
                            data: result1, data2: result2, data3: result3, data4: numeroEmpleado, data5: result4, data6: result5, data7: nuevo
                        });

                    });
                });
            });
        });
    });

};


controller.entrada_cedula_POST = (req, res) => {
    numeroEmpleado = req.body.user;
    nuevo = 'false'
    funcionE.empleadosNombre(numeroEmpleado, (err, result5) => {
        if (err) throw err;
        funcion.controllerAllEquipoMov((err, result4) => {
            if (err) throw err;
            funcion.controllerPlataforma((err, result1) => {
                if (err) throw err;
                funcion.controllerUbicacion((err, result2) => {
                    if (err) throw err;
                    funcionE.empleadosAll((err, result3) => {
                        if (err) throw err;

                        res.render('entrada_cedula.ejs', {
                            data: result1, data2: result2, data3: result3, data4: numeroEmpleado, data5: result4, data6: result5, data7: nuevo
                        });

                    });
                });
            });
        });
    });

};




controller.guardar_movimiento_POST = (req, res) => {

    aut_empleado = (req.body.aut_empleado)
    req_empleado = (req.body.req_empleado)
    mandril_id = (req.body.id_equipo)
    accion = (req.body.accion)
    ubicacion = (req.body.ubicacion)
    comentario = (req.body.comentario)
    totalm = req.body.totalm
    empleado = req.body.aut_empleado;
    numeroEmpleado = empleado.substring(0, empleado.indexOf(" -"));
    nombre = empleado.substring(empleado.lastIndexOf("-") + 2)
    nuevo = 'true'


    funcion.controllerInsertMovimiento(mandril_id, accion, req_empleado, aut_empleado, ubicacion, totalm, comentario, (err, result) => {
        if (err) throw err;

        if (accion == "Entrada") {
            funcion.UpdateEntrada(mandril_id, totalm, 1, (err, result) => {
                if (err) throw err;
            });
            funcion.UpdateSalida(mandril_id, totalm, ubicacion, (err, result) => {
                if (err) throw err;
            });

        } else {

            funcion.UpdateEntrada(mandril_id, totalm, ubicacion, (err, result) => {
                if (err) throw err;
            });
            funcion.UpdateSalida(mandril_id, totalm, 1, (err, result) => {
                if (err) throw err;
            });

        }

        funcion.controllerAllEquipoMov((err, result4) => {
            if (err) throw err;

            funcion.controllerUbicacion((err, result2) => {
                if (err) throw err;
                funcionE.empleadosAll((err, result3) => {
                    if (err) throw err;

                    res.render('movimiento.ejs', {
                        data2: result2, data3: result3, data4: numeroEmpleado, data5: result4, data6: nombre, data7: nuevo
                    });




                    if (ubicacion == 7) {

                        funcion.InfoMandrilEmail(mandril_id, (err, mandrilInfo) => {

                            funcion.controllerCorreosAll((err, correo) => {
                                for (var i = 0; i < correo.length; i++) {


                                    to = correo[i].correo;
                                    cc = '';
                                    subject = 'Almacen de Mandriles: #' + mandril_id + ' Parte: ' + mandrilInfo.mandril_parte + ' Plataforma: ' + mandrilInfo.mandril_plataforma
                                    status = 'Mandril No Disponible';
                                    id = mandril_id
                                    parte = mandrilInfo.mandril_parte
                                    plataforma = mandrilInfo.mandril_plataforma
                                    user = nombre
                                    comentario = comentario
                                    color = '#ff0000'
                                    colorA = '#ff0000'
                                    estado = 'No Disponible'
                                    dataEmail = {
                                        to, cc, subject, status, id, parte, plataforma, user, comentario, color, colorA, estado, totalm
                                    }

                                    funcion.sendEmail(dataEmail);
                                }
                            });
                        })
                    }
                });
            });
        });
    });
};








controller.guardar_movimiento_cedula_POST = (req, res) => {


    aut_empleado = req.body.aut_empleado
    mandril_id = req.body.id_equipo
    accion = req.body.accion
    comentario = req.body.comentario
    mandriles = req.body.mandriles
    object = JSON.parse(mandriles)
    let accionI
    if (accion == "entrada") {
        accionI = "Entrada"

    } else {
        accionI = "Salida"
    }

    for (let i = 0; i < object.length; i++) {

        funcion.controllerInsertMovimiento(object[i].mandril, accionI, "Movimiento Cedula", aut_empleado, 2, object[i].cantidad, comentario, (err, result) => {
            if (err) throw err;

            if (accionI == "Entrada") {
                funcion.UpdateEntrada(object[i].mandril, object[i].cantidad, 1, (err, result) => {
                    if (err) throw err;
                });
                funcion.UpdateSalida(object[i].mandril, object[i].cantidad, 2, (err, result) => {
                    if (err) throw err;
                });

            } else {

                funcion.UpdateEntrada(object[i].mandril, object[i].cantidad, 2, (err, result) => {
                    if (err) throw err;
                });
                funcion.UpdateSalida(object[i].mandril, object[i].cantidad, 1, (err, result) => {
                    if (err) throw err;
                });

            }


        });
    }



    funcion.controllerTablaMandrilesAlmacen((err, result2) => {
        if (err) throw err;

        funcion.controllerTablaMandrilesProduccion((err, result3) => {
            if (err) throw err;

            funcion.controllerTablaMandrilesAll((err, result4) => {
                if (err) throw err;


                res.render('mandriles.ejs', {

                    data2: result2, data3: result3, data4: result4
                });


            });
        });
    });





};




controller.mandriles_GET = (req, res) => {



    funcion.controllerTablaMandrilesAlmacen((err, result2) => {
        if (err) throw err;

        funcion.controllerTablaMandrilesProduccion((err, result3) => {
            if (err) throw err;

            funcion.controllerTablaMandrilesAll((err, result4) => {
                if (err) throw err;


                res.render('mandriles.ejs', {

                    data2: result2, data3: result3, data4: result4
                });


            });
        });
    });

};



controller.no_disponibles_GET = (req, res) => {



    funcion.controllerTablaMandrilesNoDisponibles((err, result3) => {
        if (err) throw err;

        res.render('no_disponibles.ejs', {
            data3: result3
        });

    });


};


controller.inventario_POST = (req, res) => {

    mandril_id = req.body.mandril_id2;

    funcion.controllerTablaInventario(mandril_id, (err, result) => {
        if (err) throw err;



        res.render('inventario.ejs', {
            data: result
        });

    });
};




controller.historial_POST = (req, res) => {

    mandril_id = (req.body.mandril_id2);

    funcion.controllerHistorialEquipo(mandril_id, (err, result) => {
        if (err) throw err;



        res.render('historial.ejs', {
            data: result
        });
    });

};

controller.historial_mantenimiento_POST = (req, res) => {

    mandril_id = (req.body.mandril_id2);

    funcion.controllerHistorialVerificacion(mandril_id, (err, result) => {
        if (err) throw err;

        res.render('historial_mantenimiento.ejs', {
            data: result
        });

    });
};


controller.verificacion_POST = (req, res) => {
    empleado = req.body.user

    funcionE.empleadosNombre(empleado, (err, result2) => {
        if (err) throw err;

        empleado = empleado + " - " + result2



        funcion.controllerTablaMandrilesDisponibles((err, result4) => {
            if (err) throw err;


            res.render('mantenimientos.ejs', {
                data2: empleado, data3: result2, data4: result4
            });


        });
    });
};


controller.verificar_POST = (req, res) => {
    equipo = req.body.mandril_id2;
    user = req.body.user;
    fecharyr = req.body.fecharyr
    fechaprogramada = req.body.fecha_programada


    res.render('verificar.ejs', {
        data: equipo, data2: user, fecha: fecharyr, fecha_programada: fechaprogramada
    });


};


controller.guardar_mantenimiento_POST = (req, res) => {
    info = req.body



    funcion.controllerInsertVerificacion(info, (err, result2) => {
        if (err) throw err;

        funcion.controllerUpdateFechaVerificacion(info.equipo, "fecha_verificacion", (err, result2) => {
            if (err) throw err;


            funcion.controllerTablaMandrilesDisponibles((err, result4) => {
                if (err) throw err;


                res.render('mantenimientos.ejs', {
                    data2: info.user, data4: result4
                });
            });
        });
    });

};



controller.modificar_POST = (req, res) => {
    empleado = req.body.user
    nuevo = "false"
    funcionE.empleadosNombre(empleado, (err, result2) => {
        if (err) throw err;

        empleadoN = req.body.user + ' - ' + result2

        funcion.controllerMandriles((err, result) => {
            if (err) throw err;

            funcion.controllerPlataforma((err, result1) => {
                if (err) throw err;


                res.render('modificar_mandril.ejs', {
                    data: result, data3: empleadoN, data2: result1, data8: nuevo
                });

            });
        });
    });

};



controller.verificar_consulta_POST = (req, res) => {
    idverif = req.body.idverif


    funcion.consultaVerificacion(idverif, (err, result) => {
        if (err) throw err;


        res.render('verificar_consulta.ejs', {
            data: result[0]
        });

    });


};


controller.guardar_modificacion_POST = (req, res) => {

    id_mandril = req.body.id_mandril
    plataforma = req.body.plataforma
    parte = req.body.parte
    ubicacion = req.body.ubicacion
    periodo = req.body.periodo
    nuevo = "true"



    funcion.UpdateMandril(id_mandril, plataforma, parte, ubicacion, periodo, (err, result10) => {
        if (err) throw err;

        funcion.controllerMandriles((err, result) => {
            if (err) throw err;

            funcion.controllerPlataforma((err, result1) => {
                if (err) throw err;



                res.render('modificar_mandril.ejs', {
                    data: result, data3: empleadoN, data2: result1, data8: nuevo
                });

            });

        });

    });


};


controller.alta_notificar_POST = (req, res) => {
    numeroEmpleado = req.body.user;

    funcion.controllerTablaNotificar((err, result3) => {
        if (err) throw err;

        funcionE.empleadosTodos((err, result) => {
            if (err) throw err;



            res.render('alta_notificar.ejs', {
                data: result, data2: result3
            });
        });
    });
};


controller.guardar_notificar_POST = (req, res) => {

    correo = req.body.correo;

    funcion.controllerInsertNotificar(correo, (err, result2) => {
        if (err) throw err;
        funcion.controllerTablaNotificar((err, result3) => {
            if (err) throw err;

            funcionE.empleadosTodos((err, result) => {
                if (err) throw err;

                res.render('alta_notificar.ejs', {
                    data: result, data2: result3
                });
            });
        });
    });
};


controller.eliminar_notificar_POST = (req, res) => {

    correo = req.body.correo2;

    funcion.controllerDeleteNotificar(correo, (err, result2) => {
        if (err) throw err;
        funcion.controllerTablaNotificar((err, result3) => {
            if (err) throw err;

            funcionE.empleadosTodos((err, result) => {
                if (err) throw err;

                res.render('alta_notificar.ejs', {
                    data: result, data2: result3
                });
            });
        });
    });
};


controller.alta_acceso_POST = (req, res) => {
    numeroEmpleado = req.body.user;

    funcionE.empleadosTodosId((err, result) => {
        if (err) throw err;

        funcionE.empleadosAccesos((err, result2) => {
            if (err) throw err;

            funcionE.empleadosAll((err, result3) => {
                if (err) throw err;

                res.render('alta_acceso.ejs', {
                    data: result, data2: result2, data3: result3
                });
            });
        });
    });

};


controller.guardar_acceso_POST = (req, res) => {
    gaffete = req.body.gaffete;
    acceso = req.body.acceso;

    if (acceso == 'Admin') {
        acceso = 2;
    } else {
        acceso = 1
    }

    funcionE.empleadosInsertAcceso(gaffete, acceso, (err, result4) => {
        if (err) throw err;
        funcionE.empleadosTodosId((err, result) => {
            if (err) throw err;

            funcionE.empleadosAccesos((err, result2) => {
                if (err) throw err;

                funcionE.empleadosAll((err, result3) => {
                    if (err) throw err;

                    res.render('alta_acceso.ejs', {
                        data: result, data2: result2, data3: result3
                    });
                });
            });
        });
    });
};


controller.delete_acceso_POST = (req, res) => {
    gaffete = req.body.gaffete2;


    funcionE.empleadosDeleteAcceso(gaffete, (err, result3) => {
        if (err) throw err;
        funcionE.empleadosTodosId((err, result) => {
            if (err) throw err;

            funcionE.empleadosAccesos((err, result2) => {
                if (err) throw err;
                funcionE.empleadosAll((err, result4) => {
                    if (err) throw err;

                    res.render('alta_acceso.ejs', {
                        data: result, data2: result2, data3: result4
                    });
                });
            });
        });
    });
};


controller.guardar_alta_baja_POST = (req, res) => {

    mandril = req.body.mandril
    movimiento = req.body.movimiento
    total = req.body.total
    empleado = req.body.empleado
    comentario = req.body.comentario


    if (movimiento == "Alta") {
        funcion.UpdateEntrada(mandril, total, 1, (err, result) => {
            if (err) throw err;
        });
    } else {
        funcion.UpdateEntrada(mandril, total, 8, (err, result) => {
            if (err) throw err;
        });
        funcion.UpdateSalida(mandril, total, 1, (err, result) => {
            if (err) throw err;
        });
    }

    funcion.controllerInsertMovimiento(mandril, movimiento, "", empleado, "1", total, comentario, (err, result) => {
        if (err) throw err;
    });



    nuevo = "true"
    numeroEmpleado = empleado

    result3 = ""

    funcion.controllerMandriles((err, result8) => {
        if (err) throw err;


        res.render('alta_baja.ejs', {
            data8: result8, empleado, data9: nuevo, numeroEmpleado, result3,
        });

    });

};


controller.consulta_mandril_GET = (req, res) => {


    mandril = req.params.id;

    funcion.getInfoMandril(mandril, (err, result) => {
        if (err) throw err;

        res.send(result);
    });

};


controller.consulta_mandril_stock_entrada_GET = (req, res) => {


    mandril = req.params.id;

    funcion.getStockMandrilAlmacen(mandril, 2, (err, result) => {
        if (err) throw err;

        res.send(result);
    });

};


controller.consulta_mandril_stock_salida_GET = (req, res) => {


    mandril = req.params.id;

    funcion.getStockMandrilAlmacen(mandril, 1, (err, result) => {
        if (err) throw err;

        res.send(result);
    });

};



controller.plataforma_POST = (req, res) => {

    funcion.controllerPlataforma((err, result1) => {
        if (err) throw err;


        res.render('plataformas.ejs', {
            data: result1
        });
    });

};



controller.guardar_plataforma_POST = (req, res) => {

    plataforma = req.body.plataforma

    funcion.InsertPlataforma(plataforma, (err, result) => {
        if (err) throw err;


        funcion.controllerPlataforma((err, result1) => {
            if (err) throw err;


            res.render('plataformas.ejs', {
                data: result1
            });
        });
    });
};


controller.delete_plataforma_POST = (req, res) => {

    idplat = req.body.idplataforma

    funcion.deleteplataforma(idplat, (err, result) => {
        if (err) throw err;


        funcion.controllerPlataforma((err, result1) => {
            if (err) throw err;


            res.render('plataformas.ejs', {
                data: result1
            });
        });
    });
};



controller.reporte_POST = (req, res) => {


    res.render('reporte_fecha.ejs', {

    });
}


controller.reporte_grafica_POST = (req, res) => {
    fechaInicial = req.body.fecha_inicial
    fechaFinal = req.body.fecha_final

   
    funcion.reporteAntes(fechaInicial, fechaFinal, (err, result1) => {
        if (err) throw err;

        funcion.reporteTiempo(fechaInicial, fechaFinal, (err, result2) => {
            if (err) throw err;

            funcion.reporteAtrasado(fechaInicial, fechaFinal, (err, result3) => {
                if (err) throw err;

   


              
                res.render('reporte_grafica.ejs', {

                    rantes: result1[0].antes, rtiempo:result2[0].tiempo, ratrasado:result3[0].atrasado, inicial:fechaInicial, final:fechaFinal


                });
            });
        });
    });
}


module.exports = controller;