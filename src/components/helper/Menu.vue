<template>
  <v-menu
    v-model="menu"
    content-class="dropdown-logout"
    fixed
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-img :src="user.photoURL" class="border-circle" alt="profile-photo" />
        <!-- <v-icon>mdi-dots-vertical</v-icon> -->
        <!-- Click me -->
      </v-btn>
    </template>

    <v-card class="border-rounded">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12 md8>
            <v-img
              :src="user.photoURL"
              class="border-circle img-fluid mx-auto"
              alt="profile-photo"
            />
          </v-flex>
          <v-flex xs12 align-center justify-center>
            <h3 class="my-2">{{user.displayName}}</h3>
            <h5>{{user.email}}</h5>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>

      <v-list>
        <v-list-tile class="text-xs-center">
          <v-list-tile-action>
            <v-btn
              class="ml-0 google-font hidden-sm-and-down"
              style="text-transform: capitalize;"
              flat
              @click="logout"
            >
              <!-- 
                Adding a logout icon over here will be fab
                <v-icon>mdi-Logout</v-icon> 
              -->
              Logout
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: ["userData"],
  data() {
    return {
      user: {},
      fav: true,
      menu: false,
      message: false,
      hints: true
    };
  },
  methods: {
    logout() {
      this.$emit("userLogout");
    }
  },
  mounted() {
    this.user = this.userData;
  }
};
</script>

<style>
.dropdown-logout.v-menu__content {
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}
.v-list__tile__action {
  margin: 0 auto;
}
</style>