<script setup>
// ✨ Création des variables réactives pour chaque champ
const title = ref('')         // Stocke le titre
const category = ref('')      // Stocke la catégorie  
const photo = ref(null)       // Stocke le fichier photo
const photoPreview = ref(null)
const imgAlt = ref('')        // Stocke le texte alternatif
const repo = ref('')          // Stocke le lien github
const link = ref('')          // Stocke le lien du site
const description = ref(null) // Stocke la description

// 🚨 Variables pour stocker les erreurs
const errors = ref({
    title: '',
    category: '',
    imgAlt: '',
    repo: '',
    link: '',
    description: ''
})

// 🔍 Fonctions de validation pour chaque champ
const validateTitle = () => {
    if (!title.value.trim()) {
        errors.value.title = 'Vous devez indiquer le titre du projet'
        return false
    }
    if (title.value.trim().length < 2) {
        errors.value.title = 'Le titre doit contenir au moins 2 caractères'
        return false
    }
    errors.value.title = ''
    return true
}
const validateCategory = () => {
    if (!category.value.trim()) {
        errors.value.category = 'Vous devez indiquer une catégorie'
        return false
    }
    errors.value.category = ''
    return true
}
const validateImgAlt = () => {
    if (!imgAlt.value.trim()) {
        errors.value.imgAlt = 'Vous devez indiquer un texte alternatif'
        return false
    }
    errors.value.imgAlt = ''
    return true
}
const validateRepo = () => {
    if (!repo.value.trim()) {
        errors.value.repo = 'Vous devez indiquer le lien du repo Github'
        return false
    }
    if (!isValidRepoUrl(repo.value)){
        errors.value.repo = 'Veuillez entrer une URL valide'
        return false
    }
    errors.value.repo = ''
    return true
}
const validateLink = () => {
    // Link est optionnel, mais s'il est rempli, il doit être valide
    if (link.value.trim() && !isValidLinkUrl(link.value)) {
        errors.value.link = 'Veuillez entrer une URL valide'
        return false
    }
    errors.value.link = ''
    return true
}
const validateDescription = () => {
    if (!description.value.trim()) {
        errors.value.description = 'Vous devez écrire une description'
        return false
    }
    errors.value.description = ''
    return true
}

// 🔗 Fonction utilitaire pour valider l'URL du site
const isValidLinkUrl = (url) => {
    const linkRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}(\/.*)?$/
    return linkRegex.test(url)
}
// 🔗 Fonction utilitaire pour valider l'URL du repo
const isValidRepoUrl = (url) => {
    const repoRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\/?$/
    return repoRegex.test(url)
}


// 🎯 État de validation (a-t-on essayé de valider ?)
const hasTriedSubmit = ref(false)

// ✅ Fonction pour valider tout le formulaire
const validateForm = () => {
    const isTitle = validateTitle()
    const isCategory = validateCategory()
    const isImgAlt = validateImgAlt()
    const isRepo = validateRepo()
    const isLink = validateLink()
    const isDescription = validateDescription()
    
    return isTitle && isCategory && isImgAlt && isRepo && isLink && isDescription
}

// 📊 Propriété calculée pour savoir si le formulaire est valide
const isFormValid = computed(() => {
    return title.value.trim() && 
           category.value.trim() && 
           imgAlt.value.trim() && 
           repo.value.trim() && 
           description.value.trim() &&
           (!link.value.trim() || isValidLinkUrl(link.value))
})

// 📁 Fonction pour gérer l'upload de fichier
const handleFileUpload = (event) => {
    const file = event.target.files[0]
 if (file) {
        // Validation du type de fichier
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) {
            alert('⚠️ Veuillez sélectionner une image (JPEG, PNG ou WebP)')
            event.target.value = '' // Reset l'input
            return
        }
        
        // Validation de la taille (max 5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB en bytes
        if (file.size > maxSize) {
            alert('⚠️ L\'image doit faire moins de 5MB')
            event.target.value = '' // Reset l'input
            return
        }
        
        // Stockage du fichier
        photo.value = file
        
        // Création de l'aperçu
        createImagePreview(file)
        
        console.log('📸 Photo sélectionnée:', {
            nom: file.name,
            taille: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            type: file.type
        })
    }
}

