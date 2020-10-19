const express = require('express');
const router = express.Router();
const routesController = require('./routesController')

//Routes

router.get('/', routesController.index_GET);
router.get('/login/:id', routesController.login);
router.get('/crear_equipo/login', routesController.crear_mandril_GET);
router.post('/crear_equipo', routesController.crear_mandril_POST);
router.post('/alta_baja', routesController.alta_baja_POST);
router.post('/guardar_alta_baja', routesController.guardar_alta_baja_POST);
router.get('/consulta_mandril/:id', routesController.consulta_mandril_GET);
router.get('/consulta_mandril_stock_entrada/:id', routesController.consulta_mandril_stock_entrada_GET);
router.get('/consulta_mandril_stock_salida/:id', routesController.consulta_mandril_stock_salida_GET);
router.post('/guardar_equipo', routesController.guardar_mandril_POST);
router.post('/verificacion', routesController.verificacion_POST);
router.post('/movimiento', routesController.movimiento_POST);
router.post('/entrada_cedula', routesController.entrada_cedula_POST);
router.post('/guardar_movimiento', routesController.guardar_movimiento_POST);
router.post('/guardar_movimiento_cedula', routesController.guardar_movimiento_cedula_POST);
router.post('/historial', routesController.historial_POST);
router.post('/historial_mantenimiento', routesController.historial_mantenimiento_POST);
router.post('/verificar_consulta', routesController.verificar_consulta_POST);
router.post('/modificar', routesController.modificar_POST);
router.get('/mandriles', routesController.mandriles_GET);
router.get('/no_disponibles', routesController.no_disponibles_GET);
router.post('/inventario', routesController.inventario_POST);
router.post('/verificar', routesController.verificar_POST);
router.post('/guardar_mantenimiento', routesController.guardar_mantenimiento_POST);
router.post('/guardar_modificacion', routesController.guardar_modificacion_POST);
router.post('/alta_notificar', routesController.alta_notificar_POST);
router.post('/guardar_notificar', routesController.guardar_notificar_POST);
router.post('/eliminar_notificar', routesController.eliminar_notificar_POST);
router.post('/alta_acceso', routesController.alta_acceso_POST);
router.post('/guardar_acceso', routesController.guardar_acceso_POST);
router.post('/delete_acceso', routesController.delete_acceso_POST);
router.post('/plataforma', routesController.plataforma_POST);
router.post('/guardar_plataforma', routesController.guardar_plataforma_POST);
router.post('/delete_plataforma', routesController.delete_plataforma_POST);
router.post('/reporte', routesController.reporte_POST);
router.post('/reporte_grafica', routesController.reporte_grafica_POST);

router.get('*', (req, res) => {
  res.send('404 Page not found');
});
module.exports = router;