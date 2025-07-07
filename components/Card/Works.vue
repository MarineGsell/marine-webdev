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
})
</script>
<template>
    <div class="card">
        <NuxtImg :src="imgSrc" :alt="imgAlt" class="card__img"/>
        <h3 class="card__title">{{ title }}</h3>
        <div class="card__content">
            <ul class="card__content__description">
                <li class="card__content__description__item">{{ content }}</li>
            </ul>
            <ul class="card__content__link">
                <li class="card__content__link__item">
                    <a 
                        class="card__content__link__item__link" 
                        :href="repo" 
                        target="_blank"
                        :aria-label="`Repo Github de ${title}`"
                        :title="`Repo Github de ${title}`"
                    >
                        <SvgGithub class="card__content__link__item__link__icon"/>
                    </a>
                </li>            
                <li class="card__content__link__item" v-if="link !== ''">
                    <a 
                    class="card__content__link__item__link" 
                    :href="link" 
                    target="_blank"
                    :aria-label="`Site de ${title}`"
                    :title="`Site de ${title}`"
                    >
                        <SvgWeb class="card__content__link__item__link__icon"/>
                    </a>
                </li>            
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.card {
    width: 100%;
    transition: $transition;
    height: 400px;
    &:hover {
        height: 600px;
        @include responsive-tablette {
            height: 640px;
        }
        @include responsive-mobile {
            height: 560px;
        }
        .card__content__description {
            opacity: 1;
            height: 200px;
            width: 90%;
            @include responsive-tablette {
                height: 154px;
            }
            @include responsive-mobile {
                height: 160px;
            }
        }
    }
    @include card($bg-color);
    @include flex(column, start, center, $gap-third-desktop);
    @include responsive-tablette {
        height: 480px;
        @include flex(column, start, center, $gap-third-tablette);        
    }
    @include responsive-mobile {
        height: 400px;
        @include flex(column, start, center, $gap-third-mobile);        
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
        &__hover {
            display: none;
        }
    }
    &__title {
        text-align: center;
        @include font-h3($text-color);
    }
    &__content {
        width: 100%;
        @include flex(column, center, center, 0);
        &__description {
            opacity: 0;
            height: 0;
            transition: $transition;
            list-style: none;
            &__item {
                text-align: center;
                @include font-p($text-color-second);
            }
        }
        &__link {
            width: 100%;
            list-style: none;
            @include flex(row, center, center, $gap-list); 
            &__item {
                &__link {
                    &__icon {
                        height: $icon-height;
                        color: $main-color;
                    }
                }
            }
        }
        &__admin {
            width: 100%;
            @include flex(row, center, center, $gap-third-desktop);
            @include responsive-tablette {
                @include flex(column, center, center, $gap-third-tablette);
            }
            @include responsive-mobile {
                @include flex(column, center, center, $gap-third-mobile);
            }
        }
    }
}

</style>