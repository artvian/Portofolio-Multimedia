document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false // Animasi akan berulang setiap kali di-scroll
    });
    document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-menu-link");

    // 1. Logika untuk membuka/tutup burger menu (pastikan ini sudah ada)
    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("active");
        mobileMenu.classList.toggle("open"); // Sesuaikan nama class open Anda
    });

    // 2. LOGIKA UTAMA: Menutup menu ketika salah satu link diklik
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            // Hapus class active/open agar menu menutup kembali
            hamburgerBtn.classList.remove("active");
            mobileMenu.classList.remove("open"); // Sesuaikan nama class open Anda
        });
    });
});

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu')) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Video Modal Functionality
    const reelCards = document.querySelectorAll('.reel-card');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.querySelector('.close-modal');

    const modalVideoSource = modalVideo.querySelector('source');

    reelCards.forEach(card => {
        card.addEventListener('click', function () {
            const videoSrc = this.getAttribute('data-video');
            if (videoSrc) {
                modalVideoSource.src = videoSrc;
                modalVideo.load();
                videoModal.style.display = 'flex';
                modalVideo.play().catch(() => {
                    // Autoplay may be blocked; user can still click play
                });
            }
        });
    });

    closeModal.addEventListener('click', function () {
        videoModal.style.display = 'none';
        modalVideo.pause();
        modalVideoSource.src = '';
        modalVideo.load();
    });

    videoModal.addEventListener('click', function (e) {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            modalVideo.pause();
            modalVideoSource.src = '';
            modalVideo.load();
        }
    });
});

// Tambahkan di dalam DOMContentLoaded
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    try {
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            alert('Terima kasih! Pesan Anda telah terkirim ke email.');
            this.reset();
        } else {
            alert('Maaf, terjadi kesalahan. Silakan coba lagi.');
        }
    } catch (error) {
        alert('Gagal mengirim pesan.');
    }
});
