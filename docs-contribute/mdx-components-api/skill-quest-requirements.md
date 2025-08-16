---
sidebar_position: 1
sidebar_label: SkillReq & QuestReq
---

# SkillReq & QuestReq Components

Inline requirement checking for skills and quests with automatic visual feedback.

## Live Examples

**Skill Requirements:**
- You need <SkillReq>67 Firemaking</SkillReq> to burn magic logs
- Aim for <SkillReq>80 Attack</SkillReq> for high-level combat
- <SkillReq>50 Woodcutting</SkillReq> is required for cutting logs

**Quest Requirements:**
- Complete <QuestReq>Dragon Slayer</QuestReq> for rune platebody access
- <QuestReq>Desert Treasure</QuestReq> unlocks Ancient Magicks
- <QuestReq>Recipe for Disaster</QuestReq> provides barrows gloves

## Usage

```mdx
<SkillReq>67 Firemaking</SkillReq>
<QuestReq>Dragon Slayer</QuestReq>
```

## How It Works

- **Skill Detection**: `67 Firemaking` → Requires level 67 Firemaking
- **Quest Detection**: `Dragon Slayer` → Requires quest completion
- **Visual Feedback**: Green border = met, red border = not met
- **Auto-updates** when username changes via `<UserInput />`

## Examples

```mdx
## Requirements
- <SkillReq>40 Attack</SkillReq> for rune weapons
- <QuestReq>Dragon Slayer</QuestReq> for access
- <SkillReq>70 Prayer</SkillReq> for protection prayers
```

## Styling

- **Green border**: Requirement met
- **Red border**: Requirement not met
- **Gray border**: No username or loading
- **Hover tooltip**: Shows current vs. required values

## Related

- **[RequirementsChecker](./requirements-checker)**: Interactive checklist
- **[UserInput](./user-input)**: Username input
- **[Examples](../../../guides)**: Check the guides section for examples