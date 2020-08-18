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

    db.query(`SELECT correo FROM equipo_notificar`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerPlataforma = (callback) => {
    dbA.query(`SELECT * FROM areas_subarea WHERE id_subarea>19`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })

}


funcion.controllerMandriles = (callback) => {
    db.query(`SELECT * FROM equipo_info`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

          
            callback(null, result);
        }
    })

}


funcion.controllerUbicacion = (callback) => {
    db.query(`SELECT * FROM equipo_ubicacion`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })

}



funcion.controllerInsertEquipoN = (id,  plataforma, periodo,parte, ubicacion, fecha, callback) => {

    db.query(`
    INSERT INTO equipo_info (equipo_id, equipo_plataforma,  equipo_periodo, equipo_parte, equipo_ubic, fecha_verificacion, status)
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
    INSERT INTO equipo_stock (equipo_id, equipo_ubicacion,  equipo_total)
    VALUES( '${id}', ${ubicacion}, ${total})`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerInsertMovimiento = (equipo_id, accion, req_empleado, aut_empleado, id_ubicacion,total, comentario, callback) => {
    db.query(`
    INSERT INTO equipo_req (equipo_id, accion, emp_req, emp_aut, ubicacion,cantidad, comentario, fecha)
    VALUES( '${equipo_id}', '${accion}','${req_empleado}','${aut_empleado}','${id_ubicacion}',${total},'${comentario}', NOW())`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}



funcion.UpdateMandril = (id_mandril, plataforma,parte,ubicacion,periodo, callback) => {
    db.query(`UPDATE equipo_info SET 
    equipo_plataforma= "${plataforma}",
    equipo_parte= "${parte}",
    equipo_ubic= "${ubicacion}",
    equipo_periodo= "${periodo}"
    WHERE equipo_id = "${id_mandril}"`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.UpdateEntrada = (id,total,ubicacion, callback) => {
    db.query(`UPDATE equipo_stock SET 
    equipo_total= equipo_total + "${total}"
    WHERE equipo_id = "${id}" AND equipo_ubicacion=${ubicacion}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.UpdateSalida = (id,total,ubicacion, callback) => {
    db.query(`UPDATE equipo_stock SET 
    equipo_total= equipo_total - "${total}"
    WHERE equipo_id = "${id}" AND equipo_ubicacion=${ubicacion}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.getInfoMandril = (mandril,callback) => {
    db.query(`SELECT * FROM equipo_info, equipo_stock, equipo_ubicacion
     WHERE equipo_info.equipo_id='${mandril}' AND equipo_stock.equipo_id='${mandril}'
     AND equipo_stock.equipo_ubicacion=equipo_ubicacion.ubicacion_id`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);

        }
    })

}


funcion.getStockMandrilAlmacen = (mandril, ubicacion,callback) => {
    db.query(`SELECT * FROM equipo_stock
     WHERE equipo_id='${mandril}' AND equipo_ubicacion=${ubicacion}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);

        }
    })

}

funcion.controllerUpdateFechaVerificacion = (id_equipo, columna, callback) => {
    db.query(`UPDATE equipo_info SET 
    ${columna} = NOW()
    WHERE equipo_id = "${id_equipo}"`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerAllEquipo = (callback) => {
    db.query(`SELECT * FROM equipo_info`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);

        }
    })

}

funcion.controllerAllEquipoMov = (callback) => {
    db.query(`SELECT * FROM equipo_info WHERE status='Activo'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);

        }
    })

}

funcion.controllerSelectedEquipo = (id_equipo, callback) => {
    db.query(`SELECT * FROM equipo_info, equipo_tipo
    WHERE (equipo_info.equipo_tipo = equipo_tipo.id_tipo)
    AND equipo_id="${id_equipo}"
    ORDER BY equipo_id DESC`, function (err, result, fields) {

        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerTablaMandriles = (callback) => {
    db.query(`SELECT * FROM equipo_info
    WHERE status='Activo'
    ORDER BY equipo_id DESC`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}


funcion.controllerTablaMandrilesDisponibles = (callback) => {
    db.query(`SELECT *, SUM (equipo_stock.equipo_total) AS disponibles FROM equipo_stock, equipo_info
    WHERE (equipo_stock.equipo_ubicacion != 7 AND equipo_stock.equipo_ubicacion != 8) 
    AND equipo_stock.equipo_id= equipo_info.equipo_id
    GROUP BY equipo_stock.equipo_id`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}


funcion.controllerTablaMandrilesNoDisponibles = (callback) => {
    db.query(`SELECT * FROM equipo_stock, equipo_info
    WHERE (equipo_stock.equipo_ubicacion = 7) AND equipo_stock.equipo_id= equipo_info.equipo_id
    GROUP BY equipo_stock.equipo_id`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}


funcion.InfoMandrilEmail = (id,callback) => {
    db.query(`SELECT * FROM equipo_info
    WHERE equipo_id = '${id}' `, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result[0]);
        }
    })
}


funcion.controllerTablaInventario = (id,callback) => {
    db.query(`SELECT * FROM equipo_stock LEFT JOIN equipo_ubicacion
    ON (equipo_ubicacion.ubicacion_id= equipo_stock.equipo_ubicacion)
    WHERE equipo_stock.equipo_id=${id}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}


funcion.controllerTablaEquipo = (status, callback) => {
    db.query(`SELECT * FROM equipo_info
    WHERE status='${status}'
    ORDER BY equipo_id`, function (err, result, fields) {

        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.controllerTablaVerificacion = (callback) => {
    db.query(`SELECT * FROM equipo_info WHERE status='Activo'
    ORDER BY equipo_id DESC`, function (err, result, fields) {

        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}



funcion.controllerHistorialEquipo = (equipoid, callback) => {

    db.query(`SELECT * FROM equipo_req, equipo_ubicacion WHERE equipo_req.ubicacion= equipo_ubicacion.ubicacion_id
     AND equipo_id = '${equipoid}' ORDER BY fecha DESC`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.controllerHistorialVerificacion = (equipoid, callback) => {

    db.query(`SELECT * FROM equipo_verificacion WHERE equipo_id = '${equipoid}'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.controllerEmpleadosHistorial = (equipoid, callback) => {
    let nombres = [];
    db.query(`SELECT emp_req FROM equipo_req WHERE equipo_id = '${equipoid}'`, function (err, result, fields) {

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
    INSERT INTO equipo_verificacion (equipo_id, emp_id,cant,
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
         fecha)
    VALUES( '${info.equipo}', '${info.user}',${info.cant},'${info.filook}','${info.filonok}','${info.filoact}','${info.golpok}','${info.golpnok}','${info.golpact}','${info.hok}','${info.hnok}','${info.hact}'
    ,'${info.soldok}','${info.soldnok}','${info.soldact}','${info.tapaok}','${info.tapanok}','${info.tapaact}','${info.mecanisok}','${info.mecanisnok}','${info.mecanisact}','${info.orientok}' ,'${info.orientnok}','${info.orientact}'
    ,'${info.muescok}','${info.muescnok}','${info.muescact}','${info.sucok}','${info.sucnok}','${info.sucact}','${info.bossok}','${info.bossnok}','${info.bossact}', NOW())`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerInsertNotificar = (correo, callback) => {
    db.query(`
    INSERT IGNORE INTO equipo_notificar (correo)
    VALUES( '${correo}')`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerTablaNotificar = (callback) => {

    db.query(`SELECT * FROM equipo_notificar`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.consultaVerificacion = (idverif,callback) => {

    db.query(`SELECT * FROM equipo_verificacion WHERE verif_id='${idverif}'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerInsertBaja = (equipo_id, emp_id, motivo, callback) => {
    db.query(`
    INSERT INTO equipo_req (equipo_id, accion, emp_req, emp_aut, ubicacion, comentario, fecha)
    VALUES( '${equipo_id}', 'Baja','','${emp_id}','','${motivo}', NOW())`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.controllerTipoEquipo = (callback) => {

    db.query(`SELECT * FROM equipo_tipo`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerIdTipo = (tipo, callback) => {

    db.query(`SELECT id_tipo FROM equipo_tipo WHERE tipo='${tipo}'`, function (err, result, fields) {
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

    db.query(`DELETE FROM equipo_notificar WHERE correo='${correo}'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}




module.exports = funcion;