<template>
  <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <v-container>
      <v-layout row class="ma-4">
        <v-app style="background-color: grey lighten-1;" class="rounded">
          <v-row>
            <v-col cols="12" md="8" class="ligne">
              <v-container>
                <v-row>
                  <v-col cols="12" md="12">
                    <h1 class="headline mb-2 grey--text">Diagram</h1>
                    <template>
                      <div id="app">
                        <GChart
                          :settings="{packages: ['bar']}"    
                          :data="chartData"
                          :options="chartOptions"
                          :createChart="(el, google) => new google.charts.Bar(el)"
                          @ready="onChartReady"
                        />
                      </div>
                    </template>
                  </v-col>
                  <v-col cols="12" md12><h1 class="headline mb-2 grey--text">Data Table</h1>
                  <v-data-table
                    :headers="headersVData"
                    :items="vTableData"
                    :items-per-page="5"
                    class="elevation-1"
                    ></v-data-table>
                  </v-col>
                  
                </v-row>

              </v-container>
            </v-col>
            <v-col cols="12" md="4">
              <v-container>
                <v-row>
                  <v-col cols="12" md12>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="avatar.png"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>Alturos Demo Project</v-list-item-title>
                        <v-list-item-subtitle>b.adnan33@gmail.com</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon>fas fa-sign-out-alt</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                  </v-col>
                  
                  <v-col cols="12" md12>
                    <v-list-item>
                      <v-list-item-avatar color="grey">
                        <v-icon color="white">fas fa-dollar-sign</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-subtitle>Adnan</v-list-item-subtitle>
                        <v-list-item-title>Brdanin</v-list-item-title>
                      </v-list-item-content>
                      
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-app>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  data: () => ({
    info: null, 
    chartsLib: null, 
    headersVData: [
      
        { text: 'State', value: 'state' },
        { text: 'County', value: 'county' },
        { text: 'Date', value: 'date' },
        { text: 'Cases', value: 'cases' },
        { text: 'Deaths', value: 'deaths' },
    ] ,
    vTableData: [],
    chartData: [], 
  
  }),
  name: 'home',
  components: {

  },
  
  computed: {
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    chartOptions () {
      if (!this.chartsLib) return null
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: 'COVID19 USA',
          subtitle: 'Reported cases and deaths per month'
        },
        bars: 'horizontal', // Required for Material Bar Charts.
        hAxis: { format: 'decimal' },
        height: 600,
        colors: ['#1b9e77', '#d95f02', '#7570b3']
      })
    }
  },
  methods: {
    getProcessedData() {
      let response = this.info;
      let headerProcessedData = ["Date", "Cases", "Deaths"];
      let processedData = [];
      processedData.push(headerProcessedData);
      let dateDataMarch = [0, 0];
      let dateDataApril = [0, 0];
      for (let i = 0; i < response.data.length; i++) {
        //oneRow.push(response.data[i].date);
        //oneRow.push(response.data[i].county);
        //oneRow.push(response.data[i].state);
        if (response.data[i].date[6] == '3') {
          dateDataMarch[0] += response.data[i].cases;
          dateDataMarch[1] += response.data[i].deaths;
        }
        else if (response.data[i].date[6] == '4') {
          dateDataApril[0] += response.data[i].cases;
          dateDataApril[1] += response.data[i].deaths;
        }
      }
     
      processedData.push(["March", dateDataMarch[0], dateDataMarch[1]]);
      processedData.push(["April", dateDataApril[0], dateDataApril[1]]);
      this.chartData = processedData;
    }, 
    onChartReady (chart, google) {
      
      this.chartsLib = google
    }
  },
  mounted() {
    axios
      .get('http://localhost:3000/all')
      .then(response => {
        //let headerProcessedData = ["Date", "County", "State", "Fips", "Cases", "Deaths"];
        this.info = response;
        this.vTableData = response.data;
        this.getProcessedData();
      });
  },
}
</script>
<style scoped>
  .rounded{
    border-radius: 30px;
  }
  .ligne{
    border-right: solid 1px #95a5a6;
  }
</style>