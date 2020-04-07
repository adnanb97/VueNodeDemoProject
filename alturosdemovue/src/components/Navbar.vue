<template>
    <nav>
        <v-navigation-drawer v-model="drawer" dark="" app class="blue accent-2">
            <v-layout column align-center>
                <v-flex class="mt-10 mb-8">
                    <v-avatar>
                        <v-icon large>fas fa-store</v-icon>
                    </v-avatar>
                </v-flex>
            </v-layout>
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route" active-class="border">
                    <v-list-item-action>
                        <v-icon>{{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{link.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-flex class="ma-2">
                
            </v-flex>
        </v-navigation-drawer>
    </nav>
</template>
<script>
export default {
    data: () => ({
        drawer: true, 
        links: [
            {icon: 'fas fa-home', text: 'Home', route: '/'},
         ] 
    })
}
</script>
<style scoped>
.border{
    border-left: 4px solid #2c3e50;
}
</style>