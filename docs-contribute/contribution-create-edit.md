---
sidebar_position: 7
sidebar_label: Create & Edit Content
---

# Create & Edit Content

Write guides, fix issues, and make TheRSGuide better.

## What You Can Do

- **Add new guides** for skills, quests, or activities
- **Fix typos** and errors in existing content
- **Improve formatting** and readability
- **Add images** and visual content
- **Update information** that's outdated

## Before You Start

### 1. Create a Branch
Always work on a new branch:

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Examples:
git checkout -b feature/add-fishing-guide
git checkout -b fix/typo-in-combat-guide
git checkout -b docs/update-contribution-guide
```

### 2. Branch Naming Convention
- `feature/` - New features or guides
- `fix/` - Bug fixes or corrections
- `docs/` - Documentation updates
- `style/` - Styling or formatting changes

## Adding New Content

### 1. Choose the Right Location

**Skill Guides:**
```
docs-guides/skills/your-skill-name.md
```

**Quest Guides:**
```
docs-guides/quests/quest-name.md
```

**General Guides:**
```
docs-guides/your-category/guide-name.md
```

### 2. Create the File
```bash
# Create a new file
touch docs-guides/skills/fishing.md

# Or use your text editor to create it
```

### 3. Add Frontmatter
Every markdown file needs frontmatter at the top:

```markdown
---
sidebar_position: 1
---

# Fishing Guide

Your content goes here...
```

**Frontmatter options:**
- `sidebar_position` - Order in the sidebar
- `sidebar_label` - Custom label for sidebar
- `id` - Unique identifier for the page

### 4. Write Your Content

Follow the [markdown guide](./markdown-guide.md) for formatting:

```markdown
# Fishing Guide

## Overview
Fishing is a gathering skill that allows players to catch fish.

## Requirements
- No requirements to start
- Higher levels unlock better fishing spots

## Training Methods

### Level 1-20: Shrimp and Anchovies
- **Location**: Lumbridge Swamp
- **Equipment**: Small fishing net
- **Experience**: 10 XP per catch

### Level 20-40: Trout and Salmon
- **Location**: Lumbridge Swamp
- **Equipment**: Fly fishing rod
- **Experience**: 50 XP per catch
```

## Using MDX Components

### 1. No Imports Needed
MDX components are automatically available:

```mdx
## Requirements

<UserInput />

### Skill Requirements
- <SkillReq>67 Fishing</SkillReq> for sharks
- <QuestReq>Fishing Contest</QuestReq> for access

<RequirementsChecker title="Fishing Requirements">
67 Fishing, Fishing Contest
</RequirementsChecker>
```

### 2. Component Examples
- **`<SkillReq>67 Fishing</SkillReq>`** - Check skill levels
- **`<QuestReq>Fishing Contest</QuestReq>`** - Check quest completion
- **`<RequirementsChecker>`** - Interactive checklist
- **`<UserInput />`** - Username input field

## Editing Existing Content

### 1. Find the File
- Browse the `docs-guides/` directory
- Use search in your editor
- Check the sidebar files for structure

### 2. Make Your Changes
- Edit the content directly
- Save the file
- Check the development server for changes

### 3. Common Edits
- Fix typos and grammar
- Update outdated information
- Improve formatting and structure
- Add missing details

## Adding Images

### 1. Place Images
Put images in the `static/img/` directory:

```
static/img/
├── skills/
│   ├── fishing-spots.png
│   └── fishing-equipment.png
└── guides/
    └── fishing-guide.png
```

### 2. Reference in Content
```markdown
![Fishing Spots](../static/img/skills/fishing-spots.png)

![Fishing Equipment](../static/img/skills/fishing-equipment.png)
```

## Updating Sidebars

When adding new content, update the appropriate sidebar:

```typescript
// In sidebars-guides.ts
{
  type: 'category',
  label: 'Skills',
  items: [
    'skills/attack',
    'skills/fishing', // Add your new guide here
    'skills/woodcutting',
  ],
},
```

## Content Guidelines

### 1. Structure
- Use clear headings (H1, H2, H3)
- Break content into logical sections
- Include overview and requirements
- Provide step-by-step instructions

### 2. Style
- Write in clear, simple language
- Use bullet points for lists
- Include examples and tips
- Keep paragraphs short and focused

### 3. Accuracy
- Verify all information is correct
- Check skill levels and requirements
- Ensure quest names are spelled correctly
- Test any MDX components you use

## Testing Your Content

### 1. Check the Development Server
```bash
npm start
```

### 2. Navigate to Your Page
- Find your guide in the sidebar
- Check that it displays correctly
- Verify all formatting works
- Test any interactive components

### 3. Test Responsiveness
- Check mobile view
- Ensure images scale properly
- Verify text is readable on all devices

## Common Issues

### Content Not Showing
- Check file location is correct
- Verify frontmatter syntax
- Ensure sidebar is updated
- Check for build errors

### Formatting Problems
- Verify markdown syntax
- Check for missing spaces
- Ensure proper heading hierarchy
- Test in development server

### MDX Components Not Working
- Check component syntax
- Verify username is entered
- Look for console errors
- Test with simple examples first

## Next Steps

Once your content is ready:

1. **[Test & Commit](./contribution-test-commit)** - Verify and save your work
2. **[Submit Changes](./contribution-submit)** - Share your contributions

## Getting Help

- **[Markdown Guide](./markdown-guide.md)** - Formatting help
- **[MDX Components](./mdx-components)** - Interactive components
- **[Style Guide](./style-guide.md)** - Content standards
- **Community support** - Ask questions in discussions

Your content is taking shape! 📝
