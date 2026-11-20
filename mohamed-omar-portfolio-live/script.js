document.documentElement.classList.add('js');

const messages = {
  en: {
    navHome:'Home',navProjects:'Projects',navTraining:'Training',navAbout:'About',navCertificates:'Certificates',navContact:'Contact',
    heroIntro:'Hi, I’m',heroTitle:'AI & Full-Stack Developer',heroDescription:'I’m a third-year Computer Science and Artificial Intelligence student. I build full-stack web projects and explore practical AI applications.',viewProjects:'View projects',getInTouch:'Get in touch',profileCaption:'CS & AI student · Year 3',terminalTitle:'"AI & Full-Stack Developer"',terminalEducation:'"Computer Science & AI"',terminalFocus:'"Web projects · Practical AI"',terminalFoot:'Coursework & personal projects',
    projectsLabel:'PROJECTS',projectsHeading:'A closer look at my projects.',projectsAside:'Five projects across restaurant sites, online stores, a café website, and a document API.',typeAI:'AI · BACKEND',descSmartdoc:'A FastAPI backend for adding, uploading, searching, and managing text documents. Gemini can return a summary, key points, category, and suggested priority; a limited read-only agent can search and retrieve documents.',smartPointOne:'Document CRUD and UTF-8 text upload',smartPointTwo:'Gemini analysis and read-only document agent',codeLink:'Source code ↗',typeRestaurant:'WEB · RESTAURANT',descExtra:'A restaurant website with a browsable menu and clear online-order paths.',extraPointOne:'Browse food by category and search the menu',extraPointTwo:'Best sellers, food gallery, and order links',liveLink:'Live website ↗',privateRepoLink:'GitHub repo (Private) ↗',typeStore:'WEB · ONLINE STORE',descMavrek:'An Arabic-first winter-clothing storefront for men and women, with product browsing and an order flow.',mavrekPointOne:'Shop hoodies, jackets, and trousers',mavrekPointTwo:'Cart, cash-on-delivery steps, and order tracking',descFruit:'A fruit-shop showcase page presenting fresh produce and related sections.',fruitPointOne:'Orange, grape, and guava product sections',fruitPointTwo:'Services, testimonial, and contact form layout',typeCafe:'WEB · CAFÉ',descRevo:'An Arabic-English café website for introducing the café and its drinks.',revoPointOne:'Home, menu, products, about, and contact pages',revoPointTwo:'Highlights Turkish coffee, latte, and mango smoothie',
    trainingLabel:'TRAINING',trainingHeading:'Topics covered in my ITI training.',trainingAside:'Course details are taken from my 120-hour ITI certificate.',trainingProvider:'Information Technology Institute',trainingName:'AI Agents Development Using Python',trainingHours:'hours',trainingWebTag:'WEB FOUNDATIONS',trainingWebTitle:'Web foundations',trainingApiTag:'PYTHON & APIS',trainingApiTitle:'Python and API development',trainingAiTag:'DATA & AI',trainingAiTitle:'Data and AI topics',courseHtml:'HTML5 & CSS3',courseJs:'JavaScript Essentials',coursePython:'Python Programming for AI Applications',courseFastapi:'Python framework with FastAPI',courseApi:'AI-Assisted Development & API Integration',courseSql:'SQL & Relational Database Fundamentals',courseLlm:'AI & LLM Fundamentals',courseAgents:'AI Agents Development',courseFreelancing:'Freelancing',
    aboutLabel:'ABOUT ME',aboutHeading:'Computer Science & AI, applied in projects.',aboutTitle:'Third-year Computer Science & AI student.',aboutBody:'I’m Mohamed Omar, a third-year student at El Saleheya El Gadida University, Faculty of Computers and Information, specializing in Computer Science and Artificial Intelligence. Alongside coursework, I’ve built restaurant and café sites, online-store interfaces, and a FastAPI document project.',educationTitle:'El Saleheya El Gadida University — Faculty of Computers and Information',educationSub:'Computer Science & Artificial Intelligence · Third year',stackTitle:'Topics from training and projects',stackSubtitle:'Technologies listed in my coursework and projects',stackNote:'Coursework and project topics',
    certLabel:'CERTIFICATES',certHeading:'My certificates.',certAside:'Browse the certificates horizontally. Select one to see it at full size.',certITI:'AI Agents Development Using Python',certGoogle:'AI for App Building',certGenAI:'Generative AI Tools CSW',certSystems:'System Analysis Using AI CSW',certFrontend:'Front End — El-khaima El-ramadania',viewCert:'View certificate ↗',
    contactLabel:'LET’S CONNECT',contactOverline:'OPEN A CONVERSATION',contactChannels:'FIND ME ONLINE',facebookProfile:'Visit my profile',contactHeading:'Have a project idea or opportunity?',contactBody:'Reach me about a project, internship, or collaboration through one of these channels.',whatsapp:'Message me on WhatsApp',photoCaption:'Mohamed Omar — AI & Full-Stack Developer',footer:'Mohamed Omar · AI & Full-Stack Developer',prevCertificates:'Previous certificates',nextCertificates:'Next certificates'
  },
  ar: {
    navHome:'الرئيسية',navProjects:'المشاريع',navTraining:'التدريب',navAbout:'عني',navCertificates:'الشهادات',navContact:'تواصل',
    heroIntro:'أهلًا، أنا',heroTitle:'مطوّر ذكاء اصطناعي وFull-Stack',heroDescription:'أنا طالب في الفرقة الثالثة بكلية الحاسبات والمعلومات، تخصص علوم الحاسب والذكاء الاصطناعي. أطور مشاريع ويب متكاملة وأستكشف تطبيقات الذكاء الاصطناعي العملية.',viewProjects:'شاهد مشاريعي',getInTouch:'تواصل معي',profileCaption:'طالب علوم حاسب وذكاء اصطناعي · الفرقة الثالثة',terminalTitle:'"مطوّر ذكاء اصطناعي وFull-Stack"',terminalEducation:'"علوم الحاسب والذكاء الاصطناعي"',terminalFocus:'"مشاريع ويب · تطبيقات AI"',terminalFoot:'الدراسة والمشاريع الشخصية',
    projectsLabel:'المشاريع',projectsHeading:'تفاصيل عن مشاريعي.',projectsAside:'خمسة مشاريع بين مواقع المطاعم والمتاجر والمقاهي ومشروع لمعالجة المستندات.',typeAI:'ذكاء اصطناعي · BACKEND',descSmartdoc:'واجهة خلفية بـFastAPI لإضافة المستندات النصية ورفعها والبحث فيها وإدارتها. يحلل Gemini محتوى المستند ويعيد ملخصًا ونقاطًا رئيسية وتصنيفًا وأولوية مقترحة، مع وكيل محدود للقراءة والبحث فقط.',smartPointOne:'إدارة المستندات ورفع ملفات نصية بترميز UTF-8',smartPointTwo:'تحليل Gemini ووكيل مستندات للقراءة فقط',codeLink:'الكود المصدري ↗',typeRestaurant:'ويب · مطعم',descExtra:'موقع لمطعم يتيح تصفح المنيو والانتقال بسهولة إلى الطلب أونلاين.',extraPointOne:'تصفح الأكلات حسب القسم والبحث في المنيو',extraPointTwo:'الأكثر طلبًا ومعرض صور وروابط للطلب',liveLink:'الموقع المباشر ↗',privateRepoLink:'مستودع GitHub (خاص) ↗',typeStore:'ويب · متجر إلكتروني',descMavrek:'متجر ملابس شتوية للرجال والسيدات، يتيح تصفح المنتجات واستكمال خطوات الطلب.',mavrekPointOne:'أقسام للهوديز والجاكيتات والبناطيل',mavrekPointTwo:'سلة تسوق وخطوات للدفع عند الاستلام وتتبع الطلب',descFruit:'صفحة عرض لمتجر فاكهة تستعرض المنتجات والأقسام المرتبطة بها.',fruitPointOne:'أقسام للبرتقال والعنب والجوافة',fruitPointTwo:'أقسام للخدمات وآراء العملاء ونموذج تواصل',typeCafe:'ويب · مقهى',descRevo:'موقع عربي وإنجليزي للتعريف بكافيه ريڤو ومشروباته.',revoPointOne:'صفحات الرئيسية والمنيو والمنتجات وعن الكافيه والتواصل',revoPointTwo:'يعرض مشروبات مثل القهوة التركي واللاتيه وسموزي المانجو',
    trainingLabel:'التدريب',trainingHeading:'موضوعات من تدريبي في ITI.',trainingAside:'تفاصيل الدورات مأخوذة من شهادة ITI بإجمالي 120 ساعة.',trainingProvider:'معهد تكنولوجيا المعلومات',trainingName:'تطوير وكلاء الذكاء الاصطناعي باستخدام Python',trainingHours:'ساعة',trainingWebTag:'أساسيات الويب',trainingWebTitle:'أساسيات الويب',trainingApiTag:'بايثون وواجهات API',trainingApiTitle:'Python وتطوير واجهات API',trainingAiTag:'البيانات والذكاء الاصطناعي',trainingAiTitle:'موضوعات البيانات والذكاء الاصطناعي',courseHtml:'HTML5 وCSS3',courseJs:'أساسيات JavaScript',coursePython:'برمجة Python لتطبيقات الذكاء الاصطناعي',courseFastapi:'إطار عمل Python مع FastAPI',courseApi:'التطوير بمساعدة الذكاء الاصطناعي ودمج واجهات API',courseSql:'أساسيات SQL وقواعد البيانات العلائقية',courseLlm:'أساسيات الذكاء الاصطناعي وLLM',courseAgents:'تطوير وكلاء الذكاء الاصطناعي',courseFreelancing:'العمل الحر',
    aboutLabel:'نبذة عني',aboutHeading:'علوم الحاسب والذكاء الاصطناعي في مشاريعي.',aboutTitle:'طالب في الفرقة الثالثة بحاسبات ومعلومات.',aboutBody:'اسمي محمد عمر، طالب في الفرقة الثالثة بجامعة الصالحية الجديدة، كلية الحاسبات والمعلومات، تخصص علوم الحاسب والذكاء الاصطناعي. بجانب الدراسة، عملت على مواقع لمطاعم ومقاهٍ ومتاجر إلكترونية، ومشروع مستندات باستخدام FastAPI.',educationTitle:'جامعة الصالحية الجديدة — كلية الحاسبات والمعلومات',educationSub:'علوم الحاسب والذكاء الاصطناعي · الفرقة الثالثة',stackTitle:'موضوعات من التدريب والمشاريع',stackSubtitle:'تقنيات ظهرت في دراستي ومشاريعي',stackNote:'موضوعات استخدمتها في الدراسة والمشاريع.',
    certLabel:'الشهادات',certHeading:'شهاداتي.',certAside:'تصفح الشهادات أفقيًا، واضغط على أي شهادة لعرضها كاملة.',certITI:'تطوير وكلاء الذكاء الاصطناعي باستخدام Python',certGoogle:'الذكاء الاصطناعي لبناء التطبيقات',certGenAI:'أدوات الذكاء الاصطناعي التوليدي CSW',certSystems:'تحليل النظم باستخدام الذكاء الاصطناعي CSW',certFrontend:'Front End — الخيمة الرمضانية',viewCert:'عرض الشهادة ↗',
    contactLabel:'لنتواصل',contactOverline:'ابدأ محادثة',contactChannels:'تواصل معي عبر',facebookProfile:'زيارة الملف الشخصي',contactHeading:'عندك فكرة مشروع أو فرصة؟',contactBody:'للتواصل بخصوص مشروع أو تدريب أو تعاون، ابعتلي على إحدى القنوات التالية.',whatsapp:'راسلني على واتساب',photoCaption:'محمد عمر — مطوّر ذكاء اصطناعي وFull-Stack',footer:'محمد عمر · مطوّر ذكاء اصطناعي وFull-Stack',prevCertificates:'الشهادات السابقة',nextCertificates:'الشهادات التالية'
  }
};

