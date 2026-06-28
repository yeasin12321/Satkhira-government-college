// ============================================================
// DATA LAYER - সার্ভার API ব্যবহার করে (সব ইউজারের জন্য কমন)
// ============================================================

const API_BASE = '/api';

// ===== API কল ফাংশন =====
async function apiGet(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    return await res.json();
  } catch(e) {
    console.error('API Error:', e);
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
    return await res.json();
  } catch(e) {
    console.error('API Error:', e);
    return null;
  }
}

async function apiDelete(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer admin123' }
    });
    return await res.json();
  } catch(e) {
    console.error('API Error:', e);
    return null;
  }
}

// ===== ডাটা ফাংশন =====
let cachedData = null;

async function loadData() {
  const data = await apiGet('/data');
  if (data) {
    cachedData = data;
    return data;
  }
  return cachedData || {};
}

function getData(key) {
  return cachedData ? cachedData[key] : null;
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
  await apiPost('/data/notices', { value: notices });
  cachedData.notices = notices;
  return notices;
}

async function deleteNotice(id) {
  await apiDelete(`/notice/${id}`);
  const data = await loadData();
  return data.notices || [];
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
  await apiPost('/data/teachers', { value: teachers });
  cachedData.teachers = teachers;
  return teachers;
}

async function deleteTeacher(index) {
  let teachers = await getTeachers();
  teachers.splice(index, 1);
  teachers.forEach((t, i) => t.sl = i + 1);
  await apiPost('/data/teachers', { value: teachers });
  cachedData.teachers = teachers;
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
  await apiPost('/data/gallery', { value: gallery });
  cachedData.gallery = gallery;
  return gallery;
}

async function deleteGallery(index) {
  let gallery = await getGallery();
  gallery.splice(index, 1);
  await apiPost('/data/gallery', { value: gallery });
  cachedData.gallery = gallery;
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
  await apiPost('/data/importantLinks', { value: links });
  cachedData.importantLinks = links;
  return links;
}

async function deleteLink(index) {
  let links = await getLinks();
  links.splice(index, 1);
  await apiPost('/data/importantLinks', { value: links });
  cachedData.importantLinks = links;
  return links;
}

// ===== মেসেজ =====
async function getPrincipalMessage() {
  const data = await loadData();
  return data.principalMessage || '';
}

async function getVicePrincipalMessage() {
  const data = await loadData();
  return data.vicePrincipalMessage || '';
}

async function saveMessage(key, value) {
  await apiPost(`/data/${key}`, { value });
  if (cachedData) cachedData[key] = value;
}

// ===== সাইট ইনফো =====
async function getSiteInfo() {
  const data = await loadData();
  return data.siteInfo || {};
}

async function saveSiteInfo(info) {
  await apiPost('/data/siteInfo', { value: info });
  if (cachedData) cachedData.siteInfo = info;
}

// ===== প্রিন্সিপাল/ভাইস প্রিন্সিপাল ইনফো =====
async function getPrincipalInfo() {
  const data = await loadData();
  return data.principalInfo || {};
}

async function getVicePrincipalInfo() {
  const data = await loadData();
  return data.vicePrincipalInfo || {};
}

// প্রথম লোডে ডাটা লোড করুন
document.addEventListener('DOMContentLoaded', () => {
  loadData();
});
