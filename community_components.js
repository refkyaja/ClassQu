/**
 * ClassQu - Community Dynamic Components Loader
 * Dynamically loads and renders navbar, sidebars, and sub-pages in community.html
 * Supports offline local file:// fallbacks to prevent Chrome CORS fetch errors
 */

// Offline/local file fallbacks containing the exact HTML parts
const navbarFallback = `
<!-- Top Navigation Bar - Glassmorphism Aesthetic -->
<header class="bg-white/75 backdrop-blur-xl border border-white/30 shadow-xl shadow-primary/5 rounded-3xl sticky top-4 flex justify-between items-center px-6 py-3 z-50 mt-4">
    <!-- Left Logo Section -->
    <div class="flex items-center gap-3">
        <a href="index.html" class="font-extrabold text-2xl text-primary tracking-tighter hover:scale-105 transition-transform flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[28px] fill-current text-primary" style="font-variation-settings: 'FILL' 1;">school</span>
            <span class="text-on-surface">ClassQu</span>
        </a>
    </div>

    <!-- Center Navigation Tabs (Pill Buttons as Requested) -->
    <div class="hidden md:flex items-center gap-1 bg-neutral-100/40 p-1 rounded-full border border-white/20">
        <button id="link-beranda" onclick="switchTab('beranda')" class="sidebar-link bg-primary text-white shadow-lg shadow-primary/25 rounded-full px-5 py-2 flex items-center gap-2 font-black text-xs transition-all duration-200">
            <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">home</span>
            <span>Beranda</span>
        </button>
        <button id="link-grup" onclick="switchTab('grup')" class="sidebar-link text-on-surface-variant rounded-full px-5 py-2 flex items-center gap-2 font-black text-xs transition-all duration-200 hover:bg-white/60">
            <span class="material-symbols-outlined text-sm">group</span>
            <span>Grup</span>
        </button>
        <button id="link-mentor" onclick="switchTab('mentor')" class="sidebar-link text-on-surface-variant rounded-full px-5 py-2 flex items-center gap-2 font-black text-xs transition-all duration-200 hover:bg-white/60">
            <span class="material-symbols-outlined text-sm">person</span>
            <span>Mentor</span>
        </button>
        <button id="link-postingan" onclick="switchTab('postingan')" class="sidebar-link text-on-surface-variant rounded-full px-5 py-2 flex items-center gap-2 font-black text-xs transition-all duration-200 hover:bg-white/60">
            <span class="material-symbols-outlined text-sm">rate_review</span>
            <span>Postingan</span>
        </button>
    </div>

    <!-- Right Side Actions & Profile Badge -->
    <div class="flex items-center gap-3">
        <!-- Action Pill Buttons -->
        <button onclick="window.location.href='community_search.html'" class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-white hover:text-primary transition-all border border-white/30 shadow-sm bg-white/40">
            <span class="material-symbols-outlined text-[19px]">search</span>
        </button>
        <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-white hover:text-primary transition-all border border-white/30 shadow-sm bg-white/40 relative">
            <span class="material-symbols-outlined text-[19px]">notifications</span>
            <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary-light rounded-full"></span>
        </button>
        <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-white hover:text-primary transition-all border border-white/30 shadow-sm bg-white/40">
            <span class="material-symbols-outlined text-[19px]">mail</span>
        </button>
        
        <!-- User Badge Profile -->
        <div onclick="window.location.href='profile.html'" class="flex items-center gap-2 border border-primary/10 shadow-lg shadow-primary/5 rounded-full px-3.5 py-1.5 bg-white/80 backdrop-blur-md cursor-pointer hover:scale-103 active:scale-97 transition-all">
            <img class="w-7 h-7 rounded-full object-cover border border-primary/10 shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxKvWl8xetWydUkgy5vu29o_c6gudsejgtnKoTzlYfUnuYrOMSnf48Ro_kWqNObsGFejYahwlvdAG7ydXMfm9L8oeedfs2HTAUEcxhNw1cFm1iyDDFdicbr90mVzEvU6ar3LtwFskIibQrHBst5n4fXjzDqDS00CtpPmgntm3SQrEfYBcEM97P6Rnd_by7qbpGm9QG52EqWKWyc9_TG4YOB7p3VLReveSU-fFzSso2elkHEcR3kgnP-IV6acrGAPvVO9CwB_FW5Q" alt="Avatar"/>
            <div class="hidden sm:block text-left">
                <p class="text-[10px] font-black text-on-surface leading-none">Kevin Sanjaya</p>
                <p class="text-[8px] font-bold text-on-surface-variant/80 mt-0.5">Level 12 • 450 XP</p>
            </div>
            <span class="material-symbols-outlined text-[14px]">keyboard_arrow_down</span>
        </div>
    </div>
</header>
`;

const sidebarLeftFallback = `
<!-- Card 1: Level Kamu -->
<div class="glass-card rounded-2xl p-5 flex flex-col gap-4">
    <h4 class="font-extrabold text-[11px] text-on-surface-variant/60 uppercase tracking-widest">Level Kamu</h4>
    
    <div class="flex items-center gap-3.5">
        <div class="w-11 h-11 rounded-full bg-secondary-accent/15 border border-secondary-accent/30 flex items-center justify-center text-secondary-accent shrink-0 shadow-inner">
            <span class="material-symbols-outlined text-xl fill-current text-[#e3aa1a]" style="font-variation-settings: 'FILL' 1;">rocket_launch</span>
        </div>
        <div>
            <h5 class="text-sm font-black leading-tight text-on-surface">Level 12</h5>
            <p class="text-[10px] text-on-surface-variant/75 font-bold">450 / 800 XP</p>
        </div>
    </div>

    <!-- Sleek Modern Progress Bar -->
    <div class="w-full h-3 bg-neutral-100 border border-neutral-200/50 rounded-full overflow-hidden">
        <div class="h-full w-[56%] bg-gradient-to-r from-primary to-primary-light rounded-full shadow-lg"></div>
    </div>
</div>

<!-- Card 2: Grup Saya -->
<div class="glass-card rounded-2xl p-5 flex flex-col gap-4">
    <div class="flex justify-between items-center">
        <h4 class="font-extrabold text-[11px] text-on-surface-variant/60 uppercase tracking-widest">Grup Saya</h4>
        <button onclick="switchTab('grup')" class="w-6 h-6 rounded-lg bg-neutral-100 hover:bg-primary hover:text-white text-on-surface font-black text-xs flex items-center justify-center border border-neutral-200/40 transition-colors shadow-sm">+</button>
    </div>
    
    <div class="flex flex-col gap-2">
        <button onclick="openGroupChat('general')" class="w-full flex items-center justify-between p-2 rounded-xl border border-primary-light/15 bg-primary/5 hover:translate-x-0.5 transition-transform text-left">
            <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-primary-light/15 flex items-center justify-center text-primary font-bold text-xs">#</span>
                <span class="text-xs font-black text-primary leading-none">General Discussion</span>
            </div>
            <span class="bg-white/80 border border-primary-light/10 text-[8.5px] font-black text-primary/70 px-2 py-0.5 rounded-full">128</span>
        </button>
        <button onclick="openGroupChat('office')" class="w-full flex items-center justify-between p-2 rounded-xl border border-transparent hover:bg-neutral-100/50 hover:border-neutral-200/20 transition-all text-left">
            <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">X</span>
                <span class="text-xs font-bold text-on-surface-variant leading-none">Ms Office QA</span>
            </div>
            <span class="bg-neutral-100 text-[8.5px] font-black text-on-surface-variant/50 px-2 py-0.5 rounded-full">95</span>
        </button>
        <button onclick="openGroupChat('uiux')" class="w-full flex items-center justify-between p-2 rounded-xl border border-transparent hover:bg-neutral-100/50 hover:border-neutral-200/20 transition-all text-left">
            <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">🎨</span>
                <span class="text-xs font-bold text-on-surface-variant leading-none">UI/UX &amp; Design</span>
            </div>
            <span class="bg-neutral-100 text-[8.5px] font-black text-on-surface-variant/50 px-2 py-0.5 rounded-full">86</span>
        </button>
        <button onclick="openGroupChat('coding')" class="w-full flex items-center justify-between p-2 rounded-xl border border-transparent hover:bg-neutral-100/50 hover:border-neutral-200/20 transition-all text-left">
            <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">&lt;/&gt;</span>
                <span class="text-xs font-bold text-on-surface-variant leading-none">Coding Bootcamp</span>
            </div>
            <span class="bg-neutral-100 text-[8.5px] font-black text-on-surface-variant/50 px-2 py-0.5 rounded-full">112</span>
        </button>
        <button onclick="openGroupChat('general')" class="w-full flex items-center justify-between p-2 rounded-xl border border-transparent hover:bg-neutral-100/50 hover:border-neutral-200/20 transition-all text-left">
            <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs">EN</span>
                <span class="text-xs font-bold text-on-surface-variant leading-none">English Corner</span>
            </div>
            <span class="bg-neutral-100 text-[8.5px] font-black text-on-surface-variant/50 px-2 py-0.5 rounded-full">67</span>
        </button>
        <button onclick="openGroupChat('career')" class="w-full flex items-center justify-between p-2 rounded-xl border border-transparent hover:bg-neutral-100/50 hover:border-neutral-200/20 transition-all text-left">
            <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">💼</span>
                <span class="text-xs font-bold text-on-surface-variant leading-none">Career Prep</span>
            </div>
            <span class="bg-neutral-100 text-[8.5px] font-black text-on-surface-variant/50 px-2 py-0.5 rounded-full">74</span>
        </button>
    </div>
</div>

<!-- Card 3: Invite & Earn XP (Teal Glassmorphic) -->
<div class="glass-card rounded-2xl p-5 flex flex-col gap-4" style="background: rgba(96, 178, 171, 0.08); border-color: rgba(96, 178, 171, 0.15)">
    <h4 class="font-extrabold text-[11px] text-tertiary-light uppercase tracking-widest flex items-center gap-1.5">
        <span class="material-symbols-outlined text-sm font-bold text-tertiary-light">celebration</span>
        <span>Invite &amp; Earn XP!</span>
    </h4>
    
    <p class="text-xs font-bold text-on-surface-variant/80 leading-relaxed">Ajak temanmu bergabung dan dapatkan 50 XP untuk setiap teman yang mendaftar.</p>
    
    <button onclick="showNotice('Undang Teman', 'Salin kode undangan: CLASSQU-INV-KEVIN untuk dibagikan ke teman-temanmu!')" class="glow-button bg-tertiary text-white w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-lg shadow-tertiary/20">
        <span>Undang Sekarang</span>
        <span class="material-symbols-outlined text-xs">arrow_forward</span>
    </button>
</div>
`;