Object.assign(messages.en,{
  projectsAside:'Three live websites across restaurant ordering, fruit e-commerce, and coffee shop design.',
  typeRestaurant:'Restaurant Website / Food Ordering',
  typeStore:'E-commerce / Fruit Store',
  typeCafe:'Coffee Shop / Business Website',
  liveLink:'Live Preview ↗',
  aboutBody:'I’m Mohamed Omar, a third-year student at El Saleheya El Gadida University, Faculty of Computers and Information, specializing in Computer Science and Artificial Intelligence. Alongside coursework, I’ve built restaurant ordering, fruit e-commerce, and coffee shop websites.',
  contactHeading:'Have a project idea or opportunity?',
  contactBody:'Reach me about a project, internship, or collaboration on Facebook or Instagram.'
});
Object.assign(messages.ar,{
  projectsAside:'ثلاثة مواقع مباشرة لمطعم ومتجر فاكهة ومقهى.',
  typeRestaurant:'مطعم / طلب الطعام',
  typeStore:'متجر إلكتروني / فاكهة',
  typeCafe:'مقهى / موقع أعمال',
  liveLink:'معاينة مباشرة ↗',
  aboutBody:'اسمي محمد عمر، طالب في الفرقة الثالثة بجامعة الصالحية الجديدة، كلية الحاسبات والمعلومات، تخصص علوم الحاسب والذكاء الاصطناعي. بجانب الدراسة، أنشأت مواقع لطلب الطعام ومتجر فاكهة ومقهى.',
  contactHeading:'عندك فكرة مشروع أو فرصة؟',
  contactBody:'تواصل معي بخصوص مشروع أو تدريب أو تعاون عبر فيسبوك أو إنستغرام.'
});

