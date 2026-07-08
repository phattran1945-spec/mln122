import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Bike,
  BookOpen,
  ChefHat,
  CircleDollarSign,
  Clock,
  CloudRain,
  Cpu,
  Home,
  MapPin,
  PackageCheck,
  ReceiptText,
  RefreshCw,
  Smartphone,
  Sparkles,
  Store,
  Ticket,
  TrendingUp,
  Trophy,
  Users,
  Utensils,
  WalletCards
} from 'lucide-react';
import './styles.css';

const money = (value) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);

const sections = [
  { id: 'intro', label: 'Mở đầu', icon: Home },
  { id: 'question', label: 'Vấn đề', icon: CircleDollarSign },
  { id: 'builder', label: 'Tự đặt đơn', icon: ReceiptText },
  { id: 'journey', label: 'Chuỗi giá trị', icon: Bike },
  { id: 'timeline', label: 'Dao động giá', icon: CloudRain },
  { id: 'map', label: 'Thị trường', icon: MapPin },
  { id: 'playground', label: 'Mô phỏng', icon: RefreshCw },
  { id: 'cards', label: 'Ghi nhớ', icon: BadgeCheck },
  { id: 'quiz', label: 'Quiz', icon: Trophy },
  { id: 'final', label: 'Tổng kết', icon: Sparkles }
];

const platformData = {
  grab: { name: 'GrabFood', fee: 8000, color: '#00a651', className: 'grab' },
  shopee: { name: 'ShopeeFood', fee: 6000, color: '#ee4d2d', className: 'shopee' },
  be: { name: 'beFood', fee: 7000, color: '#f4b400', className: 'be' }
};

const journeyData = {
  customer1: {
    icon: Users, tag: 'Điểm khởi đầu của giá trị', title: 'Khách hàng đặt món',
    body: 'Khách hàng bỏ ra tiền — hình thức biểu hiện của giá trị — để đổi lấy một hàng hoá (món ăn đã được giao đến tay). Đây là hành vi trao đổi hàng hoá cơ bản nhất trong toàn bộ chuỗi.',
    stats: [['Vai trò', 'Người tiêu dùng cuối'], ['Đóng góp', 'Chi trả bằng tiền']]
  },
  restaurant: {
    icon: Store, tag: 'Nơi giá trị được tạo ra (1)', title: 'Nhà hàng / Quán ăn',
    body: 'Nhà hàng bỏ vốn (nguyên liệu, mặt bằng, thiết bị) và tổ chức lao động để sản xuất ra món ăn — một hàng hoá có giá trị sử dụng thật. Đây là nơi giá trị hàng hoá bắt đầu được "kết tinh".',
    stats: [['Vai trò', 'Nhà sản xuất'], ['Đóng góp', 'Vốn + tổ chức lao động']]
  },
  kitchen: {
    icon: ChefHat, tag: 'Nơi giá trị được tạo ra (2)', title: 'Đầu bếp / Nhân viên pha chế',
    body: 'Đây là lao động cụ thể trực tiếp tạo ra giá trị sử dụng của món ăn. Thời gian, kỹ năng và công sức của đầu bếp chính là phần "lao động sống" được cộng vào giá trị hàng hoá.',
    stats: [['Vai trò', 'Người lao động trực tiếp'], ['Đóng góp', 'Kỹ năng + thời gian']]
  },
  platform: {
    icon: Smartphone, tag: 'Trung gian thu giá trị thừa', title: 'Nền tảng (Grab / Shopee / Be)',
    body: 'Nền tảng không trực tiếp tạo ra món ăn hay vận chuyển, nhưng cung cấp hạ tầng kết nối (app, thuật toán ghép đơn, thanh toán). Nền tảng thu "phí dịch vụ" — một phần giá trị được trích ra để duy trì và vận hành hạ tầng đó, đồng thời tạo lợi nhuận.',
    stats: [['Vai trò', 'Trung gian công nghệ'], ['Đóng góp', 'Hạ tầng + thuật toán']]
  },
  shipper: {
    icon: Bike, tag: 'Nơi giá trị được tạo ra (3)', title: 'Shipper / Người giao hàng',
    body: 'Shipper bán "hàng hoá dịch vụ vận chuyển" — hao phí là thời gian, xăng xe, hao mòn phương tiện và rủi ro giao thông. Phí giao hàng chính là giá cả của loại hàng hoá dịch vụ này, dao động theo cung cầu shipper.',
    stats: [['Vai trò', 'Lao động vận chuyển'], ['Đóng góp', 'Thời gian + rủi ro']]
  },
  customer2: {
    icon: PackageCheck, tag: 'Điểm hoàn tất trao đổi', title: 'Khách hàng nhận hàng',
    body: 'Chu trình trao đổi hàng hoá hoàn tất: tiền đã chuyển thành hàng hoá cụ thể (món ăn tại nhà). Toàn bộ giá trị hao phí của nhà hàng, đầu bếp, nền tảng và shipper giờ được "gói lại" trong một mức giá cuối cùng mà khách đã trả.',
    stats: [['Vai trò', 'Người thụ hưởng'], ['Kết quả', 'Trao đổi hoàn tất']]
  }
};

