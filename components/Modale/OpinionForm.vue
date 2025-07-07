<script setup>
import { fi } from 'zod/v4/locales'

const props = defineProps({
    initialData: {
        type: Object,
        default: () => ({})
    },
    clearAfterSubmit: {
        type: Boolean,
        default: true
    }
})

// ✨ Création des variables réactives pour chaque champ
const opinionsForm = reactive({
    firstName: props.initialData.firstName || '',
    lastName: props.initialData.lastName || '',
    job: props.initialData.job || '',
    company: props.initialData.company || '',
    link: props.initialData.link || '',
    opinion: props.initialData.opinion || '',
    imgSrc: props.initialData.imgSrc || '',
    photoPreview: props.initialData.imgSrc || null,
})

// Surveillance des changements pour le formulaire
watch(() => props.initialData, (newData) => {
    opinionsForm.firstName = newData?.firstName || ''
    opinionsForm.lastName = newData?.lastName || ''
    opinionsForm.job = newData?.job || ''
    opinionsForm.company = newData?.company || null
    opinionsForm.link = newData?.link || ''
    opinionsForm.opinion = newData?.opinion || ''
    opinionsForm.imgSrc = newData?.imgSrc || ''
}, { immediate: true })

// 🚨 Variables pour stocker les erreurs
const errors = ref({
    firstName: '',
    lastName: '',
    job: '',
    company: '',
    link: '',
    opinion: ''
})

// 🔍 Fonctions de validation pour chaque champ
const validatePrenom = () => {
    if (!opinionsForm.firstName.trim()) {
        errors.value.firstName = 'Vous devez indiquer votre prénom'
        return false
    }
    if (opinionsForm.firstName.trim().length < 2) {
        errors.value.firstName = 'Le prénom doit contenir au moins 2 caractères'
        return false
    }
    errors.value.firstName = ''
    return true
}
const validateNom = () => {
    if (!opinionsForm.lastName.trim()) {
        errors.value.lastName = 'Vous devez indiquer votre nom'
        return false
    }
    if (opinionsForm.lastName.trim().length < 2) {
        errors.value.lastName = 'Le nom doit contenir au moins 2 caractères'
        return false
    }
    errors.value.lastName = ''
    return true
}
const validatePoste = () => {
    if (!opinionsForm.job.trim()) {
        errors.value.job = 'Vous devez indiquer votre poste'
        return false
    }
    errors.value.job = ''
    return true
}
const validateEntreprise = () => {
    if (!opinionsForm.company.trim()) {
        errors.value.company = 'Vous devez indiquer l\'entreprise pour laquelle vous travaillez'
        return false
    }
    errors.value.company = ''
    return true
}
const validateLinkedin = () => {
    // LinkedIn est optionnel, mais s'il est rempli, il doit être valide
    if (opinionsForm.link.trim() && !isValidLinkedInUrl(opinionsForm.link)) {
        errors.value.link = 'Veuillez entrer une URL LinkedIn valide'
        return false
    }
    errors.value.link = ''
    return true
}
const validateTemoignage = () => {
    if (!opinionsForm.opinion.trim()) {
        errors.value.opinion = 'Vous devez écrire un témoignage'
        return false
    }
    if (opinionsForm.opinion.trim().length < 10) {
        errors.value.opinion = 'Le témoignage doit contenir au moins 10 caractères'
        return false
    }
    errors.value.opinion = ''
    return true
}

// 🔗 Fonction utilitaire pour valider l'URL LinkedIn
const isValidLinkedInUrl = (url) => {
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
    return linkedinRegex.test(url)
}

// ✅ Fonction pour valider tout le formulaire
const validateForm = () => {
    const isPrenom = validatePrenom()
    const isNom = validateNom()
    const isPoste = validatePoste()
    const isEntreprise = validateEntreprise()
    const isLinkedin = validateLinkedin()
    const isTemoignage = validateTemoignage()
    
    return isPrenom && isNom && isPoste && isEntreprise && isLinkedin && isTemoignage
}

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
        
        // Conversion en Base64 pour la base de données
        convertFileToBase64(file)
        
        // Création de l'aperçu
        createImagePreview(file)
        
        console.log('📸 Photo sélectionnée:', {
            nom: file.name,
            taille: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            type: file.type
        })
    }
}

// 🔄 Fonction pour convertir le fichier en Base64
const convertFileToBase64 = (file) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
        const base64String = e.target.result
        
        // Stocker le Base64 pour la base de données
        opinionsForm.imgSrc = base64String
        
        // Stocker aussi pour l'aperçu
        opinionsForm.photoPreview = base64String
        
        console.log('✅ Fichier converti en Base64')
    }
    
    reader.onerror = (error) => {
        console.error('❌ Erreur lors de la conversion:', error)
        alert('Erreur lors du traitement de l\'image')
    }
    
    reader.readAsDataURL(file)
}

// 🖼️ Fonction pour créer l'aperçu de l'image
const createImagePreview = (file) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
        opinionsForm.photoPreview = e.target.result
    }
    
    reader.readAsDataURL(file)
}

