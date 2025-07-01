export default defineEventHandler(async (event) => {
    const works = [
        {
            "id": 1,
            "title": "Brico Jardi",
            "imgSrc": "/brico-jardi.webp",
            "imgAlt": "capture d'écran de la page d'accueil de Brico Jardi",
            "category": "Frontend",
            "techno": "Nuxt.js",
            "description": "Développement frontend avec Nuxt.js d'un site vitrine. Mise en place du routing, composants réutilisables et interface responsive.",
            "repo": "https://github.com/MarineGsell/BricoJardiNuxt",
            "link": "https://www.bricojardi.com/" 
        },
        {
            "id": 2,
            "title": "Mon vieux grimoire",
            "imgSrc": "mon-vieux-grimoire.webp",
            "imgAlt": "capture d'écran de la page d'accueil de mon vieux grimoire",
            "category": "Backend",
            "techno": "Node.js",
            "description": "Développement backend avec Node.js d'une API REST. Gestion de l'authentification JWT, upload de fichiers et base de données MongoDB.",
            "repo": "https://github.com/MarineGsell/mon_vieux_grimoire",
            // "link": ""
        },
        {
            "id": 3,
            "title": "Kasa",
            "imgSrc": "kasa.webp",
            "imgAlt": "capture d'écran de la page d'accueil de Kasa",
            "category": "Frontend",
            "techno": "React.js",
            "description": "Application frontend React.js avec hooks et composants fonctionnels. Gestion d'état, routing React Router et intégration d'une API.",
            "repo": "https://github.com/MarineGsell/kasa",
            "link": "https://kasa-marinechopingsell.netlify.app/"
        },
        {
            "id": 4,
            "title": "Nina Caducci",
            "imgSrc": "nina-carducci.webp",
            "imgAlt": "capture d'écran de la page d'accueil de Nina Carducci",
            "category": "Performances & SEO",
            "techno": "HTML, CSS, JS",
            "description": "Audit et optimisation avec HTML/CSS/JS. Amélioration des performances Core Web Vitals, accessibilité et SEO technique.",
            "repo": "https://github.com/MarineGsell/Nina-Carducci-Dev",
            "link": "https://marinegsell.github.io/Nina-Carducci-Dev/"
        },
        {
            "id": 5,
            "title": "Sophie Bluel",
            "imgSrc": "sophie-b.webp",
            "imgAlt": "capture d'écran de la page d'accueil de Sophie Bluel",
            "category": "Frontend",
            "techno": "JavaScript",
            "description": "Développement frontend en JavaScript. Manipulation du DOM, gestion d'événements et intégration API pour interface d'administration.",
            "repo": "https://github.com/MarineGsell/Portfolio-architecte-sophie-bluel",
            // "link": ""
        }
    ]
    return works
})