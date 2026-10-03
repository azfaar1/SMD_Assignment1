import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import ProgressBar from '../components/ProgressBar';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import { colors, statusColor } from '../theme';
import { ATTENDANCE_THRESHOLD } from '../data/mockData';

export default function CourseDetailScreen({ course, onBack, onMark, onDelete }) {
  if (!course) {
    return (
      <View style={styles.content}>
        <ScreenHeader title="Course" onBack={onBack} />
        <EmptyState title="Course not found" message="It may have been removed." />
      </View>
    );
  }

  const color = statusColor[course.status];
  const recommendation =
    course.held === 0
      ? 'No classes held yet.'
      : course.status === 'critical'
      ? `Attend the next ${course.needed} class${course.needed === 1 ? '' : 'es'} in a row to reach ${ATTENDANCE_THRESHOLD}%.`
      : `You can miss ${course.canMiss} more class${course.canMiss === 1 ? '' : 'es'} and still stay at ${ATTENDANCE_THRESHOLD}% or above.`;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <ScreenHeader title={course.name} subtitle={`${course.code} - ${course.creditHours} credit hours`} onBack={onBack} />

      <Card>
        <View style={styles.row}>
          <Text style={[styles.pct, { color }]}>{course.held === 0 ? '--' : `${course.pct.toFixed(1)}%`}</Text>
          <StatusBadge status={course.status} />
        </View>
        <ProgressBar percent={course.pct} color={color} />
        <Text style={styles.meta}>
          Attended {course.attended} of {course.held} classes
        </Text>
      </Card>

      <Card style={{ backgroundColor: color + '18', borderColor: color }}>
        <Text style={styles.recTitle}>What this means</Text>
        <Text style={styles.recText}>{recommendation}</Text>
      </Card>

      <Text style={styles.section}>Record today's class</Text>
      <View style={styles.row}>
        <AppButton title="Present" variant="success" onPress={() => onMark(course.id, true)} style={styles.half} />
        <AppButton title="Absent" variant="danger" onPress={() => onMark(course.id, false)} style={styles.half} />
      </View>

      <Text style={styles.section}>Recent classes</Text>
      {course.history.length === 0 ? (
        <EmptyState title="No history" message="Record a class above to start the log." />
      ) : (
        course.history.map((h, i) => (
          <View key={`${h.date}-${i}`} style={styles.logRow}>
            <Text style={styles.logDate}>{h.date}</Text>
            <Text style={[styles.logState, { color: h.present ? colors.safe : colors.critical }]}>
              {h.present ? 'Present' : 'Absent'}
            </Text>
          </View>
        ))
      )}

      <AppButton title="Remove course" variant="outline" onPress={() => onDelete(course.id)} style={styles.remove} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 40 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 10 },
  pct: { fontSize: 40, fontWeight: '800' },
  meta: { color: colors.muted, marginTop: 10 },
  recTitle: { fontWeight: '700', color: colors.text, marginBottom: 4 },
  recText: { color: colors.text, lineHeight: 20 },
  section: { fontWeight: '700', fontSize: 16, color: colors.text, marginTop: 8, marginBottom: 8 },
  half: { flex: 1 },
  logRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logDate: { color: colors.text },
  logState: { fontWeight: '700' },
  remove: { marginTop: 24 },
});
