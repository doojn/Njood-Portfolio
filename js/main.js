document.addEventListener("DOMContentLoaded", () => {
    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    const initHoverEffects = () => {
        const hoverTargets = document.querySelectorAll('a, .hover-target, .project-card');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            target.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    };

    initHoverEffects();

    // Projects Array with Domains
    const projects = [
        {
            id: 0,
            title: "compUsition (Senior Capstone)",
            description: "My defining senior thesis and capstone project. A dynamic video composition exploring visual rhythm, balance, and the intersection of media.",
            imageUrl: "assets/compusition_real.png",
            stills: ["assets/dropped_img_1.jpg", "assets/dropped_img_2.jpg", "assets/dropped_img_3.jpg"],
            domain: "immersive"
        },
        {
            id: 1,
            title: "Work at Diriyah Art Futures",
            description: "A showcase of my recent work and involvement at Diriyah Art Futures (DAF), focusing on new media and interactive arts.",
            imageUrl: "assets/daf_real.jpg",
            domain: "immersive"
        },
        {
            id: 2,
            title: "Compromise",
            description: "Documentation of the artwork exploring physical-digital interaction and sensory space.",
            imageUrl: "assets/compromise_real.png",
            domain: "immersive"
        },
        {
            id: 3,
            title: "Void Tinted Glasses",
            description: "An experimental video piece emphasizing post-production sound design and visual editing.",
            imageUrl: "assets/void_real.png",
            domain: "animation"
        },
        {
            id: 4,
            title: "Consumption",
            description: "Video / Performance art exploring concepts that transcend verbal explanation.",
            imageUrl: "assets/simulation_real.png",
            domain: "immersive"
        },
        {
            id: 5,
            title: "Imitation",
            description: "A video piece exploring our companionship with non-human nature.",
            imageUrl: "assets/3dfinal_real.png",
            domain: "animation"
        },
        {
            id: 6,
            title: "I am (still) here",
            description: "Augmented Reality / 2D Animation exploring the non-linearity of time and memory in space.",
            imageUrl: "assets/iamhere_real.png",
            domain: "animation"
        },
        {
            id: 7,
            title: "Waves",
            description: "2D Morph Animation exploring sleep-deprived thoughts of curls going down a drain and their reflection on the water.",
            imageUrl: "assets/waves_real.png",
            domain: "animation"
        },
        {
            id: 8,
            title: "I am here (A Walk Through Memory Lane)",
            description: "Augmented Reality installation exploring how memories exist as light particles.",
            imageUrl: "assets/memorylane_real.png",
            domain: "immersive"
        },
        {
            id: 9,
            title: "Interviews & Press",
            description: "A collection of interviews discussing my artistic practice, teaching philosophy, and the intersection of physical and digital art.",
            imageUrl: "assets/interviews_real.png",
            domain: "press"
        },
        {
            id: 10,
            title: "3D Printing Experiments",
            description: "Explorations into physical fabrication and rapid prototyping.",
            imageUrl: "assets/3dprinting_real.jpg",
            domain: "fabrication"
        },
        {
            id: 11,
            title: "3D Scanning Archives",
            description: "Digitizing physical space and artifacts via photogrammetry and scanning.",
            imageUrl: "assets/3dscanning_real.jpg",
            domain: "fabrication"
        }
    ];

    const galleries = {
        immersive: document.getElementById("gallery-immersive"),
        animation: document.getElementById("gallery-animation"),
        press: document.getElementById("gallery-press"),
        fabrication: document.getElementById("gallery-fabrication")
    };

    projects.forEach((proj, index) => {
        if(!galleries[proj.domain]) return;

        const card = document.createElement("a");
        card.href = `project.html?id=${proj.id}`;
        card.className = "project-card hover-target";
        card.style.display = "block";
        card.style.textDecoration = "none";
        
        let stillsHtml = '';
        if (proj.stills && proj.stills.length > 0) {
            stillsHtml = '<div class="stills-container">';
            proj.stills.forEach(still => {
                stillsHtml += `<img src="${still}" alt="Still frame">`;
            });
            stillsHtml += '</div>';
        }

        card.innerHTML = `
            <div class="project-img-wrapper">
                <img src="${proj.imageUrl}" alt="${proj.title}" class="main-img">
            </div>
            ${stillsHtml}
            <div class="project-info">
                <h3>${proj.title}</h3>
                <p>${proj.description}</p>
            </div>
        `;
        
        galleries[proj.domain].appendChild(card);
    });

    // Re-init hover effects for dynamically added elements
    initHoverEffects();

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up, .project-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // --- DRAG AND DROP FUNCTIONALITY ---
    // Allow the user to drag and drop their own images to replace placeholders
    const setupDragAndDrop = () => {
        const imageWrappers = document.querySelectorAll('.project-img-wrapper img, .stills-container img');
        
        imageWrappers.forEach((img, index) => {
            const dropZone = img.parentElement;
            
            // Check localStorage for previously saved dropped images
            const savedImage = localStorage.getItem(`custom_img_${index}`);
            if (savedImage) {
                img.src = savedImage;
            }

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.style.border = '2px dashed var(--magenta)';
            });

            dropZone.addEventListener('dragleave', () => {
                dropZone.style.border = 'none';
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.style.border = 'none';

                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    const file = e.dataTransfer.files[0];
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const dataUrl = event.target.result;
                            img.src = dataUrl;
                            // Save to localStorage so it persists on refresh!
                            localStorage.setItem(`custom_img_${index}`, dataUrl);

                            // Send to local server to physically save the file
                            fetch('http://localhost:3000/upload', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: index, dataUrl: dataUrl })
                            }).catch(err => console.log('Server not running to save file'));
                        };
                        reader.readAsDataURL(file);
                    }
                }
            });
        });

        // Sync all already saved images to the server!
        for (let i = 0; i < imageWrappers.length; i++) {
            const savedImage = localStorage.getItem(`custom_img_${i}`);
            if (savedImage) {
                fetch('http://localhost:3000/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: i, dataUrl: savedImage })
                }).then(res => res.json())
                  .then(data => console.log('Synced image', i, data.path))
                  .catch(err => {});
            }
        }
    };

    setupDragAndDrop();
});
