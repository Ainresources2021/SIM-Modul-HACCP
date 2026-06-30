import { Scenario, QuizQuestion, WorksheetRow, UserAnswers } from '../types';

export const SCREEN_TITLES: { [key: number]: string } = {
  1: "Pengenalan Sistem HACCP",
  2: "Struktur Pembelajaran",
  3: "Sasaran Pembelajaran",
  4: "Hasil Pembelajaran",
  5: "Aktifkan Pengetahuan Sedia Ada",
  6: "Modul 1: Apa Itu HACCP?",
  7: "Mengapa HACCP Penting?",
  8: "Modul 2: Bahaya dalam Makanan",
  9: "Aktiviti: Padankan Jenis Bahaya",
  10: "Modul 3: Langkah Permulaan HACCP",
  11: "Pasukan HACCP",
  12: "Penerangan & Kegunaan Produk",
  13: "Modul 4: Carta Alir Proses",
  14: "Aktiviti: Susun Carta Alir",
  15: "Modul 5: Tujuh Prinsip HACCP",
  16: "Aktiviti: Susun Prinsip HACCP",
  17: "Modul 6: CCP atau Bukan?",
  18: "Perbandingan PRP/GMP, CP & CCP",
  19: "Formula 3 Soalan CCP",
  20: "Aktiviti Interaktif: Tentukan CCP",
  21: "Pemantauan CCP",
  22: "Modul 7: Aktiviti Kes HACCP",
  23: "Model Jawapan Kes HACCP",
  24: "Kuiz Akhir",
  25: "Refleksi Pembelajaran",
  26: "Ringkasan Pembelajaran",
  27: "Tahniah & Tamat",
};

export const SECTIONS = [
  {
    id: 1,
    title: "Mula Di Sini",
    desc: "Orientasi pembelajaran, soalan kesediaan & refleksi awal.",
    color: "border-slate-200 bg-slate-50 text-slate-800 hover:border-blue-400",
    screens: [1, 2, 3, 4, 5]
  },
  {
    id: 2,
    title: "Modul 1: Asas HACCP",
    desc: "Memahami apa itu HACCP, singkatan nama, dan kepentingan sistem ini.",
    color: "border-slate-200 bg-slate-50 text-slate-800 hover:border-blue-400",
    screens: [6, 7]
  },
  {
    id: 3,
    title: "Modul 2: Bahaya Makanan",
    desc: "Mengenal pasti 4 jenis bahaya makanan (Biologi, Kimia, Fizikal, Radioaktif).",
    color: "border-slate-200 bg-slate-50 text-slate-800 hover:border-blue-400",
    screens: [8, 9]
  },
  {
    id: 4,
    title: "Modul 3: Langkah Permulaan",
    desc: "Membina pasukan HACCP, merangka produk & kegunaannya.",
    color: "border-slate-200 bg-slate-50 text-slate-800 hover:border-blue-400",
    screens: [10, 11, 12]
  },
  {
    id: 5,
    title: "Modul 4: Carta Alir Proses",
    desc: "Membaca, memahami, dan menyusun aliran proses pengeluaran makanan.",
    color: "border-slate-200 bg-slate-50 text-slate-800 hover:border-blue-400",
    screens: [13, 14]
  },
  {
    id: 6,
    title: "Modul 5: Tujuh Prinsip",
    desc: "Memahami dan menghafal 7 prinsip utama sistem HACCP secara berurutan.",
    color: "border-slate-200 bg-slate-50 text-slate-800 hover:border-blue-400",
    screens: [15, 16]
  },
  {
    id: 7,
    title: "Modul 6: CCP atau Bukan?",
    desc: "Fokus khas: Membezakan PRP/GMP, CP & CCP dengan formula 3 soalan.",
    color: "border-slate-200 bg-slate-50 text-slate-800 hover:border-blue-400",
    screens: [17, 18, 19, 20, 21]
  },
  {
    id: 8,
    title: "Modul 7: Aplikasi & Penilaian",
    desc: "Melengkapkan worksheet kes, kuiz akhir, dan menulis refleksi tamat.",
    color: "border-slate-200 bg-slate-50 text-slate-800 hover:border-blue-400",
    screens: [22, 23, 24, 25, 26, 27]
  }
];

