
<!-- academic_personal_website/frontend/js/main.js -->
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        html.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        const theme = html.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Track theme change in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_toggle', {
                'event_category': 'preferences',
                'event_label': theme
            });
        }
    });

    // PDF preview functionality
    const pdfViewerModal = document.createElement('div');
    pdfViewerModal.id = 'pdf-viewer-modal';
    pdfViewerModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
    pdfViewerModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-4xl">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white">CV Preview</h3>
                <button id="close-pdf-viewer" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    ✕
                </button>
            </div>
            <iframe id="pdf-iframe" src="assets/JunjieHu_CV.pdf" class="w-full h-[80vh] border-none"></iframe>
        </div>
    `;
    document.body.appendChild(pdfViewerModal);

    // Handle PDF preview
    const cvLinks = document.querySelectorAll('a[href*="JunjieHu_CV.pdf"]');
    cvLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('pdf-viewer-modal').classList.remove('hidden');
            
            // Track PDF view in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cv_view', {
                    'event_category': 'engagement',
                    'event_label': 'CV Preview'
                });
            }
        });
    });

    // Close PDF preview
    document.getElementById('pdf-viewer-modal').addEventListener('click', function(e) {
        if (e.target === this || e.target.id === 'close-pdf-viewer') {
            this.classList.add('hidden');
        }
    });

    // WeChat modal functionality
    function showWechat() {
        document.getElementById('wechat-modal').classList.remove('hidden');
        
        // Track WeChat QR view in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'wechat_view', {
                'event_category': 'engagement',
                'event_label': 'WeChat QR Code'
            });
        }
    }
    
    function hideWechat() {
        document.getElementById('wechat-modal').classList.add('hidden');
    }
    
    window.showWechat = showWechat;
    window.hideWechat = hideWechat;

    // Close modal when clicking outside
    document.getElementById('wechat-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideWechat();
        }
    });

    // Responsive design adjustments
    function handleResponsive() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            // Mobile-specific adjustments
            document.querySelectorAll('.card-hover').forEach(card => {
                card.style.transform = 'none';
            });
        }
    }

    window.addEventListener('resize', handleResponsive);
    handleResponsive();

    // Initialize Google Analytics if not already present
    if (typeof gtag === 'undefined') {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
    }
});
