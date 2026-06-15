"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { LocalArea } from "@/data/areas";
import styles from "./AreaSearchFilter.module.css";

// Group mappings
const thonburiSlugs = [
  "bang-khae",
  "nong-khaem",
  "phetkasem",
  "phutthamonthon",
  "salaya",
  "rama-2",
  "bang-bon",
  "taling-chan",
  "thawi-watthana",
  "borommaratchachonnani",
];

const suburbsSlugs = [
  "samut-sakhon",
  "maha-chai",
  "krathum-baen",
  "sam-phran",
  "nakhon-pathom",
];

// Virtual areas in Inner BKK that map to /areas/phra-nakhon
const innerBkkAreas = [
  { name: "พระนคร / เขตกรุงเทพฯ ชั้นใน", slug: "phra-nakhon", subAreas: ["เยาวราช", "สาทร", "สีลม", "สุขุมวิท", "อโศก", "ห้วยขวาง", "ดินแดง", "จตุจักร", "ลาดพร้าว"] },
];

// Upcountry long haul routes
const upcountryRoutes = [
  { name: "ภาคเหนือ (เชียงใหม่, พิษณุโลก, เชียงราย)", path: "/routes/bangkok-to-chiang-mai", info: "ขนส่งทางไกลด่วน บริการรถกระบะเหมาคันตู้ทึบขึ้นเหนือ" },
  { name: "ภาคอีสาน (นครราชสีมา, ขอนแก่น, อุดรธานี, อุบลราชธานี)", path: "/routes/bangkok-to-khon-kaen", info: "ขนย้ายกลับบ้าน ย้ายหอพักข้ามภาคด่วน ตลอด 24 ชม." },
  { name: "ภาคตะวันออก (ชลบุรี, ระยอง, พัทยา)", path: "/routes/bangkok-to-chonburi", info: "ขนของนิคมอุตสาหกรรม บรรทุกสินค้า ย้ายบ้านพักตากอากาศ" },
  { name: "ภาคใต้ (ภูเก็ต, สุราษฎร์ธานี, หาดใหญ่)", path: "/routes/bangkok-to-phuket", info: "ส่งมอเตอร์ไซค์บิ๊กไบค์ ขนของย้ายบ้านลงใต้ ล็อค VIP แน่นหนา" },
];

interface AreaSearchFilterProps {
  localAreas: LocalArea[];
}

