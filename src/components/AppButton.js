import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

// variant: 'primary' | 'outline' | 'success' | 'danger'
export default function AppButton({ title, onPress, variant = 'primary', disabled, style }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, variant === 'outline' && styles.outlineText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center' },
  primary: { backgroundColor: colors.primary },
  success: { backgroundColor: colors.safe },
  danger: { backgroundColor: colors.critical },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.4 },
  text: { color: '#fff', fontWeight: '700', fontSize: 15 },
  outlineText: { color: colors.primary },
});