const languageButton=document.getElementById('languageSwitch');
const menuButton=document.getElementById('menuToggle');
const nav=document.getElementById('mainNav');
const certificateTrack=document.getElementById('certificateTrack');
const certificateCards=Array.from(certificateTrack.querySelectorAll('.certificate-card'));
const certificatePrev=document.getElementById('certificatePrev');
const certificateNext=document.getElementById('certificateNext');
const certificateCount=document.getElementById('certificateCount');
const certificateProgress=document.getElementById('certificateProgress');
let certificateIndex=0;
let language=localStorage.getItem('mohamed-portfolio-language')==='ar'?'ar':'en';

function visibleCertificateCount(){return window.innerWidth<=650?1:window.innerWidth<=880?2:3;}
function updateCertificateCarousel(){
  const visible=visibleCertificateCount();
  const maximum=Math.max(0,certificateCards.length-visible);
  certificateIndex=Math.min(certificateIndex,maximum);
  const first=certificateCards[0];
  const step=first.getBoundingClientRect().width+parseFloat(getComputedStyle(certificateTrack).columnGap||'0');
  certificateTrack.style.transform=`translate3d(${-certificateIndex*step}px,0,0)`;
  certificateCards.forEach((card,index)=>{
    const shown=index>=certificateIndex&&index<certificateIndex+visible;
    card.setAttribute('aria-hidden',String(!shown));
    card.tabIndex=shown?0:-1;
  });
  const end=Math.min(certificateIndex+visible,certificateCards.length);
  const format=(value)=>String(value).padStart(2,'0');
  certificateCount.textContent=language==='ar'
    ?`${format(certificateIndex+1)} — ${format(end)} / ${format(certificateCards.length)}`
    :`${format(certificateIndex+1)} — ${format(end)} / ${format(certificateCards.length)}`;
  certificateProgress.style.width=`${Math.max(15,(end/certificateCards.length)*100)}%`;
  certificatePrev.disabled=certificateIndex===0;
  certificateNext.disabled=certificateIndex===maximum;
  certificatePrev.textContent=document.documentElement.dir==='rtl'?'→':'←';
  certificateNext.textContent=document.documentElement.dir==='rtl'?'←':'→';
  certificatePrev.setAttribute('aria-label',messages[language].prevCertificates);
  certificateNext.setAttribute('aria-label',messages[language].nextCertificates);
}

