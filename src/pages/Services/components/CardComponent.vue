<template>
  <div>

    <v-hover v-slot="{ hover }">
      <v-card>
        <v-card-title>
          {{ title }}
        </v-card-title>

        <div
          class="d-flex justify-center align-center "
        >
          <!-- :aspect-ratio="16/9" -->
          <v-img
            width="auto"
            :src="img"
          >

          </v-img>

        </div>
        <v-card-text
          class="d-flex justify-center align-center "
        >
          160 Caracteres = ~1 crédito
        </v-card-text>

        <v-expand-transition>
          <div
            v-if="hover"
          >
            <div
              class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal text-h2 white--text"
              style="height: 100%;"
            >
              <v-card-text>
                <v-col
                  class="d-flex align-end flex-column"
                >
                  <button
                    v-for="typeCampaing in typesCampaing"
                    :key="typeCampaing.name"
                    class="my-1 btn-active  px-1"
                    outlined
                    @click="$router.push({ name: typeCampaing.path })"
                  >{{ typeCampaing.name }}</button>

                </v-col>
              </v-card-text>
            </div>
          </div>
        </v-expand-transition>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    // Current logged user
    title: {
      type: String,
      default: 'Sms'
    },
    img: {
      type: String,
      default: 'http://localhost:8080/images/services/img_canal_email.png'
    },
    typesCampaing: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      name: 'agenda'
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }

}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  background: #E29156;
  width: 100%;
  border-radius: 6px;
}

.btn-active{
  color: #fff;
  /* margin-left: 5px; */
  /* margin-right: 5px; */
  /* margin-top: 10px; */
  /* margin-bottom: 10px; */
  padding-bottom: 5px;
  background: #E29156;
  font-weight: 700;
  font-size: 0.875rem;
  opacity: 1.0 !important;
  border-radius: 5px;
  border: 1px solid #FFFFFF;
  /* margin: 10px; */
}

.btn-active:hover{
  color: #E29156;
  opacity: 1 !important;
  background: #FFFFFF;
}
</style>