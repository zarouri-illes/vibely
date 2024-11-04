const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

// creates a window with the given width and height
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // load the html file
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    createWindow()
})

// quit the app when all the windows are closed
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit()
})