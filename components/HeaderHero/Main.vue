<template>
    <section class="header-hero">
        <SvgFleur class="header-hero__left"/>
        <div class="header-hero__content">
            <SvgLogo class="header-hero__content__logo"/>
            <div class="header-hero__content__title">
                <h1 class="header-hero__content__title__line">Créatrice d'expérience web sur mesure</h1>
            </div>
        </div>
        <ButtonsMain class="header-hero__content__button">Contactez moi</ButtonsMain>
        <SvgFleur class="header-hero__right"/>
    </section>
</template>
<style lang="scss" scoped>
.header-hero {
    background-color: $bg-color;
    height: calc(100vh - 72px);
    @include flex(column, center, center, $gap-main-desktop);
    @include responsive-tablette {
        @include flex(column, center, center, $gap-main-tablette);
    }
    @include responsive-mobile {
        @include flex(column, center, center, $gap-main-mobile);
    }
    &__left {
        top: 72px;
        left: 0;
        @include flower($second-color)
    }
    &__content {
        @include flex(column, center, center, $gap-second-desktop);
        @include responsive-tablette {
            @include flex(column, center, center, $gap-second-tablette);
        }
        @include responsive-mobile {
            @include flex(column, center, center, $gap-second-mobile);
        }
        &__logo {
            height: 200px;
            @include responsive-tablette {
            }
            @include responsive-mobile {
                height: 96px;
            }
        }
        &__title {
            height: 36px;
            overflow: hidden;
            @include responsive-tablette {
                height: 33px;
            }
            @include responsive-mobile {
                height: 30px;
            }
            &__line {
                @include font-h1-anim;
            }
        }
    }
    &__right {
        right: 0;
        top: calc(100vh - $flower-height-desktop - $margin-flower-desktop * 2);
        @include flower($second-color);
        @include responsive-tablette {
            top: calc(100vh - $flower-height-tablette - $margin-flower-tablette * 2);
        }
        @include responsive-mobile {
            top: calc(100vh - $flower-height-mobile - $margin-flower-mobile * 2);
        }
    }
}
</style>