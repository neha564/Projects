const { User, Group } = require('./models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { successMessages, errorMessages } = require('./views'); // Import messages
const { getMusicRecommendation, chatWithAI } = require('./services');
const {get} = require("axios");

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: errorMessages.missingRequiredFields });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: errorMessages.userExists });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ success: true, message: successMessages.registrationSuccess, token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: errorMessages.registrationFailed });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: errorMessages.invalidCredentials });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, message: successMessages.loginSuccess, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: errorMessages.loginFailed });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: errorMessages.userNotFound });
    }

    res.json({ success: true, message: successMessages.profileRetrieved, user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ success: false, message: errorMessages.profileFetchFailed });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const updateData = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: errorMessages.userNotFound });
    }

    res.json({ success: true, message: successMessages.profileUpdated, user });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: errorMessages.updateProfileFailed });
  }
};

// Search for profiles
exports.searchProfiles = async (req, res) => {
  try {
    const query = req.query.q;
    const profiles = await User.find({ name: new RegExp(query, 'i') });

    if (!profiles.length) {
      return res.status(404).json({ success: false, message: errorMessages.searchProfilesFailed });
    }

    res.json({ success: true, message: successMessages.searchProfilesSuccess, profiles });
  } catch (error) {
    console.error("Search profiles error:", error);
    res.status(500).json({ success: false, message: errorMessages.searchProfilesFailed });
  }
};

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { members, course } = req.body;
    const group = new Group({ members, course });
    await group.save();

    res.status(201).json({ success: true, message: successMessages.groupCreated, group });
  } catch (error) {
    console.error("Create group error:", error);
    res.status(500).json({ success: false, message: errorMessages.groupCreationFailed });
  }
};

// Create a study session within a group
exports.createSession = async (req, res) => {
  try {
    const { date, mood } = req.body;
    const groupId = req.params.groupId;
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ success: false, message: errorMessages.groupCreationFailed });
    }

    group.studySessions.push({ date, mood });
    await group.save();

    res.json({ success: true, message: successMessages.sessionCreated, group });
  } catch (error) {
    console.error("Create session error:", error);
    res.status(500).json({ success: false, message: errorMessages.sessionCreationFailed });
  }
};

// Get music recommendations
exports.getMusic = async (req, res) => {
  try {
    const emotion = req.query.emotion || 'study';
    const recommendations = await getMusicRecommendation(emotion);

    res.json({ success: true, message: successMessages.musicRecommendationSuccess, recommendations });
  } catch (error) {
    console.error("Get music error:", error);
    res.status(500).json({ success: false, message: errorMessages.musicRecommendationFailed });
  }
};

// AI Chat service
exports.aiChat = async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    const aiResponse = await chatWithAI(sessionId, message);

    res.json({ success: true, message: successMessages.aiChatResponseSuccess, response: aiResponse });
  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({ success: false, message: errorMessages.aiChatFailed });
  }
};

// Get weather data
exports.getWeather = async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ success: false, message: "City name is required" });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: apiKey,
        units: "metric", // Converts temperature to Celsius
      },
    });

    const { name, main, weather } = response.data;
    const weatherData = {
      city: name,
      temp: main.temp,
      condition: weather[0].main,
    };

    res.json({ success: true, message: "Weather data retrieved successfully", data: weatherData });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ success: false, message: "Failed to retrieve weather data" });
  }
};

exports.getCitySuggestions = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query || query.length < 2) {
      return res.status(400).json({ success: false, message: "Query must be at least 2 characters long" });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await get(`http://api.openweathermap.org/geo/1.0/direct`, {
      params: {
        q: query,
        limit: 5,           // Limit the number of suggestions returned
        appid: apiKey,
      },
    });

    const cities = response.data.map(city => ({
      name: city.name,
      country: city.country,
      state: city.state,
    }));

    res.json({ success: true, cities });
  } catch (error) {
    console.error("Error fetching city suggestions:", error.message);
    res.status(500).json({ success: false, message: "Failed to retrieve city suggestions" });
  }
};
