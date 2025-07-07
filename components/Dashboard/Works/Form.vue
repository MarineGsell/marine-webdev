<script setup>
const props = defineProps({
    initialData: {
        type: Object,
        default: () => ({})
    },
    clearAfterSubmit: {
        type: Boolean,
        default: true
    },
    variant: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'modal'].includes(value)
    }
})
// 📥 Références réactives pour les champs du formulaire
const worksForm = reactive({
    title: props.initialData.title || '',
    category: props.initialData.category || '',
    imgSrc: props.initialData.imgSrc || '',
    photoPreview: props.initialData.imgSrc || null,
    imgAlt: props.initialData.imgAlt || '',
    repo: props.initialData.repo || '',
    link: props.initialData.link || '',
    description: props.initialData.description || ''
})

// Surveillance des changements pour le formulaire
watch(() => props.initialData, (newData) => {
    worksForm.title = newData?.title || ''
    worksForm.category = newData?.category || ''
    worksForm.imgSrc = newData?.imgSrc || ''
    worksForm.photoPreview = newData?.imgSrc || null
    worksForm.imgAlt = newData?.imgAlt || ''
    worksForm.repo = newData?.repo || ''
    worksForm.link = newData?.link || ''
    worksForm.description = newData?.description || ''
}, { immediate: true })

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
    if (!worksForm.title.trim()) {
        errors.value.title = 'Vous devez indiquer le titre du projet'
        return false
    }
    if (worksForm.title.trim().length < 2) {
        errors.value.title = 'Le titre doit contenir au moins 2 caractères'
        return false
    }
    errors.value.title = ''
    return true
}
const validateCategory = () => {
    if (!worksForm.category.trim()) {
        errors.value.category = 'Vous devez indiquer une catégorie'
        return false
    }
    errors.value.category = ''
    return true
}
const validateImgAlt = () => {
    if (!worksForm.imgAlt.trim()) {
        errors.value.imgAlt = 'Vous devez indiquer un texte alternatif'
        return false
    }
    errors.value.imgAlt = ''
    return true
}
const validateRepo = () => {
    if (!worksForm.repo.trim()) {
        errors.value.repo = 'Vous devez indiquer le lien du repo Github'
        return false
    }
    if (!isValidRepoUrl(worksForm.repo)){
        errors.value.repo = 'Veuillez entrer une URL valide'
        return false
    }
    errors.value.repo = ''
    return true
}
const validateLink = () => {
    // Link est optionnel, mais s'il est rempli, il doit être valide
    if (worksForm.link.trim() && !isValidLinkUrl(worksForm.link)) {
        errors.value.link = 'Veuillez entrer une URL valide'
        return false
    }
    errors.value.link = ''
    return true
}
const validateDescription = () => {
    if (!worksForm.description.trim()) {
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
        worksForm.imgSrc = base64String
        
        // Stocker aussi pour l'aperçu
        worksForm.photoPreview = base64String
        
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
        worksForm.photoPreview = e.target.result
    }
    
    reader.readAsDataURL(file)
}

// 🗑️ Fonction pour supprimer la photo
const removePhoto = () => {
    worksForm.imgSrc = null
    worksForm.photoPreview = null
    
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
        emit('submit', worksForm)
        if (props.clearAfterSubmit) {
            worksForm.title = ''
            worksForm.category = ''
            worksForm.imgSrc = ''
            worksForm.photoPreview = null
            worksForm.imgAlt = ''
            worksForm.repo = ''
            worksForm.link = ''
            worksForm.description = ''
        }
    } 
}

