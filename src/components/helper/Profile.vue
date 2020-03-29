<template>
  <v-menu
    :close-on-content-click="false"
    :nudge-width="200"
    v-model="menu"
    content-class="dropdown-logout border-rounded"
    offset-y
  >
    <v-btn icon slot="activator">
      <img :src="user.photoURL" alt="profile-photo" class="border-circle toolbar-profile-icon" />
    </v-btn>
    <v-card class="border-rounded">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12 md8>
            <img
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
        <v-list-tile>
          <v-list-tile-action>
            <v-btn
              class="ml-0 google-font hidden-sm-and-down"
              style="text-transform: capitalize;"
              flat
              @click="logout"
            >
              <!-- <v-icon>input</v-icon> -->
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
    let self = this
    return {
      user: self.userData,
      menu: false
    };
  },
  methods: {
    logout() {
      this.$emit("userLogout");
    }
  },
  watch: {
    userData() {
      let self = this
      self.user = self.userData
    }
  }
};
</script>

<style>
.dropdown-logout.v-menu__content {
  max-width: 236px;
}
.v-list__tile__action {
  margin: 0 auto;
}
.toolbar-profile-icon {
  height: 100%;
  width: 100%;
}
</style>