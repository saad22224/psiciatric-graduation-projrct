// Global Variables
let currentQuiz = null;
let currentSession = null;
let quizAnswers = {};

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const quizModal = document.getElementById('quizModal');
const videoModal = document.getElementById('videoModal');
const quizContent = document.getElementById('quizContent');
const videoContent = document.getElementById('videoContent');

// Mental Health Support Messages
const supportMessages = [
    "أنت قوي، ويمكنك تجاوز أي صعوبة تواجهها 💪",
    "مشاعرك مهمة وصحيحة، لا تخف من التعبير عنها ❤️",
    "كل يوم جديد هو فرصة للبدء من جديد 🌅",
    "أنت لست وحدك، هناك دائماً من يهتم لأمرك 🤗",
    "الراحة النفسية حق أساسي من حقوقك ✨",
    "خطوة بخطوة، ستحقق أهدافك 🚶‍♂️",
    "استراحتك مهمة، لا تتجاهل احتياجاتك 😌",
    "أنت تستحق الحب والاحترام 🌹",
    "الصبر مفتاح الفرج، لا تستعجل النتائج ⏳",
    "قوتك الحقيقية تكمن في داخلك 💫",
    "اليوم سيكون أفضل من الأمس 🌟",
    "أنت تستحق السعادة والسلام النفسي 😊",
    "لا تخف من طلب المساعدة، هذا قوة لا ضعف 🤝",
    "كل تحدٍ يجعلك أقوى وأكثر نضجاً 🌱",
    "أنت فريد ومميز بطريقتك الخاصة 🎨",
    "التفكير الإيجابي يغير كل شيء 🌈",
    "أنت أقدر على ما تظن 🎯",
    "الوقت يشفي كل الجراحات ⏰",
    "أنت تستحق فرصة جديدة 🔄",
    "لا تسمح لأحد أن يقلل من قيمتك 👑",
    "أنت محبوب ومقدر من الكثيرين 💖",
    "الاستمرارية هي مفتاح النجاح 🔑",
    "أنت لست أخطاء الماضي، أنت مستقبل مشرق 🌅",
    "الثقة بالنفس أول خطوة للنجاح ✨",
    "أنت تستحق أن تكون سعيداً 😄",
    "لا تقلق من المستقبل، استمتع بالحاضر 🎈",
    "أنت قادر على تحقيق المعجزات 🌟",
    "الابتسامة أقوى سلاح لديك 😊",
    "أنت أفضل مما تظن 🌟",
    "كل يوم هو بداية جديدة 🌅",
    "أنت تستاح أن تُسمع وتُفهم 👂",
    "لا تسمح للقلق أن يسيطر عليك 🧘‍♂️",
    "أنت مصدر إلهام للآخرين ✨",
    "الحياة جميلة، استمتع بكل لحظة 🌺",
    "أنت تستحق الأفضل دائماً 🏆",
    "التفاؤل طريق السعادة 😊",
    "أنت لست وحدك في هذا العالم 🌍",
    "قوتك الداخلية لا حدود لها 💪",
    "أنت تستحق الراحة والسلام 🕊️",
    "لا تتجاهل مشاعرك، هي جزء منك ❤️",
    "أنت قادر على التغيير 🔄",
    "كل لحظة هي فرصة للنمو 🌱",
    "أنت تستحق أن تحب نفسك 🤗",
    "الصحة النفسية مثل الصحة الجسدية، تحتاج للعناية 🏥",
    "أنت أقوى من الصعوبات 🌟",
    "لا تخف من أن تكون ضعيفاً، هذا جزء من القوة 💪",
    "أنت تستحق أن تعيش حياة سعيدة 🌈",
    "كل تحدي هو فرصة للنمو 🚀",
    "أنت محاط بالحب والدعم 💖",
    "لا تسمح لأحد أن يسرق سعادتك 😊",
    "أنت تستحق أن تكون في سلام مع نفسك 🕊️",
    "الاستماع لنفسك أهم من الاستماع للآخرين 👂",
    "أنت قادر على تجاوز أي شيء 💫",
    "الحياة رحلة، استمتع بها 🌍",
    "أنت تستحق أن تُحترم 🙏",
    "لا تخف من التغيير، هو فرصة للنمو 🌱",
    "أنت مميز بطريقتك الخاصة 🎨",
    "الراحة النفسية ليست رفاهية، هي ضرورة ✨",
    "أنت تستحق أن تكون بخير 🌟",
    "كل يوم هو فرصة لتكون أفضل نسخة من نفسك 🌅",
    "أنت قادر على تحقيق أحلامك 🎯",
    "لا تسمح للماضي أن يتحكم في مستقبلك 🚀",
    "أنت تستحق أن تشعر بالأمان 🛡️",
    "القوة الحقيقية في الاعتراف بالمشاعر 💪",
    "أنت تستحق أن تعيش بسلام 🕊️",
    "كل خطوة صغيرة تقربك من هدفك 🚶‍♂️",
    "أنت لست أخطاءك، أنت دروسك 📚",
    "لا تخف من البكاء، هو طريقة للتطهير 😢",
    "أنت تستحق أن تفرح 🎉",
    "الصبر والثقة هما مفتاح النجاح ⏳",
    "أنت قادر على التغلب على أي شيء 💪",
    "لا تتجاهل احتياجاتك النفسية 🧠",
    "أنت تستحق أن تحب نفسك أولاً ❤️",
    "كل يوم هو فرصة جديدة 🌅",
    "أنت أقوى مما تظن 🌟",
    "لا تخف من طلب المساعدة، هذا شجاعة 🤝",
    "أنت تستحق أن تكون سعيداً وصحياً 😊",
    "التفكير الإيجابي يغير واقعك 🌈",
    "أنت قادر على صنع فرق 🌟",
    "لا تسمح لأحد أن يحدد قيمتك 👑",
    "أنت تستحق الراحة والاسترخاء 😌",
    "كل تحدي يجعلك أقوى 💪",
    "أنت لست وحدك في معاناتك 🤗",
    "الاستمرارية هي سر النجاح 🔑",
    "أنت تستحق أن تعيش حياة مليئة بالحب 💖",
    "لا تخف من أن تكون مختلفاً، هذا قوة ✨",
    "أنت قادر على تحقيق المستحيل 🌟",
    "الراحة النفسية هي أولويتك 🎯",
    "أنت تستحق أن تكون في سلام مع نفسك 🕊️",
    "كل لحظة هي هدية 🎁",
    "أنت قادر على التغيير الإيجابي 🌱",
    "لا تسمح للقلق أن يسيطر على حياتك 🧘‍♂️",
    "أنت تستحق أن تحترم نفسك 🙏",
    "الحياة جميلة مع نظرة إيجابية 😊",
    "أنت مصدر قوة للآخرين 💪",
    "لا تخف من الماضي، استفد منه 📚",
    "أنت تستحق أن تكون سعيداً دائماً 🌟",
    "كل يوم هو فرصة للنمو والتحسن 🌱",
    "أنت قادر على تجاوز أي صعوبة 💫",
    "الاستماع لقللك مهم جداً ❤️",
    "أنت تستحق أن تعيش بسلام وسعادة 🕊️",
    "لا تسمح لأحد أن يسرق طاقتك الإيجابية ✨",
    "أنت قادر على صنع مستقبل أفضل 🌟"
];

