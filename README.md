# Terminal UI with Ollama Integration

A beautiful, modern terminal interface with integrated Ollama LLM support, customizable buttons, themes, and browser.

## Installation Guide

### 1. System Requirements

- Arch Linux (or compatible distribution)
- 4GB RAM minimum (8GB recommended)
- 2GB free disk space
- Internet connection

### 2. Base System Setup

Update your system first:
```bash
sudo pacman -Syu
```

### 3. Install Dependencies

```bash
# Install required packages
sudo pacman -S nodejs npm python xdg-utils git base-devel

# Install yay AUR helper
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
cd ..
rm -rf yay
```

### 4. Install Ollama

```bash
# Install Ollama from AUR
yay -S ollama-bin

# Start Ollama service
sudo systemctl enable --now ollama

# Pull the Llama2 model (1.1GB download)
ollama pull llama2:1b
```

### 5. User Configuration

```bash
# Add user to required groups
sudo usermod -aG wheel,ollama $USER

# Log out and log back in for changes to take effect
```

### 6. Network Setup

```bash
# If using ufw firewall
sudo ufw allow 11434/tcp  # Ollama API port
sudo ufw reload

# Verify Ollama service
sudo systemctl status ollama
```

### 7. Application Installation

#### Option A: Install from AUR (Recommended)
```bash
yay -S terminal-ui
systemctl --user enable --now terminal-ui
```

#### Option B: Manual Installation
```bash
# Clone repository
git clone https://github.com/yourusername/terminal-ui
cd terminal-ui

# Install dependencies
npm install

# Create environment file
echo 'OLLAMA_API_HOST=http://localhost:11434' > .env.local

# Build application
npm run build

# Start development server
npm run dev
```

### 8. Window Manager Configuration (i3)

```bash
# Open i3 config
nano ~/.config/i3/config

# Add these lines
for_window [class="terminal-ui"] floating enable
for_window [class="terminal-ui"] border pixel 2

# Reload i3
i3-msg reload
```

### 9. Security Configuration

```bash
# Create polkit rules
sudo nano /etc/polkit-1/rules.d/50-terminal-ui.rules

# Add this content:
polkit.addRule(function(action, subject) {
    if ((action.id == "org.freedesktop.policykit.exec" ||
         action.id == "org.freedesktop.ollama.service") &&
        subject.local &&
        subject.active &&
        subject.isInGroup("wheel")) {
            return polkit.Result.YES;
    }
});
```

### 10. Verify Installation

1. Test Ollama API:
```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama2:1b",
  "prompt": "Hello, world!"
}'
```

2. Open application:
- Development: Visit `http://localhost:3000`
- Production: Launch via application menu or run `terminal-ui`

## Usage

### Default Commands
- `/ai [prompt]` - Send message to AI assistant
- `terminal` - Switch to terminal view
- `help` - Show available commands

### Custom Buttons
1. Click Settings (gear icon)
2. Go to "Buttons" tab
3. Add name and command
4. Click "Add Button"

### Theme Customization
1. Click Settings
2. Go to "Theme" tab
3. Adjust colors and effects

## Troubleshooting

### Ollama Issues

1. Check service status:
```bash
sudo systemctl status ollama
```

2. View logs:
```bash
journalctl -u ollama -f
```

3. Verify API:
```bash
curl http://localhost:11434/api/health
```

### Permission Issues

1. Verify groups:
```bash
groups $USER
```

2. Check polkit:
```bash
ls -l /etc/polkit-1/rules.d/50-terminal-ui.rules
```

3. Verify Ollama access:
```bash
ls -l /var/lib/ollama
```

### Common Fixes

1. Reset Ollama:
```bash
sudo systemctl restart ollama
```

2. Clear cache:
```bash
rm -rf ~/.cache/terminal-ui
```

3. Reset application:
```bash
systemctl --user restart terminal-ui
```

## License

MIT License - See LICENSE file for details