import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { init_db, registerKhachHangIcp, registerSanPhamIcp } from './services/data_base_context.mjs';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("Preload path:", path.join(__dirname, 'preload.js'));
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  })
  // Load React app (dev mode)
  win.webContents.openDevTools();
  win.loadURL('http://localhost:5173')
}
function initializeApp() {
  init_db(); // Initialize the database connection
  registerKhachHangIcp(); // Register IPC handlers
  registerSanPhamIcp(); // Register IPC handlers
}

app.whenReady().then(initializeApp).then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
