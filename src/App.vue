<template>
  <v-app class="cfoley-app">
    <top-nav :userLoggedIn="userLoggedIn" />
    <v-content class="calcHeight">
      <router-view/>
    </v-content>
    <v-footer
    dark
    padless
    class="footer"
  >
    <v-card
      flat
      tile
      class="white--text text-center full-width"
    >

      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy; {{ new Date().getFullYear() }} — CFoley
      </v-card-text>
    </v-card>
  </v-footer>
  </v-app>
</template>

<script>
import TopNav from '@/components/Nav/TopNav'

export default {
  components: {
    TopNav
  },
  data() {
    return {
      appTitle: 'CSV Test - CFoley',
      userLoggedIn: false
    }
  },
  created() {
    this.$root.$on('loggedIn', (email) => {
      console.log('Logged in: ')
      console.log('Logged in: ', email)
      this.userLoggedIn = true
      localStorage.setItem('user', email)
    })
    this.$root.$on('loggedOut', () => {
      this.userLoggedIn = false
      localStorage.removeItem('user')
    })

  },
  beforeDestroy() {
    this.$off('checkLogin')
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #c9c9c9!important;
  .calcHeight {
    // fills height by removing height of header and footer
    height: calc( 100% - (48px + 60px));
  }
  .footer-text-link {
  color: white !important;
  text-decoration: none;
  }
  .top-nav-link {
    color: white !important;
    text-decoration: none;
  }
  .full-width {
    width: 100%;
  }
}


</style>
