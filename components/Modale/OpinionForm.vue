<script setup>
import { ButtonsLittle } from '#components'

// ✨ Création des variables réactives pour chaque champ
const prenom = ref('')        // Stocke le prénom
const nom = ref('')           // Stocke le nom  
const poste = ref('')         // Stocke le poste
const entreprise = ref('')    // Stocke l'entreprise
const linkedin = ref('')      // Stocke le lien LinkedIn
const photo = ref(null)       // Stocke le fichier photo
const photoPreview = ref(null) // Stocke l'URL de prévisualisation
const temoignage = ref('')    // Stocke le témoignage

// 📝 Variable pour afficher les données (pour comprendre)
const showData = ref(false)

// 🚨 Variables pour stocker les erreurs
const errors = ref({
    prenom: '',
    nom: '',
    poste: '',
    entreprise: '',
    linkedin: '',
    temoignage: ''
})

// 🔍 Fonctions de validation pour chaque champ
const validatePrenom = () => {
    if (!prenom.value.trim()) {
        errors.value.prenom = 'Vous devez indiquer votre prénom'
        return false
    }
    if (prenom.value.trim().length < 2) {
        errors.value.prenom = 'Le prénom doit contenir au moins 2 caractères'
        return false
    }
    errors.value.prenom = ''
    return true
}
const validateNom = () => {
    if (!nom.value.trim()) {
        errors.value.nom = 'Vous devez indiquer votre nom'
        return false
    }
    if (nom.value.trim().length < 2) {
        errors.value.nom = 'Le nom doit contenir au moins 2 caractères'
        return false
    }
    errors.value.nom = ''
    return true
}
const validatePoste = () => {
    if (!poste.value.trim()) {
        errors.value.poste = 'Vous devez indiquer votre poste'
        return false
    }
    errors.value.poste = ''
    return true
}
const validateEntreprise = () => {
    if (!entreprise.value.trim()) {
        errors.value.entreprise = 'Vous devez indiquer l\'entreprise pour laquelle vous travaillez'
        return false
    }
    errors.value.entreprise = ''
    return true
}
const validateLinkedin = () => {
    // LinkedIn est optionnel, mais s'il est rempli, il doit être valide
    if (linkedin.value.trim() && !isValidLinkedInUrl(linkedin.value)) {
        errors.value.linkedin = 'Veuillez entrer une URL LinkedIn valide'
        return false
    }
    errors.value.linkedin = ''
    return true
}
const validateTemoignage = () => {
    if (!temoignage.value.trim()) {
        errors.value.temoignage = 'Vous devez écrire un témoignage'
        return false
    }
    if (temoignage.value.trim().length < 10) {
        errors.value.temoignage = 'Le témoignage doit contenir au moins 10 caractères'
        return false
    }
    errors.value.temoignage = ''
    return true
}

// 🔗 Fonction utilitaire pour valider l'URL LinkedIn
const isValidLinkedInUrl = (url) => {
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
    return linkedinRegex.test(url)
}

// 🎯 État de validation (a-t-on essayé de valider ?)
const hasTriedSubmit = ref(false)

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

