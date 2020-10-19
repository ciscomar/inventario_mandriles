const funcion = {};
const express = require('express');
const app = express();
mail_config = require('../email/conn.js');
var mailer = require('express-mailer');
mailer.extend(app, mail_config);
var schedule = require('node-schedule');

const db = require('../db/conn');
const dbE = require('../db/connEmpleados');
const dbA = require('../db/connAreas');

funcion.sendEmail = (dataEmail) => {

    //Enviar Correos
    app.mailer.send('email.ejs', {

        //Info General
        to: dataEmail.to,
        cc: dataEmail.cc,
        subject: dataEmail.subject,
        status: dataEmail.status,
        id: dataEmail.id,
        parte: dataEmail.parte,
        plataforma: dataEmail.plataforma,
        user: dataEmail.user,
        comentario: dataEmail.comentario,
        color: dataEmail.color,
        colorA: dataEmail.colorA,
        estado: dataEmail.estado,
        totalm: dataEmail.totalm

    }, function (err) {
        if (err) {
            console.log(err)
            return;
        }
        console.log('mail sent')
    });

};

funcion.controllerCorreosAll = ( callback) => {

    db.query(`SELECT correo FROM mandril_notificar`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerPlataforma = (callback) => {
    db.query(`SELECT * FROM mandril_plataforma`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })

}


funcion.controllerMandriles = (callback) => {
    db.query(`SELECT * FROM mandril_info`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

          
            callback(null, result);
        }
    })

}


funcion.controllerUbicacion = (callback) => {
    db.query(`SELECT * FROM mandril_ubicacion`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })

}



