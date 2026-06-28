// ============================================================
// DEFAULT DATA - Satkhira Government College Clone
// All data is stored in localStorage for CRUD operations
// ============================================================

const DEFAULTS = {
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
  },

  principalMessage: `সভ্যতার বিকাশ ও ধারাবাহিকতা রক্ষায় শিক্ষার কোনো বিকল্প নেই। জ্ঞান-বিজ্ঞান ও প্রযুক্তির এই উন্মত্ত প্রতিযোগিতার যুগে একটি জাতিকে টিকিয়ে রাখতে পারে শুধুমাত্র শিক্ষিত ও সুনাগরিক জনগোষ্ঠী। সাতক্ষীরা সরকারি কলেজ দেশের প্রাচীন ও ঐতিহ্যবাহী বিদ্যাপীঠ গুলোর মধ্যে অন্যতম। এই প্রতিষ্ঠান থেকে শিক্ষা গ্রহণ করে বর্তমানে দেশের বিভিন্ন গুরুত্বপূর্ণ প্রতিষ্ঠান সমূহে নিজেদের যোগ্যতার স্বাক্ষর রেখে যাচ্ছে। এ প্রচেষ্টায় আমি সাতক্ষীরা সরকারি কলেজ পরিবারের পক্ষ থেকে সকলের প্রতি শুভকামনা রইল।`,

  vicePrincipalMessage: `সাতক্ষীরা সরকারি কলেজ বাংলাদেশের দক্ষিণাঞ্চলের খুলনা বিভাগের সাতক্ষীরা জেলা শহরের রাজারবাগান এলাকায় অবস্থিত একটি স্নাতকোত্তর শিক্ষা প্রতিষ্ঠান। এই কলেজটি বাংলাদেশ জাতীয় বিশ্ববিদ্যালয়ের অধিভুক্ত এবং সাতক্ষীরা জেলার প্রথম উচ্চ শিক্ষা প্রতিষ্ঠান। প্রায় পনের হাজারের অধিক শিক্ষার্থী এই কলেজে লেখাপড়া করে। এই কলেজ থেকে শিক্ষা গ্রহণ করে অনেকেই বিসিএস সহ অন্যান্য সরকারি চাকুরি, এবং দেশের খ্যাতনামা প্রতিষ্ঠানে কর্মরত আছেন।`,

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

  notices: [
    { id: 1, date: 'March 2, 2026', title: 'সাতক্ষীরা সরকারি কলেজের ২০২৬ সালের উচ্চ মাধ্যমিক (HSC) পরীক্ষার নিয়মিত পরীক্ষার্থীর ফরমপূরণের ফরম', link: '#' },
    { id: 2, date: 'March 2, 2026', title: 'সাতক্ষীরা সরকারি কলেজের ২০২৬ সালের উচ্চ মাধ্যমিক (HSC) পরীক্ষার অনিয়মিত পরীক্ষার্থীর ফরমপূরণের ফরম', link: '#' },
    { id: 3, date: 'March 1, 2026', title: 'ব্যবস্থাপনা বিভাগের প্রভাষক জনাব কাজী সাহাদ হোসেন এর আন্তর্জাতিক পাসপোর্ট করার নিমিত্তে বিভাগীয় অনাপত্তি পত্র', link: '#' },
    { id: 4, date: 'February 23, 2026', title: '২০২৪-২০২৫ শিক্ষাবর্ষের দ্বাদশ নির্বাচনী পরীক্ষা-২০২৬ এর বিজ্ঞান বিভাগের ফলাফল', link: '#' },
    { id: 5, date: 'February 23, 2026', title: '২০২৪-২০২৫ শিক্ষাবর্ষের দ্বাদশ নির্বাচনী পরীক্ষা-২০২৬ এর মানবিক বিভাগের ফলাফল', link: '#' }
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

  teachers: [
    { sl: 1, name: 'প্রফেসর মোঃ আবুল হাশেম', designation: 'অধ্যক্ষ', bcs: '১৪শ', subject: 'হিসাববিজ্ঞান', phone: '০১৭২০-৫২৬০৫৫', photo: 'https://www.satkhiragovtcollege.edu.bd/wp-content/uploads/2017/09/MD.-ABUL-HASHEM-scaled.jpg' },
    { sl: 2, name: 'প্রফেসর মোহাঃ আল মুস্তানছির বিল্যাহ', designation: 'উপাধ্যক্ষ', bcs: '১৬শ', subject: 'ইসলামের ইতিহাস ও সংস্কৃতি', phone: '০১৭১২-৪৭২৭১৩', photo: 'https://www.satkhiragovtcollege.edu.bd/wp-content/uploads/2023/11/IMG_4434.jpeg' },
    { sl: 3, name: 'প্রফেসর মোঃ মোস্তাজাবুর রহমান', designation: 'অধ্যাপক', bcs: '১৮শ', subject: 'ব্যবস্থাপনা', phone: '০১৭২০-৫২৪৯৮২', photo: '' },
    { sl: 4, name: 'প্রফেসর ড. মোঃ আব্দুল জব্বার', designation: 'অধ্যাপক (ইনসিটু)', bcs: '২০তম', subject: 'দর্শন', phone: '০১৭১৬-৩৬২২০৬', photo: '' }
  ],

  gallery: [
    { src: 'https://www.satkhiragovtcollege.edu.bd/wp-content/uploads/2023/11/IMG_4434.jpeg', caption: 'সাতক্ষীরা সরকারি কলেজ ক্যাম্পাস' },
    { src: 'https://www.satkhiragovtcollege.edu.bd/wp-content/uploads/2022/06/IMG-20220628-WA0013-1-1024x499.jpg', caption: 'কলেজ ভবন' }
  ]
};

