````markdown
# Frontend ASMI TS

Proyek ini adalah aplikasi frontend untuk ASMI menggunakan **React + TypeScript + Vite**. Tampilan menggunakan **TailwindCSS** dan manajemen state sederhana.

Dockerized untuk kemudahan pengembangan dan deployment.

---

## Fitur Utama

- Dashboard modern & responsif
- Monitoring stok produk (male & female parfum)
- Manajemen keuangan produk
- Aktivitas & laporan terintegrasi
- Dukungan tema warna via `.env`
- Routing dengan `react-router-dom`
- Linter & formatter: ESLint + Prettier

---

## Teknologi

- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Containerization**: Docker, Docker Compose
- **Linting & Formatting**: ESLint, Prettier
- **Icons**: Lucide React

---

## Instalasi & Setup Lokal

### 1. Clone Repository

```bash
git clone https://github.com/username/frontend-asmi-ts.git
cd frontend-asmi-ts
```
````

### 2. Install Dependencies

```bash
# Frontend
npm install
```

### 3. Setup Environment

Buat file `.env` di root frontend:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api


```

> Sesuaikan `VITE_API_BASE_URL` jika menggunakan Docker: `http://backend:8000/api`.

---

## Menjalankan Aplikasi (Tanpa Docker)

```bash
cd frontend-asmi-ts
npm install
npm run dev
```

Akses aplikasi di: `http://localhost:5173`

---

## Menjalankan Aplikasi Dengan Docker

Pastikan Docker & Docker Compose sudah terinstall.

### 1. Build & Jalankan

```bash
docker-compose up --build
```

### 2. Akses

- Frontend: `http://localhost:3000`
- Backend FastAPI: `http://localhost:8000`

### 3. Struktur Docker Compose

```yaml
services:
  frontend:
    build: .
    ports:
      - '3000:80'
    environment:
      - VITE_API_BASE_URL=http://backend:8000/api
    depends_on:
      - backend

  backend:
    image: python:3.12-slim
    volumes:
      - ./backend:/app
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ports:
      - '8000:8000'
```

---

## Scripts

| Script            | Deskripsi                                  |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Jalankan frontend Vite di mode development |
| `npm run build`   | Build frontend untuk produksi              |
| `npm run preview` | Preview hasil build frontend               |
| `npm run lint`    | Jalankan ESLint untuk cek kode             |

---

## Struktur Folder

```
frontend/
├─ src/
│  ├─ components/   # Komponen UI
│  ├─ pages/        # Halaman Dashboard, Produk, Keuangan
│  ├─ main.tsx      # Entry point React
├─ public/
├─ index.css        # Tailwind CSS
├─ vite.config.ts
├─ tsconfig.json
├─ .env
```

---

## Lint & Format

- ESLint: memeriksa kualitas kode
- Prettier: memformat kode

Jalankan:

```bash
npm run lint
```

---

## Variabel Environment

```env
# API
VITE_API_BASE_URL=http://localhost:8000/api

```

---

## Tips

- Gunakan `docker-compose up --build` untuk pertama kali build project
- Gunakan hot reload untuk frontend & backend di Docker untuk development cepat
- Semua endpoint API frontend diarahkan ke `VITE_API_BASE_URL`

---

## Lisensi

MIT License © ASMI
