// URL থেকে পেজ নাম বের করে সেই পেজে রিডাইরেক্ট
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  if (page) {
    // পেজ অনুযায়ী কন্টেন্ট লোড করা
    loadPageContent(page);
  }
});

function loadPageContent(page) {
  // পেজ নাম থেকে এক্সটেনশন বাদ দিয়ে ম্যাচিং
  const pageMap = {
    '/at-a-glance': showAtAGlance,
    '/history': showHistory,
    '/teachers': showTeachers,
    '/principal': showPrincipal,
    '/vice-principal': showVicePrincipal,
    '/notice-board': showNoticeBoard,
    '/gallery': showGallery,
    '/contact': showContact,
    '/academic': showAcademic,
    '/admission': showAdmission,
    '/admin-login': showAdminLogin,
    '/admin-panel': showAdminPanel
  };
  
  const cleanPage = page.replace('.html', '');
  if (pageMap[cleanPage]) {
    // main-content ডিভের মধ্যে কন্টেন্ট দেখান
    document.querySelector('.container .row').style.display = 'none';
    // ... বা আপনার পছন্দমত লজিক
  }
}
// ============================================================
// APPLICATION LOGIC - Satkhira Government College Clone
// Handles all dynamic rendering across pages
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  // Set footer year
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Render data based on current page
  renderHomePage();
  renderSidebarComponents();
  renderPrincipalPage();
  renderVicePrincipalPage();
  renderTeachersPage();
  renderNoticeBoardPage();
  renderGalleryPage();
  renderContactPage();
  renderAtAGlancePage();
  renderHistoryPage();
  renderAcademicPage();
  renderAdmissionPage();
  renderCalendar();
});

// ===== HOME PAGE =====
function renderHomePage() {
  // Principal message
  const pmDisplay = document.getElementById('principalMsgDisplay');
  if (pmDisplay) {
    const msg = getData('principalMessage');
    pmDisplay.innerHTML = `<p>${msg.substring(0, 200)}...</p>`;
  }

  // Vice Principal message
  const vpmDisplay = document.getElementById('vicePrincipalMsgDisplay');
  if (vpmDisplay) {
    const msg = getData('vicePrincipalMessage');
    vpmDisplay.innerHTML = `<p>${msg.substring(0, 200)}...</p>`;
  }

  // Home notice list (latest 5)
  const homeList = document.getElementById('homeNoticeList');
  if (homeList) {
    const notices = getNotices().slice(0, 5);
    homeList.innerHTML = notices.map(n =>
      `<li><a href="${n.link || '#'}">${n.title} <span class="notice-date">(${n.date})</span></a></li>`
    ).join('');
  }
}

// ===== SIDEBAR COMPONENTS =====
function renderSidebarComponents() {
  // Important Links
  const linksContainer = document.getElementById('importantLinks');
  if (linksContainer) {
    const links = getLinks();
    linksContainer.innerHTML = links.map(l =>
      `<li><a href="${l.url}" target="_blank">${l.title}</a></li>`
    ).join('');
  }

  // Contact Info
  const contactContainer = document.getElementById('contactInfo');
  if (contactContainer) {
    const info = getData('siteInfo');
    contactContainer.innerHTML = `
      <p><strong>${info.name}</strong></p>
      <p>${info.address}</p>
      <p><strong>অফিস:</strong> ${info.phoneOffice}</p>
      <p><strong>অধ্যক্ষ:</strong> ${info.phonePrincipal}</p>
      <p><strong>উপাধ্যক্ষ:</strong> ${info.phoneVicePrincipal}</p>
      <p><strong>ই-মেইল:</strong> ${info.email}</p>
    `;
  }
}

// ===== CALENDAR =====
function renderCalendar() {
  const calWidget = document.getElementById('calendarWidget');
  if (!calWidget) return;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let html = `<table class="calendar-table">
    <thead><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr></thead><tbody><tr>`;

  for (let i = 0; i < firstDay; i++) html += '<td></td>';

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today ? ' class="today"' : '';
    html += `<td${isToday}>${d}</td>`;
    if ((d + firstDay) % 7 === 0) html += '</tr><tr>';
  }

  html += '</tr></tbody></table>';
  html += `<p style="text-align:center;margin-top:10px;font-size:13px;font-weight:600;">${monthNames[month]} ${year}</p>`;
  calWidget.innerHTML = html;
}