// Random Toast Message System
let toastInterval;
let usedMessages = [];

function getRandomSupportMessage() {
    if (usedMessages.length === supportMessages.length) {
        usedMessages = [];
    }
    let availableMessages = supportMessages.filter(msg => !usedMessages.includes(msg));
    let randomIndex = Math.floor(Math.random() * availableMessages.length);
    let message = availableMessages[randomIndex];
    usedMessages.push(message);
    return message;
}

function showSupportToast() {
    const message = getRandomSupportMessage();
    Toastify({
        text: message,
        duration: 5000,
        gravity: "top",
        position: "left",
        style: {
            background: "linear-gradient(135deg, #e91e63, #9c27b0)",
            borderRadius: "12px",
            boxShadow: "0 8px 25px rgba(233, 30, 99, 0.3)",
            fontFamily: "Tajawal, sans-serif",
            fontSize: "16px",
            padding: "16px 24px",
            textAlign: "right",
            direction: "rtl"
        }
    }).showToast();
}

function startSupportMessages() {
    if (window.supportMessagesStarted) return;
    window.supportMessagesStarted = true;
    if (toastInterval) clearInterval(toastInterval);
    setTimeout(showSupportToast, 3000);
    toastInterval = setInterval(showSupportToast, 120000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    startSupportMessages();
    initializeAOS();
});

// Navigation
function initializeNavigation() {
    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            if (navMenu) navMenu.classList.remove('active');
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.session-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize AOS
function initializeAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
}

