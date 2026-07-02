# Currency Integrated Inventory API

RESTful Web Service untuk manajemen inventaris barang yang terintegrasi dengan konversi mata uang secara real-time menggunakan API eksternal. Aplikasi ini dibangun menggunakan **Express.js** dan **TypeScript**, serta dilengkapi dengan autentikasi JWT, Role-Based Authorization (RBAC), database SQLite, validasi menggunakan Zod, dan dokumentasi API menggunakan Swagger.

**Developer:** Ismi Nabilah 2B D4 Teknik Informatika

---

# Gambaran Project

Project ini merupakan Web Service berbasis REST yang digunakan untuk mengelola data inventaris barang. Selain menyediakan fitur CRUD, aplikasi juga mengintegrasikan API kurs mata uang sehingga harga barang dalam USD dapat dikonversi secara otomatis ke Rupiah (IDR).

Project ini dibuat sebagai implementasi berbagai konsep Web Service, seperti:

- REST API
- Authentication & Authorization
- Integrasi API Eksternal
- Dokumentasi API menggunakan Swagger
- Database Persistence
- Validasi Data

---

# Fitur Utama

## Manajemen Inventaris

- Menambahkan data barang
- Melihat seluruh data barang
- Melihat detail barang berdasarkan ID
- Memperbarui data barang
- Menghapus data barang

## Integrasi Kurs Mata Uang

- Konversi harga dari USD ke IDR
- Mengambil kurs secara real-time dari API eksternal
- Menampilkan hasil konversi beserta kurs yang digunakan
- Menggunakan nilai default apabila API eksternal tidak dapat diakses

## Authentication & Authorization

- Registrasi pengguna
- Login pengguna
- JWT Authentication
- Bearer Token Authorization
- Role Admin dan User
- Endpoint tertentu hanya dapat diakses oleh Admin

## Dokumentasi API

- Swagger UI
- Pengujian endpoint langsung melalui browser

## Validasi Data

- Validasi request menggunakan Zod
- Menampilkan pesan error apabila data tidak valid

## Database

- SQLite
- Data tetap tersimpan meskipun server dimatikan

---

# Highlight Project

✅ RESTful API

✅ CRUD Inventory

✅ SQLite Database

✅ JWT Authentication

✅ Role-Based Authorization (RBAC)

✅ Swagger Documentation

✅ Integrasi API Eksternal

✅ Konversi Mata Uang

✅ Validasi Data menggunakan Zod

---

# Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Backend | Node.js, Express.js |
| Bahasa | TypeScript |
| Database | SQLite |
| Authentication | JWT |
| Validasi | Zod |
| Dokumentasi | Swagger UI & OpenAPI |
| Development | TSX |
| Pengujian | Swagger UI & Postman |

---

# Arsitektur Sistem

```text
                   Client
                      │
                      │ HTTP Request
                      ▼
          +-------------------------+
          | Express REST API Server |
          +-----------+-------------+
                      |
      +---------------+----------------+
      |               |                |
 Authentication   Inventory API   Currency Service
      |               |                |
      +---------------+----------------+
                      |
                      ▼
                SQLite Database

          API Kurs Mata Uang Eksternal
```

---

# Alur Authentication

```text
Registrasi
     │
     ▼
Login
     │
     ▼
Mendapatkan JWT
     │
     ▼
Authorize (Bearer Token)
     │
     ▼
Mengakses Endpoint yang Dilindungi
```

---

# Instalasi

Clone repository

```bash
git clone <repository-url>
```

Masuk ke folder project

```bash
cd <nama-project>
```

Install dependency

```bash
npm install
```

---

# Menjalankan Project

Mode Development

```bash
npm run dev
```

Server berjalan pada

```text
http://localhost:3000
```

---

# Dokumentasi API

Swagger tersedia pada

```text
http://localhost:3000/api-docs
```

Melalui halaman tersebut seluruh endpoint dapat langsung dicoba tanpa menggunakan Postman.

---

# Endpoint Authentication

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| POST | /auth/register | Registrasi pengguna |
| POST | /auth/login | Login dan mendapatkan JWT |

---

# Endpoint Inventory

| Method | Endpoint | Authentication |
|--------|----------|----------------|
| GET | /api/v1/items | Public |
| GET | /api/v1/items/{id} | Public |
| POST | /api/v1/items | Admin |
| PUT | /api/v1/items/{id} | Admin |
| DELETE | /api/v1/items/{id} | Admin |

---

# Contoh Login

Request

```json
{
  "username": "mina",
  "password": "123456"
}
```

Response

```json
{
  "token": "eyJhbGciOiJIUzI1Ni..."
}
```

---

# Contoh Menambah Barang

```json
{
  "name": "Mechanical Keyboard",
  "category": "Accessories",
  "price_usd": 45,
  "stock": 20
}
```

---

# Contoh Response Barang

```json
{
  "id": "item-001",
  "name": "Mechanical Keyboard",
  "category": "Accessories",
  "price_usd": 45,
  "stock": 20,
  "formattedPriceIdr": "Rp809.874",
  "conversionRate": "1 USD = Rp17.997,19"
}
```

---

# API Eksternal

Project ini menggunakan **ExchangeRate-API** sebagai sumber data kurs mata uang.

API digunakan untuk:

- Mengambil nilai tukar USD terhadap IDR
- Mengonversi harga barang secara otomatis
- Menampilkan kurs yang digunakan
- Memberikan fallback apabila API tidak dapat diakses

---

# Keamanan

- JWT Authentication
- Bearer Token
- Role-Based Authorization (RBAC)
- Endpoint CRUD dilindungi berdasarkan role
- Validasi request menggunakan Zod

---

# Pengujian

Pengujian dilakukan menggunakan:

- Swagger UI
- Postman

Skenario pengujian meliputi:

- Registrasi
- Login
- Authentication menggunakan JWT
- Authorization berdasarkan role
- CRUD Inventory
- Integrasi API Kurs Mata Uang

---

# Struktur Project

```text
src
├── controllers
├── routes
├── middlewares
├── services
├── schemas
├── db
├── docs
├── store
├── app.ts
└── server.ts
```

---

# Pengembangan Selanjutnya

Beberapa pengembangan yang masih dapat dilakukan:

- Menambahkan dukungan multi-currency (EUR, JPY, SGD, MYR, dll.)
- Mengubah arsitektur menjadi Microservices
- Mengintegrasikan RabbitMQ sebagai komunikasi asynchronous
- Deployment ke cloud
- Menambahkan Unit Testing dan Integration Testing

---

# Lisensi

Project ini dibuat untuk keperluan pembelajaran dan tugas mata kuliah **Web Service**.