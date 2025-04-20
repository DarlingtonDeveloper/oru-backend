# Oru Design Guidelines

## 1. Design Philosophy

Oru is built around the principle of **mindful digital engagement**. Our design must embody this core mission through purposeful interfaces that promote:

- **Intentional Systems**: Design for habit formation rather than willpower
- **Cognitive Ease**: Reduce mental load during moments of distraction awareness 
- **Calm Technology**: Interfaces that inform without overwhelming
- **Respectful Attention**: Avoid the very patterns we help users overcome

## 2. Color System

### 2.1 Primary Brand Colors

- **Deep Teal** (`#087E8B`): Primary actions, focus elements, brand identity
- **Soft Turquoise** (`#5AB1BB`): Secondary elements, hover states, accents
- **Deep Blue-Gray** (`#252D38`): Dark mode backgrounds, headers, emphasis
- **Light Blue-Gray** (`#F5F9FC`): Light mode backgrounds, content areas

### 2.2 Semantic Colors

- **Mindful Green** (`#3EB489`): Success, progress, positive metrics
- **Muted Amber** (`#F2BB05`): Warnings, moderate usage indicators
- **Subdued Coral** (`#FF6B6B`): Errors, excessive usage alerts
- **Balanced Slate** (`#5C6E91`): Neutral UI components

### 2.3 Neutral Colors

- **Deep Slate** (`#1A2130`): Primary text, high-emphasis content
- **Slate Gray** (`#586A94`): Secondary text, medium-emphasis content
- **Light Gray** (`#9EADCB`): Tertiary text, low-emphasis content
- **Light Blue-Gray** (`#E1E8F0`): Borders, dividers, subtle separation

### 2.4 Color Usage Guidelines

- Reserve Deep Teal for primary actions and key data points
- Use color semantically—consistently apply the same color for the same meaning
- Maintain a 4.5:1 contrast ratio between text and background for accessibility
- Limit use of Subdued Coral to truly important alerts to avoid alarm fatigue
- In data visualizations, use sequential variations of teal for related data points

## 3. Typography

### 3.1 Font Families

- **Primary Font**: Geist Sans (var(--font-geist-sans))
  - Used for all interface text, headings, and body content
- **Monospace Font**: Geist Mono (var(--font-geist-mono))
  - Used for time displays, numeric data in charts, and code examples

### 3.2 Type Scale

| Element            | Size (rem) | Weight | Line Height | Usage                             |
|--------------------|------------|--------|-------------|-----------------------------------|
| Display            | 3rem       | 700    | 1.2         | Hero sections, landing page titles |
| H1                 | 2rem       | 700    | 1.25        | Page titles                        |
| H2                 | 1.5rem     | 600    | 1.3         | Section headers                    |
| H3                 | 1.25rem    | 600    | 1.4         | Card headers, subsections          |
| Body Large         | 1.125rem   | 400    | 1.5         | Featured content, intros           |
| Body               | 1rem       | 400    | 1.6         | Default text                       |
| Small              | 0.875rem   | 400    | 1.6         | Supporting text, labels            |
| Caption            | 0.75rem    | 400    | 1.6         | Metadata, timestamps               |

### 3.3 Typography Guidelines

- Use sentence case for headings and UI elements
- Limit line length to 80 characters maximum for readability
- Maintain a clear typographic hierarchy to guide users through content
- Use weight variation (not just size) to create hierarchy
- Avoid using color alone to communicate importance—pair with weight or size changes

## 4. Layout & Spacing

### 4.1 Grid System

- Base 8px grid (0.5rem) for all spacing decisions
- Use 24px (1.5rem) horizontal padding for mobile containers
- Use 32px (2rem) or greater horizontal padding for desktop containers
- Maximum content width of 1200px (75rem) for optimal readability

### 4.2 Spacing Scale

| Token | Size      | Usage                                            |
|-------|-----------|--------------------------------------------------|
| xs    | 0.25rem   | Tight spacing between related elements           |
| sm    | 0.5rem    | Default spacing between related elements         |
| md    | 1rem      | Standard spacing between groups of elements      |
| lg    | 1.5rem    | Spacing between distinct sections                |
| xl    | 2rem      | Major section separations                        |
| 2xl   | 3rem      | Page section separations                         |

### 4.3 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Wide Desktop: > 1280px

### 4.4 Layout Principles

- Prioritize vertical scrolling over horizontal scrolling
- Use white space strategically to reduce cognitive load
- Group related functions and information together
- Maintain consistent alignment within screen and between screens
- Provide appropriate padding for touch targets (minimum 44x44px)

## 5. Components & Patterns

### 5.1 Primary Components

#### Buttons

- **Primary Button**: Deep Teal background, white text, 4px border radius
- **Secondary Button**: White background, Deep Teal border, Deep Teal text
- **Tertiary Button**: No background/border, Deep Teal text
- **Destructive Button**: Subdued Coral background, white text
- **Button States**: Hover (+10% brightness), Active (-10% brightness), Disabled (50% opacity)

#### Forms

- **Text Fields**: Light background, 1px border, 4px border radius
- **Labels**: Position above fields, Slate Gray color
- **Error States**: Subdued Coral border and supporting text
- **Success States**: Mindful Green checkmark icon or supporting text
- **Help Text**: Small size, Light Gray color, positioned below fields

#### Cards

- White background in light mode, Deep Blue-Gray in dark mode
- 8px border radius
- Subtle shadow (0 2px 4px rgba(0, 0, 0, 0.1))
- 24px internal padding
- Optional teal accent line (4px) at top or left edge for emphasis