// Regular Animations
function initializeAnimations() {
    document.querySelectorAll('.btn, .quiz-option').forEach(element => {
        element.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Quiz Functions
function startQuiz(sessionId) {
    currentSession = sessionId;
    currentQuiz = getQuizData(sessionId);
    quizAnswers = {};
    const quizTitle = document.getElementById('quizTitle');
    if (quizTitle) quizTitle.textContent = `اختبر فهمك - ${getSessionTitle(sessionId)}`;
    renderQuiz();
    if (quizModal) {
        quizModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        openModalWithAnimation(quizModal);
    }
}

function renderQuiz() {
    if (!currentQuiz || !quizContent) return;
    let html = '';
    currentQuiz.questions.forEach((question, index) => {
        html += `
            <div class="quiz-question" data-question="${index}">
                <h4>${index + 1}. ${question.question}</h4>
                <div class="quiz-options">
                    ${question.options.map((option, optionIndex) => `
                        <div class="quiz-option" data-question="${index}" data-option="${optionIndex}" onclick="selectQuizOption(${index}, ${optionIndex})">
                            ${option}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    html += `
        <button class="btn btn-quiz-submit" onclick="submitQuiz()">
            <i class="fas fa-check"></i> إرسال الإجابات
        </button>
    `;
    quizContent.innerHTML = html;
}

function selectQuizOption(questionIndex, optionIndex) {
    document.querySelectorAll(`.quiz-option[data-question="${questionIndex}"]`).forEach(option => {
        option.classList.remove('selected');
    });
    const selectedOption = document.querySelector(`.quiz-option[data-question="${questionIndex}"][data-option="${optionIndex}"]`);
    if (selectedOption) selectedOption.classList.add('selected');
    quizAnswers[questionIndex] = optionIndex;
}

function submitQuiz() {
    if (!currentQuiz || Object.keys(quizAnswers).length !== currentQuiz.questions.length) {
        showNotification('من فضلك جاوب على كل الأسئلة', 'warning');
        return;
    }
    let score = 0;
    const totalQuestions = currentQuiz.questions.length;
    currentQuiz.questions.forEach((question, index) => {
        const userAnswer = quizAnswers[index];
        const correctAnswer = question.correct;
        const options = document.querySelectorAll(`.quiz-option[data-question="${index}"]`);
        options.forEach((option, optionIndex) => {
            option.classList.remove('correct', 'incorrect');
            if (optionIndex === correctAnswer) option.classList.add('correct');
            else if (optionIndex === userAnswer && userAnswer !== correctAnswer) option.classList.add('incorrect');
        });
        if (userAnswer === correctAnswer) score++;
    });
    setTimeout(() => {
        showQuizResults(score, totalQuestions);
    }, 1000);
}

function showQuizResults(score, totalQuestions) {
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = '';
    if (percentage >= 80) message = 'ممتاز! فهمك كويس جداً للموضوع 👏';
    else if (percentage >= 60) message = 'شطور! فهمت الأساسيات كويس 👍';
    else if (percentage >= 40) message = 'مش وحش! بس راجع المحتوى تاني عشان تفهم أكتر 📚';
    else message = 'كمل تعلم! راجع الجلسات وحاول تاني 💪';

    const resultsHtml = `
        <div class="quiz-result">
            <h4>نتيجتك</h4>
            <div class="quiz-score">${score}/${totalQuestions}</div>
            <div class="quiz-message">${message}</div>
            <button class="btn btn-primary" onclick="closeQuiz()">
                <i class="fas fa-times"></i> إغلاق
            </button>
            <button class="btn btn-secondary" onclick="retakeQuiz()">
                <i class="fas fa-redo"></i> أعد الاختبار
            </button>
        </div>
    `;
    if (quizContent) quizContent.innerHTML = resultsHtml;
}

function retakeQuiz() {
    quizAnswers = {};
    renderQuiz();
}

function closeQuiz() {
    if (quizModal) quizModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentQuiz = null;
    currentSession = null;
    quizAnswers = {};
}

function playVideo(sessionId) {
    const modal = document.getElementById('videoModal');
    if (!modal) return;
    const modalContent = modal.querySelector('.modal-content');
    const isStigmaSession = sessionId.startsWith('stigma') || sessionId === 'session5';
    const videoSrc = isStigmaSession
        ? 'assets/WhatsApp Video 2026-04-18 at 10.17.27 PM.mp4'
        : 'assets/WhatsApp Video 2026-04-18 at 10.17.44 PM.mp4';

    modalContent.innerHTML = `
        <div class="modal-header">
            <h3 class="modal-title">فيديو - ${getSessionTitle(sessionId)}</h3>
            <span class="close-modal" onclick="closeVideo()">&times;</span>
        </div>
        <div class="modal-body">
            <div class="video-container">
                <video controls autoplay style="width: 100%; max-width: 100%; border-radius: 10px;">
                    <source src="${videoSrc}" type="video/mp4">
                    متصفحك لا يدعم الفيديو.
                </video>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    if (videoModal) videoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openModalWithAnimation(modal) {
    const content = modal.querySelector('.modal-content');
    if (content) {
        content.style.transform = 'scale(0.7)';
        content.style.opacity = '0';
        setTimeout(() => {
            content.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            content.style.transform = 'scale(1)';
            content.style.opacity = '1';
        }, 10);
    }
}

function closeModalWithAnimation(modal) {
    const content = modal.querySelector('.modal-content');
    if (content) {
        content.style.transform = 'scale(0.7)';
        content.style.opacity = '0';
    }
}

function showNotification(message, type = 'info') {
    const colors = {
        'success': '#4caf50',
        'warning': '#ff9800',
        'error': '#f44336',
        'info': '#2196f3'
    };
    Toastify({
        text: message,
        duration: 3000,
        style: {
            background: colors[type] || colors.info,
            borderRadius: "8px",
            fontFamily: "Tajawal, sans-serif"
        }
    }).showToast();
}

function getQuizData(sessionId) {
    const quizData = {
        'session1': {
            questions: [
                { question: "الصحة النفسية تعني فقط عدم وجود مرض نفسي.", options: ["صح", "غلط"], correct: 1 },
                { question: "الصحة النفسية تؤثر على طريقة تفكيرنا ومشاعرنا.", options: ["صح", "غلط"], correct: 0 },
                { question: "الشعور بالحزن أحيانًا أمر غير طبيعي.", options: ["صح", "غلط"], correct: 1 },
                { question: "كل إنسان يمكن أن يتأثر نفسيًا في مرحلة من حياته.", options: ["صح", "غلط"], correct: 0 },
                { question: "الصحة النفسية مهمة مثل الصحة الجسدية.", options: ["صح", "غلط"], correct: 0 },
                { question: "الشخص السليم نفسيًا لا يشعر أبدًا بالقلق.", options: ["صح", "غلط"], correct: 1 },
                { question: "الصحة النفسية تعني القدرة على التعامل مع ضغوط الحياة.", options: ["صح", "غلط"], correct: 0 },
                { question: "التفكير والمشاعر والسلوك لا علاقة لهم بالصحة النفسية.", options: ["صح", "غلط"], correct: 1 },
                { question: "الصحة النفسية ثابتة لا تتغير مع الظروف.", options: ["صح", "غلط"], correct: 1 },
                { question: "فهم الصحة النفسية يساعد على طلب المساعدة عند الحاجة.", options: ["صح", "غلط"], correct: 0 }
            ]
        },
        'session2': {
            questions: [
                { question: "الصحة النفسية لا تؤثر على الدراسة أو العمل.", options: ["صح", "غلط"], correct: 1 },
                { question: "الحالة النفسية الجيدة تساعد على التركيز والإنتاج.", options: ["صح", "غلط"], correct: 0 },
                { question: "الصحة النفسية تؤثر على العلاقات الاجتماعية.", options: ["صح", "غلط"], correct: 0 },
                { question: "لا يوجد ارتباط بين الصحة النفسية والجسدية.", options: ["صح", "غلط"], correct: 1 },
                { question: "التوتر المستمر قد يؤثر على الجسم.", options: ["صح", "غلط"], correct: 0 },
                { question: "الإنسان لا يحتاج صحة نفسية جيدة ليعيش حياة طبيعية.", options: ["صح", "غلط"], correct: 1 },
                { question: "الصحة النفسية تساعد في اتخاذ قرارات أفضل.", options: ["صح", "غلط"], correct: 0 },
                { question: "تجاهل الحالة النفسية لا يؤثر على الحياة اليومية.", options: ["صح", "غلط"], correct: 1 },
                { question: "الضغط النفسي قد يؤثر على النوم.", options: ["صح", "غلط"], correct: 0 },
                { question: "الصحة النفسية جزء أساسي من الصحة العامة.", options: ["صح", "غلط"], correct: 0 }
            ]
        },
        'session3': {
            questions: [
                { question: "المشاعر الصعبة مثل الحزن والقلق جزء طبيعي من الحياة.", options: ["صح", "غلط"], correct: 0 },
                { question: "يجب على الشخص إخفاء مشاعره الصعبة ليبدو قوياً.", options: ["صح", "غلط"], correct: 1 },
                { question: "قبول المشاعر هو أول خطوة للتعامل معها.", options: ["صح", "غلط"], correct: 0 },
                { question: "الشعور بالضغط النفسي يعني دائماً أن الشخص مريض.", options: ["صح", "غلط"], correct: 1 },
                { question: "المشاعر الصعبة هي رسائل تخبرنا عن احتياجاتنا.", options: ["صح", "غلط"], correct: 0 },
                { question: "الصحة النفسية تعني التخلص من كل المشاعر السلبية.", options: ["صح", "غلط"], correct: 1 },
                { question: "من الطبيعي طلب المساعدة عندما تصبح المشاعر ثقيلة.", options: ["صح", "غلط"], correct: 0 },
                { question: "المشاعر ليست أعداء لنا.", options: ["صح", "غلط"], correct: 0 },
                { question: "قمع المشاعر يؤدي لراحتها النفسية على المدى الطويل.", options: ["صح", "غلط"], correct: 1 },
                { question: "التحدث عن المشاعر يساعد في تخفيف حدتها.", options: ["صح", "غلط"], correct: 0 }
            ]
        },
        'session4': {
            questions: [
                { question: "الاعتراف بوجود مشكلة هو أول خطوة في التعافي.", options: ["صح", "غلط"], correct: 0 },
                { question: "التعافي النفسي عملية سريعة وتحدث في يوم واحد.", options: ["صح", "غلط"], correct: 1 },
                { question: "طلب المساعدة النفسية دليل على الضعف.", options: ["صح", "غلط"], correct: 1 },
                { question: "التعافي يحتاج لصبر واستمرارية.", options: ["صح", "غلط"], correct: 0 },
                { question: "يمكن للشخص أن يتعافى تماماً ويعيش حياة طبيعية.", options: ["صح", "غلط"], correct: 0 },
                { question: "تجاهل المشكلة يساعد في حلها تلقائياً.", options: ["صح", "غلط"], correct: 1 },
                { question: "فهم جذور المشكلة يساعد في عملية التعافي.", options: ["صح", "غلط"], correct: 0 },
                { question: "التعافي يعني أن الشخص لن يحزن أبداً مرة أخرى.", options: ["صح", "غلط"], correct: 1 },
                { question: "الدعم الاجتماعي مهم جداً في مرحلة التعافي.", options: ["صح", "غلط"], correct: 0 },
                { question: "كل شخص لديه طريقته الخاصة والفريدة في التعافي.", options: ["صح", "غلط"], correct: 0 }
            ]
        },
        'session5': {
            questions: [
                { question: "وصمة المرض النفسي تمنع الكثيرين من طلب المساعدة.", options: ["صح", "غلط"], correct: 0 },
                { question: "المرض النفسي هو نتيجة لضعف الإيمان أو الشخصية.", options: ["صح", "غلط"], correct: 1 },
                { question: "التوعية هي السلاح الأقوى لكسر الوصمة.", options: ["صح", "غلط"], correct: 0 },
                { question: "يجب معاملة المريض النفسي باحترام وتقدير.", options: ["صح", "غلط"], correct: 0 },
                { question: "المرض النفسي عيب يجب إخفاؤه عن الناس.", options: ["صح", "غلط"], correct: 1 },
                { question: "المريض النفسي شخص خطر ولا يمكن التنبؤ بتصرفاته.", options: ["صح", "غلط"], correct: 1 },
                { question: "تغيير لغتنا وطريقة كلامنا يساهم في كسر الوصمة.", options: ["صح", "غلط"], correct: 0 },
                { question: "المرض النفسي هو اضطراب صحي مثل أي مرض جسدي.", options: ["صح", "غلط"], correct: 0 },
                { question: "المجتمع له دور كبير في دعم أو إحباط المريض النفسي.", options: ["صح", "غلط"], correct: 0 },
                { question: "المرضى النفسيين لا يمكنهم العمل أو النجاح.", options: ["صح", "غلط"], correct: 1 }
            ]
        },
        'session6': {
            questions: [
                { question: "يجب استشارة متخصص عند استمرار المشاعر الصعبة.", options: ["صح", "غلط"], correct: 0 },
                { question: "الأدوية النفسية هي الحل الوحيد لكل المشاكل.", options: ["صح", "غلط"], correct: 1 },
                { question: "العلاج النفسي يساعد في اكتساب مهارات التعامل مع الحياة.", options: ["صح", "غلط"], correct: 0 },
                { question: "الاستشارة النفسية هي استثمار في جودة حياتك.", options: ["صح", "غلط"], correct: 0 },
                { question: "متى نطلب المساعدة؟ عندما تعيق المشاعر حياتنا اليومية.", options: ["صح", "غلط"], correct: 0 },
                { question: "طلب المساعدة يعني أن الشخص فقد عقله.", options: ["صح", "غلط"], correct: 1 },
                { question: "هناك أنواع مختلفة من الدعم النفسي والعلاجي.", options: ["صح", "غلط"], correct: 0 },
                { question: "التشخيص الذاتي من الإنترنت كافٍ ولا يحتاج لطبيب.", options: ["صح", "غلط"], correct: 1 },
                { question: "البداية المبكرة في العلاج تعطي نتائج أفضل.", options: ["صح", "غلط"], correct: 0 },
                { question: "الصحة النفسية حق لكل إنسان.", options: ["صح", "غلط"], correct: 0 }
            ]
        },
        'myth_fact': {
            questions: [
                { question: "الأشخاص المصابون بأمراض نفسية عنيفون وخطيرون دائمًا.", options: ["صح", "غلط"], correct: 1 },
                { question: "المرض النفسي ناتج عن ضعف في الشخصية.", options: ["صح", "غلط"], correct: 1 },
                { question: "يمكن للأطفال أن يعانوا من مشاكل في صحتهم النفسية.", options: ["صح", "غلط"], correct: 0 },
                { question: "المرض النفسي معدي.", options: ["صح", "غلط"], correct: 1 },
                { question: "العلاج النفسي هو للأشخاص الضعفاء فقط.", options: ["صح", "غلط"], correct: 1 },
                { question: "الأدوية النفسية تسبب الإدمان دائمًا.", options: ["صح", "غلط"], correct: 1 },
                { question: "يمكن للمصابين بأمراض نفسية أن يكونوا منتجين في المجتمع.", options: ["صح", "غلط"], correct: 0 },
                { question: "المرض النفسي هو نتيجة للسحر أو الحسد فقط.", options: ["صح", "غلط"], correct: 1 },
                { question: "التحسن في الصحة النفسية يحتاج وقت ومجهود.", options: ["صح", "غلط"], correct: 0 },
                { question: "الدعم الأسري ليس له دور في الشفاء.", options: ["صح", "غلط"], correct: 1 }
            ]
        },
        'session_myths': {
            questions: [
                { question: "المرض النفسي يعني دائمًا فقدان العقل أو الجنون.", options: ["صح", "خطأ"], correct: 1 },
                { question: "الأشخاص الذين يعانون من مشاكل نفسية هم أشخاص ضعفاء.", options: ["صح", "خطأ"], correct: 1 },
                { question: "المرض النفسي هو اضطراب صحي يمكن علاجه مثل الأمراض الجسدية.", options: ["صح", "خطأ"], correct: 0 },
                { question: "لا يمكن للأطفال أو المراهقين الإصابة بأمراض نفسية.", options: ["صح", "خطأ"], correct: 1 },
                { question: "طلب المساعدة النفسية هو دليل على القوة والشجاعة.", options: ["صح", "خطأ"], correct: 0 },
                { question: "الأدوية النفسية هي الحل الوحيد والأساسي لكل المشاكل النفسية.", options: ["صح", "خطأ"], correct: 1 },
                { question: "معظم الأشخاص الذين يعانون من اضطرابات نفسية هم أشخاص خطرون.", options: ["صح", "خطأ"], correct: 1 },
                { question: "البيئة والضغوط الحياتية لها دور كبير في الإصابة بالمرض النفسي.", options: ["صح", "خطأ"], correct: 0 },
                { question: "التعافي التام من المرض النفسي ممكن وموجود.", options: ["صح", "خطأ"], correct: 0 },
                { question: "الصحة النفسية تؤثر على الصحة الجسدية والعكس صحيح.", options: ["صح", "خطأ"], correct: 0 }
            ]
        },
        'stigma1': {
            questions: [
                { question: "الوصمة النفسية تعني حكم المجتمع السلبي على الشخص المريض نفسيًا.", options: ["صح", "غلط"], correct: 0 },
                { question: "المرض النفسي يعني ضعف في الشخصية فقط.", options: ["صح", "غلط"], correct: 1 },
                { question: "استخدام كلمة 'مجنون' يعتبر من أشكال الوصمة النفسية.", options: ["صح", "غلط"], correct: 0 },
                { question: "المرض النفسي لا يحتاج علاج مثل الأمراض الجسدية.", options: ["صح", "غلط"], correct: 1 },
                { question: "الوصمة النفسية قد تؤثر على نظرة الشخص لنفسه.", options: ["صح", "غلط"], correct: 0 },
                { question: "الوصمة النفسية تعني:", options: ["دعم المرضى نفسيًا", "حكم سلبي على المريض النفسي", "علاج نفسي", "تجاهل المرض"], correct: 1 },
                { question: "من أمثلة الوصمة النفسية:", options: ["تشجيع العلاج", "السخرية من المريض النفسي", "فهم المرض", "طلب المساعدة"], correct: 1 }
            ]
        },
        'stigma2': {
            questions: [
                { question: "الوصمة النفسية قد تمنع الشخص من طلب العلاج.", options: ["صح", "غلط"], correct: 0 },
                { question: "الشخص المريض نفسيًا دائمًا يطلب المساعدة بسهولة.", options: ["صح", "غلط"], correct: 1 },
                { question: "الصمت عن المشاعر قد يزيد الحالة سوءًا.", options: ["صح", "غلط"], correct: 0 },
                { question: "الوصمة النفسية لا تؤثر على الثقة بالنفس.", options: ["صح", "غلط"], correct: 1 },
                { question: "العزلة من نتائج الوصمة النفسية.", options: ["صح", "غلط"], correct: 0 },
                { question: "من آثار الوصمة النفسية:", options: ["زيادة الدعم", "العزلة الاجتماعية", "الشفاء السريع", "زيادة الوعي"], correct: 1 },
                { question: "الشخص الذي يتعرض للوصمة غالبًا:", options: ["يطلب المساعدة بسهولة", "يخفي مشاعره", "لا يتأثر", "يصبح أكثر ثقة دائمًا"], correct: 1 }
            ]
        },
        'stigma3': {
            questions: [
                { question: "المرض النفسي اختيار شخصي.", options: ["صح", "غلط"], correct: 1 },
                { question: "الاكتئاب والقلق من الاضطرابات النفسية الحقيقية.", options: ["صح", "غلط"], correct: 0 },
                { question: "المرض النفسي لا علاقة له بالمخ.", options: ["صح", "غلط"], correct: 1 },
                { question: "طلب العلاج النفسي دليل ضعف.", options: ["صح", "غلط"], correct: 1 },
                { question: "الأمراض النفسية تحتاج فهم وعلاج مثل أي مرض.", options: ["صح", "غلط"], correct: 0 },
                { question: "المرض النفسي:", options: ["ضعف شخصية", "اختيار", "حالة صحية حقيقية", "دلع"], correct: 2 },
                { question: "مقارنة صحيحة:", options: ["المرض النفسي = كسر في العظام", "المرض النفسي = حالة صحية تحتاج علاج", "المرض النفسي = خيال", "المرض النفسي = كسل"], correct: 1 }
            ]
        },
        'stigma4': {
            questions: [
                { question: "الإعلام أحيانًا يساهم في نشر صورة خاطئة عن المرض النفسي.", options: ["صح", "غلط"], correct: 0 },
                { question: "المجتمع دائمًا يقدم معلومات صحيحة عن الصحة النفسية.", options: ["صح", "غلط"], correct: 1 },
                { question: "الخوف من المجهول قد يؤدي إلى رفض الآخرين.", options: ["صح", "غلط"], correct: 0 },
                { question: "نقص التوعية يزيد الفهم الصحيح للمرض النفسي.", options: ["صح", "غلط"], correct: 1 },
                { question: "الكلمات اليومية ليس لها تأثير على الوصمة.", options: ["صح", "غلط"], correct: 1 },
                { question: "من أسباب الوصمة النفسية:", options: ["التوعية", "الفهم", "الإعلام الخاطئ", "الدعم"], correct: 2 },
                { question: "نقص المعرفة يؤدي إلى:", options: ["فهم أفضل", "تقليل الوصمة", "زيادة الوصمة", "علاج أسرع"], correct: 2 }
            ]
        },
        'stigma5': {
            questions: [
                { question: "تغيير اللغة يساعد في تقليل الوصمة النفسية.", options: ["صح", "غلط"], correct: 0 },
                { question: "السخرية من المرضى النفسيين طريقة صحيحة للتعامل.", options: ["صح", "غلط"], correct: 1 },
                { question: "طلب المساعدة النفسية دليل شجاعة.", options: ["صح", "غلط"], correct: 0 },
                { question: "لا يمكن تغيير نظرة المجتمع.", options: ["صح", "غلط"], correct: 1 },
                { question: "التوعية تساعد في تقليل الوصمة.", options: ["صح", "غلط"], correct: 0 },
                { question: "من طرق كسر الوصمة:", options: ["السخرية", "الدعم والتفهم", "تجاهل المشكلة", "الحكم على الآخرين"], correct: 1 },
                { question: "الصحة النفسية:", options: ["ليست مهمة", "جزء من الصحة العامة", "ترف", "غير حقيقية"], correct: 1 }
            ]
        },
        'social1': {
            questions: [
                { question: "المسافة الاجتماعية تعني درجة القرب أو البعد في التعامل مع الآخرين.", options: ["صح", "غلط"], correct: 0 },
                { question: "كل الناس تتعامل بنفس الدرجة مع المرضى النفسيين بدون اختلاف.", options: ["صح", "غلط"], correct: 1 },
                { question: "المسافة الاجتماعية تعتمد فقط على حقيقة علمية بدون تأثير المجتمع.", options: ["صح", "غلط"], correct: 1 },
                { question: "التردد تجاه التعامل مع مريض نفسي دائمًا يعني رفض كامل له.", options: ["صح", "غلط"], correct: 1 },
                { question: "زيادة المسافة الاجتماعية تعني زيادة القبول.", options: ["صح", "غلط"], correct: 1 },
                { question: "المسافة الاجتماعية تعني:", options: ["العلاج النفسي", "درجة القبول أو الرفض في التعامل", "نوع المرض النفسي", "طريقة التشخيص"], correct: 1 },
                { question: "كلما زادت المسافة الاجتماعية:", options: ["زاد القبول", "زاد القرب", "زاد الرفض والتجنب", "زاد الفهم"], correct: 2 }
            ]
        },
        'social2': {
            questions: [
                { question: "الإعلام قد يؤثر على نظرة الناس للمرض النفسي.", options: ["صح", "غلط"], correct: 0 },
                { question: "اللغة اليومية ليس لها تأثير على الأفكار الاجتماعية.", options: ["صح", "غلط"], correct: 1 },
                { question: "نقص المعرفة يزيد من الفهم الصحيح دائمًا.", options: ["صح", "غلط"], correct: 1 },
                { question: "الخوف من المجهول قد يؤدي إلى رفض الآخرين.", options: ["صح", "غلط"], correct: 0 },
                { question: "كل الأفكار عن المرض النفسي في المجتمع صحيحة.", options: ["صح", "غلط"], correct: 1 },
                { question: "من أسباب المسافة الاجتماعية:", options: ["التوعية", "الفهم العلمي", "الإعلام الخاطئ", "التعليم الصحيح"], correct: 2 },
                { question: "الجهل بالصحة النفسية يؤدي إلى:", options: ["تقليل الخوف", "زيادة القبول", "زيادة المسافة الاجتماعية", "زيادة العلاج"], correct: 2 }
            ]
        },
        'social3': {
            questions: [
                { question: "التردد في البداية تجاه المرض النفسي أمر طبيعي.", options: ["صح", "غلط"], correct: 0 },
                { question: "التردد يعني دائمًا رفض كامل للشخص.", options: ["صح", "غلط"], correct: 1 },
                { question: "المعرفة تقلل من الخوف.", options: ["صح", "غلط"], correct: 0 },
                { question: "كل الناس تتقبل المرض النفسي من أول مرة.", options: ["صح", "غلط"], correct: 1 },
                { question: "الخوف من المجهول قد يكون سببًا للتردد.", options: ["صح", "غلط"], correct: 0 },
                { question: "التردد غالبًا يكون بسبب:", options: ["الفهم الكامل", "نقص المعرفة", "الدعم", "العلاج"], correct: 1 },
                { question: "مع زيادة الفهم:", options: ["يزيد الخوف", "تقل المسافة الاجتماعية", "يزيد الرفض", "لا يحدث تغيير"], correct: 1 }
            ]
        },
        'social4': {
            questions: [
                { question: "المسافة الاجتماعية قد تؤدي إلى العزلة.", options: ["صح", "غلط"], correct: 0 },
                { question: "المرض النفسي لا يتأثر برأي المجتمع.", options: ["صح", "غلط"], correct: 1 },
                { question: "تأخير العلاج من نتائج المسافة الاجتماعية.", options: ["صح", "غلط"], correct: 0 },
                { question: "المسافة الاجتماعية قد تحسن الحالة النفسية دائمًا.", options: ["صح", "غلط"], correct: 1 },
                { question: "رفض المجتمع يزيد من معاناة الشخص.", options: ["صح", "غلط"], correct: 0 },
                { question: "من آثار المسافة الاجتماعية:", options: ["زيادة الدعم", "العزلة", "زيادة الفهم", "الشفاء السريع"], correct: 1 },
                { question: "الشخص الذي يتعرض للرفض الاجتماعي:", options: ["يشعر بالدعم", "يشعر بالاندماج", "قد يشعر بانخفاض تقدير الذات", "لا يتأثر"], correct: 2 }
            ]
        },
        'social5': {
            questions: [
                { question: "الفهم يساعد في تقليل المسافة الاجتماعية.", options: ["صح", "غلط"], correct: 0 },
                { question: "التعامل الطبيعي مع المرضى النفسيين مهم.", options: ["صح", "غلط"], correct: 0 },
                { question: "الشفقة هي الطريقة الأفضل دائمًا للتعامل.", options: ["صح", "غلط"], correct: 1 },
                { question: "تصحيح المعلومات يقلل من الوصمة.", options: ["صح", "غلط"], correct: 0 },
                { question: "تجاهل المرض النفسي يحل المشكلة.", options: ["صح", "غلط"], correct: 1 },
                { question: "أفضل طريقة لتقليل المسافة الاجتماعية:", options: ["السخرية", "التجنب", "التوعية والفهم", "الخوف"], correct: 2 },
                { question: "القبول الحقيقي يعني:", options: ["الرفض", "التعامل الطبيعي", "الابتعاد", "الحكم"], correct: 1 }
            ]
        },
        'attitude1': {
            questions: [
                { question: "الاتجاه هو مجرد رأي فقط ولا يؤثر على السلوك.", options: ["صح", "غلط"], correct: 1 },
                { question: "الاتجاه يتكون من الفكر والمشاعر والسلوك.", options: ["صح", "غلط"], correct: 0 },
                { question: "أول انطباع تجاه شخص يعاني نفسيًا لا يعتبر اتجاه.", options: ["صح", "غلط"], correct: 1 },
                { question: "المشاعر تجاه المرض النفسي جزء من الاتجاه.", options: ["صح", "غلط"], correct: 0 },
                { question: "السلوك لا يتأثر بالاتجاه.", options: ["صح", "غلط"], correct: 1 },
                { question: "الاتجاه يتكون من:", options: ["الفكر فقط", "المشاعر فقط", "الفكر + المشاعر + السلوك", "السلوك فقط"], correct: 2 },
                { question: "أول إحساس عند سماع 'أنا بتعالج نفسيًا' يسمى:", options: ["تشخيص", "اتجاه", "علاج", "وصمة"], correct: 1 }
            ]
        },
        'attitude2': {
            questions: [
                { question: "الاتجاه الإيجابي يعني رفض المرض النفسي.", options: ["صح", "غلط"], correct: 1 },
                { question: "الاتجاه السلبي قد يتضمن خوف وتجنب.", options: ["صح", "غلط"], correct: 0 },
                { question: "الاتجاه المحايد يعني رفض كامل.", options: ["صح", "غلط"], correct: 1 },
                { question: "الاتجاهات لا يمكن أن تتغير.", options: ["صح", "غلط"], correct: 1 },
                { question: "الاتجاه الإيجابي يعتمد على الفهم والتقبل.", options: ["صح", "غلط"], correct: 0 },
                { question: "الاتجاه السلبي يتميز بـ:", options: ["دعم وتقبل", "خوف ورفض", "فهم", "مساعدة"], correct: 1 },
                { question: "الاتجاه المحايد يعني:", options: ["قبول كامل", "رفض كامل", "عدم ووضوح الموقف", "علاج"], correct: 2 }
            ]
        },
        'attitude3': {
            questions: [
                { question: "الإعلام قد يؤثر على تشكيل الاتجاهات.", options: ["صح", "غلط"], correct: 0 },
                { question: "الأسرة ليس لها تأثير على الاتجاهات.", options: ["صح", "غلط"], correct: 1 },
                { question: "التجربة الشخصية يمكن أن تغير الاتجاه.", options: ["صح", "غلط"], correct: 0 },
                { question: "التعليم يساعد في بناء اتجاهات صحيحة.", options: ["صح", "غلط"], correct: 0 },
                { question: "الاتجاهات لا تتأثر بالمجتمع.", options: ["صح", "غلط"], correct: 1 },
                { question: "من مصادر تكوين الاتجاهات:", options: ["الإعلام", "العلاج فقط", "الأدوية", "الوراثة فقط"], correct: 0 },
                { question: "أقوى مصدر لتغيير الاتجاه غالبًا هو:", options: ["التجربة الشخصية", "الشائعات", "الخوف", "التجنب"], correct: 0 }
            ]
        },
        'attitude4': {
            questions: [
                { question: "الاتجاهات يمكن تغييرها مع الوقت.", options: ["صح", "غلط"], correct: 0 },
                { question: "الجهل يساعد في تقليل الاتجاه السلبي.", options: ["صح", "غلط"], correct: 1 },
                { question: "التجربة تساعد في تصحيح الاتجاهات.", options: ["صح", "غلط"], correct: 0 },
                { question: "التعاطف يساعد في بناء اتجاه إيجابي.", options: ["صح", "غلط"], correct: 0 },
                { question: "الاتجاه لا يمكن تغييره بعد تكوينه.", options: ["صح", "غلط"], correct: 1 },
                { question: "تغيير الاتجاه يبدأ بـ:", options: ["التجنب", "الفهم", "الخوف", "الحكم"], correct: 1 },
                { question: "الاتجاه الإيجابي يعتمد على:", options: ["السخرية", "الوعي والتعاطف", "الجهل", "الرفض"], correct: 1 }
            ]
        },
        'support1': {
            questions: [
                { question: "الدعم النفسي يعني حل مشاكل الشخص بالكامل.", options: ["صح", "غلط"], correct: 1 },
                { question: "الاستماع بدون حكم من أهم أشكال الدعم النفسي.", options: ["صح", "غلط"], correct: 0 },
                { question: "تقديم نصائح كثيرة هو دائمًا أفضل طريقة للدعم.", options: ["صح", "غلط"], correct: 1 },
                { question: "الشخص الداعم لازم يكون متخصص نفسي.", options: ["صح", "غلط"], correct: 1 },
                { question: "تقليل مشاعر الشخص يساعده يتخطى مشكلته أسرع.", options: ["صح", "غلط"], correct: 1 },
                { question: "وجودك مع شخص بيعاني نفسيًا قد يكون كافي جدًا أحيانًا.", options: ["صح", "غلط"], correct: 0 },
                { question: "تجاهل الشخص أفضل من التحدث معه في حالته النفسية.", options: ["صح", "غلط"], correct: 1 },
                { question: "الدعم النفسي يعتمد على التعاطف والفهم.", options: ["صح", "غلط"], correct: 0 },
                { question: "طلب المساعدة النفسية من مختص جزء من الدعم.", options: ["صح", "غلط"], correct: 0 },
                { question: "الشخص الداعم يجب أن يحكم على مشاعر الآخرين.", options: ["صح", "غلط"], correct: 1 }
            ]
        },
        'support2': {
            questions: [
                { question: "معنى الدعم النفسي هو:", options: ["إعطاء أوامر", "حل جميع المشاكل", "الاستماع والفهم والتواجد مع الشخص", "تجاهل المشاعر"], correct: 2 },
                { question: "أهم عنصر في الدعم النفسي هو:", options: ["النقد", "الحكم", "الاستماع الجيد", "المقاطعة"], correct: 2 },
                { question: "الهدف الأساسي من الدعم النفسي:", options: ["تغيير شخصية الشخص", "جعل الشخص يعتمد عليك دائمًا", "تقليل الشعور بالوحدة والألم النفسي", "إعطاء نصائح فقط"], correct: 2 },
                { question: "من الجمل الداعمة:", options: ["'كبر دماغك'", "'إنت بتبالغ'", "'أنا معاك وسمعك'", "'ده مش مهم'"], correct: 2 },
                { question: "من الأخطاء في الدعم النفسي:", options: ["الاستماع", "التعاطف", "التقليل من المشاعر", "الصمت الداعم"], correct: 2 },
                { question: "الشخص الداعم يجب أن:", options: ["يحكم على الآخرين", "يقاطع الحديث", "يكون متفهمًا", "يفرض رأيه"], correct: 2 },
                { question: "الدعم النفسي مهم لأنه:", options: ["يزيد الضغط", "يقلل الشعور بالوحدة", "يلغي المشاكل", "يغير الواقع"], correct: 1 },
                { question: "أفضل رد لشخص يقول 'أنا تعبان نفسيًا':", options: ["'إنت بتدلع'", "'مش مهم'", "'أنا سامعك وموجود معاك'", "'خليك قوي وخلاص'"], correct: 2 }
            ]
        },
        'support3': {
            questions: [
                { question: "موقف: صديقك بيقول 'أنا مضغوط ومش قادر أتكلم مع حد'. إزاي تدعمه؟", options: ["أقوله كبر دماغك", "أستمع له بدون حكم وأخبره أنني موجود", "أتجاهله تماماً", "أعطيه نصائح قاسية"], correct: 1 },
                { question: "موقف: شخص قريب منك بيحكي عن مشاعره، وأنت بدأت تقاطعه بنصائح كثيرة. ما الخطأ هنا؟", options: ["عدم إعطاء مساحة للتعبير", "الاستماع الزائد", "التعاطف المبالغ فيه", "لا يوجد خطأ"], correct: 0 },
                { question: "موقف: شخص يقولك 'أنا حاسس إني لوحدي ومحدش فاهمني'. كيف ترد؟", options: ["إنت بتبالغ", "أنا فاهم إنك حاسس بكده وإنت مش لوحدك", "كل الناس كده", "اسكت أحسن"], correct: 1 },
                { question: "أي جملة تعتبر دعم نفسي صحيح؟", options: ["'خليك قوي وخلاص'", "'مش مهم اللي حاسس بيه'", "'أنا معاك ولو حابب تحكي أنا سامعك'", "'إنت بتبالغ'"], correct: 2 }
            ]
        }
    };
    return quizData[sessionId];
}

function getSessionTitle(sessionId) {
    const titles = {
        'session1': 'ما هي الصحة النفسية؟',
        'session2': 'أهمية الصحة النفسية',
        'session3': 'المشاعر الصعبة',
        'session4': 'أول خطوة في التعافي',
        'session5': 'كسر الوصمة',
        'session6': 'متى نطلب المساعدة؟',
        'myth_fact': 'تصحيح المفاهيم',
        'stigma1': 'ما هي الوصمة النفسية؟',
        'stigma2': 'تأثير الوصمة النفسية',
        'stigma3': 'هل المرض النفسي ضعف؟',
        'stigma4': 'جذور الوصمة النفسية',
        'stigma5': 'كسر الوصمة النفسية',
        'social1': 'مفهوم المسافة الاجتماعية',
        'social2': 'أسباب المسافة الاجتماعية',
        'social3': 'هل التردد طبيعي؟',
        'social4': 'آثار المسافة الاجتماعية',
        'social5': 'تقليل المسافة الاجتماعية',
        'attitude1': 'مفهوم الاتجاه',
        'attitude2': 'أشكال الاتجاهات',
        'attitude3': 'مصادر الاتجاهات',
        'attitude4': 'تغيير الاتجاهات',
        'support1': 'مفهوم الدعم النفسي',
        'support2': 'ماذا نقول وماذا لا نقول؟',
        'support3': 'حدود الدعم النفسي'
    };
    return titles[sessionId] || 'الجلسة';
}

const moodResponses = {
    happy: {
        emoji: '😄',
        title: 'مبسوط',
        message: 'دايما يارب! السعادة دي طاقة جميلة، استغلها في حاجة بتحبها او ساعد حد غيرك يحس بنفس الشعور.',
        quote: '"السعادة مش محطة بنوصل لها، دي طريقة سفر"'
    },
    active: {
        emoji: '🤩',
        title: 'نشيط',
        message: 'طاقة ممتازة! استغل النشاط ده في رياضة أو إنك تخلص حاجة كنت مأجلها. إنت قدها! 💪',
        quote: '"السر في إنك تبدأ هو إنك تبدأ فعلاً"'
    },
    annoyed: {
        emoji: '😣',
        title: 'متضايق',
        message: 'معلش، أوقات بنحس بكده. جرب تشم هوا نضيف أو تسمع حاجة هادية. الضيق ده مجرد وقت وهيمشي. ✨',
        quote: '"ما تخليش لحظة ضيق تسرق منك يوم كامل"'
    },
    anxious: {
        emoji: '😰',
        title: 'قلقان',
        message: 'خد نفس عميق.. القلق مجرد سحابة وهتعدي. حاول تركز في اللحظة اللي انت فيها دلوقتي وبس.',
        quote: '"القلق مش بيمنع وجع بكره، لكنه بيسرق سلام النهاردة"'
    },
    calm: {
        emoji: '😊',
        title: 'هادي',
        message: 'الهدوء ده نعمة. ده وقت ممتاز عشان تفكر في اهدافك او تقرا كتاب. حافظ علي الحاله دي بتناول خفيف أو مشي في مكان هادي.',
        quote: '"السلام الداخلي أغلى من أي شيء تاني في الدنيا"'
    }
};

function selectMood(mood) {
    const modal = document.getElementById('moodModal');
    const title = document.getElementById('moodTitle');
    const content = document.getElementById('moodContent');
    const response = moodResponses[mood];
    if (!response || !modal || !title || !content) return;
    title.textContent = response.title;
    content.innerHTML = `
        <span class="mood-emoji-large">${response.emoji}</span>
        <p class="mood-message">${response.message}</p>
        <div class="mood-quote">${response.quote}</div>
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    openModalWithAnimation(modal);
}

function closeMoodModal() {
    const modal = document.getElementById('moodModal');
    if (modal) {
        closeModalWithAnimation(modal);
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function toggleAdvice(adviceId, event) {
    if (event) event.stopPropagation();
    const clickedContent = document.getElementById('advice-' + adviceId);
    if (!clickedContent) return;
    const clickedCard = clickedContent.closest('.advice-card');
    if (!clickedCard) return;
    const isAlreadyActive = clickedCard.classList.contains('active');
    document.querySelectorAll('.advice-card').forEach(function (card) {
        card.classList.remove('active');
    });
    if (!isAlreadyActive) clickedCard.classList.add('active');
}

function toggleIntroCard(element) {
    const isAlreadyActive = element.classList.contains('active');
    document.querySelectorAll('.intro-card').forEach(function (card) {
        card.classList.remove('active');
    });
    if (!isAlreadyActive) element.classList.add('active');
}

function toggleDisorderCard(element) {
    const isAlreadyActive = element.classList.contains('active');
    document.querySelectorAll('.disorder-card').forEach(function (card) {
        card.classList.remove('active');
    });
    if (!isAlreadyActive) {
        element.classList.add('active');
        setTimeout(() => {
            const cardTop = element.getBoundingClientRect().top + window.pageYOffset;
            const offset = 100;
            window.scrollTo({ top: cardTop - offset, behavior: 'smooth' });
        }, 300);
    }
}

document.addEventListener('click', function (e) {
    if (!e.target.closest('.advice-card')) {
        document.querySelectorAll('.advice-card').forEach(function (card) {
            card.classList.remove('active');
        });
    }
    if (!e.target.closest('.intro-card')) {
        document.querySelectorAll('.intro-card').forEach(function (card) {
            card.classList.remove('active');
        });
    }
    if (!e.target.closest('.disorder-card')) {
        document.querySelectorAll('.disorder-card').forEach(function (card) {
            card.classList.remove('active');
        });
    }
});

window.addEventListener('click', function (event) {
    const moodModal = document.getElementById('moodModal');
    if (event.target === moodModal) closeMoodModal();
    if (event.target === quizModal) closeQuiz();
    if (event.target === videoModal) closeVideo();
});
