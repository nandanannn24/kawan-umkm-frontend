# Kawan UMKM - Platform Digital untuk UMKM Lokal

**Platform Web Inovatif untuk Memajukan UMKM Indonesia**  
*Finalis Lomba MIA 2025 Web In Action - Tim Sekawan Papat*

![Kawan UMKM](https://img.shields.io/badge/Lomba-MIA_2025_Web_In_Action-blue)
![Status](https://img.shields.io/badge/Status-Finalis-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Flask](https://img.shields.io/badge/Flask-2.3.3-green)

## 🎯 Tentang Kawan UMKM

**Kawan UMKM** adalah platform web modern yang dikembangkan khusus untuk mendukung pertumbuhan dan perkembangan UMKM (Usaha Mikro, Kecil, dan Menengah) lokal, khususnya di lingkungan kampus **UPN Veteran Jawa Timur** dan sekitarnya. Platform ini bertujuan menjadi jembatan digital yang menghubungkan pelaku UMKM dengan mahasiswa dan masyarakat luas.

### 🏆 **Lomba MIA 2025 Web In Action**
- **Nama Tim:** Sekawan Papat
- **Kategori:** Web Development
- **Tema:** Digitalisasi UMKM Lokal
- **Target Pengguna:** UMKM di sekitar UPN Veteran Jawa Timur

## ✨ Fitur Unggulan

### 🎓 **Khusus Mahasiswa & Masyarakat UPN Veteran Jatim**
- **🏪 Discovery UMKM Lokal** - Temukan UMKM terbaik di sekitar kampus
- **📍 Geolocation Based** - Prioritaskan UMKM di wilayah Surabaya dan Jawa Timur
- **🎓 Student-Friendly** - Interface yang mudah digunakan oleh mahasiswa
- **📱 Mobile Optimized** - Akses mudah dari smartphone

### 👥 **Untuk Pengguna Umum**
- **🔍 Pencarian Cerdas** - Cari UMKM berdasarkan nama, kategori, dan kedekatan lokasi
- **📊 Filter & Sorting** - Filter berdasarkan kategori kuliner, fashion, jasa, dll
- **📄 Detail Lengkap** - Informasi UMKM termasuk alamat, kontak, dan jam operasional
- **⭐ Rating & Ulasan** - Sistem penilaian dan review yang transparan
- **🔐 Autentikasi Aman** - Registrasi dan login yang mudah

### 🏪 **Untuk Pemilik UMKM**
- **📈 Dashboard Sederhana** - Kelola bisnis dengan interface user-friendly
- **➕ Daftarkan UMKM** - Registrasi usaha dalam 5 menit
- **🖼️ Galeri Produk** - Showcase produk dan jasa secara visual
- **💬 Manajemen Ulasan** - Tanggapi feedback pelanggan

### 👨‍💼 **Fitur Admin**
- **⚙️ Dashboard Admin** - Monitoring seluruh aktivitas platform
- **✅ Verifikasi UMKM** - Validasi data UMKM yang mendaftar
- **📈 Analytics** - Statistik pertumbuhan UMKM terdaftar

## 🛠 Teknologi Modern

### Frontend
- **React.js 18** - User interface yang responsive dan interaktif
- **React Router DOM** - Navigasi single-page application
- **Axios** - Komunikasi dengan backend API
- **Framer Motion** - Animasi smooth dan modern
- **CSS Modules** - Styling terisolasi dan maintainable

### Backend
- **Python Flask** - RESTful API yang ringan dan powerful
- **SQLite** - Database sederhana untuk development
- **JWT Authentication** - Sistem keamanan terstandar
- **File Upload Handler** - Mendukung upload gambar produk

## 🚀 Panduan Instalasi Cepat

### Prerequisites
- Node.js 16+ 
- Python 3.8+
- npm

### 📥 **Installation & Setup Lengkap**

#### 1. **Download dan Persiapan Project**
```bash
# Clone repository
git clone https://github.com/sekawan-papat/kawan-umkm.git
cd kawan-umkm

# Atau jika download manual, extract zip dan masuk ke folder
cd kawan-umkm-project

2. Setup Backend (Terminal 1)

- cd backend
- python -m venv env
- env\Scripts\activate
- source env/bin/activate
- pip install -r requirements.txt
- python app.py
- Backend akan berjalan di: http://localhost:5000

3. Setup Frontend (Buka Terminal Baru)

- cd frontend
- npm install
- npm start
- Frontend akan berjalan di: http://localhost:3000

4. Akses Aplikasi

- Buka browser dan kunjungi: http://localhost:3000
- Panduan Penggunaan Lengkap

- Untuk Pengguna Baru (Mahasiswa/Masyarakat)
1. Buka http://localhost:3000
2. Klik "Register" di pojok kanan atas
3. Isi form registrasi dengan data lengkap
4. Login dengan akun yang sudah dibuat
5. Jelajahi UMKM di halaman beranda atau "UMKM List"
6. Klik UMKM untuk melihat detail lengkap
7. Beri rating dan ulasan pada UMKM yang dikunjungi

- Untuk Pemilik UMKM
1. Register dengan memilih role "Pemilik UMKM"
2. Login dan akses "Dashboard" dari menu
3. Klik "Buat UMKM Baru" di dashboard
4. Isi form pendaftaran UMKM dengan data lengkap:
5. Nama usaha
6. Kategori (kuliner, fashion, jasa, dll)
7. Alamat lengkap
8. Deskripsi usaha
9. Upload foto produk/usaha
10. Tunggu verifikasi admin (max 24 jam)
11. Kelola UMKM melalui dashboard setelah disetujui

- Untuk Admin
1. Login dengan akun admin:
2. Email: admin@kawanumkm.com
3. Password: admin123
4. Akses "Admin Dashboard" dari menu
5. Verifikasi UMKM di section "Pending Approval"
6. Kelola pengguna dan pantau statistik platform

- Struktur Project Lengkap

kawan-umkm-project/
├── 📂 backend/
│   ├── app.py                
│   ├── auth.py               
│   ├── umkm_routes.py        
│   ├── user_routes.py        
│   ├── admin_routes.py       
│   ├── models.py             
│   ├── config.py             
│   ├── requirements.txt      
│   ├── kawan_umkm.db         
│   └── uploads/              
│       ├── umkm/
│       └── products/
└── 📂 frontend/
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   └── favicon.ico
    └── src/
        ├── components/       
        │   ├── Header/
        │   ├── Footer/
        │   ├── UMKMCard/
        │   ├── SearchBar/
        │   └── RatingStars/
        ├── pages/           
        │   ├── Home/
        │   ├── UMKMList/
        │   ├── UMKMDetail/
        │   ├── Login/
        │   ├── Register/
        │   ├── Dashboard/
        │   └── Admin/
        ├── hooks/           
        │   ├── useAuth.jsx
        │   └── useLocalStorage.js
        ├── context/         
        │   └── AuthContext.jsx
        ├── services/        
        │   └── api.js
        ├── styles/          
        │   ├── globals.css
        │   └── components/
        ├── utils/           
        │   └── helpers.js
        └── App.jsx          


- API Endpoints Lengkap

Authentication
1. POST /api/auth/register - Registrasi user baru
2. POST /api/auth/login - Login user
3. GET /api/auth/me - Get data user saat ini
4. POST /api/auth/logout - Logout user

UMKM Management
1. GET /api/umkm - Get semua UMKM terdaftar
2. GET /api/umkm/:id - Get detail UMKM spesifik
3. POST /api/umkm - Buat UMKM baru
4. PUT /api/umkm/:id - Update data UMKM
5. DELETE /api/umkm/:id - Hapus UMKM

Reviews & Ratings
1. GET /api/umkm/:id/reviews - Get ulasan UMKM
2. POST /api/umkm/:id/reviews - Tambah ulasan baru
3. GET /api/reviews/user - Get ulasan oleh user

Admin Endpoints
1. GET /api/admin/umkm/pending - Get UMKM pending approval
2. POST /api/admin/umkm/:id/approve - Approve UMKM
3. POST /api/admin/umkm/:id/reject - Reject UMKM
4. GET /api/admin/stats - Get platform statistics

A. Troubleshooting Lengkap
1. Backend Error "Address already in use"
Solusi 1: Gunakan port berbeda
- python app.py --port 5001 
Solusi 2: Kill process yang menggunakan port 5000
- netstat -ano | findstr :5000 # Windows:
- taskkill /PID <PID_NUMBER> /F
- lsof -ti:5000 | xargs kill -9 # Mac/Linux:

2. Frontend Tidak Connect ke Backend
- Pastikan backend running di port 5000
- Check di browser: http://localhost:5000/api/umkm
- Jika ada CORS error, tambahkan di backend/app.py:
- from flask_cors import CORS
- CORS(app)
- Pastikan API_URL di frontend/src/services/api.js benar:
- const API_URL = "http://localhost:5000/api";

3. Database Error atau Data Hilang
- Reset database (data akan hilang):
- cd backend
- rm kawan_umkm.db
- python app.py
- Database baru akan dibuat otomatis

4. Module Not Found Error
- cd backend
- pip install -r requirements.txt
- cd frontend
- npm install

5. Virtual Environment Error
- env\Scripts\activate
- Jika virtual environment corrupt:
- python -m venv env --clear

👥 Tim Sekawan Papat
Anggota Tim:

Priyoga Listyo Ananda - Full Stack Developer
Rifat Abhista - Testing Developer
Firzan Syaroni - UI/UX Designer by Canva

Program Studi: Informatika
Fakultas: Ilmu Komputer
Institusi: UPN Veteran Jawa Timur

Kawan UMKM - Bersama memajukan UMKM Indonesia! 🚀
Dibangun oleh Tim Sekawan Papat untuk Lomba MIA 2025 Web In Action

© 2025 Tim Sekawan Papat - UPN Veteran Jawa Timur