function setLanguage(next){
  language=next;
  document.documentElement.lang=next;
  document.documentElement.dir=next==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-i18n]').forEach((element)=>{
    const value=messages[next][element.dataset.i18n];
    if(value!==undefined) element.textContent=value;
  });
  languageButton.textContent=next==='en'?'عربي':'English';
  languageButton.setAttribute('aria-label',next==='en'?'Switch to Arabic':'Switch to English');
  document.title=next==='en'?'Mohamed Omar — AI & Full-Stack Developer':'محمد عمر — مطوّر ذكاء اصطناعي وFull-Stack';
  document.querySelector('meta[name="description"]').content=next==='en'
    ?'Mohamed Omar — third-year Computer Science and Artificial Intelligence student building full-stack web projects and exploring practical AI applications.'
    :'محمد عمر — طالب في الفرقة الثالثة بكلية الحاسبات والمعلومات، تخصص علوم الحاسب والذكاء الاصطناعي.';
  document.querySelectorAll('.certificate-card').forEach((card)=>{
    const title=card.dataset[`title${next==='en'?'En':'Ar'}`];
    card.setAttribute('aria-label',`${next==='en'?'View certificate':'عرض الشهادة'}: ${title}`);
    card.querySelector('img').alt=title;
  });
  localStorage.setItem('mohamed-portfolio-language',next);
  updateCertificateCarousel();
}
languageButton.addEventListener('click',()=>setLanguage(language==='en'?'ar':'en'));
setLanguage(language);
certificatePrev.addEventListener('click',()=>{certificateIndex=Math.max(0,certificateIndex-1);updateCertificateCarousel();});
certificateNext.addEventListener('click',()=>{certificateIndex=Math.min(certificateCards.length-visibleCertificateCount(),certificateIndex+1);updateCertificateCarousel();});
window.addEventListener('resize',updateCertificateCarousel);