// 🖼️ Fonction pour créer l'aperçu de l'image
const createImagePreview = (file) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
        photoPreview.value = e.target.result
    }
    
    reader.readAsDataURL(file)
}

// 🗑️ Fonction pour supprimer la photo
const removePhoto = () => {
    photo.value = null
    photoPreview.value = null
    
    // Reset l'input file
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) {
        fileInput.value = ''
    }
    
    console.log('🗑️ Photo supprimée')
}

// 📂 Fonction pour déclencher la sélection de fichier
const triggerFileInput = () => {
    const fileInput = document.querySelector('input[type="file"]')
    fileInput?.click()
}

// 🔄 États de soumission
const isSubmitting = ref(false)    // Formulaire en cours d'envoi
const isSubmitted = ref(false)     // Formulaire envoyé avec succès
const submitError = ref('')        // Message d'erreur d'envoi

// 🎯 Fonction appelée lors de la soumission
const handleSubmit = async (event) => {
    event.preventDefault() // Empêche le rechargement de page
    hasTriedSubmit.value = true
    submitError.value = '' // Reset l'erreur précédente
    
    // 1️⃣ Validation du formulaire
    if (!validateForm()) {
        console.log('❌ Formulaire invalide')
        alert('Veuillez corriger les erreurs avant de continuer')
        return
    }
    
    // 2️⃣ Préparation de l'envoi
    isSubmitting.value = true
    console.log('🚀 Début de la soumission...')
    
    try {
        // 3️⃣ Préparation des données
        const formData = prepareFormData()
        
        // 4️⃣ Envoi réel au serveur
        const result = await submitToServer(formData)   

        // 5️⃣ Succès !
        console.log('✅ Projet envoyé avec succès !')
        isSubmitted.value = true
        
        // Reset du formulaire après 3 secondes
        resetForm()
        
    } catch (error) {
        // 6️⃣ Gestion des erreurs
        console.error('❌ Erreur lors de l\'envoi:', error)
        submitError.value = 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'
        
    } finally {
        // 7️⃣ Fin du chargement
        isSubmitting.value = false
    }
}

// 🚀 Fonction pour envoyer les données au serveur
async function submitToServer(formData) {
    try {
        const response = await $fetch('/api/works', {
            method: 'POST',
            body: formData
        })
        
        // Vérifier que la réponse indique un succès
        if (!response.success) {
            throw new Error(response.message || 'Erreur serveur')
        }
        
        return response
    } catch (error) {
        console.error('❌ Erreur API:', error)
        
        // Gestion spécifique des erreurs
        if (error.status === 400) {
            throw new Error('Données invalides: ' + (error.data?.message || error.message))
        } else if (error.status === 500) {
            throw new Error('Erreur serveur, veuillez réessayer plus tard')
        } else if (!navigator.onLine) {
            throw new Error('Pas de connexion internet')
        } else {
            throw new Error('Erreur de connexion au serveur')
        }
    }
}

// 📦 Fonction pour préparer les données d'envoi
const prepareFormData = () => {
    const formData = new FormData()
    
    // Ajout des champs texte
    formData.append('prenom', title.value.trim())
    formData.append('nom', category.value.trim())
    formData.append('poste', imgAlt.value.trim())
    formData.append('entreprise', repo.value.trim())
    formData.append('photo', photo.value)
    formData.append('temoignage', description.value.trim())
    
    // Ajout du lien s'il existe
    if (link.value.trim()) {
        formData.append('link', link.value.trim())
    }
    
    console.log('📦 Données préparées pour envoi')
    
}

