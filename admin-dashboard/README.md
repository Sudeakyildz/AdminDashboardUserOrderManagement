# Admin Dashboard - Kullanıcı & Sipariş Yönetimi

React ve Express.js ile geliştirilmiş fullstack admin dashboard uygulaması.

## Özellikler

- Login sistemi (e-posta ve şifre validasyonu)
- Dashboard layout (Sidebar + Topbar)
- Kullanıcı listesi (tablo görünümü)
- Sipariş listesi (kart görünümü, filtreleme)
- İstatistik kartları (toplam gelir, sipariş sayıları)
- Responsive tasarım (mobil, tablet, desktop)
- REST API backend (Express.js)

## 🛠 Teknolojiler

**Frontend:**
- React 19
- Vite 7
- CSS3 (Grid, Flexbox, Custom Properties)

**Backend:**
- Node.js
- Express.js
- CORS

## Kurulum

### Frontend
```bash
cd admin-dashboard
npm install
npm run dev
```

### Backend (Opsiyonel)
```bash
cd admin-dashboard/backend
npm install
npm run dev
```

##  Giriş

**E-posta:** Geçerli format (örn: admin@example.com)  
**Şifre:** En az 8 karakter, büyük/küçük harf ve rakam içermeli

## Proje Yapısı

```
admin-dashboard/
├── src/
│   ├── components/      # React componentleri
│   ├── utils/           # Helper fonksiyonlar
│   └── services/        # API servisleri
├── backend/             # Express.js API
└── README.md
```

##  Dokümantasyon

- `DESIGN_DECISIONS.md` - Tasarım kararları
- `PROJE_RAPORU.md` - Geliştirme süreci

##  Lisans

Bu proje staj görevi için geliştirilmiştir.
