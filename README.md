# Ismi Nabilah 2B D4 Teknik Informamtika

# Currency Integrated Inventory API

RESTful Web Service untuk manajemen inventaris barang yang terintegrasi dengan konversi mata uang secara real-time menggunakan API eksternal. Sistem dilengkapi autentikasi JWT, role-based authorization, validasi data, dokumentasi API menggunakan Swagger/OpenAPI, serta penyimpanan data menggunakan SQLite.

---

## Fitur Utama

### Inventory Management

* Menambahkan data barang
* Melihat daftar seluruh barang
* Melihat detail barang berdasarkan ID
* Memperbarui data barang
* Menghapus data barang

### Currency Integration

* Konversi harga dari USD ke IDR secara otomatis
* Mengambil nilai tukar dari API eksternal secara real-time
* Menampilkan harga hasil konversi dan kurs yang digunakan

### Authentication & Authorization

* Registrasi pengguna
* Login menggunakan username dan password
* JWT (JSON Web Token) Authentication
* Role-based Authorization (Admin dan User)
* Endpoint tertentu hanya dapat diakses oleh Admin

### API Documentation

* Dokumentasi API menggunakan Swagger/OpenAPI
* Endpoint dapat diuji langsung melalui browser

### Data Persistence

* Database SQLite
* Data tetap tersimpan meskipun server dimatikan

### Validation

* Validasi request menggunakan Zod
* Menampilkan pesan error yang jelas apabila data tidak valid

---

## Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* SQLite (`node:sqlite`)

### Authentication

* JSON Web Token (JWT)

### Validation

* Zod

### API Documentation

* Swagger UI
* Swagger JSDoc

### Development Tools

* TSX
* Vitest

---

## Arsitektur Sistem

Project ini menggunakan arsitektur Monolithic REST API.

```text
Client
   │
   ▼
Express Application
   │
   ├── Authentication
   ├── Authorization
   ├── Inventory Management
   ├── Currency Integration
   ├── Swagger Documentation
   └── SQLite Database
```

---

## Instalasi

Clone repository:

```bash
git clone <repository-url>
```

Masuk ke folder project:

```bash
cd <nama-project>
```

Install dependency:

```bash
npm install
```

---

## Menjalankan Project

Mode development:

```bash
npm run dev
```

Server akan berjalan pada:

```text
http://localhost:3000
```

---

## Dokumentasi API

Swagger UI tersedia pada:

```text
http://localhost:3000/api-docs
```

Melalui halaman tersebut seluruh endpoint dapat dicoba langsung tanpa menggunakan Postman.

---

## Endpoint Authentication

| Method | Endpoint       | Keterangan                |
| ------ | -------------- | ------------------------- |
| POST   | /auth/register | Registrasi pengguna       |
| POST   | /auth/login    | Login dan mendapatkan JWT |

---

## Endpoint Inventory

| Method | Endpoint          | Authentication |
| ------ | ----------------- | -------------- |
| GET    | /api/v1/items     | Tidak          |
| GET    | /api/v1/items/:id | Tidak          |
| POST   | /api/v1/items     | Ya             |
| PUT    | /api/v1/items/:id | Ya             |
| DELETE | /api/v1/items/:id | Ya             |

---

## Contoh Request Registrasi

```json
{
  "username": "mina",
  "password": "123456"
}
```

---

## Contoh Request Login

```json
{
  "username": "mina",
  "password": "123456"
}
```

Contoh Response:

```json
{
  "token": "eyJhbGciOi..."
}
```

---

## Contoh Request Menambah Barang

```json
{
  "name": "Mechanical Keyboard Pro",
  "category": "Accessories",
  "price_usd": 45,
  "stock": 20
}
```

---

## Contoh Response Data Barang

```json
{
  "id": "item-001",
  "name": "Mechanical Keyboard Pro",
  "category": "Accessories",
  "price_usd": 45,
  "stock": 20,
  "formattedPriceIdr": "Rp809.874",
  "conversionRate": "1 USD = Rp17.997,19"
}
```

---

## Pengujian

Pengujian API dilakukan menggunakan:

* Swagger UI
* Postman

Skenario pengujian yang dilakukan:

* Registrasi pengguna
* Login pengguna
* Akses endpoint menggunakan JWT
* Menampilkan seluruh data barang
* Menampilkan detail barang
* Menambahkan barang
* Memperbarui barang
* Menghapus barang
* Integrasi API kurs mata uang

---

## Struktur Project

```text
src
├── controllers
├── routes
├── services
├── middlewares
├── schemas
├── db
├── docs
├── app.ts
└── server.ts
```

---

## Pengembangan Lanjutan

Beberapa pengembangan yang dapat dilakukan pada project ini:

* Menambahkan dukungan multi-currency (EUR, JPY, SGD, MYR, dll)
* Integrasi RabbitMQ untuk komunikasi asynchronous antar service
