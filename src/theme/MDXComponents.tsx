import React from 'react';
import type { MDXComponents } from 'mdx/types';
import UserInput from '../components/UserInput/UserInput';
import RequirementsChecker from '../components/RequirementsChecker/RequirementsChecker';
import InlineRequirement from '../components/InlineRequirement/InlineRequirement';

export default function useMDXComponents(components: MDXComponents): MDXComponents {
  const customComponents: MDXComponents = {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children, ...props }) => (
      <h1 {...props}>{children}</h1>
    ),
    // Add your custom components here
    UserInput: UserInput,
    // Alias for lowercase usage in MDX
    user: UserInput,
    // Requirements checker component
    RequirementsChecker: RequirementsChecker,
    // Inline requirement components - clear and descriptive names
    SkillReq: InlineRequirement,
    QuestReq: InlineRequirement,
    // Full name as backup
    InlineRequirement: InlineRequirement,
  };
  
  return {
    ...customComponents,
    ...components,
  };
}
