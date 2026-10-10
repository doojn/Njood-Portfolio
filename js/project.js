document.addEventListener("DOMContentLoaded", () => {
    // Shared projects array (in a real app, this would be fetched from a JSON file)
    const projects = [
        { id: 0, title: "compUsition (Senior Capstone)", description: "My defining senior thesis and capstone project. A dynamic video composition exploring visual rhythm, balance, and the intersection of media.", imageUrl: "assets/compusition_real.png", domain: "immersive" },
        { id: 1, title: "This is all a big test", description: "Interactive multimedia installation produced at Diriyah Art Futures (DAF), exploring new media, scale, and experimental systems.", imageUrl: "assets/daf_real.jpg", domain: "immersive" },
        { id: 2, title: "Compromise", description: "Documentation of the artwork exploring physical-digital interaction and sensory space.", imageUrl: "assets/compromise_real.png", domain: "immersive" },
        { id: 3, title: "Void Tinted Glasses", description: "An experimental video piece emphasizing post-production sound design and visual editing.", imageUrl: "assets/void_real.png", domain: "animation" },
        { id: 4, title: "Consumption", description: "Video / Performance art exploring concepts that transcend verbal explanation.", imageUrl: "assets/simulation_real.png", domain: "immersive" },
        { id: 5, title: "Imitation", description: "A video piece exploring our companionship with non-human nature.", imageUrl: "assets/3dfinal_real.png", domain: "animation" },
        { id: 6, title: "I am (still) here", description: "Augmented Reality / 2D Animation exploring the non-linearity of time and memory in space.", imageUrl: "assets/iamhere_real.png", domain: "animation" },
        { id: 7, title: "Waves", description: "2D Morph Animation exploring sleep-deprived thoughts of curls going down a drain and their reflection on the water.", imageUrl: "assets/waves_real.png", domain: "animation" },
        { id: 8, title: "I am here (A Walk Through Memory Lane)", description: "Augmented Reality installation exploring how memories exist as light particles.", imageUrl: "assets/memorylane_real.png", domain: "immersive" },
        { id: 9, title: "Interviews & Press", description: "A collection of interviews discussing my artistic practice, teaching philosophy, and the intersection of physical and digital art.", imageUrl: "assets/interviews_real.png", domain: "press" },
        { id: 10, title: "3D Printing Experiments", description: "Explorations into physical fabrication and rapid prototyping.", imageUrl: "assets/3dprinting_real.jpg", domain: "fabrication" },
        { id: 11, title: "3D Scanning Archives", description: "Digitizing physical space and artifacts via photogrammetry and scanning.", imageUrl: "assets/3dscanning_real.jpg", domain: "fabrication" }
    ];

    const params = new URLSearchParams(window.location.search);
    const projectId = parseInt(params.get('id')) || 0;
    
    const project = projects.find(p => p.id === projectId) || projects[0];

    // Populate Main Content
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-desc').textContent = project.description;
    
    // Generate a random view count for the Youtube aesthetic!
    const randomViews = Math.floor(Math.random() * 900) + 10;
    document.getElementById('project-domain').textContent = `${randomViews}K views • ${project.domain.toUpperCase()}`;
    
    // Check localStorage in case they dropped a custom image for this!
    const savedImg = localStorage.getItem(`custom_img_${project.id}`);
    document.getElementById('project-hero-img').src = savedImg || project.imageUrl;

    // Populate Suggestions (Exclude current)
    const suggestionsContainer = document.getElementById('suggestions-list');
    const suggestions = projects.filter(p => p.id !== projectId).slice(0, 6);

    suggestions.forEach(sug => {
        const savedSugImg = localStorage.getItem(`custom_img_${sug.id}`);
        const imgSrc = savedSugImg || sug.imageUrl;

        const a = document.createElement('a');
        a.href = `project.html?id=${sug.id}`;
        a.className = "suggestion-card hover-target";
        a.innerHTML = `
            <img src="${imgSrc}" class="sug-img" alt="${sug.title}">
            <div class="sug-info">
                <div class="sug-title">${sug.title}</div>
                <div class="sug-domain">Njood Albawardi • ${sug.domain}</div>
            </div>
        `;
        suggestionsContainer.appendChild(a);
    });
});