### 5.2 Patterns

#### Authentication

- Minimal, focused authentication screens without distractions
- Clear error messages with constructive guidance
- Obvious progress indication for multi-step processes
- Prominent forgotten password and account creation links

#### Dashboard

- Prioritize high-value metrics and visualizations
- Group related data in logical sections
- Provide progressive disclosure for detailed information
- Use visual hierarchy to highlight important or concerning metrics

#### App Selection

- Clear visual indication of selected vs. unselected state
- Batch selection capabilities for efficiency
- Search/filter for users with many tracked apps
- Recently used quick-selection options

## 6. Iconography

### 6.1 Icon Style

- Use outlined icons with 1.5px stroke weight
- 24x24px default size, 16x16px for compact UI elements
- Rounded corners (2px radius)
- Optionally filled for active/selected states

### 6.2 Icon Usage

- Use icons to reinforce meaning, not replace text
- Pair icons with labels for clarity, especially for actions
- Maintain consistent meaning—the same icon should not represent different actions
- Use app icons when referring to specific platforms being tracked
- Scale appropriately: 16px for utilities, 24px for navigation, 32px+ for featured elements

### 6.3 Custom Icons

- Target icon (🎯) as the primary brand mark
- Custom tracking/logging icon for the primary action
- App-specific icons should follow platform standards for recognition

## 7. Data Visualization

### 7.1 Charts & Graphs

- Use bar charts for comparing values across categories (e.g., app usage)
- Use line charts for temporal data (e.g., usage over time)
- Use heat maps for time/day patterns
- Apply consistent color scheme across all visualizations
- Include appropriate labels and context directly in visualizations
- Provide empty states and zero states for all visualizations

### 7.2 Data Representation Principles

- Show the most important metrics at the highest visual hierarchy
- Provide appropriate context for all metrics
- Use change indicators (↑↓) with semantic colors for trends
- Round numbers appropriately to avoid false precision
- Use appropriate units and abbreviations consistently

### 7.3 Data Density

- Progressive disclosure from overview to detail
- Avoid overloading single visualizations with too many data series
- Use small multiples rather than complex multi-series charts when appropriate
- Prioritize clarity over decoration

## 8. Motion & Animation

### 8.1 Transitions

- Subtle transitions between states (150-250ms duration)
- Use ease-out timing functions for entering elements
- Use ease-in timing functions for exiting elements
- Avoid animations that delay user interaction

### 8.2 Animation Purpose

- Use animation to:
  - Connect user actions to system responses
  - Guide attention to important changes
  - Create a sense of physical space and organization
  - Reduce perceived loading time

### 8.3 Animation Principles

- Respect reduced motion preferences
- Keep animations subtle and purposeful
- Maintain 60fps performance
- Limit concurrent animations
- Animations should reinforce the mental model, not distract from it

## 9. Accessibility

### 9.1 Core Requirements

- Minimum AA WCAG 2.1 compliance for all interfaces
- Support keyboard navigation throughout the interface
- All functionality available without requiring precise pointer control
- Proper heading structure and landmark regions

### 9.2 Design Considerations

- Minimum 4.5:1 contrast ratio for text
- Minimum 3:1 contrast ratio for UI controls and graphical objects
- Text resizable up to 200% without loss of content or function
- Do not use color alone to convey meaning
- Touch targets minimum 44x44px
- Visible focus states for all interactive elements

### 9.3 Content Guidelines

- Use plain language
- Write descriptive link text
- Provide text alternatives for images and visualizations
- Use proper semantic elements (buttons for actions, links for navigation)

## 10. Voice & Tone

### 10.1 Content Principles

- **Clear**: Direct language that avoids jargon
- **Supportive**: Encouraging rather than judgmental
- **Concise**: Brief but complete information
- **Honest**: Transparent about what is being tracked
- **Empowering**: Focus on user control and agency

### 10.2 Specific Contexts

- **Success Messages**: Celebrate achievements without exaggeration
- **Error Messages**: Explain clearly what happened and how to fix it
- **Empty States**: Provide helpful guidance on next steps
- **Instructional Content**: Step-by-step guidance with a friendly tone
- **Data Insights**: Present observations, not judgments

### 10.3 Writing Guidelines

- Address the user directly ("you" not "the user")
- Use active voice when describing actions
- Avoid technical jargon unless necessary
- Maintain consistent terminology throughout the app
- Use sentence case for all UI text

## 11. Implementation

### 11.1 CSS Guidelines

- Use Tailwind utility classes consistently
- Create custom Tailwind theme values for brand colors and typography
- Avoid inline styles
- Limit custom CSS to complex components
- Follow mobile-first approach for responsive design

### 11.2 Component Structure

- Build reusable components for common UI patterns
- Document component props and variants
- Ensure each component has appropriate states (loading, error, empty)
- Implement responsive behavior within components

### 11.3 Performance Considerations

- Optimize images and SVGs
- Implement appropriate loading states
- Lazy load off-screen content
- Minimize JavaScript bundle size
- Ensure interfaces remain responsive during data fetching

## 12. Design Review Process

Before releasing new designs, ensure they meet these criteria:

1. Alignment with brand principles and design system
2. Consistent use of established patterns
3. Accessible to all users
4. Optimized for all target devices
5. Purposeful in supporting user goals
6. Clear information hierarchy
7. Appropriate feedback for all user actions
8. Efficient user flows with minimal steps
9. Proper handling of errors and edge cases
10. Performance considerations addressed

By following these design guidelines, we can create a consistent, accessible, and delightful experience that helps users build healthier digital habits.