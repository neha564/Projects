<template>
  <div class="profile-page">
    <h2>User Profile</h2>

    <!-- Loading Indicator (if profile is being fetched or saved) -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner">Loading...</div>
    </div>

    <!-- Avatar Section -->
    <div class="avatar-section">
      <img :src="user.avatar || defaultAvatar" alt="User Avatar" class="avatar-img" />
      <div class="edit-avatar-container">
        <!-- Edit Avatar button below the Avatar -->
        <button v-if="!isEditingAvatar" @click="editAvatar" :disabled="isSaving">Edit Avatar</button>
        <input
            v-if="isEditingAvatar"
            type="url"
            v-model="newAvatar"
            placeholder="Enter new avatar URL"
            @blur="saveAvatar"
            class="avatar-input"
            :disabled="isSaving"
        />
        <button v-if="isEditingAvatar" @click="saveAvatar" :disabled="isSaving">Save Avatar</button>
      </div>
    </div>

    <!-- User Info Section -->
    <div class="user-info">
      <!-- Name Field -->
      <div class="user-field">
        <label for="name">Name</label>
        <input
            v-if="isEditingName"
            v-model="newName"
            type="text"
            placeholder="Enter your name"
            :disabled="isSaving"
        />
        <p v-else>{{ user.name }}</p>
        <button v-if="!isEditingName" @click="editName" :disabled="isSaving">Edit Name</button>
        <button v-if="isEditingName" @click="saveName" :disabled="isSaving">Save Name</button>
      </div>

      <!-- Email Field -->
      <div class="user-field">
        <label for="email">Email</label>
        <p>{{ user.email }}</p>
      </div>

      <!-- Interests Field -->
      <div class="user-field">
        <label for="interests">Interests</label>
        <input
            v-if="isEditingInterests"
            v-model="newInterests"
            type="text"
            placeholder="Enter interests separated by commas"
            :disabled="isSaving"
        />
        <p v-else>{{ user.interests.join(", ") || "No interests added" }}</p>
        <button v-if="!isEditingInterests" @click="editInterests" :disabled="isSaving">Edit Interests</button>
        <button v-if="isEditingInterests" @click="saveInterests" :disabled="isSaving">Save Interests</button>
      </div>

      <!-- Mood Field -->
      <div class="user-field">
        <label for="mood">Mood</label>
        <input
            v-if="isEditingMood"
            v-model="newMood"
            type="text"
            placeholder="Enter your mood"
            :disabled="isSaving"
        />
        <p v-else>{{ user.mood }}</p>
        <button v-if="!isEditingMood" @click="editMood" :disabled="isSaving">Edit Mood</button>
        <button v-if="isEditingMood" @click="saveMood" :disabled="isSaving">Save Mood</button>
      </div>

      <!-- Available Times Field -->
      <div class="user-field">
        <label for="availableTimes">Available Times</label>
        <input
            v-if="isEditingAvailableTimes"
            v-model="newAvailableTimes"
            type="text"
            placeholder="Enter available times separated by commas"
            :disabled="isSaving"
        />
        <p v-else>{{ user.availableTimes.join(", ") || "No times set" }}</p>
        <button v-if="!isEditingAvailableTimes" @click="editAvailableTimes" :disabled="isSaving">Edit Available Times</button>
        <button v-if="isEditingAvailableTimes" @click="saveAvailableTimes" :disabled="isSaving">Save Available Times</button>
      </div>

      <!-- Courses Field -->
      <div class="user-field">
        <label for="courses">Courses</label>
        <input
            v-if="isEditingCourses"
            v-model="newCourses"
            type="text"
            placeholder="Enter courses separated by commas"
            :disabled="isSaving"
        />
        <p v-else>{{ user.courses.join(", ") || "No courses added" }}</p>
        <button v-if="!isEditingCourses" @click="editCourses" :disabled="isSaving">Edit Courses</button>
        <button v-if="isEditingCourses" @click="saveCourses" :disabled="isSaving">Save Courses</button>
      </div>

      <!-- Groups Field -->
      <div class="user-field">
        <label for="groups">Groups</label>
        <input
            v-if="isEditingGroups"
            v-model="newGroups"
            type="text"
            placeholder="Enter groups separated by commas"
            :disabled="isSaving"
        />
        <p v-else>{{ user.groups.join(", ") || "No groups added" }}</p>
        <button v-if="!isEditingGroups" @click="editGroups" :disabled="isSaving">Edit Groups</button>
        <button v-if="isEditingGroups" @click="saveGroups" :disabled="isSaving">Save Groups</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex'; // Ensure you're using Vuex for authentication

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        avatar: "",
        interests: [],
        availableTimes: [],
        courses: [],
        mood: "",
        groups: [],
      },
      isEditingName: false,
      newName: "",
      isEditingAvatar: false,
      newAvatar: "",
      isEditingInterests: false,
      newInterests: "",
      isEditingMood: false,
      newMood: "",
      isEditingAvailableTimes: false,
      newAvailableTimes: "",
      isEditingCourses: false,
      newCourses: "",
      isEditingGroups: false,
      newGroups: "",
      defaultAvatar: "OIP.jpg", // Default avatar file
      isLoading: true,
      isSaving: false, // Flag to track if data is being saved
    };
  },
  computed: {
    ...mapState(["token"]), // Assuming token is stored in Vuex
  },
  methods: {
    // Redirect to login if no token is available
    redirectToLogin() {
      this.$router.push("/login");
    },

    // Fetch user profile from the API
    async fetchUserProfile() {
      const token = this.token || localStorage.getItem("token"); // Check token in Vuex or localStorage
      if (!token) {
        this.redirectToLogin(); // If not authenticated, redirect to login
        return;
      }

      try {
        const { data } = await axios.get("https://studysync-study-buddy-app.onrender.com/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = data.user;
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching user profile:", error);
        this.isLoading = false;
      }
    },

    // Edit and Save Methods for Profile Data
    editName() {
      this.isEditingName = true;
      this.newName = this.user.name;
    },
    async saveName() {
      const token = localStorage.getItem("token");
      this.isSaving = true;
      try {
        await axios.put(
            "https://studysync-study-buddy-app.onrender.com/api/profile",
            { name: this.newName },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        this.user.name = this.newName;
        this.isEditingName = false;
      } catch (error) {
        console.error("Error updating name:", error);
      } finally {
        this.isSaving = false;
      }
    },
    editAvatar() {
      this.isEditingAvatar = true;
      this.newAvatar = this.user.avatar || "";
    },
    async saveAvatar() {
      const token = localStorage.getItem("token");
      this.isSaving = true;
      try {
        await axios.put(
            "https://studysync-study-buddy-app.onrender.com/api/profile",
            { avatar: this.newAvatar },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        this.user.avatar = this.newAvatar;
        this.isEditingAvatar = false;
      } catch (error) {
        console.error("Error updating avatar:", error);
      } finally {
        this.isSaving = false;
      }
    },
    editInterests() {
      this.isEditingInterests = true;
      this.newInterests = this.user.interests.join(", ");
    },
    async saveInterests() {
      const token = localStorage.getItem("token");
      this.isSaving = true;
      const updatedInterests = this.newInterests.split(",").map((item) => item.trim());
      try {
        await axios.put(
            "https://studysync-study-buddy-app.onrender.com/api/profile",
            { interests: updatedInterests },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        this.user.interests = updatedInterests;
        this.isEditingInterests = false;
      } catch (error) {
        console.error("Error updating interests:", error);
      } finally {
        this.isSaving = false;
      }
    },
    editMood() {
      this.isEditingMood = true;
      this.newMood = this.user.mood;
    },
    async saveMood() {
      const token = localStorage.getItem("token");
      this.isSaving = true;
      try {
        await axios.put(
            "https://studysync-study-buddy-app.onrender.com/api/profile",
            { mood: this.newMood },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        this.user.mood = this.newMood;
        this.isEditingMood = false;
      } catch (error) {
        console.error("Error updating mood:", error);
      } finally {
        this.isSaving = false;
      }
    },
    editAvailableTimes() {
      this.isEditingAvailableTimes = true;
      this.newAvailableTimes = this.user.availableTimes.join(", ");
    },
    async saveAvailableTimes() {
      const token = localStorage.getItem("token");
      this.isSaving = true;
      const updatedTimes = this.newAvailableTimes.split(",").map((item) => item.trim());
      try {
        await axios.put(
            "https://studysync-study-buddy-app.onrender.com/api/profile",
            { availableTimes: updatedTimes },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        this.user.availableTimes = updatedTimes;
        this.isEditingAvailableTimes = false;
      } catch (error) {
        console.error("Error updating available times:", error);
      } finally {
        this.isSaving = false;
      }
    },
    editCourses() {
      this.isEditingCourses = true;
      this.newCourses = this.user.courses.join(", ");
    },
    async saveCourses() {
      const token = localStorage.getItem("token");
      this.isSaving = true;
      const updatedCourses = this.newCourses.split(",").map((item) => item.trim());
      try {
        await axios.put(
            "https://studysync-study-buddy-app.onrender.com/api/profile",
            { courses: updatedCourses },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        this.user.courses = updatedCourses;
        this.isEditingCourses = false;
      } catch (error) {
        console.error("Error updating courses:", error);
      } finally {
        this.isSaving = false;
      }
    },
    editGroups() {
      this.isEditingGroups = true;
      this.newGroups = this.user.groups.join(", ");
    },
    async saveGroups() {
      const token = localStorage.getItem("token");
      const updatedGroups = this.newGroups.split(",").map((item) => item.trim());
      try {
        await axios.put(
            "https://studysync-study-buddy-app.onrender.com/api/profile",
            { groups: updatedGroups },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        this.user.groups = updatedGroups;
        this.isEditingGroups = false;
      } catch (error) {
        console.error("Error updating groups:", error);
      }
    },
  },
  created() {
    this.fetchUserProfile();
  },
};
</script>

<style scoped>
.profile-page {
  margin: 0 auto;
  padding: 20px;
  background: #f4f7fb;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
  text-align: center;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.avatar-section {
  text-align: center;
  margin-bottom: 20px;
}

.avatar-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-input {
  margin-top: 10px;
  padding: 8px;
  width: 80%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

button:hover {
  background-color: #45a049;
}

.user-info {
  margin-bottom: 30px;
}

.user-field {
  margin-bottom: 20px;
}

.user-field label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.user-field input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.actions {
  text-align: center;
}

.actions button {
  background-color: #f44336;
  margin-top: 10px;
}

.actions button:hover {
  background-color: #e53935;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 20px;
  font-family: "Poppins", sans-serif;
}

.edit-avatar-container {
  margin-top: 10px;
}

.edit-avatar-container button {
  margin-top: 10px;
}
</style>