export const HAZARDS = [
  {
    id: "biologi",
    title: "Bahaya Biologi",
    desc: "Melibatkan mikroorganisma hidup yang boleh menyebabkan keracunan atau penyakit.",
    examples: "Bakteria (Salmonella, E. coli), virus (Norovirus, Hepatitis A), kulat, yis dan parasit.",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50 text-emerald-950 border-emerald-200"
  },
  {
    id: "kimia",
    title: "Bahaya Kimia",
    desc: "Melibatkan bahan kimia toksik yang boleh mencemari makanan secara tidak sengaja atau semula jadi.",
    examples: "Sisa racun perosak, bahan pencuci, minyak pelincir mesin, alergen makanan (kacang, gluten, telur) dan toksin kulat.",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50 text-blue-950 border-blue-200"
  },
  {
    id: "fizikal",
    title: "Bahaya Fizikal",
    desc: "Melibatkan sebarang objek asing atau bendasing bukan makanan yang boleh mencederakan mulut atau saluran pencernaan.",
    examples: "Serpihan kaca, serpihan logam/skru, rambut, batu kecil, cebisan plastik, kuku atau plaster luka.",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50 text-amber-950 border-amber-200"
  },
  {
    id: "radioaktif",
    title: "Bahaya Radioaktif",
    desc: "Pencemaran daripada bahan nuklear atau radionuklid dalam air, udara atau tanah yang diserap makanan.",
    examples: "Bahan radioaktif dari kebocoran loji kuasa nuklear atau sisa industri berisiko.",
    color: "from-rose-500 to-red-600",
    bgLight: "bg-rose-50 text-rose-950 border-rose-200"
  }
];

export const MATCHING_ITEMS = [
  { id: "m1", label: "Salmonella dalam ayam mentah", correctCategory: "biologi" },
  { id: "m2", label: "Sisa bahan pencuci pada papan pemotong", correctCategory: "kimia" },
  { id: "m3", label: "Serpihan kaca halus dalam botol minuman", correctCategory: "fizikal" },
  { id: "m4", label: "Air tercemar bahan radioaktif berdekatan loji", correctCategory: "radioaktif" },
  { id: "m5", label: "Kacang tanah dalam makanan tanpa label amaran alergen", correctCategory: "kimia" },
  { id: "m6", label: "Rambut pekerja yang jatuh ke dalam periuk sup", correctCategory: "fizikal" },
  { id: "m7", label: "Ulat atau parasit dalam daging ikan mentah", correctCategory: "biologi" },
];

