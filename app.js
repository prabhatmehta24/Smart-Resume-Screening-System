let resumes = [
    {
        id: 1,
        name: "Rajesh Kumar",
        email: "rajesh.kumar@email.com",
        phone: "+91-9876543210",
        skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL", "Pandas"],
        experience: 5,
        education: "B.Tech in Computer Science",
        resumeText: "Experienced Python developer with 5 years of expertise in machine learning and data analysis. Proficient in TensorFlow, scikit-learn, Pandas, and SQL. Built multiple ML models for predictive analytics.",
        uploadDate: new Date('2024-10-15')
    },
    {
        id: 2,
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        phone: "+91-9876543211",
        skills: ["JavaScript", "React", "Node.js", "MongoDB", "HTML", "CSS", "Express"],
        experience: 3,
        education: "MCA from Delhi University",
        resumeText: "Full Stack Developer with 3 years experience. Expert in MERN stack - MongoDB, Express, React, and Node.js. Built multiple web applications with responsive design and RESTful APIs.",
        uploadDate: new Date('2024-10-18')
    },
    {
        id: 3,
        name: "Amit Patel",
        email: "amit.patel@email.com",
        phone: "+91-9876543212",
        skills: ["Java", "Spring Boot", "MySQL", "AWS", "Docker", "Kubernetes", "Microservices"],
        experience: 6,
        education: "B.E. in Information Technology",
        resumeText: "Senior Java Developer with 6 years experience in enterprise applications. Expertise in Spring Boot, microservices architecture, and cloud deployment on AWS. Strong knowledge of Docker and Kubernetes.",
        uploadDate: new Date('2024-10-20')
    },
    {
        id: 4,
        name: "Sneha Reddy",
        email: "sneha.reddy@email.com",
        phone: "+91-9876543213",
        skills: ["Data Science", "Python", "R", "Statistics", "Tableau", "Power BI", "Machine Learning"],
        experience: 4,
        education: "M.Sc. in Data Science",
        resumeText: "Data Scientist with 4 years of experience in statistical analysis and machine learning. Proficient in Python, R, and data visualization tools like Tableau and Power BI. Published research in ML applications.",
        uploadDate: new Date('2024-10-22')
    },
    {
        id: 5,
        name: "Vikram Singh",
        email: "vikram.singh@email.com",
        phone: "+91-9876543214",
        skills: ["DevOps", "AWS", "Azure", "Jenkins", "Docker", "Terraform", "Linux", "CI/CD"],
        experience: 5,
        education: "B.Tech in Electronics",
        resumeText: "DevOps Engineer with 5 years experience in cloud infrastructure and automation. Expert in AWS and Azure cloud platforms, CI/CD pipelines using Jenkins, infrastructure as code with Terraform, and containerization.",
        uploadDate: new Date('2024-10-25')
    },
    {
        id: 6,
        name: "Ananya Iyer",
        email: "ananya.iyer@email.com",
        phone: "+91-9876543215",
        skills: ["UI/UX Design", "Figma", "Adobe XD", "HTML", "CSS", "JavaScript", "Prototyping"],
        experience: 3,
        education: "Bachelor of Design",
        resumeText: "UI/UX Designer with 3 years of experience creating user-centered designs. Proficient in Figma, Adobe XD, and prototyping tools. Strong understanding of HTML, CSS, and JavaScript for design implementation.",
        uploadDate: new Date('2024-10-28')
    }
];

