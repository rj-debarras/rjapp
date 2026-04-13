CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    property_type TEXT NOT NULL,
    estimated_volume_m2 INTEGER,
    floor_level TEXT,
    has_elevator BOOLEAN DEFAULT 0,
    has_valuables BOOLEAN,
    postal_code TEXT NOT NULL,
    client_name TEXT NOT NULL,
    client_email TEXT,
    client_phone TEXT NOT NULL,
    tracking_code TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'New'
);

CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    action TEXT NOT NULL,
    details TEXT,
    ip TEXT,
    user_agent TEXT
);
