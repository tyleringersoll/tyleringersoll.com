<template>
  <div class="timeline">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.timeline {
  --col-date: 8rem;
  --col-axis: 1.5rem;
  --col-gap: 1.25rem;
  position: relative;

  @include respond-below(xs) {
    --col-date: 6rem;
    --col-gap: 1rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(var(--col-date) + var(--col-gap) + var(--col-axis) / 2);
    width: 1px;
    background: var(--color-text-muted);
    opacity: 0.4;
    pointer-events: none;
  }
}
</style>
