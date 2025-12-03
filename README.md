<p align="center">
  <img src="Capture Assets/PosterZS.png" alt="Zephyr Station Dashboard" width="100%">
</p>

<h1 align="center">🌡️ Zephyr Station Dashboard</h1>

<p align="center">
  <strong>Real-time Environmental Monitoring Dashboard for ESP32-based Zephyr Station</strong>
</p>

<p align="center">
  <a href="https://github.com/shaxntanu/Zephyr-Station">
    <img src="https://img.shields.io/badge/Hardware-Zephyr%20Station-blue?style=for-the-badge" alt="Hardware Repo">
  </a>
  <img src="https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Chart.js-4.0-pink?style=for-the-badge&logo=chart.js" alt="Chart.js">
</p>

---

## 📖 About

This is the **web dashboard** for the [Zephyr Station](https://github.com/shaxntanu/Zephyr-Station) environmental monitoring system. It displays real-time sensor data from an ESP32-based hardware station that monitors:

- 🌡️ **Temperature** (BME280 + DS18B20 backup)
- 💧 **Humidity** (BME280)
- 🌀 **Barometric Pressure** (BME280)
- 💨 **Air Quality** (MQ-135)

The dashboard visualizes 16 days of testing data collected in Patiala, India (November 18 - December 3, 2025), demonstrating the system's capabilities with **138,240 data points**.

---

## 🎬 Demo

<p align="center">
  <img src="Capture Assets/PosterZS.png" alt="Zephyr Station Dashboard Demo" width="80%">
</p>

<p align="center">
  <em>📹 <a href="https://drive.google.com/file/d/YOUR_VIDEO_ID/view">Watch Demo Video on Google Drive</a></em>
</p>

> **Note:** Upload your `VideoZephyrStation.mp4` to Google Drive or YouTube and replace `YOUR_VIDEO_ID` with the actual link.

---

## ✨ Features

### 📊 Data Visualization
- **Interactive Chart.js graphs** with temperature, humidity, and average line
- **Toggle controls** to show/hide specific data series
- **16-day historical data** from actual testing period

### 📈 Real-time Monitoring
- **Gauge meters** showing average values
- **OLED display simulation** cycling through stats
- **SD Card data log** with CSV format preview

### 🎯 Sensor Accuracy Table
- Manufacturer specifications for all sensors
- Error margins and calibration notes
- Known limitations documented

### 🔧 Fault Tolerance Demo
- Simulate BME280 sensor failure
- Automatic fallback to DS18B20 backup
- Graceful degradation demonstration

### 📱 Responsive Design
- Optimized for mobile, tablet, and desktop
- Custom scrollbars for data tables
- Cyberpunk-style toggle checkboxes

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Chart.js** | Interactive data visualization |
| **ESP32** | Hardware microcontroller |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/shaxntanu/Zephyr-Station-Dashboard.git

# Navigate to project
cd Zephyr-Station-Dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 Connecting ESP32

To connect your Zephyr Station hardware:

1. Open `esp32/zephyr_station_wifi_template.ino` in Arduino IDE
2. Update WiFi credentials:
   ```cpp
   const char* WIFI_SSID = "YOUR_WIFI_SSID";
   const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";
   const char* SERVER_URL = "http://YOUR_IP:3000/api/sensor-data";
   ```
3. Upload to ESP32
4. Data will stream to the dashboard in real-time

---

## 📊 Testing Data

The dashboard displays actual data collected during the 16-day testing period:

| Metric | Average | Range |
|--------|---------|-------|
| Temperature | 16.7°C | 15-18°C |
| Humidity | 80% | 72-84% |
| Pressure | 30.07 inHg | 30.03-30.16 inHg |
| Air Quality | 255.2 AQI | 155-282 AQI |

**Total Data Points:** 138,240 (sampled every 10 seconds)

---

## 🔗 Related Projects

- **[Zephyr Station Hardware](https://github.com/shaxntanu/Zephyr-Station)** - ESP32 firmware and hardware schematics
- **[Technical Report](https://crocus-zenobia-863.notion.site/Zephyr-Station-Technical-Report-2a01ebfe2064803aa54ae7de4e927b2c)** - Detailed project documentation

---

## 📁 Project Structure

```
zephyr-station-dashboard/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API endpoints
│   │   ├── page.tsx         # Main dashboard
│   │   └── layout.tsx       # Root layout
│   └── components/          # React components
│       ├── WeatherForecast.tsx
│       ├── GaugeChart.tsx
│       ├── DataLog.tsx
│       ├── SensorAccuracy.tsx
│       └── ...
├── esp32/                   # Arduino code
│   └── zephyr_station_wifi_template.ino
├── Capture Assets/          # Demo media
│   ├── PosterZS.png
│   └── VideoZephyrStation.mp4
└── public/                  # Static assets
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## 📄 License

MIT License - feel free to use this project for your own environmental monitoring needs!

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/shaxntanu">Shantanu</a>
</p>

<p align="center">
  <a href="https://github.com/shaxntanu/Zephyr-Station">
    <img src="https://img.shields.io/badge/View%20Hardware%20Repo-Zephyr%20Station-blue?style=for-the-badge&logo=github" alt="Hardware Repo">
  </a>
</p>
