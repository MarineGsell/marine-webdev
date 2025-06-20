<template>
    <section class="container">
        <div class="container__flowers">
            <SvgFleur class="container__flowers__1"/>
            <SvgFleur class="container__flowers__2"/>
            <SvgFleur class="container__flowers__3"/>
            <SvgFleur class="container__flowers__4"/>
            <SvgFleur class="container__flowers__5"/>
            <SvgFleur class="container__flowers__6"/>
            <SvgFleur class="container__flowers__7"/>
            <SvgFleur class="container__flowers__8"/>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 80vh;
    background-color: $bg-color;
    padding: $gap-main-desktop 0;
    // @include responsive-tablette {
    //     height: 80vh;
    // }
    // @include responsive-mobile {
    //     height: 100vh;
    // }
    &__flowers {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 0;
        @include padding-div;
        @include responsive-tablette {
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(4, 1fr);
        }
        @include responsive-mobile {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(5, 1fr);        
        }
        &__1 {
            @include flower-style(2, 8, end, start, 25%, 0%, $flower-blue, $flower-medium-desktop);
            @include responsive-tablette {
                @include flower-style(1, 1, center, center, 0%, 0%, $flower-blue, $flower-big-tablette);        
            }
            @include responsive-mobile {
                @include flower-style(2, 5, center, center, 0%, 0%, $flower-blue, $flower-medium-mobile);        
            }
        }
        &__2 {
            @include flower-style(1, 3, start, start, -25%, 0%, $flower-orange, $flower-medium-desktop);
            @include responsive-tablette {
                @include flower-style(2, 2, center, center, 0%, 0%, $second-color, $flower-medium-tablette);        
            }
            @include responsive-mobile {
                @include flower-style(1, 3, center, center, 0%, 0%, $flower-orange, $flower-medium-mobile);        
            }
        }
        &__3 {
            @include flower-style(2, 4, end, start, -25%, 25%, $flower-blue, $flower-big-desktop);
            @include responsive-tablette {
                @include flower-style(1, 3, center, center, 0%, 0%, $flower-purple, $flower-little-tablette);        
            }
            @include responsive-mobile {
                @include flower-style(2, 4, center, center, 0%, 0%, $flower-blue, $flower-big-mobile);        
            }        
        }
        &__4 {
            @include flower-style(3, 2, start, start, 25%, 25%, $flower-purple, $flower-little-desktop);
            @include responsive-tablette {
                @include flower-style(2, 4, center, center, 0%, 0%, $flower-blue, $flower-little-tablette);        
            }
            @include responsive-mobile {
                @include flower-style(3, 2, center, center, 0%, 0%, $flower-purple, $flower-little-mobile);        
            }        
        }
        &__5 {
            @include flower-style(2, 1, start, center, -25%, -25%, $second-color, $flower-big-desktop);
            @include responsive-tablette {
                @include flower-style(1, 5, center, center, 0%, 0%, $flower-orange, $flower-medium-tablette);        
            }
            @include responsive-mobile {
                @include flower-style(2, 1, center, center, 0%, 0%, $second-color, $flower-big-mobile);        
            }        
        }
        &__6 {
            @include flower-style(3, 6, start, end, 25%, -25%, $second-color, $flower-big-desktop);
            @include responsive-tablette {
                @include flower-style(3, 1, center, center, 0%, 0%, $flower-purple, $flower-little-tablette);        
            }
            @include responsive-mobile {
                @include flower-style(3, 4, center, center, 0%, 0%, $second-color, $flower-big-mobile);        
            }        
        }
        &__7 {
            @include flower-style(1, 7, end, start, -50%, 0%, $flower-orange, $flower-little-desktop);
            @include responsive-tablette {
                @include flower-style(3, 3, center, center, 0%, 0%, $flower-orange, $flower-big-tablette);        
            }
            @include responsive-mobile {
                @include flower-style(1, 4, center, center, 0%, 0%, $flower-orange, $flower-little-mobile);        
            }        
        }
        &__8 {
            @include flower-style(2, 5, end, start, 0%, -50%, $flower-purple, $flower-medium-desktop);
            @include responsive-tablette {
                @include flower-style(4, 4, center, center, 0%, 0%, $flower-purple, $flower-medium-tablette);        
            }
            @include responsive-mobile {
                @include flower-style(2, 4, center, center, 0%, 0%, $flower-purple, $flower-medium-mobile);        
            }        
        }
    }
}
</style>