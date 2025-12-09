import { myGymDB } from "../settings/db.js";

export const getClasses = async (instructorId) => {
  try {
    const query = `
SELECT c.id, e.nombre ,c.titulo AS nombre_clase, c.hora_inicio, c.hora_fin, c.capacidad, c.fecha FROM clases c
      INNER JOIN especialidades e ON c.especialidad_id = e.id
      INNER JOIN usuarios u ON c.entrenador_id = u.id
      WHERE u.id = ?
    `;

    const [response] = await myGymDB.execute(query, [instructorId]);

    return response

  } catch (error) {
    throw error;
  }
};

export const getClassDetails = async (classId) => {
  try {
    const query = `
      SELECT ca.id, u.nombre, u.email, ca.fecha_asistencia, ca.estado FROM clases_asistencias ca
      INNER JOIN clases c ON ca.clase_id = c.id
      INNER JOIN usuarios u ON ca.usuario_id = u.id
      WHERE c.id = ?
    `;

    const [response] = await myGymDB.execute(query, [classId]);

    return response

  } catch (error) {
    throw error;
  }
};

export const getSchedule = async (instructorId) => {
  try {
    const query = `
      SELECT c.id, c.titulo, c.descripcion, c.fecha, c.estado
      FROM clases c
      INNER JOIN usuarios u ON c.entrenador_id = u.id
      WHERE c.fecha BETWEEN 
          DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
          AND DATE_ADD(
              DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY),
              INTERVAL 6 DAY
          )
      AND u.id = ?
    `;

    const [response] = await myGymDB.execute(query, [instructorId]);

    return response

  } catch (error) {
    throw error;
  }
};

export const getdaySchedule = async (instructorId) => {
  try {
    const query = `
      SELECT c.id, c.titulo, c.hora_inicio, c.hora_fin
      FROM clases c
      INNER JOIN usuarios u ON c.entrenador_id = u.id
      WHERE c.fecha = CURDATE()
      AND u.id = ?
    `;

    const [response] = await myGymDB.execute(query, [instructorId]);

    return response

  } catch (error) {
    throw error;
  }
};


export const getTotalUsersAndTrainers = async () => {
  try {
    const queryUsers = `
      SELECT COUNT(*) AS total_users FROM usuarios u WHERE u.role_id = '2';
    `;

    const queryTrainers = `
      SELECT COUNT(*) AS total_trainers FROM usuarios u WHERE u.role_id = '3';
    `;

    const [users] = await myGymDB.execute(queryUsers);
    const [trainers] = await myGymDB.execute(queryTrainers);

    return { users: users[0], trainers: trainers[0] }

  } catch (error) {
    throw error;
  }
};

export const getActiveClasses = async () => {
  try {
    const query = `
      SELECT count(*) as clases_activas FROM clases c
      WHERE c.estado = "activa"
    `;

    const [[response]] = await myGymDB.execute(query);

    return response

  } catch (error) {
    throw error;
  }
};

export const getTotalIncome = async () => {
  try {
    const query = `
      SELECT SUM(t.precio) as ingresos_totales FROM suscripciones s
  INNER JOIN tarifas t ON s.tarifa_id = t.id
    `;

    const [[response]] = await myGymDB.execute(query);

    return response

  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const query = `
    SELECT u.id, u.nombre, u.email, u.telefono, u.direccion, u.fecha_registro FROM usuarios u
    WHERE u.role_id = 2;
    `;

    const [response] = await myGymDB.execute(query);

    return response

  } catch (error) {
    throw error;
  }
}

export const getAllTrainers = async () => {
  try {
    const query = `
      SELECT u.id, u.nombre, u.email, u.telefono, u.direccion, u.fecha_registro FROM usuarios u
      WHERE u.role_id = 3;
    `;

    const [response] = await myGymDB.execute(query);

    return response

  } catch (error) {
    throw error;
  }
}