// 🗑️ Fonction pour supprimer la photo
const removePhoto = () => {
    opinionsForm.imgSrc = null
    opinionsForm.photoPreview = null
    
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

// Soumission du formulaire
const emit = defineEmits(['submit'])

const handleSubmit = () => {
   if (!validateForm()) {
        console.log('❌ Formulaire invalide')
        alert('Veuillez corriger les erreurs avant de continuer')
        return
    } else {
        emit('submit', opinionsForm)
        if (props.clearAfterSubmit) {
            opinionsForm.title = ''
            opinionsForm.category = ''
            opinionsForm.imgSrc = ''
            opinionsForm.photoPreview = null
            opinionsForm.imgAlt = ''
            opinionsForm.repo = ''
            opinionsForm.link = ''
            opinionsForm.description = ''
        }
    } 
}

</script>
<template>
    <form 
        @submit.prevent="handleSubmit"
        class="form"
    >
        <div class="form__row">
            <div class="form__row__field">
                <label class="form__row__field__label">Prénom *</label>
                <input 
                    v-model="opinionsForm.firstName"
                    @blur="validatePrenom()"
                    @input="validatePrenom()"
                    placeholder="Votre prénom"
                    class="form__row__field__input" 
                    :class="{ 'error': errors.firstName }"
                />
                <p v-if="errors.firstName" class="form__row__field__error">{{ errors.firstName }}</p>
            </div>
            <div class="form__row__field">
                <label class="form__row__field__label">Nom *</label>
                <input 
                    v-model="opinionsForm.lastName"
                    @blur="validateNom()"
                    @input="validateNom()"
                    placeholder="Votre nom"
                    class="form__row__field__input"
                    :class="{ 'error': errors.lastName }" 
                />
                <p v-if="errors.lastName" class="form__row__field__error">{{ errors.lastName }}</p>
            </div>
        </div>
        <div class="form__row">
            <div class="form__row__field">
                <label class="form__row__field__label">Poste *</label>
                <input 
                    v-model="opinionsForm.job"
                    @blur="validatePoste()"
                    @input="validatePoste()"
                    placeholder="Votre poste"
                    class="form__row__field__input" 
                    :class="{ 'error': errors.job }"
                />
                <p v-if="errors.job" class="form__row__field__error">{{ errors.job }}</p>
            </div>
            <div class="form__row__field">
                <label class="form__row__field__label">Entreprise *</label>
                <input 
                    v-model="opinionsForm.company"
                    @blur="validateEntreprise()"
                    @input="validateEntreprise()"
                    placeholder="Votre entreprise"
                    class="form__row__field__input" 
                    :class="{'error': errors.company}"
                />
                <p v-if="errors.company" class="form__row__field__error">{{ errors.company }}</p>
            </div>
        </div>
        <div class="form__row">
            <div class="form__row__field">
                <label class="form__row__field__label">
                    <SvgLinkedin class="form__row__field__label__icon"/>
                    <span>Lien Linkedin (optionnel)</span>
                </label>
                <input 
                    v-model="opinionsForm.link"
                    @blur="validateLinkedin()"
                    @input="validateLinkedin()"
                    type="url" 
                    placeholder="https://linkedin.com/in/votre-profil"
                    class="form__row__field__input"
                    :class="{'error': errors.link}"
                >
            </div>
            <div class="form__row__field">
                <label class="form__row__field__label">Photo (optionnel)</label>
                <input 
                    type="file" 
                    @change="handleFileUpload"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    class="form__row__field__inputFile"
                    id="photo-input"
                >
                <button 
                    type="button" 
                    @click="triggerFileInput"
                    class="form__row__field__customButton"
                >
                    <SvgUpload class="form__row__field__customButton__icon"/>
                    {{ opinionsForm.imgSrc ? opinionsForm.imgSrc.name : 'Choisir une photo' }}
                </button>
                <!-- 🖼️ Zone de prévisualisation -->
                <div v-if="opinionsForm.photoPreview" class="form__row__field__preview">
                    <div class="form__row__field__preview__container">
                        <img :src="opinionsForm.photoPreview" alt="Aperçu" class="form__row__field__preview__container__image" />
                        <div class="form__row__field__preview__container__overlay">
                            <p class="form__row__field__preview__container__overlay__name">{{ opinionsForm.imgSrc.name }}</p>
                            <ButtonsLittle 
                                type="button"
                                @click="removePhoto"
                                class="form__row__field__preview__container__overlay__remove"
                                title="Supprimer la photo"
                            >
                                Supprimer la photo
                            </ButtonsLittle>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form__message">
            <label for="" class="form__message__label">Votre témoignage</label>
            <textarea 
                v-model="opinionsForm.opinion" 
                @blur="validateTemoignage()"
                @input="validateTemoignage()"
                placeholder="Partagez votre expérience..."
                class="form__message__text"
                :class="{'error': errors.temoignage}"
                rows="4"
            ></textarea>
            <p v-if="errors.opinion" class="form__message__error">{{ errors.opinion }}</p>
        </div>
        <ButtonsMain type="submit"><slot></slot></ButtonsMain>
    </form>
</template>
<style lang="scss" scoped>
.form {
    width: 100%;
    @include flex(column, center, center, $gap-list);
    &__row {
        width: 100%;
        @include flex(row, center, start, $gap-list);
        @include responsive-mobile {
            @include flex(column, center, start, $gap-list)
        }
        &__field {
            width: 100%;
            @include flex(column, center, start, 4px);
            &__label {
                width: 100%;
                gap: 8px;
                @include box(start);
                @include font-p($text-color);
                &__icon {
                    height: 24px;
                    color: $main-color;
                }
            }
            &__input {
                width: 100%;
                @include input($bg-color);
            }
            &__error {
                width: 100%;
                @include font-p-message(red)
            }
            &__inputFile {
                display: none;
            }
            &__customButton {
                width: 100%;
                @include input($bg-color);
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
        }
    }
    &__message {
        width: 100%;
        @include flex(column, center, start, 4px);
        &__label {
            width: 100%;
            @include font-p($text-color)
        }
        &__text {
            width: 100%;
            @include input($bg-color);
        }
        &__error {
            width: 100%;
            @include font-p-message(red)
        }
    }
}
</style>