# Changelog

All notable changes to this project will be documented in this file.

## [0.5.0] - 2026-02-25

### Added
- **Dark Theme Default**: The application now defaults to a high-contrast Dark Theme (`#1a1a1a` background) to meet design requirements.
- **Russian Localization**: Full translation of Authentication pages (Login, Register, Forgot Password, Verify Email) and Main Chat Interface.
- **Testing Infrastructure**: Added `vitest`, `jsdom`, and `@testing-library/react` for unit testing.
- **Sticker/GIF Picker**: Added a picker component for sending stickers in chat.
- **Chat Wallpapers**: Users can now set custom background images for chats.

### Changed
- **Login UI Refactor**: 
  - Refactored `Login.tsx`, `ForgotPassword.tsx`, and `VerifyEmail.tsx` to use dynamic Theme variables instead of hardcoded colors.
  - Fixed an issue where text was invisible (white on white) in the previous dark mode implementation.
  - Optimized UI for desktop and mobile responsiveness.
- **Theme Palette**: Updated Dark Theme colors to use a darker grey/black palette (`#1a1a1a`, `#2d2d2d`) for better contrast with the Orange accent.

### Fixed
- **WebRTC Polyfills**: Fixed `global is not defined` errors by configuring Vite polyfills correctly.
- **Responsive Layout**: Improved mobile responsiveness for Chat Sidebar and Profile pages.

## [0.4.0] - 2026-02-25

### Added
- **WebRTC Calls**: Implemented Video and Audio calls using `simple-peer` and `socket.io`.
- **Community Discussions**: Added Forums/Threads to Community pages.
- **Photo Gallery**: Added a Grid view for User and Community photos.

## [0.3.0] - 2026-02-25

### Added
- **News Feed**: Aggregated feed of posts from Friends and Communities.
- **Communities**: Group and Public page creation and management.
- **Friends System**: Send, Accept, and Reject friend requests.

## [0.2.0] - 2026-02-25

### Added
- **Profile Page**: VK-style profile with Wall posts, Avatar, and Cover image.
- **Real-time Chat**: Socket.io integration for instant messaging.
- **Auth System**: JWT-based authentication (Backend & Frontend).

## [0.1.0] - 2026-02-25

### Added
- Initial project structure (React + Vite Frontend, Express + Sequelize Backend).
- Basic database models (User, Chat, Message).
