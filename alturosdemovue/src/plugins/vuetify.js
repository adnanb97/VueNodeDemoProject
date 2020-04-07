import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { colors } from 'vuetify/lib';
import vueGoogleCharts from 'vue-google-charts';

Vue.use(vueGoogleCharts);
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md' || 'fa'
    },
    theme: {
        themes: {
            light: {
                background: colors.blue.accent2
            }, 
            dark: {
                baackground: colors.blue
            }
        }
    }
});
