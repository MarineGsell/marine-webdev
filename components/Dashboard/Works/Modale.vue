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
// Notification
// const notif = reactive({
//     show: false,
//     message: '',
//     button: ''
// })

// Récupération des données pour la modale
const { data: works } = await useFetch('/api/works', {key: 'works'})

const currentWorks = computed(() => {
    return works.value?.find(work => work.id === props.workId)
})

// Modification du projet
const patchWork = async (worksForm) => {
        $fetch(`/api/works/${props.workId}`, {
        method: 'PATCH',
        body: worksForm
    })
    .then(async () => {
        await refreshNuxtData()
        alert('Projet modifié avec succès')
        // notif.show = true
        // notif.message = 'Projet modifié avec succès'
        // notif.button = 'OK'
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
                <h3 class="modale__window__content__title">Modifier un Projet</h3>
                <DashboardWorksForm 
                    :initialData="currentWorks"
                    variant="modal"
                    :clearAfterSubmit="false"
                    @submit="patchWork"
                >Modifier un projet</DashboardWorksForm>
                <!-- <Notif 
                    v-if="notif.show"
                    @close="notif.show = false"
                    :message="notif.message"
                    :button="notif.button"
                /> -->
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