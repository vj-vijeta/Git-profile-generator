// Global variables
let generatedMarkdown = '';
let selectedTemplate = 'modern';
let customBadges = [];
let customTech = [];
let konamiSequence = [];
let currentPreviewMode = 'markdown';

// Comprehensive tech stack with proper badges (fixed missing logos)
const techStacks = {
    frontend: [
        { id: 'html5', name: 'HTML5', badge: '![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)' },
        { id: 'css3', name: 'CSS3', badge: '![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)' },
        { id: 'javascript', name: 'JavaScript', badge: '![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)' },
        { id: 'typescript', name: 'TypeScript', badge: '![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)' },
        { id: 'react', name: 'React', badge: '![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)' },
        { id: 'vue', name: 'Vue.js', badge: '![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)' },
        { id: 'angular', name: 'Angular', badge: '![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)' },
        { id: 'svelte', name: 'Svelte', badge: '![Svelte](https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white)' },
        { id: 'nextjs', name: 'Next.js', badge: '![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)' },
        { id: 'nuxtjs', name: 'Nuxt.js', badge: '![Nuxtjs](https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82)' },
        { id: 'gatsby', name: 'Gatsby', badge: '![Gatsby](https://img.shields.io/badge/Gatsby-%23663399.svg?style=for-the-badge&logo=gatsby&logoColor=white)' },
        { id: 'sass', name: 'Sass', badge: '![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)' },
        { id: 'tailwind', name: 'Tailwind CSS', badge: '![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)' },
        { id: 'bootstrap', name: 'Bootstrap', badge: '![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)' },
        { id: 'webpack', name: 'Webpack', badge: '![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)' },
        { id: 'vite', name: 'Vite', badge: '![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)' },
        { id: 'redux', name: 'Redux', badge: '![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)' },
        { id: 'jquery', name: 'jQuery', badge: '![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)' },
        { id: 'threejs', name: 'Three.js', badge: '![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)' },
        { id: 'chartjs', name: 'Chart.js', badge: '![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)' }
    ],
    backend: [
        { id: 'nodejs', name: 'Node.js', badge: '![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)' },
        { id: 'python', name: 'Python', badge: '![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)' },
        { id: 'java', name: 'Java', badge: '![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)' },
        { id: 'csharp', name: 'C#', badge: '![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white)' },
        { id: 'php', name: 'PHP', badge: '![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)' },
        { id: 'ruby', name: 'Ruby', badge: '![Ruby](https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white)' },
        { id: 'go', name: 'Go', badge: '![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)' },
        { id: 'rust', name: 'Rust', badge: '![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)' },
        { id: 'cpp', name: 'C++', badge: '![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white)' },
        { id: 'c', name: 'C', badge: '![C](https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white)' },
        { id: 'express', name: 'Express.js', badge: '![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)' },
        { id: 'fastapi', name: 'FastAPI', badge: '![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)' },
        { id: 'django', name: 'Django', badge: '![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)' },
        { id: 'flask', name: 'Flask', badge: '![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)' },
        { id: 'spring', name: 'Spring', badge: '![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)' },
        { id: 'laravel', name: 'Laravel', badge: '![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)' },
        { id: 'rails', name: 'Ruby on Rails', badge: '![Rails](https://img.shields.io/badge/rails-%23CC0000.svg?style=for-the-badge&logo=ruby-on-rails&logoColor=white)' },
        { id: 'nestjs', name: 'NestJS', badge: '![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)' },
        { id: 'graphql', name: 'GraphQL', badge: '![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)' },
        { id: 'apollo', name: 'Apollo GraphQL', badge: '![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)' }
    ],
    mobile: [
        { id: 'react-native', name: 'React Native', badge: '![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)' },
        { id: 'flutter', name: 'Flutter', badge: '![Flutter](https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white)' },
        { id: 'ionic', name: 'Ionic', badge: '![Ionic](https://img.shields.io/badge/Ionic-%233880FF.svg?style=for-the-badge&logo=Ionic&logoColor=white)' },
        { id: 'xamarin', name: 'Xamarin', badge: '![Xamarin](https://img.shields.io/badge/Xamarin-3199DC?style=for-the-badge&logo=xamarin&logoColor=white)' },
        { id: 'kotlin', name: 'Kotlin', badge: '![Kotlin](https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white)' },
        { id: 'swift', name: 'Swift', badge: '![Swift](https://img.shields.io/badge/swift-F54A2A?style=for-the-badge&logo=swift&logoColor=white)' },
        { id: 'dart', name: 'Dart', badge: '![Dart](https://img.shields.io/badge/dart-%230175C2.svg?style=for-the-badge&logo=dart&logoColor=white)' },
        { id: 'cordova', name: 'Apache Cordova', badge: '![Apache Cordova](https://img.shields.io/badge/-Apache%20Cordova-E8E8E8?style=for-the-badge&logo=apache-cordova&logoColor=black)' },
        { id: 'expo', name: 'Expo', badge: '![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)' }
    ],
    database: [
        { id: 'mysql', name: 'MySQL', badge: '![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)' },
        { id: 'postgresql', name: 'PostgreSQL', badge: '![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)' },
        { id: 'mongodb', name: 'MongoDB', badge: '![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)' },
        { id: 'redis', name: 'Redis', badge: '![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)' },
        { id: 'sqlite', name: 'SQLite', badge: '![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)' },
        { id: 'cassandra', name: 'Cassandra', badge: '![ApacheCassandra](https://img.shields.io/badge/cassandra-%231287B1.svg?style=for-the-badge&logo=apache-cassandra&logoColor=white)' },
        { id: 'elasticsearch', name: 'Elasticsearch', badge: '![ElasticSearch](https://img.shields.io/badge/-ElasticSearch-005571?style=for-the-badge&logo=elasticsearch)' },
        { id: 'firebase', name: 'Firebase', badge: '![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)' },
        { id: 'supabase', name: 'Supabase', badge: '![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)' },
        { id: 'mariadb', name: 'MariaDB', badge: '![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)' },
        { id: 'oracle', name: 'Oracle', badge: '![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white)' },
        { id: 'influxdb', name: 'InfluxDB', badge: '![InfluxDB](https://img.shields.io/badge/InfluxDB-22ADF6?style=for-the-badge&logo=InfluxDB&logoColor=white)' }
    ],
    cloud: [
        { id: 'aws', name: 'AWS', badge: '![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)' },
        { id: 'gcp', name: 'Google Cloud', badge: '![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)' },
        { id: 'azure', name: 'Azure', badge: '![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)' },
        { id: 'docker', name: 'Docker', badge: '![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)' },
        { id: 'kubernetes', name: 'Kubernetes', badge: '![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)' },
        { id: 'terraform', name: 'Terraform', badge: '![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)' },
        { id: 'jenkins', name: 'Jenkins', badge: '![Jenkins](https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white)' },
        { id: 'github-actions', name: 'GitHub Actions', badge: '![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)' },
        { id: 'netlify', name: 'Netlify', badge: '![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)' },
        { id: 'vercel', name: 'Vercel', badge: '![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)' },
        { id: 'heroku', name: 'Heroku', badge: '![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)' },
        { id: 'digitalocean', name: 'DigitalOcean', badge: '![DigitalOcean](https://img.shields.io/badge/DigitalOcean-%230167ff.svg?style=for-the-badge&logo=digitalOcean&logoColor=white)' },
        { id: 'cloudflare', name: 'Cloudflare', badge: '![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)' },
        { id: 'ansible', name: 'Ansible', badge: '![Ansible](https://img.shields.io/badge/ansible-%231A1918.svg?style=for-the-badge&logo=ansible&logoColor=white)' }
    ],
    tools: [
        { id: 'git', name: 'Git', badge: '![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)' },
        { id: 'github', name: 'GitHub', badge: '![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)' },
        { id: 'vscode', name: 'VS Code', badge: '![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d4.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)' },
        { id: 'postman', name: 'Postman', badge: '![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)' },
        { id: 'figma', name: 'Figma', badge: '![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)' },
        { id: 'adobe-xd', name: 'Adobe XD', badge: '![Adobe XD](https://img.shields.io/badge/Adobe%20XD-470137?style=for-the-badge&logo=Adobe%20XD&logoColor=#FF61F6)' },
        { id: 'jira', name: 'Jira', badge: '![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)' },
        { id: 'notion', name: 'Notion', badge: '![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)' },
        { id: 'slack', name: 'Slack', badge: '![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)' },
        { id: 'trello', name: 'Trello', badge: '![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)' },
        { id: 'vim', name: 'Vim', badge: '![Vim](https://img.shields.io/badge/VIM-%2311AB00.svg?style=for-the-badge&logo=vim&logoColor=white)' },
        { id: 'linux', name: 'Linux', badge: '![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)' },
        { id: 'windows', name: 'Windows', badge: '![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)' },
        { id: 'macos', name: 'macOS', badge: '![macOS](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=macos&logoColor=F0F0F0)' },
        { id: 'gitlab', name: 'GitLab', badge: '![GitLab](https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white)' },
        { id: 'bitbucket', name: 'Bitbucket', badge: '![Bitbucket](https://img.shields.io/badge/bitbucket-%230047B3.svg?style=for-the-badge&logo=bitbucket&logoColor=white)' }
    ],
    ai: [
        { id: 'tensorflow', name: 'TensorFlow', badge: '![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)' },
        { id: 'pytorch', name: 'PyTorch', badge: '![PyTorch](https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white)' },
        { id: 'keras', name: 'Keras', badge: '![Keras](https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white)' },
        { id: 'scikit-learn', name: 'Scikit Learn', badge: '![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)' },
        { id: 'pandas', name: 'Pandas', badge: '![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white)' },
        { id: 'numpy', name: 'NumPy', badge: '![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)' },
        { id: 'jupyter', name: 'Jupyter', badge: '![Jupyter Notebook](https://img.shields.io/badge/jupyter-%23FA0F00.svg?style=for-the-badge&logo=jupyter&logoColor=white)' },
        { id: 'opencv', name: 'OpenCV', badge: '![OpenCV](https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&logo=opencv&logoColor=white)' },
        { id: 'matplotlib', name: 'Matplotlib', badge: '![Matplotlib](https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black)' },
        { id: 'plotly', name: 'Plotly', badge: '![Plotly](https://img.shields.io/badge/Plotly-%233F4F75.svg?style=for-the-badge&logo=plotly&logoColor=white)' },
        { id: 'huggingface', name: 'Hugging Face', badge: '![HuggingFace](https://img.shields.io/badge/-HuggingFace-FDEE21?style=for-the-badge&logo=HuggingFace&logoColor=black)' },
        { id: 'anaconda', name: 'Anaconda', badge: '![Anaconda](https://img.shields.io/badge/Anaconda-%2344A833.svg?style=for-the-badge&logo=anaconda&logoColor=white)' }
    ],
    game: [
        { id: 'unity', name: 'Unity', badge: '![Unity](https://img.shields.io/badge/unity-%23000000.svg?style=for-the-badge&logo=unity&logoColor=white)' },
        { id: 'unreal', name: 'Unreal Engine', badge: '![Unreal Engine](https://img.shields.io/badge/unrealengine-%23313131.svg?style=for-the-badge&logo=unrealengine&logoColor=white)' },
        { id: 'godot', name: 'Godot', badge: '![Godot Engine](https://img.shields.io/badge/GODOT-%23FFFFFF.svg?style=for-the-badge&logo=godot-engine)' },
        { id: 'blender', name: 'Blender', badge: '![Blender](https://img.shields.io/badge/blender-%23F5792A.svg?style=for-the-badge&logo=blender&logoColor=white)' },
        { id: 'gamemaker', name: 'GameMaker', badge: '![GameMaker Studio 2](https://img.shields.io/badge/GameMaker%20Studio%202-%23000000.svg?style=for-the-badge&logo=gamemaker&logoColor=white)' }
    ],
    security: [
        { id: 'jest', name: 'Jest', badge: '![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)' },
        { id: 'cypress', name: 'Cypress', badge: '![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)' },
        { id: 'selenium', name: 'Selenium', badge: '![Selenium](https://img.shields.io/badge/-selenium-%43B02A?style=for-the-badge&logo=selenium&logoColor=white)' },
        { id: 'sonarqube', name: 'SonarQube', badge: '![SonarQube](https://img.shields.io/badge/SonarQube-black?style=for-the-badge&logo=sonarqube&logoColor=4E9BCD)' },
        { id: 'mocha', name: 'Mocha', badge: '![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)' },
        { id: 'testing-library', name: 'Testing Library', badge: '![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)' }
    ]
};

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    body.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing GitHub Profile Generator...');
    
    loadTheme();
    initializeApp();
    
    // Test generation after a short delay
    setTimeout(testGeneration, 1000);
});

