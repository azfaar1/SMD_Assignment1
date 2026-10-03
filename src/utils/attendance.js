import { ATTENDANCE_THRESHOLD, WARNING_MARGIN } from '../data/mockData';

export const percentage = (attended, held) =>
  held === 0 ? 0 : (attended / held) * 100;

export const getStatus = (pct, held) => {
  if (held === 0) return 'safe';
  if (pct < ATTENDANCE_THRESHOLD) return 'critical';
  if (pct < ATTENDANCE_THRESHOLD + WARNING_MARGIN) return 'warning';
  return 'safe';
};

// Most classes that can still be skipped while staying at/above the threshold.
export const classesCanMiss = (attended, held) => {
  const t = ATTENDANCE_THRESHOLD / 100;
  return Math.max(0, Math.floor(attended / t - held));
};

// Consecutive classes that must be attended to climb back to the threshold.
export const classesNeeded = (attended, held) => {
  const t = ATTENDANCE_THRESHOLD / 100;
  if (held === 0 || attended / held >= t) return 0;
  return Math.ceil((t * held - attended) / (1 - t));
};

export const withStats = (course) => {
  const pct = percentage(course.attended, course.held);
  return {
    ...course,
    pct,
    status: getStatus(pct, course.held),
    canMiss: classesCanMiss(course.attended, course.held),
    needed: classesNeeded(course.attended, course.held),
  };
};

export const overallPercentage = (courses) => {
  const held = courses.reduce((sum, c) => sum + c.held, 0);
  const attended = courses.reduce((sum, c) => sum + c.attended, 0);
  return percentage(attended, held);
};

export const countByStatus = (courses) =>
  courses.reduce(
    (acc, c) => ({ ...acc, [c.status]: acc[c.status] + 1 }),
    { safe: 0, warning: 0, critical: 0 }
  );

// Builds human-readable, prioritised recommendations from course stats.
export const buildAlerts = (courses) => {
  const order = { critical: 0, warning: 1 };
  return courses
    .filter((c) => c.status !== 'safe')
    .sort((a, b) => order[a.status] - order[b.status] || a.pct - b.pct)
    .map((c) => ({
      id: c.id,
      status: c.status,
      title: c.name,
      message:
        c.status === 'critical'
          ? `Attend the next ${c.needed} class${c.needed === 1 ? '' : 'es'} in a row to get back to ${ATTENDANCE_THRESHOLD}%.`
          : c.canMiss === 0
          ? `Do not miss any more classes - you have no spare absences left.`
          : `You can only miss ${c.canMiss} more class${c.canMiss === 1 ? '' : 'es'}.`,
    }));
};

// Validates the "add course" form; returns an object of error messages.
export const validateCourse = ({ code, name, creditHours, held, attended }, existing) => {
  const errors = {};
  if (!/^[A-Za-z]{2,3}\d{3,4}$/.test(code.trim()))
    errors.code = 'Use a code like CS3009.';
  else if (existing.some((c) => c.code.toLowerCase() === code.trim().toLowerCase()))
    errors.code = 'This course is already added.';
  if (name.trim().length < 3) errors.name = 'Enter at least 3 characters.';
  const ch = Number(creditHours);
  if (!Number.isInteger(ch) || ch < 1 || ch > 4) errors.creditHours = 'Enter 1 to 4.';
  const h = Number(held);
  if (held === '' || !Number.isInteger(h) || h < 0) errors.held = 'Enter a whole number.';
  const a = Number(attended);
  if (attended === '' || !Number.isInteger(a) || a < 0) errors.attended = 'Enter a whole number.';
  else if (!errors.held && a > h) errors.attended = 'Cannot exceed classes held.';
  return errors;
};
