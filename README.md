# Admin Dashboard – Kullanıcı & Sipariş Yönetimi

Kullanıcıları ve siparişleri yönetmek için hazırlanmış bir admin paneli. Ön yüz **React + Vite**, backend ise **Next.js API Routes** ile yazıldı.

## Özellikler

- **Giriş sistemi:** Backend'de doğrulanan e-posta/şifre, imzalı ve süreli token (8 saat). Süresi dolan oturumda otomatik çıkış.
- **Genel Bakış:** Toplam gelir, sipariş sayısı, ortalama tutar, günlük gelir grafiği, sipariş durumu grafiği ve son siparişler.
- **Siparişler:** Duruma göre filtreleme, arama, sıralama ve sayfalama.
- **Kullanıcılar:** Arama, durum filtresi, sütun başlığına tıklayarak sıralama ve sayfalama.
- **Koyu / açık tema:** Seçim tarayıcıda saklanır, ilk açılışta sistem temasını kullanır.
- **Mobil uyumlu:** Küçük ekranlarda açılır menü.
- **Yükleniyor ve hata durumları:** Hata olursa "Tekrar dene" düğmesi çıkar. Backend'e hiç ulaşılamazsa yerel örnek veriye düşer.

## Kullanılan Teknolojiler

| Katman   | Teknoloji                         |
| -------- | --------------------------------- |
| Ön yüz   | React 19, Vite, CSS               |
| Backend  | Next.js 14 (API Routes)           |
| Grafikler | Saf SVG (ek kütüphane yok)       |

## Proje Yapısı

```
admin-dashboard/
├── src/
│   ├── components/   # Sayfalar ve arayüz bileşenleri
│   ├── hooks/        # useApi, useTableData, useTheme
│   ├── services/     # API istekleri (api.js)
│   └── utils/        # Yardımcı fonksiyonlar ve örnek veri
└── backend/
    ├── app/api/      # login, users, orders, stats uçları
    ├── lib/          # auth.js (token), data.js (veri)
    └── middleware.js # CORS ayarları
```

## Kurulum ve Çalıştırma

Gereksinim: **Node.js 18 veya üzeri**

### 1. Backend (port 3001)

```bash
cd admin-dashboard/backend
npm install
npm run dev
```

### 2. Ön yüz (port 5173)

Yeni bir terminal açın:

```bash
cd admin-dashboard
npm install
npm run dev
```

Tarayıcıda **http://localhost:5173** adresini açın.

## Demo Giriş

| Alan   | Değer               |
| ------ | ------------------- |
| E-posta | `admin@example.com` |
| Şifre  | `Admin1234`         |

Şifre kuralı: en az 8 karakter, büyük harf, küçük harf ve rakam içermeli.

## Yapılandırma

Backend için isteğe bağlı ortam değişkenleri (`admin-dashboard/backend/.env.local`):

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin1234
AUTH_SECRET=uzun-ve-rastgele-bir-anahtar
```

Ön yüz backend adresini varsayılan olarak `http://localhost:3001/api` kullanır. Değiştirmek için `admin-dashboard/.env` dosyasına şunu ekleyin:

```env
VITE_API_URL=http://localhost:3001/api
```

> **Not:** Bu proje bir demo olarak hazırlandı. Gerçek bir ortamda yayınlamadan önce `ADMIN_PASSWORD` ve `AUTH_SECRET` değerlerini mutlaka değiştirin ve CORS ayarını (`backend/middleware.js`) kendi alan adınızla sınırlandırın.

## API Uçları

Giriş hariç tüm uçlar `Authorization: Bearer <token>` başlığı ister, yoksa `401` döner.

| Yöntem | Uç                      | Açıklama                              |
| ------ | ----------------------- | ------------------------------------- |
| POST   | `/api/login`            | Giriş yapar, token döner              |
| GET    | `/api/users`            | Kullanıcı listesi                     |
| GET    | `/api/orders`           | Sipariş listesi                       |
| GET    | `/api/orders/:status`   | `all`, `active`, `pending`, `cancelled` |
| GET    | `/api/stats`            | Gelir ve sipariş istatistikleri       |

## Üretim Derlemesi

```bash
# Ön yüz
cd admin-dashboard
npm run build

# Backend
cd backend
npm run build
npm start
```