// Sample Job Descriptions
let jobs = [
    {
        id: 1,
        title: "Senior Python Developer",
        company: "Tech Innovations Pvt Ltd",
        description: "Looking for an experienced Python developer to work on machine learning projects. Must have strong knowledge of ML frameworks and data analysis.",
        requiredSkills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL"],
        experienceRequired: 4,
        createdDate: new Date('2024-10-01')
    },
    {
        id: 2,
        title: "Full Stack Engineer",
        company: "WebSoft Solutions",
        description: "Seeking a Full Stack Developer proficient in modern JavaScript frameworks. Experience with MERN stack is essential.",
        requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB", "REST API"],
        experienceRequired: 3,
        createdDate: new Date('2024-10-05')
    },
    {
        id: 3,
        title: "Cloud DevOps Specialist",
        company: "CloudTech Systems",
        description: "Need a DevOps engineer with strong cloud and automation skills. AWS certification preferred.",
        requiredSkills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
        experienceRequired: 4,
        createdDate: new Date('2024-10-10')
    }
];

// Matching results storage
let matchingResults = [];

// Current state
let currentState = {
    selectedJobId: null,
    currentPage: 'home'
};

// ==========================================
// NAVIGATION
// ==========================================

function navigateTo(page) {
    // Remove active class from all pages and nav links
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    
    // Add active class to selected page and nav link
    document.getElementById(`page-${page}`).classList.add('active');
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    
    currentState.currentPage = page;
    
    // Update content based on page
    if (page === 'home') {
        updateStats();
    } else if (page === 'jobs') {
        renderJobList();
        populateSampleJobSelect();
    } else if (page === 'results') {
        populateJobSelect();
    }
}

// Event listeners for navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateTo(page);
        });
    });
    
    // Initialize
    updateStats();
    setupFormHandlers();
    setupResumePreview();
});

// ==========================================
// STATISTICS & ANIMATIONS
// ==========================================

function updateStats() {
    animateCounter('stat-resumes', resumes.length);
    animateCounter('stat-jobs', jobs.length);
}

function animateCounter(elementId, target) {
    const element = document.getElementById(elementId);
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

function showDemo() {
    showToast('Demo mode: Sample data is already loaded. Try uploading a resume or matching candidates!');
    navigateTo('upload');
}

// ==========================================
// RESUME UPLOAD & PROCESSING
// ==========================================

function setupFormHandlers() {
    // Resume form submission
    const resumeForm = document.getElementById('resume-form');
    if (resumeForm) {
        resumeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processResume();
        });
    }
    
    // Job form submission
    const jobForm = document.getElementById('job-form');
    if (jobForm) {
        jobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveJobDescription();
        });
    }
    
    // File upload drag and drop
    const dragDropZone = document.getElementById('drag-drop-zone');
    if (dragDropZone) {
        dragDropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        dragDropZone.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        
        dragDropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            handleFileUpload(file);
        });
    }
    
    const fileUpload = document.getElementById('file-upload');
    if (fileUpload) {
        fileUpload.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFileUpload(this.files[0]);
            }
        });
    }
    
    // Sample job selection
    const sampleJobSelect = document.getElementById('sample-job-select');
    if (sampleJobSelect) {
        sampleJobSelect.addEventListener('change', function() {
            if (this.value) {
                loadSampleJob(parseInt(this.value));
            }
        });
    }
    
    // Sort and filter
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortResults(this.value);
        });
    }
    
    const scoreFilter = document.getElementById('score-filter');
    if (scoreFilter) {
        scoreFilter.addEventListener('input', function() {
            document.getElementById('score-value').textContent = this.value + '%+';
            filterResults(parseInt(this.value));
        });
    }
}

function setupResumePreview() {
    const resumeText = document.getElementById('resume-text');
    if (resumeText) {
        resumeText.addEventListener('input', function() {
            const preview = document.getElementById('resume-preview');
            if (this.value.trim()) {
                preview.textContent = this.value;
            } else {
                preview.innerHTML = '<p class="text-muted">Resume content will appear here as you type...</p>';
            }
        });
    }
}

function handleFileUpload(file) {
    // Simulate file processing
    showToast(`File "${file.name}" uploaded. In production, text would be extracted from the file.`);
    // For demo, just show a sample text
    document.getElementById('resume-text').value = 'Sample resume text extracted from ' + file.name;
    document.getElementById('resume-preview').textContent = 'Sample resume text extracted from ' + file.name;
}