function initializeApp() {
    initializeParticles();
    initializeAOS();
    initializeTechStacks();
    setupEventListeners();
    setupFormSubmission();
    createFloatingIcons();
    updateBadgePreview();
    updateCustomTechPreview();
    setupEasterEggs();
}

function initializeParticles() {
    // Check if particles.js is loaded
    if (typeof particlesJS === 'undefined') {
        console.warn('Particles.js not loaded, skipping particle effects');
        return;
    }

    try {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#667eea" },
                shape: {
                    type: "circle",
                    stroke: { width: 0, color: "#000000" },
                    polygon: { nb_sides: 5 }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#667eea",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 400, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    } catch (error) {
        console.warn('Particles.js initialization failed:', error);
    }
}

function initializeAOS() {
    // Check if AOS is loaded
    if (typeof AOS === 'undefined') {
        console.warn('AOS not loaded, skipping scroll animations');
        return;
    }

    try {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    } catch (error) {
        console.warn('AOS initialization failed:', error);
    }
}

function createFloatingIcons() {
    const icons = ['💻', '🚀', '⚡', '🔥', '✨', '🎯', '🛠️', '📱', '🌟', '💡'];
    const container = document.getElementById('floatingIcons');
    
    setInterval(() => {
        const icon = document.createElement('div');
        icon.className = 'floating-icon';
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        icon.style.left = Math.random() * 100 + '%';
        icon.style.animationDuration = (Math.random() * 3 + 7) + 's';
        icon.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(icon);
        
        setTimeout(() => {
            if (icon.parentNode) {
                icon.parentNode.removeChild(icon);
            }
        }, 10000);
    }, 3000);
}

function initializeTechStacks() {
    Object.keys(techStacks).forEach(category => {
        const container = document.getElementById(`${category}-tech`);
        if (container) {
            techStacks[category].forEach(tech => {
                const techItem = document.createElement('div');
                techItem.className = 'tech-item';
                techItem.setAttribute('data-name', tech.name.toLowerCase());
                techItem.innerHTML = `
                    <input type="checkbox" id="${tech.id}" name="tech" value="${tech.id}">
                    <label for="${tech.id}">${tech.name}</label>
                `;
                
                techItem.addEventListener('click', function(e) {
                    if (e.target.type !== 'checkbox') {
                        const checkbox = techItem.querySelector('input[type="checkbox"]');
                        checkbox.checked = !checkbox.checked;
                    }
                    techItem.classList.toggle('selected', techItem.querySelector('input').checked);
                    
                    if (techItem.classList.contains('selected')) {
                        techItem.style.animation = 'none';
                        setTimeout(() => {
                            techItem.style.animation = 'fadeInUp 0.5s ease';
                        }, 10);
                    }
                });
                
                container.appendChild(techItem);
            });
        }
    });
}

// Tech search functionality
function filterTech() {
    const searchTerm = document.getElementById('techSearch').value.toLowerCase();
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        const techName = item.getAttribute('data-name') || '';
        if (techName.includes(searchTerm)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

function setupEventListeners() {
    // Template selection with enhanced animations
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.template-card').forEach(c => {
                c.classList.remove('selected');
                c.style.animation = '';
            });
            this.classList.add('selected');
            this.style.animation = 'bounce 0.6s ease';
            selectedTemplate = this.dataset.template;
            
            showTemplatePreview(selectedTemplate);
        });
    });

    // Badge builder with real-time updates
    ['badgeText', 'badgeColor', 'badgeStyle'].forEach(id => {
        document.getElementById(id).addEventListener('input', updateBadgePreview);
    });

    // Custom tech builder
    ['customTechName', 'customTechColor', 'customTechLogo'].forEach(id => {
        document.getElementById(id).addEventListener('input', updateCustomTechPreview);
    });

    // Enhanced form interactions
    document.querySelectorAll('input, textarea, select').forEach(element => {
        element.addEventListener('focus', function() {
            this.parentNode.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('blur', function() {
            this.parentNode.style.transform = 'translateY(0)';
        });
    });
}

function setupFormSubmission() {
    document.getElementById('profileForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const username = formData.get('username');
        
        if (!username) {
            showMessage('🚨 Please enter a GitHub username to continue!', 'error');
            return;
        }

        const generateBtn = document.getElementById('generateBtn');
        const btnText = document.getElementById('btnText');
        const btnSpinner = document.getElementById('btnSpinner');
        
        generateBtn.disabled = true;
        generateBtn.classList.remove('glow');
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline-block';

        try {
            // Try to fetch GitHub data but don't let it block generation
            setTimeout(async () => {
                try {
                    await fetchGitHubData(username);
                } catch (error) {
                    console.warn('GitHub API unavailable, continuing without stats');
                }
            }, 100);
            
            // Generate markdown immediately
            generateMarkdown(formData);
            showMessage('🎉 Epic profile generated! Your GitHub is about to look amazing!', 'success');
            
            document.getElementById('preview').scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            showMessage(`❌ Error: ${error.message}`, 'error');
        } finally {
            generateBtn.disabled = false;
            generateBtn.classList.add('glow');
            btnText.style.display = 'inline-block';
            btnSpinner.style.display = 'none';
        }
    });
}

