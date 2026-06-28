const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const DATA_FILE = path.join(__dirname, 'data.json');

// ডাটা ফাইল না থাকলে ডিফল্ট ডাটা তৈরি করুন
function initDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    const defaultData = {
      notices: [
        { id: 1, date: 'March 2, 2026', title: 'সাতক্ষীরা সরকারি কলেজের ২০২৬ সালের উচ্চ মাধ্যমিক (HSC) পরীক্ষার নিয়মিত পরীক্ষার্থীর ফরমপূরণের ফরম', link: '#' },
        { id: 2, date: 'March 2, 2026', title: 'সাতক্ষীরা সরকারি কলেজের ২০২৬ সালের উচ্চ মাধ্যমিক (HSC) পরীক্ষার অনিয়মিত পরীক্ষার্থীর ফরমপূরণের ফরম', link: '#' },
        { id: 3, date: 'March 1, 2026', title: 'ব্যবস্থাপনা বিভাগের প্রভাষক জনাব কাজী সাহাদ হোসেন এর আন্তর্জাতিক পাসপোর্ট করার নিমিত্তে বিভাগীয় অনাপত্তি পত্র', link: '#' },
        { id: 4, date: 'February 23, 2026', title: '২০২৪-২০২৫ শিক্ষাবর্ষের দ্বাদশ নির্বাচনী পরীক্ষা-২০২৬ এর বিজ্ঞান বিভাগের ফলাফল', link: '#' },
        { id: 5, date: 'February 23, 2026', title: '২০২৪-২০২৫ শিক্ষাবর্ষের দ্বাদশ নির্বাচনী পরীক্ষা-২০২৬ এর মানবিক বিভাগের ফলাফল', link: '#' }
      ],
      principalMessage: 'সভ্যতার বিকাশ ও ধারাবাহিকতা রক্ষায় শিক্ষার কোনো বিকল্প নেই। জ্ঞান-বিজ্ঞান ও প্রযুক্তির এই উন্মত্ত প্রতিযোগিতার যুগে একটি জাতিকে টিকিয়ে রাখতে পারে শুধুমাত্র শিক্ষিত ও সুনাগরিক জনগোষ্ঠী। সাতক্ষীরা সরকারি কলেজ দেশের প্রাচীন ও ঐতিহ্যবাহী বিদ্যাপীঠ গুলোর মধ্যে অন্যতম।',
      vicePrincipalMessage: 'সাতক্ষীরা সরকারি কলেজ বাংলাদেশের দক্ষিণাঞ্চলের খুলনা বিভাগের সাতক্ষীরা জেলা শহরের রাজারবাগান এলাকায় অবস্থিত একটি স্নাতকোত্তর শিক্ষা প্রতিষ্ঠান।',
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
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
  }
}

initDataFile();

// API Route: সব ডাটা আনা
app.get('/api/data', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: 'Data read error' });
  }
});

// API Route: ডাটা আপডেট (অ্যাডমিন থেকে)
app.post('/api/data/:key', (req, res) => {
  try {
    const key = req.params.key;
    const value = req.body.value;
    
    // অ্যাডমিন অথেন্টিকেশন
    const auth = req.headers.authorization;
    if (!auth || auth !== 'Bearer admin123') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    data[key] = value;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, key, message: `${key} updated successfully` });
  } catch(e) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// API Route: নোটিশ ডিলিট
app.delete('/api/notice/:id', (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || auth !== 'Bearer admin123') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const id = parseInt(req.params.id);
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    data.notices = data.notices.filter(n => n.id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, message: 'Notice deleted' });
  } catch(e) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// সব রিকোয়েস্ট index.html-এ পাঠিয়ে দিন (SPA fallback)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return;
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
