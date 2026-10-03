import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function EmptyState({ title, message }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', padding: 32 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 6 },
  message: { fontSize: 14, color: colors.muted, textAlign: 'center' },
});
