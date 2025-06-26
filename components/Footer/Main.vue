<script setup>
</script>
<template>
    <footer class="footer" id="contact">
        <NuxtImg 
            class="footer__avatar"
            src="/avatar.webp"
            alt="avatar de marine web dev"
        />
        <section class="footer__content">
            <h2 class="footer__content__title">Discutons !</h2>
            <div class="footer__content__info">
                <FooterInfoLine 
                    title="Linkedin"
                    text="Marine Chopin Gsell"
                >
                    <a 
                        href="https://www.linkedin.com/in/marine-chopin-gsell-07941a334/"
                        target="_blank"
                        class="footer__content__info__link"
                    >
                        <SvgLinkedin class="footer__content__info__link__icon"/>
                    </a>
                </FooterInfoLine>
                <FooterInfoLine 
                    title="E-mail"
                    text="marine@chopingsell.com"
                >
                    <SvgMail class="footer__content__info__icon"/>
                </FooterInfoLine>
                <FooterInfoLine 
                    icon="SvgPhone"
                    title="Téléphone"
                    text="07.78.91.80.58"
                >
                    <SvgPhone class="footer__content__info__icon"/>
                </FooterInfoLine>
            </div>
        </section>
    </footer>
</template>
<style lang="scss" scoped>
.footer {
    background-color: $bg-color;
    padding-bottom: $gap-second-desktop;
    @include padding-top-section;
    @include flex(row, center, center, $gap-main-desktop);
    @include responsive-tablette {
        padding-bottom: $gap-second-tablette;
        @include flex(row, center, center, $gap-main-tablette)
    }
    @include responsive-mobile {
        padding-bottom: $gap-second-mobile;
        @include box(center)
    }
    &__avatar {
        height: 400px;
        @include responsive-tablette {
            height: 320px;
        }
        @include responsive-mobile {
            display: none;
        }
    }
    &__content {
        @include flex(column, center, start, $gap-second-desktop);
        @include responsive-tablette {
            @include flex(column, center, start, $gap-second-tablette)
        }
        @include responsive-mobile {
            @include flex(column, center, start, $gap-second-mobile)
        }
        &__title {
            @include font-h2($text-color);
        }
        &__info {
            @include flex(column, center, start, $gap-third-desktop);
            @include responsive-tablette {
                @include flex(column, center, start, $gap-third-tablette)
            }
            @include responsive-mobile {
                @include flex(column, center, start, $gap-third-mobile)
            }
            &__link {
                display: block;
                height: 32px;
                @include responsive-tablette {
                    height: 24px;
                }
                &__icon {
                    color: $white;
                    height: 32px;
                    @include responsive-tablette {
                        height: 24px;
                    }
                }
            }
            &__icon {
                color: $white;
                height: 32px;
                @include responsive-tablette {
                    height: 24px;
                }
            }
        }
    }
}
</style>