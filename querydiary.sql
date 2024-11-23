CREATE TABLE budgeting_diary (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- ID unik untuk setiap entry
    userId INT NOT NULL,                      -- Foreign key ke tabel users
    monthAndYear BIGINT NOT NULL,             -- Bulan dan tahun terkait (relasi ke budgeting)
    DATE BIGINT NOT NULL,                     -- Tanggal transaksi (format: YYYYMMDD)
    photoUri TEXT,                            -- URI atau path foto (opsional)
    description TEXT,                         -- Deskripsi transaksi (opsional)
    amount DOUBLE NOT NULL,                   -- Jumlah transaksi
    categoryId INT NOT NULL,                  -- Kategori transaksi
    isExpense BOOLEAN DEFAULT TRUE,           -- Apakah transaksi adalah pengeluaran (default: true)
    CONSTRAINT fk_userId_diary FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_monthAndYear_diary FOREIGN KEY (monthAndYear) REFERENCES budgeting(monthAndYear) ON DELETE CASCADE
);
