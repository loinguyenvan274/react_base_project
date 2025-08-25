const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('khach_hang_context', {
    getAll: async () => await ipcRenderer.invoke('khach_hang_context:getAll'),
    add: async (khachHang) => await ipcRenderer.invoke('khach_hang_context:add', khachHang),
    update: async (khachHang) => await ipcRenderer.invoke('khach_hang_context:update', khachHang),
    delete: async (id) => await ipcRenderer.invoke('khach_hang_context:delete', id),
    search: async (searchTerm) => await ipcRenderer.invoke('khach_hang_context:search', searchTerm),
    getById: async (id) => await ipcRenderer.invoke('khach_hang_context:getById', id),
}); 

contextBridge.exposeInMainWorld('san_pham_context', {
    getAll: async () => await ipcRenderer.invoke('san_pham_context:getAll'),
    add: async (sanPham) => await ipcRenderer.invoke('san_pham_context:add', sanPham),
    update: async (sanPham) => await ipcRenderer.invoke('san_pham_context:update', sanPham),
    delete: async (id) => await ipcRenderer.invoke('san_pham_context:delete', id),
    search: async (searchTerm) => await ipcRenderer.invoke('san_pham_context:search', searchTerm),
    getById: async (id) => await ipcRenderer.invoke('san_pham_context:getById', id),
});