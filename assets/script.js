document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM الأساسية
    const zikrElements = document.querySelectorAll('.zikr');
    const tabs = document.querySelectorAll('.tab');
    const morningSection = document.getElementById('morning-section');
    const eveningSection = document.getElementById('evening-section');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // وظيفة لإغلاق جميع الأذكار المفتوحة
    function closeAllZikrs(excludeZikr = null) {
        zikrElements.forEach(zikr => {
            if (excludeZikr && zikr === excludeZikr) return;
            if (zikr.classList.contains('active')) {
                zikr.classList.remove('active');
                zikr.querySelector('.full').style.display = 'none';
            }
        });
    }

    // إدارة فتح وإغلاق الأذكار
    zikrElements.forEach(zikr => {
        const short = zikr.querySelector('.short');
        const full = zikr.querySelector('.full');
        
        short.addEventListener('click', (e) => {
            // منع انتشار الحدث لتجنب أي تداخل
            e.stopPropagation();
            
            // إذا كان الذكر مفتوحاً بالفعل، نغلقه فقط
            if (zikr.classList.contains('active')) {
                zikr.classList.remove('active');
                full.style.display = 'none';
                return;
            }
            
            // إغلاق جميع الأذكار الأخرى أولاً
            closeAllZikrs(zikr);
            
            // فتح الذكر الحالي
            zikr.classList.add('active');
            full.style.display = 'block';
            
            // تمرير سلس للعنصر عند الفتح
            full.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    // إدارة التبويبات بين الصباح والمساء
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // تحديث حالة التبويبات النشطة
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // تبديل الأقسام
            if (tab.dataset.section === 'morning') {
                morningSection.style.display = 'block';
                eveningSection.style.display = 'none';
            } else {
                morningSection.style.display = 'none';
                eveningSection.style.display = 'block';
            }
            
            // إغلاق جميع الأذكار المفتوحة عند التبديل
            closeAllZikrs();
            
            // التمرير إلى الأعلى عند تبديل التبويب
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // زر العودة إلى الأعلى
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.pageYOffset > 300);
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // إغلاق الأذكار عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.zikr')) {
            closeAllZikrs();
        }
    });

    // تحسين إمكانية الوصول
    zikrElements.forEach(zikr => {
        zikr.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                zikr.querySelector('.short').click();
            }
        });
    });
});