export const FLOWCHART_STEPS = [
  {
    id: 1,
    title: "Terima bahan mentah",
    hazard: "Bahan mentah rosak atau tercemar dengan bakteria, sisa kimia, atau batu.",
    control: "Pilih pembekal yang diluluskan (GMP), periksa kualiti/suhu semasa penerimaan.",
    category: "PRP/CP"
  },
  {
    id: 2,
    title: "Simpan bahan mentah",
    hazard: "Pertumbuhan bakteria jika disimpan pada suhu zon bahaya (5°C - 60°C).",
    control: "Simpan telur/mayonis dalam chiller (<5°C) dan roti di tempat kering.",
    category: "CP (Control Point)"
  },
  {
    id: 3,
    title: "Rebus telur",
    hazard: "Bakteria patogen (Salmonella) terus hidup jika tidak dimasak secukupnya.",
    control: "Pastikan telur direbus sepenuhnya pada suhu >75°C selama sekurang-kurangnya 10 minit.",
    category: "Mungkin CCP (Critical Control Point)"
  },
  {
    id: 4,
    title: "Sejukkan telur",
    hazard: "Bakteria boleh membiak semula jika telur dibiarkan terlalu lama pada suhu bilik.",
    control: "Sejukkan telur dengan segera menggunakan air bersih dan kawal masa penyejukan.",
    category: "CP (Control Point)"
  },
  {
    id: 5,
    title: "Campur inti",
    hazard: "Pencemaran silang daripada tangan pekerja, peralatan kotor, atau lalat.",
    control: "Pekerja cuci tangan, guna sarung tangan bersih, sanitasi mangkuk pencampur.",
    category: "PRP / GMP"
  },
  {
    id: 6,
    title: "Sapu inti pada roti",
    hazard: "Pencemaran silang mikrobiologi semasa penyediaan sandwich.",
    control: "Amalkan kebersihan diri yang tinggi, gunakan penyepit bersih, sediakan dengan cepat.",
    category: "PRP / GMP"
  },
  {
    id: 7,
    title: "Bungkus sandwich",
    hazard: "Kemasukan bendasing fizikal (habuk, rambut, serpihan plastik).",
    control: "Gunakan plastik lutsinar gred makanan yang bersih, buat pemeriksaan visual sebelum bungkus.",
    category: "CP (Control Point)"
  },
  {
    id: 8,
    title: "Simpan sejuk",
    hazard: "Pertumbuhan bakteria berbahaya semasa sandwich sedia dimakan sedia dipasarkan.",
    control: "Simpan sandwich sedia dimakan di dalam chiller pada suhu <5°C dengan pantauan konsisten.",
    category: "Mungkin CCP (Critical Control Point)"
  },
  {
    id: 9,
    title: "Edar / jual",
    hazard: "Suhu meningkat semasa pengedaran menyebabkan kerosakan cepat.",
    control: "Gunakan kotak pendingin berinsulasi atau lori chiller, hadkan masa jualan luar chiller.",
    category: "CP (Control Point)"
  }
];

