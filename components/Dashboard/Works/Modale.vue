<script setup>
const props = defineProps({
    workId: {
        type: [String, Number],
        default: null
    }
})  

const emit = defineEmits(['close'])
const handleClose = () => {
    emit('close')
}
// Récupération des données pour la modale
const { data: works } = await useFetch('/api/works', {key: 'works'})

const currentWorks = computed(() => {
    return works.value?.find(work => work.id === props.workId)
})

// Formulaire de modification
const worksForm = reactive({
    title: currentWorks.value?.title || '',
    category: currentWorks.value?.category || '',
    photo: currentWorks.value?.imgSrc || '',
    photoPreview: currentWorks.value?.imgSrc || '',
    imgAlt: currentWorks.value?.imgAlt || '',
    repo: currentWorks.value?.repo || '',
    link: currentWorks.value?.link || '',
    description: currentWorks.value?.description || ''
})


async function patchWork() {
    $fetch(`/api/competences/${props.workId}`, {
        method: 'PATCH',
        body: worksForm
    })
    .then(async () => {
        await refreshNuxtData()
        alert('Projet modifié avec succès')
        worksForm.title = currentWorks.value?.title || ''
        worksForm.category = currentWorks.value?.category || ''
        worksForm.photo = currentWorks.value?.imgSrc || ''
        worksForm.photoPreview = currentWorks.value?.imgSrc || ''
        worksForm.imgAlt = currentWorks.value?.imgAlt || ''
        worksForm.repo = currentWorks.value?.repo || ''
        worksForm.link = currentWorks.value?.link || ''
        worksForm.description = currentWorks.value?.description || ''
        handleClose()
    })
    .catch((e) => alert(e))
}
</script>
<template>
    <div class="modale">
        <div class="modale__overlay" @click="handleClose"></div>
        <div class="modale__window">
            <div class="modale__window__button" @click="handleClose">X</div>
            <div class="modale__window__content">
                <h3 class="modale__window__content__title">Modifier une compétence</h3>
                <form class="modale__window__content__form">
                    <div class="modale__window__content__form__column">
                        <div class="modale__window__content__form__column__field">
                            <label class="modale__window__content__form__column__field__label">Nom de la compétence</label>
                            <input 
                                type="text" 
                                
                                class="modale__window__content__form__column__field__input"
                            >
                        </div>
                        <div class="modale__window__content__form__column__field">
                            <label class="modale__window__content__form__column__field__label">Catégorie</label>
                            <select class="modale__window__content__form__column__field__select" >
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Outils">Outils</option>
                            </select>
                        </div>
                        <div class="modale__window__content__form__column__field">
                            <label class="modale__window__content__form__column__field__label">Niveau</label>
                            <input 
                                type="number" 
                                
                                class="modale__window__content__form__column__field__input"
                                min="1"
                                max="5"
                            >
                        </div>
                    </div>
                    <ButtonsMain type="submit">Modifier la compétence</ButtonsMain>
                </form>
<p>{{ workId }}</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.modale {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    &__overlay {
        background-color: $bg-transparent;
        width: 100%;
        height: 100%;
    }
    &__window {
        width: 50%;
        position: absolute;
        max-height: 70vh;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        overflow: scroll;
        @include card($white);
        &__button {
            background-color: $main-color;
            padding: 4px 8px;
            border-radius: 5px;
            position: absolute;
            top: 8px;
            right: 8px;
            cursor: pointer;
            @include font-p($white)
        }
        &__content {
            width: 90%;
            margin: auto;
            @include flex(column, center, center, $gap-third-desktop);
            @include responsive-tablette {
                width: 100%;
                @include flex(column, center, center, $gap-third-tablette) 
            }
            @include responsive-mobile {
                width: 100%;
                @include flex(column, center, center, $gap-third-mobile) 
            }
            &__title {
                text-align: center;
                @include font-h3($text-color)
            }
            &__form {
                width: 90%;
                @include flex(column, center, center, $gap-third-desktop);
                @include responsive-tablette {
                    gap: $gap-third-tablette;
                }
                @include responsive-mobile {
                    gap: $gap-third-mobile;
                }
                &__column {
                    width: 100%;
                    @include flex(column, center, center, $gap-third-desktop);
                    &__field {
                        width: 100%;;
                        @include flex(column, center, start, 8px);
                        &__label {
                            @include font-p($text-color);
                        }
                        &__input {
                            width: 100%;
                            @include input($bg-color);
                        }
                        &__select {
                            width: 100%;
                            @include input($bg-color);
                        }
                    }
                }
            }
        }
    }
}
</style>