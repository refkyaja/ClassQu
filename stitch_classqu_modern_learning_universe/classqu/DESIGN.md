---
name: ClassQu
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f2f2'
  surface-container: '#f1edec'
  surface-container-high: '#ece7e7'
  surface-container-highest: '#e6e1e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#57423e'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#8b716d'
  outline-variant: '#dec0ba'
  surface-tint: '#a53b29'
  primary: '#a53b29'
  on-primary: '#ffffff'
  primary-container: '#ff7e67'
  on-primary-container: '#731709'
  inverse-primary: '#ffb4a6'
  secondary: '#765a00'
  on-secondary: '#ffffff'
  secondary-container: '#ffd56d'
  on-secondary-container: '#775b00'
  tertiary: '#006a64'
  on-tertiary: '#ffffff'
  tertiary-container: '#60b2ab'
  on-tertiary-container: '#00423e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a6'
  on-primary-fixed: '#3f0300'
  on-primary-fixed-variant: '#842415'
  secondary-fixed: '#ffdf96'
  secondary-fixed-dim: '#eac25b'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#594400'
  tertiary-fixed: '#9ff1e9'
  tertiary-fixed-dim: '#83d5cd'
  on-tertiary-fixed: '#00201e'
  on-tertiary-fixed-variant: '#00504b'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e6e1e1'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The design system is built for a vibrant ed-tech ecosystem that balances playful energy with academic reliability. It targets students and educators who value efficiency without sacrificing personality. 

The aesthetic is **Modern Tactile**, blending high-energy color palettes with clean, spacious layouts. It avoids clinical coldness by utilizing hyper-rounded corners and soft background surfaces. The interface should feel approachable, optimistic, and fast, encouraging exploration through high-contrast action points and subtle depth.

## Colors
The palette is rooted in high-chroma warmth. **Primary Orange** acts as the main driver for calls-to-action and critical brand moments. **Secondary Yellow** provides accent support for highlighting and progress indicators, while **Tertiary Teal** is used for secondary actions and organizational categories to balance the warmth with a sense of calm.

The neutral palette uses the **Neutral Dark** for high-legibility text and primary borders, while background surfaces utilize varying tints of warm gray to prevent the "stark white" digital fatigue.

## Typography
This design system uses **Plus Jakarta Sans** exclusively to maintain a cohesive, friendly, and modern tone. The geometric nature of the font complements the rounded UI elements. 

Headlines use heavy weights (700+) with tighter letter spacing to create a strong visual anchor. Body text remains at a standard weight for maximum legibility, while labels and small captions utilize semi-bold weights and slight tracking increases to ensure clarity at small scales.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a base-4 increment system. 
- **Desktop:** 12-column grid with 64px margins and 20px gutters.
- **Tablet:** 8-column grid with 32px margins and 16px gutters.
- **Mobile:** 4-column grid with 16px margins and 12px gutters.

Spacing between functional groups should lean toward the larger side (24px+) to maintain an airy, approachable feel. Card padding is strictly 24px on desktop to ensure internal content has sufficient breathing room.

## Elevation & Depth
Hierarchy is established through **Tonal Layers** rather than heavy shadows. Main surfaces are off-white, while interactive containers use a slightly elevated tint or a very soft, 2px stroke in a light neutral.

When shadows are used for "floating" elements like modals or popovers, they must be **Ambient Shadows**: diffused (20-30px blur), low opacity (8-12%), and slightly tinted with the Primary Orange or Neutral Dark to maintain color harmony.

## Shapes
The design system embraces a **Pill-shaped (Full)** aesthetic. This "super-ellipse" approach applies to buttons, input fields, and tags. Large containers and cards should use the `rounded-xl` (3rem/48px) setting to echo the friendliness of the smaller components. This consistency in curvature creates a soft, safe, and inviting environment for the user.

## Components
- **Buttons:** Always pill-shaped. Primary buttons use the Orange hex with white text. Secondary buttons use a light Yellow tint with Neutral Dark text.
- **Inputs:** Pill-shaped with a 1.5px Neutral Dark border that shifts to Primary Orange on focus. 
- **Chips/Tags:** Small pill shapes with Tertiary Teal backgrounds and 12px horizontal padding.
- **Cards:** Defined by `rounded-xl` corners. Cards use a 1px soft border or a very subtle background fill to separate from the main canvas.
- **Navigation:** Bottom bars (mobile) and sidebars (desktop) use floating pill-shaped active states to highlight the current location.
- **Progress Indicators:** Use the Secondary Yellow for background tracks and Primary Orange for the active progress bar to maximize visibility.