const timelineData = [
  { label: 'Sáng', fee: 15000, height: 30, text: 'Buổi sáng nhu cầu thấp, đủ shipper trực sẵn → phí giao hàng ở mức nền, gần với giá trị thật của một chuyến giao hàng ngắn.' },
  { label: 'Trưa', fee: 22000, height: 46, text: 'Giờ trưa là "giờ vàng" của giao đồ ăn — hàng loạt văn phòng cùng đặt cơm trong 30 phút, cầu tăng vọt trong khi shipper có hạn → giá cả bị kéo lên trên giá trị.' },
  { label: 'Mưa', fee: 32000, height: 68, text: 'Trời mưa làm giảm mạnh cung shipper (nhiều người không muốn chạy xe trong mưa) trong khi cầu lại tăng (không ai muốn ra ngoài) → mức tăng giá rõ rệt nhất.' },
  { label: 'Lễ', fee: 27000, height: 58, text: 'Ngày lễ, nhu cầu đặt món tăng cao đồng loạt trên cả nước, nhiều shipper cũng nghỉ lễ → mất cân đối cung cầu quy mô lớn.' },
  { label: 'Tối', fee: 19000, height: 38, text: 'Buổi tối nhu cầu giảm dần, cung và cầu trở lại trạng thái cân bằng hơn — giá cả tiến gần trở lại giá trị thực.' }
];

const cityData = {
  hanoi: {
    icon: MapPin, tag: 'Miền Bắc · Dữ liệu minh hoạ', title: 'Hà Nội',
    body: 'Thị trường giao đồ ăn sôi động với văn hoá ẩm thực đa dạng theo mùa.',
    stats: [['Món đặt nhiều nhất', 'Bún, phở, trà chanh'], ['Phí giao hàng TB', '18.000–25.000đ'], ['Nền tảng phổ biến', 'GrabFood'], ['Giờ cao điểm', '11h30–13h']]
  },
  danang: {
    icon: MapPin, tag: 'Miền Trung · Dữ liệu minh hoạ', title: 'Đà Nẵng',
    body: 'Thành phố du lịch với lượng đơn hàng dao động mạnh theo mùa du lịch.',
    stats: [['Món đặt nhiều nhất', 'Hải sản, mì Quảng'], ['Phí giao hàng TB', '15.000–22.000đ'], ['Nền tảng phổ biến', 'Grab, beFood'], ['Giờ cao điểm', '18h–20h']]
  },
  cantho: {
    icon: MapPin, tag: 'Miền Tây · Dữ liệu minh hoạ', title: 'Cần Thơ',
    body: 'Thị trường giao đồ ăn còn nhiều tiềm năng phát triển, khoảng cách giao hàng thường xa hơn.',
    stats: [['Món đặt nhiều nhất', 'Cơm tấm, hủ tiếu'], ['Phí giao hàng TB', '13.000–20.000đ'], ['Nền tảng phổ biến', 'GrabFood'], ['Giờ cao điểm', '11h–13h']]
  },
  hcmc: {
    icon: MapPin, tag: 'Miền Nam · Dữ liệu minh hoạ', title: 'TP. Hồ Chí Minh',
    body: 'Thị trường giao đồ ăn lớn nhất và cạnh tranh nhất cả nước, mật độ shipper cao nhất.',
    stats: [['Món đặt nhiều nhất', 'Trà sữa, cơm tấm'], ['Phí giao hàng TB', '16.000–28.000đ'], ['Nền tảng phổ biến', 'Grab, Shopee'], ['Giờ cao điểm', '11h30–13h, 18h–20h']]
  }
};

const flashCards = [
  { front: 'Giá trị là gì?', back: 'Lao động xã hội của người sản xuất kết tinh trong hàng hóa (công sức nấu ăn của quán + công sức chạy xe của shipper).' },
  { front: 'Hàng hoá là gì?', back: 'Một ly trà sữa hay một chuyến giao hàng đều là hàng hóa vì chúng có giá trị sử dụng (giải khát/vận chuyển) và giá trị trao đổi (bán được).' },
  { front: 'Lao động là gì?', back: 'Thời gian, kỹ năng và công sức của đầu bếp (lao động sống) và shipper (lao động vận chuyển) được cộng dồn vào giá trị cuối cùng.' },
  { front: 'Vì sao giá thay đổi?', back: 'Giá trị khá ổn định, nhưng Cung - Cầu lệch pha (mưa to, giờ vàng, ít shipper) kéo giá cả tạm thời tách rời khỏi trục giá trị.' }
];

