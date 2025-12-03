# Zephyr Station - ESP32 Setup Guide

## 📁 Files

- **zephyr_station.ino** - Original standalone version (no WiFi)
- **zephyr_station_wifi.ino** - WiFi-connected version for dashboard integration

## 🔧 Setup Instructions

### 1. Install Required Libraries

Open Arduino IDE and install these libraries via Library Manager:

- Adafruit GFX Library
- Adafruit SSD1306
- Adafruit BME280 Library
- OneWire
- DallasTemperature
- RTClib
- ArduinoJson (v6.x)

### 2. Configure WiFi Settings

Edit `zephyr_station_wifi.ino` and update these lines:

```cpp
const char* WIFI_SSID = "YOUR_WIFI_SSID";        // Your WiFi name
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD"; // Your WiFi password
const char* SERVER_URL = "http://YOUR_COMPUTER_IP:3000/api/sensor-data";
```

**Finding your computer's IP address:**

- **Windows**: Open CMD and type `ipconfig`, look for "IPv4 Address"
- **Mac/Linux**: Open Terminal and type `ifconfig` or `ip addr`

Example: `http://192.168.1.100:3000/api/sensor-data`

### 3. Upload to ESP32

1. Connect ESP32 to your computer via USB
2. Select **Board**: "ESP32 Dev Module" in Arduino IDE
3. Select the correct **Port**
4. Click **Upload**

### 4. First-Time RTC Setup

If your RTC module lost power, uncomment this line in the code and re-upload:

```cpp
rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
```

Then comment it back and upload again.

### 5. Start the Dashboard

In your project root directory:

```bash
npm run dev
```

Open browser to `http://localhost:3000`

## 📊 How It Works

1. ESP32 reads sensors every 2 seconds
2. Sends data to dashboard via HTTP POST every 5 seconds
3. Logs data to SD card every 10 seconds
4. Dashboard fetches latest data and displays it in real-time

## 🔍 Troubleshooting

**WiFi won't connect:**
- Check SSID and password
- Ensure ESP32 and computer are on same network
- Check WiFi signal strength

**Dashboard shows "No data available":**
- Verify SERVER_URL is correct
- Check Serial Monitor for HTTP response codes
- Ensure dashboard is running on port 3000

**Sensors showing FAILED:**
- Check wiring connections
- Verify I2C addresses (use I2C scanner sketch)
- Some sensors may be optional - system continues with available sensors

## 📝 Serial Monitor Output

Open Serial Monitor (115200 baud) to see:
- Initialization status of all components
- Real-time sensor readings
- WiFi connection status
- HTTP transmission confirmations
- Alert notifications

## 🎯 Features

- **Fault Tolerance**: System continues even if sensors fail
- **Dual Temperature Sensors**: DS18B20 backup if BME280 fails
- **Local Logging**: SD card backup of all data
- **Real-time Alerts**: Buzzer + visual alerts for thresholds
- **WiFi Dashboard**: Live monitoring via web interface
