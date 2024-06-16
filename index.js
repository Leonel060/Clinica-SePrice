const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

app.use(express.json());

const dbPath = path.resolve(__dirname, 'database', 'dataBase.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Connected to the SQLite database');
    }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'login.html'));
});


app.use(express.static(path.join(__dirname, 'front')));


app.get('/123456', (req, res) => {
  const sql = 'SELECT * FROM Estudio';
  db.all(sql, [], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({ data: rows });
  });
});


//agrega el paciente nuevo
app.post('/api/guardarPaciente', (req, res) => {
  const { nombre, apellido, dni, telefono, email, id_cobertura, estado } = req.body;

  // Verificar que se reciben todos los datos necesarios
  if (!nombre || !apellido || !dni || !telefono || !email) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  // Insertar el paciente en la base de datos
  const sql = 'INSERT INTO Paciente (nombre, apellido, dni, telefono, email, id_cobertura, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const params = [nombre, apellido, dni, telefono, email, id_cobertura, estado];

  db.run(sql, params, function(err) {
      if (err) {
          console.error('Error al insertar paciente:', err);
          return res.status(500).json({ error: 'Error interno del servidor al insertar paciente' });
      }

      // Obtener el ID del paciente insertado
      const idPaciente = this.lastID;
      console.log(`Paciente insertado con ID: ${idPaciente}`);

      // Respondemos con éxito y el ID del paciente insertado
      res.json({ id: idPaciente });
  });
});

// Endpoint para guardar la solicitud de turno
app.post('/api/solicitudTurno', (req, res) => {
  const { tipo_turno, turno_solic, indicaciones, profesional, disp_turno, id_cobertura } = req.body;

  // Verificar que se reciben todos los datos necesarios
  if (!tipo_turno || !turno_solic || !indicaciones || !profesional || !disp_turno) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  // Insertar la solicitud de turno en la base de datos
  const sql = 'INSERT INTO SolicitudTurno (tipo_turno, turno_solic, indicaciones, profesional, disp_turno, id_cobertura) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [tipo_turno, turno_solic, indicaciones, profesional, disp_turno, id_cobertura];

  db.run(sql, params, function(err) {
      if (err) {
          console.error('Error al insertar solicitud de turno:', err);
          return res.status(500).json({ error: 'Error interno del servidor al insertar solicitud de turno' });
      }

      // Obtener el ID de la solicitud de turno insertada
      const idSolicitudTurno = this.lastID;
      console.log(`Solicitud de turno insertada con ID: ${idSolicitudTurno}`);

      // Respondemos con éxito y el ID de la solicitud de turno insertada
      res.json({ id: idSolicitudTurno });
  });
});

// Ruta para obtener todos los pacientes
app.get('/api/pacientes', (req, res) => {
  const sql = 'SELECT * FROM Paciente';
  db.all(sql, [], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({ data: rows });
  });
});
// Ruta para obtener todos los de personal administrativo
app.get('/api/administracion', (req, res) => {
  const sql = 'SELECT * FROM PersonalAdministrativo';
  db.all(sql, [], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({ data: rows });
  });
});

// Ruta para obtener detalle de personal administrativo
app.get('/api/detalleAdministrativo', (req, res) => {
  const idAdministrativo = req.query.id;

  if (!idAdministrativo) {
    return res.status(400).json({ error: 'ID de administrativo no proporcionado' });
  }

  const sql = 'SELECT * FROM PersonalAdministrativo WHERE id_personal_admin = ?';
  db.get(sql, [idAdministrativo], (err, row) => {
    if (err) {
      console.error('Error al obtener el detalle del administrativo:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Administrativo no encontrado' });
    }

    res.json(row);
  });
});

// Ruta para obtener todos los profesionales
app.get('/api/profesionales', (req, res) => {
  const sql = 'SELECT * FROM Profesional';
  db.all(sql, [], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({ data: rows });
  });
});

// Agregar profesional nuevo
app.post('/api/guardarProfesional', (req, res) => {
  const { nombre, apellido, dni, telefono, email, estado } = req.body;

  // Verificar que se reciben todos los datos necesarios
  if (!nombre || !apellido || !dni || !telefono || !email ) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  // Insertar el paciente en la base de datos
  const sql = 'INSERT INTO Profesional (nombre, apellido, dni, telefono, email, estado) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [nombre, apellido, dni, telefono, email, estado];

  db.run(sql, params, function(err) {
      if (err) {
          console.error('Error al insertar profesional:', err);
          return res.status(500).json({ error: 'Error interno del servidor al insertar profesional' });
      }

      // Obtener el ID del profesional insertado
      const idProfesional = this.lastID;
      console.log(`Profesional insertado con ID: ${idProfesional}`);

      // Respondemos con éxito y el ID del paciente insertado
      res.json({ id: idProfesional });
  });
});