export const getAllClasses = async () => {
  try {
    const query = `
    SELECT c.id, e.nombre as especialidad, c.titulo as titulo_clase, u.nombre as entrenador, c.hora_inicio, c.hora_fin  FROM clases c
      INNER JOIN especialidades e ON c.especialidad_id = e.id
      INNER JOIN usuarios u ON c.entrenador_id = u.id
    `;

    const [response] = await myGymDB.execute(query);

    return response

  } catch (error) {
    throw error;
  }
}

export const getRates = async () => {
  try {
    const query = `
      SELECT t.id, t.tipo_suscripcion, t.precio, t.moneda FROM tarifas t
      WHERE t.estado = "activo"
    `;

    const [response] = await myGymDB.execute(query);

    return response

  } catch (error) {
    throw error;
  }
}


export const getAllPayments = async () => {
  try {
    const query = `
    SELECT s.id, u.nombre, u.email, t.tipo_suscripcion, s.estado, t.precio, s.created_at as fecha_pago  FROM suscripciones s
      INNER JOIN tarifas t ON s.tarifa_id = t.id
      INNER JOIN usuarios u ON s.usuario_id = u.id
    `;

    const [response] = await myGymDB.execute(query);

    return response

  } catch (error) {
    throw error;
  }
}

export const getPaymentByMonth = async () => {
  try {
    const query = `
      SELECT DATE_FORMAT(s.created_at, '%Y-%m') AS mes,
        SUM(t.precio) AS total_ingresos
      FROM suscripciones s
      INNER JOIN tarifas t ON s.tarifa_id = t.id 
      GROUP BY DATE_FORMAT(s.created_at, '%Y-%m')
      ORDER BY mes ASC;
    `;

    const [response] = await myGymDB.execute(query);

    return response

  } catch (error) {
    throw error;
  }
}

export const getTypeSubscriptions = async (id) => {
  try {
    const query = `
  SELECT s.id, t.tipo_suscripcion as tipo FROM suscripciones s
    INNER JOIN usuarios u ON s.usuario_id = u.id
    INNER JOIN tarifas t ON s.tarifa_id = t.id
    WHERE u.id = ? AND s.estado = "activa"
    `;

    const [[response]] = await myGymDB.execute(query, [id]);

    return response

  } catch (error) {
    throw error;
  }
}

export const getAllClassesForUser = async () => {
  try {
    const query = `
    SELECT c.id, c.titulo, c.descripcion, c.hora_inicio, c.hora_fin, u.nombre as entrenador FROM clases c
    INNER JOIN usuarios u ON c.entrenador_id = u.id
    `;

    const [response] = await myGymDB.execute(query);

    return response

  } catch (error) {
    throw error;
  }
}

export const getMySubscriptions = async (id) => {
  try {
    const query = `
SELECT s.id, c.titulo as tipo, s.created_at as fecha_inicio, s.estado FROM suscripciones s
      INNER JOIN usuarios u ON s.usuario_id = u.id
      INNER JOIN clases c ON s.clase_id = c.id
      WHERE u.id = ?
    `;

    const [response] = await myGymDB.execute(query, [id]);

    return response

  } catch (error) {
    throw error;
  }
}

export const getPaymentByUser = async (id) => {
  try {
    const query = `
    SELECT s.id, t.precio, s.created_at, c.titulo  FROM suscripciones s
      INNER JOIN usuarios u ON s.usuario_id = u.id
      INNER JOIN tarifas t ON s.tarifa_id = t.id
      INNER JOIN clases c ON s.clase_id = c.id
      WHERE u.id = ?;
    `;

    const [response] = await myGymDB.execute(query, [id]);

    return response

  } catch (error) {
    throw error;
  }
}

export const updateUser = async (id, nombre, email, telefono, direccion) => {
  try {
    const query = `
      UPDATE usuarios u
      SET u.nombre = ?, u.email = ?, u.telefono = ?, u.direccion = ?
      WHERE u.id = ?;
    `;

    const [response] = await myGymDB.execute(query, [nombre, email, telefono, direccion, id]);

    return response

  } catch (error) {
    throw error;
  }
}

