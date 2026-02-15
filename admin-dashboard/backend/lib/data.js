// Paylaşılan API verileri (Express'teki ile aynı)

export const users = [
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet.yilmaz@example.com', phone: '+90 532 123 45 67', joinDate: '2024-01-15', status: 'active' },
  { id: 2, name: 'Ayşe Demir', email: 'ayse.demir@example.com', phone: '+90 533 234 56 78', joinDate: '2024-02-20', status: 'active' },
  { id: 3, name: 'Mehmet Kaya', email: 'mehmet.kaya@example.com', phone: '+90 534 345 67 89', joinDate: '2024-03-10', status: 'active' },
  { id: 4, name: 'Fatma Şahin', email: 'fatma.sahin@example.com', phone: '+90 535 456 78 90', joinDate: '2023-12-05', status: 'inactive' },
  { id: 5, name: 'Ali Öztürk', email: 'ali.ozturk@example.com', phone: '+90 536 567 89 01', joinDate: '2024-04-01', status: 'active' },
  { id: 6, name: 'Zeynep Arslan', email: 'zeynep.arslan@example.com', phone: '+90 537 678 90 12', joinDate: '2024-01-25', status: 'active' },
  { id: 7, name: 'Can Yıldız', email: 'can.yildiz@example.com', phone: '+90 538 789 01 23', joinDate: '2023-11-18', status: 'inactive' },
  { id: 8, name: 'Elif Çelik', email: 'elif.celik@example.com', phone: '+90 539 890 12 34', joinDate: '2024-03-28', status: 'active' }
]

export const orders = [
  { id: 'ORD-001', customerName: 'Ahmet Yılmaz', customerEmail: 'ahmet.yilmaz@example.com', product: 'Laptop', amount: 15000, status: 'active', orderDate: '2025-01-14T10:30:00' },
  { id: 'ORD-002', customerName: 'Ayşe Demir', customerEmail: 'ayse.demir@example.com', product: 'Telefon', amount: 8500, status: 'pending', orderDate: '2025-01-15T14:20:00' },
  { id: 'ORD-003', customerName: 'Mehmet Kaya', customerEmail: 'mehmet.kaya@example.com', product: 'Tablet', amount: 5500, status: 'active', orderDate: '2025-01-13T09:15:00' },
  { id: 'ORD-004', customerName: 'Fatma Şahin', customerEmail: 'fatma.sahin@example.com', product: 'Kulaklık', amount: 1200, status: 'cancelled', orderDate: '2025-01-12T16:45:00' },
  { id: 'ORD-005', customerName: 'Ali Öztürk', customerEmail: 'ali.ozturk@example.com', product: 'Monitör', amount: 3200, status: 'active', orderDate: '2025-01-16T11:00:00' },
  { id: 'ORD-006', customerName: 'Zeynep Arslan', customerEmail: 'zeynep.arslan@example.com', product: 'Klavye', amount: 800, status: 'pending', orderDate: '2025-01-15T13:30:00' },
  { id: 'ORD-007', customerName: 'Can Yıldız', customerEmail: 'can.yildiz@example.com', product: 'Mouse', amount: 450, status: 'active', orderDate: '2025-01-14T08:20:00' },
  { id: 'ORD-008', customerName: 'Elif Çelik', customerEmail: 'elif.celik@example.com', product: 'Hoparlör', amount: 1500, status: 'cancelled', orderDate: '2025-01-11T15:10:00' },
  { id: 'ORD-009', customerName: 'Ahmet Yılmaz', customerEmail: 'ahmet.yilmaz@example.com', product: 'Kamera', amount: 7200, status: 'active', orderDate: '2025-01-16T10:45:00' },
  { id: 'ORD-010', customerName: 'Ayşe Demir', customerEmail: 'ayse.demir@example.com', product: 'Kablosuz Şarj', amount: 350, status: 'pending', orderDate: '2025-01-15T17:00:00' }
]
