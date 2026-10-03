import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function StatTile({ label, value, color = colors.primary }) {
  return (
    <View style={styles.tile}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  value: { fontSize: 24, fontWeight: '800' },
  label: { fontSize: 12, color: colors.muted, marginTop: 2, textAlign: 'center' },
});
