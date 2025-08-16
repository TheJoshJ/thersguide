---
sidebar_position: 2
---

# Markdown Guide

Markdown is the primary format for writing content in TheRSGuide. This guide will teach you the essential markdown syntax to create well-formatted guides.

## Basic Syntax

### Headings

Use `#` symbols to create headings. The number of `#` symbols determines the heading level:

```markdown
# Main Title (H1)
## Section Title (H2)
### Subsection Title (H3)
#### Sub-subsection Title (H4)
```

**Note**: In TheRSGuide, we typically start with `##` (H2) since the page title is automatically H1.

### Text Formatting

```markdown
**Bold text** - Use double asterisks
*Italic text* - Use single asterisks
`inline code` - Use backticks for code snippets
~~Strikethrough~~ - Use double tildes
```

### Lists

#### Unordered Lists
```markdown
- First item
- Second item
  - Sub-item (indent with 2 spaces)
  - Another sub-item
- Third item
```

#### Ordered Lists
```markdown
1. First step
2. Second step
   1. Sub-step (indent with 3 spaces)
   2. Another sub-step
3. Third step
```

### Links

```markdown
[Link text](https://example.com)
[Internal page link](./other-page.md)
[Link with title](https://example.com "Title text")
```

### Images

```markdown
![Alt text](path/to/image.png)
![RuneScape interface](img/interface-example.png "Example of the RuneScape interface")
```

**Image Guidelines:**
- Place images in the `static/img/` directory
- Use descriptive alt text
- Keep file sizes reasonable (under 500KB)
- Use PNG for screenshots, JPG for photos

### Code Blocks

#### Inline Code
```markdown
Use `var(--ifm-color-primary)` to reference CSS variables.
```

#### Code Blocks
````markdown
```javascript
function calculateXP(level) {
  return Math.floor(level * 100 * 1.5);
}
```
````

#### Syntax Highlighting
````markdown
```typescript
interface PlayerStats {
  attack: number;
  strength: number;
  defence: number;
}
```
````

### Blockquotes

```markdown
> This is a blockquote. Use it for important notes, tips, or warnings.
> 
> You can have multiple paragraphs in a blockquote.
```

### Tables

```markdown
| Skill | Level Required | XP Needed |
|-------|----------------|-----------|
| Attack | 1 | 0 |
| Strength | 1 | 0 |
| Defence | 1 | 0 |
```

## RuneScape-Specific Formatting

### Requirements Blocks

Use code blocks to display skill requirements:

```markdown
```requirements
- Attack: 40
- Strength: 40
- Defence: 40
- Quest: Dragon Slayer
```
```

### Tips and Warnings

```markdown
> **💡 Tip:** Always bring food when training combat skills.
> 
> **⚠️ Warning:** This method requires high-level equipment and can be dangerous.
```

### Skill Levels

```markdown
- **Attack**: 40 (recommended: 50)
- **Strength**: 40 (recommended: 50)
- **Defence**: 40 (recommended: 50)
```

## Best Practices

### Structure
- Use clear, descriptive headings
- Keep paragraphs short (2-3 sentences max)
- Use lists for multiple items
- Break up long content with subheadings

### Content
- Write in active voice
- Be specific and clear
- Include examples when helpful
- Use consistent terminology

### Formatting
- Don't overuse bold or italic
- Use code blocks for requirements and examples
- Include relevant images
- Test your markdown before submitting

## Examples

Here's an example of a well-formatted skill guide section:

```markdown
## Training Methods

### Method 1: Slayer Tasks
Slayer tasks are the most efficient way to train combat skills.

**Requirements:**
- Combat level: 30
- Slayer level: 1
- Quest: None

**Steps:**
1. Talk to a Slayer Master
2. Get assigned a task
3. Complete the task
4. Return for a new assignment

> **💡 Tip:** Use the highest-level Slayer Master you can access for better tasks.

### Method 2: Training Dummies
Training dummies provide safe, consistent XP.

**Requirements:**
- Combat level: 1
- Location: Lumbridge Combat Academy

**XP Rates:**
- Attack: 100 XP/hour
- Strength: 100 XP/hour
- Defence: 100 XP/hour
```

## Next Steps

Now that you understand markdown basics:
- [Learn about MDX components](./mdx-components)
- [Check the contribution workflow](./contribution-workflow)
- [Review the guide writing guidelines](./guide-writing)

Remember: Good formatting makes guides easier to read and more professional. Take time to structure your content well!
