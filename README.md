
# User API

## Deskripsi Proyek

User API adalah aplikasi RESTful yang dibangun menggunakan Laravel. Aplikasi ini menyediakan endpoint untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada entitas pengguna. Dengan API ini, pengguna dapat menambahkan, mengambil, memperbarui, dan menghapus data pengguna dengan mudah.

## Fitur Utama

- **CRUD untuk Pengguna**: Menambahkan, mengambil, memperbarui, dan menghapus pengguna.
- **Validasi Input**: Memastikan bahwa data yang diterima sesuai dengan format yang diharapkan.
- **Logging**: Mencatat setiap permintaan yang diterima untuk keperluan audit.

## Teknologi yang Digunakan

- Laravel (versi 11)
- PHP (versi 8.2 atau lebih tinggi)
- Composer
- Node.js dan npm
- MySQL
- Jest (untuk tes)

## Dokumentasi API
<a href="https://">Dokumentasi API</a>

### Langkah-langkah Instalasi dan Penggunaan Aplikasi di Lokal

1. **Clone Repository**:
   ```bash
   git clone https://github.com/username/repo-name.git
   cd repo-name
   
2. **Install Dependencies**:
   ```bash
   composer install
   npm install

3. **Setup Environment**: 
   - Salin file `.env.example` menjadi `.env`.
    ```bash
    cp .env.example .env
     ```
   - Atur koneksi database di file `.env`.
    ```bash
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nama_database
   DB_USERNAME=username
   DB_PASSWORD=password
    ```
   Generate kunci aplikasi:
     ```bash
     php artisan key:generate

4. **Jalankan Migrasi**:
   ```bash
   php artisan migrate
   ```

5. **Jalankan Aplikasi**:
   ```bash
    php artisan serve

6. **Akses Aplikasi**: 
   Buka browser dan akses `http://localhost:8000`.

## Pegujian

Untuk menjalankan test, gunakan perintah berikut:
  ```bash
    npm test
