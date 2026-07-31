# WebSerial Arduino Controller

A modern web application for communicating with Arduino boards using the Web Serial API. Control your Arduino directly from your browser without any plugins or additional software.

## Features

- 🔌 Direct USB connection to Arduino via Web Serial API
- 📡 Real-time bidirectional communication
- 🎨 Modern, responsive user interface
- 📊 Built-in serial monitor with color-coded messages
- ⚡ Quick command buttons for common operations
- 🔄 Auto-scroll serial monitor
- 💻 No server or backend required

## Browser Support

The Web Serial API is supported in:
- ✅ Chrome 89+
- ✅ Edge 89+
- ✅ Opera 75+

**Note:** Requires HTTPS or localhost for security reasons.

## Getting Started

### 1. Upload Arduino Sketch

1. Open the Arduino IDE
2. Load the `arduino_sketch.ino` file
3. Select your Arduino board and port from Tools menu
4. Upload the sketch to your Arduino

### 2. Run the Web Application

Since this is a static web application, you can run it in several ways:

#### Option A: Simple HTTP Server (Python)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

#### Option B: Live Server (VS Code Extension)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"

#### Option C: Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server
```

### 3. Connect to Arduino

1. Open the web application in a supported browser
2. Click "Connect to Arduino"
3. Select your Arduino's serial port from the popup
4. Start sending commands!

## Usage

### Built-in Commands

The default Arduino sketch supports these commands:

- `LED_ON` - Turn on the built-in LED
- `LED_OFF` - Turn off the built-in LED
- `STATUS` - Get the current LED status
- `PING` - Test connection (responds with PONG)
- `HELP` - Show available commands

### Sending Custom Commands

1. Type your command in the input field
2. Press Enter or click the "Send" button
3. Watch the serial monitor for Arduino's response

### Quick Command Buttons

Use the pre-configured quick buttons for common operations. You can customize these in the HTML file.

## Customization

### Adding New Commands

#### In the Arduino Sketch:

```cpp
else if (command == "YOUR_COMMAND") {
    // Your code here
    Serial.println("Response message");
}
```

#### In the HTML (Quick Buttons):

```html
<button class="btn btn-small" data-command="YOUR_COMMAND" disabled>Your Label</button>
```

### Changing Baud Rate

Update both files:

**Arduino sketch:**
```cpp
Serial.begin(115200); // Change from 9600
```

**JavaScript (serial.js):**
```javascript
await this.arduino.connect(115200); // Change from 9600
```

## File Structure

```
.
├── index.html          # Main HTML interface
├── style.css           # Styling and layout
├── serial.js           # WebSerial API logic
├── arduino_sketch.ino  # Arduino firmware
└── README.md          # This file
```

## API Reference

### ArduinoSerial Class

```javascript
const arduino = new ArduinoSerial();

// Connect to Arduino
await arduino.connect(baudRate);

// Send data
await arduino.send("LED_ON");

// Read data (async generator)
for await (const data of arduino.read()) {
    console.log(data);
}

// Disconnect
await arduino.disconnect();

// Check connection status
console.log(arduino.isConnected);
```

## Troubleshooting

### "Web Serial API is not supported"
- Use Chrome, Edge, or Opera browser
- Ensure you're on version 89 or later

### Connection fails
- Make sure Arduino is properly connected via USB
- Close other programs using the serial port (Arduino IDE Serial Monitor, etc.)
- Try unplugging and replugging the Arduino

### No data received
- Check baud rate matches in both web app and Arduino sketch
- Verify Arduino sketch is uploaded correctly
- Make sure Arduino is sending data with `Serial.println()`

### Permission denied
- Some systems require udev rules for USB access (Linux)
- On Windows, ensure USB drivers are installed

## Examples

### Reading Sensor Data

Modify the Arduino sketch to send sensor readings:

```cpp
void loop() {
    int sensorValue = analogRead(A0);
    Serial.print("Sensor: ");
    Serial.println(sensorValue);
    delay(1000);
}
```

### Controlling Multiple LEDs

Extend the command system:

```cpp
else if (command.startsWith("LED")) {
    int pin = command.substring(3, 4).toInt();
    if (command.endsWith("ON")) {
        digitalWrite(pin, HIGH);
        Serial.println("LED " + String(pin) + " ON");
    } else if (command.endsWith("OFF")) {
        digitalWrite(pin, LOW);
        Serial.println("LED " + String(pin) + " OFF");
    }
}
```

## Security Notes

- Web Serial API requires user permission for each connection
- Only works over HTTPS or localhost
- No automatic data collection or transmission

## License

MIT License - Feel free to use and modify for your projects!

## Resources

- [Web Serial API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Serial)
- [Arduino Serial Documentation](https://www.arduino.cc/reference/en/language/functions/communication/serial/)
- [Web Serial API Specification](https://wicg.github.io/serial/)

## Contributing

Found a bug or want to add a feature? Feel free to submit issues or pull requests!

---

Built with ❤️ using Web Serial API
