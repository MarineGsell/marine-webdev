<template>
    <section class="about">
        <div class="about__content">
            <div class="about__content__text">
                <h2 class="about__content__text__title">Je suis <span class="about__content__text__title__anim">Marine !</span></h2>
                <p class="about__content__text__content">De kinésithérapeute à développeuse web, mon parcours peut sembler atypique, mais il reflète parfaitement qui je suis : quelqu'un qui aime relever des défis et créer des solutions qui font du bien.
    Après plusieurs années à accompagner mes patients dans leur rétablissement, j'ai ressenti le besoin d'explorer ma créativité autrement. C'est pourquoi j'ai choisi de me reconvertir dans le développement web en suivant la formation développeur web chez OpenClassrooms.
    Aujourd'hui développeuse fullstack junior avec une préférence pour le frontend, je transpose mes qualités d'écoute et d'accompagnement dans la création d'expériences web sur-mesure. Mon approche reste la même : comprendre vos besoins pour concevoir des solutions élégantes qui donnent vie à vos projets.
    Ce qui me motive ? Transformer vos idées en interfaces modernes et accessibles, en alliant créativité visuelle et performance technique. Chaque projet est un nouveau défi créatif que j'aborde avec enthusiasm et attention aux détails.</p>
            </div>
            <NuxtImg src="/avatar.webp" alt="avatar de marine" class="about__content__avatar"/>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.about {
    background-color: $bg-color;
    &__content {
        @include padding-div;
        @include flex(row, center, center, $gap-main-desktop);
        @include responsive-tablette {
            @include flex(row, center, center, $gap-main-tablette);        
        }
        @include responsive-mobile {
            @include flex(column, center, center, $gap-main-mobile);        
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
                @include font-h2($text-color);
                &__anim {
                    @include font-h2($main-color);                
                }
            }
            &__content {
                text-align: justify;
                @include font-p ($text-color)
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