const sidebarRightFallback = `
<!-- Card 1: Mentor Aktif -->
<div class="glass-card rounded-2xl p-5 flex flex-col gap-4">
    <div class="flex justify-between items-center border-b border-primary/5 pb-2">
        <h4 class="font-extrabold text-[11px] text-on-surface-variant/60 uppercase tracking-widest">Mentor Aktif</h4>
        <a href="#" onclick="switchTab('mentor')" class="text-tertiary-light text-[10.5px] font-black hover:underline whitespace-nowrap">Lihat Semua</a>
    </div>
    
    <div class="space-y-4">
        <div class="flex items-center justify-between gap-2.5">
            <div class="flex items-center gap-2">
                <img alt="Mentor Dimas" class="w-8 h-8 rounded-full border border-primary/10 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQlgX9G2HBuDhqDtUojpm0MesHmY6kzelS3zL-PmSDFbmEYmr4hfqsgJqa88dNMJzyXzvVdLTyKOrAliTx5JXkipmfF8qTI4vjHjIrcIf1RQDXbw63vpQIZBX8VkTOyCPK2E7wIpixERadCJUm4CtIYmzmLT8UIIWDI6Ojs8xXw6b9RtZQ5fW5-QjmllhAcyKJlZmYZAi1OseMVPmAs1na6I-bAZV1TwS0dNwXLeZqiciDmw9QIPtGNlQnbPaY4tB38AH2yE9EHg"/>
                <div>
                    <p class="text-[11px] font-black text-on-surface leading-tight">Dimas Pratama</p>
                    <p class="text-[8.5px] text-[#008f86] font-bold leading-none mt-0.5">Public Speaking Specialist</p>
                    <p class="text-[8px] text-emerald-500 font-extrabold flex items-center gap-0.5 mt-0.5">
                        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span> Online
                    </p>
                </div>
            </div>
            <button onclick="openGroupChat('general')" class="w-7 h-7 rounded-lg border border-primary/10 flex items-center justify-center bg-white/80 hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-sm">
                <span class="material-symbols-outlined text-[13px]">chat_bubble</span>
            </button>
        </div>

        <div class="flex items-center justify-between gap-2.5">
            <div class="flex items-center gap-2">
                <img alt="Mentor Aulia" class="w-8 h-8 rounded-full border border-primary/10 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVqCS4JcK8zSkdk8gF67Dogn_DsKXfgMf6HabnC0Wu3zPc-OVbdAz1ai38rGgkKZ3JA7nO1RlKd7WRxZEIEdk-vLiE7BL7zkVOOetgR2mNL-Gpf59nMLT80L_nFcD7MJBbGr0JZz60g2CB2zG9Y62yjuMlL_DWWscx-q2b6alE0zeRBQnD6MSxYQyqvSTXl9GtjhhW7HpmKGnEKGOKcrItgzr7uOJ_CCfrBsP-M1xXv8ERFnBL8oEpM5lwdy8Qpd6IsC6eGkvaHQ"/>
                <div>
                    <p class="text-[11px] font-black text-on-surface leading-tight">Aulia Rizky</p>
                    <p class="text-[8.5px] text-[#008f86] font-bold leading-none mt-0.5">Senior UI/UX Designer</p>
                    <p class="text-[8px] text-emerald-500 font-extrabold flex items-center gap-0.5 mt-0.5">
                        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span> Online
                    </p>
                </div>
            </div>
            <button onclick="openGroupChat('uiux')" class="w-7 h-7 rounded-lg border border-primary/10 flex items-center justify-center bg-white/80 hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-sm">
                <span class="material-symbols-outlined text-[13px]">chat_bubble</span>
            </button>
        </div>
    </div>
</div>

<!-- Card 2: Trending Discussion (Amber Yellow Glassmorphic) -->
<div class="glass-card rounded-2xl p-5 flex flex-col gap-4" style="background: rgba(255, 213, 109, 0.08); border-color: rgba(255, 213, 109, 0.25)">
    <h4 class="font-extrabold text-[11px] text-secondary-accent uppercase tracking-widest flex items-center gap-1.5" style="color: #c48b00">
        <span class="material-symbols-outlined text-sm font-bold text-secondary-accent" style="font-variation-settings: 'FILL' 1; color: #c48b00">local_fire_department</span>
        <span>Trending Discussion</span>
    </h4>
    
    <div class="flex flex-col gap-2">
        <a href="#" onclick="searchTrending('ATS')" class="w-full bg-white/80 border border-primary/10 rounded-xl p-2.5 flex justify-between items-center hover:translate-y-[-1px] shadow-sm transition-transform text-left">
            <span class="text-[11px] font-black text-on-surface">🔥 Cara bikin CV ATS Friendly</span>
            <span class="text-[8.5px] font-bold text-on-surface-variant/50 shrink-0">128 komentar</span>
        </a>
        <a href="#" onclick="searchTrending('Excel')" class="w-full bg-white/80 border border-primary/10 rounded-xl p-2.5 flex justify-between items-center hover:translate-y-[-1px] shadow-sm transition-transform text-left">
            <span class="text-[11px] font-black text-on-surface">📊 Belajar Excel dari Nol</span>
            <span class="text-[8.5px] font-bold text-on-surface-variant/50 shrink-0">96 komentar</span>
        </a>
        <a href="#" onclick="searchTrending('UI/UX')" class="w-full bg-white/80 border border-primary/10 rounded-xl p-2.5 flex justify-between items-center hover:translate-y-[-1px] shadow-sm transition-transform text-left">
            <span class="text-[11px] font-black text-on-surface">🗺️ Roadmap UI/UX 2026</span>
            <span class="text-[8.5px] font-bold text-on-surface-variant/50 shrink-0">74 komentar</span>
        </a>
    </div>
</div>

<!-- Card 3: Leaderboard (Mingguan) -->
<div class="glass-card rounded-2xl p-5 flex flex-col gap-4">
    <div class="flex justify-between items-center border-b border-primary/5 pb-2">
        <h4 class="font-extrabold text-[11px] text-on-surface-variant/60 uppercase tracking-widest flex items-center gap-1">
            <span class="material-symbols-outlined text-sm font-bold text-secondary-accent" style="font-variation-settings: 'FILL' 1; color: #c48b00">military_tech</span>
            <span>Leaderboard (Mingguan)</span>
        </h4>
        <a href="leaderboard.html" class="text-tertiary-light text-[10.5px] font-black hover:underline whitespace-nowrap">Lihat Semua</a>
    </div>
    
    <div class="space-y-2.5 font-bold text-[11px]">
        <div class="flex items-center justify-between p-2.5 bg-secondary-accent/10 border border-secondary-accent/20 rounded-xl shadow-sm">
            <span class="flex items-center gap-2">
                <span class="text-sm shrink-0">🥇</span> 
                <span class="font-black text-on-surface leading-none">Kevin Sanjaya</span>
            </span>
            <span class="font-black text-on-surface">1,250 XP</span>
        </div>
        <div class="flex items-center justify-between p-2 bg-neutral-100/40 rounded-xl border border-neutral-200/20">
            <span class="flex items-center gap-2">
                <span class="text-xs shrink-0">🥈</span> 
                <span class="text-on-surface-variant font-bold leading-none">Maya Putri</span>
            </span>
            <span class="text-on-surface-variant/75">980 XP</span>
        </div>
        <div class="flex items-center justify-between p-2 bg-neutral-100/40 rounded-xl border border-neutral-200/20">
            <span class="flex items-center gap-2">
                <span class="text-xs shrink-0">🥉</span> 
                <span class="text-on-surface-variant font-bold leading-none">Rizky Pratama</span>
            </span>
            <span class="text-on-surface-variant/75">760 XP</span>
        </div>
    </div>
</div>

<!-- Card 4: Challenge Mingguan (Teal Glassmorphic) -->
<div class="glass-card rounded-2xl p-5 flex flex-col gap-4" style="background: rgba(96, 178, 171, 0.08); border-color: rgba(96, 178, 171, 0.15)">
    <h4 class="font-extrabold text-[11px] text-tertiary-light uppercase tracking-widest flex items-center gap-1.5">
        <span class="material-symbols-outlined text-sm font-bold text-tertiary-light">military_tech</span>
        <span>Challenge Mingguan</span>
    </h4>
    
    <p class="text-xs font-black text-on-surface leading-snug">Buat desain landing page bertema EduTech!</p>
    
    <button onclick="window.location.href='achievement.html'" class="glow-button w-full py-2.5 bg-primary text-white hover:scale-102 active:scale-98 transition-all rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg shadow-primary/20">Ikut Challenge</button>
</div>
`;

