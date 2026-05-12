# Pemrograman Client Server

## Struktur Folder
* `project-client-kampus/`: Berisi file Frontend (HTML, CSS, JS).
* `project-api-kampus/`: Berisi file Backend/API.

## Cara Menjalankan

1. Buat Database: 
   Buat database MySQL baru (misalnya melalui PHPMyAdmin) dengan nama `db_kampus_api`.

2. Konfigurasi Environment:
   Buat file baru bernama `.env` di dalam folder `project-api-kampus/`. 
   
   **Penting:** Anda bisa menyesuaikan isi file ini sesuai dengan konfigurasi database lokal Anda (misalnya jika Anda menggunakan password database). 
   
   Isi file `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=               # Isi jika database Anda menggunakan password
   DB_NAME=db_kampus_api  # Sesuaikan dengan nama database yang Anda buat
   PORT=3000              # Port default server (bisa diganti jika bentrok)
   ```

3. Pastikan Anda sudah menginstal **Node.js**.

4. Buka terminal di folder `project-api-kampus`, lalu jalankan:

    ```bash
    npm init -y
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    npm install express mysql2 dotenv express-validator cors
    npm install --save-dev nodemon
    ```

    Untuk instalasi.

    Lalu untuk start server jalankan ini di terminal:

    ```bash
    npm run dev
    ```

5. Buka file `project-client-kampus/index.html` menggunakan **Live Server** di VS Code.
