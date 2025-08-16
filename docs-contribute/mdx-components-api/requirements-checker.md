---
sidebar_position: 2
sidebar_label: RequirementsChecker
---

# RequirementsChecker Component

Interactive checklist for multiple requirements with automatic parsing and visual feedback.

## Live Examples

**Basic Requirements:**
<RequirementsChecker title="Basic Requirements">
50 Attack, 50 Strength, 50 Defence
</RequirementsChecker>

**With Description:**
<RequirementsChecker 
  title="God Wars Dungeon Requirements"
  description="Verify your stats before attempting this challenging boss"
>
43 Prayer, 60 Agility, 60 Strength
</RequirementsChecker>

## Usage

```mdx
<RequirementsChecker title="Requirements">
67 Firemaking, Dragon Slayer, 50 Woodcutting
</RequirementsChecker>
```

## Props

- **`title`** (required): Section heading
- **`description`** (optional): Additional context
- **`children`**: Comma-separated requirements

## Supported Types

- **Skills**: `67 Firemaking`, `80 Attack`
- **Quests**: `Dragon Slayer`, `Desert Treasure`
- **Combat**: `70 Combat`, `85 Combat`
- **Mixed**: `67 Firemaking, Dragon Slayer, 70 Combat`

## How It Works

- **Auto-parsing**: Splits by commas, detects requirement types
- **Real-time updates**: Shows green checkmarks for met requirements
- **Progress tracking**: Displays completion status
- **Requires username** via `<UserInput />`

## Examples

```mdx
<RequirementsChecker 
  title="Quest Requirements"
  description="Check your progress"
>
Talk to Duke Horacio, Collect 5 iron bars, Craft iron dagger
</RequirementsChecker>
```

## Visual States

- **✅ Green**: Requirement met
- **❌ Red**: Requirement not met
- **⏳ Gray**: Loading/checking
- **Progress bar**: Shows completion percentage

## Related

- **[SkillReq & QuestReq](./skill-quest-requirements)**: Inline requirements
- **[UserInput](./user-input)**: Username input
- **[Examples](../../../guides)**: Check the guides section for examples
