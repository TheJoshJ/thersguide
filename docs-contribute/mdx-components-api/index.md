---
sidebar_position: 1
---

# MDX Components API Reference

This directory contains detailed API documentation for all available MDX components in TheRSGuide. Each component is documented with examples, props, styling information, and best practices.

## Available Components

### Core Components

- **[SkillReq & QuestReq](./skill-quest-requirements)**: Inline requirement checking for skills and quests
- **[RequirementsChecker](./requirements-checker)**: Interactive checklist for multiple requirements
- **[UserInput](./user-input)**: Username input field for requirement checking

### Additional Components

- **[PlayerStatsDisplay](./player-stats-display)**: Comprehensive player statistics display
- **[TestComponent](./test-component)**: Development and testing utilities

## Quick Start

### Basic Usage Pattern

```mdx
## My Guide

<UserInput />

### Requirements
- <SkillReq>67 Firemaking</SkillReq> for magic logs
- <QuestReq>Dragon Slayer</QuestReq> for access

<RequirementsChecker title="Complete Requirements">
67 Firemaking, Dragon Slayer
</RequirementsChecker>
```

### Component Dependencies

1. **UserInput**: Always include first to enable requirement checking
2. **SkillReq/QuestReq**: Use for inline requirement display
3. **RequirementsChecker**: Use for comprehensive requirement lists

## Component Architecture

### Data Flow

```
UserInput → RuneScape Context → API → Requirement Components
    ↓              ↓           ↓           ↓
Username    Player Data    Skills/Quests   Visual Updates
```

### Context Integration

All components use the `RuneScapeContext` to share:
- Username state
- Player statistics
- Loading states
- Error handling

## Getting Help

### Documentation
- **Component Guides**: See individual component pages for detailed API docs
- **Examples**: Check the [guides section](../../guides) for examples
- **Best Practices**: Each component page includes usage recommendations

### Troubleshooting
- **Common Issues**: Each component has a troubleshooting section
- **Debug Tips**: Learn how to diagnose and fix problems
- **Performance**: Understand optimization and API usage

## Contributing

### Adding New Components
1. Create the component in `src/components/`
2. Add to `src/theme/MDXComponents.tsx`
3. Create API documentation in this directory
4. Update the main [MDX guide](../mdx-components)

### Documentation Standards
- **Clear Examples**: Include working code samples
- **Props Documentation**: Document all available props
- **Styling Information**: Include CSS classes and customization
- **Best Practices**: Provide usage recommendations

## Related Resources

- **[Using MDX Components](../mdx-components)**: General guide to MDX usage
- **[Contribution Workflow](../contribution-workflow)**: How to contribute to TheRSGuide
- **[Guides Section](../../guides)**: Check the guides section for examples