function processResume() {
    const name = document.getElementById('candidate-name').value;
    const email = document.getElementById('candidate-email').value;
    const phone = document.getElementById('candidate-phone').value;
    const experience = parseInt(document.getElementById('candidate-experience').value);
    const education = document.getElementById('candidate-education').value;
    const resumeText = document.getElementById('resume-text').value;
    
    // Show loading
    const submitBtn = document.querySelector('#resume-form button[type="submit"]');
    const submitText = document.getElementById('submit-text');
    const submitLoader = document.getElementById('submit-loader');
    
    submitText.style.display = 'none';
    submitLoader.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Simulate NLP processing
    setTimeout(() => {
        // Extract skills from resume text (simple keyword matching)
        const extractedSkills = extractSkills(resumeText);
        
        // Create new resume object
        const newResume = {
            id: resumes.length + 1,
            name: name,
            email: email,
            phone: phone,
            skills: extractedSkills,
            experience: experience,
            education: education,
            resumeText: resumeText,
            uploadDate: new Date()
        };
        
        resumes.push(newResume);
        
        // Reset form
        document.getElementById('resume-form').reset();
        document.getElementById('resume-preview').innerHTML = '<p class="text-muted">Resume content will appear here as you type...</p>';
        
        // Reset button
        submitText.style.display = 'inline';
        submitLoader.style.display = 'none';
        submitBtn.disabled = false;
        
        showToast('Resume processed successfully! ' + extractedSkills.length + ' skills identified.');
        updateStats();
    }, 2000);
}

// NLP Skill Extraction (simple keyword matching)
function extractSkills(text) {
    const commonSkills = [
        'Python', 'JavaScript', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Go',
        'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot',
        'HTML', 'CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
        'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform',
        'Machine Learning', 'Deep Learning', 'NLP', 'TensorFlow', 'PyTorch', 'scikit-learn',
        'Data Analysis', 'Data Science', 'Statistics', 'Pandas', 'NumPy',
        'Git', 'CI/CD', 'Agile', 'Scrum', 'DevOps',
        'REST API', 'GraphQL', 'Microservices',
        'Figma', 'Adobe XD', 'UI/UX Design', 'Prototyping',
        'Linux', 'Unix', 'Bash', 'PowerShell',
        'R', 'Tableau', 'Power BI', 'Excel'
    ];
    
    const textLower = text.toLowerCase();
    const foundSkills = [];
    
    commonSkills.forEach(skill => {
        if (textLower.includes(skill.toLowerCase())) {
            foundSkills.push(skill);
        }
    });
    
    return foundSkills;
}

// ==========================================
// JOB DESCRIPTION MANAGEMENT
// ==========================================

function saveJobDescription() {
    const title = document.getElementById('job-title').value;
    const company = document.getElementById('job-company').value;
    const experience = parseInt(document.getElementById('job-experience').value);
    const skills = document.getElementById('job-skills').value.split(',').map(s => s.trim());
    const description = document.getElementById('job-description').value;
    
    const newJob = {
        id: jobs.length + 1,
        title: title,
        company: company,
        description: description,
        requiredSkills: skills,
        experienceRequired: experience,
        createdDate: new Date()
    };
    
    jobs.push(newJob);
    
    // Reset form
    document.getElementById('job-form').reset();
    
    showToast('Job description saved successfully!');
    renderJobList();
    updateStats();
}

function populateSampleJobSelect() {
    const select = document.getElementById('sample-job-select');
    if (!select) return;
    
    select.innerHTML = '<option value="">-- Load a sample job --</option>';
    
    jobs.forEach(job => {
        const option = document.createElement('option');
        option.value = job.id;
        option.textContent = `${job.title} - ${job.company}`;
        select.appendChild(option);
    });
}

function loadSampleJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    document.getElementById('job-title').value = job.title;
    document.getElementById('job-company').value = job.company;
    document.getElementById('job-experience').value = job.experienceRequired;
    document.getElementById('job-skills').value = job.requiredSkills.join(', ');
    document.getElementById('job-description').value = job.description;
    
    showToast('Sample job loaded. You can modify and save it.');
}

function renderJobList() {
    const jobList = document.getElementById('job-list');
    if (!jobList) return;
    
    if (jobs.length === 0) {
        jobList.innerHTML = '<p class="text-muted">No job descriptions saved yet.</p>';
        return;
    }
    
    jobList.innerHTML = '';
    
    jobs.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.className = 'job-item';
        jobItem.innerHTML = `
            <div class="job-item-header">
                <div>
                    <div class="job-item-title">${job.title}</div>
                    <div class="job-item-company">${job.company} • ${job.experienceRequired}+ years</div>
                </div>
                <div class="job-item-actions">
                    <button class="btn btn-secondary" onclick="editJob(${job.id})">Edit</button>
                    <button class="btn btn-secondary" onclick="deleteJob(${job.id})">Delete</button>
                </div>
            </div>
            <div class="job-item-skills">
                ${job.requiredSkills.map(skill => `<span class="badge badge-primary">${skill}</span>`).join('')}
            </div>
        `;
        jobList.appendChild(jobItem);
    });
}

function editJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    document.getElementById('job-title').value = job.title;
    document.getElementById('job-company').value = job.company;
    document.getElementById('job-experience').value = job.experienceRequired;
    document.getElementById('job-skills').value = job.requiredSkills.join(', ');
    document.getElementById('job-description').value = job.description;
    
    // Remove the old job
    jobs = jobs.filter(j => j.id !== jobId);
    renderJobList();
    
    showToast('Job loaded for editing.');
}

function deleteJob(jobId) {
    if (confirm('Are you sure you want to delete this job description?')) {
        jobs = jobs.filter(j => j.id !== jobId);
        renderJobList();
        updateStats();
        showToast('Job description deleted.');
    }
}

// ==========================================
// RESUME MATCHING ALGORITHM
// ==========================================

function populateJobSelect() {
    const select = document.getElementById('job-select');
    if (!select) return;
    
    select.innerHTML = '<option value="">-- Select a job posting --</option>';
    
    jobs.forEach(job => {
        const option = document.createElement('option');
        option.value = job.id;
        option.textContent = `${job.title} - ${job.company}`;
        select.appendChild(option);
    });
}

function performMatching() {
    const jobId = parseInt(document.getElementById('job-select').value);
    
    if (!jobId) {
        showToast('Please select a job posting first.');
        return;
    }
    
    currentState.selectedJobId = jobId;
    const job = jobs.find(j => j.id === jobId);
    
    // Show job details
    displayJobDetails(job);
    
    // Show loading
    document.getElementById('matching-loader').style.display = 'block';
    document.getElementById('results-list').innerHTML = '';
    
    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        document.getElementById('progress-fill').style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 200);
    
    // Perform matching after delay
    setTimeout(() => {
        matchingResults = [];
        
        resumes.forEach(resume => {
            const score = calculateMatchScore(resume, job);
            const matchedSkills = resume.skills.filter(skill => 
                job.requiredSkills.some(reqSkill => 
                    reqSkill.toLowerCase() === skill.toLowerCase()
                )
            );
            const missingSkills = job.requiredSkills.filter(reqSkill => 
                !resume.skills.some(skill => 
                    skill.toLowerCase() === reqSkill.toLowerCase()
                )
            );
            
            matchingResults.push({
                resumeId: resume.id,
                jobId: job.id,
                score: score,
                matchedSkills: matchedSkills,
                missingSkills: missingSkills,
                experienceMatch: resume.experience >= job.experienceRequired
            });
        });
        
        // Sort by score
        matchingResults.sort((a, b) => b.score - a.score);
        
        // Hide loader and show results
        document.getElementById('matching-loader').style.display = 'none';
        displayResults();
        
        showToast(`Matching complete! ${matchingResults.length} candidates analyzed.`);
    }, 2500);
}

