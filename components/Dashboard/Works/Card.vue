<script setup>
import { de, id } from 'zod/v4/locales'

const props = defineProps({
    imgSrc: {
        type: String,
        required: true
    },
    imgAlt: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    repo: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: ''
    }, 
    content: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }, 
})

const emit = defineEmits(['open', 'delete'])
const handleOpen = () => {
    emit('open')
}
const handleDelete = () => {
    emit('delete')
}

</script>
<template>
    <div class="card">
        <NuxtImg :src="imgSrc" :alt="imgAlt" class="card__img"/>
        <h3 class="card__title">{{ title }}</h3>
        <div class="card__description">{{ content }}</div>
        <div class="card__links">
            <a 
                class="card__links__link" 
                :href="repo" 
                target="_blank"
                :aria-label="`Repo Github de ${title}`"
                :title="`Repo Github de ${title}`"
            >
                <SvgGithub class="card__links__link__icon"/>
            </a>
            <a 
                class="card__links__link" 
                :href="link" 
                target="_blank"
                :aria-label="`Site de ${title}`"
                :title="`Site de ${title}`"
            >
                <SvgWeb class="card__links__link__icon"/>
            </a>
        </div>
        <div class="card__buttons">
            <ButtonsLittle @click="handleOpen">Modifier</ButtonsLittle>
            <ButtonsLittle @click="handleDelete">Supprimer</ButtonsLittle>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.card {
    width: 100%;
    @include card($white);
    @include flex(column, space-between, center, $gap-third-desktop);
    @include responsive-tablette {
        @include flex(column, space-between, center, $gap-third-tablette);        
    }
    @include responsive-mobile {
        @include flex(column, space-between, center, $gap-third-mobile);        
    }
    &__img {
        width: 100%;
        object-fit: cover;
        object-position: center;
        height: 200px;
        @include responsive-tablette {
            height: 300px;
        }
        @include responsive-mobile {
            height: 250px;
        }
    }
    &__title {
        text-align: center;
        @include font-h3($text-color);
    }
    &__description {
        @include font-p($text-color-second);
    }
    &__links {
        width: 100%;
        @include flex(row, center, center, $gap-list);
        &__link {
            @include font-link;
            &__icon {
                height: $icon-height;
                color: $main-color;
            }
        }
    }
    &__buttons {
        width: 100%;
        @include flex(row, center, center, $gap-list);
    }
}

</style>