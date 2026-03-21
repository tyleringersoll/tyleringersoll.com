<template>
  <header v-if="content" class="header container">
    <div class="header__container">
      <div
        class="header__content"
        @keydown.enter="() => $router.push('/')"
        @click="() => $router.push('/')"
      >
        <router-link to="/" custom>
          <h1
            class="header__name"
            tabindex="0"
            title="Home"
            role="link"
            v-html="content.name"
          />
        </router-link>
      </div>
      <div class="header__image">
        <img
          src="/profile_glitch_subtle.gif"
          :alt="`Profile image of ${content.name}`"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  content: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped>
.header {
  @include respond-below(sm) {
    margin: $spacing-lg 0 $spacing-sm;
    padding: 0 $spacing-sm;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap-reverse;
    margin: $spacing-lg auto 0;

    @include respond-to(sm) {
      margin: $spacing-lg auto $spacing-xs;
      justify-content: space-between;
    }
  }

  &__content {
    margin-top: $spacing-sm;
    width: 100%;
    text-align: center;

    @include respond-to(sm) {
      margin-top: 0;
      width: auto;
      text-align: left;
    }
  }

  &__image {
    position: relative;
    width: 280px;
    height: 280px;
    border: 2px solid var(--color-accent-line);
    border-radius: 50%;
    overflow: hidden;

    @include respond-to(sm) {
      width: 220px;
      height: 220px;
    }

    img {
      @include absolute-center;
      height: 100%;
    }
  }

  &__name {
    @include respond-to(sm) {
      cursor: pointer;

      &::before {
        display: block;
        content: "";
        padding-bottom: $spacing-sm;
        border-top: 2px solid var(--color-accent-line);
        transform: scaleX(0);
        transform-origin: 0% 50%;
        @include transition(transform, 250ms, ease-in-out);
      }

      &::after {
        display: block;
        content: "";
        padding-top: $spacing-sm;
        border-bottom: 2px solid var(--color-accent-line);
        transform: scaleX(0);
        transform-origin: 100% 0%;
        @include transition(transform, 250ms, ease-in-out);
      }

      &:hover {
        color: var(--color-link);

        &::before,
        &::after {
          transform: scaleX(1);
        }
      }
    }
  }
}
</style>
