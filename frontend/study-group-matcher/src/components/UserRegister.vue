<template>
  <v-container class="register-container">
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-5 register-card" elevation="3">
          <v-card-title class="text-center">
            <h2>Register</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitRegister">
              <v-text-field
                  label="Name"
                  v-model="name"
                  prepend-icon="mdi-account"
                  outlined
                  dense
                  required
              />
              <v-text-field
                  label="Email"
                  v-model="email"
                  prepend-icon="mdi-email"
                  outlined
                  dense
                  required
              />
              <v-text-field
                  label="Password"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  outlined
                  dense
                  required
              />
              <v-btn
                  color="primary"
                  class="mt-4 register-btn"
                  block
                  type="submit"
                  elevation="2"
                  style="font-size: 16px"
              >
                Register
              </v-btn>
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errorMessage: null,
    };
  },
  methods: {
    ...mapActions(["register"]),
    async submitRegister() {
      try {
        // Send registration request (does not log the user in)
        await this.register({
          name: this.name,
          email: this.email,
          password: this.password,
        });

        // After successful registration, navigate to the login page (do not log in automatically)
        this.$router.push("/login");
      } catch (error) {
        // Handle error: Display the message from the backend
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          // If no error message is provided, use a default message
          this.errorMessage = "Registration failed. Please try again.";
        }

        console.error("Error during registration:", error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.register-card {
  font-family: "Poppins", sans-serif;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h2 {
  font-weight: 600;
  color: #3a3a9e;
  margin-bottom: 16px;
}

.v-card-title {
  font-family: "Poppins", sans-serif;
  color: #424242;
}

.register-btn {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  transition: transform 0.2s ease;
}

.register-btn:hover {
  background-color: #3949ab;
  transform: translateY(-2px);
}

.error-message {
  color: #e53935;
  font-family: "Poppins", sans-serif;
  font-size: 0.9em;
  margin-top: 16px;
  text-align: center;
}
</style>
