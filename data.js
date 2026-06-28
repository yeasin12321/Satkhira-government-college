// ============================================================
// DATA LAYER - হাইব্রিড মোড (API + লোকালস্টোরেজ ফলব্যাক)
// API কাজ করলে সার্ভার থেকে, না করলে localStorage থেকে ডাটা
// ============================================================

const API_BASE = '/api';

// ===== ডিফল্ট ডাটা =====
function getDefaultData() {
  return {
    notices: [
      { id: 1, date: 'March 2, 2026', title: 'সাতক্ষীরা সরকারি কলেজের ২০২৬ সালের উচ্চ মাধ্যমিক (HSC) পরীক্ষার নিয়মিত পরীক্ষার্থীর ফরমপূরণের ফরম', link: '#' },
      { id: 2, date: 'March 2, 2026', title: 'সাতক্ষীরা সরকারি কলেজের ২০২৬ সালের উচ্চ মাধ্যমিক (HSC) পরীক্ষার অনিয়মিত পরীক্ষার্থীর ফরমপূরণের ফরম', link: '#' },
      { id: 3, date: 'March 1, 2026', title: 'ব্যবস্থাপনা বিভাগের প্রভাষক জনাব কাজী সাহাদ হোসেন এর আন্তর্জাতিক পাসপোর্ট করার নিমিত্তে বিভাগীয় অনাপত্তি পত্র', link: '#' },
      { id: 4, date: 'February 23, 2026', title: '২০২৪-২০২৫ শিক্ষাবর্ষের দ্বাদশ নির্বাচনী পরীক্ষা-২০২৬ এর বিজ্ঞান বিভাগের ফলাফল', link: '#' },
      { id: 5, date: 'February 23, 2026', title: '২০২৪-২০২৫ শিক্ষাবর্ষের দ্বাদশ নির্বাচনী পরীক্ষা-২০২৬ এর মানবিক বিভাগের ফলাফল', link: '#' }
    ],
    principalMessage: 'সভ্যতার বিকাশ ও ধারাবাহিকতা রক্ষায় শিক্ষার কোনো বিকল্প নেই। জ্ঞান-বিজ্ঞান ও প্রযুক্তির এই উন্মত্ত প্রতিযোগিতার যুগে একটি জাতিকে টিকিয়ে রাখতে পারে শুধুমাত্র শিক্ষিত ও সুনাগরিক জনগোষ্ঠী। সাতক্ষীরা সরকারি কলেজ দেশের প্রাচীন ও ঐতিহ্যবাহী বিদ্যাপীঠ গুলোর মধ্যে অন্যতম। এই প্রতিষ্ঠান থেকে শিক্ষা গ্রহণ করে বর্তমানে দেশের বিভিন্ন গুরুত্বপূর্ণ প্রতিষ্ঠান সমূহে নিজেদের যোগ্যতার স্বাক্ষর রেখে যাচ্ছে। এ প্রচেষ্টায় আমি সাতক্ষীরা সরকারি কলেজ পরিবারের পক্ষ থেকে সকলের প্রতি শুভকামনা রইল।',
    vicePrincipalMessage: 'সাতক্ষীরা সরকারি কলেজ বাংলাদেশের দক্ষিণাঞ্চলের খুলনা বিভাগের সাতক্ষীরা জেলা শহরের রাজারবাগান এলাকায় অবস্থিত একটি স্নাতকোত্তর শিক্ষা প্রতিষ্ঠান। এই কলেজটি বাংলাদেশ জাতীয় বিশ্ববিদ্যালয়ের অধিভুক্ত এবং সাতক্ষীরা জেলার প্রথম উচ্চ শিক্ষা প্রতিষ্ঠান। প্রায় পনের হাজারের অধিক শিক্ষার্থী এই কলেজে লেখাপড়া করে। এই কলেজ থেকে শিক্ষা গ্রহণ করে অনেকেই বিসিএস সহ অন্যান্য সরকারি চাকুরি, এবং দেশের খ্যাতনামা প্রতিষ্ঠানে কর্মরত আছেন।',
    teachers: [
      { sl: 1, name: 'প্রফেসর মোঃ আবুল হাশেম', designation: 'অধ্যক্ষ', bcs: '১৪শ', subject: 'হিসাববিজ্ঞান', phone: '০১৭২০-৫২৬০৫৫', photo: 'https://www.satkhiragovtcollege.edu.bd/wp-content/uploads/2017/09/MD.-ABUL-HASHEM-scaled.jpg' },
      { sl: 2, name: 'প্রফেসর মোহাঃ আল মুস্তানছির বিল্যাহ', designation: 'উপাধ্যক্ষ', bcs: '১৬শ', subject: 'ইসলামের ইতিহাস ও সংস্কৃতি', phone: '০১৭১২-৪৭২৭১৩', photo: 'https://www.satkhiragovtcollege.edu.bd/wp-content/uploads/2023/11/IMG_4434.jpeg' },
      { sl: 3, name: 'প্রফেসর মোঃ মোস্তাজাবুর রহমান', designation: 'অধ্যাপক', bcs: '১৮শ', subject: 'ব্যবস্থাপনা', phone: '০১৭২০-৫২৪৯৮২', photo: '' },
      { sl: 4, name: 'প্রফেসর ড. মোঃ আব্দুল জব্বার', designation: 'অধ্যাপক (ইনসিটু)', bcs: '২০তম', subject: 'দর্শন', phone: '০১৭১৬-৩৬২২০৬', photo: '' }
    ],
    gallery: [
      { src: 'https://www.satkhiragovtcollege.edu.bd/wp-content/uploads/2023/11/IMG_4434.jpeg', caption: 'সাতক্ষীরা সরকারি কলেজ ক্যাম্পাস' },
      { src: 'https://www.satkhiragovtcollege.edu.bd/wp-content/uploads/2022/06/IMG-20220628-WA0013-1-1024x499.jpg', caption: 'কলেজ ভবন' }
    ],
    importantLinks: [
      { title: 'শিক্ষা মন্ত্রণালয়', url: 'http://shed.portal.gov.bd/' },
      { title: 'মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর', url: 'http://www.dshe.gov.bd/' },
      { title: 'মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, যশোর', url: 'http://www.jessoreboard.gov.bd/' },
      { title: 'জাতীয় বিশ্ববিদ্যালয়', url: 'http://www.nu.edu.bd/' },
      { title: 'শিক্ষক বাতায়ন', url: 'http://www.teachers.gov.bd/' },
      { title: 'বিজি প্রেস', url: 'http://www.dpp.gov.bd/bgpress/index.php' },
      { title: 'জনপ্রশাসন মন্ত্রণালয়', url: 'http://www.mopa.gov.bd/en' },
      { title: 'বাংলাদেশ সরকারি কর্ম কমিশন', url: 'http://www.bpsc.gov.bd/' },
      { title: 'জাতীয় বিশ্ববিদ্যালয় ভর্তি', url: 'http://app1.nu.edu.bd/' }
    ],
    principalInfo: {
      name: 'প্রফেসর মোঃ আবুল হাশেম',
      bcs: '১৪শ বিসিএস',
      subject: 'হিসাববিজ্ঞান',
      designation: 'অধ্যক্ষ',
      photo: 'https://www.satkhiragovtcollege.edu.bd/wp-content/uploads/2017/09/MD.-ABUL-HASHEM-150x150.jpg'
    },
    vicePrincipalInfo: {
      name: 'প্রফেসর মোহাঃ আল মুস্তানছির বিল্যাহ',
      bcs: '১৬শ বিসিএস',
      subject: 'ইসলামের ইতিহাস ও সংস্কৃতি',
      designation: 'উপাধ্যক্ষ',
      photo: 'https://www.satkhiragovtcollege.edu.bd/wp-content/uploads/2023/11/IMG_4434.jpeg'
    },
    siteInfo: {
      name: 'সাতক্ষীরা সরকারি কলেজ',
      nameEn: 'Satkhira Government College',
      subtitle: 'জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত | Est: 1946',
      address: 'রাজারবাগান, ওয়ার্ড নংঃ ০২, সাতক্ষীরা পৌরসভা, সাতক্ষীরা',
      phoneOffice: '০২৪৭৭৭৪১০৭৯',
      phonePrincipal: '০১৭২০৫২৬০৫৫',
      phoneVicePrincipal: '০১৭১২৪৭২৭১৩',
      email: 'satkhiragovtcollege@yahoo.com',
      established: '১৯৪৬',
      nationalization: '১৯৮০',
      land: '২৭ একর (প্রায়)',
      departments: '১৬ টি',
      students: '১৭,০০০+'
    }
  };
}