const quiz = [
  {
    q: 'Theo Karl Marx, giá trị của một hàng hoá được quyết định bởi điều gì?',
    options: [
      'Số tiền mà người bán muốn thu về',
      'Lượng lao động xã hội cần thiết để tạo ra nó',
      'Mức độ khan hiếm trên thị trường',
      'Chi phí quảng cáo của thương hiệu'
    ],
    answer: 1,
    explain: 'Giá trị hàng hoá được quyết định bởi lượng lao động xã hội cần thiết (trung bình, trong điều kiện sản xuất bình thường) để tạo ra nó — không phải mong muốn chủ quan của người bán.'
  },
  {
    q: 'Vì sao phí giao hàng GrabFood thường tăng khi trời mưa?',
    options: [
      'Vì xăng xe tăng giá đột ngột',
      'Vì cung shipper giảm trong khi cầu đặt món tăng',
      'Vì nền tảng muốn thử nghiệm giá',
      'Vì món ăn trở nên ngon hơn khi trời mưa'
    ],
    answer: 1,
    explain: 'Trời mưa khiến ít shipper muốn chạy xe (cung giảm) trong khi nhiều người muốn ở nhà đặt món (cầu tăng) — sự mất cân đối này đẩy giá cả lên trên giá trị.'
  },
  {
    q: 'Giá cả và giá trị khác nhau như thế nào?',
    options: [
      'Chúng hoàn toàn giống nhau, không có gì khác biệt',
      'Giá cả là hình thức biểu hiện bằng tiền của giá trị, có thể dao động quanh giá trị',
      'Giá trị luôn cao hơn giá cả',
      'Giá cả chỉ tồn tại trong nền kinh tế số'
    ],
    answer: 1,
    explain: 'Giá trị tương đối ổn định (dựa trên lao động hao phí), còn giá cả là biểu hiện bằng tiền của giá trị và dao động lên xuống quanh giá trị do cung – cầu, cạnh tranh...'
  },
  {
    q: 'Trong chuỗi giao đồ ăn, ai là người trực tiếp bỏ ra "lao động sống" để tạo ra món ăn?',
    options: ['Nền tảng công nghệ', 'Đầu bếp / nhân viên pha chế', 'Nhà đầu tư của ứng dụng', 'Người viết đánh giá món ăn'],
    answer: 1,
    explain: 'Đầu bếp và nhân viên pha chế là người trực tiếp dùng kỹ năng, thời gian và công sức để tạo ra giá trị sử dụng của món ăn — đó là "lao động sống".'
  },
  {
    q: 'Phụ phí giờ cao điểm mà shipper nhận được phản ánh điều gì theo quy luật giá trị?',
    options: [
      'Một khoản tiền ngẫu nhiên không có cơ sở',
      'Giá trị lao động tăng thêm do rủi ro, công sức và thời gian tăng lên',
      'Sự trừng phạt đối với khách hàng đặt món giờ trưa',
      'Chi phí bảo trì xe của nền tảng'
    ],
    answer: 1,
    explain: 'Giờ cao điểm khiến công việc của shipper vất vả và rủi ro hơn (kẹt xe, tranh đơn, thời gian giao lâu hơn) — phụ phí là phần bù cho lượng lao động tăng thêm đó.'
  }
];

const questionExplanations = {
  a: {
    title: 'Cung – cầu lệch pha',
    body: 'Khi trời mưa, hàng ngàn người cùng lúc muốn đặt trà sữa, nhưng số lượng shipper sẵn sàng chạy trong mưa không tăng kịp. Theo quy luật giá trị, giá cả luôn dao động quanh giá trị thực do quan hệ cung – cầu. Cung giảm (ít shipper chịu chạy) trong khi cầu tăng vọt → giá cả bị đẩy lên cao hơn giá trị, dù ly trà sữa vẫn là chính ly trà sữa đó.'
  },
  b: {
    title: 'Hao phí lao động xã hội thay đổi',
    body: 'Nếu quán tăng giá nguyên liệu (trà, sữa, đường, ly nhựa), tức là lượng lao động xã hội cần thiết để tạo ra ly trà sữa đã tăng lên — nguyên liệu đắt hơn đồng nghĩa với nhiều "lao động kết tinh" hơn trong sản phẩm. Khi đó, chính giá trị của hàng hoá tăng, nên giá cả tăng theo là hợp lý theo đúng quy luật.'
  },
  c: {
    title: 'Giá trị lao động của shipper tăng',
    body: 'Giờ cao điểm khiến công việc của shipper vất vả hơn: kẹt xe, tranh đơn, rủi ro cao hơn. Phần phụ phí giờ cao điểm chính là phản ánh giá trị lao động tăng thêm mà shipper phải bỏ ra. Đây không phải "phí vô lý" mà là tiền công cho lao động phức tạp và rủi ro hơn.'
  },
  d: {
    title: 'Trợ giá của nền tảng biến mất',
    body: 'Giá trị thật của ly trà sữa (35–40 nghìn hao phí lao động) có thể không đổi, nhưng khi hết mã giảm giá, phần "trợ giá" mà nền tảng từng bù cho bạn không còn nữa. Bạn đang trả gần hơn với giá cả thị trường thật, thay vì mức giá đã được nền tảng "che" bớt bằng khuyến mãi.'
  }
};

