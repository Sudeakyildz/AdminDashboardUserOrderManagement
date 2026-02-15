# Backend API - Admin Dashboard (Next.js)

Next.js App Router ile oluşturulmuş REST API.

## 🚀 Kurulum

```bash
cd backend
npm install
```

## 📡 Çalıştırma

### Development (port 3001)
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

API `http://localhost:3001` adresinde çalışır. Ana sayfa: `http://localhost:3001`

## 📋 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | /api/users | Tüm kullanıcılar |
| GET | /api/orders | Tüm siparişler |
| GET | /api/orders/[status] | Duruma göre siparişler (active, pending, cancelled, all) |
| GET | /api/stats | İstatistikler (gelir, sipariş sayıları) |
| POST | /api/login | Giriş (fake auth) |

## 🛠 Teknolojiler

- **Next.js 14** – App Router, API Routes
- **React 18**

## 📁 Yapı

```
backend/
├── app/
│   ├── api/           # API route'ları
│   │   ├── users/
│   │   ├── orders/
│   │   ├── stats/
│   │   └── login/
│   ├── layout.js
│   └── page.js
├── lib/
│   └── data.js        # Paylaşılan veri (users, orders)
├── next.config.js
└── package.json
```

## 📝 Notlar

- Demo amaçlı in-memory veri kullanılır. Gerçek projede veritabanı (PostgreSQL, MongoDB vb.) eklenebilir.
- CORS: Next.js aynı origin’de çalıştığı için geliştirme ortamında proxy veya frontend’in aynı portu kullanması tercih edilebilir; şu an frontend `localhost:3001` ile istek atıyor.
