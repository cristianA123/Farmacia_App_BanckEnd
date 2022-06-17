<template>
  <div class="contenedor-padre">
   
    <v-hover v-slot="{ hover }">
      <v-card
        class="carta"
      >
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
          {{ descripcion }}
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
                    class="my-1 btn-active  px-1 py-1"
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
      default: 'https://cdn.discordapp.com/attachments/783095481227935744/984848205038645328/img_canal_email.png'
    }, 
    descripcion: {
      type: String,
      default: '160 Caracteres = ~1 crédito'
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
/* .v-card__text{
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 16px;
  padding-top: 16px;
} */

.v-card--reveal {
  align-items: center;
  bottom: 0;
  padding-left: 0;
  justify-content: center;
  position: absolute;
  background: #e29056c5;
  width: 100%;
  border-radius: 6px;
}

.btn-active{
  color: #fff;
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 5px;
  border: 1px solid #FFFFFF;
}

.btn-active:hover{
  color: #E29156;
  background: #FFFFFF;
}

</style>