/**
 * Calculate match score using TF-IDF inspired approach and cosine similarity concept
 * Weights: Skills (40%), Keywords (40%), Experience (20%)
 */
function calculateMatchScore(resume, job) {
    let skillsScore = 0;
    let keywordsScore = 0;
    let experienceScore = 0;
    
    // Skills matching (40% weight)
    const matchedSkillsCount = resume.skills.filter(skill => 
        job.requiredSkills.some(reqSkill => 
            reqSkill.toLowerCase() === skill.toLowerCase()
        )
    ).length;
    
    if (job.requiredSkills.length > 0) {
        skillsScore = (matchedSkillsCount / job.requiredSkills.length) * 40;
    }
    
    // Keywords/text similarity (40% weight)
    // Simple approach: check how many job requirement keywords appear in resume
    const jobKeywords = extractKeywords(job.description);
    const resumeText = resume.resumeText.toLowerCase();
    
    let keywordMatches = 0;
    jobKeywords.forEach(keyword => {
        if (resumeText.includes(keyword.toLowerCase())) {
            keywordMatches++;
        }
    });
    
    if (jobKeywords.length > 0) {
        keywordsScore = (keywordMatches / jobKeywords.length) * 40;
    }
    
    // Experience matching (20% weight)
    if (resume.experience >= job.experienceRequired) {
        experienceScore = 20;
    } else if (resume.experience >= job.experienceRequired - 1) {
        experienceScore = 15;
    } else {
        experienceScore = (resume.experience / job.experienceRequired) * 10;
    }
    
    const totalScore = Math.min(Math.round(skillsScore + keywordsScore + experienceScore), 100);
    return totalScore;
}

function extractKeywords(text) {
    // Simple keyword extraction - remove common words
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being'];
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    return words.filter(word => word.length > 3 && !stopWords.includes(word));
}

function displayJobDetails(job) {
    const detailPanel = document.getElementById('selected-job-detail');
    if (!detailPanel) return;
    
    detailPanel.innerHTML = `
        <div style="margin-bottom: 16px;">
            <h4 style="font-size: 18px; margin-bottom: 8px;">${job.title}</h4>
            <p style="color: var(--color-text-secondary); font-size: 14px;">${job.company}</p>
        </div>
        <div style="margin-bottom: 16px;">
            <p style="font-weight: 500; margin-bottom: 8px;">Experience Required:</p>
            <p>${job.experienceRequired}+ years</p>
        </div>
        <div style="margin-bottom: 16px;">
            <p style="font-weight: 500; margin-bottom: 8px;">Required Skills:</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${job.requiredSkills.map(skill => `<span class="badge badge-primary">${skill}</span>`).join('')}
            </div>
        </div>
        <div>
            <p style="font-weight: 500; margin-bottom: 8px;">Description:</p>
            <p style="font-size: 14px; line-height: 1.6; color: var(--color-text-secondary);">${job.description}</p>
        </div>
    `;
}

