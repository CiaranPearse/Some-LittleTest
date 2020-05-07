<template>
  <v-container class="file-container">
    <v-row>
      <v-col xs="12" md="6" align="left" light>
        <v-card>
          <v-card-title>File</v-card-title>
          <v-card-text>
            <p class="caption">Results are limited to 1000 (because this is 100% frontend)</p>
            <v-text-field
              v-model="maxRecords"
              label="Change max records (be careful)"
              outlined
              dark
            ></v-text-field>
            <file-reader
              accept=".csv"
              output="text"
              @reader-load="fileLoaded"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="12" md="6">
          <v-card v-if="theJson && !loading" class="file-stats text-left">
            <v-card-title>File Stats for {{fileStats.name}}</v-card-title>
            <v-card-text>
              <v-row>
                <v-col sm="6" md="6">
                  <span class="font-weight-bold">Size: </span> {{fileStats.size}}
                </v-col>
                <v-col sm="12" md="6">
                  <span class="font-weight-bold">Displayed Rows: </span> {{theJson.length + 1}}
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="12" md="12">
                  <span class="font-weight-bold">Last Modified: </span> {{fileStats.lastModifiedDate}}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card v-else>
            <v-card-title>File Stats</v-card-title>
            <v-card-text>
              No file loaded yet
            </v-card-text>
          </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12">
        <div v-if="loading">LOADING...</div>
        <div v-if="theJson && !loading">
          <v-card class="file-results">
            <v-card-title>
              <v-text-field
                v-model="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="jsonHeaders"
              :items="theJson"
              :search="search"
            ></v-data-table>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import FileReader from 'vue-filereader'

export default {
  name: 'File',
  components: {
    FileReader
  },
  data() {
    return {
      byteLength: 0,
      loading: false,
      search: '',
      jsonHeaders: null,
      theJson: null,
      jsonLength: 0,
      fileStats: null,
      totalRows: 0,
      maxRecords: 1000
    }
  },
  beforeMount() {
    const jsonParsed = localStorage.getItem('jsonParsed')
    if (jsonParsed) {
      this.theJson = jsonParsed
    }
  },
  methods: {
    fileLoaded (result) {
      this.loading = true
      console.log('file Loaded')
      this.fileStats = result.file
      this.csvJSON(result.data)
    },
    csvJSON(csv){
      var lines=csv.split("\n");
      var result = [];
      var headers=lines[0].split(",")
      var totalRecords = lines.length
      if (totalRecords > this.maxRecords) {
        totalRecords = this.maxRecords
      }
      this.totalRows = totalRecords
      for(var i=1;i<totalRecords;i++){
          var obj = {};
          var currentline=lines[i].split(",");
          for(var j=0;j<headers.length;j++){
            let currentHeader = headers[j]
            let thisLine = currentline[j]
            currentHeader = currentHeader.replace(/[^a-zA-Z0-9 ]/g, "")
            if (thisLine === '') {
              thisLine = 'BLANK'
            }
              obj[[currentHeader]] = thisLine;
          }

          result.push(obj);

      }
      this.jsonHeaders = this.getHeaders(headers)
      this.theJson = result
      this.totalRows = lines.length
      this.loading = false
    },
    getHeaders(headers) {
      let headerList = []
      headers.forEach(function (item) {
        headerList.push({
          text: item,
          value: item.trim(),
        })
      })
      return headerList
    }
  }
}
</script>

<style lang="scss" scoped>
.file-container {
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  .file-stats {
    margin-bottom: 20px;
  }
}
</style>