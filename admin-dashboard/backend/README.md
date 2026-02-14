# Backend API - Admin Dashboard

Express.js kullanılarak oluşturulmuş basit REST API.

## 🚀 Kurulum

```bash
cd backend
npm install
```

## 📡 Çalıştırma

### Development Mode (Otomatik yenileme)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server `http://localhost:3001` adresinde çalışacaktır.

## 📋 API Endpoints

### GET /
API bilgileri ve endpoint listesi

### GET /api/users
Tüm kullanıcıları getirir

**Response:**
```json
[
  {
    "id": 1,
    "name": "Ahmet Yılmaz",
    "email": "ahmet.yilmaz@example.com",
    "phone": "+90 532 123 45 67",
    "joinDate": "2024-01-15",
    "status": "active"
  }
]
```

### GET /api/orders
Tüm siparişleri getirir

### GET /api/orders/:status
Duruma göre siparişleri filtreler

**Örnek:**
- `/api/orders/active` - Sadece aktif siparişler
- `/api/orders/pending` - Sadece beklemede siparişler
- `/api/orders/cancelled` - Sadece iptal edilen siparişler
- `/api/orders/all` - Tüm siparişler

### GET /api/stats
İstatistikleri getirir (toplam gelir, sipariş sayıları)

**Response:**
```json
{
  "totalRevenue": 45000,
  "totalOrders": 10,
  "activeOrders": 5,
  "pendingOrders": 3,
  "cancelledOrders": 2
}
```

### POST /api/login
Giriş yap (fake authentication)

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Giriş başarılı",
  "token": "fake-jwt-token-1234567890",
  "user": {
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

## 🛠 Teknolojiler

- **Express.js** - Web framework
- **CORS** - Cross-Origin Resource Sharing (Frontend'den istekler için)

## 📝 Notlar

- Bu basit bir demo backend'idir
- Gerçek uygulamada veritabanı kullanılmalı (MongoDB, PostgreSQL, vb.)
- Authentication için JWT token kullanılmalı
- Error handling ve validation middleware eklenebilir