function App() {
  const [active, setActive] = useState('intro');
  
  // Interactive Question State
  const [questionAnswer, setQuestionAnswer] = useState(null);

  // Builder States
  const [platform, setPlatform] = useState('grab');
  const [restaurant, setRestaurant] = useState('binhdan'); // 'binhdan' (35k) | 'tra-sua' (55k) | 'nhahang' (120k)
  const [distance, setDistance] = useState(3);
  const [weather, setWeather] = useState('sunny'); // 'sunny' | 'rain'
  const [rush, setRush] = useState('normal'); // 'normal' | 'rush'
  const [coupon, setCoupon] = useState('none'); // 'none' | 'ship' (15k) | 'percent' (20%)

  // Timeline & Simulator States
  const [timeline, setTimeline] = useState(2);
  const [market, setMarket] = useState({ rain: 6, demand: 7, popularity: 3, drivers: 4, distance: 5 });
  const [flipped, setFlipped] = useState([]);

  // Quiz States
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [answered, setAnswered] = useState(false);

  // Shared Modals State
  const [modal, setModal] = useState(null);
  const [showCert, setShowCert] = useState(false);

  // Dynamic Builder Calculation
  const receipt = useMemo(() => {
    const restaurantPrices = { binhdan: 35000, 'tra-sua': 55000, nhahang: 120000 };
    const platformFees = { grab: 8000, shopee: 6000, be: 7000 };
    
    const foodPrice = restaurantPrices[restaurant];
    const weatherMult = weather === 'rain' ? 1.4 : 1;
    const rushMult = rush === 'rush' ? 1.35 : 1;
    const serviceFee = platformFees[platform];
    
    const rawDelivery = 10000 + distance * 2500;
    const deliveryFee = Math.round(rawDelivery * weatherMult * rushMult);
    
    let discount = 0;
    if (coupon === 'ship') discount = Math.min(15000, deliveryFee);
    if (coupon === 'percent') discount = Math.round(foodPrice * 0.2);
    
    const total = Math.max(0, foodPrice + deliveryFee + serviceFee - discount);
    
    const notes = [];
    notes.push(`Món ăn có giá ${money(foodPrice)} — đây phản ánh hao phí lao động của nhà hàng: nguyên liệu, chế biến, mặt bằng.`);
    if (weather === 'rain') notes.push(`Trời mưa khiến ít shipper nhận đơn hơn trong khi nhiều người đặt hơn → phí giao hàng được đẩy lên (+40%).`);
    if (rush === 'rush') notes.push(`Giờ cao điểm làm tăng rủi ro và công sức của shipper → phụ phí giờ vàng (+35%).`);
    if (distance > 7) notes.push(`Khoảng cách ${distance}km khá xa — lao động vận chuyển (thời gian, xăng xe, hao mòn) nhiều hơn nên phí tăng theo từng km.`);
    if (discount > 0) notes.push(`Mã giảm giá không làm thay đổi giá trị món ăn, mà chỉ là phần nền tảng hoặc quán trợ giá cho bạn để giữ chân khách.`);
    
    return { foodPrice, deliveryFee, serviceFee, discount, total, notes };
  }, [restaurant, distance, weather, rush, platform, coupon]);

  // Simulator Calculator
  const marketPrice = useMemo(() => {
    const BASE_VALUE = 45000;
    const demandForce = market.rain * 1.5 + market.demand * 2 + market.popularity * 1.2 + market.distance * 0.8;
    const supplyForce = Math.max(1, market.drivers * 6);
    const ratio = demandForce / supplyForce;
    
    let price = BASE_VALUE * (0.7 + ratio * 0.6);
    return Math.round(Math.max(20000, Math.min(140000, price)));
  }, [market]);

  const go = (id) => setActive(id);
  const next = () => go(sections[(sections.findIndex((s) => s.id === active) + 1) % sections.length].id);

  function pickAnswer(i) {
    if (answered) return;
    setPicked(i);
    setAnswered(true);
    if (i === quiz[quizIndex].answer) setScore((s) => s + 1);
  }

  function nextQuiz() {
    if (quizIndex === quiz.length - 1) {
      setQuizIndex(quiz.length);
    } else {
      setQuizIndex((i) => i + 1);
      setPicked(null);
      setAnswered(false);
    }
  }

  function restartQuiz() {
    setQuizIndex(0);
    setScore(0);
    setPicked(null);
    setAnswered(false);
  }

  return (
    <main className="app">
      <aside className="rail" aria-label="Điều hướng">
        {sections.map(({ id, label, icon: Icon }) => (
          <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)} title={label} aria-label={label}>
            <Icon size={20} />
          </button>
        ))}
      </aside>

      {/* MODAL SYSTEM */}
      {modal && (
        <div className="modal-root open">
          <div className="modal-backdrop" onClick={() => setModal(null)}></div>
          <div className="modal-card">
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            <div className="modal-content">
              <div className="modal-head">
                <div className="modal-icon-badge">
                  {React.createElement(modal.icon, { size: 30, className: "modal-icon-svg" })}
                </div>
                <span className="modal-tag">{modal.tag}</span>
                <h3>{modal.title}</h3>
              </div>
              <div className="modal-body">
                <p>{modal.body}</p>
                {modal.stats && modal.stats.length > 0 && (
                  <div className="modal-stats">
                    {modal.stats.map(([label, val]) => (
                      <div className="modal-stat" key={label}>
                        <span className="stat-label">{label}</span>
                        <span className="stat-value">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE MODAL */}
      {showCert && (
        <div className="modal-root open">
          <div className="modal-backdrop" onClick={() => setShowCert(false)}></div>
          <div className="modal-card">
            <button className="modal-close" onClick={() => setShowCert(false)}>✕</button>
            <div className="modal-content text-center" style={{ padding: '32px', textAlign: 'center' }}>
              <span className="cert-emoji" style={{ fontSize: '56px', display: 'block', marginBottom: '12px' }}>🎓</span>
              <h3 className="cert-title" style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>Chứng nhận hoàn thành</h3>
              <div className="cert-sub" style={{ color: 'var(--blue)', fontWeight: '700', marginBottom: '20px' }}>"Bạn đã hiểu Quy luật Giá trị của Marx!"</div>
              <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--ink-soft)' }}>
                Điểm số của bạn: <strong>{score}/{quiz.length}</strong>
              </p>
              <p style={{ fontSize: '14.5px', lineHeight: '1.65', color: 'var(--muted)', marginTop: '12px' }}>
                Chúc mừng bạn đã hoàn thành hành trình khám phá cách Quy luật giá trị của Karl Marx vẫn đang âm thầm vận hành trong từng đơn hàng GrabFood, ShopeeFood và beFood mỗi ngày.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: HERO */}
      <section className={`screen ${active === 'intro' ? 'show' : ''}`}>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Một hành trình khám phá · Kinh tế Chính trị</p>
            <h1>Vì sao ly trà sữa<br/><span style={{ color: 'var(--red)' }}>hôm nay đắt hơn</span><br/>hôm qua?</h1>
            <p>
              Mỗi đơn GrabFood, ShopeeFood hay beFood bạn đặt đều đang vận hành theo một quy luật kinh tế 
              đã được Karl Marx mô tả từ hơn 150 năm trước: <strong>Quy luật giá trị</strong>.
            </p>
            <button className="primary" onClick={() => go('question')}>Bắt đầu khám phá <ArrowRight size={18} /></button>
          </div>
          <div className="phone-visual" aria-label="Mô phỏng đơn giao đồ ăn">
            <div className="phone-top"></div>
            <div className="delivery-map">
              <span className="pin restaurant"></span>
              <span className="pin customer"></span>
              <span className="route"></span>
              <Bike className="bike" size={34} />
            </div>
            <div className="order-card">
              <b>Trà sữa trân châu</b>
              <span>Phí giao hàng biến động liên tục</span>
              <strong>{money(72000)}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE QUESTION */}
      <section className={`screen center ${active === 'question' ? 'show' : ''}`}>
        <p className="eyebrow">Tình huống thật</p>
        <h2 style={{ maxWidth: '860px', margin: '0 auto 24px' }}>
          "Tại sao cùng một ly trà sữa, hôm qua bạn chỉ trả <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>55.000đ</span>, nhưng hôm nay lại là 82.000đ?"
        </h2>
        
        <div className="answer-grid">
          <button className={`info-card ${questionAnswer === 'a' ? 'active' : ''}`} onClick={() => setQuestionAnswer('a')}>
            <span style={{ fontSize: '26px' }}>🌧️</span>
            <span>Trời mưa, ai cũng đặt trà sữa</span>
          </button>
          <button className={`info-card ${questionAnswer === 'b' ? 'active' : ''}`} onClick={() => setQuestionAnswer('b')}>
            <span style={{ fontSize: '26px' }}>🧋</span>
            <span>Quán tăng giá nguyên liệu pha chế</span>
          </button>
          <button className={`info-card ${questionAnswer === 'c' ? 'active' : ''}`} onClick={() => setQuestionAnswer('c')}>
            <span style={{ fontSize: '26px' }}>⏰</span>
            <span>Ứng dụng tính phí giờ cao điểm</span>
          </button>
          <button className={`info-card ${questionAnswer === 'd' ? 'active' : ''}`} onClick={() => setQuestionAnswer('d')}>
            <span style={{ fontSize: '26px' }}>🎟️</span>
            <span>Mã giảm giá đã hết hạn sử dụng</span>
          </button>
        </div>

        {questionAnswer ? (
          <div className="theory-block" style={{ borderLeftColor: 'var(--red)', animation: 'show 0.3s ease both' }}>
            <div className="theory-quote">
              <strong style={{ color: 'var(--red)' }}>{questionExplanations[questionAnswer].title}</strong>
            </div>
            <div className="theory-explain">
              <p>{questionExplanations[questionAnswer].body}</p>
              <p style={{ fontStyle: 'italic', fontSize: '13px', marginTop: '12px' }}>
                Trong thực tế, giá 82.000đ hôm nay thường là kết quả của cả bốn yếu tố trên cộng lại — đó chính là cách quy luật giá trị vận hành sống động trong đời thường.
              </p>
            </div>
          </div>
        ) : (
          <p className="note">Bấm vào một giả thuyết phía trên để giải thích dưới góc nhìn của Quy luật giá trị.</p>
        )}

        <button className="secondary" onClick={next}>Tiếp tục <ArrowRight size={17} /></button>
      </section>

      {/* SECTION 3: UPGRADED BUILDER */}
      <section className={`screen ${active === 'builder' ? 'show' : ''}`}>
        <div className="builder" style={{ '--accent': platformData[platform].color }}>
          <div>
            <p className="eyebrow">Phòng thí nghiệm giá</p>
            <h2>Tự tay đặt một đơn hàng</h2>
            <div className="panel">
              <label>Nền tảng đặt món</label>
              <div className="chips">
                {Object.entries(platformData).map(([key, p]) => (
                  <button key={key} className={platform === key ? `chip active ${p.className}` : 'chip'} onClick={() => setPlatform(key)}>{p.name}</button>
                ))}
              </div>

              <label>Chọn món ăn / Nhà hàng</label>
              <div className="chips">
                <button className={restaurant === 'binhdan' ? 'chip active' : 'chip'} onClick={() => setRestaurant('binhdan')}>Cơm bình dân (35K)</button>
                <button className={restaurant === 'tra-sua' ? 'chip active' : 'chip'} onClick={() => setRestaurant('tra-sua')}>Trà sữa (55K)</button>
                <button className={restaurant === 'nhahang' ? 'chip active' : 'chip'} onClick={() => setRestaurant('nhahang')}>Nhà hàng cao cấp (120K)</button>
              </div>

              <label>Thời tiết</label>
              <div className="chips">
                <button className={weather === 'sunny' ? 'chip active' : 'chip'} onClick={() => setWeather('sunny')}>☀️ Nắng đẹp</button>
                <button className={weather === 'rain' ? 'chip active' : 'chip'} onClick={() => setWeather('rain')}>🌧️ Mưa lớn (+40%)</button>
              </div>

              <label>Thời điểm đặt</label>
              <div className="chips">
                <button className={rush === 'normal' ? 'chip active' : 'chip'} onClick={() => setRush('normal')}>🕐 Giờ thường</button>
                <button className={rush === 'rush' ? 'chip active' : 'chip'} onClick={() => setRush('rush')}>🔥 Giờ vàng (+35%)</button>
              </div>

              <label>Khoảng cách: <b>{distance} km</b></label>
              <input type="range" min="1" max="15" value={distance} onChange={(e) => setDistance(Number(e.target.value))} style={{ background: `linear-gradient(to right, var(--accent, var(--blue)) ${((distance - 1) / 14) * 100}%, var(--paper) ${((distance - 1) / 14) * 100}%)` }} />

              <label>Mã giảm giá</label>
              <div className="chips">
                <button className={coupon === 'none' ? 'chip active' : 'chip'} onClick={() => setCoupon('none')}>Không dùng</button>
                <button className={coupon === 'ship' ? 'chip active' : 'chip'} onClick={() => setCoupon('ship')}>Freeship 15K</button>
                <button className={coupon === 'percent' ? 'chip active' : 'chip'} onClick={() => setCoupon('percent')}>Giảm 20% món</button>
              </div>
            </div>
          </div>
          
          <div className="receipt">
            <h3>Hóa đơn {platformData[platform].name}</h3>
            <Row label="Giá món ăn" value={money(receipt.foodPrice)} />
            <Row label="Phí giao hàng" value={money(receipt.deliveryFee)} />
            <Row label="Phí dịch vụ" value={money(receipt.serviceFee)} />
            {receipt.discount > 0 && <Row label="Giảm giá" value={`-${money(receipt.discount)}`} style={{ color: 'var(--red)' }} />}
            <div className="divider"></div>
            <Row label="Tổng thanh toán" value={money(receipt.total)} strong />
            
            <div className="receipt-explain-list" style={{ marginTop: '16px', fontSize: '13px', lineHeight: '1.5', color: 'var(--muted)', textAlign: 'left' }}>
              {receipt.notes.map((n, idx) => (
                <p key={idx} style={{ marginBottom: '8px' }}>• <span dangerouslySetInnerHTML={{ __html: n }} /></p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE JOURNEY */}
      <section className={`screen center ${active === 'journey' ? 'show' : ''}`}>
        <p className="eyebrow">Sơ đồ tương tác</p>
        <h2>Giá trị đi qua những ai?</h2>
        <p className="note" style={{ marginBottom: '32px' }}>Nhấn vào từng nút trong chuỗi để xem lao động nào đã được bỏ ra và giá trị kết tinh ở đâu.</p>
        
        <div className="journey-interactive-flow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '14px', maxWidth: '1050px', margin: '0 auto 36px' }}>
          <button className="info-card" onClick={() => setModal(journeyData.customer1)} style={{ cursor: 'pointer', textAlign: 'center', flexDirection: 'column', minWidth: '120px' }}>
            <span style={{ fontSize: '32px' }}>🙋</span>
            <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '6px' }}>Khách hàng</span>
          </button>
          <span style={{ color: 'var(--line)', fontSize: '20px', fontWeight: 'bold' }}>→</span>

          <button className="info-card" onClick={() => setModal(journeyData.restaurant)} style={{ cursor: 'pointer', textAlign: 'center', flexDirection: 'column', minWidth: '120px' }}>
            <span style={{ fontSize: '32px' }}>🏪</span>
            <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '6px' }}>Nhà hàng</span>
          </button>
          <span style={{ color: 'var(--line)', fontSize: '20px', fontWeight: 'bold' }}>→</span>

          <button className="info-card" onClick={() => setModal(journeyData.kitchen)} style={{ cursor: 'pointer', textAlign: 'center', flexDirection: 'column', minWidth: '120px' }}>
            <span style={{ fontSize: '32px' }}>👨‍🍳</span>
            <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '6px' }}>Đầu bếp</span>
          </button>
          <span style={{ color: 'var(--line)', fontSize: '20px', fontWeight: 'bold' }}>→</span>

          <button className="info-card" onClick={() => setModal(journeyData.platform)} style={{ cursor: 'pointer', textAlign: 'center', flexDirection: 'column', minWidth: '120px' }}>
            <span style={{ fontSize: '32px' }}>📲</span>
            <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '6px' }}>Nền tảng</span>
          </button>
          <span style={{ color: 'var(--line)', fontSize: '20px', fontWeight: 'bold' }}>→</span>

          <button className="info-card" onClick={() => setModal(journeyData.shipper)} style={{ cursor: 'pointer', textAlign: 'center', flexDirection: 'column', minWidth: '120px' }}>
            <span style={{ fontSize: '32px' }}>🛵</span>
            <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '6px' }}>Shipper</span>
          </button>
          <span style={{ color: 'var(--line)', fontSize: '20px', fontWeight: 'bold' }}>→</span>

          <button className="info-card" onClick={() => setModal(journeyData.customer2)} style={{ cursor: 'pointer', textAlign: 'center', flexDirection: 'column', minWidth: '120px' }}>
            <span style={{ fontSize: '32px' }}>📦</span>
            <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '6px' }}>Khách nhận</span>
          </button>
        </div>

        <button className="secondary" onClick={next}>Xem giá dao động <ArrowRight size={17} /></button>
      </section>

      {/* SECTION 5: TIMELINE */}
      <section className={`screen center ${active === 'timeline' ? 'show' : ''}`}>
        <p className="eyebrow">Kéo để khám phá</p>
        <h2>Một ngày, năm mức giá</h2>
        <div className="timeline">
          <div className="bar" style={{ height: `${timelineData[timeline].height}%` }}></div>
          <strong>{money(timelineData[timeline].fee)}</strong>
        </div>
        <div className="timeline-controls">
          <input type="range" min="0" max="4" value={timeline} onChange={(e) => setTimeline(Number(e.target.value))} style={{ background: `linear-gradient(to right, var(--blue) ${(timeline / 4) * 100}%, var(--paper) ${(timeline / 4) * 100}%)` }} />
          <div className="marks">{timelineData.map((t, i) => <span className={i === timeline ? 'active' : ''} key={t.label}>{t.label}</span>)}</div>
        </div>
        <p className="note" style={{ maxWidth: '640px', margin: '0 auto' }}>{timelineData[timeline].text}</p>
      </section>

      {/* SECTION 6: MAP */}
      <section className={`screen center ${active === 'map' ? 'show' : ''}`}>
        <p className="eyebrow">Khắp Việt Nam</p>
        <h2>Quy luật ở mỗi vùng đất</h2>
        <p className="note" style={{ marginBottom: '32px' }}>Bấm vào từng thành phố để xem dữ liệu đặt đơn đặc trưng của khu vực.</p>
        
        <div className="city-grid">
          {Object.entries(cityData).map(([key, data]) => (
            <button key={key} className="info-card" onClick={() => setModal(data)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '28px' }}>📍</span>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800' }}>{data.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>{data.tag.split(' · ')[0]}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 7: PLAYGROUND */}
      <section className={`screen ${active === 'playground' ? 'show' : ''}`}>
        <div className="simulator">
          <div>
            <p className="eyebrow">Sân chơi Quy luật</p>
            <h2>Bạn điều khiển thị trường</h2>
            
            <label className="sim-control">🌧️ Thời tiết xấu: <b>{market.rain}</b>
              <input type="range" min="0" max="10" value={market.rain} onChange={(e) => setMarket({ ...market, rain: Number(e.target.value) })} style={{ background: `linear-gradient(to right, var(--blue) ${(market.rain / 10) * 100}%, var(--paper) ${(market.rain / 10) * 100}%)` }} />
            </label>

            <label className="sim-control">📍 Khoảng cách (km): <b>{market.distance}</b>
              <input type="range" min="1" max="15" value={market.distance} onChange={(e) => setMarket({ ...market, distance: Number(e.target.value) })} style={{ background: `linear-gradient(to right, var(--blue) ${((market.distance - 1) / 14) * 100}%, var(--paper) ${((market.distance - 1) / 14) * 100}%)` }} />
            </label>

            <label className="sim-control">🔥 Nhu cầu thị trường: <b>{market.demand}</b>
              <input type="range" min="0" max="10" value={market.demand} onChange={(e) => setMarket({ ...market, demand: Number(e.target.value) })} style={{ background: `linear-gradient(to right, var(--blue) ${(market.demand / 10) * 100}%, var(--paper) ${(market.demand / 10) * 100}%)` }} />
            </label>

            <label className="sim-control">⭐ Độ nổi tiếng quán: <b>{market.popularity}</b>
              <input type="range" min="0" max="10" value={market.popularity} onChange={(e) => setMarket({ ...market, popularity: Number(e.target.value) })} style={{ background: `linear-gradient(to right, var(--blue) ${(market.popularity / 10) * 100}%, var(--paper) ${(market.popularity / 10) * 100}%)` }} />
            </label>

            <label className="sim-control">🛵 Số lượng shipper: <b>{market.drivers}</b>
              <input type="range" min="1" max="10" value={market.drivers} onChange={(e) => setMarket({ ...market, drivers: Number(e.target.value) })} style={{ background: `linear-gradient(to right, var(--blue) ${((market.drivers - 1) / 9) * 100}%, var(--paper) ${((market.drivers - 1) / 9) * 100}%)` }} />
            </label>
          </div>
          
          <div className="gauge">
            <span>Giá trị thực tế (Cố định): {money(45000)}</span>
            <strong className={marketPrice > 49500 ? 'hot' : marketPrice < 40500 ? 'ok' : ''} style={{ color: marketPrice > 49500 ? 'var(--red)' : marketPrice < 40500 ? '#4fd1a5' : '#ffc94a' }}>
              {money(marketPrice)}
            </strong>
            <div className="gauge-track">
              <i style={{ width: `${Math.min(100, (marketPrice / 100000) * 100)}%` }}></i>
            </div>
            <p className="sim-desc-text" dangerouslySetInnerHTML={{
              __html: marketPrice > 49500 
                ? 'Giá cả đang <b>cao hơn giá trị thực</b> khá nhiều. Cầu (mưa, nhu cầu, độ nổi tiếng) đang vượt xa cung (số shipper) — đúng như quy luật giá trị dự đoán: khi cầu &gt; cung, giá cả bị đẩy lên trên giá trị.'
                : marketPrice < 40500 
                ? 'Giá cả đang <b>thấp hơn giá trị thực</b>. Cung (nhiều shipper) đang vượt cầu — thị trường dư nguồn lực nên giá cả tạm thời rẻ hơn giá trị.'
                : 'Giá cả đang <b>dao động rất gần giá trị thực</b> — đây là trạng thái cân bằng cung cầu tương đối, đúng như bản chất "trung tâm hấp dẫn" mà giá trị đóng vai trò trong quy luật giá trị của Marx.'
            }} />
          </div>
        </div>
      </section>

      {/* SECTION 8: FLIP CARDS */}
      <section className={`screen center ${active === 'cards' ? 'show' : ''}`}>
        <p className="eyebrow">Nền tảng lý thuyết</p>
        <h2>Bốn khái niệm cốt lõi</h2>
        <div className="flash-grid">
          {flashCards.map(({ front, back }, i) => (
            <div className={flipped.includes(i) ? 'flash flipped' : 'flash'} key={front} onClick={() => setFlipped((old) => old.includes(i) ? old.filter((x) => x !== i) : [...old, i])}>
              <div className="flash-inner">
                <div className="flash-front">
                  <span style={{ fontSize: '32px', marginBottom: '8px' }}>
                    {i === 0 ? '💎' : i === 1 ? '🥡' : i === 2 ? '💪' : '📈'}
                  </span>
                  <span>{front}</span>
                  <small style={{ marginTop: '14px', color: 'var(--muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bấm để lật</small>
                </div>
                <div className="flash-back">
                  <p dangerouslySetInnerHTML={{ __html: back }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: QUIZ (5 questions + cert popup) */}
      <section className={`screen center ${active === 'quiz' ? 'show' : ''}`}>
        <p className="eyebrow">Kiểm tra cuối</p>
        {quizIndex >= quiz.length ? (
          <div className="quiz-done">
            <Trophy size={54} style={{ color: 'var(--sun)' }} />
            <h2>Bạn đạt {score}/{quiz.length} câu đúng!</h2>
            <p>Hành trình tìm hiểu quy luật giá trị đã hoàn tất.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '24px' }}>
              <button className="primary" onClick={() => setShowCert(true)}>Nhận chứng nhận 🎓</button>
              <button className="secondary" style={{ marginTop: 0 }} onClick={restartQuiz}>Làm lại <RefreshCw size={16} /></button>
            </div>
          </div>
        ) : (
          <div className="quiz-box" style={{ maxWidth: '640px', width: '100%' }}>
            {/* PROGRESS BAR */}
            <div className="quiz-progress" style={{ height: '6px', background: 'var(--paper)', borderRadius: '999px', overflow: 'hidden', marginBottom: '24px' }}>
              <div style={{ height: '100%', background: 'var(--red)', width: `${(quizIndex / quiz.length) * 100}%`, transition: 'width 0.3s ease' }}></div>
            </div>
            
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Câu {quizIndex + 1}/{quiz.length}: {quiz[quizIndex].q}</h2>
            
            <div className="quiz-options" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quiz[quizIndex].options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => pickAnswer(i)}
                  className={picked === null ? '' : i === quiz[quizIndex].answer ? 'right' : picked === i ? 'wrong' : ''}
                  disabled={answered}
                >
                  {opt}
                </button>
              ))}
            </div>

            {answered && (
              <div className="theory-block" style={{ borderLeftColor: 'var(--sun)', marginTop: '24px', animation: 'show 0.3s ease both' }}>
                <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: '1.6' }}>{quiz[quizIndex].explain}</p>
                <button className="primary" style={{ marginTop: '16px' }} onClick={nextQuiz}>
                  {quizIndex === quiz.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'} <ArrowRight size={17} />
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* SECTION 10: FINAL SUMMARY */}
      <section className={`screen center ${active === 'final' ? 'show' : ''}`}>
        <p className="eyebrow">Khép lại hành trình</p>
        <h2>Tất cả đã kết nối với nhau</h2>
        
        <div className="final-map-container" style={{ margin: '32px auto', position: 'relative', height: '340px', maxWidth: '640px', width: '100%', background: 'white', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>
          {/* Node 1: Customer */}
          <div className="info-card animate-float" style={{ position: 'absolute', left: '15%', top: '20%', transform: 'translate(-50%, -50%)', padding: '12px', minHeight: 'auto', width: '120px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '24px' }}>🙋</span>
            <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', fontWeight: '700' }}>Khách hàng trả tiền</span>
          </div>

          {/* Node 2: Restaurant */}
          <div className="info-card animate-float" style={{ position: 'absolute', right: '15%', top: '15%', transform: 'translate(50%, -50%)', padding: '12px', minHeight: 'auto', width: '120px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '24px' }}>🏪</span>
            <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', fontWeight: '700' }}>Nhà hàng bỏ vốn</span>
          </div>

          {/* Node 3: Shipper */}
          <div className="info-card animate-float" style={{ position: 'absolute', right: '15%', bottom: '20%', transform: 'translate(50%, 50%)', padding: '12px', minHeight: 'auto', width: '120px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '24px' }}>🛵</span>
            <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', fontWeight: '700' }}>Shipper bỏ công</span>
          </div>

          {/* Node 4: Platform */}
          <div className="info-card animate-float" style={{ position: 'absolute', left: '20%', bottom: '25%', transform: 'translate(-50%, 50%)', padding: '12px', minHeight: 'auto', width: '120px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '24px' }}>📲</span>
            <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', fontWeight: '700' }}>App thu phí dịch vụ</span>
          </div>

          {/* Center: Value */}
          <div className="info-card" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', background: 'var(--blue)', color: 'white', padding: '16px', minHeight: 'auto', width: '120px', textAlign: 'center', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(37,99,235,0.3)' }}>
            <span style={{ fontSize: '32px' }}>💎</span>
            <span style={{ fontSize: '14px', fontWeight: '800', marginTop: '6px' }}>Giá trị</span>
          </div>
        </div>

        <p className="final-quote" style={{ fontFamily: 'Sora, Inter, sans-serif', fontSize: '18px', fontWeight: '600', color: 'var(--blue)', maxWidth: '600px', margin: '0 auto 32px', lineHeight: '1.6' }}>
          "Giá cả chỉ là hình thức biểu hiện bằng tiền của giá trị — và trong mỗi đơn hàng bạn đặt, quy luật ấy vẫn đang âm thầm vận hành."
        </p>

        <button className="primary" onClick={() => go('intro')}>Khám phá lại từ đầu</button>
      </section>
    </main>
  );
}

function Row({ label, value, strong, style }) {
  return <div className={strong ? 'row total' : 'row'} style={style}><span>{label}</span><b>{value}</b></div>;
}

createRoot(document.getElementById('root')).render(<App />);