function setupEasterEggs() {
    // Konami code easter egg
    document.addEventListener('keydown', function(e) {
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        
        konamiSequence.push(e.keyCode);
        if (konamiSequence.length > konamiCode.length) {
            konamiSequence.shift();
        }
        
        if (konamiSequence.join(',') === konamiCode.join(',')) {
            showMessage('🎮 Konami Code activated! You\'re a true developer! 🎮', 'success');
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiSequence = [];
        }
    });

    // Double-click sparkle effect
    document.addEventListener('dblclick', function(e) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${e.clientX + (Math.random() - 0.5) * 100}px;
                    top: ${e.clientY + (Math.random() - 0.5) * 100}px;
                    font-size: 20px;
                    pointer-events: none;
                    z-index: 9999;
                    animation: sparkle 1s ease-out forwards;
                `;
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }, i * 100);
        }
    });

    // Fun fact generator
    const devFacts = [
        "🤓 The first computer bug was an actual bug found in 1947!",
        "☕ Java was originally called Oak!",
        "🎯 JavaScript was created in just 10 days!",
        "🔥 Python is named after Monty Python!",
        "💎 Ruby was named after the precious stone!",
        "🐍 The term 'bug' was popularized by Grace Hopper!",
        "🚀 The first computer virus was created in 1971!",
        "💻 The '@' symbol was used in emails for the first time in 1971!"
    ];

    // Show random dev fact every 45 seconds
    setInterval(() => {
        const randomFact = devFacts[Math.floor(Math.random() * devFacts.length)];
        const factDiv = document.createElement('div');
        factDiv.innerHTML = randomFact;
        factDiv.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            font-size: 14px;
            max-width: 300px;
            animation: slideInFromRight 0.5s ease;
            cursor: pointer;
        `;
        
        factDiv.addEventListener('click', () => {
            factDiv.style.animation = 'slideOutToRight 0.5s ease';
            setTimeout(() => factDiv.remove(), 500);
        });
        
        document.body.appendChild(factDiv);
        
        setTimeout(() => {
            if (factDiv.parentNode) {
                factDiv.style.animation = 'slideOutToRight 0.5s ease';
                setTimeout(() => factDiv.remove(), 500);
            }
        }, 8000);
    }, 45000);
}

