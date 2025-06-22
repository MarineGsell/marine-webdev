<script setup>
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
    category: {
        type: String,
        required: true
    },
    techno: {
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
    }
})
</script>
<template>
    <div class="card">
        <NuxtImg :src="imgSrc" :alt="imgAlt" class="card__img"/>
        <h3 class="card__title">{{ title }}</h3>
        <ul class="card__content">
            <li class="card__content__item">{{ category }}</li>
            <li class="card__content__item">{{ techno }}</li>
            <li class="card__content__item">
                <NuxtLink class="card__content__item__link" :to="repo">{{ repo }}</NuxtLink>
            </li>            
            <li class="card__content__item">
                <NuxtLink class="card__content__item__link" :to="link">{{ link }}</NuxtLink>
            </li>            
        </ul>
    </div>
</template>
<style lang="scss" scoped>
.card {
    width: 100%;
    @include card($bg-color);
    @include flex(column, start, start, $gap-third-desktop);
    @include responsive-tablette {
        @include flex(column, start, start, $gap-third-tablette);        
    }
    @include responsive-mobile {
        @include flex(column, start, start, $gap-third-mobile);        
    }
    &__img {
        width: 100%;
        object-fit: cover;
        object-position: center;
        height: 200px;
        @include responsive-tablette {
            height: 180px;
        }
        @include responsive-mobile {
            height: 160px;
        }
    }
    &__title {
        @include font-h3;
    }
    &__content {
        list-style: none;
        @include flex(column, start, center, $gap-list);
        &__item {
            @include font-p($text-color);
            &__link {
                text-decoration: none;
                @include font-p($text-color);            
            }
        }
    }
}

</style>