// Datos mock — catálogo interno de convenios. NUNCA se muestra tal cual al usuario.
export type Metodo = 'manual_y_barras' | 'manual' | 'barras'

export interface Convenio {
  superficie: string
  limite_maximo: number
  metodo: Metodo
  codigo_interno: string
  puntos_disponibles: number
}

export const convenios: Convenio[] = [
  { superficie: 'Apuestas Nacionales', limite_maximo: 2000000, metodo: 'manual_y_barras', codigo_interno: '304', puntos_disponibles: 1500 },
  { superficie: 'Bemovil', limite_maximo: 1000000, metodo: 'manual_y_barras', codigo_interno: '348', puntos_disponibles: 900 },
  { superficie: 'Comercial Card', limite_maximo: 1000000, metodo: 'manual', codigo_interno: '1527', puntos_disponibles: 400 },
  { superficie: 'Consuerte', limite_maximo: 300000, metodo: 'manual_y_barras', codigo_interno: '83', puntos_disponibles: 800 },
  { superficie: 'Coopenesa', limite_maximo: 1000000, metodo: 'manual_y_barras', codigo_interno: '16', puntos_disponibles: 600 },
  { superficie: 'EDEQ', limite_maximo: 1000000, metodo: 'barras', codigo_interno: '15', puntos_disponibles: 150 },
  { superficie: 'Efecty', limite_maximo: 500000, metodo: 'manual_y_barras', codigo_interno: '10703', puntos_disponibles: 6800 },
  { superficie: 'Fullcarga', limite_maximo: 3000000, metodo: 'manual', codigo_interno: '297', puntos_disponibles: 1000 },
  { superficie: 'Grupo Exito S.A.', limite_maximo: 9999999, metodo: 'barras', codigo_interno: '578', puntos_disponibles: 700 },
  { superficie: 'JER', limite_maximo: 2000000, metodo: 'manual_y_barras', codigo_interno: '595', puntos_disponibles: 500 },
  { superficie: 'Mafephone', limite_maximo: 1000000, metodo: 'manual_y_barras', codigo_interno: '1543', puntos_disponibles: 700 },
  { superficie: 'Maxi Servicios', limite_maximo: 1000000, metodo: 'manual', codigo_interno: '313', puntos_disponibles: 450 },
  { superficie: 'Movil Red', limite_maximo: 800000, metodo: 'manual_y_barras', codigo_interno: '4621', puntos_disponibles: 3000 },
  { superficie: 'Pequenas Superficies Credibanco', limite_maximo: 300000, metodo: 'manual_y_barras', codigo_interno: '2451', puntos_disponibles: 2000 },
  { superficie: 'Pequenas Superficies Redeban', limite_maximo: 300000, metodo: 'manual_y_barras', codigo_interno: '5552', puntos_disponibles: 2200 },
  { superficie: 'Practisistemas', limite_maximo: 1000000, metodo: 'manual_y_barras', codigo_interno: '3288', puntos_disponibles: 600 },
  { superficie: 'Punto de Pago', limite_maximo: 4000000, metodo: 'manual_y_barras', codigo_interno: '5941', puntos_disponibles: 1800 },
  { superficie: 'Puntored', limite_maximo: 800000, metodo: 'manual_y_barras', codigo_interno: '19666', puntos_disponibles: 30000 },
  { superficie: 'Puntos Claro', limite_maximo: 300000, metodo: 'manual_y_barras', codigo_interno: '481', puntos_disponibles: 1200 },
  { superficie: 'Seapto', limite_maximo: 2000000, metodo: 'manual_y_barras', codigo_interno: '1044', puntos_disponibles: 500 },
  { superficie: 'Soluciones Moviles SAS - Megared', limite_maximo: 9999999, metodo: 'manual_y_barras', codigo_interno: '902', puntos_disponibles: 2500 },
  { superficie: 'Su Chance', limite_maximo: 300000, metodo: 'manual_y_barras', codigo_interno: '34', puntos_disponibles: 300 },
  { superficie: 'Supergiros', limite_maximo: 5000000, metodo: 'manual_y_barras', codigo_interno: '17768', puntos_disponibles: 5000 },
  { superficie: 'Superpagos', limite_maximo: 1000000, metodo: 'manual', codigo_interno: '4483', puntos_disponibles: 1300 },
]

