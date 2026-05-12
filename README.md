# Pemrograman Client Server

## Struktur Folder
* `project-client-kampus/`: Berisi file Frontend (HTML, CSS, JS).
* `project-api-kampus/`: Berisi file Backend/API.

## Cara Menjalankan
1. Pastikan Anda sudah menginstal **Node.js**.
2. Buka terminal di folder `project-api-kampus`, lalu jalankan:
    \`\`\`bash
    npm init -y
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    npm install express mysql2 dotenv npm install --save-dev nodemon express-validator cors
    \`\`\`
    untuk instalasi.
    lalu untuk start server jalankan ini di terminal:
    \`\`\`bash
    npm run dev
    \`\`\`
3. Buka file `project-client-kampus/index.html` menggunakan **Live Server** di VS Code.