</script>
<template>
    <form class="form" @submit.prevent="handleSubmit">
        <div class="form__row">
            <div class="form__row__field">
                <label class="form__row__field__label">Titre du projet</label>
                <input 
                type="text" 
                v-model="worksForm.title" 
                @blur="validateTitle()"
                @input="validateTitle()"
                :class="{
                    'error': errors.title,
                    'form__row__field__input--modal': variant === 'modal'
                }"
                class="form__row__field__input"
                >
                <p v-if="errors.title" class="form__row__field__error">{{ errors.title }}</p>
            </div>
            <div class="form__row__field">
                <label class="form__row__field__label">Catégorie</label>
                <select
                    v-model="worksForm.category" 
                    @blur="validateCategory()"
                    @input="validateCategory()"
                    :class="{
                        'error': errors.category,
                        'form__row__field__select--modal': variant === 'modal'
                    }" 
                    class="form__row__field__select"
                >
                    <option value="">Choisi une option</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Performances & SEO">Performances & SEO</option>
                </select>
                <p v-if="errors.category" class="form__row__field__error">{{ errors.category }}</p>
            </div>
        </div>
        <div class="form__row">
            <div class="form__row__field">
                <label class="form__row__field__label">Photo</label>
                <input 
                    type="file" 
                    @change="handleFileUpload"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    id="photo-input"
                    class="form__row__field__inputFile"
                >
                <button 
                    type="button" 
                    @click="triggerFileInput"
                    :class="[
                        'form__row__field__customButton',
                        {'form__row__field__customButton--modal': variant === 'modal'}
                    ]"
                >
                    <SvgUpload class="form__row__field__customButton__icon"/>
                    {{ worksForm.imgSrc ? worksForm.imgSrc.name : 'Choisir une photo' }}
                </button>
                <!-- 🖼️ Zone de prévisualisation -->
                <div v-if="worksForm.photoPreview" class="form__row__field__preview">
                    <div class="form__row__field__preview__container">
                        <img :src="worksForm.photoPreview" alt="Aperçu" class="form__row__field__preview__container__image" />
                        <div class="form__row__field__preview__container__overlay">
                            <p class="form__row__field__preview__container__overlay__name">{{ worksForm.imgSrc.name }}</p>
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
                <p v-if="errors.imgSrc" class="form__row__field__error">{{ errors.imgSrc }}</p>
            </div>
            <div class="form__row__field">
                <label class="form__row__field__label">Description alternative</label>
                <input 
                    type="text" 
                    v-model="worksForm.imgAlt" 
                    @blur="validateImgAlt()"
                    @input="validateImgAlt()"
                    :class="{
                        'error': errors.imgAlt,
                        'form__row__field__input--modal': variant === 'modal'
                    }"
                    class="form__row__field__input"
                >
                <p v-if="errors.imgAlt" class="form__row__field__error">{{ errors.imgAlt }}</p>
            </div>
        </div>
        <div class="form__row">
            <div class="form__row__field">
                <label class="form__row__field__label">Lien Github</label>
                <input 
                    type="text" 
                    v-model="worksForm.repo" 
                    @blur="validateRepo()"
                    @input="validateRepo()"
                    :class="{
                        'error': errors.repo,
                        'form__row__field__input--modal': variant === 'modal'
                    }"
                    class="form__row__field__input"
                >
                <p v-if="errors.repo" class="form__row__field__error">{{ errors.repo }}</p>
            </div>
            <div class="form__row__field">
                <label class="form__row__field__label">Lien du site</label>
                <input 
                    type="text"
                    v-model="worksForm.link" 
                    @blur="validateLink()"
                    @input="validateLink()"
                    :class="{
                        'error': errors.link,
                        'form__row__field__input--modal': variant === 'modal'
                    }" 
                    class="form__row__field__input"
                >
                <p v-if="errors.link" class="form__row__field__error">{{ errors.link }}</p>
            </div>
        </div>
        <div class="form__description">
            <label for="" class="form__description__label">Description du projet</label>
            <textarea 
                v-model="worksForm.description" 
                @blur="validateDescription()"
                @input="validateDescription()"
                :class="{
                    'error': errors.description,
                    'form__description__textarea--modal': variant === 'modal'
                }"
                class="form__description__textarea"
            ></textarea>
            <p v-if="errors.description" class="form__description__error">{{ errors.description }}</p>
        </div>    
        <ButtonsMain type="submit"><slot></slot></ButtonsMain>
    </form>
</template>
<style lang="scss" scoped>
.form {
    width: 100%;
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
                &--modal {
                    @include input($bg-color);
                }
            }   
            &__select {
                width: 100%;
                @include input($white);
                &--modal {
                    @include input($bg-color);
                }
            }
            &__inputFile {
                display: none;
            }
            &__customButton {
                width: 100%;
                @include input($white);
                @include flex(row, center, center, 8px);
                @include font-p-little;
                &--modal {
                    @include input($bg-color);
                }
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
            &--modal {
                @include input($bg-color);
            }
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