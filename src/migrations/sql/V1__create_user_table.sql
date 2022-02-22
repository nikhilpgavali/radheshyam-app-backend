CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR (50) NOT NULL,
    password INTEGER NOT NULL,
    email VARCHAR (100) NOT NULL
);