function displayResults() {
    const resultsList = document.getElementById('results-list');
    if (!resultsList) return;
    
    document.getElementById('result-count').textContent = `(${matchingResults.length})`;
    
    if (matchingResults.length === 0) {
        resultsList.innerHTML = '<p class="text-muted">No matching results found.</p>';
        return;
    }
    
    resultsList.innerHTML = '';
    
    matchingResults.forEach(result => {
        const resume = resumes.find(r => r.id === result.resumeId);
        if (!resume) return;
        
        const scoreClass = result.score >= 80 ? 'score-high' : result.score >= 60 ? 'score-medium' : 'score-low';
        
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        resultCard.innerHTML = `
            <div class="result-header">
                <div class="result-info">
                    <h4>${resume.name}</h4>
                    <div class="result-contact">
                        ${resume.email} • ${resume.phone}
                    </div>
                </div>
                <div class="score-badge ${scoreClass}">
                    ${result.score}%
                </div>
            </div>
            
            <div class="result-skills">
                <h5>Matched Skills (${result.matchedSkills.length})</h5>
                <div class="skills-list">
                    ${result.matchedSkills.map(skill => `<span class="badge badge-success">${skill}</span>`).join('')}
                </div>
            </div>
            
            ${result.missingSkills.length > 0 ? `
                <div class="result-skills">
                    <h5>Missing Skills (${result.missingSkills.length})</h5>
                    <div class="skills-list">
                        ${result.missingSkills.map(skill => `<span class="badge badge-error">${skill}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="result-footer">
                <div class="experience-match">
                    Experience: ${resume.experience} years ${result.experienceMatch ? '✓' : '✗'}
                </div>
                <button class="btn btn-primary" onclick="showDetailModal(${resume.id})">
                    View Details
                </button>
            </div>
        `;
        
        resultsList.appendChild(resultCard);
    });
}

function sortResults(criteria) {
    if (matchingResults.length === 0) return;
    
    switch(criteria) {
        case 'score':
            matchingResults.sort((a, b) => b.score - a.score);
            break;
        case 'date':
            matchingResults.sort((a, b) => {
                const resumeA = resumes.find(r => r.id === a.resumeId);
                const resumeB = resumes.find(r => r.id === b.resumeId);
                return resumeB.uploadDate - resumeA.uploadDate;
            });
            break;
        case 'experience':
            matchingResults.sort((a, b) => {
                const resumeA = resumes.find(r => r.id === a.resumeId);
                const resumeB = resumes.find(r => r.id === b.resumeId);
                return resumeB.experience - resumeA.experience;
            });
            break;
    }
    
    displayResults();
}

function filterResults(minScore) {
    const allResults = [...matchingResults];
    matchingResults = allResults.filter(result => result.score >= minScore);
    displayResults();
    // Restore all results for future operations
    setTimeout(() => {
        matchingResults = allResults;
    }, 100);
}

function exportResults() {
    if (matchingResults.length === 0) {
        showToast('No results to export.');
        return;
    }
    
    // Create CSV content
    let csv = 'Rank,Name,Email,Phone,Score,Experience,Matched Skills,Missing Skills\n';
    
    matchingResults.forEach((result, index) => {
        const resume = resumes.find(r => r.id === result.resumeId);
        if (!resume) return;
        
        csv += `${index + 1},`;
        csv += `"${resume.name}",`;
        csv += `"${resume.email}",`;
        csv += `"${resume.phone}",`;
        csv += `${result.score}%,`;
        csv += `${resume.experience} years,`;
        csv += `"${result.matchedSkills.join(', ')}",`;
        csv += `"${result.missingSkills.join(', ')}"\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'matching_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    showToast('Results exported to CSV successfully!');
}

// ==========================================
// DETAIL MODAL
// ==========================================

function showDetailModal(resumeId) {
    const resume = resumes.find(r => r.id === resumeId);
    const result = matchingResults.find(r => r.resumeId === resumeId);
    
    if (!resume || !result) return;
    
    const job = jobs.find(j => j.id === currentState.selectedJobId);
    
    document.getElementById('modal-candidate-name').textContent = resume.name;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div style="margin-bottom: 24px;">
            <h3 style="font-size: 20px; margin-bottom: 16px; border-bottom: 2px solid var(--color-border); padding-bottom: 8px;">
                Candidate Information
            </h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                <div>
                    <p style="font-weight: 500; margin-bottom: 4px;">Email:</p>
                    <p style="color: var(--color-text-secondary);">${resume.email}</p>
                </div>
                <div>
                    <p style="font-weight: 500; margin-bottom: 4px;">Phone:</p>
                    <p style="color: var(--color-text-secondary);">${resume.phone}</p>
                </div>
                <div>
                    <p style="font-weight: 500; margin-bottom: 4px;">Experience:</p>
                    <p style="color: var(--color-text-secondary);">${resume.experience} years</p>
                </div>
                <div>
                    <p style="font-weight: 500; margin-bottom: 4px;">Education:</p>
                    <p style="color: var(--color-text-secondary);">${resume.education}</p>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 24px;">
            <h3 style="font-size: 20px; margin-bottom: 16px; border-bottom: 2px solid var(--color-border); padding-bottom: 8px;">
                Match Score: <span style="color: var(--color-primary);">${result.score}%</span>
            </h3>
            <div style="background: var(--color-bg-1); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 14px; line-height: 1.6;">
                    <strong>Score Breakdown:</strong><br>
                    • Skills Match: ${Math.round((result.matchedSkills.length / job.requiredSkills.length) * 40)}%<br>
                    • Experience Match: ${result.experienceMatch ? '20%' : '10%'}<br>
                    • Keyword Similarity: ~${Math.round(result.score - ((result.matchedSkills.length / job.requiredSkills.length) * 40) - (result.experienceMatch ? 20 : 10))}%
                </p>
            </div>
        </div>
        
        <div style="margin-bottom: 24px;">
            <h3 style="font-size: 20px; margin-bottom: 16px; border-bottom: 2px solid var(--color-border); padding-bottom: 8px;">
                Skills Analysis
            </h3>
            
            <div style="margin-bottom: 16px;">
                <h4 style="font-size: 16px; margin-bottom: 12px; color: var(--color-success);">✓ Matched Skills (${result.matchedSkills.length})</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${result.matchedSkills.map(skill => `<span class="badge badge-success">${skill}</span>`).join('')}
                </div>
            </div>
            
            ${result.missingSkills.length > 0 ? `
                <div style="margin-bottom: 16px;">
                    <h4 style="font-size: 16px; margin-bottom: 12px; color: var(--color-error);">✗ Missing Required Skills (${result.missingSkills.length})</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${result.missingSkills.map(skill => `<span class="badge badge-error">${skill}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div>
                <h4 style="font-size: 16px; margin-bottom: 12px; color: var(--color-info);">Additional Skills</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${resume.skills.filter(skill => !result.matchedSkills.includes(skill)).map(skill => 
                        `<span class="badge badge-primary">${skill}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 24px;">
            <h3 style="font-size: 20px; margin-bottom: 16px; border-bottom: 2px solid var(--color-border); padding-bottom: 8px;">
                Experience Comparison
            </h3>
            <div style="margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Required: ${job.experienceRequired} years</span>
                    <span>Candidate: ${resume.experience} years</span>
                </div>
                <div style="background: var(--color-secondary); height: 24px; border-radius: 12px; overflow: hidden;">
                    <div style="background: var(--color-primary); height: 100%; width: ${Math.min((resume.experience / job.experienceRequired) * 100, 100)}%; transition: width 0.5s;"></div>
                </div>
            </div>
            <p style="font-size: 14px; color: var(--color-text-secondary); margin-top: 8px;">
                ${result.experienceMatch ? 
                    '✓ Candidate meets the experience requirement' : 
                    '✗ Candidate has less experience than required'}
            </p>
        </div>
        
        <div>
            <h3 style="font-size: 20px; margin-bottom: 16px; border-bottom: 2px solid var(--color-border); padding-bottom: 8px;">
                Resume Text
            </h3>
            <div style="background: var(--color-bg-2); padding: 16px; border-radius: 8px; max-height: 200px; overflow-y: auto;">
                <p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${resume.resumeText}</p>
            </div>
        </div>
    `;
    
    document.getElementById('detail-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('detail-modal').classList.remove('active');
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('detail-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==========================================
// INITIALIZATION
// ==========================================

// Initialize stats on load
window.addEventListener('load', function() {
    updateStats();
});