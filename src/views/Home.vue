<template>
  <v-container class="file-container">
    <v-row>
      <v-col xs="12" align="left" light>
        <v-card>
            <v-card-title>Ciaran Foley - Calypso Frontend test</v-card-title>
            <v-card-subtitle>Time taken: 4.5 hours</v-card-subtitle>
            <v-card-text>
              <ul>
                <li>This is a 100% frontend app so all auth and persistance has been faked.</li>
                <li>CSV "upload" is loaded with the FILE API and then converted into JSON</li>
                <li>Regex is run on the keys as some of them were badly formed (space etc.)</li>
                <li>Any empty data has been replaced with "BLANK"</li>
                <li>Data is limited to 1000 rows (can be overridden) as it gets very slow if parsing 1000s of lines client side</li>
                <li>I did use a current project as a starting point to save time so there may be a relic or 2 in the commits although I tried to clean them all up</li>
              </ul>
            </v-card-text>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
    }
  }
}
</script>