// Quick test function to ensure everything works
function testGeneration() {
    console.log('Testing profile generation...');
    
    // Test with dummy data
    const testFormData = new FormData();
    testFormData.append('username', 'octocat');
    testFormData.append('name', 'Test User');
    testFormData.append('title', 'Developer');
    
    try {
        generateMarkdown(testFormData);
        console.log('✅ Generation test passed');
    } catch (error) {
        console.error('❌ Generation test failed:', error);
    }
}

function switchTab(tabName) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        content.style.animation = '';
    });
    
    const targetTab = document.getElementById(tabName);
    targetTab.classList.add('active');
    targetTab.style.animation = 'fadeInUp 0.6s ease';

    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Preview mode switching
function switchPreviewMode(mode) {
    currentPreviewMode = mode;
    
    document.querySelectorAll('.preview-toggle').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    const markdownPreview = document.getElementById('markdownPreview');
    const renderedPreview = document.getElementById('renderedPreview');
    
    if (mode === 'markdown') {
        markdownPreview.style.display = 'block';
        renderedPreview.style.display = 'none';
    } else {
        markdownPreview.style.display = 'none';
        renderedPreview.style.display = 'block';
        updateRenderedPreview();
    }
}

function updateRenderedPreview() {
    if (generatedMarkdown) {
        const iframe = document.getElementById('previewFrame');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { 
                        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;
                        line-height: 1.6;
                        color: #24292f;
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 20px;
                        background: #ffffff;
                    }
                    img { max-width: 100%; height: auto; }
                    pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow-x: auto; }
                    blockquote { border-left: 4px solid #dfe2e5; padding-left: 16px; color: #656d76; }
                    a { color: #0969da; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                    h1, h2, h3 { border-bottom: 1px solid #d0d7de; padding-bottom: 8px; }
                </style>
            </head>
            <body>${markdownToHtml(generatedMarkdown)}</body>
            </html>
        `;
        
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
    }
}

// Simple markdown to HTML converter for preview
function markdownToHtml(markdown) {
    return markdown
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        .replace(/\n/g, '<br>');
}

function showTemplatePreview(template) {
    const templates = {
        modern: '🎨 Clean, professional design with smooth animations',
        creative: '✨ Colorful profile with GIFs and creative elements',
        professional: '💼 Business-focused layout perfect for networking',
        developer: '👨‍💻 Code-centric design with syntax highlighting',
        gamer: '🎮 Gaming-themed with achievement-style elements',
        minimalist: '⚪ Simple, elegant, and clutter-free design'
    };
    
    showMessage(`📋 Selected: ${templates[template]}`, 'success');
}

function updateBadgePreview() {
    const text = document.getElementById('badgeText').value || 'My Awesome Badge';
    const color = document.getElementById('badgeColor').value;
    const style = document.getElementById('badgeStyle').value;
    
    const encodedText = encodeURIComponent(text);
    const badgeUrl = `https://img.shields.io/badge/${encodedText}-${color}?style=${style}`;
    
    document.getElementById('badgePreview').innerHTML = `
        <img src="${badgeUrl}" alt="Preview" style="animation: bounce 0.5s ease;">
    `;
}

function updateCustomTechPreview() {
    const name = document.getElementById('customTechName').value || 'Technology';
    const color = document.getElementById('customTechColor').value;
    const logo = document.getElementById('customTechLogo').value;
    
    const encodedName = encodeURIComponent(name);
    let badgeUrl = `https://img.shields.io/badge/${encodedName}-${color}?style=for-the-badge`;
    
    if (logo) {
        badgeUrl += `&logo=${encodeURIComponent(logo)}&logoColor=white`;
    }
    
    document.getElementById('customTechPreview').innerHTML = `
        <img src="${badgeUrl}" alt="Preview" style="animation: bounce 0.5s ease;">
    `;
}

function addCustomBadge() {
    const text = document.getElementById('badgeText').value;
    if (!text) {
        showMessage('⚠️ Please enter badge text first!', 'error');
        return;
    }

    const color = document.getElementById('badgeColor').value;
    const style = document.getElementById('badgeStyle').value;
    const encodedText = encodeURIComponent(text);
    const badge = `![${text}](https://img.shields.io/badge/${encodedText}-${color}?style=${style})`;
    
    customBadges.push({ text, badge });
    
    const customBadgesContainer = document.getElementById('customBadges');
    const badgeElement = document.createElement('div');
    badgeElement.className = 'tech-item selected animate__animated animate__bounceIn';
    badgeElement.innerHTML = `
        <span><i class="fas fa-star"></i> ${text}</span>
        <button onclick="removeCustomBadge(${customBadges.length - 1})" 
                style="margin-left: auto; background: #ff4757; color: white; border: none; border-radius: 8px; padding: 6px 12px; cursor: pointer; transition: all 0.3s;">
            <i class="fas fa-trash"></i>
        </button>
    `;
    customBadgesContainer.appendChild(badgeElement);
    
    document.getElementById('badgeText').value = '';
    updateBadgePreview();
    
    showMessage('✅ Custom badge added successfully!', 'success');
}

function addCustomTech() {
    const name = document.getElementById('customTechName').value;
    if (!name) {
        showMessage('⚠️ Please enter technology name first!', 'error');
        return;
    }

    const color = document.getElementById('customTechColor').value;
    const logo = document.getElementById('customTechLogo').value;
    
    const encodedName = encodeURIComponent(name);
    let badge = `![${name}](https://img.shields.io/badge/${encodedName}-${color}?style=for-the-badge`;
    
    if (logo) {
        badge += `&logo=${encodeURIComponent(logo)}&logoColor=white`;
    }
    badge += ')';
    
    const techId = 'custom_' + Date.now();
    customTech.push({ id: techId, name, badge });
    
    const customTechContainer = document.getElementById('customTechItems');
    const techElement = document.createElement('div');
    techElement.className = 'tech-item selected animate__animated animate__bounceIn';
    techElement.innerHTML = `
        <input type="checkbox" id="${techId}" name="tech" value="${techId}" checked style="display: none;">
        <span><i class="fas fa-plus-circle"></i> ${name}</span>
        <button onclick="removeCustomTech('${techId}')" 
                style="margin-left: auto; background: #ff4757; color: white; border: none; border-radius: 8px; padding: 6px 12px; cursor: pointer; transition: all 0.3s;">
            <i class="fas fa-trash"></i>
        </button>
    `;
    customTechContainer.appendChild(techElement);
    
    // Clear form
    document.getElementById('customTechName').value = '';
    document.getElementById('customTechLogo').value = '';
    updateCustomTechPreview();
    
    showMessage('✅ Custom technology added successfully!', 'success');
}

function removeCustomBadge(index) {
    customBadges.splice(index, 1);
    const customBadgesContainer = document.getElementById('customBadges');
    const element = customBadgesContainer.children[index];
    element.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        if (element.parentNode) {
            element.remove();
        }
    }, 300);
}

