import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";
import styles from "./AreaChartStat.module.scss";

export const AreaChartStat = ({
  chartData,
  loadsTotal,
}: {
  chartData: any[];
  loadsTotal: number;
}) => {
  return (
    <div className={styles.AreaChartStat}>
      <div className={styles.AreaChartStat__Header}>
        динамика загрузок (всего: {loadsTotal})
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="loadsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7F77DD" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#7F77DD" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} className={styles.AreaChartStat__Grid} />

          <XAxis
            dataKey="date"
            tick={{ className: styles.AreaChartStat__AxisTick }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={20}
          />

          <YAxis
            allowDecimals={false}
            tick={{ className: styles.AreaChartStat__AxisTick }}
            tickLine={false}
            axisLine={false}
            width={28}
          />

          <Tooltip
            cursor={{ stroke: "rgba(127, 119, 221, 0.3)", strokeWidth: 1 }}
            wrapperClassName={styles.AreaChartStat__TooltipWrapper}
            formatter={(value: ValueType | undefined) => [value ?? 0, "загрузок"]}
          />

          <Area
            type="monotone"
            dataKey="count"
            stroke="#7F77DD"
            strokeWidth={2}
            fill="url(#loadsGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#7F77DD", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