// 🔄 Fonction pour réinitialiser le formulaire
const resetForm = () => {
    // Reset des champs
    title.value = ''
    category.value = ''
    imgAlt.value = ''
    repo.value = ''
    link.value = ''
    description.value = ''
    photo.value = null
    photoPreview.value = null
    
    // Reset des erreurs
    Object.keys(errors.value).forEach(key => {
        errors.value[key] = ''
    })
    
    // Reset des états
    hasTriedSubmit.value = false
    isSubmitted.value = false
    submitError.value = ''
    
    // Reset de l'input file
    const fileInput = document.querySelector('#photo-input')
    if (fileInput) {
        fileInput.value = ''
    }
    
    console.log('🔄 Formulaire réinitialisé')
}

</script>
<template>
    <section class="works" id="worksDash">
        <h2 class="works__title">Rajouter un projet</h2>
        <form class="works__form">
            <div class="works__form__row">
                <div class="works__form__row__field">
                    <label class="works__form__row__field__label">Titre du projet</label>
                    <input 
                    type="text" 
                    v-model="title" 
                    @blur="hasTriedSubmit && validateTitle()"
                    @input="hasTriedSubmit && validateTitle()"
                    :class="{'error': errors.title}"
                    class="works__form__row__field__input"
                    >
                    <p v-if="errors.title" class="works__form__row__field__error">{{ errors.title }}</p>
                </div>
                <div class="works__form__row__field">
                    <label class="works__form__row__field__label">Catégorie</label>
                    <select
                        v-model="category" 
                        @blur="hasTriedSubmit && validateCategory()"
                        @input="hasTriedSubmit && validateCategory()"
                        :class="{'error': errors.category}" 
                        class="works__form__row__field__select"
                    >
                        <option value="">Choisi une option</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Performances & SEO">Performances & SEO</option>
                    </select>
                    <p v-if="errors.category" class="works__form__row__field__error">{{ errors.category }}</p>
                </div>
            </div>
            <div class="works__form__row">
                <div class="works__form__row__field">
                    <label class="works__form__row__field__label">Photo</label>
                    <input 
                        type="file" 
                        @change="handleFileUpload"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        id="photo-input"
                        class="works__form__row__field__inputFile"
                    >
                    <button 
                        type="button" 
                        @click="triggerFileInput"
                        class="works__form__row__field__customButton"
                    >
                        <SvgUpload class="works__form__row__field__customButton__icon"/>
                        {{ photo ? photo.name : 'Choisir une photo' }}
                    </button>
                    <!-- 🖼️ Zone de prévisualisation -->
                    <div v-if="photoPreview" class="works__form__row__field__preview">
                        <div class="works__form__row__field__preview__container">
                            <img :src="photoPreview" alt="Aperçu" class="works__form__row__field__preview__container__image" />
                            <div class="works__form__row__field__preview__container__overlay">
                                <p class="works__form__row__field__preview__container__overlay__name">{{ photo.name }}</p>
                                <ButtonsLittle 
                                    type="button"
                                    @click="removePhoto"
                                    class="works__form__row__field__preview__container__overlay__remove"
                                    title="Supprimer la photo"
                                >
                                    Supprimer la photo
                                </ButtonsLittle>
                            </div>
                        </div>
                    </div>
                    <p v-if="errors.photo" class="works__form__row__field__error">{{ errors.photo }}</p>
                </div>
                <div class="works__form__row__field">
                    <label class="works__form__row__field__label">Description alternative</label>
                    <input 
                        type="text" 
                        v-model="imgAlt" 
                        @blur="hasTriedSubmit && validateImgAlt()"
                        @input="hasTriedSubmit && validateImgAlt()"
                        :class="{'error': errors.imgAlt}"
                        class="works__form__row__field__input"
                    >
                    <p v-if="errors.imgAlt" class="works__form__row__field__error">{{ errors.imgAlt }}</p>
                </div>
            </div>
            <div class="works__form__row">
                <div class="works__form__row__field">
                    <label class="works__form__row__field__label">Lien Github</label>
                    <input 
                        type="text" 
                        v-model="repo" 
                        @blur="hasTriedSubmit && validateRepo()"
                        @input="hasTriedSubmit && validateRepo()"
                        :class="{'error': errors.repo}"
                        class="works__form__row__field__input"
                    >
                    <p v-if="errors.repo" class="works__form__row__field__error">{{ errors.repo }}</p>
                </div>
                <div class="works__form__row__field">
                    <label class="works__form__row__field__label">Lien du site</label>
                    <input 
                        type="text"
                        v-model="link" 
                        @blur="hasTriedSubmit && validateLink()"
                        @input="hasTriedSubmit && validateLink()"
                        :class="{'error': errors.link}" 
                        class="works__form__row__field__input"
                    >
                    <p v-if="errors.link" class="works__form__row__field__error">{{ errors.link }}</p>
                </div>
            </div>
            <div class="works__form__description">
                <label for="" class="works__form__description__label">Description du projet</label>
                <textarea 
                    v-model="description" 
                    @blur="hasTriedSubmit && validateDescription()"
                    @input="hasTriedSubmit && validateDescription()"
                    :class="{'error': errors.description}"
                    class="works__form__description__textarea"
                ></textarea>
                <p v-if="errors.description" class="works__form__description__error">{{ errors.description }}</p>
            </div>    
            <ButtonsMain
                type="submit"
                @click="handleSubmit"
                :disabled="isSubmitting || isSubmitted"
            >
                <span v-if="isSubmitting">⏳ Envoi en cours...</span>
                <span v-else-if="isSubmitted">✅ Projet rajouté !</span>
                <span v-else>{{ isFormValid ? 'Rajouter un projet ✅' : 'Rajouter un projet' }}</span>        
            </ButtonsMain>
        </form>
        <p v-if="isSubmitted" class="succes">Projet rajouté 🥳</p>
        <p v-if="submitError" class="error">{{ submitError }}</p>
    </section>
