import { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import CourseCard from '../components/CourseCard';
import FilterChips from '../components/FilterChips';
import EmptyState from '../components/EmptyState';
import { colors } from '../theme';
import { ATTENDANCE_THRESHOLD } from '../data/mockData';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'low', label: `Below ${ATTENDANCE_THRESHOLD}%` },
  { key: 'safe', label: 'Safe' },
];

const SORTS = [
  { key: 'lowest', label: 'Lowest first' },
  { key: 'highest', label: 'Highest first' },
  { key: 'name', label: 'A-Z' },
];

const sorters = {
  lowest: (a, b) => a.pct - b.pct,
  highest: (a, b) => b.pct - a.pct,
  name: (a, b) => a.name.localeCompare(b.name),
};

export default function CoursesScreen({ courses, onBack, onOpenCourse }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('lowest');

  const visible = courses
    .filter((c) => {
      const q = query.trim().toLowerCase();
      return c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
    })
    .filter((c) => {
      if (filter === 'low') return c.status === 'critical';
      if (filter === 'safe') return c.status === 'safe';
      return true;
    })
    .sort(sorters[sort]);

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <ScreenHeader
        title="My Courses"
        subtitle={`${visible.length} of ${courses.length} courses`}
        onBack={onBack}
      />

      <TextInput
        style={styles.search}
        value={query}
        onChangeText={setQuery}
        placeholder="Search by name or code"
        placeholderTextColor={colors.muted}
        clearButtonMode="while-editing"
        autoCorrect={false}
        returnKeyType="search"
      />

      <FilterChips options={FILTERS} selected={filter} onSelect={setFilter} />
      <Text style={styles.sortLabel}>Sort by</Text>
      <FilterChips options={SORTS} selected={sort} onSelect={setSort} />

      {visible.length === 0 ? (
        <EmptyState
          title={courses.length === 0 ? 'No courses yet' : 'No matching courses'}
          message={
            courses.length === 0
              ? 'Add a course from the dashboard to start tracking attendance.'
              : 'Try a different search or filter.'
          }
        />
      ) : (
        visible.map((c) => <CourseCard key={c.id} course={c} onPress={() => onOpenCourse(c.id)} />)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 40 },
  search: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    marginBottom: 12,
  },
  sortLabel: { fontSize: 12, fontWeight: '700', color: colors.muted, marginBottom: 6 },
});
