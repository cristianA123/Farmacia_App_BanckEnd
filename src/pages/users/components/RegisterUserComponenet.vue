<template>

</template>

<script>

export default {
  components: {
    userAvatar,
    DialogPasswordComponent,
    ServicesCheckComponent
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  computed: {
    maxCredits : function () {

      return this.user.availableCredit
    },
    minCredits : function () {
      
      return this.user.usedCredit
    }
  },
  mounted() {
    this.getProviders()
  },
  methods : {

  }
}
</script>
