// ============================================================
// APP.JS - সাতক্ষীরা সরকারি কলেজ
// সব পৃষ্ঠার কন্টেন্ট রেন্ডারিং
// ============================================================

document.addEventListener('DOMContentLoaded', async function() {
  // প্রথমে ডাটা লোড নিশ্চিত করুন
  try {
    await loadData();
  } catch(e) {
    console.warn('Data load warning:', e);
  }
  
  // ফুটারের বছর সেট করুন
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // সব সেকশন রেন্ডার করুন
  renderHomePage();
  renderSidebarComponents();
  renderCalendar();
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
});

// ============================================================
// হোম পেজ
// ============================================================
async function renderHomePage() {
  try {
    // অধ্যক্ষের বাণী
    const pmDisplay = document.getElementById('principalMsgDisplay');
    if (pmDisplay) {
      const data = await loadData();
      const msg = data.principalMessage || getData('principalMessage') || '';
      pmDisplay.innerHTML = `<p>${msg.substring(0, 250)}...</p>`;
    }

    // উপাধ্যক্ষের বাণী
    const vpmDisplay = document.getElementById('vicePrincipalMsgDisplay');
    if (vpmDisplay) {
      const data = await loadData();
      const msg = data.vicePrincipalMessage || getData('vicePrincipalMessage') || '';
      vpmDisplay.innerHTML = `<p>${msg.substring(0, 250)}...</p>`;
    }

    // হোম পেজে নোটিশ (সর্বশেষ ৫টি)
    const homeList = document.getElementById('homeNoticeList');
    if (homeList) {
      const notices = await getNotices();
      const latestNotices = notices.slice(0, 5);
      if (latestNotices.length === 0) {
        homeList.innerHTML = '<li style="color:#888;padding:10px 0;">কোনো নোটিশ নেই</li>';
      } else {
        homeList.innerHTML = latestNotices.map(n =>
          `<li><a href="${n.link || '#'}" ${n.link && n.link !== '#' ? 'target="_blank"' : ''}>${n.title} <span class="notice-date">(${n.date})</span></a></li>`
        ).join('');
      }
    }
  } catch(e) {
    console.error('Home page render error:', e);
  }
}

// ============================================================
// সাইডবার কম্পোনেন্ট
// ============================================================
async function renderSidebarComponents() {
  try {
    // গুরুত্বপূর্ণ লিংক
    const linksContainer = document.getElementById('importantLinks');
    if (linksContainer) {
      const links = await getLinks();
      if (links.length === 0) {
        linksContainer.innerHTML = '<li style="color:#888;padding:10px 15px;">কোনো লিংক নেই</li>';
      } else {
        linksContainer.innerHTML = links.map(l =>
          `<li><a href="${l.url}" target="_blank">${l.title}</a></li>`
        ).join('');
      }
    }

    // যোগাযোগের তথ্য
    const contactContainer = document.getElementById('contactInfo');
    if (contactContainer) {
      const info = await getSiteInfo();
      contactContainer.innerHTML = `
        <p><strong>${info.name || 'সাতক্ষীরা সরকারি কলেজ'}</strong></p>
        <p>${info.address || 'রাজারবাগান, ওয়ার্ড নংঃ ০২, সাতক্ষীরা পৌরসভা, সাতক্ষীরা'}</p>
        <p><strong>অফিস:</strong> ${info.phoneOffice || '০২৪৭৭৭৪১০৭৯'}</p>
        <p><strong>অধ্যক্ষ:</strong> ${info.phonePrincipal || '০১৭২০৫২৬০৫৫'}</p>
        <p><strong>উপাধ্যক্ষ:</strong> ${info.phoneVicePrincipal || '০১৭১২৪৭২৭১৩'}</p>
        <p><strong>ই-মেইল:</strong> ${info.email || 'satkhiragovtcollege@yahoo.com'}</p>
      `;
    }
  } catch(e) {
    console.error('Sidebar render error:', e);
  }
}

// ============================================================
// ক্যালেন্ডার
// ============================================================
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

  for (let i = 0; i < firstDay; i++) {
    html += '<td></td>';
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today ? ' class="today"' : '';
    html += `<td${isToday}>${d}</td>`;
    if ((d + firstDay) % 7 === 0 && d < daysInMonth) {
      html += '</tr><tr>';
    }
  }

  html += '</tr></tbody></table>';
  html += `<p style="text-align:center;margin-top:10px;font-size:13px;font-weight:600;color:#004080;">📅 ${monthNames[month]} ${year}</p>`;
  calWidget.innerHTML = html;
}

