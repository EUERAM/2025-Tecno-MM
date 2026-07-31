/*
 * Arduino WebSerial Communication Example
 * 
 * This sketch demonstrates basic serial communication with a web browser
 * using the Web Serial API. It responds to simple text commands.
 * 
 * Supported Commands:
 * - LED_ON: Turn on the built-in LED
 * - LED_OFF: Turn off the built-in LED
 * - STATUS: Get the current LED status
 * - PING: Test connection (responds with PONG)
 * 
 * Hardware:
 * - Arduino board with built-in LED (usually pin 13)
 * 
 * Upload this sketch to your Arduino, then connect via the web interface.
 */

const int LED_PIN = LED_BUILTIN; // Usually pin 13
String inputString = "";
boolean ledState = false;

void setup() {
  // Initialize serial communication at 9600 baud
  Serial.begin(9600);
  
  // Initialize LED pin
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  
  // Wait for serial port to connect
  while (!Serial) {
    ; // Wait for serial port to connect (needed for native USB boards)
  }
  
  // Send startup message
  Serial.println("Arduino WebSerial Ready!");
  Serial.println("Waiting for commands...");
}

void loop() {
  // Check if data is available
  while (Serial.available() > 0) {
    char inChar = (char)Serial.read();
    
    // Add character to input string if it's not a newline
    if (inChar != '\n' && inChar != '\r') {
      inputString += inChar;
    }
    
    // Process command when newline is received
    if (inChar == '\n') {
      processCommand(inputString);
      inputString = ""; // Clear the string for next command
    }
  }
  
  // Blink LED slowly when on (optional visual feedback)
  if (ledState) {
    static unsigned long lastBlink = 0;
    static boolean blinkState = LOW;
    
    if (millis() - lastBlink > 500) {
      blinkState = !blinkState;
      digitalWrite(LED_PIN, blinkState);
      lastBlink = millis();
    }
  }
}

void processCommand(String command) {
  // Remove whitespace
  command.trim();
  
  // Convert to uppercase for case-insensitive comparison
  command.toUpperCase();
  
  // Process commands
  if (command == "LED_ON") {
    ledState = true;
    digitalWrite(LED_PIN, HIGH);
    Serial.println("LED turned ON");
  }
  else if (command == "LED_OFF") {
    ledState = false;
    digitalWrite(LED_PIN, LOW);
    Serial.println("LED turned OFF");
  }
  else if (command == "STATUS") {
    Serial.print("LED status: ");
    Serial.println(ledState ? "ON" : "OFF");
  }
  else if (command == "PING") {
    Serial.println("PONG");
  }
  else if (command == "HELP") {
    printHelp();
  }
  else if (command.length() > 0) {
    Serial.print("Unknown command: ");
    Serial.println(command);
    Serial.println("Type HELP for available commands");
  }
}

void printHelp() {
  Serial.println("=== Available Commands ===");
  Serial.println("LED_ON  - Turn on the LED");
  Serial.println("LED_OFF - Turn off the LED");
  Serial.println("STATUS  - Get LED status");
  Serial.println("PING    - Test connection");
  Serial.println("HELP    - Show this help");
  Serial.println("========================");
}