funcion.controllerInsertEquipoN = (id,  plataforma, periodo,parte, ubicacion, fecha, callback) => {

    db.query(`
    INSERT INTO mandril_info (mandril_id, mandril_plataforma,  mandril_periodo, mandril_parte, mandril_ubic, fecha_verificacion, status)
    VALUES( '${id}', '${plataforma}','${periodo}','${parte}','${ubicacion}','${fecha}', 'Activo')`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.controllerInsertStock = (id,  ubicacion, total, callback) => {

    db.query(`
    INSERT INTO mandril_stock (mandril_id, mandril_ubicacion,  mandril_total)
    VALUES( '${id}', ${ubicacion}, ${total})`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerInsertMovimiento = (mandril_id, accion, req_empleado, aut_empleado, id_ubicacion,total, comentario, callback) => {
    db.query(`
    INSERT INTO mandril_req (mandril_id, accion, emp_req, emp_aut, ubicacion,cantidad, comentario, fecha)
    VALUES( '${mandril_id}', '${accion}','${req_empleado}','${aut_empleado}','${id_ubicacion}',${total},'${comentario}', NOW())`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}



funcion.UpdateMandril = (id_mandril, plataforma,parte,ubicacion,periodo, callback) => {
    db.query(`UPDATE mandril_info SET 
    mandril_plataforma= "${plataforma}",
    mandril_parte= "${parte}",
    mandril_ubic= "${ubicacion}",
    mandril_periodo= "${periodo}"
    WHERE mandril_id = "${id_mandril}"`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.UpdateEntrada = (id,total,ubicacion, callback) => {
    db.query(`UPDATE mandril_stock SET 
    mandril_total= mandril_total + "${total}"
    WHERE mandril_id = "${id}" AND mandril_ubicacion=${ubicacion}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.UpdateSalida = (id,total,ubicacion, callback) => {
    db.query(`UPDATE mandril_stock SET 
    mandril_total= mandril_total - "${total}"
    WHERE mandril_id = "${id}" AND mandril_ubicacion=${ubicacion}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.getInfoMandril = (mandril,callback) => {
    db.query(`SELECT * FROM mandril_info, mandril_stock, mandril_ubicacion
     WHERE mandril_info.mandril_id='${mandril}' AND mandril_stock.mandril_id='${mandril}'
     AND mandril_stock.mandril_ubicacion=mandril_ubicacion.ubicacion_id`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);

        }
    })

}


funcion.getStockMandrilAlmacen = (mandril, ubicacion,callback) => {
    db.query(`SELECT * FROM mandril_stock
     WHERE mandril_id='${mandril}' AND mandril_ubicacion=${ubicacion}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);

        }
    })

}

funcion.controllerUpdateFechaVerificacion = (id_equipo, columna, callback) => {
    db.query(`UPDATE mandril_info SET 
    ${columna} = NOW()
    WHERE mandril_id = "${id_equipo}"`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerAllEquipo = (callback) => {
    db.query(`SELECT * FROM mandril_info`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);

        }
    })

}

funcion.controllerAllEquipoMov = (callback) => {
    db.query(`SELECT * FROM mandril_info WHERE status='Activo'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);

        }
    })

}

funcion.controllerSelectedEquipo = (id_equipo, callback) => {
    db.query(`SELECT * FROM mandril_info, mandril_tipo
    WHERE (mandril_info.mandril_tipo = mandril_tipo.id_tipo)
    AND mandril_id="${id_equipo}"
    ORDER BY mandril_id DESC`, function (err, result, fields) {

        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerTablaMandriles = (callback) => {
    db.query(`SELECT * FROM mandril_info
    WHERE status='Activo'
    ORDER BY mandril_id DESC`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}


funcion.controllerTablaMandrilesDisponibles = (callback) => {
    db.query(`SELECT *, SUM (mandril_stock.mandril_total) AS disponibles FROM mandril_stock, mandril_info
    WHERE (mandril_stock.mandril_ubicacion != 7 AND mandril_stock.mandril_ubicacion != 8) 
    AND mandril_stock.mandril_id= mandril_info.mandril_id
    GROUP BY mandril_stock.mandril_id`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}


funcion.controllerTablaMandrilesProduccion = (callback) => {
    db.query(`SELECT *, SUM (mandril_stock.mandril_total) AS disponibles FROM mandril_stock, mandril_info
    WHERE (mandril_stock.mandril_ubicacion =2) 
    AND mandril_stock.mandril_id= mandril_info.mandril_id
    GROUP BY mandril_stock.mandril_id`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}


funcion.controllerTablaMandrilesAlmacen = (callback) => {
    db.query(`SELECT *, SUM (mandril_stock.mandril_total) AS disponibles FROM mandril_stock, mandril_info
    WHERE (mandril_stock.mandril_ubicacion = 1) 
    AND mandril_stock.mandril_id= mandril_info.mandril_id
    GROUP BY mandril_stock.mandril_id`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.controllerTablaMandrilesAll = (callback) => {
    db.query(`SELECT *, SUM (mandril_stock.mandril_total) AS disponibles FROM mandril_stock, mandril_info
    WHERE mandril_stock.mandril_id= mandril_info.mandril_id
    GROUP BY mandril_stock.mandril_id`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}







funcion.controllerTablaMandrilesNoDisponibles = (callback) => {
    db.query(`SELECT * FROM mandril_stock, mandril_info
    WHERE (mandril_stock.mandril_ubicacion = 7) AND mandril_stock.mandril_id= mandril_info.mandril_id
    GROUP BY mandril_stock.mandril_id`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}


funcion.InfoMandrilEmail = (id,callback) => {
    db.query(`SELECT * FROM mandril_info
    WHERE mandril_id = '${id}' `, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result[0]);
        }
    })
}


funcion.controllerTablaInventario = (id,callback) => {
    db.query(`SELECT * FROM mandril_stock LEFT JOIN mandril_ubicacion
    ON (mandril_ubicacion.ubicacion_id= mandril_stock.mandril_ubicacion)
    WHERE mandril_stock.mandril_id=${id}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}


funcion.controllerTablaEquipo = (status, callback) => {
    db.query(`SELECT * FROM mandril_info
    WHERE status='${status}'
    ORDER BY mandril_id`, function (err, result, fields) {

        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.controllerTablaVerificacion = (callback) => {
    db.query(`SELECT * FROM mandril_info WHERE status='Activo'
    ORDER BY mandril_id DESC`, function (err, result, fields) {

        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}



funcion.controllerHistorialEquipo = (equipoid, callback) => {

    db.query(`SELECT * FROM mandril_req, mandril_ubicacion WHERE mandril_req.ubicacion= mandril_ubicacion.ubicacion_id
     AND mandril_id = '${equipoid}' ORDER BY fecha DESC`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.controllerHistorialVerificacion = (equipoid, callback) => {

    db.query(`SELECT * FROM mandril_verificacion WHERE mandril_id = '${equipoid}'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.controllerEmpleadosHistorial = (equipoid, callback) => {
    let nombres = [];
    db.query(`SELECT emp_req FROM mandril_req WHERE mandril_id = '${equipoid}'`, function (err, result, fields) {

        for (let i = 0; i < result.length; i++) {

            dbE.query(`SELECT emp_nombre FROM del_empleados WHERE emp_id= '${result[i].emp_req}'`, function (err, result2, fields) {

                nombres.push(result2[0].emp_nombre)
            })

        }
        if (err) {
            callback(err, null);
        } else {

            callback(null, nombres);
        }
    })


}

funcion.controllerInsertVerificacion = (info, callback) => {
    db.query(`
    INSERT INTO mandril_verificacion (mandril_id, emp_id,cant,
        filook,
        filonok,
        filoact,
        golpok,
        golpnok,
        golpact,
        hok,
        hnok,
        hact,
        soldok,
        soldnok,
        soldact,
        tapaok,
        tapanok,
        tapaact,
        mecanisok,
        mecanisnok,
        mecanisact,
        orientok,
        orientnok,
        orientact,
        muescok,
        muescnok,
        muescact,
        sucok,
        sucnok,
        sucact,
        bossok,
        bossnok,
        bossact,
         fecha,
         fecha_programada)
    VALUES( '${info.equipo}', '${info.user}',${info.cant},'${info.filook}','${info.filonok}','${info.filoact}','${info.golpok}','${info.golpnok}','${info.golpact}','${info.hok}','${info.hnok}','${info.hact}'
    ,'${info.soldok}','${info.soldnok}','${info.soldact}','${info.tapaok}','${info.tapanok}','${info.tapaact}','${info.mecanisok}','${info.mecanisnok}','${info.mecanisact}','${info.orientok}' ,'${info.orientnok}','${info.orientact}'
    ,'${info.muescok}','${info.muescnok}','${info.muescact}','${info.sucok}','${info.sucnok}','${info.sucact}','${info.bossok}','${info.bossnok}','${info.bossact}', NOW(),'${info.fecha_programada}' )`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerInsertNotificar = (correo, callback) => {
    db.query(`
    INSERT IGNORE INTO mandril_notificar (correo)
    VALUES( '${correo}')`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerTablaNotificar = (callback) => {

    db.query(`SELECT * FROM mandril_notificar`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.consultaVerificacion = (idverif,callback) => {

    db.query(`SELECT * FROM mandril_verificacion WHERE verif_id='${idverif}'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerInsertBaja = (mandril_id, emp_id, motivo, callback) => {
    db.query(`
    INSERT INTO mandril_req (mandril_id, accion, emp_req, emp_aut, ubicacion, comentario, fecha)
    VALUES( '${mandril_id}', 'Baja','','${emp_id}','','${motivo}', NOW())`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.controllerTipoEquipo = (callback) => {

    db.query(`SELECT * FROM mandril_tipo`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerIdTipo = (tipo, callback) => {

    db.query(`SELECT id_tipo FROM mandril_tipo WHERE tipo='${tipo}'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerAreas = (callback) => {

    dbA.query(`SELECT * FROM areas_subarea`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerDeleteNotificar = (correo, callback) => {

    db.query(`DELETE FROM mandril_notificar WHERE correo='${correo}'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.InsertPlataforma = (plataforma, callback) => {
    db.query(`
    INSERT INTO mandril_plataforma (plataforma)
    VALUES( '${plataforma}')`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.deleteplataforma = (idplat, callback) => {

    db.query(`DELETE FROM mandril_plataforma WHERE plataforma_id=${idplat}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.reporteAntes = (fechaInicial,FechaFinal, callback) => {

    db.query(`SELECT COUNT (*) AS antes FROM mandril_verificacion WHERE (DATE(fecha) BETWEEN '${fechaInicial}' AND '${FechaFinal}')
    AND DATE(fecha) < DATE(fecha_programada)`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

         
            callback(null, result);
        }
    })

}

funcion.reporteTiempo = (fechaInicial,FechaFinal, callback) => {

    db.query(`SELECT COUNT (*) AS tiempo FROM mandril_verificacion WHERE (DATE(fecha) BETWEEN '${fechaInicial}' AND '${FechaFinal}')
    AND DATE(fecha) = DATE(fecha_programada)`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

           
            callback(null, result);
        }
    })

}

funcion.reporteAtrasado = (fechaInicial,FechaFinal, callback) => {

    db.query(`SELECT COUNT (*) AS atrasado FROM mandril_verificacion WHERE (DATE(fecha) BETWEEN '${fechaInicial}' AND '${FechaFinal}')
    AND DATE(fecha) > DATE(fecha_programada)`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

       
            callback(null, result);
        }
    })

}







module.exports = funcion;