// ============================================================
// অধ্যক্ষ পৃষ্ঠা
// ============================================================
async function renderPrincipalPage() {
  const container = document.getElementById('principalPageContent');
  if (!container) return;

  try {
    const pInfo = await getPrincipalInfo();
    const data = await loadData();
    const pMsg = data.principalMessage || getData('principalMessage') || '';

    container.innerHTML = `
      <div class="row">
        <div class="col-md-4 text-center mb-3">
          <img src="${pInfo.photo || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9Ijc1IiB5PSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='}" alt="${pInfo.name}" class="teacher-img" style="width:180px;height:180px;border-radius:50%;object-fit:cover;border:4px solid #004080;">
          <h4 class="mt-3" style="color:#003366;">${pInfo.name || 'প্রফেসর মোঃ আবুল হাশেম'}</h4>
          <p style="font-size:15px;color:#555;">${pInfo.designation || 'অধ্যক্ষ'}</p>
          <p style="font-size:14px;"><strong>বিসিএস:</strong> ${pInfo.bcs || '১৪শ বিসিএস'}</p>
          <p style="font-size:14px;"><strong>বিষয়:</strong> ${pInfo.subject || 'হিসাববিজ্ঞান'}</p>
        </div>
        <div class="col-md-8">
          <h4 style="color:#003366;border-bottom:2px solid #ffcc00;padding-bottom:10px;">অধ্যক্ষ মহোদয়ের বাণী</h4>
          <p style="text-align:justify;margin-top:15px;font-size:15px;line-height:1.8;">${pMsg || 'বক্তব্য শীঘ্রই যোগ করা হবে...'}</p>
        </div>
      </div>
    `;
  } catch(e) {
    container.innerHTML = '<p style="color:red;">তথ্য লোড করতে সমস্যা হয়েছে।</p>';
  }
}

// ============================================================
// উপাধ্যক্ষ পৃষ্ঠা
// ============================================================
async function renderVicePrincipalPage() {
  const container = document.getElementById('vicePrincipalPageContent');
  if (!container) return;

  try {
    const vpInfo = await getVicePrincipalInfo();
    const data = await loadData();
    const vpMsg = data.vicePrincipalMessage || getData('vicePrincipalMessage') || '';

    container.innerHTML = `
      <div class="row">
        <div class="col-md-4 text-center mb-3">
          <img src="${vpInfo.photo || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9Ijc1IiB5PSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='}" alt="${vpInfo.name}" class="teacher-img" style="width:180px;height:180px;border-radius:50%;object-fit:cover;border:4px solid #004080;">
          <h4 class="mt-3" style="color:#003366;">${vpInfo.name || 'প্রফেসর মোহাঃ আল মুস্তানছির বিল্যাহ'}</h4>
          <p style="font-size:15px;color:#555;">${vpInfo.designation || 'উপাধ্যক্ষ'}</p>
          <p style="font-size:14px;"><strong>বিসিএস:</strong> ${vpInfo.bcs || '১৬শ বিসিএস'}</p>
          <p style="font-size:14px;"><strong>বিষয়:</strong> ${vpInfo.subject || 'ইসলামের ইতিহাস ও সংস্কৃতি'}</p>
        </div>
        <div class="col-md-8">
          <h4 style="color:#003366;border-bottom:2px solid #ffcc00;padding-bottom:10px;">উপাধ্যক্ষ মহোদয়ের বাণী</h4>
          <p style="text-align:justify;margin-top:15px;font-size:15px;line-height:1.8;">${vpMsg || 'বক্তব্য শীঘ্রই যোগ করা হবে...'}</p>
        </div>
      </div>
    `;
  } catch(e) {
    container.innerHTML = '<p style="color:red;">তথ্য লোড করতে সমস্যা হয়েছে।</p>';
  }
}