export interface PuntoFisico {
  nombre_comercial: string
  direccion: string
  horario: string
  abierto: boolean
  distancia_km: number
  superficie: string
}

export const puntosFisicos: PuntoFisico[] = [
  { nombre_comercial: 'Efecty Ciudad Jardín', direccion: 'CR 59 #131-47, Ciudad Jardín, Cali', horario: 'Lunes a viernes 8:00 a.m. - 6:00 p.m.', abierto: true, distancia_km: 0.8, superficie: 'Efecty' },
  { nombre_comercial: 'Puntos Claro Unicentro', direccion: 'CL 15 #100-20, Unicentro, Cali', horario: 'Lunes a sábado 9:00 a.m. - 8:00 p.m.', abierto: true, distancia_km: 1.2, superficie: 'Puntos Claro' },
  { nombre_comercial: 'Supergiros La Flora', direccion: 'CR 1 #45-12, La Flora, Cali', horario: 'Lunes a sábado 8:00 a.m. - 7:00 p.m.', abierto: true, distancia_km: 1.5, superficie: 'Supergiros' },
  { nombre_comercial: 'Puntored Chipichape', direccion: 'CL 38N #6N-35, Chipichape, Cali', horario: 'Todos los días 10:00 a.m. - 9:00 p.m.', abierto: false, distancia_km: 2.1, superficie: 'Puntored' },
  { nombre_comercial: 'Comercial Card Granada', direccion: 'AV 9N #10-25, Granada, Cali', horario: 'Lunes a viernes 8:00 a.m. - 5:00 p.m.', abierto: true, distancia_km: 2.4, superficie: 'Comercial Card' },
  { nombre_comercial: 'Éxito Chipichape', direccion: 'CL 38N #6N-35 Local 201, Chipichape, Cali', horario: 'Todos los días 9:00 a.m. - 9:00 p.m.', abierto: true, distancia_km: 3.0, superficie: 'Grupo Exito S.A.' },
  { nombre_comercial: 'EDEQ Agencia Sur', direccion: 'CR 28 #5-60, El Ingenio, Cali', horario: 'Lunes a viernes 8:00 a.m. - 4:00 p.m.', abierto: false, distancia_km: 3.6, superficie: 'EDEQ' },
  { nombre_comercial: 'Superpagos Meléndez', direccion: 'CR 86 #13-45, Meléndez, Cali', horario: 'Lunes a sábado 8:00 a.m. - 6:00 p.m.', abierto: true, distancia_km: 4.2, superficie: 'Superpagos' },
  { nombre_comercial: 'Apuestas Nacionales San Fernando', direccion: 'CR 24 #4-56, San Fernando, Cali', horario: 'Lunes a sábado 9:00 a.m. - 7:00 p.m.', abierto: true, distancia_km: 1.7, superficie: 'Apuestas Nacionales' },
  { nombre_comercial: 'Bemovil Alameda', direccion: 'CL 34 #8-20, Alameda, Cali', horario: 'Lunes a sábado 8:00 a.m. - 6:00 p.m.', abierto: true, distancia_km: 2.6, superficie: 'Bemovil' },
  { nombre_comercial: 'Consuerte Aguablanca', direccion: 'CR 28 #72-10, Aguablanca, Cali', horario: 'Lunes a sábado 9:00 a.m. - 6:00 p.m.', abierto: false, distancia_km: 5.1, superficie: 'Consuerte' },
  { nombre_comercial: 'Coopenesa Tequendama', direccion: 'CL 5 #38-25, Tequendama, Cali', horario: 'Lunes a viernes 8:00 a.m. - 5:00 p.m.', abierto: true, distancia_km: 3.3, superficie: 'Coopenesa' },
  { nombre_comercial: 'Fullcarga El Peñón', direccion: 'CL 7 #2-40, El Peñón, Cali', horario: 'Lunes a sábado 8:00 a.m. - 7:00 p.m.', abierto: true, distancia_km: 2.9, superficie: 'Fullcarga' },
  { nombre_comercial: 'JER San Nicolás', direccion: 'CR 6 #14-30, San Nicolás, Cali', horario: 'Lunes a sábado 8:00 a.m. - 6:00 p.m.', abierto: true, distancia_km: 4.5, superficie: 'JER' },
  { nombre_comercial: 'Mafephone Versalles', direccion: 'CL 15N #4N-18, Versalles, Cali', horario: 'Lunes a sábado 9:00 a.m. - 7:00 p.m.', abierto: false, distancia_km: 3.8, superficie: 'Mafephone' },
  { nombre_comercial: 'Maxi Servicios Guayaquil', direccion: 'CR 10 #12-15, Guayaquil, Cali', horario: 'Lunes a viernes 8:00 a.m. - 5:00 p.m.', abierto: true, distancia_km: 5.4, superficie: 'Maxi Servicios' },
  { nombre_comercial: 'Movil Red Miraflores', direccion: 'CL 70 #3N-50, Miraflores, Cali', horario: 'Todos los días 9:00 a.m. - 8:00 p.m.', abierto: true, distancia_km: 2.2, superficie: 'Movil Red' },
  { nombre_comercial: 'Credibanco Tequendama', direccion: 'CL 5 #42-11, Tequendama, Cali', horario: 'Lunes a sábado 8:00 a.m. - 6:00 p.m.', abierto: true, distancia_km: 3.1, superficie: 'Pequenas Superficies Credibanco' },
  { nombre_comercial: 'Redeban San Fernando', direccion: 'CR 24 #3-18, San Fernando, Cali', horario: 'Lunes a sábado 8:00 a.m. - 6:00 p.m.', abierto: false, distancia_km: 4.0, superficie: 'Pequenas Superficies Redeban' },
  { nombre_comercial: 'Practisistemas Departamental', direccion: 'CR 8 #24-60, Departamental, Cali', horario: 'Lunes a viernes 8:00 a.m. - 5:30 p.m.', abierto: true, distancia_km: 3.5, superficie: 'Practisistemas' },
  { nombre_comercial: 'Punto de Pago Limonar', direccion: 'AV 9N #15-30, El Limonar, Cali', horario: 'Todos los días 8:00 a.m. - 8:00 p.m.', abierto: true, distancia_km: 2.8, superficie: 'Punto de Pago' },
  { nombre_comercial: 'Seapto Popular', direccion: 'CL 22 #10-45, Popular, Cali', horario: 'Lunes a sábado 8:00 a.m. - 6:00 p.m.', abierto: true, distancia_km: 4.7, superficie: 'Seapto' },
  { nombre_comercial: 'Megared Chipichape', direccion: 'CL 38N #6N-45, Chipichape, Cali', horario: 'Todos los días 9:00 a.m. - 9:00 p.m.', abierto: true, distancia_km: 3.0, superficie: 'Soluciones Moviles SAS - Megared' },
  { nombre_comercial: 'Su Chance Obrero', direccion: 'CR 15 #18-22, Obrero, Cali', horario: 'Lunes a sábado 9:00 a.m. - 7:00 p.m.', abierto: false, distancia_km: 2.5, superficie: 'Su Chance' },
]

export interface PuntoResuelto extends PuntoFisico {
  limite_maximo: number
  metodo: Metodo
}

export function resolverPuntos(): PuntoResuelto[] {
  return puntosFisicos
    .map(p => {
      const c = convenios.find(c => c.superficie === p.superficie)!
      return { ...p, limite_maximo: c.limite_maximo, metodo: c.metodo }
    })
    .sort((a, b) => a.distancia_km - b.distancia_km)
}

export function puntosDeConvenio(superficie: string): PuntoResuelto[] {
  return resolverPuntos().filter(p => p.superficie === superficie)
}

export function codigoInternoDe(superficie: string): string {
  return convenios.find(c => c.superficie === superficie)?.codigo_interno ?? ''
}

export const fmt = (n: number) => '$' + n.toLocaleString('es-CO')

export const mockUser = { nombre: 'María', initials: 'MG' }
export const mockCuenta = { numero: '1234-5678-9100', ultimos4: '4521' }
