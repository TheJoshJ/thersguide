---
sidebar_position: 5
sidebar_label: Setup & Prerequisites
---

# Setup & Prerequisites

Get your development environment ready to contribute to TheRSGuide.

## What You Need

### Required Software

- **Git** - Version control system
- **Node.js** - JavaScript runtime (version 18 or higher)
- **npm** - Package manager (comes with Node.js)
- **Text Editor** - VS Code, Sublime Text, or your preference

### Accounts & Knowledge

- **GitHub account** - To fork and contribute
- **Basic Git knowledge** - Commands like clone, commit, push
- **Basic markdown** - For writing guides

## Installation Steps

### 1. Install Git

**Windows:**
- Download from [git-scm.com](https://git-scm.com/)
- Run the installer with default settings

**macOS:**
```bash
# Using Homebrew
brew install git

# Or download from git-scm.com
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install git
```

**Verify installation:**
```bash
git --version
```

### 2. Install Node.js

**Windows/macOS:**
- Download from [nodejs.org](https://nodejs.org/)
- Choose LTS version (recommended)

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify installation:**
```bash
node --version
npm --version
```

### 3. Install Text Editor

**VS Code (Recommended):**
- Download from [code.visualstudio.com](https://code.visualstudio.com/)
- Install markdown and Git extensions

**Other Options:**
- **Sublime Text** - Fast and lightweight
- **Atom** - GitHub's editor
- **Vim/Emacs** - If you prefer terminal editors

## Verify Your Setup

Run these commands to ensure everything works:

```bash
# Check Git
git --version

# Check Node.js
node --version

# Check npm
npm --version

# Check Git configuration
git config --list
```

## Git Configuration

Set up your Git identity:

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Verify settings
git config --list
```

## GitHub Setup

### 1. Create Account
- Go to [github.com](https://github.com)
- Sign up with your email
- Choose a username

### 2. Set Up SSH (Optional but Recommended)

**Generate SSH key:**
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

**Add to SSH agent:**
```bash
# Start SSH agent
eval "$(ssh-agent -s)"

# Add your key
ssh-add ~/.ssh/id_ed25519
```

**Add to GitHub:**
1. Copy your public key: `cat ~/.ssh/id_ed25519.pub`
2. Go to GitHub → Settings → SSH and GPG keys
3. Click "New SSH key"
4. Paste your key and save

## Test Your Setup

Try cloning a test repository:

```bash
# Test Git clone
git clone https://github.com/octocat/Hello-World.git
cd Hello-World
ls

# Test Node.js
node -e "console.log('Node.js is working!')"

# Test npm
npm --version
```

## Troubleshooting

### Common Issues

**Git not found:**
- Restart your terminal after installation
- Check if Git is in your PATH

**Node.js version too old:**
- Download the latest LTS version
- Use a version manager like `nvm`

**Permission denied:**
- On Linux/macOS, use `sudo` for installations
- On Windows, run as Administrator

**SSH key issues:**
- Ensure SSH agent is running
- Check key permissions: `chmod 600 ~/.ssh/id_ed25519`

## Next Steps

Once your setup is complete:

1. **[Fork & Clone](./contribution-fork-clone)** - Get your copy of TheRSGuide
2. **[Create & Edit Content](./contribution-create-edit)** - Start writing guides
3. **[Test & Commit](./contribution-test-commit)** - Save your work

## Getting Help

- **Git documentation**: [git-scm.com/doc](https://git-scm.com/doc)
- **Node.js documentation**: [nodejs.org/docs](https://nodejs.org/docs)
- **GitHub help**: [help.github.com](https://help.github.com)
- **Community support**: Ask in TheRSGuide discussions

Your development environment is now ready for contributing! 🚀