// ===== PRINCIPAL PAGE =====
function renderPrincipalPage() {
  const container = document.getElementById('principalPageContent');
  if (!container) return;

  const pInfo = getData('principalInfo');
  const pMsg = getData('principalMessage');

  container.innerHTML = `
    <div class="row">
      <div class="col-md-4 text-center mb-3">
        <img src="${pInfo.photo}" alt="${pInfo.name}" class="teacher-img" style="width:180px;height:180px;border-radius:50%;object-fit:cover;border:4px solid #004080;">
        <h4 class="mt-3" style="color:#003366;">${pInfo.name}</h4>
        <p style="font-size:15px;color:#555;">${pInfo.designation}</p>
        <p style="font-size:14px;"><strong>বিসিএস:</strong> ${pInfo.bcs}</p>
        <p style="font-size:14px;"><strong>বিষয়:</strong> ${pInfo.subject}</p>
      </div>
      <div class="col-md-8">
        <h4 style="color:#003366;border-bottom:2px solid #ffcc00;padding-bottom:10px;">অধ্যক্ষ মহোদয়ের বাণী</h4>
        <p style="text-align:justify;margin-top:15px;font-size:15px;line-height:1.8;">${pMsg}</p>
      </div>
    </div>
  `;
}

// ===== VICE PRINCIPAL PAGE =====
function renderVicePrincipalPage() {
  const container = document.getElementById('vicePrincipalPageContent');
  if (!container) return;

  const vpInfo = getData('vicePrincipalInfo');
  const vpMsg = getData('vicePrincipalMessage');

  container.innerHTML = `
    <div class="row">
      <div class="col-md-4 text-center mb-3">
        <img src="${vpInfo.photo}" alt="${vpInfo.name}" class="teacher-img" style="width:180px;height:180px;border-radius:50%;object-fit:cover;border:4px solid #004080;">
        <h4 class="mt-3" style="color:#003366;">${vpInfo.name}</h4>
        <p style="font-size:15px;color:#555;">${vpInfo.designation}</p>
        <p style="font-size:14px;"><strong>বিসিএস:</strong> ${vpInfo.bcs}</p>
        <p style="font-size:14px;"><strong>বিষয়:</strong> ${vpInfo.subject}</p>
      </div>
      <div class="col-md-8">
        <h4 style="color:#003366;border-bottom:2px solid #ffcc00;padding-bottom:10px;">উপাধ্যক্ষ মহোদয়ের বাণী</h4>
        <p style="text-align:justify;margin-top:15px;font-size:15px;line-height:1.8;">${vpMsg}</p>
      </div>
    </div>
  `;
}

