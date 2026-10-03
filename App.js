import { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DashboardScreen from './src/screens/DashboardScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import CourseDetailScreen from './src/screens/CourseDetailScreen';
import AddCourseScreen from './src/screens/AddCourseScreen';
import AlertsScreen from './src/screens/AlertsScreen';
import { initialCourses } from './src/data/mockData';
import { withStats } from './src/utils/attendance';
import { colors } from './src/theme';

const MAX_HISTORY = 8;

export default function App() {
  // No navigation library: the current "view" is plain state, as taught in class.
  const [view, setView] = useState({ name: 'dashboard', courseId: null });
  const [rawCourses, setRawCourses] = useState(initialCourses);

  // Derived data: percentages, status and recommendations are recomputed from raw state.
  const courses = rawCourses.map(withStats);

  const go = (name, courseId = null) => setView({ name, courseId });
  const goHome = () => go('dashboard');

  const markAttendance = (id, present) =>
    setRawCourses((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              held: c.held + 1,
              attended: c.attended + (present ? 1 : 0),
              history: [{ date: 'Today', present }, ...c.history].slice(0, MAX_HISTORY),
            }
          : c
      )
    );

  const addCourse = (course) => {
    setRawCourses((prev) => [...prev, course]);
    go('courses');
  };

  const deleteCourse = (id) => {
    setRawCourses((prev) => prev.filter((c) => c.id !== id));
    go('courses');
  };

  const renderView = () => {
    switch (view.name) {
      case 'courses':
        return <CoursesScreen courses={courses} onBack={goHome} onOpenCourse={(id) => go('detail', id)} />;
      case 'detail':
        return (
          <CourseDetailScreen
            course={courses.find((c) => c.id === view.courseId)}
            onBack={() => go('courses')}
            onMark={markAttendance}
            onDelete={deleteCourse}
          />
        );
      case 'addCourse':
        return <AddCourseScreen courses={courses} onBack={goHome} onAdd={addCourse} />;
      case 'alerts':
        return <AlertsScreen courses={courses} onBack={goHome} onOpenCourse={(id) => go('detail', id)} />;
      default:
        return <DashboardScreen courses={courses} onNavigate={go} />;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.frame}>{renderView()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg, alignItems: 'center' },
  frame: { flex: 1, width: '100%', maxWidth: 480 },
});
