<template>
  <v-footer app color="indigo darken-4" dark>
    <v-container>
      <v-row justify="center" align="center" class="footer-content">
        <!-- Footer Text -->
        <v-col cols="12" md="6" class="text-center mb-2 footer-text">
          <p>&copy; 2023 StudySync. All rights reserved.</p>
        </v-col>
        <!-- Social Media Icons -->
        <v-col cols="12" md="6" class="text-center footer-icons">
          <v-icon small class="footer-icon">mdi-facebook</v-icon>
          <v-icon small class="footer-icon">mdi-twitter</v-icon>
          <v-icon small class="footer-icon">mdi-instagram</v-icon>
          <v-icon small class="footer-icon">mdi-linkedin</v-icon>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.v-footer {
  padding: 1em 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background-color: #3a3a9e;
  height: 70px;
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-text p {
  margin: 0;
  font-size: 1em;
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  font-weight: 500;
}

.footer-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  padding-top: 8px;
}

.footer-icon {
  color: #ffffff;
  transition: color 0.3s ease, transform 0.2s ease;
  font-size: 1.5em;
  cursor: pointer;
}

.footer-icon:hover {
  color: #ffeb3b;
  transform: scale(1.1);
}

/* Responsive Adjustments */
@media (max-width: 600px) {
  .footer-text p {
    font-size: 0.9em;
  }
  .footer-icons {
    margin-top: 10px;
  }
}
</style>
