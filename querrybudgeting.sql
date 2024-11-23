CREATE TABLE budgeting (
    monthAndYear BIGINT NOT NULL,              -- Bulan dan tahun, dijadikan primary key
    userId INT NOT NULL,                       -- Foreign key ke tabel users
    total DOUBLE NOT NULL,                     -- Total budget
    essentialNeedsLimit DOUBLE NOT NULL,       -- Batas untuk kebutuhan pokok
    wantsLimit DOUBLE NOT NULL,                -- Batas untuk keinginan
    savingsLimit DOUBLE NOT NULL,              -- Batas untuk tabungan
    isReminder BOOLEAN DEFAULT FALSE,          -- Pengingat otomatis (default: false)
    PRIMARY KEY (monthAndYear),                -- Primary key pada monthAndYear
    CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE -- Relasi ke tabel users
);
