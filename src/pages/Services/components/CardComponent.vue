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

    <!-- <div
      class="content-btns"
    >
      <button
        v-for="typeCampaing in typesCampaing"
        :key="typeCampaing.name"
        class="primer-btn"
        outlined
        @click="$router.push({ name: typeCampaing.path })"
      >{{ typeCampaing.name }}
      </button>
    </div> -->

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
  /* opacity: 0.5; */
  position: absolute;
  background: #e29056c5;
  width: 100%;
  border-radius: 6px;
}

.btn-active{
  color: #fff;
  /* padding-bottom: 5px; */
  /* background: #E29156; */
  font-weight: 700;
  font-size: 0.875rem;
  /* opacity: 1.0 !important; */
  border-radius: 5px;
  border: 1px solid #FFFFFF;
}

.btn-active:hover{
  color: #E29156;
  /* opacity: 1 !important; */
  background: #FFFFFF;
}

.contenedor-padre {
  position: relative;

}

.contenedor-padre:hover .content-btns {
  visibility: visible;
  background: #e29056b4;
  border-radius: 6px;

}

.primer-btn {
  color: #fff;
  padding: 5px;
  padding-bottom: 5px;
  /* background: #e29056b4; */
  font-weight: 700;
  font-size: 0.875rem;
  opacity: 1.0 !important;
  border-radius: 5px;
  border: 1px solid #FFFFFF;
}

.primer-btn:hover {
  color: #e29056b4;
  opacity: 1 !important;
  background: #FFFFFF;
}

.content-btns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  align-items: flex-end;
  visibility: hidden;
  position: absolute;
  z-index: 20;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-right: 20px;
}

.carta {
position: relative;
}

</style>