// 📊 Propriété calculée pour savoir si le formulaire est valide
const isFormValid = computed(() => {
    return prenom.value.trim() && 
           nom.value.trim() && 
           poste.value.trim() && 
           entreprise.value.trim() && 
           temoignage.value.trim().length >= 10 &&
           (!linkedin.value.trim() || isValidLinkedInUrl(linkedin.value))
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
        console.log('✅ Témoignage envoyé avec succès !')
        isSubmitted.value = true
        
        // Optionnel: reset du formulaire après 3 secondes
        setTimeout(() => {
            resetForm()
        }, 3000)
        
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
        const response = await $fetch('/api/opinions', {
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
    formData.append('prenom', prenom.value.trim())
    formData.append('nom', nom.value.trim())
    formData.append('poste', poste.value.trim())
    formData.append('entreprise', entreprise.value.trim())
    formData.append('temoignage', temoignage.value.trim())
    
    // Ajout de la photo si elle existe
    if (photo.value) {
        formData.append('photo', photo.value)
    }

    // Ajout de Linkedin s'il existe
    if (linkedin.value.trim()) {
        formData.append('linkedin', linkedin.value.trim())
    }
    
    console.log('📦 Données préparées pour envoi')
    
    // Debug: afficher le contenu de FormData
    for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
            console.log(`${key}:`, `[Fichier: ${value.name}, ${value.size} bytes]`)
        } else {
            console.log(`${key}:`, value)
        }
    }
    
    return formData
}

// 🔄 Fonction pour réinitialiser le formulaire
const resetForm = () => {
    // Reset des champs
    prenom.value = ''
    nom.value = ''
    poste.value = ''
    entreprise.value = ''
    linkedin.value = ''
    temoignage.value = ''
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
    <form 
        @submit.prevent="handleSubmit"
        class="form"
    >
        <div class="form__row">
            <div class="form__row__field">
                <label class="form__row__field__label">Prénom *</label>
                <input 
                    v-model="prenom"
                    @blur="hasTriedSubmit && validatePrenom()"
                    @input="hasTriedSubmit && validatePrenom()"
                    placeholder="Votre prénom"
                    class="form__row__field__input" 
                    :class="{ 'error': errors.prenom }"
                />
                <p v-if="errors.prenom" class="form__row__field__error">{{ errors.prenom }}</p>
            </div>
            <div class="form__row__field">
                <label class="form__row__field__label">Nom *</label>
                <input 
                    v-model="nom"
                    @blur="hasTriedSubmit && validateNom()"
                    @input="hasTriedSubmit && validateNom()"
                    placeholder="Votre nom"
                    class="form__row__field__input"
                    :class="{ 'error': errors.nom }" 
                />
                <p v-if="errors.nom" class="form__row__field__error">{{ errors.nom }}</p>
            </div>
        </div>
        <div class="form__row">
            <div class="form__row__field">
                <label class="form__row__field__label">Poste *</label>
                <input 
                    v-model="poste"
                    @blur="hasTriedSubmit && validatePoste()"
                    @input="hasTriedSubmit && validatePoste()"
                    placeholder="Votre poste"
                    class="form__row__field__input" 
                    :class="{ 'error': errors.poste }"
                />
                <p v-if="errors.poste" class="form__row__field__error">{{ errors.poste }}</p>
            </div>
            <div class="form__row__field">
                <label class="form__row__field__label">Entreprise *</label>
                <input 
                    v-model="entreprise"
                    @blur="hasTriedSubmit && validateEntreprise()"
                    @input="hasTriedSubmit && validateEntreprise()"
                    placeholder="Votre entreprise"
                    class="form__row__field__input" 
                    :class="{'error': errors.entreprise}"
                />
                <p v-if="errors.entreprise" class="form__row__field__error">{{ errors.entreprise }}</p>
            </div>
        </div>
        <div class="form__row">
            <div class="form__row__field">
                <label class="form__row__field__label">
                    <SvgLinkedin class="form__row__field__label__icon"/>
                    <span>Lien Linkedin (optionnel)</span>
                </label>
                <input 
                    v-model="linkedin"
                    @blur="hasTriedSubmit && validateLinkedin()"
                    @input="hasTriedSubmit && validateLinkedin()"
                    type="url" 
                    placeholder="https://linkedin.com/in/votre-profil"
                    class="form__row__field__input"
                    :class="{'error': errors.linkedin}"
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
                    {{ photo ? photo.name : 'Choisir une photo' }}
                </button>
                <!-- 🖼️ Zone de prévisualisation -->
                <div v-if="photoPreview" class="form__row__field__preview">
                    <div class="form__row__field__preview__container">
                        <img :src="photoPreview" alt="Aperçu" class="form__row__field__preview__container__image" />
                        <div class="form__row__field__preview__container__overlay">
                            <p class="form__row__field__preview__container__overlay__name">{{ photo.name }}</p>
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
                v-model="temoignage" 
                @blur="hasTriedSubmit && validateTemoignage()"
                @input="hasTriedSubmit && validateTemoignage()"
                placeholder="Partagez votre expérience..."
                class="form__message__text"
                :class="{'error': errors.temoignage}"
                rows="4"
            ></textarea>
            <p v-if="errors.temoignage" class="form__message__error">{{ errors.temoignage }}</p>
        </div>
        <!-- 📊 Indicateur de validation en temps réel -->
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h3>🎯 État de validation :</h3>
            <p>
                <span :style="{ color: isFormValid ? 'green' : 'red' }">
                    {{ isFormValid ? '✅ Formulaire valide' : '❌ Formulaire invalide' }}
                </span>
            </p>
            <p><strong>Erreurs détectées :</strong></p>
            <ul>
                <li v-if="errors.prenom" style="color: red;">{{ errors.prenom }}</li>
                <li v-if="errors.nom" style="color: red;">{{ errors.nom }}</li>
                <li v-if="errors.poste" style="color: red;">{{ errors.poste }}</li>
                <li v-if="errors.entreprise" style="color: red;">{{ errors.entreprise }}</li>
                <li v-if="errors.linkedin" style="color: red;">{{ errors.linkedin }}</li>
                <li v-if="errors.temoignage" style="color: red;">{{ errors.temoignage }}</li>
                <li v-if="!Object.values(errors).some(error => error)" style="color: green;">
                    Aucune erreur ! 🎉
                </li>
            </ul>
        </div>
        <!-- 🔍 Bouton pour voir les données en temps réel -->
        <button 
            type="button" 
            @click="showData = !showData"
            style="margin: 10px 0; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px;"
        >
            {{ showData ? 'Masquer' : 'Voir' }} les données
        </button>
        
        <!-- 📊 Affichage des données pour comprendre la réactivité -->
        <div v-if="showData" style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h3>📋 Données du formulaire en temps réel :</h3>
            <p><strong>Prénom:</strong> {{ prenom || '(vide)' }}</p>
            <p><strong>Nom:</strong> {{ nom || '(vide)' }}</p>
            <p><strong>Poste:</strong> {{ poste || '(vide)' }}</p>
            <p><strong>Entreprise:</strong> {{ entreprise || '(vide)' }}</p>
            <p><strong>LinkedIn:</strong> {{ linkedin || '(vide)' }}</p>
            <p><strong>Photo:</strong> {{ photo ? photo.name : '(aucune)' }}</p>
            <p><strong>Témoignage:</strong> {{ temoignage || '(vide)' }}</p>
        </div>
        <ButtonsMain
            type="submit"
            @click="handleSubmit"
            :disabled="isSubmitting || isSubmitted"
        >
            <span v-if="isSubmitting">⏳ Envoi en cours...</span>
            <span v-else-if="isSubmitted">✅ Envoyé !</span>
            <span v-else>{{ isFormValid ? 'Envoyer ✅' : 'Envoyer' }}</span>        </ButtonsMain>
    </form>
    <p v-if="isSubmitted" class="succes">Merci de votre témoignage ! Il sera examiné avant publication sur le site.</p>
    <p v-if="submitError" class="error">{{ submitError }}</p>
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
                @include input;
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
                @include input;
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
            @include input;
        }
        &__error {
            width: 100%;
            @include font-p-message(red)
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