menuButton.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');
});
nav.querySelectorAll('a').forEach((link)=>link.addEventListener('click',()=>{
  nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');
}));

if('IntersectionObserver' in window){
  const observer=new IntersectionObserver((entries,current)=>entries.forEach((entry)=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');current.unobserve(entry.target);}
  }),{threshold:.12,rootMargin:'0px 0px -25px 0px'});
  document.querySelectorAll('.reveal').forEach((element)=>observer.observe(element));
}else document.querySelectorAll('.reveal').forEach((element)=>element.classList.add('visible'));

const modal=document.getElementById('certificateModal');
const modalImage=document.getElementById('modalImage');
const modalTitle=document.getElementById('modalTitle');
const closeButton=modal.querySelector('.modal-close');
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';modalImage.src='';}
document.querySelectorAll('.certificate-card').forEach((card)=>card.addEventListener('click',()=>{
  modalImage.src=card.dataset.image;
  modalImage.alt=card.dataset[`title${language==='en'?'En':'Ar'}`];
  modalTitle.textContent=card.dataset[`title${language==='en'?'En':'Ar'}`];
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';closeButton.focus();
}));
closeButton.addEventListener('click',closeModal);
modal.addEventListener('click',(event)=>{if(event.target===modal)closeModal();});
document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&modal.classList.contains('open'))closeModal();});