const groupFallback = `
<!-- DUAL VIEW: DISCOVERY HUB & CHAT ROOM -->
<div class="space-y-6">

    <!-- VIEW 1: GROUP DISCOVERY HUB -->
    <div id="group-discovery-view" class="space-y-6">
        

        <!-- SECTION 1: DISARANKAN UNTUK ANDA -->
        <div class="space-y-3">
            <h4 class="font-extrabold text-[13px] text-on-surface/90 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-primary text-lg" style="font-variation-settings: 'FILL' 1;">stars</span>
                <span>Disarankan Untuk Anda</span>
            </h4>
            <div id="suggested-groups-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Populated dynamically -->
            </div>
        </div>

        <!-- SECTION 2: POPULER DI SEKITAR ANDA -->
        <div class="space-y-4 pt-2">
            <div class="flex justify-between items-center">
                <div>
                    <h4 class="font-extrabold text-[15px] text-on-surface">Populer di Sekitar Anda</h4>
                    <p class="text-[10px] font-bold text-on-surface-variant/60">Mengelompokkan orang di area Anda berada.</p>
                </div>
                <a href="#" onclick="showNotice('Fitur Premium', 'Fitur filter geolokasi berbasis IP akan menampilkan komunitas regional terdekat Anda!')" class="text-xs font-black text-primary hover:underline">Lihat Semua</a>
            </div>

            <!-- Grid of Cards resembling the attached mockup -->
            <div id="local-groups-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <!-- Local Card 1: Lowongan Brunei -->
                <div class="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
                    <div class="relative h-44 w-full bg-neutral-100 overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1590073844006-33379778ae09?w=600&auto=format&fit=crop&q=60" alt="Brunei" class="w-full h-full object-cover"/>
                        <button onclick="this.closest('.relative').parentElement.remove()" class="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center absolute top-3.5 right-3.5 backdrop-blur-sm transition-colors">
                            <span class="material-symbols-outlined text-sm font-black">close</span>
                        </button>
                    </div>
                    <div class="p-4 flex-grow flex flex-col justify-between gap-4">
                        <div class="space-y-1">
                            <h5 class="text-[12px] font-black text-on-surface uppercase tracking-wide leading-snug">LOWONGAN KERJA BRUNEI DARUSSALAM</h5>
                            <p class="text-[10px] font-bold text-on-surface-variant/50">23 rb anggota • 8 postingan per bulan</p>
                        </div>
                        <button id="btn-brunei" onclick="toggleJoinLocal('brunei', 'LOWONGAN KERJA BRUNEI', 'office')" class="w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-primary hover:text-white font-black text-xs text-on-surface-variant transition-all">
                            Gabung ke grup
                        </button>
                    </div>
                </div>

                <!-- Local Card 2: Little Empire MMO -->
                <div class="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
                    <div class="relative h-44 w-full bg-neutral-100 overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=60" alt="Gaming MMO" class="w-full h-full object-cover"/>
                        <button onclick="this.closest('.relative').parentElement.remove()" class="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center absolute top-3.5 right-3.5 backdrop-blur-sm transition-colors">
                            <span class="material-symbols-outlined text-sm font-black">close</span>
                        </button>
                    </div>
                    <div class="p-4 flex-grow flex flex-col justify-between gap-4">
                        <div class="space-y-1">
                            <h5 class="text-[12px] font-black text-on-surface uppercase tracking-wide leading-snug">♦ Little Empire ♦ Android MMO [KasKus]</h5>
                            <p class="text-[10px] font-bold text-on-surface-variant/50">3,4 rb anggota • 7 postingan per bulan</p>
                        </div>
                        <button id="btn-empire" onclick="toggleJoinLocal('empire', 'Little Empire Android MMO', 'coding')" class="w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-primary hover:text-white font-black text-xs text-on-surface-variant transition-all">
                            Gabung ke grup
                        </button>
                    </div>
                </div>

            </div>
        </div>

    </div>

    <!-- VIEW 2: GROUP DETAILS PAGE (REPLICATING FACEBOOK GROUP LOOK EXACTLY) -->
    <div id="group-chat-view" class="space-y-6 hidden">
        
        <!-- Back Navigation Button -->
        <button onclick="closeGroupChatView()" class="flex items-center gap-1.5 text-xs font-black text-primary hover:text-primary-light transition-colors py-1 shrink-0">
            <span class="material-symbols-outlined text-base">arrow_back</span>
            <span>Kembali ke Penjelajah Grup</span>
        </button>

        <!-- Group Cover & Meta Info Header Card -->
        <div class="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm space-y-4">
            <!-- Cover Banner Image -->
            <div class="h-44 sm:h-56 md:h-64 w-full bg-neutral-100 relative">
                <img id="detail-group-cover" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80" alt="Cover" class="w-full h-full object-cover"/>
            </div>
            
            <!-- Group Info Row -->
            <div class="px-6 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-primary/5">
                <div class="space-y-1">
                    <h2 id="detail-group-title" class="text-lg md:text-xl font-black text-on-surface">General Discussion Community</h2>
                    <div class="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/60">
                        <span class="material-symbols-outlined text-sm font-black" id="detail-group-privacy-icon">public</span>
                        <span id="detail-group-privacy-text">Grup Publik</span>
                        <span>•</span>
                        <span id="detail-group-members">24.5 rb anggota</span>
                    </div>
                </div>
                
                <!-- CTA Action buttons -->
                <div class="flex items-center gap-2 w-full md:w-auto shrink-0">
                    <button id="detail-group-join-btn" class="flex-grow md:flex-grow-0 bg-primary text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 hover:scale-103 active:scale-97 transition-all glow-button">
                        <span class="material-symbols-outlined text-sm font-black">group_add</span>
                        <span>Gabung ke grup</span>
                    </button>
                    <button onclick="showNotice('Dibagikan!', 'Tautan grup berhasil disalin ke papan klip.')" class="bg-neutral-100 hover:bg-neutral-200 text-on-surface-variant font-black text-xs px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5">
                        <span class="material-symbols-outlined text-sm font-black">share</span>
                        <span>Bagikan</span>
                    </button>
                    <button class="w-10 h-10 bg-neutral-100 hover:bg-neutral-200 text-on-surface-variant rounded-xl flex items-center justify-center transition-all shrink-0">
                        <span class="material-symbols-outlined text-sm font-black">expand_more</span>
                    </button>
                </div>
            </div>
            
            <!-- Navigation Tabs -->
            <div class="px-6 flex items-center justify-between overflow-x-auto gap-4 scrollbar-none">
                <div class="flex items-center gap-6">
                    <button onclick="switchGroupTab('diskusi')" id="gtab-diskusi" class="group-tab-btn border-b-2 border-primary text-primary font-black text-[11px] pb-3.5 pt-1.5 transition-all">Diskusi</button>
                    <button onclick="switchGroupTab('tentang')" id="gtab-tentang" class="group-tab-btn border-b-2 border-transparent text-on-surface-variant/60 hover:text-on-surface font-bold text-[11px] pb-3.5 pt-1.5 transition-all">Tentang</button>
                    <button onclick="switchGroupTab('orang')" id="gtab-orang" class="group-tab-btn border-b-2 border-transparent text-on-surface-variant/60 hover:text-on-surface font-bold text-[11px] pb-3.5 pt-1.5 transition-all">Orang</button>
                    <button onclick="switchGroupTab('media')" id="gtab-media" class="group-tab-btn border-b-2 border-transparent text-on-surface-variant/60 hover:text-on-surface font-bold text-[11px] pb-3.5 pt-1.5 transition-all">Media</button>
                </div>
                
                <div class="flex items-center gap-2 pb-2">
                    <button onclick="showNotice('Pencarian Grup', 'Gunakan fitur pencarian inline untuk mencari bahasan spesifik!')" class="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-on-surface-variant">
                        <span class="material-symbols-outlined text-base">search</span>
                    </button>
                    <button class="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-on-surface-variant">
                        <span class="material-symbols-outlined text-base">more_horiz</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Two Columns Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <!-- LEFT COLUMN: Postings Feed and Creator -->
            <div class="lg:col-span-8 space-y-5">
                
                <!-- Tulis Sesuatu Box -->
                <div class="bg-white border border-primary/5 rounded-2xl p-4 shadow-sm space-y-4">
                    <div class="flex items-center gap-3">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" class="w-10 h-10 rounded-full object-cover"/>
                        <input id="group-post-input" type="text" placeholder="Tulis sesuatu..." onkeydown="if(event.key === 'Enter') submitNewGroupPost()" class="flex-grow bg-neutral-100 hover:bg-neutral-200/60 rounded-full py-2.5 px-4 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"/>
                    </div>
                    
                    <div class="border-t border-primary/5 pt-3 flex items-center justify-around gap-2 text-on-surface-variant/70 text-[10px] font-black">
                        <button onclick="showNotice('Fitur Tambahan', 'Unggah perasaan atau ekspresikan aktivitas belajar Anda!')" class="flex items-center gap-1.5 hover:bg-neutral-100 px-3 py-2 rounded-xl transition-all">
                            <span class="material-symbols-outlined text-base text-yellow-500" style="font-variation-settings: 'FILL' 1;">sentiment_satisfied</span>
                            <span>Perasaan/aktivitas</span>
                        </button>
                        <button onclick="showNotice('Fitur Tambahan', 'Tandai lokasi belajar bersama teman Anda!')" class="flex items-center gap-1.5 hover:bg-neutral-100 px-3 py-2 rounded-xl transition-all">
                            <span class="material-symbols-outlined text-base text-coral" style="font-variation-settings: 'FILL' 1;">location_on</span>
                            <span>Singgah</span>
                        </button>
                        <button onclick="showNotice('Buat Polling', 'Buat jajak pendapat interaktif untuk anggota grup!')" class="flex items-center gap-1.5 hover:bg-neutral-100 px-3 py-2 rounded-xl transition-all">
                            <span class="material-symbols-outlined text-base text-primary" style="font-variation-settings: 'FILL' 1;">bar_chart</span>
                            <span>Polling</span>
                        </button>
                    </div>
                </div>

                <!-- Dynamic Post stream area -->
                <div id="group-posts-stream" class="space-y-5">
                    <!-- Loaded dynamically -->
                </div>

            </div>

            <!-- RIGHT COLUMN: Metadata Widgets -->
            <div class="lg:col-span-4 space-y-5">
                
                <!-- Tentang Card -->
                <div class="bg-white border border-primary/5 rounded-2xl p-5 shadow-sm space-y-4">
                    <h4 class="font-black text-xs text-on-surface">Tentang</h4>
                    <p id="detail-group-about-desc" class="text-xs font-medium text-on-surface-variant/80 leading-relaxed"></p>
                    
                    <div class="space-y-3.5 border-t border-primary/5 pt-4">
                        <div class="flex items-start gap-3 text-xs">
                            <span class="material-symbols-outlined text-on-surface-variant/60 text-lg shrink-0">public</span>
                            <div class="space-y-0.5">
                                <h5 class="font-black text-on-surface leading-none">Publik</h5>
                                <p class="text-[10px] text-on-surface-variant/60 font-medium leading-normal">Siapa pun bisa melihat siapa saja anggota grup ini dan apa yang mereka posting.</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start gap-3 text-xs">
                            <span class="material-symbols-outlined text-on-surface-variant/60 text-lg shrink-0">visibility</span>
                            <div class="space-y-0.5">
                                <h5 class="font-black text-on-surface leading-none">Dapat dilihat</h5>
                                <p class="text-[10px] text-on-surface-variant/60 font-medium leading-normal">Semua orang bisa menemukan grup ini dengan mudah di penjelajah.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Media Terbaru Card -->
                <div class="bg-white border border-primary/5 rounded-2xl p-5 shadow-sm space-y-4">
                    <div class="flex justify-between items-center">
                        <h4 class="font-black text-xs text-on-surface">Media terbaru</h4>
                        <a href="#" onclick="showNotice('Galeri Foto', 'Tampilkan seluruh berkas gambar dan visual yang diunggah anggota.')" class="text-[10px] font-black text-primary hover:underline">Lihat Semua</a>
                    </div>
                    
                    <!-- Grid of 4 images -->
                    <div id="detail-group-media-grid" class="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
                        <!-- Loaded dynamically -->
                    </div>
                </div>

            </div>

        </div>
    </div>

</div>
`;

