// Programmatic SEO Expansion Blueprints

export interface SEOExpandedPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  keywords: string[];
  canonical: string;
}

// 1. Districts SEO Schema
export interface DistrictSEO extends SEOExpandedPage {
  districtName: string;
  provinceName: string;
  postalCode: string;
  nearbyTransit: string[];
}

// 2. Transport Routes SEO Schema (Origin to Destination)
export interface RouteSEO extends SEOExpandedPage {
  origin: string;
  destination: string;
  distanceKm: number;
  startingPrice: number;
  durationHours: number;
}

// 3. Specialized Services SEO Schema
export interface ServiceSEO extends SEOExpandedPage {
  serviceName: string;
  vehicleTypes: string[];
  suitableFor: string[];
  priceRateNotes: string;
}

// 4. Motorcycle Transport Destinations SEO Schema
export interface MotorcycleDestinationSEO extends SEOExpandedPage {
  destinationProvince: string;
  region: string;
  standardPrice: number;
  vipPrice: number;
  deliveryTimeDays: number;
}

// 5. Moving Use Cases SEO Schema (e.g. condo, house, heavy safe)
export interface MovingUseCaseSEO extends SEOExpandedPage {
  useCaseName: string;
  recommendations: string[];
  requiredHelpers: number;
}

// Priority Datasets for future local page pre-rendering

export const futureDistricts: DistrictSEO[] = [
  {
    slug: "bangkae-transport",
    districtName: "บางแค",
    provinceName: "กรุงเทพมหานคร",
    postalCode: "10160",
    nearbyTransit: ["MRT หลักสอง", "MRT บางแค", "ถนนกาญจนาภิเษก"],
    title: "รถรับจ้างบางแค ขนของย้ายบ้าน ย้ายคอนโด (ด่วน 24 ชม.) - MJ-TH Express",
    description: "บริการรถรับจ้างขนของย่านบางแค เพชรเกษม กาญจนาภิเษก ขนย้ายบ้าน หอพัก สำนักงาน ส่งมอเตอร์ไซค์ พร้อมทีมงานยกของมืออาชีพ ราคาเริ่มต้นเป็นมิตร โทร 095-583-0371",
    h1: "รถรับจ้างบางแค ขนของด่วน 24 ชม.",
    intro: "ยินดีต้อนรับสู่บริการรถรับจ้างย่านบางแค ทางเราสแตนบายรถกระบะตู้ทึบ 4 ล้อ พร้อมอุปกรณ์ยกย้ายรวดเร็วทันใจในเขตบางแค ท่าพระ บางหว้า และกาญจนาภิเษก",
    keywords: ["รถรับจ้างบางแค", "รถกระบะรับจ้างบางแค", "ย้ายบ้านบางแค", "ขนของบางแค"],
    canonical: "https://mj-th-express.com/areas/bangkae-transport"
  },
  {
    slug: "salaya-transport",
    districtName: "ศาลายา",
    provinceName: "นครปฐม",
    postalCode: "73170",
    nearbyTransit: ["สถานีรถไฟศาลายา", "ถนนบรมราชชนนี", "ม.มหิดล"],
    title: "รถรับจ้างศาลายา ย้ายหอพักนักศึกษา ม.มหิดล (เริ่มต้นหลักร้อย) - MJ-TH Express",
    description: "บริการรถกระบะตู้ทึบรับจ้าง ย้ายหอพักคอนโดรอบ ม.มหิดล ศาลายา ขนส่งมอไซค์ไปต่างจังหวัด ราคาประหยัดสำหรับนักศึกษา โทรปรึกษาฟรี 24 ชม. โทร 095-583-0371",
    h1: "รถรับจ้างศาลายา ย้ายหอมหิดล",
    intro: "บริการรถรับจ้างขนของย้ายหอพักคอนโดรอบมหาวิทยาลัยมหิดล ศาลายา เอาใจนักศึกษาด้วยราคากันเอง พร้อมคนช่วยยกของพนักงานขับรถสุภาพ",
    keywords: ["รถรับจ้างศาลายา", "ย้ายหอมหิดล", "ย้ายหอศาลายา", "รถกระบะรับจ้างศาลายา"],
    canonical: "https://mj-th-express.com/areas/salaya-transport"
  }
];

