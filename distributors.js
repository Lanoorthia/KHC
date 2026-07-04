const DISTRIBUTORS = {
  "ภาคกลาง": [
    { name: "Siampharmacy", phone: "02-938-6041" },
    { name: "ทรงคุณโอสถ", phone: "02-221-6644" },
    { name: "คลังยา26", phone: "02-243-3032" },
    { name: "Pharmahof", phone: "02-889-5820" },
    { name: "วิฑูรเภสัช", phone: "02-279-2690" },
    { name: "P.K.S", phone: "02-424-6400" },
    { name: "TPD", phone: "02-426-2646" },
    { name: "Drugserv", phone: "02-906-3470" },
    { name: "สมชายเวชภัณฑ์", phone: "02-932-6142" },
    { name: "วรมิตร", phone: "02-753-4704" },
    { name: "Modernhealthmart (บุญสิน)", phone: "02-862-0590" },
    { name: "วิมลย์ฟาร์มา", phone: "081-887-2233" }
  ],
  "ภาคเหนือ": [
    { name: "ส.เภสัชกร", phone: "05-321-2894" },
    { name: "น้ำเที่ยวโอสถ", phone: "05-422-4823" },
    { name: "ช.เภสัช (หน้าแฮตติ้ง)", phone: "05-422-7890" },
    { name: "เอ็น.บี.ฟาร์ม่า", phone: "05-431-1122" },
    { name: "ชัยบำรุงโอสถ", phone: "05-621-3385" },
    { name: "พิษณุโลกคลังยา", phone: "02-685-1100" },
    { name: "PTN Pharma Center", phone: "05-637-1370" },
    { name: "ชัยคลังยา", phone: "05-571-1305" },
    { name: "สยามชัยเภสัช", phone: "05-327-3159" }
  ],
  "ภาคตะวันออก": [
    { name: "ชัยชัย เภสัช", phone: "081-865-2196" },
    { name: "หมอยาสุรินทร์", phone: "081-718-3180" },
    { name: "วีระเภสัช", phone: "086-813-5237" },
    { name: "เมืองทองเภสัช", phone: "04-532-4647" },
    { name: "ไพบูลย์เภสัช", phone: "03-861-1847" },
    { name: "บุษบาฟาร์มาซี", phone: "04-351-4572" },
    { name: "Drugcenter", phone: "089-710-0524" }
  ],
  "ภาคตะวันตก": [
    { name: "บ้วนสุนโอสถ 2", phone: "03-425-8439" },
    { name: "ธัญญะไทย", phone: "03-233-7314" }
  ],
  "ภาคใต้": [
    { name: "ครอบครัวยาหาดใหญ่", phone: "074-354-998" },
    { name: "สุวรรณเภสัช", phone: "075-663-460" },
    { name: "วังเภสัช", phone: "074-366-681" },
    { name: "ฟาร์มาเพล็กซ์", phone: "074-235-739" },
    { name: "สันติเฮลท์แคร์", phone: "076-233-1201" },
    { name: "สนั่น ฟาร์มาซี", phone: "077-361-406" }
  ]
};

function mapIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
}

function renderStores() {
  const regionSelect = document.querySelector('#region-select');
  const searchInput = document.querySelector('#store-search');
  const container = document.querySelector('#store-results');
  const noResults = document.querySelector('#no-results');
  if (!container) return;

  const regionVal = regionSelect.value;
  const searchVal = searchInput.value.trim().toLowerCase();

  container.innerHTML = '';
  let totalShown = 0;

  Object.entries(DISTRIBUTORS).forEach(([region, stores]) => {
    if (regionVal !== 'all' && regionVal !== region) return;

    const filtered = stores.filter(s => s.name.toLowerCase().includes(searchVal));
    if (filtered.length === 0) return;

    totalShown += filtered.length;

    const block = document.createElement('div');
    block.className = 'region-block reveal in';
    block.innerHTML = `
      <div class="region-title">
        <h3>${region}</h3>
        <span class="count">${filtered.length} ร้าน</span>
      </div>
      <div class="store-grid">
        ${filtered.map(s => `
          <div class="store-card">
            <div>
              <div class="store-name">${s.name}</div>
              <div class="store-phone">โทร. ${s.phone}</div>
            </div>
            <div class="store-actions">
              <a class="store-map" href="https://www.google.com/maps/search/${encodeURIComponent(s.name)}" target="_blank" rel="noopener">
                ${mapIcon()} ดูแผนที่
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(block);
  });

  noResults.style.display = totalShown === 0 ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const regionSelect = document.querySelector('#region-select');
  const searchInput = document.querySelector('#store-search');
  if (!regionSelect) return;
  renderStores();
  regionSelect.addEventListener('change', renderStores);
  searchInput.addEventListener('input', renderStores);
});