const mentorFallback = `
<!-- PANEL 3: MENTOR SPOTLIGHT & CONSULTATIONS (Center Panel) -->
<div class="flex flex-col gap-6">

    <!-- Hero Banner with Quick Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <!-- Left: Headline and Tagline -->
        <div class="lg:col-span-7 flex flex-col justify-center space-y-2">
            <h2 class="font-extrabold text-2xl md:text-3xl text-on-surface leading-tight tracking-tight">
                Belajar & Berkembang <br/>
                Bersama <span class="text-primary bg-primary/5 rounded-xl px-2">Mentor Hebat</span>
            </h2>
            <p class="text-on-surface-variant/70 text-xs font-bold leading-relaxed max-w-md">
                Dapatkan bimbingan langsung dari praktisi berpengalaman dari top tech companies dan percepat perjalanan karir serta skill-mu.
            </p>
        </div>

        <!-- Right: Stats Panel -->
        <div class="lg:col-span-5 grid grid-cols-2 gap-3 bg-[#FAF6F0]/80 border border-primary/10 rounded-2xl p-4 shadow-sm relative overflow-hidden select-none">
            <div class="space-y-0.5 text-center flex flex-col justify-center p-2.5 bg-white/70 rounded-xl border border-primary/5">
                <span class="text-lg font-black text-primary leading-none">35+</span>
                <span class="text-[8.5px] font-black text-on-surface-variant/50 uppercase tracking-wide">Mentor Aktif</span>
            </div>
            <div class="space-y-0.5 text-center flex flex-col justify-center p-2.5 bg-white/70 rounded-xl border border-primary/5">
                <span class="text-lg font-black text-[#6A4BFF] leading-none">1.250+</span>
                <span class="text-[8.5px] font-black text-on-surface-variant/50 uppercase tracking-wide">Sesi Mentoring</span>
            </div>
            <div class="space-y-0.5 text-center flex flex-col justify-center p-2.5 bg-white/70 rounded-xl border border-primary/5">
                <span class="text-lg font-black text-[#e3aa1a] leading-none">4.9/5</span>
                <span class="text-[8.5px] font-black text-on-surface-variant/50 uppercase tracking-wide">Rating Mentor</span>
            </div>
            <div class="space-y-0.5 text-center flex flex-col justify-center p-2.5 bg-white/70 rounded-xl border border-primary/5">
                <span class="text-lg font-black text-[#20a48a] leading-none">98%</span>
                <span class="text-[8.5px] font-black text-on-surface-variant/50 uppercase tracking-wide">Siswa Puas</span>
            </div>
        </div>
    </div>

    <!-- Mentor Selector Tabs bar (Sticky top) -->
    <div class="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-primary/5 py-3 px-1 -mx-1 flex justify-between items-center rounded-b-xl shadow-sm mb-1 select-none">
        <div class="flex gap-4 font-black text-xs">
            <button onclick="filterMentorTab('semua', this)" class="mentor-tab-btn text-primary border-b-2 border-primary pb-1">Semua Mentor</button>
            <button onclick="filterMentorTab('favorit', this)" class="mentor-tab-btn text-on-surface-variant/50 hover:text-primary transition-colors pb-1">Mentor Favorit</button>
            <button onclick="filterMentorTab('saya', this)" class="mentor-tab-btn text-on-surface-variant/50 hover:text-primary transition-colors pb-1">Mentor Saya</button>
            <button onclick="filterMentorTab('riwayat', this)" class="mentor-tab-btn text-on-surface-variant/50 hover:text-primary transition-colors pb-1">Riwayat Sesi</button>
        </div>
        
        <div class="flex items-center gap-1 border border-primary/15 rounded-full px-3 py-1 bg-white/80 text-[9.5px] font-black shadow-sm cursor-pointer hover:bg-white transition-colors">
            <span>Urutkan: Terpopuler</span>
            <span class="material-symbols-outlined text-xs">keyboard_arrow_down</span>
        </div>
    </div>

    <!-- Mentor Grid List of 8 cards -->
    <div id="mentor-grid-container" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <!-- Card 1: Dimas Pratama -->
        <div class="glass-card rounded-2xl p-5 border border-primary/10 hover:border-primary/25 transition-all duration-200 bg-white flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow">
            <div class="absolute top-3 right-3 w-7 h-7 bg-[#FFF5F3] text-primary border border-primary/10 rounded-full flex items-center justify-center text-xs font-black shadow-sm select-none">👑</div>
            <div class="space-y-3.5">
                <div class="flex items-center gap-3">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQlgX9G2HBuDhqDtUojpm0MesHmY6kzelS3zL-PmSDFbmEYmr4hfqsgJqa88dNMJzyXzvVdLTyKOrAliTx5JXkipmfF8qTI4vjHjIrcIf1RQDXbw63vpQIZBX8VkTOyCPK2E7wIpixERadCJUm4CtIYmzmLT8UIIWDI6Ojs8xXw6b9RtZQ5fW5-QjmllhAcyKJlZmYZAi1OseMVPmAs1na6I-bAZV1TwS0dNwXLeZqiciDmw9QIPtGNlQnbPaY4tB38AH2yE9EHg" alt="Dimas Pratama" class="w-12 h-12 rounded-full border border-primary/15 object-cover"/>
                    <div>
                        <h4 class="text-xs font-black text-on-surface">Dimas Pratama</h4>
                        <p class="text-[9px] text-tertiary-light font-black uppercase mt-0.5">Public Speaking Specialist</p>
                    </div>
                </div>
                <div class="flex flex-wrap gap-1">
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">Public Speaking</span>
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">Presentation</span>
                </div>
            </div>
            <div class="flex items-center justify-between border-t border-primary/5 pt-3 mt-4">
                <span class="text-[10px] font-black text-[#e3aa1a] flex items-center gap-1">⭐ 4.9 <span class="text-on-surface-variant/40 font-bold">(230 ulasan)</span></span>
                <button onclick="selectMentorForBooking('Dimas Pratama')" class="px-4.5 py-1.5 rounded-xl border border-primary/15 hover:border-primary bg-transparent hover:bg-primary hover:text-white text-[9.5px] font-black uppercase tracking-wide transition-all select-none">Lihat Profil</button>
            </div>
        </div>

        <!-- Card 2: Aulia Rizky -->
        <div class="glass-card rounded-2xl p-5 border border-primary/10 hover:border-primary/25 transition-all duration-200 bg-white flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow">
            <div class="absolute top-3 right-3 w-7 h-7 bg-[#E8F8F5] text-[#20a48a] border border-[#20a48a]/10 rounded-full flex items-center justify-center text-xs font-black shadow-sm select-none">🛡️</div>
            <div class="space-y-3.5">
                <div class="flex items-center gap-3">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVqCS4JcK8zSkdk8gF67Dogn_DsKXfgMf6HabnC0Wu3zPc-OVbdAz1ai38rGgkKZ3JA7nO1RlKd7WRxZEIEdk-vLiE7BL7zkVOOetgR2mNL-Gpf59nMLT80L_nFcD7MJBbGr0JZz60g2CB2zG9Y62yjuMlL_DWWscx-q2b6alE0zeRBQnD6MSxYQyqvSTXl9GtjhhW7HpmKGnEKGOKcrItgzr7uOJ_CCfrBsP-M1xXv8ERFnBL8oEpM5lwdy8Qpd6IsC6eGkvaHQ" alt="Aulia Rizky" class="w-12 h-12 rounded-full border border-primary/15 object-cover"/>
                    <div>
                        <h4 class="text-xs font-black text-on-surface">Aulia Rizky</h4>
                        <p class="text-[9px] text-tertiary-light font-black uppercase mt-0.5">UI/UX Designer</p>
                    </div>
                </div>
                <div class="flex flex-wrap gap-1">
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">UI/UX Design</span>
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">Figma</span>
                </div>
            </div>
            <div class="flex items-center justify-between border-t border-primary/5 pt-3 mt-4">
                <span class="text-[10px] font-black text-[#e3aa1a] flex items-center gap-1">⭐ 4.9 <span class="text-on-surface-variant/40 font-bold">(198 ulasan)</span></span>
                <button onclick="selectMentorForBooking('Aulia Rizky')" class="px-4.5 py-1.5 rounded-xl border border-primary/15 hover:border-primary bg-transparent hover:bg-primary hover:text-white text-[9.5px] font-black uppercase tracking-wide transition-all select-none">Lihat Profil</button>
            </div>
        </div>

        <!-- Card 3: Rizky Pratama -->
        <div class="glass-card rounded-2xl p-5 border border-primary/10 hover:border-primary/25 transition-all duration-200 bg-white flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow">
            <div class="absolute top-3 right-3 w-7 h-7 bg-red-50 text-red-600 border border-red-200 rounded-full flex items-center justify-center text-xs font-black shadow-sm select-none">⚡</div>
            <div class="space-y-3.5">
                <div class="flex items-center gap-3">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrDwQ38P9xccl4LXirzosKAl7xaOSfwkZaoHlzA40tsxE_VFm3GdPvdM1wPFGeNhiKR9pdZxeieA9gWHbZYjt2AUV968G_E2q4TixttPeEzl-APHWOnRDS-AudKSU3wjQ0mJg8UVOo1OIzW4K_X0PZrtiFraV8HvRigyoargdKXnym4q-Rq5fq_rgHPVjNL9PBnfm2A6A5Skgr6IsxRLtqU8JDt3dve4zaQBkjZjhSSDm7TLrpNqfKE8mUClooAmR0fxQCB4WUA" alt="Rizky Pratama" class="w-12 h-12 rounded-full border border-primary/15 object-cover"/>
                    <div>
                        <h4 class="text-xs font-black text-on-surface">Rizky Pratama</h4>
                        <p class="text-[9px] text-tertiary-light font-black uppercase mt-0.5">Microsoft Office Expert</p>
                    </div>
                </div>
                <div class="flex flex-wrap gap-1">
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">Excel</span>
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">PowerPoint</span>
                </div>
            </div>
            <div class="flex items-center justify-between border-t border-primary/5 pt-3 mt-4">
                <span class="text-[10px] font-black text-[#e3aa1a] flex items-center gap-1">⭐ 4.8 <span class="text-on-surface-variant/40 font-bold">(312 ulasan)</span></span>
                <button onclick="selectMentorForBooking('Rizky Pratama')" class="px-4.5 py-1.5 rounded-xl border border-primary/15 hover:border-primary bg-transparent hover:bg-primary hover:text-white text-[9.5px] font-black uppercase tracking-wide transition-all select-none">Lihat Profil</button>
            </div>
        </div>

        <!-- Card 4: Sarah Wijaya -->
        <div class="glass-card rounded-2xl p-5 border border-primary/10 hover:border-primary/25 transition-all duration-200 bg-white flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow">
            <div class="absolute top-3 right-3 w-7 h-7 bg-[#EFE9FF] text-[#6A4BFF] border border-[#6A4BFF]/10 rounded-full flex items-center justify-center text-xs font-black shadow-sm select-none">🏅</div>
            <div class="space-y-3.5">
                <div class="flex items-center gap-3">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDssyzQLmMMfFWttctiYSzDFJhuKJM4G_skmst8A0zZ8GnyvH6YOUiKAr9PIh87ilXPLcDVwYGbInuXwRddrRB9IQ_wYGqaNfFRdVpGlCdIzH_cFGrO5o2mQ585QYUSq76zI-uLmFiMotk8vgwsnX-XTLzhM8YO7iW22MfL6VcglCf7H2bHa9_ZSPJknCIjBpNbDimgKbqlDDP1y5HWs9yrb35SUxmNrzc8fZfPHEDwR3vQUyV7YGQyL8SdTmJOfkRoblQ6YZgoBQ" alt="Sarah Wijaya" class="w-12 h-12 rounded-full border border-primary/15 object-cover"/>
                    <div>
                        <h4 class="text-xs font-black text-on-surface">Sarah Wijaya</h4>
                        <p class="text-[9px] text-tertiary-light font-black uppercase mt-0.5">Career & HR Consultant</p>
                    </div>
                </div>
                <div class="flex flex-wrap gap-1">
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">Career Prep</span>
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">CV Writing</span>
                </div>
            </div>
            <div class="flex items-center justify-between border-t border-primary/5 pt-3 mt-4">
                <span class="text-[10px] font-black text-[#e3aa1a] flex items-center gap-1">⭐ 4.9 <span class="text-on-surface-variant/40 font-bold">(156 ulasan)</span></span>
                <button onclick="selectMentorForBooking('Sarah Wijaya')" class="px-4.5 py-1.5 rounded-xl border border-primary/15 hover:border-primary bg-transparent hover:bg-primary hover:text-white text-[9.5px] font-black uppercase tracking-wide transition-all select-none">Lihat Profil</button>
            </div>
        </div>

        <!-- Card 5: Fajar Maulana -->
        <div class="glass-card rounded-2xl p-5 border border-primary/10 hover:border-primary/25 transition-all duration-200 bg-white flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow">
            <div class="absolute top-3 right-3 w-7 h-7 bg-[#E8F8F5] text-[#20a48a] border border-[#20a48a]/10 rounded-full flex items-center justify-center text-xs font-black shadow-sm select-none">&lt;&gt;</div>
            <div class="space-y-3.5">
                <div class="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Fajar Maulana" class="w-12 h-12 rounded-full border border-primary/15 object-cover"/>
                    <div>
                        <h4 class="text-xs font-black text-on-surface">Fajar Maulana</h4>
                        <p class="text-[9px] text-tertiary-light font-black uppercase mt-0.5">Full Stack Developer</p>
                    </div>
                </div>
                <div class="flex flex-wrap gap-1">
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">JavaScript</span>
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">React</span>
                </div>
            </div>
            <div class="flex items-center justify-between border-t border-primary/5 pt-3 mt-4">
                <span class="text-[10px] font-black text-[#e3aa1a] flex items-center gap-1">⭐ 4.8 <span class="text-on-surface-variant/40 font-bold">(178 ulasan)</span></span>
                <button onclick="selectMentorForBooking('Fajar Maulana')" class="px-4.5 py-1.5 rounded-xl border border-primary/15 hover:border-primary bg-transparent hover:bg-primary hover:text-white text-[9.5px] font-black uppercase tracking-wide transition-all select-none">Lihat Profil</button>
            </div>
        </div>

        <!-- Card 6: Maya Putri -->
        <div class="glass-card rounded-2xl p-5 border border-primary/10 hover:border-primary/25 transition-all duration-200 bg-white flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow">
            <div class="absolute top-3 right-3 w-7 h-7 bg-orange-50 text-orange-600 border border-orange-200 rounded-full flex items-center justify-center text-xs font-black shadow-sm select-none">📝</div>
            <div class="space-y-3.5">
                <div class="flex items-center gap-3">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB04QHkH6tB9ZzxuotPYoJyGEnbZp8Jl3ioaVh9nkSh32h_hIkOi7tW6KhkkSYXy3yhpHDYjM0OzBdkx7gwUSVRDodciM_U-MlxAn0olsTIw6IF9Fd1TPHV8qMZSLsngnPjrweW7YGnsUQpLqjmALtNvhwct6rAdQHmjAKvMbIqvEups2BYCQnDdcYJ1907DoY-Cf8ZZCWpL5NTXiR6TXP0itxQ7q8lJkfJsn7FI_Pfcd_q7eRfUZotZr5p0SJnYm1GekY0YUrWjg" alt="Maya Putri" class="w-12 h-12 rounded-full border border-primary/15 object-cover"/>
                    <div>
                        <h4 class="text-xs font-black text-on-surface">Maya Putri</h4>
                        <p class="text-[9px] text-tertiary-light font-black uppercase mt-0.5">English Language Coach</p>
                    </div>
                </div>
                <div class="flex flex-wrap gap-1">
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">English Speaking</span>
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">TOEFL</span>
                </div>
            </div>
            <div class="flex items-center justify-between border-t border-primary/5 pt-3 mt-4">
                <span class="text-[10px] font-black text-[#e3aa1a] flex items-center gap-1">⭐ 4.9 <span class="text-on-surface-variant/40 font-bold">(265 ulasan)</span></span>
                <button onclick="selectMentorForBooking('Maya Putri')" class="px-4.5 py-1.5 rounded-xl border border-primary/15 hover:border-primary bg-transparent hover:bg-primary hover:text-white text-[9.5px] font-black uppercase tracking-wide transition-all select-none">Lihat Profil</button>
            </div>
        </div>

        <!-- Card 7: Yoga Adi -->
        <div class="glass-card rounded-2xl p-5 border border-primary/10 hover:border-primary/25 transition-all duration-200 bg-white flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow">
            <div class="absolute top-3 right-3 w-7 h-7 bg-[#EFE9FF] text-[#6A4BFF] border border-[#6A4BFF]/10 rounded-full flex items-center justify-center text-xs font-black shadow-sm select-none">📢</div>
            <div class="space-y-3.5">
                <div class="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Yoga Adi" class="w-12 h-12 rounded-full border border-primary/15 object-cover"/>
                    <div>
                        <h4 class="text-xs font-black text-on-surface">Yoga Adi</h4>
                        <p class="text-[9px] text-tertiary-light font-black uppercase mt-0.5">Digital Marketing Specialist</p>
                    </div>
                </div>
                <div class="flex flex-wrap gap-1">
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">Digital Marketing</span>
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">Ads</span>
                </div>
            </div>
            <div class="flex items-center justify-between border-t border-primary/5 pt-3 mt-4">
                <span class="text-[10px] font-black text-[#e3aa1a] flex items-center gap-1">⭐ 4.7 <span class="text-on-surface-variant/40 font-bold">(129 ulasan)</span></span>
                <button onclick="selectMentorForBooking('Yoga Adi')" class="px-4.5 py-1.5 rounded-xl border border-primary/15 hover:border-primary bg-transparent hover:bg-primary hover:text-white text-[9.5px] font-black uppercase tracking-wide transition-all select-none">Lihat Profil</button>
            </div>
        </div>

        <!-- Card 8: Putri Ananda -->
        <div class="glass-card rounded-2xl p-5 border border-primary/10 hover:border-primary/25 transition-all duration-200 bg-white flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow">
            <div class="absolute top-3 right-3 w-7 h-7 bg-yellow-50 text-[#e3aa1a] border border-yellow-200 rounded-full flex items-center justify-center text-xs font-black shadow-sm select-none">💛</div>
            <div class="space-y-3.5">
                <div class="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Putri Ananda" class="w-12 h-12 rounded-full border border-primary/15 object-cover"/>
                    <div>
                        <h4 class="text-xs font-black text-on-surface">Putri Ananda</h4>
                        <p class="text-[9px] text-tertiary-light font-black uppercase mt-0.5">Canva & Design Trainer</p>
                    </div>
                </div>
                <div class="flex flex-wrap gap-1">
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">Canva</span>
                    <span class="bg-neutral-100 text-on-surface-variant/80 text-[8.5px] px-2.5 py-0.5 rounded-full font-black border border-neutral-200/5">Design</span>
                </div>
            </div>
            <div class="flex items-center justify-between border-t border-primary/5 pt-3 mt-4">
                <span class="text-[10px] font-black text-[#e3aa1a] flex items-center gap-1">⭐ 4.8 <span class="text-on-surface-variant/40 font-bold">(210 ulasan)</span></span>
                <button onclick="selectMentorForBooking('Putri Ananda')" class="px-4.5 py-1.5 rounded-xl border border-primary/15 hover:border-primary bg-transparent hover:bg-primary hover:text-white text-[9.5px] font-black uppercase tracking-wide transition-all select-none">Lihat Profil</button>
            </div>
        </div>

    </div>

    <!-- Center Footer Indicator / Load more -->
    <div class="flex flex-col items-center py-6 select-none shrink-0">
        <button onclick="showNotice('Muat Lebih Banyak', 'Mengambil profil mentor berprestasi lainnya untuk Anda...')" class="px-6 py-2 bg-white border border-primary/10 hover:bg-neutral-50 rounded-xl text-[10.5px] font-black uppercase tracking-wider text-on-surface-variant transition-all shadow-sm flex items-center gap-1.5 active:scale-97">
            <span>Muat Lebih Banyak</span>
            <span class="material-symbols-outlined text-xs">keyboard_arrow_down</span>
        </button>
    </div>

</div>
`;

