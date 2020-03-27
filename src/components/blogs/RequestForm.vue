<template>
  <v-container class="pa-0 my-0">
    <v-layout wrap align-start justify-center row fill-height class="my-0">
      <v-flex xs12 md10 lg8 class="py-2 my-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <!-- Pass this attr in the text field for validation :rules="nameRules"
            <v-text-field v-model="name" :rules="nameRules" :counter="10" label="Name" multiline required></v-text-field>
          -->
          <v-text-field
            v-model="name"
            :counter="180"
            label="Write about yourself"
            multi-line
            required
          ></v-text-field>
          <v-select
            v-model="select"
            :items="expertise"
            multiple
            chips
            deletable-chips
            :rules="[v => !!v || 'Item is required']"
            label="Expertise"
            required
          ></v-select>
          <v-select
            v-model="select"
            :items="field"
            :rules="[v => !!v || 'Item is required']"
            label="Professionalism"
            required
          ></v-select>
          <v-text-field
            v-model="name"
            type="number"
            :counter="8"
            label="Years of Experience"
            required
          ></v-text-field>
          <v-text-field
            v-model="name"
            :counter="100"
            label="What do you write about?"
            required
          ></v-text-field>
          <v-text-field
            v-model="name"
            :counter="180"
            label="Why you want to write on our platform?"
            multi-line
            required
          ></v-text-field>
          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>
          <v-btn
            :disabled="!valid"
            class="ma-0 google-font elevation-1 pa-2 my-4"
            color="#1a73e8"
            style="text-transform: capitalize; border-radius:5px; color:white"
            @click="submit"
          >Submit</v-btn>
          <!-- <v-btn @click="clear">clear</v-btn> -->
        </v-form>
        <v-divider></v-divider>
      </v-flex>
    
      <v-flex xs12 md2 lg4 class="pa-2 hidden-sm-and-down"></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      expertise: [
        { text: "Angular", value: "Angular" },
        { text: "Firebase", value: "Firebase" },
        { text: "Tensorflow", value: "Tensorflow" },
        { text: "Kotlin", value: "Kotlin" },
        { text: "Flutter", value: "Flutter" }
      ],
      field: [
        { text: "Student", value: "Student" },
        { text: "Professional", value: "Professional" }
      ]
    };
  }
};
</script>

<style scoped>
</style>