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
        usedMessages = []; // Reset when all messages are used
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
        },
        onClick: function(){} 
    }).showToast();
}

function startSupportMessages() {
    // Prevent multiple intervals from starting
    if (window.supportMessagesStarted) return;
    window.supportMessagesStarted = true;

    // Clear any existing interval just in case
    if (toastInterval) {
        clearInterval(toastInterval);
    }
    
    // Show first message after 3 seconds
    setTimeout(showSupportToast, 3000);
    
    // Then show random messages every 2 minutes (120000 ms)
    toastInterval = setInterval(() => {
        showSupportToast();
    }, 120000); 
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    startSupportMessages(); // Start the support message system
    initializeAOS();
});

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu if open
            navMenu.classList.remove('active');
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {

    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe session cards
    document.querySelectorAll('.session-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize AOS
function initializeAOS() {
    // Initialize AOS library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
}

// Regular Animations
function initializeAnimations() {
    // Add click ripple effect
    document.querySelectorAll('.btn, .quiz-option').forEach(element => {
        element.addEventListener('click', function(e) {
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
    quizTitle.textContent = `اختبر فهمك - ${getSessionTitle(sessionId)}`;
    
    renderQuiz();
    quizModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    openModalWithAnimation(quizModal);
}

function renderQuiz() {
    if (!currentQuiz) return;

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
    // Remove previous selection
    document.querySelectorAll(`.quiz-option[data-question="${questionIndex}"]`).forEach(option => {
        option.classList.remove('selected');
    });

    // Add selection to clicked option
    const selectedOption = document.querySelector(`.quiz-option[data-question="${questionIndex}"][data-option="${optionIndex}"]`);
    selectedOption.classList.add('selected');

    // Store answer
    quizAnswers[questionIndex] = optionIndex;
}

function submitQuiz() {
    if (!currentQuiz || Object.keys(quizAnswers).length !== currentQuiz.questions.length) {
        showNotification('من فضلك جاوب على كل الأسئلة', 'warning');
        return;
    }

    let score = 0;
    const totalQuestions = currentQuiz.questions.length;

    // Check answers and show results
    currentQuiz.questions.forEach((question, index) => {
        const userAnswer = quizAnswers[index];
        const correctAnswer = question.correct;
        const options = document.querySelectorAll(`.quiz-option[data-question="${index}"]`);

        options.forEach((option, optionIndex) => {
            option.classList.remove('correct', 'incorrect');
            
            if (optionIndex === correctAnswer) {
                option.classList.add('correct');
            } else if (optionIndex === userAnswer && userAnswer !== correctAnswer) {
                option.classList.add('incorrect');
            }
        });

        if (userAnswer === correctAnswer) {
            score++;
        }
    });

    // Show results
    setTimeout(() => {
        showQuizResults(score, totalQuestions);
    }, 1000);
}

function showQuizResults(score, totalQuestions) {
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = '';

    if (percentage >= 80) {
        message = 'ممتاز! فهمك كويس جداً للموضوع 👏';
    } else if (percentage >= 60) {
        message = 'شطور! فهمت الأساسيات كويس 👍';
    } else if (percentage >= 40) {
        message = 'مش وحش! بس راجع المحتوى تاني عشان تفهم أكتر 📚';
    } else {
        message = 'كمل تعلم! راجع السيشنات وحاول تاني 💪';
    }

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

    quizContent.innerHTML = resultsHtml;
}

function retakeQuiz() {
    quizAnswers = {};
    renderQuiz();
}

function closeQuiz() {
    quizModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentQuiz = null;
    currentSession = null;
    quizAnswers = {};
}

// Video Functions - Open modal with local video
function playVideo(sessionId) {
    const modal = document.getElementById('videoModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Use first video for stigma sessions, second video for others
    const isStigmaSession = sessionId.startsWith('stigma') || sessionId === 'session5';
    const videoSrc = isStigmaSession 
        ? 'assets/WhatsApp Video 2026-04-18 at 10.17.27 PM.mp4' 
        : 'assets/WhatsApp Video 2026-04-18 at 10.17.44 PM.mp4';
    
    // Set video content
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
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    videoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Quiz Data - بالعربي
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
                { question: "من الطبيعي أن نشعر بالحزن أحيانًا.", options: ["صح", "غلط"], correct: 0 },
                { question: "المشاعر السلبية دائمًا تعني مرض نفسي.", options: ["صح", "غلط"], correct: 1 },
                { question: "استمرار الحزن لفترة طويلة يحتاج اهتمام.", options: ["صح", "غلط"], correct: 0 },
                { question: "القلق شعور طبيعي في بعض المواقف.", options: ["صح", "غلط"], correct: 0 },
                { question: "كل الناس تمر بمشاعر صعبة في حياتها.", options: ["صح", "غلط"], correct: 0 },
                { question: "تجاهل المشاعر يساعد على اختفائها.", options: ["صح", "غلط"], correct: 1 },
                { question: "المشاعر تؤثر على السلوك اليومي.", options: ["صح", "غلط"], correct: 0 },
                { question: "التعب النفسي قد يظهر بشكل جسدي أحيانًا.", options: ["صح", "غلط"], correct: 0 },
                { question: "لا يجب الحديث عن المشاعر مع الآخرين.", options: ["صح", "غلط"], correct: 1 },
                { question: "فهم المشاعر يساعد على التعامل معها.", options: ["صح", "غلط"], correct: 0 }
            ]
        },
        'session4': {
            questions: [
                { question: "أول خطوة في التعافي هي الاعتراف بالمشكلة.", options: ["صح", "غلط"], correct: 0 },
                { question: "تجاهل المشكلة يساعد على حلها.", options: ["صح", "غلط"], correct: 1 },
                { question: "طلب المساعدة ضعف شخصية.", options: ["صح", "غلط"], correct: 1 },
                { question: "الدعم النفسي قد يساعد في التحسن.", options: ["صح", "غلط"], correct: 0 },
                { question: "التعافي يحتاج وقت وصبر.", options: ["صح", "غلط"], correct: 0 },
                { question: "التحدث عن المشكلة لا يفيد.", options: ["صح", "غلط"], correct: 1 },
                { question: "الإنسان يمكن أن يتحسن مع العلاج المناسب.", options: ["صح", "غلط"], correct: 0 },
                { question: "كل المشكلات النفسية تختفي تلقائيًا.", options: ["صح", "غلط"], correct: 1 },
                { question: "الدعم من الآخرين مهم في التعافي.", options: ["صح", "غلط"], correct: 0 },
                { question: "الاعتراف بالمشاعر خطوة إيجابية.", options: ["صح", "غلط"], correct: 0 }
            ]
        },
        'session5': {
            questions: [
                { question: "المرض النفسي يعني ضعف.", options: ["صح", "غلط"], correct: 1 },
                { question: "التحدث عن الصحة النفسية شيء طبيعي.", options: ["صح", "غلط"], correct: 0 },
                { question: "الخوف من كلام الناس قد يمنع العلاج.", options: ["صح", "غلط"], correct: 0 },
                { question: "كل الناس يمكن أن تحتاج دعم نفسي.", options: ["صح", "غلط"], correct: 0 },
                { question: "المرض النفسي شيء نادر جدًا.", options: ["صح", "غلط"], correct: 1 },
                { question: "الدعم النفسي مهم مثل الدعم الطبي.", options: ["صح", "غلط"], correct: 0 },
                { question: "الشخص المصاب باضطراب نفسي خطر دائمًا.", options: ["صح", "غلط"], correct: 1 },
                { question: "فهم المجتمع يساعد في تقليل الوصمة.", options: ["صح", "غلط"], correct: 0 },
                { question: "طلب المساعدة شيء مخجل.", options: ["صح", "غلط"], correct: 1 },
                { question: "التوعية تقلل من الخوف تجاه المرض النفسي.", options: ["صح", "غلط"], correct: 0 }
            ]
        },
        'session6': {
            questions: [
                { question: "استمرار الحزن لفترة طويلة يحتاج اهتمام.", options: ["صح", "غلط"], correct: 0 },
                { question: "فقدان التركيز قد يكون علامة مهمة.", options: ["صح", "غلط"], correct: 0 },
                { question: "طلب المساعدة غير ضروري أبدًا.", options: ["صح", "غلط"], correct: 1 },
                { question: "تغير النوم أو الشهية قد يدل على مشكلة نفسية.", options: ["صح", "غلط"], correct: 0 },
                { question: "الدعم النفسي مفيد في كل الحالات.", options: ["صح", "غلط"], correct: 0 },
                { question: "تجاهل الأعراض يساعد على التحسن.", options: ["صح", "غلط"], correct: 1 },
                { question: "الشعور بالإرهاق المستمر قد يكون علامة.", options: ["صح", "غلط"], correct: 0 },
                { question: "كل الناس تحتاج علاج نفسي دائمًا.", options: ["صح", "غلط"], correct: 1 },
                { question: "طلب المساعدة خطوة طبيعية.", options: ["صح", "غلط"], correct: 0 },
                { question: "من الأفضل طلب الدعم عند الحاجة.", options: ["صح", "غلط"], correct: 0 }
            ]
        },
        'myth_fact': {
            questions: [
                { question: "زيارة الطبيب النفسي تعني الجنون.", options: ["صح", "غلط"], correct: 1 },
                { question: "المشكلات النفسية يمكن علاجها.", options: ["صح", "غلط"], correct: 0 },
                { question: "الأدوية النفسية تسبب إدمان دائمًا.", options: ["صح", "غلط"], correct: 1 },
                { question: "كل ما نسمعه عن الصحة النفسية صحيح.", options: ["صح", "غلط"], correct: 1 },
                { question: "الرجل لا يجب أن يعبر عن مشاعره.", options: ["صح", "غلط"], correct: 1 },
                { question: "الاكتئاب يحتاج سبب واضح دائمًا.", options: ["صح", "غلط"], correct: 1 },
                { question: "يمكن للشخص المصاب نفسيًا أن ينجح.", options: ["صح", "غلط"], correct: 0 },
                { question: "تجاهل المشكلة النفسية يساعد على حلها.", options: ["صح", "غلط"], correct: 1 },
                { question: "الصحة النفسية مهمة مثل الجسدية.", options: ["صح", "غلط"], correct: 0 },
                { question: "طلب المساعدة خطوة إيجابية.", options: ["صح", "غلط"], correct: 0 }
            ]
        },
        'session3': {
            questions: [
                {
                    question: 'لما تقول لحد "ده مجنون" ده:',
                    options: [
                        "هزار بريء",
                        "سهل بس بيكسر الشخص",
                        "مديح",
                        "كلام عادي"
                    ],
                    correct: 1
                },
                {
                    question: "الوصمة النفسية بتخلي الناس:",
                    options: [
                        "تحس بالفخر",
                        "تحس بالعار وتخبي تعبها",
                        "تقوى",
                        "تطلب المساعدة فوراً"
                    ],
                    correct: 1
                },
                {
                    question: "الوصمة النفسية يعني:",
                    options: [
                        "الاهتمام بالناس",
                        "حكم بدون فهم",
                        "مساعدة احترافية",
                        "صداقة"
                    ],
                    correct: 1
                }
            ]
        },
        'session4': {
            questions: [
                {
                    question: "بدل الحكم، لازم ن:",
                    options: [
                        "نبعد عن الشخص",
                        "نضحك عليه",
                        "نسمع، ندعم، وماتقللش من مشاعر حد",
                        "ننصحه فوراً"
                    ],
                    correct: 2
                },
                {
                    question: "لما حد يحكيلك عن معاناته النفسية:",
                    options: [
                        "تسخر منه",
                        "تبعد عنه",
                        "تحاول تفهمه وتدعمه",
                        "تحكي للكل"
                    ],
                    correct: 2
                },
                {
                    question: "التعاطف يعني:",
                    options: [
                        "تحس بالشفقة على حد",
                        "تحط نفسك مكانه",
                        "تنصحه من غير ما يطلب",
                        "تتجاهل مشاعره"
                    ],
                    correct: 1
                }
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
                { question: "الخوف من المجهول قد يؤدي للوصمة النفسية.", options: ["صح", "غلط"], correct: 0 },
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
        'session_myths': {
            questions: [
                { question: "المرض النفسي يعني دائمًا فقدان العقل أو الجنون.", options: ["صح", "خطأ"], correct: 1 },
                { question: "أغلب الأشخاص الذين يعانون من اضطرابات نفسية خطرون على الآخرين.", options: ["صح", "خطأ"], correct: 1 },
                { question: "المرض النفسي لا علاقة له بضعف الشخصية.", options: ["صح", "خطأ"], correct: 0 },
                { question: "المشاعر السلبية مثل الحزن والقلق غير طبيعية ويجب التخلص منها تمامًا.", options: ["صح", "خطأ"], correct: 1 },
                { question: "العلاج النفسي يعتمد على أساليب علمية مدروسة.", options: ["صح", "خطأ"], correct: 0 },
                { question: "الشخص الذي يعاني نفسيًا لا يمكن أن يتحسن أبدًا.", options: ["صح", "خطأ"], correct: 1 },
                { question: "تجاهل المشكلات النفسية يساعد على حلها تلقائيًا.", options: ["صح", "خطأ"], correct: 1 },
                { question: "الأدوية النفسية تسبب دائمًا إدمان.", options: ["صح", "خطأ"], correct: 1 },
                { question: "الصحة النفسية تعني السعادة المستمرة فقط.", options: ["صح", "خطأ"], correct: 1 },
                { question: "طلب المساعدة النفسية يدل على وعي وشجاعة.", options: ["صح", "خطأ"], correct: 0 },
                {
                    question: "المقصود بالأساطير النفسية هو:",
                    options: ["حقائق علمية", "معلومات طبية دقيقة", "أفكار خاطئة منتشرة في المجتمع", "تشخيص طبي"],
                    correct: 2
                },
                {
                    question: "المرض النفسي يعني:",
                    options: ["ضعف شخصية", "فقدان عقل دائم", "اضطراب في التفكير أو المشاعر أو السلوك", "مرض جسدي فقط"],
                    correct: 2
                },
                {
                    question: "السبب الرئيسي لانتشار الأساطير النفسية هو:",
                    options: ["العلم", "التوعية", "الإعلام والأفلام والمفاهيم القديمة", "العلاج النفسي"],
                    correct: 2
                },
                {
                    question: "العلاج النفسي يعتمد على:",
                    options: ["نصائح عشوائية", "أساليب علمية منظمة", "تخمينات", "تجاهل المشكلة"],
                    correct: 1
                }
            ]
        },
        'session5': {
            questions: [
                {
                    question: "المسافة الاجتماعية يعني:",
                    options: [
                        "بس المسافة الجسدية",
                        "البعد عن الناس المريضة نفسياً",
                        "حدود اجتماعية طبيعية",
                        "مسافة احترافية"
                    ],
                    correct: 1
                },
                {
                    question: "أسباب المسافة الاجتماعية تشمل:",
                    options: [
                        "الحب والتفاهم",
                        "الخوف، الأفكار الغلط، وقلة الوعي",
                        "التدريب الاحترافي",
                        "التجربة الشخصية"
                    ],
                    correct: 1
                },
                {
                    question: "لما نبعد عن المريض النفسي، إحنا بنبعد عن:",
                    options: [
                        "الخطر",
                        "المرض",
                        "إنسان",
                        "المشاكل"
                    ],
                    correct: 2
                }
            ]
        },
        'session6': {
            questions: [
                {
                    question: "معظم المرضى النفسيين:",
                    options: [
                        "خطيرين ومش متوقعين",
                        "مش خطرين وبيعيشوا طبيعي",
                        "مش قادرين يشتغلوا",
                        "معزولين دايماً"
                    ],
                    correct: 1
                },
                {
                    question: "الناس المريضة نفسياً محتاجة:",
                    options: [
                        "شفقة وصدقة",
                        "فرصة، دعم، وتفاهم",
                        "يتسابوا لوحدهم",
                        "قواعد صارمة"
                    ],
                    correct: 1
                },
                {
                    question: "القرب من المرضى النفسيين ممكن:",
                    options: [
                        "يكون خطر",
                        "يفرق جداً",
                        "يسبب مشاكل",
                        "يكون مضيعة للوقت"
                    ],
                    correct: 1
                }
            ]
        },
        'session7': {
            questions: [
                {
                    question: "الاتجاه يعني:",
                    options: [
                        "أفكار بس",
                        "مشاعر بس",
                        "أفكار ومشاعر وأفعال",
                        "أفعال بس"
                    ],
                    correct: 2
                },
                {
                    question: "لما حد يقول إنه بيتعالج، اتجاه سلبي شائع هو:",
                    options: [
                        "إعجاب بشجاعته",
                        "التفكير إنه ضعيف ومريحش",
                        "الرغبة في التعلم أكتر",
                        "الدعم والمساعدة"
                    ],
                    correct: 1
                },
                {
                    question: "الذهاب للعلاج بيتطلب:",
                    options: [
                        "ضعف",
                        "شجاعة",
                        "يأس",
                        "أنانية"
                    ],
                    correct: 1
                }
            ]
        },
        'session8': {
            questions: [
                {
                    question: "الاتجاهات السلبية بتجي من:",
                    options: [
                        "البحث العلمي",
                        "كلام سمعناه، أفلام شوفناها، وخوف المجتمع",
                        "التجربة الشخصية",
                        "التدريب الاحترافي"
                    ],
                    correct: 1
                },
                {
                    question: "الاتجاهات ده:",
                    options: [
                        "فطرية ومش بتتغير",
                        "متعلمة مش حقيقة",
                        "دايماً صح",
                        "بيولوجية"
                    ],
                    correct: 1
                },
                {
                    question: "لأن الاتجاهات متعلمة:",
                    options: [
                        "مش بتتغير",
                        "بتتغير",
                        "دايماً صح",
                        "مش مهمة"
                    ],
                    correct: 1
                }
            ]
        },
        'session9': {
            questions: [
                {
                    question: 'بدل ما نقول "ده مجنون"، نقول:',
                    options: [
                        '"ده خطر"',
                        '"ده محتاج مساعدة"',
                        '"ده إنسان محتاج دعم"',
                        '"لازم نبعد عنه"'
                    ],
                    correct: 2
                },
                {
                    question: "بدل الخوف، لازم يكون عندنا:",
                    options: [
                        "هروب",
                        "حكم",
                        "وعي",
                        "شفقة"
                    ],
                    correct: 2
                },
                {
                    question: "إيه اللي بيحدد تصرفاتنا؟",
                    options: [
                        "آراء الناس",
                        "ظروفنا",
                        "نظرتنا",
                        "مزاجنا"
                    ],
                    correct: 2
                }
            ]
        }
    };

    return quizData[sessionId] || null;
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
        'social5': 'تقليل المسافة الاجتماعية'
    };
    return titles[sessionId] || 'السيشن';
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'times-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Modal animations with CSS
function openModalWithAnimation(modal) {
    modal.querySelector('.modal-content').classList.add('modal-animate-in');
}

function closeModalWithAnimation(modal) {
    modal.querySelector('.modal-content').classList.add('modal-animate-out');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.querySelector('.modal-content').classList.remove('modal-animate-out');
    }, 300);
}

// Modal close on outside click
window.addEventListener('click', function(event) {
    if (event.target === quizModal) {
        closeModalWithAnimation(quizModal);
        closeQuiz();
    }
    if (event.target === videoModal) {
        closeModalWithAnimation(videoModal);
        closeVideo();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (quizModal.style.display === 'block') {
            closeQuiz();
        }
        if (videoModal.style.display === 'block') {
            closeVideo();
        }
    }
});

// Add CSS for notifications
const notificationCSS = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-right: 4px solid #4caf50;
        color: #4caf50;
    }
    
    .notification-error {
        border-right: 4px solid #f44336;
        color: #f44336;
    }
    
    .notification-warning {
        border-right: 4px solid #ff9800;
        color: #ff9800;
    }
    
    .notification-info {
        border-right: 4px solid #00bcd4;
        color: #00bcd4;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Add notification styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationCSS;
document.head.appendChild(styleSheet);

// Breathing Exercise Functions
let breathingInterval;
let isBreathing = false;
let breathingCycle = 0;
const totalCycles = 3;

function startBreathingExercise() {
    if (isBreathing) return;
    
    isBreathing = true;
    breathingCycle = 0;
    const btn = document.getElementById('startBreathingBtn');
    const circle = document.getElementById('breathingCircle');
    const text = document.getElementById('breathingText');
    const instruction = document.getElementById('breathingInstruction');
    
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التمرين...';
    instruction.textContent = 'اتبع التنفس مع الدائرة... خد نفس عميق';
    
    runBreathingCycle(circle, text, instruction);
}

function runBreathingCycle(circle, text, instruction) {
    if (breathingCycle >= totalCycles) {
        finishBreathingExercise();
        return;
    }
    
    breathingCycle++;
    
    // Inhale phase (4 seconds)
    circle.className = 'breathing-circle inhale';
    text.textContent = 'شهيق...';
    instruction.textContent = `خد نفس عميق من انفك (الدورة ${breathingCycle} من ${totalCycles})`;
    
    setTimeout(() => {
        // Hold phase (2 seconds)
        circle.className = 'breathing-circle hold';
        text.textContent = 'ثبت...';
        instruction.textContent = 'ابقى كدا شوية';
        
        setTimeout(() => {
            // Exhale phase (4 seconds)
            circle.className = 'breathing-circle exhale';
            text.textContent = 'زفير...';
            instruction.textContent = 'طلع النفس ببطء من انفك';
            
            setTimeout(() => {
                // Small pause before next cycle
                circle.className = 'breathing-circle';
                text.textContent = 'استرخِ';
                instruction.textContent = 'استرح لحظة';
                
                setTimeout(() => {
                    runBreathingCycle(circle, text, instruction);
                }, 1000);
            }, 4000);
        }, 2000);
    }, 4000);
}

function finishBreathingExercise() {
    isBreathing = false;
    const btn = document.getElementById('startBreathingBtn');
    const circle = document.getElementById('breathingCircle');
    const text = document.getElementById('breathingText');
    const instruction = document.getElementById('breathingInstruction');
    
    circle.className = 'breathing-circle';
    text.textContent = 'أحسنت!';
    instruction.textContent = 'تم التمرين بنجاح. استرح لحظة وانتقل للخطوة اللي بعدها';
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-redo"></i> كرر التمرين';
}

// Mood Check Functions
const moodResponses = {
    happy: {
        emoji: '�',
        title: 'مبسوط',
        message: 'جميل انك مبسوط! استغل الطاقة الإيجابية دي وشاركها مع حد بتحبه. اتصل بصاحبك او اكتب 3 حاجات انت ممتن لهم النهارده. الطاقة الإيجابية معدية!',
        quote: '"السعادة تتضاعف لما نشاركها مع الآخرين"'
    },
    active: {
        emoji: '🤩',
        title: 'نشيط',
        message: 'طاقتك عالية؟! استغلها في حاجة انت مؤجلها من زمان! اعمل رياضة... نظم اوضتك.. او اتعلم حاجه جديدة. الطاقة دي هدية استخدمها كويس.',
        quote: '"الطاقة الإيجابية هدية - استخدمها فيما ينفعك"'
    },
    annoyed: {
        emoji: '�',
        title: 'متضايق',
        message: 'متضايق؟! ده طبيعي كلنا بنعدي بكده. اسمح لنفسك ترتاح. نام كويس النهاردة ومتزودش علي نفسك بكره يوم جديد وفرصة جديدة.',
        quote: '"بعد كل ليلة ليل، صبح لازم يجي"'
    },
    anxious: {
        emoji: '�',
        title: 'قلقان',
        message: 'فاهم القلق صعب. جرب تمرين التنفس الي فوق دلوقتي وفكر: اي اسوء حاجة ممكن تحصل؟ هل هي حقيقية ولا مجرد تفكير سلبي؟ اتكلم مع حد بتثق فيه دا هيفيدك جدا.',
        quote: '"القلق مش هيموتك، وهو مش هيستمر للأبد"'
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
    
    if (!response) return;
    
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
    closeModalWithAnimation(modal);
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Advice Cards Toggle Function
function toggleAdvice(adviceId, event) {
    // Stop event from bubbling up
    if (event) {
        event.stopPropagation();
    }
    
    const clickedContent = document.getElementById('advice-' + adviceId);
    if (!clickedContent) return;
    
    const clickedCard = clickedContent.closest('.advice-card');
    if (!clickedCard) return;
    
    const isAlreadyActive = clickedCard.classList.contains('active');
    
    // Close ALL cards first
    document.querySelectorAll('.advice-card').forEach(function(card) {
        card.classList.remove('active');
    });
    
    // If the clicked card wasn't active, open it
    if (!isAlreadyActive) {
        clickedCard.classList.add('active');
    }
}

// Intro Cards Toggle Function
function toggleIntroCard(element) {
    const isAlreadyActive = element.classList.contains('active');
    
    // Close ALL intro cards first
    document.querySelectorAll('.intro-card').forEach(function(card) {
        card.classList.remove('active');
    });
    
    // If the clicked card wasn't active, open it
    if (!isAlreadyActive) {
        element.classList.add('active');
    }
}

// Function to toggle Mental Disorder Cards
function toggleDisorderCard(element) {
    const isAlreadyActive = element.classList.contains('active');
    
    // Close ALL disorder cards first
    document.querySelectorAll('.disorder-card').forEach(function(card) {
        card.classList.remove('active');
    });
    
    // If the clicked card wasn't active, open it
    if (!isAlreadyActive) {
        element.classList.add('active');
        
        // Scroll to card for better visibility
        setTimeout(() => {
            const cardTop = element.getBoundingClientRect().top + window.pageYOffset;
            const offset = 100;
            window.scrollTo({
                top: cardTop - offset,
                behavior: 'smooth'
            });
        }, 300);
    }
}

// Close cards when clicking outside
document.addEventListener('click', function(e) {
    // Handle advice cards
    if (!e.target.closest('.advice-card')) {
        document.querySelectorAll('.advice-card').forEach(function(card) {
            card.classList.remove('active');
        });
    }
    // Handle intro cards
    if (!e.target.closest('.intro-card')) {
        document.querySelectorAll('.intro-card').forEach(function(card) {
            card.classList.remove('active');
        });
    }
    // Handle disorder cards
    if (!e.target.closest('.disorder-card')) {
        document.querySelectorAll('.disorder-card').forEach(function(card) {
            card.classList.remove('active');
        });
    }
});

// Modal close on outside click for mood modal
window.addEventListener('click', function(event) {
    const moodModal = document.getElementById('moodModal');
    
    if (event.target === moodModal) {
        closeMoodModal();
    }
});
