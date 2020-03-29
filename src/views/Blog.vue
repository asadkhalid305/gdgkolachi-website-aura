<template>
  <v-content class="pa-0">
    <v-container fluid class="mt-2 mb-0">
      <v-layout wrap align-start justify-center row fill-height class="my-0">
        <v-flex xs12 md8 class="mb-0">
          <p
            class="google-font mb-0 mt-3"
            style="font-size:200%;color:#616161"
          >Want to Start Writing Blogs for {{ChapterDetails.ChapterName}}?</p>
          <!-- <v-divider></v-divider> -->
          <p
            class="google-font mt-3"
            style="font-size:110%"
          >Fill out this form and become a part of our community.</p>
          <BlogRequestForm />
          <p
            class="google-font mb-0"
            style="font-size:120%"
          >Questions? Please contact {{ChapterDetails.ChapterEmail}}.</p>
        </v-flex>
        <v-flex xs12 md2 lg2 class="pa-2">
          <v-img
            :src="require('@/assets/img/svg/bg.svg')"
            :lazy-src="require('@/assets/img/svg/bg.svg')"
            width="70%"
            style="float:right"
          >
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </v-img>

          <v-img
            :src="require('@/assets/img/svg/contact.svg')"
            :lazy-src="require('@/assets/img/svg/contact.svg')"
            width="70%"
            style="float:right"
          >
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </v-img>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import ChapterDetails from "@/assets/data/chapterDetails.json";
import BlogRequestForm from "@/components/blogs/BlogRequestForm";
export default {
  components: { BlogRequestForm },
  data() {
    return {
      ChapterDetails: ChapterDetails
    };
  }
};
</script>
