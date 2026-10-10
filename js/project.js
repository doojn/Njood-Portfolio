document.addEventListener("DOMContentLoaded", () => {
    // Projects Data
    const projects = [
        {
                "id": 12,
                "title": "Composition (BFA Capstone #2)",
                "description": "My second senior thesis and capstone project. A dynamic video composition exploring identity, visual rhythm, balance, and the intersection of animation and mediums.\n\nMade with Laser engraving, Cricut Air, Digital Embroidery Machine, AxiDraw Pen plotter machine.",
                "imageUrl": "assets/compusition_real.png",
                "videoUrl": "assets/composition_video.mp4",
                "stills": [],
                "domain": "immersive"
        },
        {
                "id": 0,
                "title": "comp(U)s(I)tion (BFA Capstone #1)",
                "description": "My defining senior thesis and capstone project.\n\nPLA Filament, FDM 3D Printing, Camera, Electronics, Touchdesigner.\n\nExamines the misconception that machines exist separately from humanity. Comp(u)s(i)tion highlights how machines are shaped by human biases, beliefs, and systems, making them inseparable from the human experience. Through interactive engagement, the piece reflects on the ways people influence and are influenced by technology. Rather than positioning machines as autonomous entities, the work presents them as extensions of human interactions. By making audience presence an integral part of the piece, it encourages reflection on agency, perception, and the evolving dynamic between humanity and technology. Technology is not a distant or fixed force—it is built through human conversations and choices, and just as it is made, it can be changed for the better.",
                "imageUrl": "assets/artwork_0.jpg",
                "videoUrl": "assets/compusition_video.mp4",
                "stills": [
                        "assets/dropped_img_1.jpg",
                        "assets/dropped_img_2.jpg",
                        "assets/dropped_img_3.jpg"
                ],
                "domain": "immersive"
        },
        {
                "id": 1,
                "title": "This is all a big test",
                "description": "Interactive multimedia installation produced at Diriyah Art Futures (DAF), exploring new media, scale, and experimental systems.",
                "imageUrl": "assets/daf_real.jpg",
                "videoUrl": "",
                "stills": [],
                "domain": "immersive"
        },
        {
                "id": 2,
                "title": "Compromise",
                "description": "Documentation of the artwork exploring physical-digital interaction and sensory space.",
                "imageUrl": "assets/compromise_real.png",
                "videoUrl": "assets/compromise_video.mp4",
                "stills": [],
                "domain": "immersive"
        },
        {
                "id": 3,
                "title": "Void Tinted Glasses",
                "description": "Mixed Media Short film\n\nDirected and edited by Njood Albawardi",
                "imageUrl": "assets/void_real.png",
                "videoUrl": "assets/void_video.mp4",
                "stills": [],
                "domain": "animation"
        },
        {
                "id": 4,
                "title": "Consumption",
                "description": "Video / Performance art exploring concepts that transcend verbal explanation.",
                "imageUrl": "assets/consumption_real.png",
                "videoUrl": "assets/consumption.mp4",
                "stills": [],
                "domain": "immersive"
        },
        {
                "id": 5,
                "title": "Imitation",
                "description": "A video piece exploring our companionship with non-human nature.",
                "imageUrl": "assets/3dfinal_real.png",
                "videoUrl": "",
                "stills": [],
                "domain": "animation"
        },
        {
                "id": 6,
                "title": "I am (still) here",
                "description": "Augmented Reality / 2D Animation exploring the non-linearity of time and memory in space.",
                "imageUrl": "assets/iamhere_real.png",
                "videoUrl": "assets/iamhere_video.mp4",
                "stills": [],
                "domain": "animation"
        },
        {
                "id": 7,
                "title": "Waves",
                "description": "2D Morph Animation exploring sleep-deprived thoughts of curls going down a drain and their reflection on the water.",
                "imageUrl": "assets/waves_real.png",
                "videoUrl": "assets/waves_video.mp4",
                "stills": [],
                "domain": "animation"
        },
        {
                "id": 8,
                "title": "I am here (A Walk Through Memory Lane)",
                "description": "Augmented Reality installation exploring how memories exist as light particles.",
                "imageUrl": "assets/memorylane_real.png",
                "videoUrl": "",
                "stills": [],
                "domain": "immersive"
        },
        {
                "id": 9,
                "title": "Interviews & Press",
                "description": "https://www.spa.gov.sa/en/N2657240 \n\nhttps://www.ksaart.com/continuum-26-opens-in-riyadh-with-a-new-generation-of-new-media-artists/ \n\nhttps://artmena.com/news/continuum-26-diriyah-art-futures",
                "imageUrl": "assets/artwork_9.png",
                "videoUrl": "",
                "stills": [],
                "domain": "press"
        },
        {
                "id": 10,
                "title": "3D Printing Experiments",
                "description": "Explorations into physical fabrication and rapid prototyping.",
                "imageUrl": "assets/artwork_10.jpg",
                "videoUrl": "",
                "stills": [],
                "domain": "fabrication"
        },
        {
                "id": 11,
                "title": "3D Scanning Archives",
                "description": "Digitizing physical space and artifacts via photogrammetry and scanning.",
                "imageUrl": "assets/3dscan_real.png",
                "videoUrl": "assets/3dscan_video.mp4",
                "stills": [],
                "domain": "fabrication"
        }
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
    
    // Clear any stale local overrides so official project data always renders correctly
    try {
        Object.keys(localStorage).forEach(k => {
            if (k.startsWith('custom_img_')) localStorage.removeItem(k);
        });
    } catch(e) {}

    // Media Rendering: Video if available, otherwise High-Res Image
    const mediaContainer = document.getElementById('main-media');
    const heroImg = project.imageUrl;

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
        const imgSrc = sug.imageUrl;

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