// ===== TEACHERS PAGE =====
function renderTeachersPage() {
  const container = document.getElementById('teachersPageContent');
  if (!container) return;

  const teachers = getTeachers();
  container.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>ক্রঃ নং</th>
          <th>নাম</th>
          <th>পদবী</th>
          <th>বিসিএস</th>
          <th>বিষয়</th>
          <th>মোবাইল</th>
          <th>ছবি</th>
        </tr>
      </thead>
      <tbody>
        ${teachers.map(t => `
          <tr>
            <td>${t.sl}</td>
            <td><strong>${t.name}</strong></td>
            <td>${t.designation}</td>
            <td>${t.bcs}</td>
            <td>${t.subject}</td>
            <td>${t.phone}</td>
            <td>${t.photo ? `<img src="${t.photo}" alt="${t.name}" style="width:50px;height:50px;border-radius:50%;object-fit:cover;">` : '-'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ===== NOTICE BOARD PAGE =====
function renderNoticeBoardPage() {
  const container = document.getElementById('noticeBoardPageContent');
  if (!container) return;

  const notices = getNotices();
  container.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Date Published</th>
          <th>Subject</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        ${notices.map((n, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${n.date}</td>
            <td>${n.title}</td>
            <td>${n.link && n.link !== '#' ? `<a href="${n.link}" target="_blank">view</a>` : '-'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ===== GALLERY PAGE =====
function renderGalleryPage() {
  const container = document.getElementById('galleryPageContent');
  if (!container) return;

  const gallery = getGallery();
  container.innerHTML = `
    <div class="gallery-grid">
      ${gallery.map((item, i) => `
        <div class="gallery-item" onclick="openGalleryModal('${item.src}', '${item.caption}')">
          <img src="${item.src}" alt="${item.caption}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjUwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjEyNSIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';">
          <div class="gallery-caption">${item.caption}</div>
        </div>
      `).join('')}
    </div>
    <!-- Modal -->
    <div class="modal-overlay" id="galleryModal" onclick="closeGalleryModal()">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <img id="modalImage" src="" alt="">
        <p id="modalCaption" style="color:#fff;text-align:center;margin-top:10px;font-size:16px;"></p>
      </div>
    </div>
  `;
}

function openGalleryModal(src, caption) {
  document.getElementById('galleryModal').classList.add('show');
  document.getElementById('modalImage').src = src;
  document.getElementById('modalCaption').textContent = caption;
}

function closeGalleryModal() {
  document.getElementById('galleryModal').classList.remove('show');
}

// ===== CONTACT PAGE =====
function renderContactPage() {
  const container = document.getElementById('contactPageContent');
  if (!container) return;

  const info = getData('siteInfo');
  container.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <h4 style="color:#003366;border-bottom:2px solid #ffcc00;padding-bottom:10px;">ঠিকানা</h4>
        <p style="margin-top:15px;"><strong>${info.name}</strong></p>
        <p>${info.address}</p>
        <p><strong>অফিস:</strong> ${info.phoneOffice}</p>
        <p><strong>অধ্যক্ষ:</strong> ${info.phonePrincipal}</p>
        <p><strong>উপাধ্যক্ষ:</strong> ${info.phoneVicePrincipal}</p>
        <p><strong>ই-মেইল:</strong> ${info.email}</p>
        <p><strong>প্রতিষ্ঠিত:</strong> ${info.established}</p>
        <p><strong>জাতীয়করণ:</strong> ${info.nationalization}</p>
        <p><strong>মোট জমি:</strong> ${info.land}</p>
        <p><strong>মোট শিক্ষার্থী:</strong> ${info.students}</p>
      </div>
      <div class="col-md-6">
        <h4 style="color:#003366;border-bottom:2px solid #ffcc00;padding-bottom:10px;">ম্যাপ</h4>
        <div style="margin-top:15px;">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.524398992692!2d89.068459!3d22.717849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff54bb1c5b1e7d%3A0x8c5e5b5b5b5b5b5b!2sSatkhira%20Government%20College!5e0!3m2!1sen!2sbd!4v1" width="100%" height="350" style="border:2px solid #ddd;border-radius:5px;" allowfullscreen="" loading="lazy"></iframe>
        </div>
      </div>
    </div>
  `;
}

// ===== AT A GLANCE PAGE =====
function renderAtAGlancePage() {
  const container = document.getElementById('atAGlanceContent');
  if (!container) return;

  container.innerHTML = `
    <h3 style="color:#003366;text-align:center;margin-bottom:20px;">সাতক্ষীরা সরকারি কলেজ, সাতক্ষীরা</h3>
    <table class="data-table">
      <tbody>
        <tr><td><strong>স্থাপিত</strong></td><td>১৯৪৬ খ্রি.</td></tr>
        <tr><td><strong>জাতীয়করণ</strong></td><td>১৯৮০ খ্রি.</td></tr>
        <tr><td><strong>মোট জমির পরিমাণ</strong></td><td>২৭ একর (প্রায়)</td></tr>
        <tr><td><strong>বিভাগ</strong></td><td>১৬ টি</td></tr>
        <tr><td><strong>স্নাতক(সম্মান) কোর্স চালু</strong></td><td>১৬ টি বিষয় (অর্থনীতি, ইংরেজি, বাংলা, রাষ্ট্রবিজ্ঞান, দর্শন, ইতিহাস, ইসলামের ইতিহাস ও সংষ্কৃতি, ইসলামি শিক্ষা, গণিত, পদার্থবিজ্ঞান, রসায়ন, উদ্ভিদবিদ্যা, প্রাণিবিদ্যা, ভূগোল ও পরিবেশ, ব্যবস্থাপনা, ও হিসাববিজ্ঞান)</td></tr>
        <tr><td><strong>স্নাতকোত্তর শেষ পর্ব চালু</strong></td><td>১৫ টি বিষয়</td></tr>
        <tr><td><strong>স্নাতকোত্তর ১ম পর্ব চালু</strong></td><td>০৬ টি বিষয়</td></tr>
        <tr><td><strong>মোট শিক্ষার্থী</strong></td><td>১৭০০০ (প্রায়)</td></tr>
        <tr><td><strong>সৃষ্ট পদ</strong></td><td>৮৩</td></tr>
        <tr><td><strong>কর্মরত কর্মকর্তা</strong></td><td>৭২</td></tr>
        <tr><td><strong>শুন্য পদ</strong></td><td>১১</td></tr>
        <tr><td><strong>কম্পিউটার ল্যাব</strong></td><td>০২</td></tr>
        <tr><td><strong>ডিজিটাল মাল্টিমিডিয়া ক্লাস রুম</strong></td><td>১৬</td></tr>
        <tr><td><strong>কেন্দ্রীয় লাইব্রেরিতে বইয়ের সংখ্যা</strong></td><td>৩০ হাজার (প্রায়)</td></tr>
        <tr><td><strong>সেমিনার লাইব্রেরিতে বইয়ের সংখ্যা</strong></td><td>১৬ হাজার (প্রায়)</td></tr>
      </tbody>
    </table>
  `;
}

// ===== HISTORY PAGE =====
function renderHistoryPage() {
  const container = document.getElementById('historyContent');
  if (!container) return;

  container.innerHTML = `
    <h3 style="color:#003366;margin-bottom:20px;">ইতিহাস</h3>
    <p style="text-align:justify;font-size:15px;line-height:1.9;">ব্রিটিশ আমলে সাতক্ষীরায় উচ্চ শিক্ষার জন্য কোন কলেজ স্থাপিত হয়নি। উচ্চ শিক্ষা লাভের জন্য সাতক্ষীরা এলাকার শিক্ষার্থীরা খুলনা, বাগেরহাট ও পার্শ্ববর্তী কলকাতায় যেত। সাতক্ষীরা মহকুমা প্রশাসক পি.সি মজুমদার(১৯৩৬-১৯৪০) এর সময়ে সাতক্ষীরা পৌরসভার চেয়ারম্যান লীলাপদ মজুমদার, আব্দুল বারী খান, নিরোধ চ্যাটার্জী, আব্দুর রউফ খান, আব্দুল হাফিজ খান, মীর আহম্মদ আলী সহ সাতক্ষীরা শহরের কতিপয় বিদ্দ্যোৎসাহী ব্যক্তি সাতক্ষীরায় একটি কলেজ স্থাপনের সিদ্ধান্ত নেন এবং ১৯৪৬ সালের ফেব্রুয়ারীর ১ম সপ্তাহে সুলতান আহমেদ মহকুমা প্রশাসকের দায়িত্ব নিয়ে সাতক্ষীরায় আসেন। তাকে কলেজ সম্পর্কে অভিহিত করা হলে তিনি কলেজ স্থাপনের উপর গুরুত্ব দেন এবং পূর্বের কমিটিতে এম.এ গফুর, আব্দুল বারী খান এবং অরবিন্দু নাথ মহোদয়বৃন্দকে সদস্য হিসেবে অন্তর্ভুক্ত করেন। কলকাতা বিশ্ববিদ্যালয়ের অধ্যাপক ও কলেজ প্রতিষ্ঠা কমিটির অন্যতম সদস্য হরিচন্দ্র ঘোষের বিশেষ উদ্দ্যোগে ও অক্লান্ত প্রচেষ্টায় ১৯৪৬-৪৭ শিক্ষাবর্ষে কেবল উচ্চ মাধ্যমিক মানবিক ও বাণিজ্য বিভাগ খোলার অনুমোদন লাভ করে। ১৯৫০-৫১ শিক্ষাবর্ষ হতে উচ্চ মাধ্যমিক বিজ্ঞান ও স্নাতক কলা বিভাগ খোলার অনুমোদন লাভ করে। ১৯৬৫ সালে কলেজে স্নাতক বাণিজ্য বিভাগ খোলার অনুমোদন পেলে ১৯৬৬ সালে ডিগ্রী বাণিজ্য নতুন ভবনে স্থানান্তরিত করা হয়। ১৯৬৯-৭০ শিক্ষাবর্ষে স্নাতক বিজ্ঞান বিভাগ খোলা হলে সেখান থেকে সাতক্ষীরা কলেজ একটি পূর্ণাঙ্গ স্নাতক পর্যায়ের কলেজে হিসেবে আত্মপ্রকাশ করে। এরপর কলেজটি ১৯৮০ সালে জাতীয়করণ করা হয়।</p>
  `;
}

// ===== ACADEMIC PAGE =====
function renderAcademicPage() {
  const container = document.getElementById('academicContent');
  if (!container) return;

  container.innerHTML = `
    <h3 style="color:#003366;margin-bottom:20px;">একাডেমিক তথ্য</h3>
    <h5 style="color:#004080;margin-top:20px;">স্নাতক (সম্মান) কোর্স</h5>
    <p>অর্থনীতি, ইংরেজি, বাংলা, রাষ্ট্রবিজ্ঞান, দর্শন, ইতিহাস, ইসলামের ইতিহাস ও সংস্কৃতি, ইসলামি শিক্ষা, গণিত, পদার্থবিজ্ঞান, রসায়ন, উদ্ভিদবিদ্যা, প্রাণিবিদ্যা, ভূগোল ও পরিবেশ, ব্যবস্থাপনা, হিসাববিজ্ঞান</p>
    <h5 style="color:#004080;margin-top:20px;">স্নাতকোত্তর কোর্স</h5>
    <p>অর্থনীতি, ইংরেজি, বাংলা, রাষ্ট্রবিজ্ঞান, দর্শন, ইতিহাস, ইসলামের ইতিহাস ও সংস্কৃতি, গণিত, পদার্থবিজ্ঞান, রসায়ন, উদ্ভিদবিদ্যা, প্রাণিবিদ্যা, ভূগোল ও পরিবেশ, ব্যবস্থাপনা, হিসাববিজ্ঞান</p>
    <h5 style="color:#004080;margin-top:20px;">উচ্চ মাধ্যমিক</h5>
    <p>বিজ্ঞান, মানবিক, বাণিজ্য</p>
  `;
}

// ===== ADMISSION PAGE =====
function renderAdmissionPage() {
  const container = document.getElementById('admissionContent');
  if (!container) return;

  container.innerHTML = `
    <h3 style="color:#003366;margin-bottom:20px;">ভর্তি তথ্য</h3>
    <p>সাতক্ষীরা সরকারি কলেজে উচ্চ মাধ্যমিক, স্নাতক (সম্মান) ও স্নাতকোত্তর পর্যায়ে ভর্তি কার্যক্রম জাতীয় বিশ্ববিদ্যালয় ও মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, যশোর এর নির্দেশনা অনুযায়ী অনুষ্ঠিত হয়।</p>
    <h5 style="color:#004080;margin-top:20px;">গুরুত্বপূর্ণ লিংক</h5>
    <ul>
      <li><a href="http://app1.nu.edu.bd/" target="_blank">জাতীয় বিশ্ববিদ্যালয় ভর্তি</a></li>
      <li><a href="http://www.jessoreboard.gov.bd/" target="_blank">মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, যশোর</a></li>
    </ul>
  `;
}