export const PRINCIPLES = [
  {
    id: 1,
    title: "Menjalankan analisis hazard",
    desc: "Mengenal pasti bahaya biologi, kimia, fizikal atau radioaktif pada setiap langkah carta alir proses, menilai risikonya, dan menentukan langkah kawalan."
  },
  {
    id: 2,
    title: "Mengenal pasti titik kawalan kritikal (CCP)",
    desc: "Menentukan langkah proses spesifik di mana kawalan boleh dilaksanakan untuk mencegah, menghapuskan, atau mengurangkan bahaya keselamatan makanan ke tahap boleh diterima."
  },
  {
    id: 3,
    title: "Menentukan had kritikal",
    desc: "Menetapkan sempadan minimum/maksimum (contohnya suhu, masa, pH) yang memisahkan keadaan selamat (terkawal) daripada tidak selamat (tidak terkawal)."
  },
  {
    id: 4,
    title: "Mengadakan sistem pemantauan setiap CCP",
    desc: "Merancang pengukuran atau pemerhatian berjadual (What, When, Who, How) untuk memastikan setiap CCP sentiasa berada di dalam had kritikal yang ditetapkan."
  },
  {
    id: 5,
    title: "Menyediakan tindakan pembetulan",
    desc: "Menetapkan langkah-langkah segera yang mesti diambil jika pemantauan menunjukkan sesuatu CCP telah terkeluar daripada had kritikal (hilang kawalan)."
  },
  {
    id: 6,
    title: "Menetapkan prosedur pengesahan",
    desc: "Menjalankan aktiviti audit, ujian makmal, atau pemeriksaan rekod untuk membuktikan bahawa keseluruhan rancangan HACCP berfungsi dengan berkesan."
  },
  {
    id: 7,
    title: "Menyediakan sistem penyimpanan rekod",
    desc: "Menyimpan dokumentasi bertulis yang lengkap, termasuk borang pemantauan, rekod tindakan pembetulan, dan log kalibrasi sebagai bukti pematuhan keselamatan makanan."
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "Situasi 1: Memasak Ayam",
    product: "Ayam Goreng Siap Dimakan",
    step: "Menggoreng ayam dalam minyak panas",
    hazard: "Salmonella & Campylobacter (bakteria patogen) hidup jika ayam mentah tidak masak sempurna.",
    options: [
      { key: "PRP", label: "A. PRP/GMP (Program Prasyarat biasa)" },
      { key: "CP", label: "B. CP (Control Point biasa)" },
      { key: "CCP", label: "C. CCP (Critical Control Point)" }
    ],
    correctAnswer: "CCP",
    explanation: "Memasak ialah CCP kerana ini direka khusus untuk membunuh bakteria patogen ke tahap selamat. Jika gagal dan ayam kurang masak, tiada langkah haba lain selepas ini yang boleh menyelamatkannya sebelum dimakan."
  },
  {
    id: 2,
    title: "Situasi 2: Mencuci Tangan Pekerja",
    product: "Semua jenis makanan",
    step: "Pekerja membasuh tangan sebelum mengendalikan makanan",
    hazard: "Pencemaran mikroorganisma patogen daripada tangan kotor ke atas makanan sedia dimakan.",
    options: [
      { key: "PRP", label: "A. PRP/GMP (Kebersihan Asas)" },
      { key: "CP", label: "B. CP (Langkah Proses)" },
      { key: "CCP", label: "C. CCP (Critical Control Point)" }
    ],
    correctAnswer: "PRP",
    explanation: "Mencuci tangan ialah amalan kebersihan asas yang wajib bagi semua staf dapur. Ia dikategorikan sebagai Program Prasyarat (PRP/GMP). Ia menyokong keselamatan makanan, tetapi bukan satu langkah proses spesifik dalam pembuatan produk makanan itu sendiri yang dijadikan CCP."
  },
  {
    id: 3,
    title: "Situasi 3: Sos Cili - Pemeriksaan Botol Pecah",
    product: "Sos Cili dalam Botol Kaca",
    step: "Pemeriksaan visual botol kaca sebelum pengisian sos",
    hazard: "Serpihan kaca halus di dalam botol yang boleh mencederakan pengguna.",
    options: [
      { key: "CP", label: "A. CP (Control Point)" },
      { key: "CCP", label: "B. CCP (Critical Control Point)" },
      { key: "DEPENDS", label: "C. Bergantung kepada reka bentuk proses" }
    ],
    correctAnswer: "DEPENDS",
    explanation: "Keputusan bergantung kepada proses. Jika ini satu-satunya langkah kawalan kaca sebelum produk ditutup dan dihantar, ia boleh menjadi CCP. Namun, jika kilang mempunyai pengesan kaca/sinaran-X (X-Ray) di hujung talian bungkusan, pemeriksaan visual di awal tadi hanyalah CP, manakala mesin X-Ray di hujung menjadi CCP."
  },
  {
    id: 4,
    title: "Situasi 4: Penyimpanan Sejuk Beku",
    product: "Daging Burger Sejuk Beku",
    step: "Penyimpanan produk siap di bilik sejuk beku (-18°C)",
    hazard: "Pertumbuhan mikroorganisma jika suhu meningkat melebihi paras beku.",
    options: [
      { key: "DEPENDS", label: "A. CCP atau CP bergantung kepada analisis risiko" },
      { key: "NOT_CONTROL", label: "B. Sentiasa bukan langkah kawalan" },
      { key: "PRP_ONLY", label: "C. Sentiasa PRP sahaja" }
    ],
    correctAnswer: "DEPENDS",
    explanation: "Ia bergantung kepada jenis produk dan analisis risiko. Bagi sesetengah produk daging beku, mengekalkan suhu beku sangat kritikal untuk mencegah kuman pembiak toksin dan boleh diisytiharkan sebagai CCP. Bagi kes lain, penyimpanan beku hanyalah CP untuk memelihara kualiti, manakala proses memasak akhir oleh pengguna menjadi kawalan bahaya biologi sebenar."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Sistem HACCP memberi tumpuan dan fokus utama kepada:",
    options: [
      { key: "A", label: "Mencantikkan pembungkusan dan reka bentuk label makanan" },
      { key: "B", label: "Menganalisis, mengenal pasti dan mengawal bahaya keselamatan makanan secara sistematik" },
      { key: "C", label: "Menentukan harga pasaran bagi sesuatu produk makanan" },
      { key: "D", label: "Merangka strategi pemasaran dan promosi jualan produk" }
    ],
    correctAnswer: "B",
    explanation: "Betul! HACCP (Hazard Analysis Critical Control Point) ialah satu kaedah saintifik dan sistematik bagi mengenal pasti, menilai dan mengawal bahaya yang signifikan terhadap keselamatan makanan."
  },
  {
    id: 2,
    text: "Antara berikut, yang manakah merupakan salah satu daripada LIMA LANGKAH PERMULAAN dalam pelaksanaan sistem HACCP?",
    options: [
      { key: "A", label: "Menjual produk di pasaran tempatan" },
      { key: "B", label: "Membentuk Pasukan HACCP (HACCP Team)" },
      { key: "C", label: "Menetapkan harga diskaun produk" },
      { key: "D", label: "Melukis poster kempen kebersihan" }
    ],
    correctAnswer: "B",
    explanation: "Betul! Lima langkah permulaan adalah: (1) Membentuk Pasukan HACCP, (2) Menerangkan Produk, (3) Mengenal Pasti Kegunaan Produk, (4) Melakar Carta Alir Proses, dan (5) Mengesahkan Carta Alir Proses."
  },
  {
    id: 3,
    text: "Sesuatu langkah proses makanan adalah sangat berkemungkinan dikategorikan sebagai CCP (Critical Control Point) apabila:",
    options: [
      { key: "A", label: "Langkah tersebut ada di dalam carta alir proses" },
      { key: "B", label: "Langkah tersebut melibatkan ramai pekerja" },
      { key: "C", label: "Langkah tersebut direka khas untuk mengawal bahaya signifikan, dan tiada langkah seterusnya dalam proses yang boleh menghapuskan atau mengurangkan bahaya tersebut" },
      { key: "D", label: "Langkah tersebut melibatkan kos pembelian peralatan yang sangat mahal" }
    ],
    correctAnswer: "C",
    explanation: "Betul! CCP ialah titik, langkah, atau prosedur di mana kawalan boleh dilaksanakan bagi mencegah, menghapuskan, atau mengurangkan bahaya keselamatan makanan ke tahap boleh diterima. Ia adalah 'last chance' kawalan."
  },
  {
    id: 4,
    text: "Amalan membasuh tangan oleh pekerja dapur dan sanitasi meja kerja biasanya dikategorikan di bawah:",
    options: [
      { key: "A", label: "Program Prasyarat (PRP/GMP)" },
      { key: "B", label: "Titik Kawalan Kritikal (CCP)" },
      { key: "C", label: "Had Kritikal (Critical Limit)" },
      { key: "D", label: "Prosedur Pengesahan (Verification)" }
    ],
    correctAnswer: "A",
    explanation: "Betul! Amalan sanitasi asas, kebersihan diri pekerja (seperti basuh tangan), kawalan perosak, dan kebersihan premis dikawal di bawah Program Prasyarat (PRP) atau Amalan Pengilangan Baik (GMP) untuk menyokong keselamatan makanan secara umum."
  },
  {
    id: 5,
    text: "Sekiranya sesuatu langkah dilesenkan sebagai CCP, apakah elemen wajib yang mesti diwujudkan berdasarkan 7 Prinsip HACCP?",
    options: [
      { key: "A", label: "Nama syarikat pembekal barangan kering sahaja" },
      { key: "B", label: "Penetapan Had Kritikal, Sistem Pemantauan, Tindakan Pembetulan, Prosedur Pengesahan dan Rekod" },
      { key: "C", label: "Resipi rahsia makanan dan penambah rasa herba" },
      { key: "D", label: "Harga promosi bermusim produk" }
    ],
    correctAnswer: "B",
    explanation: "Betul! Apabila suatu langkah diisytiharkan sebagai CCP, kita mesti menetapkan Had Kritikal (Prinsip 3), memantaunya (Prinsip 4), menetapkan Tindakan Pembetulan sekiranya terkeluar had (Prinsip 5), melakukan Pengesahan (Prinsip 6), dan menyimpan Rekod bertulis (Prinsip 7)."
  }
];

