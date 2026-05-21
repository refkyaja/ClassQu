const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    console.log('=== KELASQU MULTI-ROLE SYSTEM E2E AUTOMATED TESTS ===');
    
    // Resolve absolute path to the local html files
    const loginFilePath = 'file:///' + path.resolve(__dirname, 'login.html').replace(/\\/g, '/');
    const dashboardFilePath = 'file:///' + path.resolve(__dirname, 'dashboard.html').replace(/\\/g, '/');
    
    console.log(`Target Login URL: ${loginFilePath}`);
    console.log(`Target Dashboard URL: ${dashboardFilePath}`);
    
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--allow-file-access-from-files', '--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set viewport for a desktop user
    await page.setViewport({ width: 1280, height: 800 });

    // Enable console logs from the browser inside our terminal
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

    try {
        // ==========================================
        // TEST 1: ROUTING GUARD PROTECTION
        // ==========================================
        console.log('\n[TEST 1] Menguji Proteksi Rute (Akses langsung dashboard tanpa login)...');
        await page.goto(dashboardFilePath);
        await new Promise(r => setTimeout(r, 1000));
        
        let currentUrl = page.url();
        console.log(`URL saat ini setelah load dashboard langsung: ${currentUrl}`);
        if (currentUrl.includes('login.html')) {
            console.log('✅ BERHASIL: Tamu tidak terautentikasi otomatis dialihkan ke login.html!');
        } else {
            throw new Error('❌ GAGAL: Tamu tidak terautentikasi dapat membuka dashboard.html!');
        }

        // ==========================================
        // TEST 2: LOGIN PELAJAR & LEVEL MODAL
        // ==========================================
        console.log('\n[TEST 2] Menguji Login Akun Pelajar...');
        await page.goto(loginFilePath);
        
        // Fill credentials
        await page.type('#email', 'pelajar@classqu.id');
        await page.type('#password', 'pelajar123');
        
        // Submit
        await page.click('button[type="submit"]');
        console.log('Tombol Login diklik. Menunggu pengalihan ke dashboard...');
        await page.waitForNavigation({ waitUntil: 'load' });
        
        currentUrl = page.url();
        console.log(`URL setelah login sukses: ${currentUrl}`);
        if (currentUrl.includes('dashboard.html')) {
            console.log('✅ BERHASIL: Login sukses dan berhasil dialihkan ke dashboard!');
        } else {
            throw new Error('❌ GAGAL: Halaman login tidak mengalihkan pengguna ke dashboard!');
        }

        // Verify Title and Sidebar elements for Student
        const studentTitle = await page.title();
        console.log(`Judul Halaman: ${studentTitle}`);
        if (studentTitle.includes('Student Dashboard')) {
            console.log('✅ BERHASIL: Halaman dirender sebagai Student Dashboard!');
        } else {
            throw new Error(`❌ GAGAL: Judul halaman tidak sesuai! (${studentTitle})`);
        }

        // Click XP Card to trigger Level Modal
        console.log('Membuka modal detail tingkatan level...');
        await page.click('#xp-card');
        await new Promise(r => setTimeout(r, 500));
        
        const modalIsVisible = await page.evaluate(() => {
            const modal = document.getElementById('level-modal');
            return modal && !modal.classList.contains('hidden');
        });
        
        if (modalIsVisible) {
            console.log('✅ BERHASIL: Modal tingkatan level tampil di layar!');
        } else {
            throw new Error('❌ GAGAL: Modal tingkatan level tidak muncul saat XP Card diklik!');
        }

        // Close Level Modal
        console.log('Menutup modal...');
        await page.click('#close-modal-btn');
        await new Promise(r => setTimeout(r, 500));

        // ==========================================
        // TEST 3: LOGOUT FLOW
        // ==========================================
        console.log('\n[TEST 3] Menguji Alur Keluar (Logout)...');
        await page.evaluate(() => {
            window.logoutClassQu();
        });
        await new Promise(r => setTimeout(r, 1000));
        
        currentUrl = page.url();
        console.log(`URL setelah logout: ${currentUrl}`);
        if (currentUrl.includes('index.html') || currentUrl.includes('login.html')) {
            console.log('✅ BERHASIL: Logout membersihkan session dan mengalihkan pengguna!');
        } else {
            throw new Error('❌ GAGAL: Logout tidak mengarahkan pengguna kembali!');
        }

        // ==========================================
        // TEST 4: LOGIN GURU & INTERACTIVE GRADING
        // ==========================================
        console.log('\n[TEST 4] Menguji Login Akun Guru & Penilaian Kuis...');
        await page.goto(loginFilePath);
        await page.type('#email', 'guru@classqu.id');
        await page.type('#password', 'guru123');
        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: 'load' });
        
        const guruTitle = await page.title();
        console.log(`Judul Halaman: ${guruTitle}`);
        if (guruTitle.includes('Guru Dashboard')) {
            console.log('✅ BERHASIL: Halaman dirender sebagai Guru Dashboard!');
        } else {
            throw new Error(`❌ GAGAL: Judul halaman tidak sesuai! (${guruTitle})`);
        }

        // Locate submission elements and score input
        console.log('Melakukan penilaian kuis secara interaktif...');
        await page.type('#score-1', '95');
        await page.click('#sub-1 button');
        await new Promise(r => setTimeout(r, 1000));

        // Check if card was removed
        const isCard1Removed = await page.evaluate(() => {
            return document.getElementById('sub-1') === null;
        });
        
        if (isCard1Removed) {
            console.log('✅ BERHASIL: Kartu kuis Andi Pelajar berhasil dihapus setelah diberi nilai!');
        } else {
            throw new Error('❌ GAGAL: Kartu kuis siswa tidak terhapus setelah tombol beri nilai diklik!');
        }

        // Check if toast message showed up
        const toastText = await page.evaluate(() => {
            const toast = document.getElementById('eval-toast');
            const textEl = document.getElementById('eval-toast-text');
            return toast && !toast.classList.contains('hidden') ? textEl.textContent : '';
        });
        
        if (toastText.includes('95')) {
            console.log(`✅ BERHASIL: Toast pemberitahuan aktif! (${toastText})`);
        } else {
            console.log(`⚠️ PERINGATAN: Toast tidak aktif atau teksnya berbeda: "${toastText}"`);
        }

        // Answer Forum
        console.log('Mengisi forum konsultasi diskusi...');
        await page.type('#forum-input', 'Keren pertanyaannya! Promise.all melempar error karena sifatnya fail-fast.');
        await page.click('#forum-answer-box button');
        await new Promise(r => setTimeout(r, 500));

        const forumSuccessIsVisible = await page.evaluate(() => {
            const toast = document.getElementById('forum-success-toast');
            return toast && !toast.classList.contains('hidden');
        });

        if (forumSuccessIsVisible) {
            console.log('✅ BERHASIL: Toast konfirmasi forum berhasil tampil!');
        } else {
            throw new Error('❌ GAGAL: Toast sukses forum tidak muncul!');
        }

        // ==========================================
        // TEST 5: LOGIN ADMIN & CONTROL PANEL
        // ==========================================
        console.log('\n[TEST 5] Menguji Login Akun Admin & Kontrol Panel...');
        await page.evaluate(() => {
            window.logoutClassQu();
        });
        await new Promise(r => setTimeout(r, 1000));

        await page.goto(loginFilePath);
        await page.type('#email', 'admin@classqu.id');
        await page.type('#password', 'admin123');
        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: 'load' });

        const adminTitle = await page.title();
        console.log(`Judul Halaman: ${adminTitle}`);
        if (adminTitle.includes('Admin Panel')) {
            console.log('✅ BERHASIL: Halaman dirender sebagai Admin Panel!');
        } else {
            throw new Error(`❌ GAGAL: Judul halaman tidak sesuai! (${adminTitle})`);
        }

        // User management: Change role
        console.log('Mengubah role pengguna secara interaktif...');
        const initialBadgeText = await page.evaluate(() => document.getElementById('role-badge-1').textContent.trim());
        console.log(`Role awal Andi Pelajar: ${initialBadgeText}`);
        
        await page.click('#user-row-1 button:first-child');
        await new Promise(r => setTimeout(r, 500));
        
        const newBadgeText = await page.evaluate(() => document.getElementById('role-badge-1').textContent.trim());
        console.log(`Role baru Andi Pelajar: ${newBadgeText}`);
        
        if (newBadgeText.toUpperCase() === 'GURU') {
            console.log('✅ BERHASIL: Role Andi Pelajar berubah dari Pelajar ke Guru!');
        } else {
            throw new Error('❌ GAGAL: Role tidak berubah setelah diklik!');
        }

        // User management: Delete row
        console.log('Menghapus baris pengguna...');
        await page.click('#user-row-2 button:nth-child(2)'); // delete Budi Guru
        await new Promise(r => setTimeout(r, 500));
        
        const isBudiRemoved = await page.evaluate(() => document.getElementById('user-row-2') === null);
        if (isBudiRemoved) {
            console.log('✅ BERHASIL: Baris pengguna Budi Guru dihapus dari tabel!');
        } else {
            throw new Error('❌ GAGAL: Baris pengguna Budi Guru tidak terhapus dari tabel!');
        }

        // Transaction approval
        console.log('Menyetujui transaksi langganan...');
        await page.click('#approval-box-1 button:first-child');
        await new Promise(r => setTimeout(r, 500));
        
        const isTrans1Removed = await page.evaluate(() => document.getElementById('approval-box-1') === null);
        if (isTrans1Removed) {
            console.log('✅ BERHASIL: Transaksi Citra Lestari disetujui dan dihapus dari antrian!');
        } else {
            throw new Error('❌ GAGAL: Transaksi tidak terhapus dari antrian!');
        }

        // System Log Refresh
        console.log('Merefresh log aktivitas sistem...');
        const initialLogsCount = await page.evaluate(() => document.getElementById('logs-container').children.length);
        
        await page.click('button[onclick="refreshLogs()"]');
        await new Promise(r => setTimeout(r, 500));
        
        const newLogsCount = await page.evaluate(() => document.getElementById('logs-container').children.length);
        console.log(`Jumlah log sebelum refresh: ${initialLogsCount}, setelah refresh: ${newLogsCount}`);
        
        if (newLogsCount > initialLogsCount) {
            console.log('✅ BERHASIL: Log baru ditambahkan ke kontainer terminal!');
        } else {
            throw new Error('❌ GAGAL: Tidak ada log baru yang ditambahkan ke terminal!');
        }

        console.log('\n🎉 SEMUA PENGUJIAN OTOMATIS SELESAI DENGAN SUKSES! 100% BENAR! 🎉');

    } catch (error) {
        console.error('\n❌ PENGUJIAN GAGAL DENGAN ERROR:');
        console.error(error);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
