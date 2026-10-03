import { View, Text, StyleSheet } from 'react-native';
import { statusColor, statusLabel } from '../theme';

export default function StatusBadge({ status }) {
  return (
    <View style={[styles.badge, { backgroundColor: statusColor[status] + '22' }]}>
      <Text style={[styles.text, { color: statusColor[status] }]}>{statusLabel[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  text: { fontSize: 12, fontWeight: '700' },
});