export const INITIAL_WORKSHEET_ROWS: WorksheetRow[] = [
  {
    step: "1. Penerimaan Bahan Mentah (Telur Segar)",
    hazard: "Telur tercemar bakteria (Salmonella) pada permukaan cangkerang.",
    control: "Penerimaan daripada pembekal berdaftar/GMP, pastikan telur bersih dan tiada retakan.",
    decision: "",
    reason: ""
  },
  {
    step: "2. Penyimpanan Bahan Mentah (Telur & Mayonis)",
    hazard: "Pertumbuhan bakteria jika disimpan pada suhu bilik terlalu lama.",
    control: "Simpan telur dalam peti sejuk (< 5°C). Pantau suhu chiller secara harian.",
    decision: "",
    reason: ""
  },
  {
    step: "3. Rebus Telur",
    hazard: "Bakteria patogen (Salmonella) di dalam kuning/putih telur masih hidup.",
    control: "Rebus telur sepenuhnya pada suhu > 75°C selama sekurang-kurangnya 10 minit.",
    decision: "",
    reason: ""
  },
  {
    step: "4. Campur Inti Sandwich",
    hazard: "Pencemaran silang mikrobiologi daripada peralatan kotor atau tangan pekerja.",
    control: "Amalkan sanitasi peralatan sebelum guna, pekerja wajib pakai sarung tangan bersih.",
    decision: "",
    reason: ""
  },
  {
    step: "5. Pembungkusan Sandwich",
    hazard: "Habuk, rambut, serpihan plastik atau objek fizikal mencemari produk.",
    control: "Lakukan pemeriksaan visual sebelum bungkus dalam plastik lutsinar yang bersih.",
    decision: "",
    reason: ""
  },
  {
    step: "6. Penyimpanan Sejuk Sandwich Siap",
    hazard: "Pembiakan bakteria patogen dalam produk siap dimakan sebelum diedar.",
    control: "Simpan dalam chiller paparan (< 5°C) sebelum dibeli oleh pelanggan.",
    decision: "",
    reason: ""
  },
  {
    step: "7. Pengedaran & Jualan",
    hazard: "Suhu meningkat melebihi 5°C memudahkan pembiakan kuman.",
    control: "Gunakan pengangkutan sejuk atau pendingin berinsulasi, buang baki jika melebihi tempoh pameran.",
    decision: "",
    reason: ""
  }
];

