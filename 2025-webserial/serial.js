// WebSerial API wrapper for Arduino communication
class ArduinoSerial {
    constructor() {
        this.port = null;
        this.reader = null;
        this.writer = null;
        this.isConnected = false;
        this.readableStreamClosed = null;
        this.writableStreamClosed = null;
    }

    // Check if Web Serial API is supported
    static isSupported() {
        return 'serial' in navigator;
    }

    // Connect to Arduino
    async connect(baudRate = 9600) {
        try {
            // Request port from user
            this.port = await navigator.serial.requestPort();
            
            // Open the serial port
            await this.port.open({ baudRate });
            
            // Setup writer for sending data
            const textEncoder = new TextEncoderStream();
            this.writableStreamClosed = textEncoder.readable.pipeTo(this.port.writable);
            this.writer = textEncoder.writable.getWriter();
            
            // Setup reader for receiving data
            const textDecoder = new TextDecoderStream();
            this.readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
            this.reader = textDecoder.readable.getReader();
            
            this.isConnected = true;
            return true;
        } catch (error) {
            console.error('Connection error:', error);
            throw error;
        }
    }

    // Disconnect from Arduino
    async disconnect() {
        try {
            if (this.reader) {
                await this.reader.cancel();
                await this.readableStreamClosed.catch(() => {});
                this.reader = null;
            }
            
            if (this.writer) {
                await this.writer.close();
                await this.writableStreamClosed;
                this.writer = null;
            }
            
            if (this.port) {
                await this.port.close();
                this.port = null;
            }
            
            this.isConnected = false;
        } catch (error) {
            console.error('Disconnect error:', error);
            throw error;
        }
    }

    // Send data to Arduino
    async send(data) {
        if (!this.isConnected || !this.writer) {
            throw new Error('Not connected to Arduino');
        }
        
        try {
            await this.writer.write(data + '\n');
        } catch (error) {
            console.error('Send error:', error);
            throw error;
        }
    }

    // Read data from Arduino (async generator)
    async *read() {
        if (!this.isConnected || !this.reader) {
            throw new Error('Not connected to Arduino');
        }
        
        try {
            while (true) {
                const { value, done } = await this.reader.read();
                if (done) {
                    break;
                }
                yield value;
            }
        } catch (error) {
            console.error('Read error:', error);
            throw error;
        }
    }
}

// UI Controller
class UIController {
    constructor() {
        this.arduino = new ArduinoSerial();
        this.autoScroll = true;
        this.initElements();
        this.initEventListeners();
        this.checkAPISupport();
    }

    initElements() {
        this.connectBtn = document.getElementById('connectBtn');
        this.disconnectBtn = document.getElementById('disconnectBtn');
        this.sendBtn = document.getElementById('sendBtn');
        this.commandInput = document.getElementById('commandInput');
        this.serialMonitor = document.getElementById('serialMonitor');
        this.statusIndicator = document.getElementById('statusIndicator');
        this.statusText = document.getElementById('statusText');
        this.clearBtn = document.getElementById('clearBtn');
        this.autoScrollCheckbox = document.getElementById('autoScrollCheckbox');
        this.quickCommandBtns = document.querySelectorAll('.quick-commands .btn');
    }

    initEventListeners() {
        this.connectBtn.addEventListener('click', () => this.handleConnect());
        this.disconnectBtn.addEventListener('click', () => this.handleDisconnect());
        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.clearBtn.addEventListener('click', () => this.clearMonitor());
        this.autoScrollCheckbox.addEventListener('change', (e) => {
            this.autoScroll = e.target.checked;
        });
        
        this.commandInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSend();
            }
        });

        this.quickCommandBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const command = btn.getAttribute('data-command');
                this.sendCommand(command);
            });
        });
    }

    checkAPISupport() {
        if (!ArduinoSerial.isSupported()) {
            this.logToMonitor('Web Serial API is not supported in this browser.', 'error');
            this.logToMonitor('Please use Chrome, Edge, or Opera.', 'error');
            this.connectBtn.disabled = true;
        } else {
            this.logToMonitor('Web Serial API supported. Ready to connect!', 'info');
        }
    }

    async handleConnect() {
        try {
            this.logToMonitor('Requesting connection to Arduino...', 'info');
            await this.arduino.connect(9600);
            this.logToMonitor('Connected successfully!', 'info');
            this.updateConnectionStatus(true);
            this.startReading();
        } catch (error) {
            this.logToMonitor(`Connection failed: ${error.message}`, 'error');
            this.updateConnectionStatus(false);
        }
    }

    async handleDisconnect() {
        try {
            await this.arduino.disconnect();
            this.logToMonitor('Disconnected from Arduino', 'info');
            this.updateConnectionStatus(false);
        } catch (error) {
            this.logToMonitor(`Disconnect error: ${error.message}`, 'error');
        }
    }

    async handleSend() {
        const command = this.commandInput.value.trim();
        if (command) {
            await this.sendCommand(command);
            this.commandInput.value = '';
        }
    }

    async sendCommand(command) {
        try {
            await this.arduino.send(command);
            this.logToMonitor(`→ ${command}`, 'sent');
        } catch (error) {
            this.logToMonitor(`Send error: ${error.message}`, 'error');
        }
    }

    async startReading() {
        try {
            let buffer = '';
            for await (const chunk of this.arduino.read()) {
                buffer += chunk;
                
                // Process complete lines
                const lines = buffer.split('\n');
                buffer = lines.pop(); // Keep incomplete line in buffer
                
                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (trimmedLine) {
                        this.logToMonitor(`← ${trimmedLine}`, 'received');
                    }
                }
            }
        } catch (error) {
            if (this.arduino.isConnected) {
                this.logToMonitor(`Read error: ${error.message}`, 'error');
            }
        }
    }

    updateConnectionStatus(connected) {
        if (connected) {
            this.statusIndicator.classList.add('connected');
            this.statusText.textContent = 'Connected';
            this.connectBtn.disabled = true;
            this.disconnectBtn.disabled = false;
            this.sendBtn.disabled = false;
            this.quickCommandBtns.forEach(btn => btn.disabled = false);
        } else {
            this.statusIndicator.classList.remove('connected');
            this.statusText.textContent = 'Disconnected';
            this.connectBtn.disabled = false;
            this.disconnectBtn.disabled = true;
            this.sendBtn.disabled = true;
            this.quickCommandBtns.forEach(btn => btn.disabled = true);
        }
    }

    logToMonitor(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry log-${type}`;
        logEntry.textContent = `[${timestamp}] ${message}`;
        this.serialMonitor.appendChild(logEntry);
        
        if (this.autoScroll) {
            this.serialMonitor.scrollTop = this.serialMonitor.scrollHeight;
        }
    }

    clearMonitor() {
        this.serialMonitor.innerHTML = '';
        this.logToMonitor('Monitor cleared', 'info');
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new UIController();
});
