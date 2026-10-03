import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function ScreenHeader({ title, subtitle, onBack }) {
  return (
    <View style={styles.wrap}>
      {onBack && (
        <Pressable onPress={onBack} hitSlop={10} style={styles.back}>
          <Text style={styles.backText}>{'<  Back'}</Text>
        </Pressable>
      )}
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 16 },
  back: { alignSelf: 'flex-start', paddingVertical: 6, marginBottom: 4 },
  backText: { color: colors.primary, fontWeight: '700', fontSize: 15 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 14, color: colors.muted, marginTop: 2 },
});
