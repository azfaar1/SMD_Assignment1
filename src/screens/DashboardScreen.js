import { View, Text, ScrollView, useWindowDimensions, StyleSheet } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import Card from '../components/Card';
import StatTile from '../components/StatTile';
import AppButton from '../components/AppButton';
import { colors, statusColor, statusLabel } from '../theme';
import { ATTENDANCE_THRESHOLD, student, weeklyTrend, weekLabels } from '../data/mockData';
import { overallPercentage, countByStatus, getStatus } from '../utils/attendance';

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
  labelColor: () => colors.muted,
  propsForDots: { r: '4', strokeWidth: '2', stroke: colors.primary },
  barPercentage: 0.6,
};

export default function DashboardScreen({ courses, onNavigate }) {
  const { width } = useWindowDimensions();
  // Card has 16px padding on each side and the page has 16px gutters.
  const chartWidth = Math.min(width, 480) - 32 - 32;

  const overall = overallPercentage(courses);
  const counts = countByStatus(courses);
  const overallStatus = getStatus(overall, courses.length);
  const hasData = courses.length > 0;

  // Trend: stored history plus today's live overall value as the last point.
  const trend = [...weeklyTrend.slice(0, -1), Math.round(overall)];

  const pieData = Object.keys(counts)
    .filter((key) => counts[key] > 0)
    .map((key) => ({
      name: statusLabel[key],
      population: counts[key],
      color: statusColor[key],
      legendFontColor: colors.text,
      legendFontSize: 12,
    }));

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Hello, {student.name.split(' ')[0]}</Text>
      <Text style={styles.sub}>
        {student.program} - Semester {student.semester}
      </Text>

      <Card style={[styles.hero, { borderLeftColor: statusColor[overallStatus] }]}>
        <Text style={styles.heroLabel}>Overall attendance</Text>
        <Text style={[styles.heroValue, { color: statusColor[overallStatus] }]}>
          {hasData ? `${overall.toFixed(1)}%` : '--'}
        </Text>
        <Text style={styles.heroNote}>Required minimum: {ATTENDANCE_THRESHOLD}%</Text>
      </Card>

      <View style={styles.tiles}>
        <StatTile label="Safe" value={counts.safe} color={statusColor.safe} />
        <StatTile label="Borderline" value={counts.warning} color={statusColor.warning} />
        <StatTile label="Below limit" value={counts.critical} color={statusColor.critical} />
      </View>

      <View style={styles.actions}>
        <AppButton title="My Courses" onPress={() => onNavigate('courses')} style={styles.action} />
        <AppButton title="Alerts" variant="outline" onPress={() => onNavigate('alerts')} style={styles.action} />
      </View>
      <AppButton title="+ Add Course" variant="outline" onPress={() => onNavigate('addCourse')} style={styles.addBtn} />

      {hasData && (
        <>
          <Card>
            <Text style={styles.chartTitle}>Attendance by course (%)</Text>
            <BarChart
              width={chartWidth}
              height={200}
              fromZero
              yAxisSuffix="%"
              yAxisLabel=""
              chartConfig={chartConfig}
              withCustomBarColorFromData
              flatColor
              data={{
                labels: courses.map((c) => c.code),
                datasets: [
                  {
                    data: courses.map((c) => Math.round(c.pct)),
                    colors: courses.map((c) => () => statusColor[c.status]),
                  },
                ],
              }}
              style={styles.chart}
            />
          </Card>

          <Card>
            <Text style={styles.chartTitle}>Courses by status</Text>
            <PieChart
              data={pieData}
              width={chartWidth}
              height={150}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="0"
            />
          </Card>

          <Card>
            <Text style={styles.chartTitle}>Overall attendance trend (%)</Text>
            <LineChart
              width={chartWidth}
              height={180}
              chartConfig={chartConfig}
              bezier
              yAxisSuffix="%"
              data={{ labels: weekLabels, datasets: [{ data: trend }] }}
              style={styles.chart}
            />
          </Card>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 40 },
  greeting: { fontSize: 26, fontWeight: '800', color: colors.text },
  sub: { color: colors.muted, marginBottom: 16 },
  hero: { borderLeftWidth: 6 },
  heroLabel: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  heroValue: { fontSize: 42, fontWeight: '800' },
  heroNote: { color: colors.muted, fontSize: 13 },
  tiles: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  actions: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  action: { flex: 1 },
  addBtn: { marginBottom: 16 },
  chartTitle: { fontWeight: '700', color: colors.text, marginBottom: 8 },
  chart: { marginLeft: -8, borderRadius: 8 },
});
