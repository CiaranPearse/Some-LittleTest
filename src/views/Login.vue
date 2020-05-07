<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            dark
            flat
            class="login-title"
          >
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            fake@example.com / fakePassword
            <v-alert v-if="error !== ''" type="error">
              {{ this.error }}
            </v-alert>
            <v-form>
              <v-text-field
                v-model="email"
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              />

              <v-text-field
                v-model="pass"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="this.checkFakeLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      pass: null,
      error: ''
    }
  },
  methods: {
    checkFakeLogin () {
      if (this.email === 'fake@example.com' && this.pass === 'fakePassword') {
        this.error = ''
        this.$root.$emit('loggedIn', this.email)
        this.$router.push('/')
      } else {
        console.log('NOT WORKED')
        this.error = 'Email or password incorrect'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>