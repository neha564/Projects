<template>
  <div>
    <h2>User Profile</h2>
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Interests: {{ user.interests.join(", ") }}</p>
    <button @click="editProfile">Edit Profile</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["fetchUserProfile"]),
    async editProfile() {
      // Logic to edit profile
    },
  },
  created() {
    this.fetchUserProfile();
  },
};
</script>