// ===== লোকাল ডাটা ম্যানেজমেন্ট (সবসময় কাজ করবে) =====
function initLocalData() {
  if (!localStorage.getItem('sgc_init_done')) {
    const defaults = getDefaultData();
    localStorage.setItem('sgc_init_done', 'true');
    Object.keys(defaults).forEach(key => {
      try {
        const existing = localStorage.getItem('sgc_' + key);
        if (!existing) {
          localStorage.setItem('sgc_' + key, JSON.stringify(defaults[key]));
        }
      } catch(e) {}
    });
  }
}

function getLocalData(key) {
  try {
    const val = localStorage.getItem('sgc_' + key);
    if (val) return JSON.parse(val);
  } catch(e) {}
  return null;
}

function setLocalData(key, val) {
  try {
    localStorage.setItem('sgc_' + key, JSON.stringify(val));
  } catch(e) {}
}

// ===== API কল (যদি কাজ করে) =====
async function apiGet(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) return null;
    return await res.json();
  } catch(e) {
    return null;
  }
}

async function apiPost(path, data) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer admin123'
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) return null;
    return await res.json();
  } catch(e) {
    return null;
  }
}

async function apiDelete(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer admin123' }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch(e) {
    return null;
  }
}

// ===== মেইন লোড ফাংশন =====
let allData = null;