function removeCustomTech(techId) {
    customTech = customTech.filter(tech => tech.id !== techId);
    const element = document.querySelector(`#customTechItems [onclick*="${techId}"]`).parentNode;
    element.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        if (element.parentNode) {
            element.remove();
        }
    }, 300);
}

async function fetchGitHubData(username) {
    try {
        // Use a simple fetch with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(`https://api.github.com/users/${username}`, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error('User not found');
        }
        
        const userData = await response.json();
        
        // Display user stats with animations
        const statsContainer = document.getElementById('statsContainer');
        statsContainer.innerHTML = `
            <div class="stat-card" data-aos="flip-left">
                <div class="stat-number">${userData.public_repos || 0}</div>
                <div class="stat-label"><i class="fas fa-folder"></i> Repositories</div>
            </div>
            <div class="stat-card" data-aos="flip-left" data-aos-delay="100">
                <div class="stat-number">${userData.followers || 0}</div>
                <div class="stat-label"><i class="fas fa-users"></i> Followers</div>
            </div>
            <div class="stat-card" data-aos="flip-left" data-aos-delay="200">
                <div class="stat-number">${userData.following || 0}</div>
                <div class="stat-label"><i class="fas fa-user-plus"></i> Following</div>
            </div>
            <div class="stat-card" data-aos="flip-left" data-aos-delay="300">
                <div class="stat-number">${userData.public_gists || 0}</div>
                <div class="stat-label"><i class="fas fa-code"></i> Gists</div>
            </div>
        `;
        
        document.getElementById('userStats').style.display = 'block';
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Auto-fill form fields
        autoFillForm(userData);
        
    } catch (error) {
        console.warn('GitHub API error:', error.message);
        // Don't throw error, just log it - profile generation should continue
        showMessage('⚠️ GitHub stats unavailable, but profile generation continues!', 'error');
    }
}

