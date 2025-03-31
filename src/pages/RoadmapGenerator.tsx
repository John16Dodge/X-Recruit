
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Code, Lightbulb, LineChart, ArrowDown, ArrowUp, Globe, LaptopIcon, Youtube, Database, Server, PencilRuler, BookMarked, FileText as FileTextIcon, Users as UsersIcon, Terminal, ShieldCheck, Smartphone, Gamepad, Brush, Cog, Brain, Aperture, Headphones, CloudSun, LineChart as Analytics, Network, GitBranch } from 'lucide-react';

interface Resource {
  title: string;
  url: string;
  type: 'book' | 'video' | 'course' | 'article' | 'tool' | 'community';
  platform?: string;
}

interface Roadmap {
  id: number;
  title: string;
  description: string;
  steps: string[];
  icon: React.ReactNode;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate?: string;
  resources?: Resource[];
  tools?: string[];
  platforms?: string[];
  certifications?: string[];
  aiGenerated?: boolean;
}

const RoadmapGenerator = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [showDetails, setShowDetails] = useState<number | null>(null);

  // Expanded demo roadmaps database with tools, platforms, and more learning resources
  const demoRoadmaps: Record<string, Roadmap[]> = {
    frontend: [
      {
        id: 1,
        title: "Frontend Developer Roadmap",
        description: "A comprehensive path to becoming a skilled frontend developer",
        icon: <Code className="h-8 w-8 text-blue-500" />,
        difficulty: "intermediate",
        timeEstimate: "6-9 months",
        steps: [
          "Learn HTML, CSS fundamentals",
          "Master JavaScript basics and ES6+",
          "Study responsive design principles",
          "Pick a CSS framework (Tailwind, Bootstrap)",
          "Learn a JavaScript framework (React, Vue, Angular)",
          "Understand state management",
          "Learn build tools and bundlers"
        ],
        resources: [
          { title: "Complete Web Development Bootcamp", url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/", type: "course", platform: "Udemy" },
          { title: "JavaScript: The Good Parts", url: "https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742", type: "book" },
          { title: "React Documentation", url: "https://reactjs.org/docs/getting-started.html", type: "article" },
          { title: "Frontend Masters", url: "https://frontendmasters.com/", type: "course", platform: "Frontend Masters" },
          { title: "CSS-Tricks", url: "https://css-tricks.com/", type: "article", platform: "CSS-Tricks" }
        ],
        tools: [
          "VS Code",
          "Chrome DevTools",
          "Git & GitHub",
          "npm/yarn",
          "Webpack",
          "ESLint",
          "Prettier"
        ],
        platforms: [
          "Udemy",
          "Frontend Masters",
          "freeCodeCamp",
          "Codecademy",
          "Coursera",
          "YouTube",
          "MDN Web Docs"
        ],
        certifications: [
          "Meta Frontend Developer Professional Certificate",
          "freeCodeCamp Responsive Web Design",
          "JavaScript Algorithms and Data Structures"
        ]
      },
      {
        id: 2,
        title: "UI/UX Design Track",
        description: "Design-focused path for frontend developers",
        icon: <PencilRuler className="h-8 w-8 text-purple-500" />,
        difficulty: "beginner",
        timeEstimate: "4-6 months",
        steps: [
          "Learn design fundamentals and theory",
          "Master a design tool (Figma, Adobe XD)",
          "Study user research methods",
          "Practice wireframing and prototyping",
          "Learn animation and micro-interactions",
          "Study design systems",
          "Portfolio development"
        ],
        resources: [
          { title: "Don't Make Me Think", url: "https://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515", type: "book" },
          { title: "Figma Essential Training", url: "https://www.linkedin.com/learning/figma-essential-training-the-basics", type: "video", platform: "LinkedIn Learning" },
          { title: "Design Systems Handbook", url: "https://www.designbetter.co/design-systems-handbook", type: "article" },
          { title: "UI/UX Design Bootcamp", url: "https://www.coursera.org/professional-certificates/google-ux-design", type: "course", platform: "Coursera" }
        ],
        tools: [
          "Figma",
          "Adobe XD",
          "Sketch",
          "InVision",
          "Principle",
          "Maze",
          "Optimal Workshop"
        ],
        platforms: [
          "Coursera",
          "LinkedIn Learning",
          "Interaction Design Foundation",
          "Dribbble",
          "Behance",
          "Medium",
          "UX Collective"
        ],
        certifications: [
          "Google UX Design Professional Certificate",
          "Interaction Design Foundation Certification",
          "Nielsen Norman Group UX Certification"
        ]
      }
    ],
    backend: [
      {
        id: 3,
        title: "Backend Developer Roadmap",
        description: "Path to becoming a proficient backend developer",
        icon: <Server className="h-8 w-8 text-blue-500" />,
        difficulty: "intermediate",
        timeEstimate: "6-9 months",
        steps: [
          "Learn a backend language (Node.js, Python, Java)",
          "Understand HTTP/HTTPS and REST principles",
          "Master database fundamentals (SQL/NoSQL)",
          "Learn authentication and authorization",
          "API design and documentation",
          "Error handling and logging",
          "Deployment and DevOps basics"
        ],
        resources: [
          { title: "Node.js Design Patterns", url: "https://www.amazon.com/Node-js-Design-Patterns-production-grade-applications/dp/1839214112", type: "book" },
          { title: "RESTful API Design", url: "https://www.udemy.com/course/rest-api/", type: "course", platform: "Udemy" },
          { title: "Database Design Fundamentals", url: "https://www.youtube.com/playlist?list=PL1LIXLIF50uXWJ9alDSXClzNCMynac38g", type: "video", platform: "YouTube" },
          { title: "Backend Development - The Complete Guide", url: "https://www.codecademy.com/learn/paths/web-development", type: "course", platform: "Codecademy" }
        ],
        tools: [
          "Docker",
          "Postman",
          "Git & GitHub",
          "Redis",
          "Node.js/Express",
          "Django/Flask",
          "Spring Boot"
        ],
        platforms: [
          "Udemy",
          "Codecademy",
          "Pluralsight",
          "freeCodeCamp",
          "edX",
          "YouTube",
          "GitHub"
        ],
        certifications: [
          "AWS Certified Developer",
          "Oracle Certified Professional Java Developer",
          "MongoDB Developer Certification"
        ]
      },
      {
        id: 4,
        title: "Database Specialist Track",
        description: "Focus on data management and database technologies",
        icon: <Database className="h-8 w-8 text-green-500" />,
        difficulty: "advanced",
        timeEstimate: "4-8 months",
        steps: [
          "Advanced SQL concepts",
          "Database design principles",
          "NoSQL database systems",
          "Data modeling",
          "Database performance optimization",
          "Data replication strategies",
          "Database security"
        ],
        resources: [
          { title: "SQL Performance Explained", url: "https://www.amazon.com/SQL-Performance-Explained-Understanding-Internals/dp/3950307826", type: "book" },
          { title: "MongoDB University", url: "https://university.mongodb.com/", type: "course", platform: "MongoDB University" },
          { title: "Database Internals", url: "https://www.amazon.com/Database-Internals-Deep-Distributed-Systems/dp/1492040347", type: "book" },
          { title: "Advanced SQL for Data Analysis", url: "https://www.datacamp.com/courses/joining-data-in-postgresql", type: "course", platform: "DataCamp" }
        ],
        tools: [
          "MySQL",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "Elasticsearch",
          "DBeaver",
          "SQL Server Management Studio"
        ],
        platforms: [
          "DataCamp",
          "MongoDB University",
          "Oracle University",
          "Pluralsight",
          "edX",
          "Udemy",
          "YouTube"
        ],
        certifications: [
          "Oracle Database SQL Certified Associate",
          "Microsoft Certified: Azure Database Administrator Associate",
          "MongoDB Certified DBA Associate"
        ]
      }
    ],
    datascience: [
      {
        id: 5,
        title: "Data Science Roadmap",
        description: "Path to becoming a proficient data scientist",
        icon: <LineChart className="h-8 w-8 text-blue-500" />,
        difficulty: "advanced",
        timeEstimate: "9-12 months",
        steps: [
          "Learn Python or R programming",
          "Master statistics and probability",
          "Data manipulation and preprocessing",
          "Data visualization techniques",
          "Machine learning fundamentals",
          "Deep learning concepts",
          "Business understanding and communication"
        ],
        resources: [
          { title: "Python for Data Analysis", url: "https://www.amazon.com/Python-Data-Analysis-Wrangling-IPython/dp/1491957662", type: "book" },
          { title: "Deep Learning Specialization", url: "https://www.coursera.org/specializations/deep-learning", type: "course", platform: "Coursera" },
          { title: "Feature Engineering for Machine Learning", url: "https://www.amazon.com/Feature-Engineering-Machine-Learning-Principles/dp/1491953241", type: "book" },
          { title: "Data Science A-Z", url: "https://www.udemy.com/course/datascience/", type: "course", platform: "Udemy" },
          { title: "StatQuest with Josh Starmer", url: "https://www.youtube.com/c/joshstarmer", type: "video", platform: "YouTube" }
        ],
        tools: [
          "Python",
          "R",
          "Jupyter Notebooks",
          "Pandas",
          "NumPy",
          "Scikit-learn",
          "TensorFlow/PyTorch",
          "Tableau/Power BI"
        ],
        platforms: [
          "Coursera",
          "DataCamp",
          "Kaggle",
          "edX",
          "Fast.ai",
          "Udacity",
          "YouTube"
        ],
        certifications: [
          "IBM Data Science Professional Certificate",
          "Microsoft Certified: Azure Data Scientist Associate",
          "Google Data Analytics Professional Certificate"
        ]
      },
      {
        id: 6,
        title: "Machine Learning Engineer",
        description: "Specialized path for building AI systems and models",
        icon: <Brain className="h-8 w-8 text-pink-500" />,
        difficulty: "advanced",
        timeEstimate: "8-12 months",
        steps: [
          "Advanced Python programming",
          "Deep learning frameworks mastery",
          "MLOps and model deployment",
          "Feature engineering techniques",
          "Model optimization and tuning",
          "Large-scale ML systems",
          "Real-time inference systems"
        ],
        resources: [
          { title: "Hands-On Machine Learning", url: "https://www.amazon.com/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1492032646", type: "book" },
          { title: "MLOps: Machine Learning Operations", url: "https://www.coursera.org/specializations/mlops-machine-learning-duke", type: "course", platform: "Coursera" },
          { title: "Deep Learning for Coders", url: "https://course.fast.ai/", type: "course", platform: "Fast.ai" },
          { title: "ML System Design", url: "https://www.educative.io/courses/grokking-the-machine-learning-interview", type: "course", platform: "Educative" }
        ],
        tools: [
          "PyTorch",
          "TensorFlow",
          "Kubernetes",
          "Docker",
          "MLflow",
          "Kubeflow",
          "Ray",
          "DVC (Data Version Control)"
        ],
        platforms: [
          "Coursera",
          "Fast.ai",
          "Kaggle",
          "Hugging Face",
          "Weights & Biases",
          "Paper with Code",
          "Towards Data Science"
        ],
        certifications: [
          "AWS Certified Machine Learning Specialty",
          "Google Professional Machine Learning Engineer",
          "Microsoft Certified: Azure AI Engineer Associate",
          "TensorFlow Developer Certificate"
        ]
      }
    ],
    cloud: [
      {
        id: 7,
        title: "Cloud Computing Roadmap",
        description: "Path to becoming a cloud computing expert",
        icon: <Globe className="h-8 w-8 text-blue-500" />,
        difficulty: "intermediate",
        timeEstimate: "6-9 months",
        steps: [
          "Understand cloud computing fundamentals",
          "Learn a major cloud platform (AWS, Azure, GCP)",
          "Master networking concepts",
          "Study cloud storage solutions",
          "Learn infrastructure as code",
          "Understand containerization",
          "Study cloud security best practices"
        ],
        resources: [
          { title: "AWS Certified Solutions Architect Study Guide", url: "https://www.amazon.com/Certified-Solutions-Architect-Study-Guide/dp/1119713080", type: "book" },
          { title: "Azure Fundamentals", url: "https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/", type: "course", platform: "Microsoft Learn" },
          { title: "Google Cloud Platform Fundamentals", url: "https://www.coursera.org/learn/gcp-fundamentals", type: "course", platform: "Coursera" },
          { title: "A Cloud Guru", url: "https://acloudguru.com/", type: "course", platform: "A Cloud Guru" }
        ],
        tools: [
          "Terraform",
          "AWS CLI",
          "Azure CLI",
          "Google Cloud SDK",
          "Docker",
          "Kubernetes",
          "CloudFormation"
        ],
        platforms: [
          "A Cloud Guru",
          "Coursera",
          "Pluralsight",
          "AWS Training",
          "Microsoft Learn",
          "Google Cloud Training",
          "edX"
        ],
        certifications: [
          "AWS Certified Solutions Architect",
          "Microsoft Azure Administrator",
          "Google Cloud Professional Cloud Architect",
          "Certified Kubernetes Administrator"
        ]
      },
      {
        id: 8,
        title: "DevOps Engineer",
        description: "Path to mastering the DevOps methodology and tools",
        icon: <GitBranch className="h-8 w-8 text-green-500" />,
        difficulty: "intermediate",
        timeEstimate: "8-12 months",
        steps: [
          "Learn Linux administration",
          "Master Git and version control systems",
          "Understanding CI/CD pipelines",
          "Container orchestration with Kubernetes",
          "Infrastructure as Code (Terraform, Ansible)",
          "Monitoring and observability",
          "Site Reliability Engineering principles"
        ],
        resources: [
          { title: "The DevOps Handbook", url: "https://www.amazon.com/DevOps-Handbook-World-Class-Reliability-Organizations/dp/1942788002", type: "book" },
          { title: "Kubernetes: Up and Running", url: "https://www.amazon.com/Kubernetes-Running-Dive-Future-Infrastructure/dp/1492046531", type: "book" },
          { title: "DevOps Engineer Learning Path", url: "https://www.linkedin.com/learning/paths/become-a-devops-engineer", type: "course", platform: "LinkedIn Learning" },
          { title: "Terraform in Action", url: "https://www.manning.com/books/terraform-in-action", type: "book" }
        ],
        tools: [
          "Git",
          "Jenkins/GitHub Actions/GitLab CI",
          "Docker",
          "Kubernetes",
          "Terraform",
          "Ansible",
          "Prometheus/Grafana",
          "ELK Stack"
        ],
        platforms: [
          "Linux Academy",
          "A Cloud Guru",
          "KodeKloud",
          "Pluralsight",
          "Udemy",
          "GitHub Labs",
          "Katacoda"
        ],
        certifications: [
          "Certified Kubernetes Administrator (CKA)",
          "AWS Certified DevOps Engineer Professional",
          "Terraform Associate",
          "Docker Certified Associate",
          "Azure DevOps Engineer Expert"
        ]
      }
    ],
    security: [
      {
        id: 9,
        title: "Cybersecurity Specialist",
        description: "Path to becoming a cybersecurity professional",
        icon: <ShieldCheck className="h-8 w-8 text-red-500" />,
        difficulty: "intermediate",
        timeEstimate: "8-12 months",
        steps: [
          "Understand security fundamentals",
          "Learn network security principles",
          "Study cryptography basics",
          "Practice security assessment techniques",
          "Cloud security configurations",
          "Security operations and incident response",
          "Web application security testing"
        ],
        resources: [
          { title: "CompTIA Security+ Study Guide", url: "https://www.amazon.com/CompTIA-Security-Study-Guide-SY0-601/dp/1119736250", type: "book" },
          { title: "Penetration Testing: A Hands-On Introduction", url: "https://www.amazon.com/Penetration-Testing-Hands-Introduction-Hacking/dp/1593275641", type: "book" },
          { title: "Cybersecurity Career Path", url: "https://www.coursera.org/professional-certificates/google-cybersecurity", type: "course", platform: "Coursera" },
          { title: "Web Security Academy", url: "https://portswigger.net/web-security", type: "course", platform: "PortSwigger" }
        ],
        tools: [
          "Kali Linux",
          "Wireshark",
          "Nmap",
          "Metasploit",
          "Burp Suite",
          "OWASP ZAP",
          "Nessus",
          "Splunk"
        ],
        platforms: [
          "TryHackMe",
          "HackTheBox",
          "Coursera",
          "Cybrary",
          "edX",
          "SANS Online",
          "INE Security"
        ],
        certifications: [
          "CompTIA Security+",
          "Certified Ethical Hacker (CEH)",
          "CISSP",
          "OSCP",
          "AWS Certified Security - Specialty",
          "Certified Cloud Security Professional (CCSP)"
        ]
      }
    ],
    mobile: [
      {
        id: 10,
        title: "Mobile App Developer",
        description: "Path to becoming a skilled mobile application developer",
        icon: <Smartphone className="h-8 w-8 text-blue-500" />,
        difficulty: "intermediate",
        timeEstimate: "6-9 months",
        steps: [
          "Learn mobile development fundamentals",
          "Choose a platform (iOS or Android)",
          "Master a language (Swift/Obj-C or Kotlin/Java)",
          "Study UI/UX design principles for mobile",
          "Understand app architecture patterns",
          "Learn data persistence and networking",
          "App store deployment and optimization"
        ],
        resources: [
          { title: "iOS Programming: The Big Nerd Ranch Guide", url: "https://www.amazon.com/iOS-Programming-Ranch-Guide-Guides/dp/0135264022", type: "book" },
          { title: "Android Programming: The Big Nerd Ranch Guide", url: "https://www.amazon.com/Android-Programming-Ranch-Guide-Guides/dp/0135245125", type: "book" },
          { title: "Flutter & Dart - The Complete Guide", url: "https://www.udemy.com/course/flutter-bootcamp-with-dart/", type: "course", platform: "Udemy" },
          { title: "React Native in Action", url: "https://www.manning.com/books/react-native-in-action", type: "book" }
        ],
        tools: [
          "Xcode/Android Studio",
          "Figma/Sketch",
          "React Native/Flutter",
          "Firebase",
          "GitHub",
          "Postman",
          "TestFlight/Google Play Console"
        ],
        platforms: [
          "Udemy",
          "Pluralsight",
          "Codecademy",
          "Raywenderlich",
          "Udacity",
          "LinkedIn Learning",
          "edX"
        ],
        certifications: [
          "Apple Certified iOS Developer",
          "Associate Android Developer",
          "React Native Developer Certification",
          "Flutter Certified Application Developer",
          "AWS Mobile Developer - Associate"
        ]
      },
      {
        id: 11,
        title: "Cross-Platform App Developer",
        description: "Path to building applications that work across multiple platforms",
        icon: <Smartphone className="h-8 w-8 text-purple-500" />,
        difficulty: "intermediate",
        timeEstimate: "6-9 months",
        steps: [
          "Learn JavaScript/TypeScript fundamentals",
          "Master React or other UI frameworks",
          "Study React Native or Flutter",
          "Understand cross-platform limitations",
          "Native module integration",
          "Performance optimization techniques",
          "Cross-platform testing strategies"
        ],
        resources: [
          { title: "React Native - The Practical Guide", url: "https://www.udemy.com/course/react-native-the-practical-guide/", type: "course", platform: "Udemy" },
          { title: "Flutter in Action", url: "https://www.amazon.com/Flutter-Action-Eric-Windmill/dp/1617296147", type: "book" },
          { title: "Ionic Framework Masterclass", url: "https://www.udemy.com/course/ionic-4-apps-for-ios-android-pwa/", type: "course", platform: "Udemy" },
          { title: "Expo Documentation", url: "https://docs.expo.dev/", type: "article" }
        ],
        tools: [
          "React Native",
          "Flutter",
          "Expo",
          "Ionic",
          "VS Code",
          "Firebase",
          "App Center",
          "Fastlane"
        ],
        platforms: [
          "Udemy",
          "React Native Community",
          "Flutter Dev",
          "Expo Community",
          "YouTube",
          "Medium",
          "GitHub"
        ],
        certifications: [
          "React Native Developer Certification",
          "Flutter Certified Application Developer",
          "Cordova/PhoneGap Developer Certificate"
        ]
      }
    ],
    game: [
      {
        id: 12,
        title: "Game Developer",
        description: "Path to becoming a professional game developer",
        icon: <Gamepad className="h-8 w-8 text-teal-500" />,
        difficulty: "intermediate",
        timeEstimate: "9-12 months",
        steps: [
          "Learn a programming language (C#, C++)",
          "Master a game engine (Unity, Unreal)",
          "Study game design principles",
          "Learn 2D/3D graphics fundamentals",
          "Understand game physics",
          "Audio integration for games",
          "Game optimization techniques"
        ],
        resources: [
          { title: "Game Programming Patterns", url: "https://gameprogrammingpatterns.com/", type: "book" },
          { title: "Unity Game Development Bootcamp", url: "https://www.udemy.com/course/unitycourse2/", type: "course", platform: "Udemy" },
          { title: "Unreal Engine C++ Developer", url: "https://www.udemy.com/course/unrealcourse/", type: "course", platform: "Udemy" },
          { title: "The Art of Game Design", url: "https://www.amazon.com/Art-Game-Design-Book-Lenses/dp/0123694965", type: "book" }
        ],
        tools: [
          "Unity",
          "Unreal Engine",
          "Godot",
          "Blender",
          "Visual Studio",
          "GitHub",
          "FMOD/Wwise",
          "Photoshop/GIMP"
        ],
        platforms: [
          "Unity Learn",
          "Unreal Engine Learning Portal",
          "Udemy",
          "Coursera",
          "YouTube",
          "GitHub",
          "GameDev.net"
        ],
        certifications: [
          "Unity Certified Programmer",
          "Unity Certified Artist",
          "Unreal Engine Certification",
          "Certified Godot Developer"
        ]
      }
    ],
    design: [
      {
        id: 13,
        title: "Graphic Designer",
        description: "Path to becoming a professional graphic designer",
        icon: <Brush className="h-8 w-8 text-pink-500" />,
        difficulty: "beginner",
        timeEstimate: "6-9 months",
        steps: [
          "Learn design fundamentals and principles",
          "Master color theory and typography",
          "Study composition and layout",
          "Learn Adobe Creative Suite",
          "Develop brand identity skills",
          "Create a professional portfolio",
          "Understand print and digital design differences"
        ],
        resources: [
          { title: "Thinking with Type", url: "https://www.amazon.com/Thinking-Type-2nd-revised-expanded/dp/1568989695", type: "book" },
          { title: "Graphic Design Bootcamp", url: "https://www.udemy.com/course/graphic-design-masterclass/", type: "course", platform: "Udemy" },
          { title: "Adobe Illustrator CC - Advanced Training", url: "https://www.skillshare.com/classes/Adobe-Illustrator-CC-Advanced-Training/1248257613", type: "course", platform: "Skillshare" },
          { title: "Logo Design Fundamentals", url: "https://www.domestika.org/en/courses/3060-logo-design-from-concept-to-presentation", type: "course", platform: "Domestika" }
        ],
        tools: [
          "Adobe Photoshop",
          "Adobe Illustrator",
          "Adobe InDesign",
          "Figma",
          "Procreate",
          "Canva",
          "Affinity Designer"
        ],
        platforms: [
          "Skillshare",
          "Domestika",
          "Udemy",
          "LinkedIn Learning",
          "Behance",
          "Dribbble",
          "YouTube"
        ],
        certifications: [
          "Adobe Certified Professional",
          "Graphic Design Certificate Program",
          "Certified Digital Designer",
          "Certification in Visual Communication"
        ]
      }
    ],
    sysadmin: [
      {
        id: 14,
        title: "System Administrator",
        description: "Path to becoming a systems administrator",
        icon: <Cog className="h-8 w-8 text-gray-500" />,
        difficulty: "intermediate",
        timeEstimate: "6-9 months",
        steps: [
          "Learn Linux/Windows server administration",
          "Understand networking fundamentals",
          "Master virtualization technologies",
          "Learn about storage systems",
          "Backup and disaster recovery",
          "System monitoring and maintenance",
          "Security best practices"
        ],
        resources: [
          { title: "UNIX and Linux System Administration Handbook", url: "https://www.amazon.com/UNIX-Linux-System-Administration-Handbook/dp/0134277554", type: "book" },
          { title: "Windows Server Administration Fundamentals", url: "https://learn.microsoft.com/en-us/training/paths/windows-server-fundamentals/", type: "course", platform: "Microsoft Learn" },
          { title: "CompTIA Server+ Certification Guide", url: "https://www.amazon.com/CompTIA-Server-Certification-Guide-SK0-005/dp/1801078351", type: "book" },
          { title: "Virtualization Essentials", url: "https://www.pluralsight.com/courses/virtualization-essentials", type: "course", platform: "Pluralsight" }
        ],
        tools: [
          "Linux/Windows Server",
          "PowerShell/Bash",
          "VMware/Hyper-V",
          "Active Directory",
          "Ansible/Puppet",
          "Nagios/Zabbix",
          "Veeam Backup"
        ],
        platforms: [
          "Pluralsight",
          "Linux Academy",
          "Microsoft Learn",
          "CBT Nuggets",
          "ITProTV",
          "Udemy",
          "edX"
        ],
        certifications: [
          "CompTIA Server+",
          "RHCSA (Red Hat Certified System Administrator)",
          "Microsoft Certified: Windows Server",
          "VMware Certified Professional",
          "Linux Professional Institute Certification"
        ]
      }
    ],
    qa: [
      {
        id: 15,
        title: "QA Engineer",
        description: "Path to becoming a quality assurance engineer",
        icon: <Terminal className="h-8 w-8 text-indigo-500" />,
        difficulty: "beginner",
        timeEstimate: "5-7 months",
        steps: [
          "Understand software testing fundamentals",
          "Learn manual testing techniques",
          "Master test case design",
          "Study automation testing basics",
          "Learn a test automation tool (Selenium, Cypress)",
          "Understand CI/CD for testing",
          "API testing methods"
        ],
        resources: [
          { title: "Foundations of Software Testing ISTQB Certification", url: "https://www.amazon.com/Foundations-Software-Testing-ISTQB-Certification/dp/1473764793", type: "book" },
          { title: "Selenium WebDriver with Java", url: "https://www.udemy.com/course/selenium-real-time-examplesinterview-questions/", type: "course", platform: "Udemy" },
          { title: "API Testing with Postman", url: "https://www.pluralsight.com/courses/postman-fundamentals", type: "course", platform: "Pluralsight" },
          { title: "Modern Test Automation with Cypress", url: "https://testautomationu.applitools.com/cypress-tutorial/", type: "course", platform: "Test Automation University" }
        ],
        tools: [
          "Selenium",
          "Cypress",
          "Postman",
          "JMeter",
          "Jenkins",
          "JIRA",
          "TestRail",
          "Cucumber"
        ],
        platforms: [
          "Udemy",
          "Pluralsight",
          "Test Automation University",
          "Ministry of Testing",
          "LinkedIn Learning",
          "edX",
          "YouTube"
        ],
        certifications: [
          "ISTQB Foundation Level",
          "ISTQB Agile Tester",
          "Certified Test Engineer",
          "Selenium Certification",
          "API Testing Certification"
        ]
      },
      {
        id: 16,
        title: "Test Automation Engineer",
        description: "Specialized path for automation testing experts",
        icon: <Terminal className="h-8 w-8 text-blue-500" />,
        difficulty: "intermediate",
        timeEstimate: "7-10 months",
        steps: [
          "Master a programming language (Java, Python, JavaScript)",
          "Learn advanced test automation frameworks",
          "Study design patterns for test automation",
          "Performance testing techniques",
          "Mobile automation testing",
          "API and microservices testing",
          "Test infrastructure as code"
        ],
        resources: [
          { title: "Practical Test Automation", url: "https://testautomationu.applitools.com/learningpaths.html", type: "course", platform: "Test Automation University" },
          { title: "Selenium Design Patterns", url: "https://www.amazon.com/Mastering-Selenium-WebDriver-strategies-automation/dp/1784394351", type: "book" },
          { title: "Advanced Appium", url: "https://www.udemy.com/course/appium-selenium-for-mobile-automation-testing/", type: "course", platform: "Udemy" },
          { title: "Performance Testing with JMeter", url: "https://www.blazemeter.com/university/jmeter-training", type: "course", platform: "BlazeMeter University" }
        ],
        tools: [
          "Selenium WebDriver",
          "Appium",
          "Playwright",
          "Cucumber/SpecFlow",
          "JMeter/Gatling",
          "Docker/Kubernetes",
          "TestNG/JUnit/Mocha"
        ],
        platforms: [
          "Test Automation University",
          "Udemy",
          "Pluralsight",
          "LambdaTest Academy",
          "BrowserStack University",
          "LinkedIn Learning",
          "GitHub"
        ],
        certifications: [
          "ISTQB Test Automation Engineer",
          "Selenium WebDriver with Java Certification",
          "Appium Mobile Testing Certification",
          "Performance Testing Certification"
        ]
      }
    ],
    product: [
      {
        id: 17,
        title: "Product Manager",
        description: "Path to becoming a technical product manager",
        icon: <Aperture className="h-8 w-8 text-blue-500" />,
        difficulty: "intermediate",
        timeEstimate: "8-12 months",
        steps: [
          "Learn product management fundamentals",
          "Understand software development lifecycle",
          "Study user research and UX design basics",
          "Learn agile methodologies",
          "Develop data analysis skills",
          "Master product roadmapping",
          "Practice stakeholder management"
        ],
        resources: [
          { title: "Inspired: How to Create Tech Products Customers Love", url: "https://www.amazon.com/INSPIRED-Create-Tech-Products-Customers/dp/1119387507", type: "book" },
          { title: "Product Management Certification", url: "https://www.productschool.com/product-management-certification/", type: "course", platform: "Product School" },
          { title: "Agile Product Owner Role", url: "https://www.scrum.org/professional-scrum-product-owner-certification", type: "course", platform: "Scrum.org" },
          { title: "Designing User Experiences", url: "https://www.interaction-design.org/courses/user-research-methods-and-best-practices", type: "course", platform: "Interaction Design Foundation" }
        ],
        tools: [
          "JIRA/Asana",
          "Figma/Sketch",
          "Amplitude/Mixpanel",
          "Miro/Mural",
          "ProductPlan",
          "Google Analytics",
          "Notion/Confluence"
        ],
        platforms: [
          "Product School",
          "Mind the Product",
          "Reforge",
          "Udemy",
          "Product Management Festival",
          "ProductCon",
          "The Product Experience"
        ],
        certifications: [
          "Certified Scrum Product Owner (CSPO)",
          "Professional Scrum Product Owner (PSPO)",
          "Product Management Certificate",
          "Product Analytics Certification",
          "Agile Certified Product Manager"
        ]
      }
    ]
  };

  // AI-based roadmap categories for more intelligent matching
  const aiCategories = {
    webdev: ["website", "web", "html", "css", "javascript", "react", "frontend", "front-end", "back-end", "backend", "fullstack"],
    mobile: ["mobile", "app", "android", "ios", "flutter", "react native", "swift", "kotlin"],
    data: ["data", "analytics", "science", "machine learning", "ai", "artificial intelligence", "statistics", "visualization", "python", "analysis", "big data"],
    design: ["design", "ui", "ux", "user experience", "figma", "adobe", "graphic", "visual", "animation"],
    devops: ["devops", "cloud", "aws", "azure", "docker", "kubernetes", "ci/cd", "pipeline", "deployment"],
    security: ["security", "cyber", "hacking", "penetration", "encryption", "protection", "firewall", "vulnerability", "ethical"],
    game: ["game", "unity", "unreal", "2d", "3d", "gaming", "development"],
    system: ["system", "admin", "administrator", "linux", "windows", "server", "network"],
    qa: ["qa", "quality", "test", "testing", "automation", "selenium", "cypress"],
    product: ["product", "manager", "management", "agile", "scrum", "roadmap"]
  };

  // Generate AI suggestion based on the prompt
  const generateAiSuggestion = (userPrompt: string) => {
    setIsAiThinking(true);
    
    setTimeout(() => {
      const promptLower = userPrompt.toLowerCase();
      let suggestion = '';
      
      // Simple AI suggestion based on keyword matching
      if (promptLower.includes('beginner') || promptLower.includes('start')) {
        suggestion = "I recommend starting with the fundamentals before moving to more advanced topics. Based on your interests, a structured approach focusing on core concepts first would be most beneficial.";
      } else if (promptLower.includes('job') || promptLower.includes('career') || promptLower.includes('work')) {
        suggestion = "For career-focused learning, prioritize projects and skills that are in high demand. Consider creating a portfolio that showcases your abilities to potential employers.";
      } else if (promptLower.includes('time') || promptLower.includes('fast') || promptLower.includes('quick')) {
        suggestion = "For an accelerated learning path, focus on practical skills first and learn theory as you go. Project-based learning can help you progress quickly while building a portfolio.";
      } else {
        suggestion = "Based on your goals, I recommend a balanced approach of theory and practice. Make sure to build projects along the way to reinforce your learning and demonstrate your skills.";
      }
      
      setAiSuggestion(suggestion);
      setIsAiThinking(false);
    }, 1200);
  };

  // AI-enhanced roadmap generation
  const generateRoadmaps = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a career path or skill to generate roadmaps",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    generateAiSuggestion(prompt);
    
    // Simulate AI processing delay
    setTimeout(() => {
      let generatedRoadmaps: Roadmap[] = [];
      const promptLower = prompt.toLowerCase();
      
      // Check if user wants all technical job roadmaps
      if (promptLower.includes('all') && (promptLower.includes('technical') || promptLower.includes('tech') || promptLower.includes('jobs'))) {
        // Add one roadmap from each category
        Object.keys(demoRoadmaps).forEach(category => {
          if (demoRoadmaps[category] && demoRoadmaps[category].length > 0) {
            generatedRoadmaps.push(demoRoadmaps[category][0]);
          }
        });
      } else {
        // More sophisticated keyword matching with AI categories
        let categoryMatch = '';
        let highestMatchScore = 0;
        
        // Analyze prompt against AI categories
        Object.entries(aiCategories).forEach(([category, keywords]) => {
          const matchCount = keywords.filter(keyword => promptLower.includes(keyword)).length;
          if (matchCount > highestMatchScore) {
            highestMatchScore = matchCount;
            categoryMatch = category;
          }
        });
        
        // Map AI category to roadmap category
        if (categoryMatch === 'webdev') {
          if (promptLower.includes('back') || promptLower.includes('server') || promptLower.includes('api')) {
            generatedRoadmaps = demoRoadmaps.backend;
          } else {
            generatedRoadmaps = demoRoadmaps.frontend;
          }
        } else if (categoryMatch === 'data') {
          generatedRoadmaps = demoRoadmaps.datascience;
        } else if (categoryMatch === 'design') {
          generatedRoadmaps = demoRoadmaps.design;
        } else if (categoryMatch === 'devops' || categoryMatch === 'cloud') {
          generatedRoadmaps = demoRoadmaps.cloud;
        } else if (categoryMatch === 'security') {
          generatedRoadmaps = demoRoadmaps.security;
        } else if (categoryMatch === 'mobile') {
          generatedRoadmaps = demoRoadmaps.mobile;
        } else if (categoryMatch === 'game') {
          generatedRoadmaps = demoRoadmaps.game;
        } else if (categoryMatch === 'system') {
          generatedRoadmaps = demoRoadmaps.sysadmin;
        } else if (categoryMatch === 'qa') {
          generatedRoadmaps = demoRoadmaps.qa;
        } else if (categoryMatch === 'product') {
          generatedRoadmaps = demoRoadmaps.product;
        } else {
          // If no specific match, provide a mixed recommendation
          generatedRoadmaps = [
            demoRoadmaps.frontend[0],
            demoRoadmaps.backend[0],
            demoRoadmaps.datascience[0],
            demoRoadmaps.cloud[0]
          ];
        }
      }
      
      // Generate a custom AI roadmap based on the prompt
      const customRoadmap: Roadmap = {
        id: 999,
        title: `Custom AI Roadmap: ${prompt.charAt(0).toUpperCase() + prompt.slice(1)}`,
        description: `A personalized learning path generated specifically for your interest in ${prompt}`,
        icon: <Lightbulb className="h-8 w-8 text-indigo-500" />,
        difficulty: "intermediate",
        timeEstimate: "6-12 months",
        steps: [
          `Understand the fundamentals of ${prompt}`,
          `Learn essential tools and technologies for ${prompt}`,
          `Build basic projects to practice ${prompt} skills`,
          `Study advanced concepts in ${prompt}`,
          `Create a comprehensive portfolio project`,
          `Network with others in the ${prompt} field`,
          `Continue learning and stay updated with ${prompt} trends`
        ],
        resources: [
          { title: "Recommended Online Course", url: "#", type: "course", platform: "Udemy" },
          { title: "Essential Reading", url: "#", type: "book" },
          { title: "Community Forum", url: "#", type: "community", platform: "Reddit" },
          { title: "Video Tutorial Series", url: "#", type: "video", platform: "YouTube" }
        ],
        tools: [
          "VS Code or suitable IDE",
          "Git & GitHub",
          "Industry-standard frameworks",
          "Testing tools",
          "Documentation tools"
        ],
        platforms: [
          "Udemy",
          "Coursera",
          "edX",
          "Pluralsight",
          "YouTube",
          "Medium",
          "GitHub"
        ],
        certifications: [
          "Industry-recognized certifications",
          "Specialized platform certifications",
          "Skill-specific badges"
        ],
        aiGenerated: true
      };
      
      // Only add the custom roadmap if not showing all technical jobs
      if (!promptLower.includes('all') || !promptLower.includes('technical')) {
        generatedRoadmaps.push(customRoadmap);
      }
      
      setRoadmaps(generatedRoadmaps);
      setIsGenerating(false);
      
      toast({
        title: "AI Roadmaps generated!",
        description: `Created ${generatedRoadmaps.length} personalized roadmaps based on your goals.`,
      });
    }, 1500);
  };

  const toggleDetails = (id: number) => {
    if (showDetails === id) {
      setShowDetails(null);
    } else {
      setShowDetails(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Roadmap Generator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enter your desired career path or skill, and our AI will create personalized learning roadmaps.
            </p>
          </div>

          {/* Input Section */}
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mb-12">
            <div className="mb-4">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to learn?
              </label>
              <Textarea
                id="prompt"
                placeholder="e.g., frontend development, backend, data science, or something more specific like 'I want to become a web developer in 6 months'..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <Button 
              onClick={generateRoadmaps} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? "AI is generating..." : "Generate AI Roadmaps"}
            </Button>
          </div>

          {/* AI Suggestion Section */}
          {aiSuggestion && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Lightbulb className="text-blue-500 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-800">AI Learning Suggestion</h3>
                    <p className="text-blue-700 mt-1">{isAiThinking ? "Analyzing your learning goals..." : aiSuggestion}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {roadmaps.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center mb-8">Your AI Learning Roadmaps</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {roadmaps.map((roadmap) => (
                  <Card key={roadmap.id} className={`h-full transition-all duration-200 ${roadmap.aiGenerated ? 'border-indigo-200 shadow-md' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        {roadmap.icon}
                        <CardTitle>
                          {roadmap.title}
                          {roadmap.aiGenerated && (
                            <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                              AI Generated
                            </span>
                          )}
                        </CardTitle>
                      </div>
                      <CardDescription>{roadmap.description}</CardDescription>
                      {(roadmap.difficulty || roadmap.timeEstimate) && (
                        <div className="flex items-center gap-3 mt-2">
                          {roadmap.difficulty && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              roadmap.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                              roadmap.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {roadmap.difficulty.charAt(0).toUpperCase() + roadmap.difficulty.slice(1)}
                            </span>
                          )}
                          {roadmap.timeEstimate && (
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                              {roadmap.timeEstimate}
                            </span>
                          )}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium text-gray-800 mb-2">Learning Path:</h4>
                      <ol className="space-y-2 list-decimal list-inside mb-4">
                        {roadmap.steps.map((step, index) => (
                          <li key={index} className="text-gray-700">{step}</li>
                        ))}
                      </ol>
                      
                      {/* Tools Section */}
                      {roadmap.tools && roadmap.tools.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">Recommended Tools:</h4>
                          <div className="flex flex-wrap gap-2">
                            {roadmap.tools.map((tool, idx) => (
                              <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Platforms Section */}
                      {roadmap.platforms && roadmap.platforms.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">Learning Platforms:</h4>
                          <div className="flex flex-wrap gap-2">
                            {roadmap.platforms.map((platform, idx) => (
                              <span key={idx} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Certifications Section */}
                      {roadmap.certifications && roadmap.certifications.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">Relevant Certifications:</h4>
                          <ul className="space-y-1 list-disc list-inside">
                            {roadmap.certifications.map((cert, idx) => (
                              <li key={idx} className="text-sm text-gray-700">{cert}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {roadmap.resources && (
                        <div className="mt-4">
                          <button
                            onClick={() => toggleDetails(roadmap.id)}
                            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            {showDetails === roadmap.id ? (
                              <>
                                <ArrowUp className="h-4 w-4 mr-1" /> Hide detailed resources
                              </>
                            ) : (
                              <>
                                <ArrowDown className="h-4 w-4 mr-1" /> Show detailed resources
                              </>
                            )}
                          </button>
                          
                          {showDetails === roadmap.id && (
                            <div className="mt-3 space-y-2 pl-2 border-l-2 border-blue-100">
                              <h4 className="font-medium text-gray-700">Recommended Resources:</h4>
                              <ul className="space-y-2">
                                {roadmap.resources.map((resource, idx) => (
                                  <li key={idx} className="text-sm">
                                    <div className="flex items-start">
                                      {resource.type === 'book' && <BookMarked className="h-4 w-4 mr-2 text-blue-500" />}
                                      {resource.type === 'video' && <Youtube className="h-4 w-4 mr-2 text-red-500" />}
                                      {resource.type === 'course' && <BookOpen className="h-4 w-4 mr-2 text-green-500" />}
                                      {resource.type === 'article' && <FileTextIcon className="h-4 w-4 mr-2 text-yellow-500" />}
                                      {resource.type === 'tool' && <LaptopIcon className="h-4 w-4 mr-2 text-purple-500" />}
                                      {resource.type === 'community' && <UsersIcon className="h-4 w-4 mr-2 text-indigo-500" />}
                                      <div>
                                        <span className="font-medium">{resource.title}</span>
                                        {resource.platform && (
                                          <span className="text-xs text-gray-500 ml-2">
                                            on {resource.platform}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Save Roadmap</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoadmapGenerator;
