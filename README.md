# 🌡️ Zephyr Station

**Smart Room Environmental Monitor** - A real-time dashboard simulation for IoT environmental monitoring.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## 📋 Overview

Zephyr Station is an interactive web simulation that demonstrates a smart room monitoring system. It visualizes real-time environmental data from multiple sensors with intelligent alerting and fault tolerance capabilities.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌡️ **Multi-Sensor Monitoring** | Temperature (BME280 + DS18B20 backup), Humidity, Pressure, Air Quality |
| 📟 **OLED Display Simulation** | Rotating display mimicking a 128x64 pixel screen |
| ⏰ **RTC Clock** | Real-time clock module simulation |
| 🔔 **Smart Alerts** | Configurable thresholds with visual & audio notifications |
| 💾 **Data Logging** | CSV-format logging simulating SD card storage |
| 🛡️ **Fault Tolerance** | Graceful degradation demo with backup sensor activation |
| 📊 **Live Gauges** | Animated real-time gauge visualizations |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 🎛️ Simulated Hardware

- **BME280** - Primary temperature, humidity & pressure sensor
- **DS18B20** - Backup temperature sensor
- **MQ-135** - Air quality / gas sensor
- **DS3231 RTC** - Real-time clock module
- **0.96" OLED** - 128x64 display
- **SD Card Module** - Data logging storage
- **Piezo Buzzer** - Audio alerts

## 📄 Documentation

📎 **[View Project Presentation (PDF)](https://drive.google.com/file/d/1MMXcICaoPxCtJUkR7axs472huntQtqVd/view?usp=sharing)**

---

## 🖼️ Highlights

The dashboard features:
- Dark-themed responsive UI
- Real-time sensor cards with alert states
- Interactive threshold configuration
- Fault tolerance demonstration toggle
- Live data logging panel

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **Language:** TypeScript
- **Animations:** CSS transitions

## 📝 License

MIT © Shantanu

---

<div align="center">
  <sub>Built with ❤️ for IoT enthusiasts</sub>
</div>
