<template>
    <section class="header-hero">
        <div class="header-hero__container">
            <SvgFleur class="header-hero__container__left"/>
            <div class="header-hero__container__content">
                <div class="header-hero__container__content__title">
                    <SvgLogo class="header-hero__container__content__title__logo"/>
                    <h1 class="header-hero__container__content__title__line">Créatrice d'expérience web sur mesure</h1>
                </div>
                <ButtonsMain class="header-hero__container__content__button">Contactez moi</ButtonsMain>
            </div>
            <SvgFleur class="header-hero__container__right"/>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.header-hero {
    background-color: $bg-color;
    padding-top: 72px;
    &__container {
        width: 100%;
        max-width: 1440px;
        margin: auto;
        height: calc(100vh - 72px);
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(7, 1fr);
        @include responsive-tablette {
            // height: 80vh;
            grid-template-columns: repeat(3, 1fr); 
            grid-template-rows: repeat(4, 1fr);
        }
        @include responsive-mobile {
            // height: 70vh;
        }
        &__left {
            grid-row: 1;
            grid-column: 1;
            justify-self: center;
            align-self: center;
            @include flower($second-color);
        }
        &__right {
            grid-row: 7;
            grid-column: 5;
            justify-self: center;
            align-self: center;
            @include flower($second-color);
            @include responsive-tablette {
                grid-row: 4;    
                grid-column: 3; 
            }
        }
        &__content {
            grid-area: 2 / 2 / 7 / 5;
            @include flex(column, center, center, $gap-main-desktop);
            @include responsive-tablette {
                grid-area: 2 / 1 / 4 / 4;
                @include flex(column, center, center, $gap-main-tablette);
            }
            @include responsive-mobile {
                @include flex(column, center, center, $gap-main-mobile);
            }
            &__title {
                @include flex(column, center, center, $gap-third-desktop);
                @include responsive-tablette {
                    @include flex(column, center, center, $gap-third-tablette);
                }
                @include responsive-mobile {
                    @include flex(column, center, center, $gap-third-mobile);
                }
                &__logo {
                    height: 200px;
                    @include responsive-tablette {
                    }
                    @include responsive-mobile {
                        height: 96px;
                    }
                }
                &__line {
                    @include font-subtitle;
                }
            }
        }
    }
}
</style>