async function loadData(forceRefresh = false) {
  initLocalData();
  
  // API থেকে লোড করার চেষ্টা
  try {
    const apiData = await apiGet('/data');
    if (apiData) {
      allData = apiData;
      // API ডাটা localStorage-এও ব্যাকআপ করুন
      Object.keys(apiData).forEach(key => {
        setLocalData(key, apiData[key]);
      });
      return apiData;
    }
  } catch(e) {}
  
  // API কাজ না করলে localStorage থেকে লোড
  const defaults = getDefaultData();
  const data = {};
  Object.keys(defaults).forEach(key => {
    data[key] = getLocalData(key) || defaults[key];
  });
  allData = data;
  return data;
}

function getData(key) {
  if (allData && allData[key]) return allData[key];
  return getLocalData(key) || getDefaultData()[key];
}

// ===== নোটিশ CRUD =====
async function getNotices() {
  const data = await loadData();
  return data.notices || [];
}

async function addNotice(notice) {
  const notices = await getNotices();
  notice.id = Date.now();
  notices.unshift(notice);
  setLocalData('notices', notices);
  if (allData) allData.notices = notices;
  
  // API-তেও পাঠান (if available)
  await apiPost('/data/notices', { value: notices });
  
  return notices;
}

async function deleteNotice(id) {
  let notices = await getNotices();
  notices = notices.filter(n => n.id !== id);
  setLocalData('notices', notices);
  if (allData) allData.notices = notices;
  
  await apiDelete(`/notice/${id}`);
  
  return notices;
}

// ===== টিচার CRUD =====
async function getTeachers() {
  const data = await loadData();
  return data.teachers || [];
}

async function addTeacher(teacher) {
  const teachers = await getTeachers();
  teacher.sl = teachers.length + 1;
  teachers.push(teacher);
  setLocalData('teachers', teachers);
  if (allData) allData.teachers = teachers;
  await apiPost('/data/teachers', { value: teachers });
  return teachers;
}

async function deleteTeacher(index) {
  let teachers = await getTeachers();
  teachers.splice(index, 1);
  teachers.forEach((t, i) => t.sl = i + 1);
  setLocalData('teachers', teachers);
  if (allData) allData.teachers = teachers;
  await apiPost('/data/teachers', { value: teachers });
  return teachers;
}

// ===== গ্যালারি CRUD =====
async function getGallery() {
  const data = await loadData();
  return data.gallery || [];
}

async function addGalleryItem(item) {
  const gallery = await getGallery();
  gallery.push(item);
  setLocalData('gallery', gallery);
  if (allData) allData.gallery = gallery;
  await apiPost('/data/gallery', { value: gallery });
  return gallery;
}

async function deleteGallery(index) {
  let gallery = await getGallery();
  gallery.splice(index, 1);
  setLocalData('gallery', gallery);
  if (allData) allData.gallery = gallery;
  await apiPost('/data/gallery', { value: gallery });
  return gallery;
}

// ===== লিংক CRUD =====
async function getLinks() {
  const data = await loadData();
  return data.importantLinks || [];
}

async function addLink(link) {
  const links = await getLinks();
  links.push(link);
  setLocalData('importantLinks', links);
  if (allData) allData.importantLinks = links;
  await apiPost('/data/importantLinks', { value: links });
  return links;
}

async function deleteLink(index) {
  let links = await getLinks();
  links.splice(index, 1);
  setLocalData('importantLinks', links);
  if (allData) allData.importantLinks = links;
  await apiPost('/data/importantLinks', { value: links });
  return links;
}

// ===== মেসেজ =====
async function saveMessage(key, value) {
  setLocalData(key, value);
  if (allData) allData[key] = value;
  await apiPost(`/data/${key}`, { value });
}

// ===== সাইট ইনফো =====
async function getSiteInfo() {
  const data = await loadData();
  return data.siteInfo || {};
}

async function saveSiteInfo(info) {
  setLocalData('siteInfo', info);
  if (allData) allData.siteInfo = info;
  await apiPost('/data/siteInfo', { value: info });
}

// ===== প্রিন্সিপাল ইনফো =====
async function getPrincipalInfo() {
  const data = await loadData();
  return data.principalInfo || {};
}

async function getVicePrincipalInfo() {
  const data = await loadData();
  return data.vicePrincipalInfo || {};
}

// ===== ইনিশিয়ালাইজ =====
initLocalData();
document.addEventListener('DOMContentLoaded', () => {
  loadData();
});
