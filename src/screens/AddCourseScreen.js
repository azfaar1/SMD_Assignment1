import { useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import FormField from '../components/FormField';
import AppButton from '../components/AppButton';
import { colors } from '../theme';
import { validateCourse } from '../utils/attendance';

const EMPTY = { code: '', name: '', creditHours: '', held: '', attended: '' };

export default function AddCourseScreen({ courses, onBack, onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (key) => (text) => {
    const next = { ...form, [key]: text };
    setForm(next);
    // Re-validate live once the user has tried to submit.
    if (submitted) setErrors(validateCourse(next, courses));
  };

  const handleSubmit = () => {
    const found = validateCourse(form, courses);
    setErrors(found);
    setSubmitted(true);
    if (Object.keys(found).length > 0) return;
    onAdd({
      id: `c${Date.now()}`,
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      creditHours: Number(form.creditHours),
      held: Number(form.held),
      attended: Number(form.attended),
      history: [],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <ScreenHeader title="Add Course" subtitle="Track a course that is not on your list yet." onBack={onBack} />

      <FormField
        label="Course code"
        value={form.code}
        onChangeText={setField('code')}
        error={errors.code}
        placeholder="e.g. CS3009"
        autoCapitalize="characters"
        autoCorrect={false}
        maxLength={7}
      />
      <FormField
        label="Course name"
        value={form.name}
        onChangeText={setField('name')}
        error={errors.name}
        placeholder="e.g. Software for Mobile Devices"
        autoCapitalize="words"
        maxLength={50}
      />
      <FormField
        label="Credit hours"
        value={form.creditHours}
        onChangeText={setField('creditHours')}
        error={errors.creditHours}
        placeholder="1 to 4"
        keyboardType="number-pad"
        maxLength={1}
      />
      <FormField
        label="Classes held so far"
        value={form.held}
        onChangeText={setField('held')}
        error={errors.held}
        placeholder="e.g. 20"
        keyboardType="number-pad"
        maxLength={3}
      />
      <FormField
        label="Classes attended"
        value={form.attended}
        onChangeText={setField('attended')}
        error={errors.attended}
        placeholder="e.g. 17"
        keyboardType="number-pad"
        maxLength={3}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />

      {submitted && Object.keys(errors).length > 0 && (
        <Text style={styles.summary}>Please fix the highlighted fields.</Text>
      )}
      <AppButton title="Add course" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 40 },
  summary: { color: colors.critical, marginBottom: 10, fontWeight: '600' },
});
