// Sample data only - no real student records are used.
export const student = {
  name: 'Ayesha Khan',
  rollNo: '23K-0000',
  program: 'BS Computer Science',
  semester: 5,
};

// Minimum attendance (%) a student must keep. Change here to change the whole app.
export const ATTENDANCE_THRESHOLD = 75;
// Courses within this many points above the threshold are flagged "borderline".
export const WARNING_MARGIN = 5;

const log = (...flags) =>
  flags.map((present, i) => ({ date: `Week ${flags.length - i}`, present }));

export const initialCourses = [
  {
    id: 'c1', code: 'CS3009', name: 'Software for Mobile Devices', creditHours: 3,
    attended: 20, held: 24, history: log(true, true, false, true, true),
  },
  {
    id: 'c2', code: 'CS3001', name: 'Computer Networks', creditHours: 3,
    attended: 18, held: 26, history: log(false, true, false, false, true),
  },
  {
    id: 'c3', code: 'CS3005', name: 'Database Systems', creditHours: 3,
    attended: 22, held: 28, history: log(true, true, true, false, true),
  },
  {
    id: 'c4', code: 'CS3007', name: 'Operating Systems', creditHours: 3,
    attended: 15, held: 22, history: log(false, false, true, true, false),
  },
  {
    id: 'c5', code: 'SS1012', name: 'Technical Writing', creditHours: 2,
    attended: 14, held: 14, history: log(true, true, true, true, true),
  },
  {
    id: 'c6', code: 'CS3002', name: 'Artificial Intelligence Lab', creditHours: 1,
    attended: 9, held: 12, history: log(true, false, true, true, true),
  },
];

// Overall attendance % at the end of each of the last weeks (current week is computed live).
export const weeklyTrend = [88, 84, 81, 79, 77];
export const weekLabels = ['W1', 'W2', 'W3', 'W4', 'Now'];
