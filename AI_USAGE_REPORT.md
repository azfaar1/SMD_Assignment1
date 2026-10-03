# AI Usage Report

> Draft: the course's AI Usage Report template was not available when this was written. Copy these answers into the official template and edit anything that does not match what you actually did.

## Tools used

- **Claude Code** (Anthropic, model Claude Sonnet 5.5), run as a coding agent in the terminal.

## How AI was used

| Activity | AI contribution |
| --- | --- |
| Reading the assignment | Read the PDF and summarised the requirements (no navigation library, `react-native-chart-kit` dashboard, forms, states). |
| Idea | Proposed several app ideas; the student chose "Attendance & alerts hub" with sample data. |
| Code generation | Generated the Expo project, components, screens, and attendance utilities. |
| Testing | Ran the app in a browser, drove it with a script, and took the screenshots. |
| Documentation | Drafted the README and this report. |

## What the student decided

- The app idea (attendance hub) and use of mock data.
- Repository visibility (public) and commit identity.

## Review, testing and verification

- The app was run in a phone-sized browser window; search, filters, sorting, marking attendance, form validation, and the add/remove flows were exercised and screenshotted.
- Attendance maths: `canMiss = floor(attended / t - held)` and `needed = ceil((t * held - attended) / (1 - t))`, where `t = 0.75`. Example: 18/25 attended gives 72%, and 3 consecutive classes give 21/28 = 75%, which matches the app's "Attend the next 3 classes" message.
- Not tested on a physical device or native emulator.

## Known limitations

- Data is in-memory only and resets on reload.
- Chart-kit prints SVG-prop warnings on web.

## Student's understanding (fill in before the viva)

- [ ] I can explain where state lives (`App.js`: `view`, `rawCourses`) and why stats are derived with `withStats`.
- [ ] I can change `ATTENDANCE_THRESHOLD`, add a course to `initialCourses`, or change a filter/sort live.
- [ ] I can explain the `canMiss` / `needed` formulas.
