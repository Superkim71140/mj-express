export interface NavItem {
  label: string;
  path: string;
  isExternal?: boolean;
}

export interface DropdownItem {
  label: string;
  path: string;
  iconClass?: string;
}

export const headerNavLinks: NavItem[] = [
  { label: "หน้าแรก", path: "/" },
  { label: "ส่งมอเตอร์ไซค์", path: "/motorcycle-transport" },
  { label: "ราคา", path: "/#price" },
  { label: "ผลงานย้ายจริง", path: "/case-studies" },
  { label: "รีวิวลูกค้า", path: "/reviews" },
];

export const areaDropdownLinks: DropdownItem[] = [
  {
    label: "บางแค / เพชรเกษม",
    path: "/areas/bang-khae",
    iconClass: "bi bi-geo-alt-fill text-warning me-2",
  },
  {
    label: "หนองแขม / พุทธมณฑล",
    path: "/areas/nong-khaem",
    iconClass: "bi bi-geo-alt-fill text-warning me-2",
  },
  {
    label: "พระราม 2 / บางบอน",
    path: "/areas/rama-2",
    iconClass: "bi bi-geo-alt-fill text-warning me-2",
  },
  {
    label: "ฝั่งพระนคร",
    path: "/areas/phra-nakhon",
    iconClass: "bi bi-geo-alt-fill text-warning me-2",
  },
  {
    label: "สมุทรสาคร",
    path: "/areas/samut-sakhon",
    iconClass: "bi bi-geo-alt-fill text-warning me-2",
  },
];