function autoFillForm(userData) {
    const fields = [
        { id: 'name', value: userData.name },
        { id: 'location', value: userData.location },
        { id: 'website', value: userData.blog },
        { id: 'description', value: userData.bio }
    ];

    fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element.value && field.value) {
            element.value = field.value;
            element.style.animation = 'pulse 0.5s ease';
        }
    });
}

function generateMarkdown(formData) {
    try {
        const username = formData.get('username');
        const selectedTech = formData.getAll('tech');
        const features = formData.getAll('features');
        const selectedMemes = formData.getAll('memes');
        
        let markdown = '';
        
        // Simple, fast generation based on selected template
        switch(selectedTemplate) {
            case 'creative':
                markdown = generateCreativeTemplate(formData, selectedTech, features, selectedMemes);
                break;
            case 'professional':
                markdown = generateProfessionalTemplate(formData, selectedTech, features);
                break;
            case 'developer':
                markdown = generateDeveloperTemplate(formData, selectedTech, features);
                break;
            case 'gamer':
                markdown = generateGamerTemplate(formData, selectedTech, features);
                break;
            case 'minimalist':
                markdown = generateMinimalistTemplate(formData, selectedTech, features);
                break;
            default:
                markdown = generateModernTemplate(formData, selectedTech, features, selectedMemes);
        }
        
        generatedMarkdown = markdown;
        document.getElementById('markdownPreview').textContent = markdown;
        document.getElementById('copyBtn').style.display = 'block';
        
        // Update rendered preview if in that mode
        if (currentPreviewMode === 'rendered') {
            updateRenderedPreview();
        }
        
        // Add preview animation
        document.getElementById('markdownPreview').style.animation = 'fadeInUp 0.8s ease';
        
    } catch (error) {
        console.error('Markdown generation error:', error);
        showMessage('❌ Error generating markdown. Please try again.', 'error');
    }
}

