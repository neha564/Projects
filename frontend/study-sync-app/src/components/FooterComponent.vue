<template>
  <v-footer color="indigo darken-4" dark>
    <v-container>
      <v-row justify="center" align="center" class="footer-content">
        <!-- Footer Text -->
        <v-col cols="12" md="6" class="text-center mb-2 footer-text">
          <p>&copy; {{ currentYear }} StudySync. All rights reserved.</p>
        </v-col>
        <!-- Social Media Icons -->
        <v-col cols="12" md="6" class="text-center footer-icons">
          <a
            href="https://github.com/hoangsonww"
            target="_blank"
            class="footer-icon-link"
          >
            <v-icon small class="footer-icon">mdi-github</v-icon>
            <!-- GitHub Icon -->
          </a>
          <a
            href="https://sonnguyenhoang.com"
            target="_blank"
            class="footer-icon-link"
          >
            <v-icon small class="footer-icon">mdi-web</v-icon>
            <!-- Website Icon -->
          </a>
          <a
            href="mailto:hoangson091104@gmail.com"
            target="_blank"
            class="footer-icon-link"
          >
            <v-icon small class="footer-icon">mdi-email</v-icon>
            <!-- Email Icon -->
          </a>
          <a
            href="https://www.linkedin.com/in/hoangsonw"
            target="_blank"
            class="footer-icon-link"
          >
            <v-icon small class="footer-icon">mdi-linkedin</v-icon>
            <!-- LinkedIn Icon -->
          </a>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {
      currentYear: new Date().getFullYear(), // Dynamically fetch the current year
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

.v-footer {
  padding: 1em 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background-color: #3a3a9e;
}

.footer-content {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-text p {
  margin: 0;
  font-size: 1em;
  font-family: "Poppins", sans-serif;
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
  transition:
    color 0.3s ease,
    transform 0.2s ease;
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
    font-size: 0.9em; /* Make text smaller on small screens */
  }

  .footer-icons {
    gap: 15px; /* Reduce icon gap on smaller screens */
    margin-top: 10px;
  }

  .footer-icon {
    font-size: 1.3em; /* Adjust icon size on mobile */
  }
}

@media (min-width: 601px) {
  .footer-text p {
    font-size: 1em; /* Maintain standard size for larger screens */
  }

  .footer-icon {
    font-size: 1.5em; /* Regular icon size */
  }
}
</style>