const postFallback = `
<!-- PANEL 4: PUBLISH NEW POST FORM & MY POSTS -->
<div class="max-w-2xl mx-auto space-y-6">

    <!-- Card 1: Publish New Post Form -->
    <div class="glass-card rounded-2xl p-6 space-y-6 bg-white/80">
        <h3 class="font-headline-md text-xl text-primary font-black flex items-center gap-2 border-b border-primary/5 pb-3">
            <span class="material-symbols-outlined text-primary text-2xl">edit_document</span>
            <span>Terbitkan Postingan Komunitas</span>
        </h3>

        <form id="create-post-form" onsubmit="publishPost(event)" class="space-y-4">
            <div class="space-y-1">
                <label class="block text-[9px] font-black text-on-surface-variant/50 uppercase tracking-widest">Judul Postingan / Pertanyaan</label>
                <input id="new-post-title" type="text" required placeholder="Tuliskan judul yang menarik..." class="w-full text-xs font-bold py-2.5 px-4 border border-primary/10 rounded-xl bg-white focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"/>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-on-surface-variant/50 uppercase tracking-widest">Kategori Tag</label>
                    <select id="new-post-tag" class="w-full text-xs font-bold py-2.5 px-4 border border-primary/10 rounded-xl bg-white focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none">
                        <option value="Coding">Coding</option>
                        <option value="Design">Design</option>
                        <option value="Tips Belajar">Tips Belajar</option>
                        <option value="Student Project">Student Project</option>
                        <option value="Update Mentor">Update Mentor</option>
                    </select>
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-on-surface-variant/50 uppercase tracking-widest">Tambahkan Cover Gambar</label>
                    <select id="new-post-image" class="w-full text-xs font-bold py-2.5 px-4 border border-primary/10 rounded-xl bg-white focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none">
                        <option value="none">Tanpa Gambar</option>
                        <option value="design-mock">UI/UX Layout Template Mockup</option>
                        <option value="code-mock">Web Coding Workspace Mockup</option>
                    </select>
                </div>
            </div>

            <div class="space-y-1">
                <label class="block text-[9px] font-black text-on-surface-variant/50 uppercase tracking-widest">Isi Diskusi</label>
                <textarea id="new-post-body" rows="5" required placeholder="Jelaskan pertanyaan atau informasi Anda secara detail..." class="w-full text-xs font-bold p-4 border border-primary/10 rounded-2xl bg-white focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"></textarea>
            </div>

            <div class="pt-2">
                <button type="submit" class="w-full bg-primary text-white glow-button font-black py-3 rounded-full text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-lg shadow-primary/20">
                    <span>Kirim Postingan</span>
                    <span class="material-symbols-outlined text-sm font-bold">send</span>
                </button>
            </div>
        </form>
    </div>

    <!-- Section Divider / Label -->
    <div class="flex items-center gap-4 py-2 select-none">
        <div class="flex-grow h-px bg-primary/10"></div>
        <h4 class="font-extrabold text-[11px] text-primary uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap">
            <span class="material-symbols-outlined text-sm font-bold">history_edu</span>
            <span>Postingan Saya & Balasan</span>
        </h4>
        <div class="flex-grow h-px bg-primary/10"></div>
    </div>

    <!-- Card 2: My Posts History Container -->
    <div id="my-posts-container" class="space-y-5">
        <!-- Dynamic posts & comments loaded here -->
    </div>

</div>
`;

// Loader Engine
document.addEventListener("DOMContentLoaded", () => {
    const isLocalFile = window.location.protocol === "file:";

    // Promise list to track injection before rendering dynamic items
    const loaders = [];

    // Helper loader function
    function loadPlaceholder(elementId, fileName, fallbackHtml) {
        const placeholder = document.getElementById(elementId);
        if (!placeholder) return;

        if (isLocalFile) {
            placeholder.innerHTML = fallbackHtml;
        } else {
            const promise = fetch(fileName)
                .then(response => {
                    if (!response.ok) throw new Error("Load failed");
                    return response.text();
                })
                .then(html => {
                    placeholder.innerHTML = html;
                })
                .catch(err => {
                    console.warn(`Failed loading ${fileName} via fetch, falling back:`, err);
                    placeholder.innerHTML = fallbackHtml;
                });
            loaders.push(promise);
        }
    }

    // Load elements into DOM
    loadPlaceholder("community-navbar-placeholder", "community_navbar.html", navbarFallback);
    loadPlaceholder("community-sidebar-left-placeholder", "community_sidebar_left.html", sidebarLeftFallback);
    loadPlaceholder("community-sidebar-right-placeholder", "community_sidebar_right.html", sidebarRightFallback);
    loadPlaceholder("panel-grup", "community_group.html", groupFallback);
    loadPlaceholder("panel-mentor", "community_mentor.html", mentorFallback);
    loadPlaceholder("panel-postingan", "community_post.html", postFallback);

    // After all components are successfully loaded, trigger the initial renders!
    if (loaders.length > 0) {
        Promise.all(loaders).then(() => {
            initializeCommunityEngine();
        });
    } else {
        // Runs immediately if using instant local fallback variables
        initializeCommunityEngine();
    }
});

// Community Renders & States init
function initializeCommunityEngine() {
    if (typeof renderChatChannels === "function") renderChatChannels();
    if (typeof renderChatMessages === "function") renderChatMessages();
    if (typeof renderMentors === "function") renderMentors();
    if (typeof renderDiscoveryGroups === "function") renderDiscoveryGroups();
    if (typeof renderMyPosts === "function") renderMyPosts();
}

// ==========================================
// GROUP DISCOVERY & CHAT REGISTRATION STATE
// ==========================================

let DISCOVERY_GROUPS = [
    {
        id: "uiux",
        title: "UI/UX & Product Design Academy",
        category: "Design",
        members: "18.2 rb",
        activity: "54 postingan per minggu",
        desc: "Kembangkan keahlian desain interface dan riset pengguna dengan metodologi modern.",
        image: "https://images.unsplash.com/photo-1561070791-26c113006238?w=600&auto=format&fit=crop&q=60",
        joined: false,
        icon: "🎨"
    },
    {
        id: "coding",
        title: "Coding & Frontend Bootcamp",
        category: "Coding",
        members: "15.4 rb",
        activity: "92 postingan per minggu",
        desc: "Belajar HTML, CSS, JS, React, Node.js bersama dari dasar hingga siap kerja.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60",
        joined: false,
        icon: "</>"
    },
    {
        id: "office",
        title: "Ms Office Professional Suite",
        category: "Office",
        members: "12.8 rb",
        activity: "32 postingan per bulan",
        desc: "Kuasai Word, Excel (VLOOKUP, Macro), dan PPT untuk menunjang karir admin.",
        image: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=600&auto=format&fit=crop&q=60",
        joined: false,
        icon: "X"
    },
    {
        id: "career",
        title: "Career Prep & Interview Simulation",
        category: "Career",
        members: "8.9 rb",
        activity: "15 postingan per bulan",
        desc: "Persiapan kerja matang: kupas tuntas CV ATS, teknik wawancara, dan negosiasi gaji.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=60",
        joined: false,
        icon: "💼"
    }
];

// Active Joined local groups registry
let JOINED_LOCAL_GROUPS = {
    brunei: false,
    empire: false
};

let activeGroupCategory = "Semua";

