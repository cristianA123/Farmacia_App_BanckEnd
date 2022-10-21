<template>
  <div>
    <v-card >
      <v-card-title>Total de clics / Apertura</v-card-title>
      <v-card-text class="">
        <div class="content-percentage d-flex justify-sm-center align-sm-center" >
          <div
            class="percentage"
          >{{ progress }}%</div>
        </div>
      </v-card-text>
    </v-card>
      
  </div>
  
</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  data () {
    return {
      progress: 0
    }
  },
  created () {
    this.getOpenCliks()
  },
  methods: {
    getOpenCliks() {
      const payload = {
        url_id: this.$route.params.id
      }

      BackendApi.post('/openClicks', payload).then(({ data }) => {
        if (data.success) {
          this.progress = data.data
        }
      }).catch((error) => {
      })
    }
  }
  
}
</script>

<style lang="css" scoped>
  .percentage{
    color: #F06292;
    font-size: 128px;
    font-weight: 900;
    /* height: 250px; */
  }
  .content-percentage {
    height: 310px
  }
</style>>