export default function AreaSearchFilter({ localAreas }: AreaSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "thonburi" | "inner" | "suburbs" | "longhaul">("all");

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Process search and filtering
  const filteredData = useMemo(() => {
    const result = {
      realAreas: [] as LocalArea[],
      virtualAreas: [] as typeof innerBkkAreas,
      routes: [] as typeof upcountryRoutes,
    };

    const query = searchQuery.trim().toLowerCase();

    // 1) Filter real areas (from database)
    let filteredReal = localAreas;
    if (activeTab === "thonburi") {
      filteredReal = localAreas.filter((a) => thonburiSlugs.includes(a.slug));
    } else if (activeTab === "suburbs") {
      filteredReal = localAreas.filter((a) => suburbsSlugs.includes(a.slug));
    } else if (activeTab === "inner") {
      filteredReal = localAreas.filter((a) => a.slug === "phra-nakhon");
    } else if (activeTab === "longhaul") {
      filteredReal = []; // Handled separately in routes
    }

    if (query) {
      filteredReal = filteredReal.filter((area) => {
        const matchTitle = area.title.toLowerCase().includes(query);
        const matchAreaThai = area.areaThai.toLowerCase().includes(query);
        const matchDistrict = area.districtThai?.toLowerCase().includes(query) || false;
        const matchSubAreas = area.serviceAreas?.some((sa) => sa.toLowerCase().includes(query)) || false;
        const matchLandmarks = area.landmarks?.some((lm) => lm.toLowerCase().includes(query)) || false;
        const matchKeywords = area.keywords?.some((kw) => kw.toLowerCase().includes(query)) || false;

        return matchTitle || matchAreaThai || matchDistrict || matchSubAreas || matchLandmarks || matchKeywords;
      });
    }
    result.realAreas = filteredReal;

    // 2) Filter virtual inner areas
    if (activeTab === "all" || activeTab === "inner") {
      let filteredInner = innerBkkAreas;
      if (query) {
        filteredInner = innerBkkAreas.filter((item) => {
          const matchName = item.name.toLowerCase().includes(query);
          const matchSub = item.subAreas.some((sub) => sub.toLowerCase().includes(query));
          return matchName || matchSub;
        });
      }
      result.virtualAreas = filteredInner;
    }

    // 3) Filter routes
    if (activeTab === "all" || activeTab === "longhaul") {
      let filteredRoutes = upcountryRoutes;
      if (query) {
        filteredRoutes = upcountryRoutes.filter((r) => {
          return r.name.toLowerCase().includes(query) || r.info.toLowerCase().includes(query);
        });
      }
      result.routes = filteredRoutes;
    }

    return result;
  }, [searchQuery, activeTab, localAreas]);

  // Calculate total matched count
  const totalCount = filteredData.realAreas.length + filteredData.virtualAreas.length + filteredData.routes.length;

  return (
    <div className={styles.filterContainer}>
      
      {/* Premium Statistics Banner */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><i className="bi bi-geo-alt-fill text-warning"></i></div>
          <div className={styles.statValue}>16+ จุดบริการ</div>
          <div className={styles.statLabel}>จอดสแตนบายรอบกรุงเทพฯ และปริมณฑล</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><i className="bi bi-truck text-primary"></i></div>
          <div className={styles.statValue}>30–45 นาที</div>
          <div className={styles.statLabel}>เข้ารับงานด่วนได้รวดเร็วหลังยืนยันราคา</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><i className="bi bi-shield-fill-check text-success"></i></div>
          <div className={styles.statValue}>100% ปลอดภัย</div>
          <div className={styles.statLabel}>รถตู้ทึบกันฝน-ฝุ่น พร้อมประกันขนย้าย</div>
        </div>
      </div>

      {/* Modern Filter Search Box */}
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}><i className="bi bi-search"></i></span>
        <input
          type="text"
          placeholder="ค้นหาเขต, อำเภอ, ห้าง หรือย่านบริการ เช่น บางแค, สมุทรสาคร, ซีคอน..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button onClick={handleClearSearch} className={styles.clearButton} aria-label="ล้างการค้นหา">
            <i className="bi bi-x-circle-fill"></i>
          </button>
        )}
        <span className={styles.resultsCounter}>
          {searchQuery ? `พบ ${totalCount} รายการ` : `ทั้งหมด ${localAreas.length + 4} จุดหลัก`}
        </span>
      </div>

      {/* Tabs Filter Menu */}
      <div className={styles.tabsList}>
        <button
          onClick={() => setActiveTab("all")}
          className={`${styles.tabButton} ${activeTab === "all" ? styles.tabButtonActive : ""}`}
        >
          ทั้งหมด
        </button>
        <button
          onClick={() => setActiveTab("thonburi")}
          className={`${styles.tabButton} ${activeTab === "thonburi" ? styles.tabButtonActive : ""}`}
        >
          ฝั่งธนบุรี & พุทธมณฑล
        </button>
        <button
          onClick={() => setActiveTab("inner")}
          className={`${styles.tabButton} ${activeTab === "inner" ? styles.tabButtonActive : ""}`}
        >
          กรุงเทพฯ ชั้นใน / CBD
        </button>
        <button
          onClick={() => setActiveTab("suburbs")}
          className={`${styles.tabButton} ${activeTab === "suburbs" ? styles.tabButtonActive : ""}`}
        >
          เขตปริมณฑล
        </button>
        <button
          onClick={() => setActiveTab("longhaul")}
          className={`${styles.tabButton} ${activeTab === "longhaul" ? styles.tabButtonActive : ""}`}
        >
          ต่างจังหวัด / ข้ามภาค
        </button>
      </div>

      {/* Filter Output Cards Grid */}
      {totalCount > 0 ? (
        <div className={styles.areasGrid}>
          
          {/* A. Render Real Areas from Database */}
          {filteredData.realAreas.map((area) => {
            // Determine zone type based on slug
            const isThonburi = thonburiSlugs.includes(area.slug);
            const zoneText = isThonburi ? "ฝั่งธนบุรี" : "ปริมณฑล";
            const badgeBg = isThonburi ? "rgba(255, 215, 0, 0.15)" : "rgba(25, 135, 84, 0.15)";
            const badgeColor = isThonburi ? "#b28900" : "#198754";

            return (
              <div key={area.slug} className={styles.areaCard}>
                <div className={styles.cardHeader} style={{ background: isThonburi ? "linear-gradient(180deg, rgba(255,215,0,0.04) 0%, rgba(255,255,255,0) 100%)" : "linear-gradient(180deg, rgba(25,135,84,0.04) 0%, rgba(255,255,255,0) 100%)" }}>
                  <span className={styles.zoneBadge} style={{ backgroundColor: badgeBg, color: badgeColor }}>
                    {zoneText}
                  </span>
                  <h3 className={styles.cardTitle}>
                    <i className={`bi bi-geo-alt-fill ${styles.cardIcon}`} style={{ color: badgeColor }}></i>
                    รถรับจ้าง{area.areaThai}
                  </h3>
                  <p className={styles.cardSubtitle}>{area.badgeText}</p>
                </div>

                <div className={styles.cardBody}>
                  {/* Sub-areas served */}
                  <div className={styles.infoSection}>
                    <span className={styles.infoLabel}>จุดรับงานย่อย:</span>
                    <div className={styles.tagContainer}>
                      {area.serviceAreas.slice(0, 5).map((sub) => (
                        <span key={sub} className={styles.districtTag}>
                          {sub}
                        </span>
                      ))}
                      {area.serviceAreas.length > 5 && (
                        <span className={styles.districtTag} style={{ background: "#f1f5f9" }}>
                          +{area.serviceAreas.length - 5} พื้นที่
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Highlights/Landmarks */}
                  {area.landmarks && area.landmarks.length > 0 && (
                    <div className={styles.infoSection}>
                      <span className={styles.infoLabel}>สถานที่สำคัญใกล้เคียง:</span>
                      <div className={styles.tagContainer}>
                        {area.landmarks.slice(0, 3).map((lm) => (
                          <span key={lm} className={styles.districtTag} style={{ fontSize: "0.75rem", borderColor: "#cbd5e1" }}>
                            <i className="bi bi-building"></i> {lm}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlights/Landmarks */}
                  {area.popularServices && area.popularServices.length > 0 && (
                    <div className={styles.infoSection}>
                      <span className={styles.infoLabel}>บริการยอดนิยม:</span>
                      <div className={styles.tagContainer}>
                        {area.popularServices.map((service) => (
                          <span key={service} className={styles.districtTag} style={{ fontSize: "0.75rem", backgroundColor: "#f0fdf4", color: "#166534", borderColor: "#bbf7d0" }}>
                            ✓ {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.etaInfo}>
                    <i className={`bi bi-alarm ${styles.etaIcon}`}></i>
                    <span>รับด่วน 30-45 นาที</span>
                  </div>
                  <Link href={`/areas/${area.slug}`} className={styles.cardLink}>
                    ดูข้อมูลพื้นที่ <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            );
          })}

          {/* B. Render Virtual Inner BKK Areas */}
          {filteredData.virtualAreas.map((item, idx) => (
            <div key={`virtual-${idx}`} className={styles.areaCard}>
              <div className={styles.cardHeader} style={{ background: "linear-gradient(180deg, rgba(13,110,253,0.04) 0%, rgba(255,255,255,0) 100%)" }}>
                <span className={styles.zoneBadge} style={{ backgroundColor: "rgba(13, 110, 253, 0.12)", color: "#0d6efd" }}>
                  กรุงเทพฯ ชั้นใน
                </span>
                <h3 className={styles.cardTitle}>
                  <i className="bi bi-buildings-fill text-primary"></i>
                  {item.name}
                </h3>
                <p className={styles.cardSubtitle}>ครอบคลุมศูนย์กลางธุรกิจ และย่านที่อยู่อาศัยหนาแน่น</p>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.infoSection}>
                  <span className={styles.infoLabel}>พื้นที่ย้ายคอนโด & สำนักงานหลัก:</span>
                  <div className={styles.tagContainer}>
                    {item.subAreas.map((sa) => (
                      <span key={sa} className={styles.districtTag}>
                        {sa}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.infoSection}>
                  <span className={styles.infoLabel}>บริการอำนวยความสะดวก:</span>
                  <div className={styles.tagContainer}>
                    <span className={styles.districtTag} style={{ fontSize: "0.75rem", backgroundColor: "#eff6ff", color: "#1e40af", borderColor: "#bfdbfe" }}>
                      ย้ายคอนโดตึกสูง
                    </span>
                    <span className={styles.districtTag} style={{ fontSize: "0.75rem", backgroundColor: "#eff6ff", color: "#1e40af", borderColor: "#bfdbfe" }}>
                      ย้ายสำนักงาน / ออฟฟิศ
                    </span>
                    <span className={styles.districtTag} style={{ fontSize: "0.75rem", backgroundColor: "#eff6ff", color: "#1e40af", borderColor: "#bfdbfe" }}>
                      บริการช่วยห่อ/แพ็คของ
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.etaInfo} style={{ color: "#0d6efd" }}>
                  <i className="bi bi-clock-history"></i>
                  <span>นัดล่วงหน้า / รับด่วน</span>
                </div>
                <Link href={`/areas/${item.slug}`} className={styles.cardLink}>
                  ดูข้อมูลพื้นที่ <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}

          {/* C. Render Upcountry Routes */}
          {filteredData.routes.map((route, idx) => (
            <div key={`route-${idx}`} className={styles.areaCard} style={{ borderColor: "rgba(220, 53, 69, 0.15)" }}>
              <div className={styles.cardHeader} style={{ background: "linear-gradient(180deg, rgba(220,53,69,0.04) 0%, rgba(255,255,255,0) 100%)" }}>
                <span className={styles.zoneBadge} style={{ backgroundColor: "rgba(220, 53, 69, 0.12)", color: "#dc3545" }}>
                  ข้ามจังหวัด
                </span>
                <h3 className={styles.cardTitle}>
                  <i className="bi bi-signpost-2-fill text-danger"></i>
                  ส่งไป: {route.name.split(" (")[0]}
                </h3>
                <p className={styles.cardSubtitle} style={{ fontSize: "0.8rem" }}>{route.name}</p>
              </div>

              <div className={styles.cardBody}>
                <p className="font-sarabun text-secondary small mb-3">{route.info}</p>
                <div className={styles.infoSection}>
                  <span className={styles.infoLabel}>ความคุ้มครองพิเศษ:</span>
                  <div className={styles.tagContainer}>
                    <span className={styles.districtTag} style={{ fontSize: "0.75rem", backgroundColor: "#fff5f5", color: "#9b1c1c", borderColor: "#feb2b2" }}>
                      มัดล็อค VIP หนาแน่น
                    </span>
                    <span className={styles.districtTag} style={{ fontSize: "0.75rem", backgroundColor: "#fff5f5", color: "#9b1c1c", borderColor: "#feb2b2" }}>
                      ตู้ทึบกันฝนพายุ 100%
                    </span>
                    <span className={styles.districtTag} style={{ fontSize: "0.75rem", backgroundColor: "#fff5f5", color: "#9b1c1c", borderColor: "#feb2b2" }}>
                      รับส่งตรงถึงหน้าบ้าน
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.etaInfo} style={{ color: "#dc3545" }}>
                  <i className="bi bi-shield-check"></i>
                  <span>มีรับประกันเสียหาย</span>
                </div>
                <Link href={route.path} className={styles.cardLink}>
                  ดูเรทค่าบริการทางไกล <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}

        </div>
      ) : (
        /* Empty Search State */
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}><i className="bi bi-geo-fill"></i></div>
          <h4 className={styles.emptyTitle}>ไม่พบพื้นที่ให้บริการย่อย &ldquo;{searchQuery}&rdquo;</h4>
          <p className={styles.emptyText}>
            เรายินดีให้บริการรถรับจ้างขนของครอบคลุมทั่วไทย ขอแนะนำให้กรอกคำค้นหาอื่น หรือสอบถามพนักงานโดยตรงทาง LINE เพื่อเช็คจุดสแตนบายรถด่วน
          </p>
          <button onClick={handleClearSearch} className={styles.resetButton}>
            แสดงทั้งหมด
          </button>
        </div>
      )}

    </div>
  );
}
