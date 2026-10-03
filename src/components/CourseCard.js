import { View, Text, Pressable, StyleSheet } from 'react-native';
import Card from './Card';
import StatusBadge from './StatusBadge';
import ProgressBar from './ProgressBar';
import { colors, statusColor } from '../theme';

export default function CourseCard({ course, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.8 }}>
      <Card>
        <View style={styles.row}>
          <View style={styles.titleWrap}>
            <Text style={styles.code}>{course.code}</Text>
            <Text style={styles.name}>{course.name}</Text>
          </View>
          <Text style={[styles.pct, { color: statusColor[course.status] }]}>
            {course.held === 0 ? '--' : `${course.pct.toFixed(0)}%`}
          </Text>
        </View>
        <ProgressBar percent={course.pct} color={statusColor[course.status]} />
        <View style={[styles.row, styles.footer]}>
          <Text style={styles.meta}>
            {course.attended}/{course.held} classes
          </Text>
          <StatusBadge status={course.status} />
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleWrap: { flex: 1, paddingRight: 8, marginBottom: 10 },
  code: { fontSize: 12, fontWeight: '700', color: colors.primary },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  pct: { fontSize: 24, fontWeight: '800', marginBottom: 10 },
  footer: { marginTop: 10 },
  meta: { color: colors.muted, fontSize: 13 },
});
