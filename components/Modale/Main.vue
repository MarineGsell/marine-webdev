<script setup>
const emit = defineEmits(['close'])
const handleClose = () => {
    emit('close')
}
// Notification
// const notif = reactive({
//     show: false,
//     message: '',
//     button:''
// })

// Ajout d'opinion
const addOpinion = async (opinionsForm) => {
        $fetch('/api/opinions', {
        method: 'POST',
        body: opinionsForm
    })
    .then(async () => {
        await refreshNuxtData('opinions')
        alert('Opinion ajouté avec succès, il sera visible après validation')
        // notif.show = true
        // notif.message = 'Opinion ajouté avec succès, il sera visible après validation'
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
                <h3 class="modale__window__content__title">Laissez moi votre avis</h3>
                <p class="modale__window__content__text">Nous avons travailler ensemble? N'hésitez pas à me donner votre avis</p>
                <ModaleOpinionForm 
                    @submit="addOpinion"
                    :clearAfterSubmit="true"
                >Envoyer mon avis</ModaleOpinionForm>
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
        width: auto;
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
                @include font-h3($text-color)
            }
            &__text {
                @include font-p($text-color)
            }
        }
    }
}
</style>