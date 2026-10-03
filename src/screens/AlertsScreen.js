import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { colors, statusColor } from '../theme';
import { buildAlerts } from '../utils/attendance';

export default function AlertsScreen({ courses, onBack, onOpenCourse }) {
  const alerts = buildAlerts(courses);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Alerts"
        subtitle={alerts.length ? `${alerts.length} course${alerts.length === 1 ? '' : 's'} need attention` : 'All good'}
        onBack={onBack}
      />
      {alerts.length === 0 ? (
        <EmptyState title="No alerts" message="Every course is comfortably above the attendance limit." />
      ) : (
        alerts.map((a) => (
          <Pressable key={a.id} onPress={() => onOpenCourse(a.id)}>
            <Card style={{ borderLeftWidth: 6, borderLeftColor: statusColor[a.status] }}>
              <View style={styles.row}>
                <Text style={styles.title}>{a.title}</Text>
                <StatusBadge status={a.status} />
              </View>
              <Text style={styles.message}>{a.message}</Text>
            </Card>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 40 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 6 },
  title: { flex: 1, fontWeight: '700', fontSize: 16, color: colors.text },
  message: { color: colors.text, lineHeight: 20 },
});
