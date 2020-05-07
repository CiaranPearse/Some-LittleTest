<template>
  <div>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
  >
    <v-list dense>
      <div v-if="!userLoggedIn">
        <div v-for="(link, index) in loggedOutLinks" :key="index">
          <v-list-item link :to="link.dest">
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ link.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>
      <div v-if="userLoggedIn">
        <div v-for="(link, index) in loggedInLinks" :key="index">
          <v-list-item link :to="link.dest">
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ link.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-list-item link @click="this.logUserOut">
          <v-list-item-action>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar
    app
    clipped-left
    class="header"
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title>Cfoley / Calypso</v-toolbar-title>
  </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  props: {
    userLoggedIn: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    drawer: null,
    appTitle: 'Cfoley CSV',
    loggedInLinks: [
      {
        name: 'Home',
        icon: 'mdi-home',
        dest: '/'
      },
      {
        name: 'File',
        icon: 'mdi-file',
        dest: '/file'
      }
    ],
    loggedOutLinks: [
      {
        name: 'Home',
        icon: 'mdi-home',
        dest: '/'
      },
      {
        name: 'Login',
        icon: 'mdi-lock-open',
        dest: '/login'
      }
    ]
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
  methods: {
    logUserOut() {
      this.$root.$emit('loggedOut')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #0cbaba;
  background-image: linear-gradient(315deg, #0cbaba 0%, #380036 74%);
}
</style>