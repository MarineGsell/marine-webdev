<script setup>
import { ButtonsMain } from '#components'

const props = defineProps({
    message: {
        type: String,
        default: "Notification"
    },
    button: {
        type: String,
        default: "OK"
    }
})
const emit = defineEmits(['close'])
const handleClose = () => {
    emit('close')
}
</script>
<template>
    <div class="notif" >
        <div class="notif__overlay"></div>
        <form class="notif__window" @submit.prevent="handleClose">
            <p class="notif__window__text">{{ message }}</p>
            <ButtonsMain type="submit">{{ button }}</ButtonsMain>
        </form>
    </div>
</template>
<style lang="scss" scoped>
.notif {
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
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        @include card($white);
        @include flex(column, center, center, $gap-third-desktop);  
        @include responsive-tablette {
            @include flex(column, center, center, $gap-third-tablette);  
        }
        @include responsive-mobile {
            @include flex(column, center, center, $gap-third-mobile);  
        }
        &__text {
            text-align: center;
            @include font-p($text-color);
        }
    }
}
</style>               