export const updateClass = async (id, title, description, hora_inicio, hora_fin) => {
  try {
    const query = `
      UPDATE clases c
      SET c.titulo = ?, c.descripcion = ?, c.hora_inicio = ?, c.hora_fin = ?
      WHERE c.id = ?;
    `;

    const [response] = await myGymDB.execute(query, [title, description, hora_inicio, hora_fin, id]);

    return response

  } catch (error) {
    throw error;
  }
}

export const getSpeciality = async () => {
  try {
    const query = `
      SELECT * FROM especialidades
    `;

    const [response] = await myGymDB.execute(query);

    return response

  } catch (error) {
    throw error;
  }
}

export const addSpeciality = async (nombre, descripcion) => {
  try {
    const query = `
      INSERT INTO especialidades (nombre, descripcion) VALUES (?, ?);
    `;

    const [response] = await myGymDB.execute(query, [nombre, descripcion]);

    return response 

  } catch (error) {
    throw error;
  }
}

export const updateRate = async (id, precio) => {
  try {
    const query = `
      UPDATE tarifas t
      SET t.precio = ?
      WHERE t.id = ?;
    `;

    const [response] = await myGymDB.execute(query, [precio, id]);

    return response

  } catch (error) {
    throw error;
  }
}

export const updateAllClasses = async (id, especialidad, titulo, entrenador) => {
  try {
    const query = `
      UPDATE clases
      SET clases.especialidad_id = ?, clases.titulo = ?, clases.entrenador_id = ?
      WHERE clases.id = ?
    `;

    const [response] = await myGymDB.execute(query, [especialidad, titulo, entrenador, id]);

    return response

  } catch (error) {
    throw error;
  }
}

export const updateAttendance = async (id, estado) => {
  try {
    const query = `
      UPDATE clases_asistencias ca
      SET ca.estado = ?
      WHERE ca.id = ?;
    `;

    const [response] = await myGymDB.execute(query, [estado, id]);

    return response

  } catch (error) {
    throw error;
  }
}

export const getStudentsByTrainer = async (id) => {
  try {
    const query = `
SELECT COUNT(*) as alumnos FROM clases_asistencias ca
  INNER JOIN usuarios u ON ca.usuario_id = u.id
  INNER JOIN clases c ON ca.clase_id = c.id
  WHERE c.entrenador_id = ?
    `;

    const [[response]] = await myGymDB.execute(query, [id]);

    return response

  } catch (error) {
    throw error;
  }
}

export const getNextClass = async (id) => {
  try {
    const query = `
SELECT ca.id, c.id as class_id, e.nombre, c.fecha FROM clases_asistencias ca
  INNER JOIN clases c ON ca.clase_id = c.id
  INNER JOIN usuarios u ON ca.usuario_id = u.id
  INNER JOIN especialidades e ON c.especialidad_id = e.id
WHERE ca.usuario_id = ? AND ca.estado NOT IN("asistio")
ORDER BY c.fecha AND c.hora_inicio;
    `;

    const [response] = await myGymDB.execute(query, [id]);

    return response

  } catch (error) {
    throw error;
  }
}

export const getPartnersByClass = async (id) => {
  try {
    const query = `
    SELECT ca.id, u.nombre, u.email, ca.estado FROM clases_asistencias ca
      INNER JOIN usuarios u ON ca.usuario_id = u.id
      INNER JOIN clases c ON ca.clase_id = c.id
    WHERE c.id = ?
    `;

    const [response] = await myGymDB.execute(query, [id]);

    return response

  } catch (error) {
    throw error;
  }
}

export const addClass = async (especialidad, titulo, descripcion, entrenador, inicio, fin, capacidad) => {
  try {
    const query = `
      INSERT INTO clases (especialidad_id, titulo, descripcion, entrenador_id, hora_inicio, hora_fin, capacidad) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const [response] = await myGymDB.execute(query, [especialidad, titulo, descripcion, entrenador, inicio, fin, capacidad]);

    return response

  } catch (error) {
    throw error;
  }
}