export const futureRoutes: RouteSEO[] = [
  {
    slug: "bangkok-to-chiangmai-transport",
    origin: "กรุงเทพมหานคร",
    destination: "เชียงใหม่",
    distanceKm: 700,
    startingPrice: 12000,
    durationHours: 9,
    title: "รถรับจ้างกรุงเทพ - เชียงใหม่ บริการย้ายบ้าน ขนส่งบิ๊กไบค์ - MJ-TH Express",
    description: "บริการรถรับจ้างขนของ ขนส่งมอเตอร์ไซค์ ขนย้ายบ้าน ข้ามจังหวัด กรุงเทพฯ ไปเชียงใหม่ และภาคเหนือ วิ่งตรงด่วน ปลอดภัย มีประกันภัย โทร 095-583-0371",
    h1: "รถรับจ้างกรุงเทพ ⇄ เชียงใหม่",
    intro: "บริการขนของข้ามจังหวัดด้วยรถกระบะ 4 ล้อตู้ทึบ วิ่งตรงส่งด่วนจากกรุงเทพฯ ไปยังเชียงใหม่ ลำพูน ลำปาง และภาคเหนือ ของถึงไวในวันเดียว",
    keywords: ["รถรับจ้างกรุงเทพเชียงใหม่", "ขนส่งมอเตอร์ไซค์ไปเชียงใหม่", "ย้ายบ้านข้ามจังหวัด"],
    canonical: "https://mj-th-express.com/routes/bangkok-to-chiangmai-transport"
  }
];

export const futureServices: ServiceSEO[] = [
  {
    slug: "motorcycle-shipping-upcountry",
    serviceName: "ส่งมอเตอร์ไซค์ไปต่างจังหวัด",
    vehicleTypes: ["รถกระบะตู้ทึบหลังคาสูง", "รถกระบะคอกพร้อมลิฟต์ท้าย"],
    suitableFor: ["รถมอเตอร์ไซค์ทั่วไป", "รถบิ๊กไบค์ BigBike", "Vespa / รถคลาสสิค"],
    priceRateNotes: "เริ่มต้น 1,500 บาท สำหรับรถเล็ก และ 2,500 บาท สำหรับ BigBike ทั่วไทย",
    title: "บริการส่งมอเตอร์ไซค์ไปต่างจังหวัด ห่อหุ้มกันรอยฟรี มีประกันภัย - MJ-TH Express",
    description: "รับส่งรถจักรยานยนต์ บิ๊กไบค์ รถโบราณ ข้ามจังหวัดทั่วประเทศไทย รับและส่งถึงหน้าบ้านแบบ Door-to-Door ปลอดภัยด้วยตู้ทึบกันฝน โทร 095-583-0371",
    h1: "ส่งมอเตอร์ไซค์ไปต่างจังหวัด ทั่วไทย",
    intro: "หมดห่วงเรื่องมอเตอร์ไซค์เป็นรอยระหว่างขนส่ง ด้วยบริการแพ็คห่อหุ้มหนาพิเศษ 3 ชั้นและแท่นยึดล้อหน้าล้อหลังกันล้ม ขนส่งปลอดภัยด้วยตู้ทึบ 100%",
    keywords: ["ส่งมอเตอร์ไซค์ไปต่างจังหวัด", "ส่งบิ๊กไบค์ข้ามจังหวัด", "ขนส่งมอเตอร์ไซค์ราคาถูก"],
    canonical: "https://mj-th-express.com/services/motorcycle-shipping-upcountry"
  }
];
