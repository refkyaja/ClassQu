/**
 * ClassQu - Shared Dynamic Components Loader
 * Dynamically renders custom Navbar, Sidebar, and Footer based on user roles (Student, Teacher, Admin).
 * Bypasses network requests to avoid CORS errors and provide premium, instantaneous load times.
 */

// Global logout function accessible anywhere
window.logoutClassQu = function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
};

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic HTML Generators based on Local Session
    function getNavbarHTML() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        let rightNavHTML = '';
        if (currentUser) {
            rightNavHTML = `
            <div class="flex items-center gap-3">
                <div class="hidden sm:flex flex-col text-right">
                    <span class="font-black text-xs text-neutral leading-none">${currentUser.name}</span>
                    <span class="text-[9px] font-bold uppercase tracking-wider text-primary mt-1">${currentUser.roleName || 'Pelajar'}</span>
                </div>
                <a href="profile.html" class="w-9 h-9 rounded-full overflow-hidden border-2 border-neutral shadow-playful-sm hover:scale-105 transition-transform shrink-0" title="Lihat Profil">
                    <img src="${currentUser.profilePic}" alt="Profile" class="w-full h-full object-cover"/>
                </a>
                <button onclick="window.logoutClassQu()" class="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all p-1.5 rounded-full flex items-center justify-center" title="Keluar">
                    <span class="material-symbols-outlined text-[20px] font-bold">logout</span>
                </button>
            </div>
            `;
        } else {
            rightNavHTML = `
            <a href="login.html" class="text-neutral text-sm hover:text-primary font-bold transition-colors px-3 py-1">Login</a>
            <a href="login.html" class="btn-playful bg-primary text-white px-5 py-2 rounded-full font-bold text-sm shadow-glow">Mulai Belajar</a>
            `;
        }

        return `
        <nav class="bg-white/80 backdrop-blur-xl rounded-full mt-4 mx-auto w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-7xl border border-neutral/15 shadow-premium flex justify-between items-center px-6 md:px-8 py-2.5 pointer-events-auto transition-all duration-300">
            <div class="flex items-center gap-8">
                <a href="index.html" class="font-bold text-xl text-primary tracking-tighter hover:scale-105 transition-transform flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[24px] fill-current text-primary" style="font-variation-settings: 'FILL' 1;">school</span>
                    <span>ClassQu</span>
                </a>
                <div class="hidden lg:flex items-center gap-8" id="nav-links">
                    <a class="text-neutral/70 font-semibold text-sm hover:text-primary transition-all duration-300 hover:scale-105" href="index.html">Home</a>
                    <a class="text-neutral/70 font-semibold text-sm hover:text-primary transition-all duration-300 hover:scale-105" href="materi.html">Kelas & Roadmap</a>
                    <a class="text-neutral/70 font-semibold text-sm hover:text-primary transition-all duration-300 hover:scale-105" href="subscription.html">Subscription</a>
                    <a class="text-neutral/70 font-semibold text-sm hover:text-primary transition-all duration-300 hover:scale-105" href="tentang.html">Tentang</a>
                    <a class="text-neutral/70 font-semibold text-sm hover:text-primary transition-all duration-300 hover:scale-105" href="karir.html">Karir</a>
                    <a class="text-neutral/70 font-semibold text-sm hover:text-primary transition-all duration-300 hover:scale-105" href="hubungi.html">Hubungi</a>
                </div>
            </div>
            <div class="flex items-center gap-4">
                ${currentUser ? `
                <a href="dashboard.html" class="hidden sm:flex items-center gap-1.5 text-neutral/75 font-bold text-sm hover:text-primary transition-colors mr-2">
                    <span class="material-symbols-outlined text-[18px]">dashboard</span> 
                    <span>Dashboard</span>
                </a>
                ` : ''}
                ${rightNavHTML}
            </div>
        </nav>
        `;
    }

    function getSidebarHTML() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return ''; // No sidebar if not logged in

        let profileDetail = '';
        let sidebarLinks = '';

        if (currentUser.role === 'pelajar') {
            profileDetail = `Level ${currentUser.level || 12} • ${currentUser.xp || 1240} XP`;
            sidebarLinks = `
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="dashboard.html">
                    <span class="material-symbols-outlined text-sm">dashboard</span>
                    <span>Dashboard Pelajar</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="materi_siswa.html">
                    <span class="material-symbols-outlined text-sm">school</span>
                    <span>Materi & Roadmap</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="leaderboard.html">
                    <span class="material-symbols-outlined text-sm">leaderboard</span>
                    <span>Leaderboard</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="shop.html">
                    <span class="material-symbols-outlined text-sm">store</span>
                    <span>Toko Hadiah</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="sertifikat.html">
                    <span class="material-symbols-outlined text-sm">workspace_premium</span>
                    <span>Sertifikat Saya</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="nilai_kuis.html">
                    <span class="material-symbols-outlined text-sm">quiz</span>
                    <span>Grade Quiz</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="achievement.html">
                    <span class="material-symbols-outlined text-sm">emoji_events</span>
                    <span>Achievement</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="community.html">
                    <span class="material-symbols-outlined text-sm">group</span>
                    <span>Community Hub</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="subscription.html">
                    <span class="material-symbols-outlined text-sm">payments</span>
                    <span>Langganan Pro</span>
                </a>
            `;
        } else if (currentUser.role === 'guru') {
            profileDetail = `${currentUser.roleName || 'Guru Senior'} • ${currentUser.students || 128} Siswa`;
            sidebarLinks = `
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="dashboard.html">
                    <span class="material-symbols-outlined text-sm">dashboard</span>
                    <span>Dashboard Guru</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="#" onclick="alert('Fitur Kelola Kelas Guru segera hadir!')">
                    <span class="material-symbols-outlined text-sm">co_present</span>
                    <span>Kelola Kelas</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="#" onclick="alert('Fitur Modul Pengajaran segera hadir!')">
                    <span class="material-symbols-outlined text-sm">menu_book</span>
                    <span>Materi Pengajaran</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="#" onclick="alert('Fitur Penilaian Kuis segera hadir!')">
                    <span class="material-symbols-outlined text-sm">grade</span>
                    <span>Penilaian Kuis</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="community.html">
                    <span class="material-symbols-outlined text-sm">forum</span>
                    <span>Komunitas Diskusi</span>
                </a>
            `;
        } else if (currentUser.role === 'admin') {
            profileDetail = `${currentUser.roleName || 'Super Admin'} • Online`;
            sidebarLinks = `
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="dashboard.html">
                    <span class="material-symbols-outlined text-sm">admin_panel_settings</span>
                    <span>Control Panel Admin</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="#" onclick="alert('Fitur Manajemen Pengguna segera hadir!')">
                    <span class="material-symbols-outlined text-sm">manage_accounts</span>
                    <span>Manajemen Pengguna</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="#" onclick="alert('Fitur Verifikasi Pembayaran & Sertifikat segera hadir!')">
                    <span class="material-symbols-outlined text-sm">verified_user</span>
                    <span>Verifikasi Berkas</span>
                </a>
                <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="#" onclick="alert('Fitur Status & Log Sistem segera hadir!')">
                    <span class="material-symbols-outlined text-sm">terminal</span>
                    <span>Status & Log Sistem</span>
                </a>
            `;
        }

        return `
        <aside class="w-full space-y-6">
            <div class="glass-card bg-white p-6 relative flex flex-col space-y-6">
                <a href="index.html" class="flex items-center gap-2 font-black text-2xl text-primary tracking-tighter hover:scale-[1.02] transition-transform pb-4 border-b border-neutral/10">
                    <span class="material-symbols-outlined text-[28px] fill-current text-primary" style="font-variation-settings: 'FILL' 1;">school</span>
                    <span>ClassQu</span>
                </a>
                <div class="flex flex-col items-center text-center gap-2">
                    <div class="w-16 h-16 rounded-full overflow-hidden border-4 border-primary/20 shadow-premium mb-2">
                        <img alt="Profile Picture" class="object-cover w-full h-full" src="${currentUser.profilePic}"/>
                    </div>
                    <div class="mb-2">
                        <h3 class="font-black text-sm text-neutral">Halo, ${currentUser.name}!</h3>
                        <p class="text-[10px] font-bold text-neutral/50 uppercase tracking-widest">${profileDetail}</p>
                    </div>
                    <a href="profile.html" class="btn-playful w-full bg-[#FFF3DF] text-neutral text-[10px] font-extrabold py-2 px-4 rounded-xl shadow-playful-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1.5">
                        <span class="material-symbols-outlined text-xs">person</span>
                        <span>Lihat Profile</span>
                    </a>
                </div>
            </div>
            <div class="glass-card bg-white p-6 relative flex flex-col space-y-6">
                <nav class="flex flex-col gap-2" id="sidebar-links">
                    ${sidebarLinks}
                </nav>
                <div class="pt-4 border-t border-neutral/10 space-y-1">
                    <a href="index.html" class="w-full text-neutral/60 hover:text-primary flex items-center gap-2 px-3 py-2 font-bold text-[10px] transition-colors rounded-xl hover:bg-neutral/5">
                        <span class="material-symbols-outlined text-xs">arrow_back</span>
                        <span>Kembali ke Beranda</span>
                    </a>
                    <button onclick="window.logoutClassQu()" class="w-full text-left text-red-500 hover:bg-red-500/5 flex items-center gap-2 px-3 py-2 font-bold text-[10px] transition-colors rounded-xl">
                        <span class="material-symbols-outlined text-xs">logout</span>
                        <span>Keluar</span>
                    </button>
                </div>
            </div>
        </aside>
        `;
    }

    const footerHTML = `
    <footer class="bg-surface-container/60 border-t-2 border-neutral py-16 px-6 md:px-12 mt-12">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div class="space-y-4">
                <div class="font-extrabold text-2xl text-primary tracking-tighter flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[24px] fill-current text-primary" style="font-variation-settings: 'FILL' 1;">school</span>
                    <span>ClassQu</span>
                </div>
                <p class="text-neutral/70 font-medium text-sm leading-relaxed">
                    Platform edukasi digital masa depan untuk mencetak generasi digital yang mandiri, kreatif, kompeten, dan siap kerja.
                </p>
            </div>
            <div>
                <h6 class="font-black text-xs text-primary uppercase tracking-widest mb-6">Navigasi</h6>
                <ul class="space-y-4 font-semibold text-neutral/70 text-sm">
                    <li><a class="hover:text-primary transition-colors" href="materi.html">Katalog Kelas</a></li>
                    <li><a class="hover:text-primary transition-colors" href="subscription.html">Paket Langganan</a></li>
                    <li><a class="hover:text-primary transition-colors" href="community.html">Komunitas Diskusi</a></li>
                    <li><a class="hover:text-primary transition-colors" href="dashboard.html">Dashboard Pelajar</a></li>
                </ul>
            </div>
            <div>
                <h6 class="font-black text-xs text-primary uppercase tracking-widest mb-6">Dukungan & Legal</h6>
                <ul class="space-y-4 font-semibold text-neutral/70 text-sm">
                    <li><a class="hover:text-primary transition-colors" href="#">Pusat Bantuan (FAQ)</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Syarat & Ketentuan</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Kebijakan Privasi</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Hubungi Customer Support</a></li>
                </ul>
            </div>
            <div class="space-y-4">
                <h6 class="font-black text-xs text-primary uppercase tracking-widest mb-6">Hubungi Kami</h6>
                <p class="text-neutral/70 text-sm font-semibold">halo@classqu.id</p>
                <div class="flex gap-3">
                    <a href="#" class="w-10 h-10 rounded-full bg-white border-2 border-neutral flex items-center justify-center text-primary shadow-playful-sm hover:scale-105 transition-transform">
                        <span class="material-symbols-outlined text-[18px]">public</span>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-white border-2 border-neutral flex items-center justify-center text-primary shadow-playful-sm hover:scale-105 transition-transform">
                        <span class="material-symbols-outlined text-[18px]">share</span>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-white border-2 border-neutral flex items-center justify-center text-primary shadow-playful-sm hover:scale-105 transition-transform">
                        <span class="material-symbols-outlined text-[18px]">mail</span>
                    </a>
                </div>
            </div>
        </div>
        
        <div class="max-w-7xl mx-auto pt-8 border-t-2 border-neutral/10 text-center text-neutral/50 font-bold text-xs">
            <p>© 2026 ClassQu. Dibuat dengan cinta untuk pendidikan Indonesia modern.</p>
        </div>
    </footer>
    `;

    // 2. Navigation Highlights
    function highlightActiveNav() {
        let currentPage = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];
        if (!currentPage || currentPage === '/' || currentPage === 'null') {
            currentPage = 'index.html';
        }
        
        if (currentPage === 'detail.html') {
            currentPage = 'materi.html';
        }
        
        document.querySelectorAll('#nav-links a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.remove('text-neutral/70', 'font-semibold');
                link.classList.add('text-primary', 'font-bold');
            }
        });
    }

    function highlightActiveSidebar() {
        let currentPage = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];
        if (!currentPage || currentPage === '/' || currentPage === 'null') {
            currentPage = 'dashboard.html';
        }
        
        if (currentPage === 'detail_siswa.html') {
            currentPage = 'materi_siswa.html';
        }
        
        document.querySelectorAll('#sidebar-links a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.className = "bg-primary text-white border-2 border-neutral rounded-2xl p-3 flex items-center gap-3 shadow-playful-sm font-extrabold text-xs";
            } else {
                link.className = "text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs";
            }
        });
    }

    // 3. Mount Components
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (navPlaceholder) {
        navPlaceholder.className = "fixed top-0 left-0 right-0 z-50 w-full";
        navPlaceholder.innerHTML = getNavbarHTML();
        highlightActiveNav();
    }

    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        sidebarPlaceholder.innerHTML = getSidebarHTML();
        highlightActiveSidebar();
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }
});
