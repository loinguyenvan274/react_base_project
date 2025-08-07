
-- Bảng khách hàng
CREATE TABLE IF NOT EXISTS khach_hang (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ten TEXT NOT NULL,
    dia_chi TEXT,
    gioi_tinh TEXT CHECK(gioi_tinh IN ('Nam', 'Nữ', 'Khác')),
    sinh_ngay DATE,
    can_cuoc_cong_dan TEXT UNIQUE,
    so_dien_thoai TEXT,
    gmail TEXT,
    yeu_thich INTEGER DEFAULT 0 CHECK (yeu_thich IN (0, 1)) -- 0: Không, 1: Có
);

CREATE TABLE IF NOT EXISTS danh_muc_sp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ten TEXT NOT NULL,
    ghi_chu TEXT
);

-- Cập nhật lại bảng sản phẩm để có khóa ngoại đến danh_muc_sp
CREATE TABLE IF NOT EXISTS san_pham (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ten TEXT NOT NULL,
    don_vi_tinh TEXT,
    gia_goc REAL,
    so_luong_o_kho INTEGER DEFAULT 0,
    mo_ta TEXT,
    link_hinh_anh TEXT,
    id_danh_muc INTEGER,
    FOREIGN KEY (id_danh_muc) REFERENCES danh_muc_sp(id) ON DELETE SET NULL
);
-- Bảng đơn hàng
CREATE TABLE IF NOT EXISTS don_hang (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_khach_hang INTEGER NOT NULL,
    thoi_gian_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_khach_hang) REFERENCES khach_hang(id) ON DELETE CASCADE
);

-- Bảng chi tiết đơn hàng: nhiều sản phẩm trong 1 đơn hàng
CREATE TABLE IF NOT EXISTS don_hang_san_pham (
    id_don_hang INTEGER,
    id_san_pham INTEGER,
    so_luong INTEGER NOT NULL,
    gia_ban REAL NOT NULL,
    PRIMARY KEY (id_don_hang, id_san_pham),
    FOREIGN KEY (id_don_hang) REFERENCES don_hang(id) ON DELETE CASCADE,
    FOREIGN KEY (id_san_pham) REFERENCES san_pham(id)
);

-- Bảng ghi nợ của đơn hàng
CREATE TABLE IF NOT EXISTS don_hang_no (
    id_don_hang INTEGER PRIMARY KEY,
    ki_han_tra_no DATE,
    so_tien_da_tra REAL DEFAULT 0,
    ghi_chu TEXT,
    FOREIGN KEY (id_don_hang) REFERENCES don_hang(id) ON DELETE CASCADE
);
