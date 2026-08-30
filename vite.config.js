import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        admin: resolve(__dirname, 'admin-dashboard.html'),
        locator: resolve(__dirname, 'locator-map.html'),
        ambulance: resolve(__dirname, 'ambulance-reroute.html'),
        pandharpur: resolve(__dirname, 'pandharpur-terminal.html'),
        truck_register: resolve(__dirname, 'truck-register.html'),
        truck_driver_index: resolve(__dirname, 'truck_driver/index.html'),
        backup_driver: resolve(__dirname, 'truck-driver.html'),
        truck_driver_login: resolve(__dirname, 'truck_driver/login.html')
      }
    }
  }
});