export const WORKSHEET_MODEL_ANSWERS: WorksheetRow[] = [
  {
    step: "1. Penerimaan Bahan Mentah (Telur Segar)",
    hazard: "Telur tercemar bakteria (Salmonella) pada permukaan cangkerang.",
    control: "Penerimaan daripada pembekal berdaftar/GMP, pastikan telur bersih dan tiada retakan.",
    decision: "PRP/GMP",
    reason: "Kawalan diurus melalui program prasyarat penerimaan pembekal & pemeriksaan asas. Bahaya biologi sebenar akan dikawal melalui rebusan nanti."
  },
  {
    step: "2. Penyimpanan Bahan Mentah (Telur & Mayonis)",
    hazard: "Pertumbuhan bakteria jika disimpan pada suhu bilik terlalu lama.",
    control: "Simpan telur dalam peti sejuk (< 5°C). Pantau suhu chiller secara harian.",
    decision: "CP",
    reason: "Penyimpanan sejuk mentah adalah titik kawalan untuk mengekalkan kesegaran (CP). Langkah rebusan telur selepas ini akan membunuh kuman."
  },
  {
    step: "3. Rebus Telur",
    hazard: "Bakteria patogen (Salmonella) di dalam kuning/putih telur masih hidup.",
    control: "Rebus telur sepenuhnya pada suhu > 75°C selama sekurang-kurangnya 10 minit.",
    decision: "CCP",
    reason: "Langkah ini direka khas untuk membunuh patogen biologi ke tahap selamat. Tiada langkah pemanasan lain selepas ini untuk mengurangkan bahaya ini."
  },
  {
    step: "4. Campur Inti Sandwich",
    hazard: "Pencemaran silang mikrobiologi daripada peralatan kotor atau tangan pekerja.",
    control: "Amalkan sanitasi peralatan sebelum guna, pekerja wajib pakai sarung tangan bersih.",
    decision: "PRP/GMP",
    reason: "Dikawal sepenuhnya melalui Amalan Kebersihan Pengendali Makanan (GMP/SOP Sanitasi) bagi mencegah kemasukan bakteria dari persekitaran."
  },
  {
    step: "5. Pembungkusan Sandwich",
    hazard: "Habuk, rambut, serpihan plastik atau objek fizikal mencemari produk.",
    control: "Lakukan pemeriksaan visual sebelum bungkus dalam plastik lutsinar yang bersih.",
    decision: "CP",
    reason: "Langkah ini penting untuk kualiti fizikal dan estetika produk. Bahaya fizikal ringan dikawal secara visual tanpa alat pengesan asing (CP)."
  },
  {
    step: "6. Penyimpanan Sejuk Sandwich Siap",
    hazard: "Pembiakan bakteria patogen dalam produk siap dimakan sebelum diedar.",
    control: "Simpan dalam chiller paparan (< 5°C) sebelum dibeli oleh pelanggan.",
    decision: "CCP",
    reason: "Kerana produk ini sedia dimakan (ready-to-eat) tanpa pemanasan lanjut oleh pengguna. Suhu sejuk (<5°C) wajib dipantau untuk menghalang pembiakan bakteria patogen."
  },
  {
    step: "7. Pengedaran & Jualan",
    hazard: "Suhu meningkat melebihi 5°C memudahkan pembiakan kuman.",
    control: "Gunakan pengangkutan sejuk atau pendingin berinsulasi, buang baki jika melebihi tempoh pameran.",
    decision: "CP",
    reason: "Langkah mengekalkan rantai sejuk semasa logistik dan jualan akhir. Boleh dikawal sebagai CP atau disokong oleh SOP logistik."
  }
];

