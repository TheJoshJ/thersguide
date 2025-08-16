---
sidebar_position: 6
sidebar_label: Fork & Clone
---

# Fork & Clone

Get your own copy of TheRSGuide to work on.

## What This Means

- **Fork**: Create a copy of TheRSGuide under your GitHub account
- **Clone**: Download your copy to your computer
- **Result**: You can make changes without affecting the original

## Step 1: Fork the Repository

### 1. Go to TheRSGuide
- Visit [github.com/your-username/thersguide](https://github.com/your-username/thersguide)
- Or search for "TheRSGuide" on GitHub

### 2. Click Fork
- Look for the **"Fork"** button in the top right
- Click it to create your copy

### 3. Choose Location
- Select your GitHub account
- Click **"Create fork"**

**Result**: You now have `github.com/your-username/thersguide`

## Step 2: Clone Your Fork

### 1. Get the URL
- On your forked repository page
- Click the green **"Code"** button
- Copy the HTTPS URL (or SSH if you set that up)

### 2. Clone to Your Computer
```bash
# Replace 'your-username' with your actual GitHub username
git clone https://github.com/your-username/thersguide.git

# Move into the directory
cd thersguide
```

### 3. Verify the Clone
```bash
# Check what you have
ls

# Check Git status
git status

# Check remote origin
git remote -v
```

## Step 3: Set Up Upstream

Connect your fork to the original repository:

```bash
# Add the original repository as upstream
git remote add upstream https://github.com/original-owner/thersguide.git

# Verify both remotes
git remote -v
```

**What this does:**
- `origin` → Your fork (where you push)
- `upstream` → Original repository (where you pull updates)

## Step 4: Install Dependencies

```bash
# Install project dependencies
npm install

# Verify installation
npm list --depth=0
```

## Step 5: Start Development Server

```bash
# Start the development server
npm start
```

**What happens:**
- Site opens at `http://localhost:3000`
- You see TheRSGuide running locally
- Changes you make appear in real-time

## Verify Everything Works

### Check the Site
- Open `http://localhost:3000` in your browser
- Navigate around to ensure it loads properly
- Check that all pages and components work

### Check Git Status
```bash
# Should show clean working directory
git status

# Should show your fork as origin
git remote -v
```

## Common Issues

### Fork Button Not Visible
- Make sure you're logged into GitHub
- Check if you already forked the repository
- Look in your profile → Repositories

### Clone Fails
- Verify the URL is correct
- Check your internet connection
- Ensure you have Git installed

### Dependencies Won't Install
- Check Node.js version: `node --version`
- Try clearing npm cache: `npm cache clean --force`
- Check for error messages in the output

### Site Won't Start
- Check if port 3000 is already in use
- Look for error messages in the terminal
- Verify all dependencies installed correctly

## Next Steps

Once your fork is set up:

1. **[Create & Edit Content](./contribution-create-edit)** - Start writing guides
2. **[Test & Commit](./contribution-test-commit)** - Save your work
3. **[Submit Changes](./contribution-submit)** - Share your contributions

## Keeping Your Fork Updated

```bash
# Fetch latest changes from original
git fetch upstream

# Switch to main branch
git checkout main

# Merge latest changes
git merge upstream/main

# Push to your fork
git push origin main
```

## Getting Help

- **GitHub documentation**: [help.github.com](https://help.github.com)
- **Git documentation**: [git-scm.com/doc](https://git-scm.com/doc)
- **Community support**: Ask in TheRSGuide discussions

Your fork is now ready for development! 🎉