// Ruta para obtener detalle de un profesional
app.get('/api/detalleProfesional', (req, res) => {
  const idProfesional = req.query.id;

  if (!idProfesional) {
    return res.status(400).json({ error: 'ID de paciente no proporcionado' });
  }

  const sql = 'SELECT nombre, apellido, dni, telefono, email, estado FROM Profesional WHERE id_profesional = ?';
  db.get(sql, [idProfesional], (err, row) => {
    if (err) {
      console.error('Error al obtener el detalle del profesional:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Profesional no encontrado' });
    }

    res.json(row);
  });
});


// Agregar profesional nuevo
app.post('/api/guardarAdministrativo', (req, res) => {
  const { nombre, apellido, dni, telefono, email, estado, id_tipo_personal } = req.body;

  // Verificar que se reciben todos los datos necesarios
  if (!nombre || !apellido || !dni || !telefono || !email || !estado || !id_tipo_personal) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  // Insertar el paciente en la base de datos
  const sql = 'INSERT INTO PersonalAdministrativo (nombre, apellido, dni, telefono, email, estado, id_tipo_personal) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const params = [nombre, apellido, dni, telefono, email, estado, id_tipo_personal];

  db.run(sql, params, function(err) {
      if (err) {
          console.error('Error al insertar administrativo:', err);
          return res.status(500).json({ error: 'Error interno del servidor al insertar administrativo' });
      }

      // Obtener el ID del profesional insertado
      const idAdministrativo = this.lastID;
      console.log(`Profesional insertado con ID: ${idAdministrativo}`);

      // Respondemos con éxito y el ID del paciente insertado
      res.json({ id: idAdministrativo });
  });
});

// Ruta para obtener detalle
app.get('/api/detalle', (req, res) => {
  const idPaciente = req.query.id;

  if (!idPaciente) {
    return res.status(400).json({ error: 'ID de paciente no proporcionado' });
  }

  const sql = 'SELECT nombre, apellido, dni, telefono, email, id_cobertura, estado FROM Paciente WHERE id_paciente = ?';
  db.get(sql, [idPaciente], (err, row) => {
    if (err) {
      console.error('Error al obtener el detalle del paciente:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.json(row);
  });
});

//INSUMOS
// Ruta para procesar el formulario y agregar un insumo
app.post('/api/guardarInsumo', (req, res) => {
  const { nombre, stock } = req.body;

  if (!nombre || !stock) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const sql = 'INSERT INTO Insumo (nombre, stock) VALUES (?, ?)';
  const params = [nombre, stock];

  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error al insertar insumo:', err);
      return res.status(500).json({ error: 'Error interno del servidor al insertar el insumo' });
    }

    const idInsumo = this.lastID;
    console.log(`Insumo insertado con ID: ${idInsumo}`);

    res.json({ id: idInsumo });
  });
});

// Ruta para obtener todos los insumos
app.get('/api/insumos', (req, res) => {
  const sql = 'SELECT * FROM Insumo';
  db.all(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener insumos:', err);
      return res.status(500).json({ error: 'Error interno del servidor al obtener insumos' });
    }
    res.json({ data: results });
  });
});

// Ruta para obtener detalle
app.get('/api/detalleInsumo', (req, res) => {
  const idInsumo = req.query.id;

  if (!idInsumo) {
    return res.status(400).json({ error: 'ID de insumo no proporcionado' });
  }

  const sql = 'SELECT nombre, stock FROM Insumo WHERE id_insumo = ?';
  db.get(sql, [idInsumo], (err, row) => {
    if (err) {
      console.error('Error al obtener el detalle del insumo:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Insumo no encontrado' });
    }

    res.json(row);})
  

});

//ESTUDIOS
  
//agrega el estudio nuevo
app.post('/api/guardarEstudio', (req, res) => {
  const { nombre, indicaciones } = req.body;

  // Validar que se reciben todos los datos necesarios
  if (!nombre || !indicaciones) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  // Insertar el estudio en la base de datos
  const sql = 'INSERT INTO Estudio (nombre, indicaciones) VALUES (?, ?)';
  const params = [nombre, indicaciones];

  db.run(sql, params, function(err) {
      if (err) {
          console.error('Error al insertar estudio:', err);
          return res.status(500).json({ error: 'Error interno del servidor al insertar estudio' });
      }

      // Obtener el ID del estudio insertado
      const idEstudio = this.lastID;
      console.log(`Estudio insertado con ID: ${idEstudio}`);

      // Respondemos con éxito y el ID del estudio insertado
      res.json({ id: idEstudio });
  });
});


// Ruta para obtener todos los estudios
app.get('/api/estudios', (req, res) => {
  const sql = 'SELECT * FROM Estudio';
  db.all(sql, [], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({ data: rows });
  });
});

// Ruta para obtener detalle
app.get('/api/detalleEstudi', (req, res) => {
  const idEstudio = req.query.id;

  if (!idEstudio) {
    return res.status(400).json({ error: 'ID de estudio no proporcionado' });
  }

  const sql = 'SELECT nombre, indicaciones FROM Estudio WHERE id_estudio = ?';
  db.get(sql, [idEstudio], (err, row) => {
    if (err) {
      console.error('Error al obtener el detalle del estudio:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Estudio no encontrado' });
    }

    res.json(row);
  });
});


const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`El servidor está funcionando en el puerto ${PUERTO}`);
});