// Render Suggested Groups Grid
function renderDiscoveryGroups() {
    const grid = document.getElementById("suggested-groups-grid");
    if (!grid) return;

    let html = "";
    
    // Filter by category and search input
    const searchInput = document.getElementById("search-group-input");
    const searchQuery = (searchInput ? searchInput.value : "").toLowerCase();

    const filtered = DISCOVERY_GROUPS.filter(g => {
        const matchesCat = activeGroupCategory === "Semua" || g.category === activeGroupCategory;
        const matchesSearch = g.title.toLowerCase().includes(searchQuery) || g.desc.toLowerCase().includes(searchQuery);
        return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-8 text-center text-on-surface-variant/40 font-bold text-xs">
                Tidak ada grup belajar yang cocok dengan pencarian Anda.
            </div>
        `;
        return;
    }

    filtered.forEach(g => {
        const btnHtml = g.joined 
            ? `<button onclick="openGroupChat('${g.id}')" class="w-full py-2.5 rounded-xl bg-primary text-white font-black text-xs shadow-md shadow-primary/20 hover:scale-103 active:scale-97 transition-all flex items-center justify-center gap-1.5 glow-button">
                 <span class="material-symbols-outlined text-sm font-black">forum</span>
                 <span>Buka Diskusi</span>
               </button>`
            : `<button onclick="toggleJoinGroup('${g.id}')" class="w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-primary hover:text-white font-black text-xs text-on-surface-variant transition-all">
                 Gabung ke grup
               </button>`;

        html += `
        <div class="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
            <div class="relative h-36 w-full bg-neutral-100 overflow-hidden shrink-0">
                <img src="${g.image}" alt="${g.title}" class="w-full h-full object-cover"/>
                <span class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-primary/10 rounded-full px-3 py-0.5 text-[9px] font-black uppercase text-primary tracking-wider">${g.category}</span>
                <button onclick="this.closest('.relative').parentElement.remove()" class="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center absolute top-3 right-3 backdrop-blur-sm transition-colors">
                    <span class="material-symbols-outlined text-sm font-black">close</span>
                </button>
            </div>
            <div class="p-4 flex-grow flex flex-col justify-between gap-4">
                <div class="space-y-1">
                    <h5 class="text-[12px] font-black text-on-surface leading-snug line-clamp-1">${g.title}</h5>
                    <p class="text-[10px] font-bold text-on-surface-variant/50">${g.members} anggota • ${g.activity}</p>
                    <p class="text-[10px] text-on-surface-variant/75 font-medium leading-relaxed mt-1 line-clamp-2">${g.desc}</p>
                </div>
                ${btnHtml}
            </div>
        </div>
        `;
    });

    grid.innerHTML = html;
}

// Toggle Join Recommended study groups
function toggleJoinGroup(groupId) {
    const group = DISCOVERY_GROUPS.find(g => g.id === groupId);
    if (!group) return;

    group.joined = true;
    if (typeof showNotice === "function") {
        showNotice("Berhasil Bergabung", `Selamat! Anda telah bergabung dengan grup belajar: ${group.title}. Silakan buka ruang diskusi!`);
    } else {
        alert(`Selamat! Anda telah bergabung dengan grup belajar: ${group.title}.`);
    }
    
    // Update active lists & sidebar shortcuts
    renderDiscoveryGroups();
    updateLeftSidebarJoinedGroups();
}

// Re-render Left Sidebar "Grup Saya" list to show newly joined groups dynamically!
function updateLeftSidebarJoinedGroups() {
    const container = document.querySelector("#community-sidebar-left-placeholder div.flex.flex-col.gap-2");
    if (!container) return;

    let html = `
        <button onclick="openGroupChat('general')" class="w-full flex items-center justify-between p-2 rounded-xl border border-primary-light/15 bg-primary/5 hover:translate-x-0.5 transition-transform text-left">
            <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-primary-light/15 flex items-center justify-center text-primary font-bold text-xs">#</span>
                <span class="text-xs font-black text-primary leading-none">General Discussion</span>
            </div>
            <span class="bg-white/80 border border-primary-light/10 text-[8.5px] font-black text-primary/70 px-2 py-0.5 rounded-full">128</span>
        </button>
    `;

    // Render original mock items + any newly joined groups from discovery database
    DISCOVERY_GROUPS.forEach(g => {
        if (g.joined) {
            html += `
                <button onclick="openGroupChat('${g.id}')" class="w-full flex items-center justify-between p-2 rounded-xl border border-transparent hover:bg-neutral-100/50 hover:border-neutral-200/20 transition-all text-left">
                    <div class="flex items-center gap-2.5">
                        <span class="w-7 h-7 rounded-lg bg-primary-light/10 text-primary flex items-center justify-center font-bold text-xs">${g.icon}</span>
                        <span class="text-xs font-bold text-on-surface-variant leading-none">${g.title.split(' ')[0]} ${g.title.split(' ')[1] || ''}</span>
                    </div>
                    <span class="bg-neutral-100 text-[8.5px] font-black text-on-surface-variant/50 px-2 py-0.5 rounded-full">1</span>
                </button>
            `;
        }
    });

    container.innerHTML = html;
}

// Toggle Join local groups from mockup screenshot
function toggleJoinLocal(groupId, title, targetChatId) {
    const btn = document.getElementById("btn-" + groupId);
    if (!btn) return;

    if (!JOINED_LOCAL_GROUPS[groupId]) {
        JOINED_LOCAL_GROUPS[groupId] = true;
        btn.innerHTML = `
            <span class="flex items-center justify-center gap-1">
                <span class="material-symbols-outlined text-sm font-black">forum</span>
                Buka Diskusi
            </span>
        `;
        btn.className = "w-full py-2.5 rounded-xl bg-primary text-white font-black text-xs shadow-md shadow-primary/20 hover:scale-103 active:scale-97 transition-all flex items-center justify-center glow-button";
        
        if (typeof showNotice === "function") {
            showNotice("Berhasil Bergabung", `Selamat! Anda berhasil bergabung dengan grup lokal: ${title}.`);
        } else {
            alert(`Selamat! Anda berhasil bergabung dengan grup lokal: ${title}.`);
        }
    } else {
        openGroupChat(targetChatId);
    }
}

// Category filter trigger
function filterGroupCategory(catName) {
    activeGroupCategory = catName;
    
    // Style active tag button
    document.querySelectorAll(".group-cat-btn").forEach(btn => {
        if (btn.textContent === catName) {
            btn.className = "group-cat-btn bg-primary text-white font-black text-xs px-4 py-1.5 rounded-full transition-all shadow-md";
        } else {
            btn.className = "group-cat-btn bg-white/80 text-on-surface-variant font-black text-xs px-4 py-1.5 rounded-full border border-primary/10 transition-all hover:bg-neutral-100";
        }
    });

    renderDiscoveryGroups();
}

function filterDiscoveryGroups() {
    renderDiscoveryGroups();
}

// ==========================================
// FACEBOOK-STYLE GROUP DETAILS CONTROLLER
// ==========================================

let activeGroupId = "general";
let activeGroupTab = "diskusi";

const GROUP_DETAILS_DATA = {
    general: {
        title: "General Discussion Community",
        privacy: "Grup Publik",
        privacyIcon: "public",
        members: "24,5 rb anggota",
        desc: "Diskusi santai dan tanya jawab seputar materi pelajaran sekolah bersama teman se-Indonesia.",
        cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80",
        media: [
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&auto=format&fit=crop&q=80"
        ],
        posts: [
            {
                author: "Budi Santoso",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
                time: "10 menit yang lalu",
                content: "Halo temen-temen! Ada yang punya rekomendasi metode belajar coding yang efektif buat anak sekolah ga ya? Kadang suka stuck pas baru mulai belajar HTML & CSS 💻",
                likes: 14,
                comments: 5
            },
            {
                author: "Siti Rahma",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
                time: "1 jam yang lalu",
                content: "Tips belajar produktif versi aku: coba terapin teknik Pomodoro 25 menit fokus penuh, lalu 5 menit istirahat. Efektif banget biar ga gampang ke-distract sama notifikasi HP! 🕒 Let's try guys!",
                likes: 28,
                comments: 8
            }
        ]
    },
    uiux: {
        title: "UI/UX & Product Design Academy",
        privacy: "Grup Publik",
        privacyIcon: "public",
        members: "18,2 rb anggota",
        desc: "Bedah portofolio UI/UX, belajar Figma, prototyping terapan, dan tren user experience terkini.",
        cover: "https://images.unsplash.com/photo-1561070791-26c113006238?w=1000&auto=format&fit=crop&q=80",
        media: [
            "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&auto=format&fit=crop&q=80"
        ],
        posts: [
            {
                author: "Dimas Pratama",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
                time: "20 menit yang lalu",
                content: "Baru aja kelar ngedesain modul landing page e-learning baru buat case study portofolio aku. Kira-kira ada masukan ga ya dari segi kontras warna sama visual hierarchy tombolnya? 🎨✨",
                likes: 19,
                comments: 4
            }
        ]
    },
    coding: {
        title: "Coding & Frontend Bootcamp",
        privacy: "Grup Publik",
        privacyIcon: "public",
        members: "15,4 rb anggota",
        desc: "Kupas tuntas HTML, CSS, JavaScript, React, Tailwind, hingga deployment project siswa.",
        cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80",
        media: [
            "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&auto=format&fit=crop&q=80"
        ],
        posts: [
            {
                author: "Andi Wijaya",
                avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
                time: "Baru saja",
                content: "Mau tanya dong, ada yang tau ga kenapa React hook useEffect aku malah nge-trigger infinite loop pas fetch data API? Padahal dependency array udah aku kasih [] 😭 Tolong pencerahannya suhu!",
                likes: 7,
                comments: 12
            }
        ]
    },
    office: {
        title: "Ms Office Professional Suite",
        privacy: "Grup Publik",
        privacyIcon: "public",
        members: "12,8 rb anggota",
        desc: "Kuasai Word, Excel tingkat lanjut, rumus formula, dan PowerPoint untuk karir profesional.",
        cover: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=1000&auto=format&fit=crop&q=80",
        media: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&auto=format&fit=crop&q=80"
        ],
        posts: [
            {
                author: "Winda Lestari",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
                time: "15 menit yang lalu",
                content: "Tips trik cepet bikin rumus VLOOKUP & INDEX-MATCH bertingkat di Excel biar kerjaan laporan admin kelar dalam 10 menit! Auto dipuji atasan nih 😎 Check it out!",
                likes: 31,
                comments: 6
            }
        ]
    },
    career: {
        title: "Career Prep & Resume ATS",
        privacy: "Grup Publik",
        privacyIcon: "public",
        members: "8,9 rb anggota",
        desc: "Bedah CV ramah sistem ATS, simulasi wawancara kerja, dan persiapan karir di top tech company.",
        cover: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1000&auto=format&fit=crop&q=80",
        media: [
            "https://images.unsplash.com/photo-1521791136364-728a4a394316?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=300&auto=format&fit=crop&q=80"
        ],
        posts: [
            {
                author: "Sarah Wijaya",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
                time: "2 jam yang lalu",
                content: "Jangan pernah jawab 'Kelemahan saya adalah perfeksionis' pas lagi interview user. Ini dia template jawaban profesional pengganti yang terbukti bikin HRD kagum! 💼👇",
                likes: 54,
                comments: 18
            }
        ]
    }
};

// Dual views switcher triggers
function openGroupChat(groupId) {
    const isDetailPage = window.location.pathname.includes("community_group_detail.html");
    
    if (isDetailPage) {
        // Seamlessly update history state & reload details without page refresh!
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?id=' + groupId;
        window.history.pushState({ path: newUrl }, '', newUrl);
        loadGroupDetails(groupId);
    } else {
        // Redirect to standalone group details page
        window.location.href = `community_group_detail.html?id=${groupId}`;
    }
}

function closeGroupChatView() {
    const discoveryView = document.getElementById("group-discovery-view");
    const chatView = document.getElementById("group-chat-view");
    
    if (discoveryView && chatView) {
        discoveryView.classList.remove("hidden");
        chatView.classList.add("hidden");
    }
}

// Load dynamic group details based on active group id
function loadGroupDetails(groupId) {
    activeGroupId = groupId;
    activeGroupTab = "diskusi";
    
    // Fetch detail dataset (fallback to general if not found)
    const data = GROUP_DETAILS_DATA[groupId] || GROUP_DETAILS_DATA.general;

    // Populate Header Card
    const coverImg = document.getElementById("detail-group-cover");
    const titleEl = document.getElementById("detail-group-title");
    const membersEl = document.getElementById("detail-group-members");
    const privacyText = document.getElementById("detail-group-privacy-text");
    const privacyIcon = document.getElementById("detail-group-privacy-icon");
    const aboutDesc = document.getElementById("detail-group-about-desc");

    if (coverImg) coverImg.src = data.cover;
    if (titleEl) titleEl.src = data.title; // Wait, titleEl is h2, should be textContent! Let's check
    if (titleEl) titleEl.textContent = data.title;
    if (membersEl) membersEl.textContent = data.members;
    if (privacyText) privacyText.textContent = data.privacy;
    if (privacyIcon) privacyIcon.textContent = data.privacyIcon;
    if (aboutDesc) aboutDesc.textContent = data.desc;

    // Reset CTA Button state based on joined status
    const joinBtn = document.getElementById("detail-group-join-btn");
    const mainGroup = DISCOVERY_GROUPS.find(g => g.id === groupId) || { joined: false };

    if (joinBtn) {
        if (mainGroup.joined || JOINED_LOCAL_GROUPS[groupId]) {
            joinBtn.innerHTML = `
                <span class="material-symbols-outlined text-sm font-black">forum</span>
                <span>Buka Diskusi</span>
            `;
            joinBtn.className = "flex-grow md:flex-grow-0 bg-teal-500 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 hover:scale-103 active:scale-97 transition-all glow-button";
            joinBtn.onclick = () => showNotice('Obrolan Aktif', 'Selamat berdiskusi di dalam feed grup!');
        } else {
            joinBtn.innerHTML = `
                <span class="material-symbols-outlined text-sm font-black">group_add</span>
                <span>Gabung ke grup</span>
            `;
            joinBtn.className = "flex-grow md:flex-grow-0 bg-primary text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 hover:scale-103 active:scale-97 transition-all glow-button";
            joinBtn.onclick = () => {
                toggleJoinGroup(groupId);
                loadGroupDetails(groupId);
            };
        }
    }

    // Populate Media Terbaru images
    const mediaGrid = document.getElementById("detail-group-media-grid");
    if (mediaGrid) {
        let mediaHtml = "";
        data.media.forEach(imgUrl => {
            mediaHtml += `<img src="${imgUrl}" alt="Media" class="w-full h-20 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"/>`;
        });
        mediaGrid.innerHTML = mediaHtml;
    }

    // Style active tab button initially
    switchGroupTab("diskusi");
}

// Switch between group detail sub-tabs
function switchGroupTab(tabId) {
    activeGroupTab = tabId;
    
    // Toggle active style in tab buttons
    document.querySelectorAll(".group-tab-btn").forEach(btn => {
        if (btn.id === "gtab-" + tabId) {
            btn.className = "group-tab-btn border-b-2 border-primary text-primary font-black text-[11px] pb-3.5 pt-1.5 transition-all";
        } else {
            btn.className = "group-tab-btn border-b-2 border-transparent text-on-surface-variant/60 hover:text-on-surface font-bold text-[11px] pb-3.5 pt-1.5 transition-all";
        }
    });

    // Populate post stream or tabs info based on tab selection
    renderGroupPosts();
}

// Render dynamic postings inside the group detail page
function renderGroupPosts() {
    const stream = document.getElementById("group-posts-stream");
    if (!stream) return;

    if (activeGroupTab !== "diskusi") {
        stream.innerHTML = `
            <div class="bg-white border border-primary/5 rounded-2xl p-8 text-center text-on-surface-variant/50 font-bold text-xs">
                Seksi ${activeGroupTab.toUpperCase()} akan segera hadir. Saat ini silakan jelajahi feed Diskusi!
            </div>
        `;
        return;
    }

    const data = GROUP_DETAILS_DATA[activeGroupId] || GROUP_DETAILS_DATA.general;

    if (data.posts.length === 0) {
        stream.innerHTML = `
            <div class="bg-white border border-primary/5 rounded-2xl p-8 text-center text-on-surface-variant/40 font-bold text-xs">
                Belum ada postingan di grup ini. Jadilah yang pertama menulis sesuatu!
            </div>
        `;
        return;
    }

    let postsHtml = "";
    data.posts.forEach((p, idx) => {
        postsHtml += `
        <div class="bg-white border border-primary/5 rounded-2xl p-5 shadow-sm space-y-4 relative">
            <!-- Header post info -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <img src="${p.avatar}" alt="${p.author}" class="w-9 h-9 rounded-full object-cover"/>
                    <div class="space-y-0.5">
                        <h5 class="text-xs font-black text-on-surface leading-none">${p.author}</h5>
                        <p class="text-[9px] text-on-surface-variant/40 font-bold leading-none flex items-center gap-1">
                            <span>${p.time}</span>
                            <span>•</span>
                            <span class="material-symbols-outlined text-[10px] font-black">public</span>
                        </p>
                    </div>
                </div>
                <button class="text-on-surface-variant/40 hover:text-on-surface">
                    <span class="material-symbols-outlined text-sm font-black">more_horiz</span>
                </button>
            </div>

            <!-- Post Body text -->
            <p class="text-xs text-on-surface-variant/80 font-medium leading-relaxed">
                ${p.content}
            </p>

            <!-- Stats Bar / PREMIUM ACTION FOOTER -->
            <div class="flex justify-between items-center pt-3.5 border-t border-primary/5 text-[11px] font-black text-on-surface-variant/65 select-none">
                <!-- Left: Comments count + bullet + views count + likes -->
                <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[17px] text-on-surface-variant/60">chat_bubble</span>
                    <span onclick="focusCommentInput(${idx})" class="cursor-pointer hover:underline">${p.comments} Komentar</span>
                    <span class="text-on-surface-variant/30 font-black px-1.5">•</span>
                    <span class="material-symbols-outlined text-[17px] text-on-surface-variant/60">visibility</span>
                    <span>${p.likes * 6 + 12} Dilihat</span>
                    <span class="text-on-surface-variant/30 font-black px-1.5">•</span>
                    <button onclick="likeGroupPost(${idx})" class="hover:text-primary transition-all active:scale-95 flex items-center gap-1">
                        <span class="material-symbols-outlined text-[15px] text-on-surface-variant/60">thumb_up</span>
                        <span>${p.likes} Suka</span>
                    </button>
                </div>
                <!-- Right: Share + Wishlist -->
                <div class="flex items-center gap-4">
                    <button onclick="sharePost(event)" class="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <span class="material-symbols-outlined text-[17px] text-on-surface-variant/60">share</span>
                        <span>Bagikan</span>
                    </button>
                    <button onclick="toggleWishlist(this)" class="flex items-center gap-1.5 text-on-surface-variant/65 hover:text-primary transition-colors">
                        <span class="material-symbols-outlined text-[17px] text-on-surface-variant/60">bookmark</span>
                        <span>Wishlist</span>
                    </button>
                </div>
            </div>

            <!-- Comment input row -->
            <div class="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" class="w-8 h-8 rounded-full object-cover"/>
                <div class="flex-grow bg-neutral-100 hover:bg-neutral-200/40 rounded-2xl py-2 px-4 text-xs font-bold transition-all flex items-center gap-2">
                    <input id="post-comment-input-${idx}" type="text" placeholder="Tulis komentar publik..." onkeydown="if(event.key === 'Enter') submitNewGroupComment(${idx})" class="flex-grow bg-transparent focus:outline-none"/>
                    <button class="text-on-surface-variant/40 hover:text-primary transition-colors">
                        <span class="material-symbols-outlined text-base font-black">sentiment_satisfied</span>
                    </button>
                </div>
            </div>
        </div>
        `;
    });

    stream.innerHTML = postsHtml;
}

// User dynamic posting action
function submitNewGroupPost() {
    const input = document.getElementById("group-post-input");
    if (!input || !input.value.trim()) return;

    const contentText = input.value.trim();
    const data = GROUP_DETAILS_DATA[activeGroupId] || GROUP_DETAILS_DATA.general;

    // Add new post to top of group data
    data.posts.unshift({
        author: "Anda (Siswa ClassQu)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        time: "Baru saja",
        content: contentText,
        likes: 0,
        comments: 0
    });

    input.value = "";
    showNotice("Berhasil Terbit", "Postingan Anda telah diterbitkan ke dalam feed grup belajar!");
    
    // Re-render feed stream
    renderGroupPosts();
}

// User dynamic comment action
function submitNewGroupComment(postIdx) {
    const input = document.getElementById(`post-comment-input-${postIdx}`);
    if (!input || !input.value.trim()) return;

    const data = GROUP_DETAILS_DATA[activeGroupId] || GROUP_DETAILS_DATA.general;
    data.posts[postIdx].comments += 1;

    input.value = "";
    showNotice("Komentar Dikirim", "Komentar publik Anda berhasil ditambahkan!");
    
    // Re-render feed stream
    renderGroupPosts();
}

// Like post action
function likeGroupPost(postIdx) {
    const data = GROUP_DETAILS_DATA[activeGroupId] || GROUP_DETAILS_DATA.general;
    data.posts[postIdx].likes += 1;
    
    renderGroupPosts();
}

// Focus on comment box
function focusCommentInput(postIdx) {
    const input = document.getElementById(`post-comment-input-${postIdx}`);
    if (input) input.focus();
}

// Global Wishlist Bookmark Toggle Action Handler
function toggleWishlist(btn) {
    const icon = btn.querySelector('.material-symbols-outlined');
    const text = btn.querySelector('span:not(.material-symbols-outlined)');
    const isActive = icon.classList.contains('text-amber-500');

    if (isActive) {
        icon.style.fontVariationSettings = "'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24";
        icon.classList.remove('text-amber-500', 'fill-current');
        btn.classList.remove('text-amber-500');
        btn.classList.add('text-on-surface-variant/60');
        if (typeof showFloatingToast === "function") {
            showFloatingToast("Wishlist Dihapus", "Postingan telah berhasil dihapus dari daftar Wishlist Anda.", "remove");
        } else {
            alert("Wishlist Dihapus: Postingan telah dihapus dari daftar simpanan Anda.");
        }
    } else {
        icon.style.fontVariationSettings = "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24";
        icon.classList.add('text-amber-500', 'fill-current');
        btn.classList.remove('text-on-surface-variant/60');
        btn.classList.add('text-amber-500');
        if (typeof showFloatingToast === "function") {
            showFloatingToast("Wishlist Ditambahkan", "Hore! Postingan telah berhasil disimpan ke daftar Wishlist Anda.", "add");
        } else {
            alert("Wishlist Ditambahkan: Postingan telah berhasil disimpan ke daftar Wishlist Anda!");
        }
    }
}

// ==========================================
// CENTRALIZED DETAILED POST DATA STORE
// ==========================================
const POST_DETAILS_DATA = {
    maya: {
        id: "maya",
        authorName: "Maya Putri",
        authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB04QHkH6tB9ZzxuotPYoJyGEnbZp8Jl3ioaVh9nkSh32h_hIkOi7tW6KhkkSYXy3yhpHDYjM0OzBdkx7gwUSVRDodciM_U-MlxAn0olsTIw6IF9Fd1TPHV8qMZSLsngnPjrweW7YGnsUQpLqjmALtNvhwct6rAdQHmjAKvMbIqvEups2BYCQnDdcYJ1907DoY-Cf8ZZCWpL5NTXiR6TXP0itxQ7q8lJkfJsn7FI_Pfcd_q7eRfUZotZr5p0SJnYm1GekY0YUrWjg",
        authorLevel: "Level 8",
        time: "2 jam yang lalu",
        tag: "UI/UX & Design",
        isPinned: true,
        title: "Tips membuat hierarchy yang baik di UI Design ✨",
        content: "Halo semuanya! Aku baru selesai bikin project dashboard dan ingin berbagi beberapa tips tentang visual hierarchy yang menurutku paling membantu. Ada 3 poin utama yang sangat krusial:\n\n1) Gunakan variasi berat font (font weights) untuk membedakan judul utama, subjudul, dan teks isi (body copy). Ini memandu pandangan mata pertama kali.\n\n2) Manfaatkan whitespace (ruang kosong) secara bijak agar elemen tidak berdesakan dan desain terkesan bernafas serta premium.\n\n3) Tentukan titik fokus utama (Primary Action Button) dengan warna mencolok agar pengguna tahu ke mana harus mengklik selanjutnya.\n\nSemoga tips sederhana ini bermanfaat untuk pengerjaan modul desain kalian ya! 🙌",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
        commentsCount: 12,
        viewsCount: 156,
        likesCount: 42,
        comments: [
            {
                name: "Budi Santoso",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
                level: "Level 4",
                time: "1 jam yang lalu",
                content: "Tips yang sangat daging! Whitespace emang sering disepelekan sama pemula padahal pengaruhnya besar sekali buat kenyamanan baca."
            },
            {
                name: "Dewi Lestari",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
                level: "Level 9",
                time: "45 menit yang lalu",
                content: "Setuju banget Kak Maya. Mau nanya, kalau untuk dashboard kompleks yang padat data, perbandingan ukuran font paling ideal berapa ya?"
            }
        ]
    },
    rizky: {
        id: "rizky",
        authorName: "Rizky Pratama",
        authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrDwQ38P9xccl4LXirzosKAl7xaOSfwkZaoHlzA40tsxE_VFm3GdPvdM1wPFGeNhiKR9pdZxeieA9gWHbZYjt2AUV968G_E2q4TixttPeEzl-APHWOnRDS-AudKSU3wjQ0mJg8UVOo1OIzW4K_X0PZrtiFraV8HvRigyoargdKXnym4q-Rq5fq_rgHPVjNL9PBnfm2A6A5Skgr6IsxRLtqU8JDt3dve4zaQBkjZjhSSDm7TLrpNqfKE8mUClooAmR0fxQCB4WUA",
        authorLevel: "Level 5",
        time: "5 jam yang lalu",
        tag: "Ms Office QA",
        isPinned: false,
        title: "Rumus Excel ini kenapa hasilnya #VALUE ya?",
        content: "Guys, aku lagi belajar VLOOKUP tapi hasilnya muncul #VALUE. Udah cek data juga. Ada yang bisa bantu jelasin? Terima kasih!\n\nDi cell C3 harusnya menampilkan total, tapi malah eror. Apakah karena format datanya berbeda atau rumusnya yang salah ketik? Padahal data A1 sampai B3 sepertinya normal.",
        isSpreadsheet: true,
        commentsCount: 8,
        viewsCount: 98,
        likesCount: 15,
        comments: [
            {
                name: "Ahmad Fauzi",
                avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=80",
                level: "Level 11",
                time: "4 jam yang lalu",
                content: "Itu karena range referensi VLOOKUP kamu belum dikunci pakai tanda $ (absolut), jadi pas ditarik ke bawah range-nya bergeser otomatis."
            },
            {
                name: "Rudi Hermawan",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
                level: "Level 6",
                time: "3 jam yang lalu",
                content: "Coba cek juga apakah kolom indeks pencariannya sudah sesuai. Biasanya error #VALUE muncul kalau tipe datanya text tapi mau dijumlahkan secara aritmatika."
            }
        ]
    },
    sarah: {
        id: "sarah",
        authorName: "Sarah Wijaya",
        authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDssyzQLmMMfFWttctiYSzDFJhuKJM4G_skmst8A0zZ8GnyvH6YOUiKAr9PIh87ilXPLcDVwYGbInuXwRddrRB9IQ_wYGqaNfFRdVpGlCdIzH_cFGrO5o2mQ585QYUSq76zI-uLmFiMotk8vgwsnX-XTLzhM8YO7iW22MfL6VcglCf7H2bHa9_ZSPJknCIjBpNbDimgKbqlDDP1y5HWs9yrb35SUxmNrzc8fZfPHEDwR3vQUyV7YGQyL8SdTmJOfkRoblQ6YZgoBQ",
        authorLevel: "Level 15",
        time: "1 hari yang lalu",
        tag: "Career Preparation",
        isPinned: false,
        title: "3 Hal yang HR Lihat Pertama di CV Kamu",
        content: "Berdasarkan pengalaman aku review ratusan CV pelamar, ini 3 hal yang paling diperhatikan HR dalam 6 detik pertama sebelum memutuskan lanjut ke tahap berikutnya:\n\n1) Keselarasan Job Title: Apakah posisi yang kamu lamar relevan dengan tajuk pengalaman teratasmu.\n\n2) Summary Profil yang Padat: Paragraf singkat di atas CV harus menggambarkan value unikmu secara kuantitatif, bukan deskripsi normatif.\n\n3) Pencapaian Konkret (STAR Method): Gunakan angka dan data untuk membuktikan hasil kerjamu, ketimbang cuma mendaftar daftar tugas harian.\n\nSimak dan terapkan di CV-mu ya! 👇",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=80",
        commentsCount: 18,
        viewsCount: 210,
        likesCount: 89,
        comments: [
            {
                name: "Putri Ayu",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
                level: "Level 12",
                time: "20 jam yang lalu",
                content: "Kak Sarah, kalau untuk fresh graduate yang minim pengalaman kerja formal, STAR method ini sebaiknya diterapkan ke bagian apa ya?"
            },
            {
                name: "Sarah Wijaya",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDssyzQLmMMfFWttctiYSzDFJhuKJM4G_skmst8A0zZ8GnyvH6YOUiKAr9PIh87ilXPLcDVwYGbInuXwRddrRB9IQ_wYGqaNfFRdVpGlCdIzH_cFGrO5o2mQ585QYUSq76zI-uLmFiMotk8vgwsnX-XTLzhM8YO7iW22MfL6VcglCf7H2bHa9_ZSPJknCIjBpNbDimgKbqlDDP1y5HWs9yrb35SUxmNrzc8fZfPHEDwR3vQUyV7YGQyL8SdTmJOfkRoblQ6YZgoBQ",
                level: "Level 15",
                time: "18 jam yang lalu",
                content: "Bisa kamu terapkan ke pengalaman organisasi, kepanitiaan, atau student projects yang pernah kamu pimpin di kampus, Putri!"
            }
        ]
    }
};

let activePostId = "maya";

// Interactive Post Details Renderer
function renderPostDetails(postId) {
    activePostId = postId;
    const post = POST_DETAILS_DATA[postId] || POST_DETAILS_DATA.maya;
    
    // Get placeholders
    const authorAvatarEl = document.getElementById("detail-author-avatar");
    const authorNameEl = document.getElementById("detail-author-name");
    const authorLevelEl = document.getElementById("detail-author-level");
    const postTimeEl = document.getElementById("detail-post-time");
    const postTagEl = document.getElementById("detail-post-tag");
    const pinnedBadgeEl = document.getElementById("detail-pinned-badge");
    
    const postTitleEl = document.getElementById("detail-post-title");
    const postContentEl = document.getElementById("detail-post-content");
    const visualContainerEl = document.getElementById("detail-visual-container");
    
    const commentsCountEl = document.getElementById("detail-comments-count");
    const viewsCountEl = document.getElementById("detail-views-count");
    const likesCountEl = document.getElementById("detail-likes-count");
    
    const commentsStreamEl = document.getElementById("detail-comments-stream");

    // Populate meta details
    if (authorAvatarEl) authorAvatarEl.src = post.authorAvatar;
    if (authorNameEl) authorNameEl.textContent = post.authorName;
    if (authorLevelEl) authorLevelEl.textContent = post.authorLevel;
    if (postTimeEl) postTimeEl.textContent = post.time;
    if (postTagEl) postTagEl.textContent = `# ${post.tag}`;
    
    if (pinnedBadgeEl) {
        if (post.isPinned) pinnedBadgeEl.classList.remove("hidden");
        else pinnedBadgeEl.classList.add("hidden");
    }

    // Populate text content at top
    if (postTitleEl) postTitleEl.textContent = post.title;
    if (postContentEl) {
        // Format newlines as paragraph tags
        postContentEl.innerHTML = post.content.split('\n').map(p => `<p class="mb-3">${p}</p>`).join('');
    }

    // Populate visual (image / spreadsheet) below text
    if (visualContainerEl) {
        visualContainerEl.innerHTML = "";
        
        if (post.isSpreadsheet) {
            // Render simulated spreadsheet
            visualContainerEl.innerHTML = `
                <div class="border border-primary/10 rounded-xl overflow-hidden shadow-md bg-white/90 text-[10px] w-full font-mono max-w-xl">
                    <div class="grid grid-cols-4 bg-[#FAF6F0] border-b border-primary/10 font-bold text-center py-1.5">
                        <div class="border-r border-primary/10"></div>
                        <div class="border-r border-primary/10">A</div>
                        <div class="border-r border-primary/10">B</div>
                        <div>C</div>
                    </div>
                    <div class="grid grid-cols-4 border-b border-primary/5 text-center py-1.5 bg-white">
                        <div class="font-bold bg-[#FAF6F0] border-r border-primary/10">1</div>
                        <div class="border-r border-primary/5">Data 1</div>
                        <div class="border-r border-primary/5">10</div>
                        <div>Ok</div>
                    </div>
                    <div class="grid grid-cols-4 border-b border-primary/5 text-center py-1.5 bg-white">
                        <div class="font-bold bg-[#FAF6F0] border-r border-primary/10">2</div>
                        <div class="border-r border-primary/5">Data 2</div>
                        <div class="border-r border-primary/5">20</div>
                        <div>Pending</div>
                    </div>
                    <div class="grid grid-cols-4 text-center py-1.5 bg-white">
                        <div class="font-bold bg-[#FAF6F0] border-r border-primary/10">3</div>
                        <div class="border-r border-primary/5">Total</div>
                        <div class="border-r border-primary/5">30</div>
                        <div class="bg-red-50 text-red-600 font-extrabold border border-red-300 rounded mx-2 px-2 animate-pulse">#VALUE!</div>
                    </div>
                </div>
            `;
        } else if (post.image) {
            // Render image visual
            visualContainerEl.innerHTML = `
                <div class="w-full rounded-2xl overflow-hidden shadow-sm max-w-xl">
                    <img src="${post.image}" alt="Post Visual" class="w-full h-auto object-cover"/>
                </div>
            `;
        }
    }

    // Populate footer counters
    if (commentsCountEl) commentsCountEl.textContent = `${post.comments.length} Komentar`;
    if (viewsCountEl) viewsCountEl.textContent = `${post.viewsCount} Dilihat`;
    if (likesCountEl) likesCountEl.textContent = `${post.likesCount || 0} Suka`;

    // Populate comments at the very bottom
    if (commentsStreamEl) {
        commentsStreamEl.innerHTML = "";
        
        if (post.comments.length === 0) {
            commentsStreamEl.innerHTML = `
                <p class="text-xs text-on-surface-variant/40 font-bold text-center py-6">Belum ada komentar. Jadilah yang pertama memberikan respon! ✨</p>
            `;
        } else {
            post.comments.forEach(comment => {
                commentsStreamEl.innerHTML += `
                    <div class="flex gap-3 py-3 bg-transparent hover:bg-neutral-50/20 transition-all w-full items-start">
                        <img src="${comment.avatar}" alt="${comment.name}" class="w-8 h-8 rounded-full border border-primary/5 object-cover shrink-0 mt-0.5"/>
                        <div class="space-y-1 flex-grow">
                            <div class="flex items-center gap-1.5">
                                <span class="text-xs font-black text-on-surface">${comment.name}</span>
                                <span class="text-[8.5px] font-bold text-tertiary-light">${comment.level}</span>
                                <span class="text-on-surface-variant/30 text-[9px]">•</span>
                                <span class="text-[9.5px] font-bold text-on-surface-variant/40">${comment.time}</span>
                            </div>
                            <p class="text-[12px] text-on-surface-variant leading-relaxed font-bold">${comment.content}</p>
                            <!-- Mini action row inside comment card -->
                            <div class="flex items-center gap-4 pt-1.5 text-[9px] font-black text-on-surface-variant/40 select-none">
                                <button onclick="this.classList.toggle('text-primary')" class="flex items-center gap-1 hover:text-primary transition-colors">
                                    <span class="material-symbols-outlined text-[13px]">favorite</span>
                                    <span>Suka</span>
                                </button>
                                <button onclick="showNotice('Komentar', 'Fitur balas komentar akan segera dirilis pada versi ClassQu selanjutnya!')" class="flex items-center gap-1 hover:text-primary transition-colors">
                                    <span class="material-symbols-outlined text-[13px]">reply</span>
                                    <span>Balas</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    }
}

// Add a new comment dynamically
function submitNewPostComment() {
    const input = document.getElementById("detail-comment-input");
    if (!input || !input.value.trim()) return;

    const newComment = {
        name: "Rizky Pratama",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrDwQ38P9xccl4LXirzosKAl7xaOSfwkZaoHlzA40tsxE_VFm3GdPvdM1wPFGeNhiKR9pdZxeieA9gWHbZYjt2AUV968G_E2q4TixttPeEzl-APHWOnRDS-AudKSU3wjQ0mJg8UVOo1OIzW4K_X0PZrtiFraV8HvRigyoargdKXnym4q-Rq5fq_rgHPVjNL9PBnfm2A6A5Skgr6IsxRLtqU8JDt3dve4zaQBkjZjhSSDm7TLrpNqfKE8mUClooAmR0fxQCB4WUA",
        level: "Level 5",
        time: "Baru saja",
        content: input.value.trim()
    };

    const post = POST_DETAILS_DATA[activePostId] || POST_DETAILS_DATA.maya;
    post.comments.push(newComment);
    
    // Increment commentsCount in UI & refresh
    renderPostDetails(activePostId);
    input.value = "";
    
    showFloatingToast("Komentar Berhasil", "Hore! Komentarmu berhasil diterbitkan di postingan ini.");
}

// Sleek Floating Toast Notification Helper
function showFloatingToast(title, message, type = 'add') {
    let container = document.getElementById('floating-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'floating-toast-container';
        container.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 w-[calc(100%-32px)] sm:w-80 pointer-events-none';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto bg-white/95 backdrop-blur-md border border-primary/10 shadow-[0_12px_40px_rgba(165,59,41,0.12)] rounded-2xl p-3.5 flex items-center gap-3 transform transition-all duration-500 ease-out -translate-y-10 opacity-0 scale-95';
    
    let iconHtml = '';
    if (type === 'add') {
        iconHtml = `
            <div class="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-amber-50 text-amber-500 border border-amber-200/50">
                <span class="material-symbols-outlined text-[17px] font-bold animate-pulse" style="font-variation-settings: 'FILL' 1">bookmark</span>
            </div>
        `;
    } else if (type === 'share') {
        iconHtml = `
            <div class="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-200/50 animate-pulse">
                <span class="material-symbols-outlined text-[17px] font-bold" style="font-variation-settings: 'FILL' 0">link</span>
            </div>
        `;
    } else {
        iconHtml = `
            <div class="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-neutral-50 text-neutral-400 border border-neutral-200/50">
                <span class="material-symbols-outlined text-[17px] font-bold" style="font-variation-settings: 'FILL' 0">bookmark</span>
            </div>
        `;
    }
    
    toast.innerHTML = `
        ${iconHtml}
        <div class="flex-grow space-y-0.5">
            <h4 class="text-[11.5px] font-black text-on-surface leading-tight">${title}</h4>
            <p class="text-[10px] text-on-surface-variant/70 font-bold leading-tight">${message}</p>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Animate In
    requestAnimationFrame(() => {
        setTimeout(() => {
            toast.classList.remove('-translate-y-10', 'opacity-0', 'scale-95');
            toast.classList.add('translate-y-0', 'opacity-100', 'scale-100');
        }, 50);
    });
    
    // Animate Out
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100', 'scale-100');
        toast.classList.add('-translate-y-10', 'opacity-0', 'scale-95');
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 2800);
}

// Global Post Share Action Handler
function sharePost(event) {
    if (event) {
        event.stopPropagation();
    }
    const simulatedLink = "https://classqu.com/community/post/" + Math.floor(Math.random() * 100000);
    navigator.clipboard.writeText(simulatedLink).catch(() => {});
    
    if (typeof showFloatingToast === "function") {
        showFloatingToast("Tautan Berhasil Disalin", "Tautan postingan telah berhasil disimpan ke papan klip Anda. 🔗", "share");
    }
}
