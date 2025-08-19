function createEducationField() {
    return `
        <div class="repeater-item">
            <button type="button" class="remove-button">x</button>
            <input type="text" placeholder="School Name" data-education-field="school">
            <input type="text" placeholder="Degree / Field of Study" data-education-field="degree">
            <input type="text" placeholder="Grade/GPA" data-education-field="grade">
            <input type="text" placeholder="Start Year - End Year" data-education-field="dates">
        </div>
    `;
}

function createExperienceField() {
    return `
        <div class="repeater-item">
            <button type="button" class="remove-button">x</button>
            <input type="text" placeholder="Job Title" data-experience-field="title">
            <input type="text" placeholder="Company Name" data-experience-field="company">
            <input type="text" placeholder="Start Date - End Date" data-experience-field="dates">
            <textarea rows="3" placeholder="Developed and maintained front-end web applications using modern JavaScript frameworks.
Collaborated with a team to design and implement new features.
Wrote clean, efficient, and well-documented code.
Ensured the responsiveness and cross-browser compatibility of websites." data-experience-field="description"></textarea>
        </div>
    `;
}

function updateResume() {
    document.getElementById('previewName').textContent = document.getElementById('name').value;
    const contactInfo = [
        document.getElementById('email').value,
        document.getElementById('phone').value,
        document.getElementById('linkedin').value,
    ];

    const previewContact = document.getElementById('previewContact');
    previewContact.innerHTML = '';
    contactInfo.forEach(info => {
        if (info) {
            const contactItem = document.createElement('div');
            contactItem.classList.add('contact-item');
            if (info.includes('@')) {
                contactItem.innerHTML = info;
            } else if (info.includes('linkedin.com')) {
                let linkedinUrl = info;
                if (!linkedinUrl.startsWith('http://') && !linkedinUrl.startsWith('https://')) {
                    linkedinUrl = `https://${linkedinUrl}`;
                }
                contactItem.innerHTML = `<a href="${linkedinUrl}" target="_blank">${info}</a>`;
            } else {
                contactItem.textContent = info;
            }
            previewContact.appendChild(contactItem);
        }
    });

    document.getElementById('previewProfile').textContent = document.getElementById('profile').value;

    const educationContainer = document.getElementById('educationContainer');
    const previewEducation = document.getElementById('previewEducation');
    previewEducation.innerHTML = '';
    let hasEducation = false;
    educationContainer.querySelectorAll('.repeater-item').forEach(item => {
        const school = item.querySelector('input[data-education-field="school"]').value;
        const degree = item.querySelector('input[data-education-field="degree"]').value;
        const grade = item.querySelector('input[data-education-field="grade"]').value;
        const dates = item.querySelector('input[data-education-field="dates"]').value;

        if (school || degree || grade || dates) {
            hasEducation = true;
            const educationItem = document.createElement('div');
            educationItem.classList.add('resume-item');
            let gradeHtml = grade ? `<div class="resume-item-subtitle">Grade: ${grade}</div>` : '';
            educationItem.innerHTML = `
                <div class="resume-item-header">
                    <div>
                        <div class="resume-item-title">${school}</div>
                        <div class="resume-item-subtitle">${degree}</div>
                        ${gradeHtml}
                    </div>
                    <div class="resume-item-dates">${dates}</div>
                </div>
            `;
            previewEducation.appendChild(educationItem);
        }
    });
    document.getElementById('previewEducationSection').classList.toggle('hidden', !hasEducation);

    const experienceContainer = document.getElementById('experienceContainer');
    const previewExperience = document.getElementById('previewExperience');
    previewExperience.innerHTML = '';
    let hasExperience = false;
    experienceContainer.querySelectorAll('.repeater-item').forEach(item => {
        const title = item.querySelector('input[data-experience-field="title"]').value;
        const company = item.querySelector('input[data-experience-field="company"]').value;
        const dates = item.querySelector('input[data-experience-field="dates"]').value;
        const description = item.querySelector('textarea[data-experience-field="description"]').value;

        if (title || company || dates || description) {
            hasExperience = true;
            const experienceItem = document.createElement('div');
            experienceItem.classList.add('resume-item');
            let descriptionHtml = '';
            if (description) {
                const descriptionLines = description.split('\n');
                descriptionHtml = descriptionLines.map(line => `<li class="resume-item-description">${line}</li>`).join('');
            }
            experienceItem.innerHTML = `
                <div class="resume-item-header">
                    <div>
                        <div class="resume-item-title">${title}</div>
                        <div class="resume-item-subtitle">${company}</div>
                    </div>
                    <div class="resume-item-dates">${dates}</div>
                </div>
                <ul class="description-list">${descriptionHtml}</ul>
            `;
            previewExperience.appendChild(experienceItem);
        }
    });
    document.getElementById('previewExperienceSection').classList.toggle('hidden', !hasExperience);

    const skills = document.getElementById('skills').value.split(',').map(s => s.trim()).filter(Boolean);
    const previewSkills = document.getElementById('previewSkills');
    previewSkills.innerHTML = '';
    let hasSkills = skills.length > 0;
    if (hasSkills) {
        const skillsList = document.createElement('ul');
        skillsList.classList.add('preview-skills-list');
        skills.forEach(skill => {
            const skillTag = document.createElement('li');
            skillTag.textContent = skill;
            skillTag.classList.add('skill-tag');
            
            if (skill.toLowerCase() === 'javascript') {
                skillTag.classList.add('js-skill');
            } else if (skill.toLowerCase() === 'react') {
                skillTag.classList.add('react-skill');
            }

            skillsList.appendChild(skillTag);
        });
        previewSkills.appendChild(skillsList);
    }
    document.getElementById('previewSkillsSection').classList.toggle('hidden', !hasSkills);
}

function initResumeBuilder() {
    const educationContainer = document.getElementById('educationContainer');
    educationContainer.innerHTML = createEducationField();

    const experienceContainer = document.getElementById('experienceContainer');
    experienceContainer.innerHTML = createExperienceField();
    
    updateResume();
}

document.getElementById('addEducation').addEventListener('click', () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = createEducationField();
    document.getElementById('educationContainer').appendChild(tempDiv.firstChild);
    updateResume();
});

document.getElementById('addExperience').addEventListener('click', () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = createExperienceField();
    document.getElementById('experienceContainer').appendChild(tempDiv.firstChild);
    updateResume();
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-button')) {
        e.target.closest('.repeater-item').remove();
        updateResume();
    }
});

document.getElementById('resumeForm').addEventListener('input', updateResume);

document.getElementById('clearForm').addEventListener('click', () => {
    document.getElementById('resumeForm').reset();
    document.getElementById('educationContainer').innerHTML = '';
    document.getElementById('experienceContainer').innerHTML = '';
    initResumeBuilder();
});

document.getElementById('downloadPdf').addEventListener('click', () => {
    const content = document.getElementById('resumePreview');
    const downloadButton = document.getElementById('downloadPdf');
    downloadButton.textContent = 'Generating PDF...';
    downloadButton.disabled = true;

    const formSection = document.querySelector('.form-section');
    formSection.style.display = 'none';
    
    html2canvas(content, {
        scale: 2,
        useCORS: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        doc.save('my-resume.pdf');
        
        formSection.style.display = 'block';
        downloadButton.textContent = 'Download as PDF';
        downloadButton.disabled = false;
    }).catch(error => {
        console.error("Error generating PDF:", error);
        formSection.style.display = 'block';
        downloadButton.textContent = 'Download as PDF';
        downloadButton.disabled = false;
    });
});

window.onload = initResumeBuilder;
