document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false // Animasi akan berulang setiap kali di-scroll
    });
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-menu-link");

    // 1. Logika untuk membuka/tutup burger menu
    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("active");
        mobileMenu.classList.toggle("active");
    });

    // 2. Menutup menu ketika salah satu link diklik
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburgerBtn.classList.remove("active");
            mobileMenu.classList.remove("active");
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

    if (videoModal && modalVideo && closeModal) {
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
    }

    const contactForm = document.querySelector('#contactForm');
    const toast = document.getElementById('toast');

    function showToast(message, isError = false) {
        if (!toast) return;
        toast.querySelector('.toast-message').textContent = message;
        toast.classList.toggle('toast-error', isError);
        toast.classList.add('visible');

        clearTimeout(window.toastTimeout);
        window.toastTimeout = setTimeout(() => {
            toast.classList.remove('visible', 'toast-error');
        }, 4200);
    }

    if (contactForm) {
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
                    showToast('Terima kasih! Pesan Anda telah terkirim ke email viangroupdev@yahoo.com.');
                    this.reset();
                } else {
                    showToast('Maaf, terjadi kesalahan. Silakan coba lagi.', true);
                }
            } catch (error) {
                showToast('Gagal mengirim pesan. Coba lagi nanti.', true);
            }
        });
    }
});