</template>
<style lang="scss" scoped>
.works {
    padding-top: $gap-main-desktop;
    width: 100%;
    @include flex(column, center, center, $gap-second-desktop);
    &__title {
        @include font-h2($text-color);
    }
    &__form {
        width: 70%;
        margin: auto;
        @include flex(column, center, center, $gap-third-desktop); 
        &__row {
            width: 100%;
            @include flex(row, center, start, $gap-list); 
            &__field {
                width: 100%;
                @include flex(column, center, start, 8px); 
                &__label {
                    @include font-p($text-color);
                } 
                &__input {
                    width: 100%;
                    @include input($white);
                }   
                &__select {
                    width: 100%;
                    @include input($white);
                }
                &__inputFile {
                    display: none;
                }
                &__customButton {
                    width: 100%;
                    @include input($white);
                    @include flex(row, center, center, 8px);
                    @include font-p-little;
                    &__icon {
                        height: 24px;
                    }
                }
                &__preview {
                    width: 100%;
                    &__container{
                        width: 100%;
                        @include flex(row, space-around, center, 0);
                        &__image {
                            width: 64px;
                            height: 64px;
                            object-fit: cover;
                            object-position: center;
                        }
                        &__overlay {
                            @include flex(column, center, center, 0);
                            &__name {
                                @include font-p-message($text-color-second);
                            }
                        }
                    }
                }
                &__error {
                    width: 100%;
                    @include font-p-message(red)
                }
            }                
        }    
        &__description {
            width: 100%;
            @include flex(column, center, start, 8px); 
            &__label {
                @include font-p($text-color);
            } 
            &__textarea {
                width: 100%;
                @include input($white);
            } 
            &__error {
                width: 100%;
                @include font-p-message(red)
            }          
        }       
    }

}
.succes {
    @include font-p-message(green)
}
/* 🚨 Style pour les champs en erreur */
.error {
    border: 2px solid red !important;
    background-color: #fff5f5 !important;
}
</style>