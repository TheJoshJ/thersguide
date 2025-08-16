---
sidebar_position: 3
sidebar_label: UserInput
---

# UserInput Component

Username input field that powers all requirement checking components.

## Live Examples

**Basic UserInput:**
<UserInput />

**Note:** This component is the entry point for all requirement checking. Enter a username to see how the other components below respond!

## Usage

```mdx
<UserInput />
```

**No props required** - pre-configured with optimal settings.

## Features

- **Auto-save**: Stores username in localStorage
- **Debounced search**: 500ms delay to avoid excessive API calls
- **Immediate search**: Press Enter for instant results
- **Real-time updates**: All requirement components update automatically

## Examples

```mdx
## Player Requirements

<UserInput />

### Your Requirements
- <SkillReq>67 Firemaking</SkillReq> for magic logs
- <QuestReq>Dragon Slayer</QuestReq> for rune platebody
```

## How It Works

1. **Username entry** → Saves to localStorage
2. **API call** → Fetches player data from TheRSGuide API
3. **Context update** → Shares data with all requirement components
4. **Visual feedback** → Components show green/red borders

## API Data

Fetches comprehensive player information:
- **Skills**: Levels and XP for all skills
- **Quests**: Completion status for all quests
- **Stats**: Combat level, quest points, total level

## Best Practices

- **Place at top** of guides for early requirement checking
- **Include context** explaining why username is needed
- **Always pair** with requirement components
- **Test functionality** before publishing

## Related

- **[SkillReq & QuestReq](./skill-quest-requirements)**: Inline requirements
- **[RequirementsChecker](./requirements-checker)**: Interactive checklist
- **[Examples](../../../guides)**: Check the guides section for examples