// ===== INITIALIZATION =====
function initData() {
  if (!localStorage.getItem('sgc_init')) {
    localStorage.setItem('sgc_init', 'true');
    Object.keys(DEFAULTS).forEach(key => {
      localStorage.setItem('sgc_' + key, JSON.stringify(DEFAULTS[key]));
    });
  }
}

function getData(key) {
  try {
    const val = localStorage.getItem('sgc_' + key);
    return val ? JSON.parse(val) : DEFAULTS[key];
  } catch(e) { return DEFAULTS[key]; }
}

function setData(key, val) {
  localStorage.setItem('sgc_' + key, JSON.stringify(val));
}

// ===== NOTICE CRUD =====
function getNotices() { return getData('notices'); }
function saveNotices(notices) { setData('notices', notices); }

function addNotice(notice) {
  const notices = getNotices();
  notice.id = Date.now();
  notices.unshift(notice);
  saveNotices(notices);
  return notices;
}

function deleteNotice(id) {
  let notices = getNotices();
  notices = notices.filter(n => n.id !== id);
  saveNotices(notices);
  return notices;
}

// ===== TEACHER CRUD =====
function getTeachers() { return getData('teachers'); }
function saveTeachers(teachers) { setData('teachers', teachers); }

function addTeacher(teacher) {
  const teachers = getTeachers();
  teacher.sl = teachers.length + 1;
  teachers.push(teacher);
  saveTeachers(teachers);
  return teachers;
}

function deleteTeacher(index) {
  let teachers = getTeachers();
  teachers.splice(index, 1);
  teachers.forEach((t, i) => t.sl = i + 1);
  saveTeachers(teachers);
  return teachers;
}

// ===== GALLERY CRUD =====
function getGallery() { return getData('gallery'); }
function saveGallery(gallery) { setData('gallery', gallery); }

function addGalleryItem(item) {
  const gallery = getGallery();
  gallery.push(item);
  saveGallery(gallery);
  return gallery;
}

function deleteGallery(index) {
  let gallery = getGallery();
  gallery.splice(index, 1);
  saveGallery(gallery);
  return gallery;
}

// ===== IMPORTANT LINKS CRUD =====
function getLinks() { return getData('importantLinks'); }
function saveLinks(links) { setData('importantLinks', links); }

function addLink(link) {
  const links = getLinks();
  links.push(link);
  saveLinks(links);
  return links;
}

function deleteLink(index) {
  let links = getLinks();
  links.splice(index, 1);
  saveLinks(links);
  return links;
}

// Initialize on load
initData();
