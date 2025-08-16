---
sidebar_position: 8
sidebar_label: Test & Commit
---

# Test & Commit

Verify your work and save your changes to Git.

## Why Testing Matters

- **Catch errors** before others see them
- **Ensure quality** of your contributions
- **Avoid build failures** that block merging
- **Provide better user experience**

## Step 1: Test Your Changes

### 1. Start Development Server
```bash
npm start
```

### 2. Check Your Content
- Navigate to your new/edited page
- Verify it displays correctly
- Check all formatting works
- Test any interactive components

### 3. Test Responsiveness
- Resize browser window
- Check mobile view (F12 → Device toolbar)
- Ensure images scale properly
- Verify text is readable

### 4. Check for Errors
- Look at browser console (F12 → Console)
- Check terminal for build errors
- Verify no broken links
- Test navigation works

## Step 2: Build Test

### 1. Stop Development Server
```bash
# Press Ctrl+C to stop
```

### 2. Run Build Command
```bash
npm run build
```

### 3. Check for Errors
- Look for build failures
- Fix any syntax errors
- Resolve missing dependencies
- Check for broken imports

### 4. Common Build Issues
- **Markdown syntax errors** - Check for missing brackets, quotes
- **MDX component errors** - Verify component names and syntax
- **Sidebar errors** - Check for missing files or typos
- **Image path errors** - Verify image locations and references

## Step 3: Final Testing

### 1. Restart Development Server
```bash
npm start
```

### 2. Complete Test Checklist
- [ ] Page loads without errors
- [ ] All content displays correctly
- [ ] Images load properly
- [ ] Links work correctly
- [ ] MDX components function
- [ ] Mobile view looks good
- [ ] No console errors
- [ ] Navigation works

### 3. Test Edge Cases
- Try different screen sizes
- Test with various content lengths
- Check loading states
- Verify error handling

## Step 4: Commit Your Changes

### 1. Check Git Status
```bash
git status
```

**What you should see:**
- Modified files in red
- New files in green
- Untracked files listed

### 2. Add Your Changes
```bash
# Add specific files
git add docs-guides/skills/fishing.md
git add sidebars-guides.ts

# Or add all changes
git add .
```

### 3. Review What You're Committing
```bash
# See what will be committed
git diff --cached

# See all changes
git diff
```

### 4. Write a Good Commit Message
```bash
git commit -m "Add comprehensive fishing guide

- Add fishing guide for levels 1-99
- Include training methods and locations
- Add requirements and tips
- Update skills sidebar to include fishing
- Add fishing spot images"
```

**Commit Message Guidelines:**
- **First line**: Brief summary (under 50 characters)
- **Blank line**: Separate summary from details
- **Body**: Detailed explanation with bullet points
- **Use imperative mood**: "Add" not "Added"

## Step 5: Push to Your Fork

### 1. Push Your Branch
```bash
git push origin feature/your-feature-name
```

### 2. Verify Push
```bash
# Check remote branches
git branch -r

# Check push status
git status
```

## Testing Checklist

### Content Testing
- [ ] Page loads correctly
- [ ] All text displays properly
- [ ] Headings are properly formatted
- [ ] Lists render correctly
- [ ] Links work and go to right places
- [ ] Images load and display properly

### Functionality Testing
- [ ] MDX components work
- [ ] Interactive elements function
- [ ] Navigation works correctly
- [ ] Search functionality works
- [ ] Sidebar displays properly

### Technical Testing
- [ ] No build errors
- [ ] No console errors
- [ ] No broken imports
- [ ] All dependencies resolve
- [ ] Site builds successfully

### User Experience Testing
- [ ] Content is readable
- [ ] Information is organized logically
- [ ] Mobile experience is good
- [ ] Loading times are reasonable
- [ ] No broken functionality

## Common Issues and Fixes

### Build Fails
```bash
# Check for syntax errors
npm run build

# Look for specific error messages
# Fix markdown syntax issues
# Resolve missing dependencies
```

### Components Not Working
- Check component syntax
- Verify username input is provided
- Look for console errors
- Test with simple examples first

### Sidebar Issues
- Check file paths in sidebar
- Verify frontmatter syntax
- Ensure files exist in referenced locations
- Check for typos in file names

### Image Problems
- Verify image file exists
- Check image path in markdown
- Ensure image format is supported
- Check file permissions

## Best Practices

### Before Committing
- [ ] Test thoroughly in development
- [ ] Check for build errors
- [ ] Verify all functionality works
- [ ] Test on different screen sizes
- [ ] Check for typos and grammar

### Commit Messages
- [ ] Use clear, descriptive language
- [ ] Keep first line under 50 characters
- [ ] Include detailed explanation
- [ ] Reference related issues if applicable
- [ ] Use consistent formatting

### Testing Strategy
- [ ] Test incrementally as you work
- [ ] Test the complete user journey
- [ ] Check edge cases and error states
- [ ] Verify cross-browser compatibility
- [ ] Test with different content lengths

## Next Steps

Once your changes are committed and pushed:

1. **[Submit Changes](./contribution-submit)** - Create pull request
2. **Wait for review** - Maintainers will check your work
3. **Address feedback** - Make any requested changes
4. **Celebrate** - Your contribution is merged! 🎉

## Getting Help

- **Build errors**: Check terminal output for specific messages
- **Component issues**: Review [MDX Components](./mdx-components) guide
- **Git problems**: Check [Git documentation](https://git-scm.com/doc)
- **Community support**: Ask questions in discussions

Your work is tested and saved! ✅