function generateModernTemplate(formData, selectedTech, features, selectedMemes) {
    try {
        const username = formData.get('username');
        const name = formData.get('name') || username;
        const title = formData.get('title');
        const subtitle = formData.get('subtitle');
        const description = formData.get('description');
        const location = formData.get('location');
        const website = formData.get('website');
        const linkedin = formData.get('linkedin');
        const twitter = formData.get('twitter');
        const email = formData.get('email');

        let markdown = `<div align="center">

# <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="30px" height="30px"> Hello! I'm ${name}

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=32&pause=1000&color=667EEA&center=true&vCenter=true&width=600&lines=${encodeURIComponent(title || 'Full Stack Developer')};${encodeURIComponent(subtitle || 'Passionate Coder')};Welcome+to+my+GitHub!" alt="Typing SVG" />

</div>

---

<img align="right" alt="Coding" width="400" src="https://raw.githubusercontent.com/devSouvik/devSouvik/master/gif3.gif">

### 🚀 About Me

${description || 'I love creating amazing applications and contributing to the open-source community!'}

${location ? `- 🌍 I'm based in **${location}**` : ''}
- 🌱 I'm currently learning **cutting-edge technologies**
- 👯 I'm looking to collaborate on **innovative projects**
- 💬 Ask me about **web development, programming, and tech trends**
- ⚡ Fun fact: **I debug with console.log() and I'm proud of it!**

`;

        // Add social connections
        if (linkedin || twitter || email || website) {
            markdown += '\n### 🌐 Connect with me:\n\n<p align="left">\n';
            
            if (linkedin) {
                markdown += `<a href="https://linkedin.com/in/${linkedin}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="${linkedin}" height="30" width="40" /></a>\n`;
            }
            
            if (twitter) {
                markdown += `<a href="https://twitter.com/${twitter}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="${twitter}" height="30" width="40" /></a>\n`;
            }
            
            if (email) {
                markdown += `<a href="mailto:${email}"><img align="center" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="${email}" /></a>\n`;
            }
            
            if (website) {
                markdown += `<a href="${website}" target="blank"><img align="center" src="https://img.shields.io/badge/Website-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white" alt="${website}" /></a>\n`;
            }
            
            markdown += '</p>\n\n';
        }

        // Tech stack (including custom tech)
        const allSelectedTech = selectedTech.concat(customTech.filter(tech => selectedTech.includes(tech.id)));
        if (allSelectedTech.length > 0) {
            markdown += '### 🛠️ Languages and Tools:\n\n<p align="center">\n';
            allSelectedTech.forEach(techId => {
                const tech = findTechById(techId) || customTech.find(ct => ct.id === techId);
                if (tech) {
                    markdown += tech.badge + '\n';
                }
            });
            markdown += '</p>\n\n';
        }

        // Custom badges
        if (customBadges && customBadges.length > 0) {
            markdown += '### 🎨 Custom Achievements:\n\n<p align="center">\n';
            customBadges.forEach(badge => {
                markdown += badge.badge + '\n';
            });
            markdown += '</p>\n\n';
        }

        // Memes section
        if (selectedMemes && selectedMemes.length > 0) {
            markdown += '### 😄 Developer Life:\n\n';
            selectedMemes.forEach(meme => {
                switch(meme) {
                    case 'coffee':
                        markdown += '☕ **Powered by Coffee** - Caffeine is my debugging fuel!\n\n';
                        break;
                    case 'stackoverflow':
                        markdown += '🔄 **StackOverflow Navigator** - Copy, Paste, StackOverflow, Repeat!\n\n';
                        break;
                    case 'debug':
                        markdown += '🐛 **Bug Hunter** - "It\'s not a bug, it\'s a feature!"\n\n';
                        break;
                    case 'works':
                        markdown += '💻 **Local Hero** - "But it works on my machine!"\n\n';
                        break;
                }
            });
        }

        // GitHub stats
        if (features && features.length > 0) {
            markdown += '### 📊 GitHub Analytics:\n\n<div align="center">\n\n';
            
            if (features.includes('stats')) {
                markdown += `<img height="180em" src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&include_all_commits=true&count_private=true"/>\n`;
            }
            
            if (features.includes('languages')) {
                markdown += `<img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&langs_count=8&theme=tokyonight"/>\n`;
            }
            
            markdown += '\n</div>\n\n';
            
            if (features.includes('streak')) {
                markdown += `<div align="center">\n\n![GitHub Streak](https://streak-stats.demolab.com?user=${username}&theme=tokyonight&hide_border=true)\n\n</div>\n\n`;
            }
        }

        if (features && features.includes('trophies')) {
            markdown += '### 🏆 GitHub Trophies:\n\n<div align="center">\n\n';
            markdown += `![](https://github-profile-trophy.vercel.app/?username=${username}&theme=tokyonight&no-frame=true&column=7)\n\n`;
            markdown += '</div>\n\n';
        }

        if (features && features.includes('contributions')) {
            markdown += '### 📈 Contribution Graph:\n\n<div align="center">\n\n';
            markdown += `![Snake animation](https://github.com/platane/snk/blob/output/github-contribution-grid-snake.svg)\n\n`;
            markdown += '</div>\n\n';
        }

        if (features && features.includes('activity')) {
            markdown += '### 📊 Activity Graph:\n\n';
            markdown += `![Activity Graph](https://activity-graph.herokuapp.com/graph?username=${username}&theme=tokyo-night)\n\n`;
        }

        if (features && features.includes('quotes')) {
            markdown += '### 💭 Random Dev Quote:\n\n';
            markdown += `![](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=tokyonight)\n\n`;
        }

        if (features && features.includes('jokes')) {
            markdown += '### 😂 Random Programming Joke:\n\n';
            markdown += `![Jokes Card](https://readme-jokes.vercel.app/api?hideBorder&theme=tokyonight)\n\n`;
        }

        markdown += `---

<div align="center">

### ✨ Thanks for visiting! ✨

![Visitor Count](https://profile-counter.glitch.me/${username}/count.svg)

**"First, solve the problem. Then, write the code." – John Johnson**

</div>

<!-- Proudly created with Ultimate GitHub Profile Generator -->`;
        
        return markdown;
        
    } catch (error) {
        console.error('Error in generateModernTemplate:', error);
        // Return a simple fallback template
        return `# Hello! I'm ${formData.get('name') || formData.get('username')}

Welcome to my GitHub profile!

## About Me
- 🌱 I'm currently learning new technologies
- 👯 I'm looking to collaborate on interesting projects
- 💬 Ask me about web development and programming

## GitHub Stats
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${formData.get('username')}&show_icons=true&theme=tokyonight)

Thanks for visiting!`;
    }
}

