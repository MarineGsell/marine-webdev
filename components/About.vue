<script setup>
const texts = [
    'Marine !',
    'développeuse fullstack junior ...',
    'créatrice d\'expériences web ...',
    'développeuse créative ...'
]

const displayedText = ref('')

let currentTextIndex = 0
let currentCharIndex = 0
let isDeleting = false
let timeoutId = null

const typeSpeed = 120
const deleteSpeed = 60
const pauseDuration = 2500

const typeWriter = () => {
    const currentText = texts[currentTextIndex]

    if (isDeleting) {
        displayedText.value = currentText.substring(0, currentCharIndex - 1)
        currentCharIndex --

        if(currentCharIndex === 0) {
            isDeleting = false
            currentTextIndex = (currentTextIndex + 1) % texts.length
            timeoutId = setTimeout(typeWriter, typeSpeed)
        } else {
            timeoutId = setTimeout(typeWriter, deleteSpeed)
        }
    } else {
        displayedText.value = currentText.substring(0, currentCharIndex +1)
        currentCharIndex ++

        if(currentCharIndex === currentText.length) {
            isDeleting = true
            timeoutId = setTimeout(typeWriter, pauseDuration)
        } else {
            timeoutId = setTimeout(typeWriter, typeSpeed)
        }
    }
}

// Démarer l'animation
onMounted(() => {
    setTimeout(() => {typeWriter()}, 500)
})

// Nettoyer le timer
onUnmounted(() => {
    if(timeoutId) {
        clearTimeout(timeoutId)
    }
})
</script>
<template>
    <section class="about" id="about">
        <div class="about__content">
            <div class="about__content__text">
                <div class="about__content__text__title">
                    <h2 class="about__content__text__title__line1">Salut,</h2>
                    <div class="about__content__text__title__line2">
                        <h2 class="about__content__text__title__line2__text">
                            Je suis 
                            <span class="about__content__text__title__line2__text__typewriter">{{ displayedText }}</span>
                            <span class="about__content__text__title__line2__text__cursor"></span>
                        </h2>
                    </div>
                </div>
                <div class="about__content__text__content">
                    <p class="about__content__text__content__p">De kinésithérapeute à développeuse web, mon parcours peut sembler atypique, mais il reflète parfaitement qui je suis : quelqu'un qui aime relever des défis et créer des solutions qui font du bien.</p>
                    <p class="about__content__text__content__p">Après plusieurs années à accompagner mes patients dans leur rétablissement, j'ai ressenti le besoin d'explorer ma créativité autrement. C'est pourquoi j'ai choisi de me reconvertir dans le développement web en suivant la formation développeur web chez OpenClassrooms.</p>
                    <p class="about__content__text__content__p">Aujourd'hui développeuse fullstack junior avec une préférence pour le frontend, je transpose mes qualités d'écoute et d'accompagnement dans la création d'expériences web sur-mesure. Mon approche reste la même : comprendre vos besoins pour concevoir des solutions élégantes qui donnent vie à vos projets.</p>
                    <p class="about__content__text__content__p">Ce qui me motive ? Transformer vos idées en interfaces modernes et accessibles, en alliant créativité visuelle et performance technique. Chaque projet est un nouveau défi créatif que j'aborde avec enthousiasme et attention aux détails.</p>
                </div>
            </div>
            <NuxtImg src="/avatar.webp" alt="avatar de marine" class="about__content__avatar"/>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.about {
    background-color: $bg-color;
    @include padding-top-section;
    &__content {
        @include padding-div;
        @include flex(row, center, center, $gap-second-desktop);
        @include responsive-tablette {
            @include flex(column, center, center, $gap-second-tablette);        
        }
        @include responsive-mobile {
            @include flex(column, center, center, $gap-second-mobile);        
        }
        &__text {
            @include flex(column, center, start, $gap-second-desktop);
            @include responsive-tablette {
                @include flex(column, center, start, $gap-second-tablette);        
            }
            @include responsive-mobile {
                @include flex(column, center, start, $gap-second-mobile);        
            }
            &__title {
                @include flex(column, center, start, 0);
                @include responsive-mobile {
                    @include flex(column, center, start, 0)
                }
                &__line1 {
                    @include font-h2($text-color);
                }
                &__line2 {
                    height: 60px;
                    &__text {
                        @include font-h2($text-color);
                        &__typewriter {
                            @include font-h2($main-color);
                        }
                        &__cursor {
                            display: inline-block;
                            background-color: $main-color;
                            height: 48px;
                            width: 3px;
                            margin-left: 4px;
                            animation: cursor 1.2s ease-in-out infinite;
                            @include responsive-tablette {
                                height: 40px;
                            }
                            @include responsive-mobile {
                                height: 32px;
                            }
                        }
                    }
                }
            }
            &__content {
                @include flex(column, center, start, 0);
                @include responsive-tablette {
                    @include flex(column, center, start, 0);        
                }
                @include responsive-mobile {
                    @include flex(column, center, start, 0);        
                }
                &__p {
                    text-align: justify;
                    @include font-p ($text-color)
                }
            }
        }
        &__avatar {
            height: 400px;
            @include responsive-tablette {
                height: 320px;
            }
            @include responsive-mobile {
                height: 240px;
            }
        }
    }
}
</style>