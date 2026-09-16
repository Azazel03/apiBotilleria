CREATE TABLE locales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    latitud NUMERIC(10, 8) NOT NULL,
    longitud NUMERIC(11, 8) NOT NULL,
    horario_cierre VARCHAR(50),
    abierto_ahora BOOLEAN DEFAULT true,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Datos de prueba para Valdivia
INSERT INTO locales (nombre, direccion, latitud, longitud, horario_cierre, abierto_ahora)
VALUES 
('Botillería Isla Teja', 'Los Robles 123, Isla Teja, Valdivia', -39.8145000, -73.2512000, '02:00 AM', true),
('Cervecería y Botillería Centro', 'Pérez Rosales 450, Valdivia', -39.8172000, -73.2456000, '01:00 AM', true);