// Other template generators (simplified for brevity - you can expand these)
function generateCreativeTemplate(formData, selectedTech, features, selectedMemes) {
    const username = formData.get('username');
    const name = formData.get('name') || username;
    const title = formData.get('title');
    
    return `<div align="center">
<img width="100%" height="400px" src="https://user-images.githubusercontent.com/74038190/213910845-af37a709-8995-40d6-be59-724526e3c3d7.gif" />

# 🌟 Welcome to ${name}'s Creative Universe! 🌟

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=35&pause=1000&color=667EEA&center=true&vCenter=true&width=800&lines=Creative+Developer;${encodeURIComponent(title || 'UI/UX Enthusiast')};Open+Source+Contributor;Always+Learning!" alt="Typing SVG" />

</div>

${generateTechBadges(selectedTech)}
${generateStats(username, features)}

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="1000">
`;
}

function generateProfessionalTemplate(formData, selectedTech, features) {
    const username = formData.get('username');
    const name = formData.get('name') || username;
    const title = formData.get('title');
    const description = formData.get('description');
    const location = formData.get('location');

    return `# ${name}
## ${title || 'Software Professional'}

> ${description || 'Delivering enterprise-grade solutions with precision and expertise'}

${generateTechBadges(selectedTech)}
${generateStats(username, features)}
`;
}

function generateDeveloperTemplate(formData, selectedTech, features) {
    const username = formData.get('username');
    const name = formData.get('name') || username;
    const title = formData.get('title');

    return `\`\`\`javascript
const developer = {
    name: "${name}",
    role: "${title || 'Full Stack Developer'}",
    currentlyLearning: "new technologies"
};

console.log("Hello World!");
\`\`\`

${generateTechBadges(selectedTech)}
${generateStats(username, features)}
`;
}

function generateGamerTemplate(formData, selectedTech, features) {
    const username = formData.get('username');
    const name = formData.get('name') || username;

    return `<div align="center">

# 🎮 PLAYER: ${name.toUpperCase()}
## 🏆 LEVEL: LEGENDARY DEVELOPER

</div>

${generateTechBadges(selectedTech)}
${generateStats(username, features)}
`;
}

function generateMinimalistTemplate(formData, selectedTech, features) {
    const username = formData.get('username');
    const name = formData.get('name') || username;
    const title = formData.get('title');

    return `# ${name}

${title || 'Developer'}

${generateTechBadges(selectedTech)}
${generateStats(username, features)}
`;
}

function generateTechBadges(selectedTech) {
    if (!selectedTech || selectedTech.length === 0) return '';
    
    let badges = '\n### 🛠️ Tech Arsenal\n\n<p align="center">\n';
    selectedTech.forEach(techId => {
        const tech = findTechById(techId) || customTech.find(ct => ct.id === techId);
        if (tech) {
            badges += tech.badge + '\n';
        }
    });
    
    customBadges.forEach(badge => {
        badges += badge.badge + '\n';
    });
    
    badges += '</p>\n\n';
    return badges;
}

function generateStats(username, features) {
    if (!features || features.length === 0) return '';
    
    let stats = '\n### 📊 GitHub Analytics\n\n<div align="center">\n\n';
    
    if (features.includes('stats')) {
        stats += `<img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&include_all_commits=true&count_private=true&hide_border=true" height="165" alt="stats graph" />\n`;
    }
    
    if (features.includes('languages')) {
        stats += `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&include_all_commits=true&count_private=true&hide_border=true" height="165" alt="languages graph" />\n`;
    }
    
    stats += '\n</div>\n\n';
    return stats;
}

function findTechById(techId) {
    for (const category in techStacks) {
        const tech = techStacks[category].find(t => t.id === techId);
        if (tech) return tech;
    }
    return null;
}

function copyToClipboard() {
    navigator.clipboard.writeText(generatedMarkdown).then(() => {
        showMessage('🎉 Epic! Your markdown has been copied to clipboard! Ready to make your GitHub profile legendary!', 'success');
        
        const button = document.getElementById('copyBtn');
        button.style.animation = 'bounce 0.6s ease';
        button.innerHTML = '<i class="fas fa-check"></i> Copied Successfully!';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i> Copy Awesome Markdown';
            button.style.animation = '';
        }, 2000);
        
    }).catch(err => {
        showMessage('❌ Oops! Failed to copy to clipboard. Please try selecting and copying manually.', 'error');
    });
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i> ${message}`;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            messageDiv.style.display = 'none';
            messageDiv.style.opacity = '1';
        }, 300);
    }, 5000);
}