// ============================================================
// শিক্ষক তালিকা পৃষ্ঠা
// ============================================================
async function renderTeachersPage() {
  const container = document.getElementById('teachersPageContent');
  if (!container) return;

  try {
    const teachers = await getTeachers();
    if (!teachers || teachers.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:#888;padding:20px;">কোনো শিক্ষকের তথ্য নেই</p>';
      return;
    }
    
    container.innerHTML = `
      <div class="table-wrap">
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
                <td>${t.bcs || '-'}</td>
                <td>${t.subject}</td>
                <td>${t.phone || '-'}</td>
                <td>${t.photo ? `<img src="${t.photo}" alt="${t.name}" style="width:50px;height:50px;border-radius:50%;object-fit:cover;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjZWVlIi8+PHRleHQgeD0iMjUiIHk9IjMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzk5OSI+TjwvdGV4dD48L3N2Zz4=';">` : '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch(e) {
    container.innerHTML = '<p style="color:red;text-align:center;padding:20px;">শিক্ষক তালিকা লোড করতে সমস্যা হয়েছে।</p>';
  }
}

// ============================================================
// নোটিশ বোর্ড পৃষ্ঠা
// ============================================================
async function renderNoticeBoardPage() {
  const container = document.getElementById('noticeBoardPageContent');
  if (!container) return;

  try {
    const notices = await getNotices();
    if (!notices || notices.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:#888;padding:20px;">কোনো নোটিশ নেই</p>';
      return;
    }

    container.innerHTML = `
      <div class="table-wrap">
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
                <td>${n.link && n.link !== '#' ? `<a href="${n.link}" target="_blank" style="color:#004080;font-weight:600;">📄 view</a>` : '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch(e) {
    container.innerHTML = '<p style="color:red;text-align:center;padding:20px;">নোটিশ লোড করতে সমস্যা হয়েছে।</p>';
  }
}

// ============================================================
// গ্যালারি পৃষ্ঠা
// ============================================================
async function renderGalleryPage() {
  const container = document.getElementById('galleryPageContent');
  if (!container) return;

  try {
    const gallery = await getGallery();
    if (!gallery || gallery.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:#888;padding:20px;">কোনো ছবি নেই</p>';
      return;
    }

    container.innerHTML = `
      <div class="gallery-grid">
        ${gallery.map((item, i) => `
          <div class="gallery-item" onclick="openGalleryModal('${item.src.replace(/'/g, "\\'")}', '${(item.caption || '').replace(/'/g, "\\'")}')">
            <img src="${item.src}" alt="${item.caption || 'Gallery Image'}" 
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjUwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjEyNSIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';">
            <div class="gallery-caption">${item.caption || 'সাতক্ষীরা সরকারি কলেজ'}</div>
          </div>
        `).join('')}
      </div>
      <!-- Modal -->
      <div class="modal-overlay" id="galleryModal" onclick="closeGalleryModal(event)">
        <div class="modal-content" style="position:relative;display:inline-block;">
          <span class="modal-close" onclick="closeGalleryModal()" style="position:absolute;top:10px;right:15px;color:#fff;font-size:35px;cursor:pointer;z-index:10;">&times;</span>
          <img id="modalImage" src="" alt="" style="max-width:90vw;max-height:85vh;border-radius:8px;display:block;">
          <p id="modalCaption" style="color:#fff;text-align:center;margin-top:10px;font-size:16px;"></p>
        </div>
      </div>
    `;
  } catch(e) {
    container.innerHTML = '<p style="color:red;text-align:center;padding:20px;">গ্যালারি লোড করতে সমস্যা হয়েছে।</p>';
  }
}

// গ্যালারি মডাল ফাংশন
function openGalleryModal(src, caption) {
  const modal = document.getElementById('galleryModal');
  if (modal) {
    modal.style.display = 'flex';
    document.getElementById('modalImage').src = src;
    document.getElementById('modalCaption').textContent = caption || 'সাতক্ষীরা সরকারি কলেজ';
    document.body.style.overflow = 'hidden';
  }
}

