
import sqlite3Module from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { ipcMain } from 'electron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slq_query = `
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
`;
let db = null;

export function get_db() {
  if (db === null) {
    throw new Error('Database not initialized. Call init_db() first.');
  }
  return db;
}

export function init_db() {
  const sqlite3 = sqlite3Module.verbose();
  let dbPath = path.join(__dirname, '../../data/qldh1.db');
  let error = null;

  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Lỗi khi kết nối:', err.message);
      error = err;
    } else {
      console.log('✅ Đã kết nối hoặc tạo mới database: qldh.db');
    }
  });
  if (error) {
    throw new Error(`Không thể kết nối đến database: ${error.message}`);
  }
  db.exec(slq_query, (err) => {
  if (err) {
    console.error("Lỗi khi tạo bảng:", err.message);
    throw new Error(`Không thể tạo bảng: ${err.message}`);
  } else {
    console.log("✅ Đã tạo hoặc cập nhật các bảng trong database");
  }
});


  return db;
}

export function registerKhachHangIcp() {
  ipcMain.handle('khach_hang_context:getAll', async (event) => {
    return new Promise((resolve, reject) => {
      get_db().all('SELECT * FROM khach_hang', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }),
    ipcMain.handle('khach_hang_context:add', async (event, khachHang) => {
      return new Promise((resolve, reject) => {
        const { ten, dia_chi, gioi_tinh, sinh_ngay, can_cuoc_cong_dan, so_dien_thoai, gmail, yeu_thich } = khachHang;
        const sql = `INSERT INTO khach_hang (ten, dia_chi, gioi_tinh, sinh_ngay, can_cuoc_cong_dan, so_dien_thoai, gmail, yeu_thich) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        get_db().run(sql, [ten, dia_chi, gioi_tinh, sinh_ngay, can_cuoc_cong_dan, so_dien_thoai, gmail, yeu_thich], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, ...khachHang });
          }
        });
      });
    });
    
  ipcMain.handle('khach_hang_context:update', async (event, khachHang) => {
  return new Promise((resolve, reject) => {
    const { id, ...fields } = khachHang;

    // Lọc ra các trường có giá trị KHÁC null và undefined
    const validFields = Object.entries(fields).filter(([key, value]) => value !== null && value !== undefined);

    // Nếu không có trường nào để cập nhật
    if (validFields.length === 0) {
      return resolve({ id, updated: false });
    }

    // Tạo câu SQL động kiểu: SET ten = ?, gmail = ?, ...
    const setClause = validFields.map(([key]) => `${key} = ?`).join(', ');
    const values = validFields.map(([_, value]) => value);
    values.push(id); // id là điều kiện WHERE

    const sql = `UPDATE khach_hang SET ${setClause} WHERE id = ?`;

    get_db().run(sql, values, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.changes > 0 ? id : null,
          updated: this.changes > 0,
          updatedFields: validFields.map(([key]) => key),
        });
      }
    });
  });
});

  ipcMain.handle('khach_hang_context:delete', async (event, id) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM khach_hang WHERE id = ?`;
      get_db().run(sql, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  });
  ipcMain.handle('khach_hang_context:search', async (event, searchTerm) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM khach_hang WHERE ten LIKE ? OR can_cuoc_cong_dan LIKE ?`;
      get_db().all(sql, [`%${searchTerm}%`, `%${searchTerm}%`], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
  ipcMain.handle('khach_hang_context:getById', async (event, id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM khach_hang WHERE id = ?`;
      get_db().get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  });
  // Add more handlers as needed
}


/*
đăng ký các hàm IPC cho sản phẩm
*/
export function registerSanPhamIcp() {
  ipcMain.handle('san_pham_context:getAll', async (event) => {
    return new Promise((resolve, reject) => {
      get_db().all('SELECT * FROM san_pham', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });

  ipcMain.handle('san_pham_context:add', async (event, sanPham) => {
    return new Promise((resolve, reject) => {
      const { ten, don_vi_tinh, gia_goc, so_luong_o_kho, mo_ta, link_hinh_anh, id_danh_muc } = sanPham;
      const sql = `INSERT INTO san_pham (ten, don_vi_tinh, gia_goc, so_luong_o_kho, mo_ta, link_hinh_anh, id_danh_muc)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
      get_db().run(sql, [ten, don_vi_tinh, gia_goc, so_luong_o_kho, mo_ta, link_hinh_anh, id_danh_muc], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...sanPham });
        }
      });
    }
    );
  });
  // Cập nhật sản phẩm
  ipcMain.handle('san_pham_context:update', async (event, sanPham) => {
    return new Promise((resolve, reject) => {
      const { id, ten, don_vi_tinh, gia_goc, so_luong_o_kho, mo_ta, link_hinh_anh, id_danh_muc } = sanPham;
      const sql = `UPDATE san_pham SET ten = ?, don_vi_tinh = ?, gia_goc = ?, so_luong_o_kho = ?,
                      mo_ta = ?, link_hinh_anh = ?, id_danh_muc = ? WHERE id = ?`;
      get_db().run(sql, [ten, don_vi_tinh, gia_goc, so_luong_o_kho, mo_ta, link_hinh_anh, id_danh_muc, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.changes > 0 ? id : null, ...sanPham });
        }
      });
    });
  });
  ipcMain.handle('san_pham_context:delete', async (event, id) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM san_pham WHERE id = ?`;
      get_db().run(sql, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  });
  ipcMain.handle('san_pham_context:search', async (event, searchTerm) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM san_pham WHERE ten LIKE ? OR mo_ta LIKE ?`;
      get_db().all(sql, [`%${searchTerm}%`, `%${searchTerm}%`], (err, rows) => {
        if (err) {
          reject(err);

        } else {
          resolve(rows);
        }
      });
    });
  });
  ipcMain.handle('san_pham_context:getById', async (event, id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM san_pham WHERE id = ?`;
      get_db().get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  });
  // Add more handlers as needed
}