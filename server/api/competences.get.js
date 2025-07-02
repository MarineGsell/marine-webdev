import { tables, useDrizzle } from "../utils/drizzle"

export default defineEventHandler(async (event) => {
    // const competences = [
    //     {
    //         "id": 5,
    //         "title": "HTML",
    //         "rate": 5,
    //         "categorie": "Frontend",
    //     },  
    //     {
    //         "id": 4,
    //         "title": "CSS/Sass",
    //         "rate": 5,
    //         "categorie": "Frontend",
    //     },  
    //     {
    //         "id": 3,
    //         "title": "JavaScript",
    //         "rate": 4,
    //         "categorie": "Frontend",
    //     },  
    //     {
    //         "id": 6,
    //         "title": "React",
    //         "rate": 3,
    //         "categorie": "Frontend",
    //     },          
    //     {
    //         "id": 1,
    //         "title": "Vue.js",
    //         "rate": 3,
    //         "categorie": "Frontend",
    //     },
    //     {
    //         "id": 2,
    //         "title": "Nuxt.js",
    //         "rate": 3,
    //         "categorie": "Frontend",
    //     },    
    //     {
    //         "id": 7,
    //         "title": "Node.js",
    //         "rate": 2,
    //         "categorie": "Backend",
    //     },    
    //     {
    //         "id": 8,
    //         "title": "Express",
    //         "rate": 2,
    //         "categorie": "Backend",
    //     },    
    //     {
    //         "id": 10,
    //         "title": "API REST",
    //         "rate": 3,
    //         "categorie": "Backend",
    //     },    
    //     {
    //         "id": 11,
    //         "title": "Base de données",
    //         "rate": 2,
    //         "categorie": "Backend",
    //     },  
    //     {
    //         "id": 14,
    //         "title": "SEO",
    //         "rate": 3,
    //         "categorie": "Outils",
    //     }, 
    //     {
    //         "id": 9,
    //         "title": "Responsive",
    //         "rate": 4,
    //         "categorie": "Outils",
    //     },        
    //     {
    //         "id": 12,
    //         "title": "Figma",
    //         "rate": 3,
    //         "categorie": "Outils",
    //     },    
    //     {
    //         "id": 13,
    //         "title": "Git/Github",
    //         "rate": 2,
    //         "categorie": "Outils",
    //     }   
    // ]
    const competences = await useDrizzle().select().from(tables.competences).all()
    return competences
})