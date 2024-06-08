import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        defaultTheme: "light",
        themes: {
            light: {
                colors: {
                    primary: "#E91E63 !important",
                },
            },
        },
    },
});
