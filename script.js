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
    // Show first message after 3 seconds
    setTimeout(showSupportToast, 3000);
    
    // Then show random messages every minute (60000 ms)
    toastInterval = setInterval(() => {
        showSupportToast();
    }, 60000); // Every 1 minute
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
            <i class="fas fa-check"></i> submit answers
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
        showNotification('please answer all questions', 'warning');
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
        message = 'excellent! you have a great understanding!';
    } else if (percentage >= 60) {
        message = 'good job! you understand the basics well.';
    } else if (percentage >= 40) {
        message = 'not bad! consider reviewing the material again.';
    } else {
        message = 'keep learning! review the sessions and try again.';
    }

    const resultsHtml = `
        <div class="quiz-result">
            <h4>your results</h4>
            <div class="quiz-score">${score}/${totalQuestions}</div>
            <div class="quiz-message">${message}</div>
            <button class="btn btn-primary" onclick="closeQuiz()">
                <i class="fas fa-times"></i> close
            </button>
            <button class="btn btn-secondary" onclick="retakeQuiz()">
                <i class="fas fa-redo"></i> retake quiz
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
    
    // Set video content with local video
    modalContent.innerHTML = `
        <div class="modal-header">
            <h3 class="modal-title">فيديو - ${getSessionTitle(sessionId)}</h3>
            <span class="close-modal" onclick="closeVideo()">&times;</span>
        </div>
        <div class="modal-body">
            <div class="video-container">
                <video controls autoplay style="width: 100%; max-width: 100%; border-radius: 10px;">
                    <source src="hero_khamsat-30996c078e7d2c8ea951fb0f827908119f08ce92c80b0bec2caea193d155fafa.mp4" type="video/mp4">
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
                {
                    question: "إيه هي الصحة النفسية؟",
                    options: [
                        "مجرد إنك تكون كويس وسعيد",
                        "تفهم مشاعرك، تتعامل مع الضغوط، وتعيش حياتك بشكل طبيعي",
                        "ماتحسش بالحزن أو القلق أبداً",
                        "تكون مثالي طول الوقت"
                    ],
                    correct: 1
                },
                {
                    question: "إمتى لازم تطلب المساعدة للصحة النفسية؟",
                    options: [
                        "بس لما تكون متكسر تماماً",
                        "لما الحزن يطول، الشغف يختفي، أو النوم يتخربط",
                        "أبداً، ده ضعف",
                        "بس لما حد يقولك تروح"
                    ],
                    correct: 1
                },
                {
                    question: "طلب المساعدة ده:",
                    options: [
                        "ضعف",
                        "حاجة تتكسف منها",
                        "وعي مش ضعف",
                        "مش ضروري"
                    ],
                    correct: 2
                }
            ]
        },
        'session2': {
            questions: [
                {
                    question: "المرض النفسي ده:",
                    options: [
                        "ضعف",
                        "زي أي مرض تاني",
                        "بس للمجانين",
                        "مش حقيقي"
                    ],
                    correct: 1
                },
                {
                    question: "العلاج النفسي بيساعدك:",
                    options: [
                        "تبقى معتمد على حد",
                        "تفهم نفسك أكتر",
                        "تنسى مشاكلك",
                        "تبقى مثالي"
                    ],
                    correct: 1
                },
                {
                    question: "الدواء النفسي:",
                    options: [
                        "بيسبب إدمان دايماً",
                        "بيكون تحت إشراف طبي",
                        "للناس الضعيفة",
                        "لازم نتجنبه"
                    ],
                    correct: 1
                }
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
        'session1': 'الصحة النفسية مش رفاهية',
        'session2': 'كسر الخرافات',
        'session3': 'الكلمة ممكن تأذي',
        'session4': 'حط نفسك مكانه',
        'session5': 'ليه بنبعد؟',
        'session6': 'قرب مش تبعد',
        'session7': 'أنا شايفه إزاي؟',
        'session8': 'ليه بنفكر كده؟',
        'session9': 'نغير نظرتنا'
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
    instruction.textContent = `خد نفس عميق من خشمك (الدورة ${breathingCycle} من ${totalCycles})`;
    
    setTimeout(() => {
        // Hold phase (2 seconds)
        circle.className = 'breathing-circle hold';
        text.textContent = 'ثبت...';
        instruction.textContent = 'ابقى كدا شوية';
        
        setTimeout(() => {
            // Exhale phase (4 seconds)
            circle.className = 'breathing-circle exhale';
            text.textContent = 'زفير...';
            instruction.textContent = 'طلع النفس ببطء من بؤقك';
            
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
    instruction.textContent = 'تم التمرين بنجاح. كيف تشعر الآن؟';
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-redo"></i> كرر التمرين';
    
    // Show emotion modal after 1 second
    setTimeout(() => {
        showEmotionModal();
    }, 1000);
}

// Emotion and Advice Modal Functions
const emotionAdvice = {
    happy: {
        emoji: '😊',
        title: 'سعيد',
        text: 'رائع! فرحان إنك حس بالسعادة. استمتع باللحظة وحافظ على الطاقة الإيجابية دي.',
        quote: '"السعادة الحقيقية تكمن في الامتنان على ما لديك"'
    },
    sad: {
        emoji: '😢',
        title: 'حزين',
        text: 'مشاعرك مهمة والحزن جزء طبيعي من الحياة. خد وقتك، ابكي لو محتاج، ومتنساش إن ده هيمشي.',
        quote: '"بعد كل ليلة ليل، صبح لازم يجي. أنت أقوى منك تتخيل"'
    },
    anxious: {
        emoji: '😰',
        title: 'قلقان',
        text: 'القلق طبيعي. جرب تكرر التمرين كمان مرة، وافكر في الحاجة الحلوة اللي حصلتلك النهاردة.',
        quote: '"القلق مش هيموتك، وهو مش هيستمر للأبد. خد نفس عميق وأنت كدا كدا كويس"'
    },
    tired: {
        emoji: '😴',
        title: 'متعب',
        text: 'التعب بيحتاج راحة. متضغطش على نفسك، خد قيلولة أو نام بدري النهاردة. جسمك بيستحق.',
        quote: '"الراحة مش كسل، هي استعادة للطاقة عشان تكمل بقوة"'
    },
    stressed: {
        emoji: '😫',
        title: 'مضغوط',
        text: 'الضغط صعب بجد. جرب تكتب اللي مضايقك على ورقة، أو اتكلم مع حد تثق فيه. مش لازم تشيل كل حاجة لوحدك.',
        quote: '"التقسيم بيسهل المهمة. كل خطوة صغيرة بتقربك من الهدف"'
    },
    calm: {
        emoji: '🧘',
        title: 'هادي',
        text: 'الهدوء نعمة! استمتع بالسكينة دي وحاول تحفظها. التمرين نجح في تهديتك.',
        quote: '"السلام الداخلي أغلى من أي شيء تاني في الدنيا"'
    }
};

function showEmotionModal() {
    const modal = document.getElementById('emotionModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    openModalWithAnimation(modal);
}

function closeEmotionModal() {
    const modal = document.getElementById('emotionModal');
    closeModalWithAnimation(modal);
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function selectEmotion(emotion) {
    closeEmotionModal();
    
    setTimeout(() => {
        showAdviceModal(emotion);
    }, 300);
}

function showAdviceModal(emotion) {
    const modal = document.getElementById('adviceModal');
    const title = document.getElementById('adviceTitle');
    const content = document.getElementById('adviceContent');
    const advice = emotionAdvice[emotion];
    
    if (!advice) return;
    
    title.textContent = `نصيحة للحالة: ${advice.title}`;
    content.innerHTML = `
        <span class="advice-emoji">${advice.emoji}</span>
        <p class="advice-text">${advice.text}</p>
        <div class="advice-quote">${advice.quote}</div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    openModalWithAnimation(modal);
}

function closeAdviceModal() {
    const modal = document.getElementById('adviceModal');
    closeModalWithAnimation(modal);
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Modal close on outside click for new modals
window.addEventListener('click', function(event) {
    const emotionModal = document.getElementById('emotionModal');
    const adviceModal = document.getElementById('adviceModal');
    
    if (event.target === emotionModal) {
        closeEmotionModal();
    }
    if (event.target === adviceModal) {
        closeAdviceModal();
    }
});
