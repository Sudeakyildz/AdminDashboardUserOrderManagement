export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Admin Dashboard Backend API</h1>
      <p>Versiyon: 1.0.0 (Next.js)</p>
      <ul>
        <li>GET /api/users - Kullanıcı listesi</li>
        <li>GET /api/orders - Sipariş listesi</li>
        <li>GET /api/orders/[status] - Duruma göre siparişler</li>
        <li>GET /api/stats - İstatistikler</li>
        <li>POST /api/login - Giriş yap</li>
      </ul>
    </main>
  )
}
