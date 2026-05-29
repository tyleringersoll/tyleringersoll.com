<template>
  <div v-if="untappdData" class="untappd__beers">
    <template v-if="icons">
      <div
        v-for="(beerItem, index) in filteredBeerData"
        :key="`beer-${beerItem.beer.bid || index}`"
        class="untappd__beer"
      >
        <img
          class="untappd__icon"
          :src="beerItem.beer.beer_label"
          :alt="beerItem.beer.beer_name"
          loading="lazy"
        />
        <div class="untappd__info">
          <img
            class="untappd__icon"
            :src="beerItem.beer.beer_label"
            :alt="beerItem.beer.beer_name"
            loading="lazy"
          />
          <h3 v-html="beerItem.beer.beer_name" />
          <p v-html="beerItem.beer.beer_description" />
        </div>
      </div>
    </template>

    <ul v-else-if="list" class="untappd__list">
      <li v-for="(beerItem, index) in beerData" :key="`beer-list-${index}`">
        ({{ beerItem.count }}) <strong v-html="beerItem.beer.beer_name" /> by
        <em v-html="beerItem.brewery.brewery_name" /> <br />
        {{ beerItem.beer.beer_style }} / {{ beerItem.beer.beer_abv }}% ABV
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted } from "vue";
import { getApiData } from "~/services/api.service";

const mediaQuery = inject("mediaQuery");
const config = useRuntimeConfig();

const props = defineProps({
  heading: {
    type: String,
    default: null,
  },
  content: {
    type: Array,
    default: () => [],
  },
  sort: {
    type: String,
    default: "highest_rated_you",
  },
  user: {
    type: String,
    default: "drinkingisawesome",
  },
  limit: {
    type: [String, Number],
    default: 10,
  },
  icons: {
    type: Boolean,
    default: false,
  },
  list: {
    type: Boolean,
    default: false,
  },
});

const untappdData = ref(null);

const beerData = computed(() => {
  return untappdData.value?.response?.beers?.items || null;
});

const maxItems = computed(() => {
  const limit = Number(props.limit);
  return mediaQuery?.isSmall ? Math.min(9, limit) : limit;
});

const filteredBeerData = computed(() => {
  if (!beerData.value) return [];
  return beerData.value.slice(0, maxItems.value);
});

const getUntappdData = async () => {
  const domain = "https://api.untappd.com";
  const api = "v4";
  const method = "user/beers";
  const clientId = config.public.untappdClientId;
  const clientSecret = config.public.untappdClientSecret;

  if (!clientId || !clientSecret) {
    console.warn(
      "Untappd API credentials not configured. Check environment variables."
    );
    return;
  }

  const apiUrl = `${domain}/${api}/${method}/${props.user}?client_id=${clientId}&client_secret=${clientSecret}&limit=${props.limit}&sort=${props.sort}`;

  try {
    const apiData = await getApiData(apiUrl);
    untappdData.value = apiData;
  } catch (error) {
    console.error("Failed to fetch Untappd beers:", error);
  }
};

onMounted(() => {
  getUntappdData();
});
</script>

<style lang="scss" scoped>
.untappd {
  &__beers {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: center;
    margin: $spacing-lg -0.5rem 0;
  }

  &__beer {
    flex: 1 0 33.333%;
    padding: $spacing-xs;

    @include respond-to(xs) {
      flex: 1 0 20%;
    }
  }

  &__icon {
    width: 100%;
    height: auto;
    box-shadow: 0;
    @include transition(all);
    border: 2px solid #ff6f69;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
        rgba(0, 0, 0, 0.05) 0px 5px 10px;
      border: 2px solid #000;
    }
  }

  &__info {
    display: none;
  }

  &__list {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      list-style: none;
      display: block;
      margin-bottom: $spacing-xs;
    }
  }
}
</style>