function closeGalleryModal(e) {
  if (e && e.target !== e.currentTarget) return;
  const modal = document.getElementById('galleryModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Escape কী চাপলে মডাল বন্ধ হবে
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('galleryModal');
    if (modal && modal.style.display === 'flex') {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});

// ============================================================
// যোগাযোগ পৃষ্ঠা
// ============================================================
async function renderContactPage() {
  const container = document.getElementById('contactPageContent');
  if (!container) return;

  try {
    const info = await getSiteInfo();

    container.innerHTML = `
      <div class="row">
        <div class="col-md-6">
          <h4 style="color:#003366;border-bottom:2px solid #ffcc00;padding-bottom:10px;">📞 যোগাযোগের ঠিকানা</h4>
          <div style="margin-top:15px;font-size:15px;line-height:2;">
            <p><strong>🏛️ ${info.name || 'সাতক্ষীরা সরকারি কলেজ'}</strong></p>
            <p>📍 ${info.address || 'রাজারবাগান, ওয়ার্ড নংঃ ০২, সাতক্ষীরা পৌরসভা, সাতক্ষীরা'}</p>
            <p>📞 <strong>অফিস:</strong> ${info.phoneOffice || '০২৪৭৭৭৪১০৭৯'}</p>
            <p>📞 <strong>অধ্যক্ষ:</strong> ${info.phonePrincipal || '০১৭২০৫২৬০৫৫'}</p>
            <p>📞 <strong>উপাধ্যক্ষ:</strong> ${info.phoneVicePrincipal || '০১৭১২৪৭২৭১৩'}</p>
            <p>✉️ <strong>ই-মেইল:</strong> ${info.email || 'satkhiragovtcollege@yahoo.com'}</p>
            <hr>
            <p><strong>প্রতিষ্ঠিত:</strong> ${info.established || '১৯৪৬'}</p>
            <p><strong>জাতীয়করণ:</strong> ${info.nationalization || '১৯৮০'}</p>
            <p><strong>মোট জমি:</strong> ${info.land || '২৭ একর (প্রায়)'}</p>
            <p><strong>সর্বমোট শিক্ষার্থী:</strong> ${info.students || '১৭,০০০+'}</p>
          </div>
        </div>
        <div class="col-md-6">
          <h4 style="color:#003366;border-bottom:2px solid #ffcc00;padding-bottom:10px;">🗺️ অবস্থান</h4>
          <div style="margin-top:15px;">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.524398992692!2d89.068459!3d22.717849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff54bb1c5b1e7d%3A0x8c5e5b5b5b5b5b5b!2sSatkhira%20Government%20College!5e0!3m2!1sen!2sbd!4v1" 
              width="100%" height="400" style="border:2px solid #ddd;border-radius:8px;" 
              allowfullscreen="" loading="lazy">
            </iframe>
          </div>
        </div>
      </div>
    `;
  } catch(e) {
    container.innerHTML = '<p style="color:red;">যোগাযোগের তথ্য লোড করতে সমস্যা হয়েছে।</p>';
  }
}

// ============================================================
// এক নজরে পৃষ্ঠা
// ============================================================
function renderAtAGlancePage() {
  const container = document.getElementById('atAGlanceContent');
  if (!container) return;

  container.innerHTML = `
    <h3 style="color:#003366;text-align:center;margin-bottom:25px;">🏛️ সাতক্ষীরা সরকারি কলেজ, সাতক্ষীরা</h3>
    <div class="table-wrap">
      <table class="data-table">
        <tbody>
          <tr><td style="font-weight:600;width:250px;">📅 স্থাপিত</td><td>১৯৪৬ খ্রি.</td></tr>
          <tr><td style="font-weight:600;">🏛️ জাতীয়করণ</td><td>১৯৮০ খ্রি.</td></tr>
          <tr><td style="font-weight:600;">🗺️ মোট জমির পরিমাণ</td><td>২৭ একর (প্রায়)</td></tr>
          <tr><td style="font-weight:600;">📚 বিভাগ</td><td>১৬ টি</td></tr>
          <tr><td style="font-weight:600;">🎓 স্নাতক(সম্মান) কোর্স চালু</td><td>১৬ টি বিষয় (অর্থনীতি, ইংরেজি, বাংলা, রাষ্ট্রবিজ্ঞান, দর্শন, ইতিহাস, ইসলামের ইতিহাস ও সংস্কৃতি, ইসলামি শিক্ষা, গণিত, পদার্থবিজ্ঞান, রসায়ন, উদ্ভিদবিদ্যা, প্রাণিবিদ্যা, ভূগোল ও পরিবেশ, ব্যবস্থাপনা, ও হিসাববিজ্ঞান)</td></tr>
          <tr><td style="font-weight:600;">🎓 স্নাতকোত্তর শেষ পর্ব চালু</td><td>১৫ টি বিষয়</td></tr>
          <tr><td style="font-weight:600;">🎓 স্নাতকোত্তর ১ম পর্ব চালু</td><td>০৬ টি বিষয়</td></tr>
          <tr><td style="font-weight:600;">👨‍🎓 মোট শিক্ষার্থী</td><td>১৭০০০ (প্রায়)</td></tr>
          <tr><td style="font-weight:600;">👔 সৃষ্ট পদ</td><td>৮৩</td></tr>
          <tr><td style="font-weight:600;">👔 কর্মরত কর্মকর্তা</td><td>৭২</td></tr>
          <tr><td style="font-weight:600;">📭 শুন্য পদ</td><td>১১</td></tr>
          <tr><td style="font-weight:600;">💻 কম্পিউটার ল্যাব</td><td>০২ টি</td></tr>
          <tr><td style="font-weight:600;">📺 ডিজিটাল মাল্টিমিডিয়া ক্লাস রুম</td><td>১৬ টি</td></tr>
          <tr><td style="font-weight:600;">📖 কেন্দ্রীয় লাইব্রেরিতে বইয়ের সংখ্যা</td><td>৩০ হাজার (প্রায়)</td></tr>
          <tr><td style="font-weight:600;">📖 সেমিনার লাইব্রেরিতে বইয়ের সংখ্যা</td><td>১৬ হাজার (প্রায়)</td></tr>
        </tbody>
      </table>
    </div>
  `;
}

// ============================================================
// ইতিহাস পৃষ্ঠা
// ============================================================
function renderHistoryPage() {
  const container = document.getElementById('historyContent');
  if (!container) return;

  container.innerHTML = `
    <h3 style="color:#003366;margin-bottom:20px;">📜 কলেজের ইতিহাস</h3>
    <div style="font-size:15px;line-height:1.9;text-align:justify;">
      <p>ব্রিটিশ আমলে সাতক্ষীরায় উচ্চ শিক্ষার জন্য কোন কলেজ স্থাপিত হয়নি। উচ্চ শিক্ষা লাভের জন্য সাতক্ষীরা এলাকার শিক্ষার্থীরা খুলনা, বাগেরহাট ও পার্শ্ববর্তী কলকাতায় যেত।</p>
      
      <p>সাতক্ষীরা মহকুমা প্রশাসক পি.সি মজুমদার (১৯৩৬-১৯৪০) এর সময়ে সাতক্ষীরা পৌরসভার চেয়ারম্যান লীলাপদ মজুমদার, আব্দুল বারী খান, নিরোধ চ্যাটার্জী, আব্দুর রউফ খান, আব্দুল হাফিজ খান, মীর আহম্মদ আলী সহ সাতক্ষীরা শহরের কতিপয় বিদ্দ্যোৎসাহী ব্যক্তি সাতক্ষীরায় একটি কলেজ স্থাপনের সিদ্ধান্ত নেন এবং ১৯৪৬ সালের ফেব্রুয়ারীর ১ম সপ্তাহে সুলতান আহমেদ মহকুমা প্রশাসকের দায়িত্ব নিয়ে সাতক্ষীরায় আসেন।</p>
      
      <p>তাকে কলেজ সম্পর্কে অভিহিত করা হলে তিনি কলেজ স্থাপনের উপর গুরুত্ব দেন এবং পূর্বের কমিটিতে এম.এ গফুর, আব্দুল বারী খান এবং অরবিন্দু নাথ মহোদয়বৃন্দকে সদস্য হিসেবে অন্তর্ভুক্ত করেন। কলকাতা বিশ্ববিদ্যালয়ের অধ্যাপক ও কলেজ প্রতিষ্ঠা কমিটির অন্যতম সদস্য হরিচন্দ্র ঘোষের বিশেষ উদ্দ্যোগে ও অক্লান্ত প্রচেষ্টায় ১৯৪৬-৪৭ শিক্ষাবর্ষে কেবল উচ্চ মাধ্যমিক মানবিক ও বাণিজ্য বিভাগ খোলার অনুমোদন লাভ করে।</p>
      
      <p>১৯৫০-৫১ শিক্ষাবর্ষ হতে উচ্চ মাধ্যমিক বিজ্ঞান ও স্নাতক কলা বিভাগ খোলার অনুমোদন লাভ করে। ১৯৬৫ সালে কলেজে স্নাতক বাণিজ্য বিভাগ খোলার অনুমোদন পেলে ১৯৬৬ সালে ডিগ্রী বাণিজ্য নতুন ভবনে স্থানান্তরিত করা হয়।</p>
      
      <p>১৯৬৯-৭০ শিক্ষাবর্ষে স্নাতক বিজ্ঞান বিভাগ খোলা হলে সেখান থেকে সাতক্ষীরা কলেজ একটি পূর্ণাঙ্গ স্নাতক পর্যায়ের কলেজে হিসেবে আত্মপ্রকাশ করে। এরপর কলেজটি <strong>১৯৮০ সালে জাতীয়করণ</strong> করা হয়।</p>
    </div>
  `;
}

// ============================================================
// একাডেমিক পৃষ্ঠা
// ============================================================
function renderAcademicPage() {
  const container = document.getElementById('academicContent');
  if (!container) return;

  container.innerHTML = `
    <h3 style="color:#003366;margin-bottom:20px;">📚 একাডেমিক তথ্য</h3>
    
    <div style="margin-bottom:25px;">
      <h5 style="color:#004080;border-left:4px solid #ffcc00;padding-left:12px;">🎓 স্নাতক (সম্মান) কোর্স</h5>
      <p style="margin-top:10px;font-size:14px;line-height:1.8;">অর্থনীতি, ইংরেজি, বাংলা, রাষ্ট্রবিজ্ঞান, দর্শন, ইতিহাস, ইসলামের ইতিহাস ও সংস্কৃতি, ইসলামি শিক্ষা, গণিত, পদার্থবিজ্ঞান, রসায়ন, উদ্ভিদবিদ্যা, প্রাণিবিদ্যা, ভূগোল ও পরিবেশ, ব্যবস্থাপনা, হিসাববিজ্ঞান</p>
    </div>
    
    <div style="margin-bottom:25px;">
      <h5 style="color:#004080;border-left:4px solid #ffcc00;padding-left:12px;">🎓 স্নাতকোত্তর কোর্স</h5>
      <p style="margin-top:10px;font-size:14px;line-height:1.8;">অর্থনীতি, ইংরেজি, বাংলা, রাষ্ট্রবিজ্ঞান, দর্শন, ইতিহাস, ইসলামের ইতিহাস ও সংস্কৃতি, গণিত, পদার্থবিজ্ঞান, রসায়ন, উদ্ভিদবিদ্যা, প্রাণিবিদ্যা, ভূগোল ও পরিবেশ, ব্যবস্থাপনা, হিসাববিজ্ঞান</p>
    </div>
    
    <div style="margin-bottom:25px;">
      <h5 style="color:#004080;border-left:4px solid #ffcc00;padding-left:12px;">📖 উচ্চ মাধ্যমিক শাখা</h5>
      <p style="margin-top:10px;font-size:14px;line-height:1.8;">বিজ্ঞান, মানবিক, বাণিজ্য</p>
    </div>
  `;
}

// ============================================================
// ভর্তি পৃষ্ঠা
// ============================================================
function renderAdmissionPage() {
  const container = document.getElementById('admissionContent');
  if (!container) return;

  container.innerHTML = `
    <h3 style="color:#003366;margin-bottom:20px;">📝 ভর্তি তথ্য</h3>
    
    <p style="font-size:15px;line-height:1.8;text-align:justify;">
      সাতক্ষীরা সরকারি কলেজে উচ্চ মাধ্যমিক, স্নাতক (সম্মান) ও স্নাতকোত্তর পর্যায়ে ভর্তি কার্যক্রম 
      <strong>জাতীয় বিশ্ববিদ্যালয়</strong> ও <strong>মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, যশোর</strong> এর 
      নির্দেশনা অনুযায়ী অনুষ্ঠিত হয়।
    </p>
    
    <div style="margin-top:25px;">
      <h5 style="color:#004080;border-left:4px solid #ffcc00;padding-left:12px;">🔗 গুরুত্বপূর্ণ লিংক</h5>
      <ul style="margin-top:10px;font-size:14px;line-height:2;">
        <li><a href="http://app1.nu.edu.bd/" target="_blank" style="color:#004080;font-weight:600;">জাতীয় বিশ্ববিদ্যালয় ভর্তি পোর্টাল</a></li>
        <li><a href="http://www.jessoreboard.gov.bd/" target="_blank" style="color:#004080;font-weight:600;">মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, যশোর</a></li>
        <li><a href="http://www.dshe.gov.bd/" target="_blank" style="color:#004080;font-weight:600;">মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর</a></li>
        <li><a href="http://www.nu.edu.bd/" target="_blank" style="color:#004080;font-weight:600;">জাতীয় বিশ্ববিদ্যালয়</a></li>
      </ul>
    </div>
    
    <div style="margin-top:25px;background:#f0f7ff;padding:15px;border-radius:5px;border-left:4px solid #004080;">
      <p style="margin:0;font-size:14px;color:#555;">
        💡 ভর্তি সংক্রান্ত যেকোনো তথ্যের জন্য কলেজ অফিসে যোগাযোগ করুন।
      </p>
    </div>
  `;
}
