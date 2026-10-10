document.addEventListener("DOMContentLoaded", () => {
    // Projects Data
    const projects = [
        { id: 0, title: "compUsition (Senior Capstone)", description: "My defining senior thesis and capstone project. A dynamic video composition exploring visual rhythm, balance, and the intersection of media.", imageUrl: "assets/compusition_real.png", videoUrl: "", stills: ["assets/dropped_img_1.jpg", "assets/dropped_img_2.jpg", "assets/dropped_img_3.jpg"], domain: "immersive" },
        { id: 1, title: "This is all a big test", description: "Interactive multimedia installation produced at Diriyah Art Futures (DAF), exploring new media, scale, and experimental systems.", imageUrl: "assets/daf_real.jpg", videoUrl: "", stills: [], domain: "immersive" },
        { id: 2, title: "Compromise", description: "Documentation of the artwork exploring physical-digital interaction and sensory space.", imageUrl: "assets/compromise_real.png", videoUrl: "assets/compromise_video.mp4", stills: [], domain: "immersive" },
        { id: 3, title: "Void Tinted Glasses", description: "An experimental video piece emphasizing post-production sound design and visual editing.", imageUrl: "assets/void_real.png", videoUrl: "", stills: [], domain: "animation" },
        { id: 4, title: "Consumption", description: "Video / Performance art exploring concepts that transcend verbal explanation.", imageUrl: "assets/simulation_real.png", videoUrl: "assets/simulation_video.mp4", stills: [], domain: "immersive" },
        { id: 5, title: "Imitation", description: "A video piece exploring our companionship with non-human nature.", imageUrl: "assets/3dfinal_real.png", videoUrl: "", stills: [], domain: "animation" },
        { id: 6, title: "I am (still) here", description: "Augmented Reality / 2D Animation exploring the non-linearity of time and memory in space.", imageUrl: "assets/iamhere_real.png", videoUrl: "assets/iamhere_video.mp4", stills: [], domain: "animation" },
        { id: 7, title: "Waves", description: "2D Morph Animation exploring sleep-deprived thoughts of curls going down a drain and their reflection on the water.", imageUrl: "assets/waves_real.png", videoUrl: "assets/waves_video.mp4", stills: [], domain: "animation" },
        { id: 8, title: "I am here (A Walk Through Memory Lane)", description: "Augmented Reality installation exploring how memories exist as light particles.", imageUrl: "assets/memorylane_real.png", videoUrl: "", stills: [], domain: "immersive" },
        { id: 9, title: "Interviews & Press", description: "A collection of interviews discussing my artistic practice, teaching philosophy, and the intersection of physical and digital art.", imageUrl: "assets/interviews_real.png", videoUrl: "", stills: [], domain: "press" },
        { id: 10, title: "3D Printing Experiments", description: "Explorations into physical fabrication and rapid prototyping.", imageUrl: "assets/3dprinting_real.jpg", videoUrl: "", stills: [], domain: "fabrication" },
        { id: 11, title: "3D Scanning Archives", description: "Digitizing physical space and artifacts via photogrammetry and scanning.", imageUrl: "assets/3dscanning_real.jpg", videoUrl: "", stills: [], domain: "fabrication" }
    ];

    const params = new URLSearchParams(window.location.search);
    const projectId = parseInt(params.get('id')) || 0;
    
    const project = projects.find(p => p.id === projectId) || projects[0];

    // Populate Main Content
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-desc').textContent = project.description;
    
    // View counter
    const randomViews = Math.floor(Math.random() * 900) + 10;
    document.getElementById('project-domain').textContent = `${randomViews}K views • ${project.domain.toUpperCase()} • NJOOD ALBAWARDI`;
    
    // Media Rendering: Video if available, otherwise High-Res Image
    const mediaContainer = document.getElementById('main-media');
    const savedImg = localStorage.getItem(`custom_img_${project.id}`);
    const heroImg = savedImg || project.imageUrl;

    if (project.videoUrl) {
        mediaContainer.innerHTML = `
            <video controls autoplay loop playsinline poster="${heroImg}" style="width: 100%; height: 100%; object-fit: contain; background: #000;">
                <source src="${project.videoUrl}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
        `;
    } else {
        mediaContainer.innerHTML = `
            <img src="${heroImg}" id="project-hero-img" alt="${project.title}" style="width: 100%; height: 100%; object-fit: contain; background: #050505;">
        `;
    }

    // Render Stills Gallery if present
    const stillsGallery = document.getElementById('project-stills-gallery');
    if (stillsGallery && project.stills && project.stills.length > 0) {
        stillsGallery.innerHTML = '<h3 style="grid-column: 1/-1; font-size: 14px; font-weight: 600; color: #606060; margin-bottom: 4px;">PROJECT STILLS & DOCUMENTATION</h3>';
        project.stills.forEach(still => {
            const img = document.createElement('img');
            img.src = still;
            img.alt = "Project Still";
            img.style.cssText = "width: 100%; height: 120px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 1px solid #e5e5e5; transition: transform 0.2s;";
            img.addEventListener('mouseenter', () => img.style.transform = "scale(1.03)");
            img.addEventListener('mouseleave', () => img.style.transform = "scale(1)");
            img.addEventListener('click', () => {
                if (!project.videoUrl) {
                    document.getElementById('project-hero-img').src = still;
                }
            });
            stillsGallery.appendChild(img);
        });
    }

    // Populate Suggestions (Exclude current project)
    const suggestionsContainer = document.getElementById('suggestions-list');
    const suggestions = projects.filter(p => p.id !== projectId);

    suggestions.forEach(sug => {
        const savedSugImg = localStorage.getItem(`custom_img_${sug.id}`);
        const imgSrc = savedSugImg || sug.imageUrl;

        const a = document.createElement('a');
        a.href = `project.html?id=${sug.id}`;
        a.className = "suggestion-card";
        a.innerHTML = `
            <div style="position: relative; width: 168px; aspect-ratio: 16/9;">
                <img src="${imgSrc}" class="sug-img" alt="${sug.title}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">
                ${sug.videoUrl ? '<span style="position:absolute; bottom:4px; right:4px; background:rgba(0,0,0,0.8); color:white; font-size:10px; padding:2px 4px; border-radius:3px;">VIDEO</span>' : ''}
            </div>
            <div class="sug-info">
                <div class="sug-title">${sug.title}</div>
                <div class="sug-domain">Njood Albawardi • ${sug.domain}</div>
            </div>
        `;
        suggestionsContainer.appendChild(a);
    });
});