export const INITIAL_USER_ANSWERS: UserAnswers = {
  readyToLearn: false,
  knowOutput: false,
  readyToStart: false,
  priorProduct: "",
  priorHazard: "",
  priorStep: "",
  priorControl: "",
  priorRevealed: false,
  mcqGoalAnswer: "",
  matchingAnswers: {},
  matchingSubmitted: false,
  teamSelection: {},
  productName: "",
  productIngredients: "",
  productAllergens: "",
  productStorage: "",
  productTarget: "",
  productRevealed: false,
  selectedFlowchartStep: null,
  reorderedFlowchart: [],
  flowchartReorderSuccess: null,
  selectedPrinciple: null,
  reorderedPrinciples: [],
  principlesReorderSuccess: null,
  misconceptionAnswer: null,
  scenarioAnswers: {},
  scenariosSubmitted: false,
  monitorWhat: "",
  monitorWhere: "",
  monitorWho: "",
  monitorWhen: "",
  monitorHow: "",
  monitorRecord: "",
  monitorRevealed: false,
  worksheetRows: [...INITIAL_WORKSHEET_ROWS],
  worksheetSubmitted: false,
  quizAnswers: {},
  quizSubmitted: false,
  quizScore: 0,
  reflection1: "",
  reflection2: "",
  reflection3: "",
  reflection4: "",
  reflection5: "",
  reflectionSubmitted: false,
};
