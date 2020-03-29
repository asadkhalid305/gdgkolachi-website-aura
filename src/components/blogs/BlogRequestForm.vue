<template>
  <v-container class="pa-0 my-0">
    <v-layout wrap align-start justify-center row fill-height class="my-0">
      <v-flex xs12 md10 lg8 class="py-2 my-4">
        <v-form ref="form" v-model="isFormValid">
          <v-text-field
            label="Write about yourself"
            v-model="bio"
            :rules="validationRule.bio"
            multi-line
          ></v-text-field>
          <v-select
            label="Expertise"
            v-model="selectedExpertise"
            :items="expertise"
            :rules="validationRule.expertise"
            multiple
            chips
            deletable-chips
          ></v-select>
          <v-select
            label="Profession"
            v-model="selectedProfession"
            :items="professions"
            :rules="validationRule.profession"
          ></v-select>
          <v-text-field
            label="Years of Experience"
            type="number"
            v-model="experience"
            :rules="validationRule.experience"
          ></v-text-field>
          <v-text-field
            label="What do you write about?"
            v-model="genre"
            :rules="validationRule.genre"
          ></v-text-field>
          <v-text-field
            label="Motivation to write on our platform?"
            v-model="motivation"
            :rules="validationRule.motivation"
            multi-line
          ></v-text-field>
          <v-checkbox label="Do you agree?" v-model="isAgree" :rules="validationRule.agreement"></v-checkbox>
        </v-form>
        <v-btn
          :disabled="!isFormValid"
          class="ma-0 google-font elevation-1 pa-2 my-4"
          color="#1a73e8"
          style="text-transform: capitalize; border-radius:5px; color:white"
          @click="submit"
        >Submit</v-btn>
      </v-flex>

      <v-divider></v-divider>
    </v-layout>
  </v-container>
</template>

<script>
//Services
import { validationService } from "../../services/validationService";
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
      professions: [
        { text: "Student", value: "Student" },
        { text: "Professional", value: "Professional" }
      ],
      bio: "",
      selectedExpertise: false,
      selectedProfession: false,
      experience: 0,
      genre: "",
      motivation: "",
      isAgree: false,
      isFormValid: false,
      validationRule: {
        bio: [
          ...validationService.getRules("required|range", [], {
            min: 20,
            max: 120
          })
        ],
        expertise: [...validationService.getRules("required")],
        profession: [...validationService.getRules("required")],
        experience: [...validationService.getRules("required|positive")],
        genre: [
          ...validationService.getRules("required|range", [], {
            min: 0,
            max: 50
          })
        ],
        motivation: [
          ...validationService.getRules("required|range", [], {
            min: 20,
            max: 120
          })
        ],
        agreement: [
          ...validationService.getRules("required")
        ]
      }
    };
  },
  methods: {
    submit() {
      let self = this;
      let payload = {
        bio: self.bio,
        selectedExpertise: self.selectedExpertise,
        selectedProfession: self.selectedProfession,
        experience: self.experience,
        genre: self.genre,
        motivation: self.motivation,
        isAgree: self.isAgree
      };

      //firebase post call
    }
  }
};
</script>

<style scoped>
</style>