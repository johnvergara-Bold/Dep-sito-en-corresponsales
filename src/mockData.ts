// Datos mock — catálogo interno de convenios. NUNCA se muestra tal cual al usuario.
export type Metodo = 'manual_y_barras' | 'manual' | 'barras'

export interface Convenio {
  superficie: string
  limite_maximo: number
  metodo: Metodo
  codigo_interno: string
}

export const convenios: Convenio[] = [
  { superficie: 'Apuestas Nacionales', limite_maximo: 2000000, metodo: 'manual_y_barras', codigo_interno: '304' },
  { superficie: 'Bemovil', limite_maximo: 1000000, metodo: 'manual_y_barras', codigo_interno: '348' },
  { superficie: 'Comercial Card', limite_maximo: 1000000, metodo: 'manual', codigo_interno: '1527' },
  { superficie: 'Consuerte', limite_maximo: 300000, metodo: 'manual_y_barras', codigo_interno: '83' },
  { superficie: 'Coopenesa', limite_maximo: 1000000, metodo: 'manual_y_barras', codigo_interno: '16' },
  { superficie: 'EDEQ', limite_maximo: 1000000, metodo: 'barras', codigo_interno: '15' },
  { superficie: 'Efecty', limite_maximo: 500000, metodo: 'manual_y_barras', codigo_interno: '10703' },
  { superficie: 'Fullcarga', limite_maximo: 3000000, metodo: 'manual', codigo_interno: '297' },
  { superficie: 'Grupo Exito S.A.', limite_maximo: 9999999, metodo: 'barras', codigo_interno: '578' },
  { superficie: 'JER', limite_maximo: 2000000, metodo: 'manual_y_barras', codigo_interno: '595' },
  { superficie: 'Mafephone', limite_maximo: 1000000, metodo: 'manual_y_barras', codigo_interno: '1543' },
  { superficie: 'Maxi Servicios', limite_maximo: 1000000, metodo: 'manual', codigo_interno: '313' },
  { superficie: 'Movil Red', limite_maximo: 800000, metodo: 'manual_y_barras', codigo_interno: '4621' },
  { superficie: 'Pequenas Superficies Credibanco', limite_maximo: 300000, metodo: 'manual_y_barras', codigo_interno: '2451' },
  { superficie: 'Pequenas Superficies Redeban', limite_maximo: 300000, metodo: 'manual_y_barras', codigo_interno: '5552' },
  { superficie: 'Practisistemas', limite_maximo: 1000000, metodo: 'manual_y_barras', codigo_interno: '3288' },
  { superficie: 'Punto de Pago', limite_maximo: 4000000, metodo: 'manual_y_barras', codigo_interno: '5941' },
  { superficie: 'Puntored', limite_maximo: 800000, metodo: 'manual_y_barras', codigo_interno: '19666' },
  { superficie: 'Puntos Claro', limite_maximo: 300000, metodo: 'manual_y_barras', codigo_interno: '481' },
  { superficie: 'Seapto', limite_maximo: 2000000, metodo: 'manual_y_barras', codigo_interno: '1044' },
  { superficie: 'Soluciones Moviles SAS - Megared', limite_maximo: 9999999, metodo: 'manual_y_barras', codigo_interno: '902' },
  { superficie: 'Su Chance', limite_maximo: 300000, metodo: 'manual_y_barras', codigo_interno: '34' },
  { superficie: 'Supergiros', limite_maximo: 5000000, metodo: 'manual_y_barras', codigo_interno: '17768' },
  { superficie: 'Superpagos', limite_maximo: 1000000, metodo: 'manual', codigo_interno: '4483' },
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

export function codigoInternoDe(superficie: string): string {
  return convenios.find(c => c.superficie === superficie)?.codigo_interno ?? ''
}

export const fmt = (n: number) => '$' + n.toLocaleString('es-CO')

export const mockUser = { nombre: 'María', initials: 'MG' }
export const mockCuenta = { numero: '1234-5678-9100', ultimos4: '4521' }
