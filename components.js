/**
 * ClassQu - Shared Dynamic Components Loader
 * Dynamically loads and renders navbar.html and footer.html across all pages
 * Bypasses fetch on file:// protocol to avoid Chrome CORS console errors
 */
document.addEventListener('DOMContentLoaded', () => {
    // Hardcoded Fallbacks for offline/local file:// access
    const navbarFallback = `
    <nav class="bg-white/80 backdrop-blur-xl rounded-full mt-4 mx-4 md:mx-auto max-w-7xl sticky top-4 border border-neutral/15 shadow-premium flex justify-between items-center px-6 md:px-8 py-3.5 z-50 transition-all duration-300">
        <div class="flex items-center gap-8">
            <a href="index.html" class="font-bold text-2xl text-primary tracking-tighter hover:scale-105 transition-transform flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[28px] fill-current text-primary" style="font-variation-settings: 'FILL' 1;">school</span>
                <span>ClassQu</span>
            </a>
            <div class="hidden lg:flex items-center gap-7" id="nav-links">
                <a class="text-neutral/70 font-semibold hover:text-primary transition-all duration-300 hover:scale-105" href="index.html">Home</a>
                <a class="text-neutral/70 font-semibold hover:text-primary transition-all duration-300 hover:scale-105" href="materi.html">Kelas & Roadmap</a>
                <a class="text-neutral/70 font-semibold hover:text-primary transition-all duration-300 hover:scale-105" href="subscription.html">Subscription</a>
                <a class="text-neutral/70 font-semibold hover:text-primary transition-all duration-300 hover:scale-105" href="tentang.html">Tentang</a>
                <a class="text-neutral/70 font-semibold hover:text-primary transition-all duration-300 hover:scale-105" href="karir.html">Karir</a>
                <a class="text-neutral/70 font-semibold hover:text-primary transition-all duration-300 hover:scale-105" href="hubungi.html">Hubungi</a>
            </div>
        </div>
        <div class="flex items-center gap-3">
            <a href="dashboard.html" class="hidden sm:flex items-center gap-1.5 text-neutral/75 font-bold hover:text-primary transition-colors mr-2">
                <span class="material-symbols-outlined text-[20px]">dashboard</span> 
                <span>Dashboard</span>
            </a>
            <a href="login.html" class="text-neutral hover:text-primary font-bold transition-colors px-3 py-1">Login</a>
            <a href="materi.html" class="btn-playful bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-glow">Mulai Belajar</a>
        </div>
    </nav>
    `;

    const footerFallback = `
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

    const sidebarFallback = `
<aside class="w-full space-y-6">
    <div class="glass-card bg-white p-6 relative flex flex-col space-y-6">
        <a href="index.html" class="flex items-center gap-2 font-black text-2xl text-primary tracking-tighter hover:scale-[1.02] transition-transform pb-4 border-b border-neutral/10">
            <span class="material-symbols-outlined text-[28px] fill-current text-primary" style="font-variation-settings: 'FILL' 1;">school</span>
            <span>ClassQu</span>
        </a>
        <div class="flex flex-col items-center text-center gap-2">
            <div class="w-16 h-16 rounded-full overflow-hidden border-4 border-primary/20 shadow-premium mb-2">
                <img alt="Student Profile Picture" class="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxKvWl8xetWydUkgy5vu29o_c6gudsejgtnKoTzlYfUnuYrOMSnf48Ro_kWqNObsGFejYahwlvdAG7ydXMfm9L8oeedfs2HTAUEcxhNw1cFm1iyDDFdicbr90mVzEvU6ar3LtwFskIibQrHBst5n4fXjzDqDS00CtpPmgntm3SQrEfYBcEM97P6Rnd_by7qbpGm9QG52EqWKWyc9_TG4YOB7p3VLReveSU-fFzSso2elkHEcR3kgnP-IV6acrGAPvVO9CwB_FW5Q"/>
            </div>
            <div class="mb-2">
                <h3 class="font-black text-sm text-neutral">Halo, Andi Pelajar!</h3>
                <p class="text-[10px] font-bold text-neutral/50 uppercase tracking-widest">Level 12 • 1,240 XP</p>
            </div>
            <a href="profile.html" class="btn-playful w-full bg-[#FFF3DF] text-neutral text-[10px] font-extrabold py-2 px-4 rounded-xl shadow-playful-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-xs">person</span>
                <span>Lihat Profile</span>
            </a>
        </div>
    </div>
    <div class="glass-card bg-white p-6 relative flex flex-col space-y-6">
        <nav class="flex flex-col gap-2" id="sidebar-links">
            <a class="text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs" href="dashboard.html">
                <span class="material-symbols-outlined text-sm">dashboard</span>
                <span>Dashboard</span>
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
        </nav>
        <div class="pt-4 border-t border-neutral/10 space-y-1">
            <a href="index.html" class="w-full text-neutral/60 hover:text-primary flex items-center gap-2 px-3 py-2 font-bold text-[10px] transition-colors rounded-xl hover:bg-neutral/5">
                <span class="material-symbols-outlined text-xs">arrow_back</span>
                <span>Kembali ke Beranda</span>
            </a>
            <a href="login.html" class="w-full text-red-500 hover:bg-red-500/5 flex items-center gap-2 px-3 py-2 font-bold text-[10px] transition-colors rounded-xl">
                <span class="material-symbols-outlined text-xs">logout</span>
                <span>Keluar</span>
            </a>
        </div>
    </div>
</aside>
    `;

    // Function to highlight active navigation link
    function highlightActiveNav() {
        // Parse current page name (e.g. index.html)
        let currentPage = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];
        if (!currentPage || currentPage === '/' || currentPage === 'null') {
            currentPage = 'index.html';
        }
        
        // Keep the Kelas & Roadmap tab active when on dedicated class detail views
        if (currentPage === 'detail.html') {
            currentPage = 'materi.html';
        }
        
        // Highlight active nav item
        document.querySelectorAll('#nav-links a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.remove('text-neutral/70', 'font-semibold');
                link.classList.add('text-primary', 'font-bold');
            }
        });
    }

    // Function to highlight active sidebar link
    function highlightActiveSidebar() {
        let currentPage = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];
        if (!currentPage || currentPage === '/' || currentPage === 'null') {
            currentPage = 'dashboard.html';
        }
        
        // Keep Materi & Roadmap active when viewing student class details
        if (currentPage === 'detail_siswa.html') {
            currentPage = 'materi_siswa.html';
        }
        
        // Handle child links / active route matching
        document.querySelectorAll('#sidebar-links a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.className = "bg-primary text-white border-2 border-neutral rounded-2xl p-3 flex items-center gap-3 shadow-playful-sm font-extrabold text-xs";
            } else {
                link.className = "text-neutral/70 hover:text-primary flex items-center gap-3 p-3 hover:bg-neutral/5 rounded-2xl transition-all font-bold text-xs";
            }
        });
    }

    const isLocalFile = window.location.protocol === 'file:';

    // 1. Dynamic Navbar Loader with local file:// protocol fallback
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (navPlaceholder) {
        if (isLocalFile) {
            // Directly load fallback without fetching to prevent Chrome CORS console errors
            navPlaceholder.innerHTML = navbarFallback;
            highlightActiveNav();
        } else {
            fetch('navbar.html')
                .then(response => {
                    if (!response.ok) throw new Error('Network error loading navbar');
                    return response.text();
                })
                .then(html => {
                    navPlaceholder.innerHTML = html;
                    highlightActiveNav();
                })
                .catch(err => {
                    console.warn('Gagal memuat navbar via fetch, menggunakan fallback:', err);
                    navPlaceholder.innerHTML = navbarFallback;
                    highlightActiveNav();
                });
        }
    }

    // 2. Dynamic Footer Loader with local file:// protocol fallback
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        if (isLocalFile) {
            // Directly load fallback without fetching to prevent Chrome CORS console errors
            footerPlaceholder.innerHTML = footerFallback;
        } else {
            fetch('footer.html')
                .then(response => {
                    if (!response.ok) throw new Error('Network error loading footer');
                    return response.text();
                })
                .then(html => {
                    footerPlaceholder.innerHTML = html;
                })
                .catch(err => {
                    console.warn('Gagal memuat footer via fetch, menggunakan fallback:', err);
                    footerPlaceholder.innerHTML = footerFallback;
                });
        }
    }

    // 3. Dynamic Sidebar Loader with local file:// protocol fallback
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        if (isLocalFile) {
            sidebarPlaceholder.innerHTML = sidebarFallback;
            highlightActiveSidebar();
        } else {
            fetch('sidebar.html')
                .then(response => {
                    if (!response.ok) throw new Error('Network error loading sidebar');
                    return response.text();
                })
                .then(html => {
                    sidebarPlaceholder.innerHTML = html;
                    highlightActiveSidebar();
                })
                .catch(err => {
                    console.warn('Gagal memuat sidebar via fetch, menggunakan fallback:', err);
                    sidebarPlaceholder.innerHTML = sidebarFallback;
                    highlightActiveSidebar();
                });
        }
    }
});
