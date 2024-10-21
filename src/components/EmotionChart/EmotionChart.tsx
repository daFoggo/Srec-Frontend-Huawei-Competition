import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";

const virtualInterview = Array.from({ length: 10 }, (_, i) => ({
  second: i * 3,
  happy: Math.random() * 100,
  sad: Math.random() * 100,
  angry: Math.random() * 100,
  fearful: Math.random() * 100,
  disgusted: Math.random() * 100,
  surprised: Math.random() * 100,
  neutral: Math.random() * 100,
})).map((entry) => {
  const totalEmotions = Object.values(entry)
    .slice(1)
    .reduce((a, b) => a + b, 0);

  return Object.fromEntries(
    Object.entries(entry).map(([key, value]) => [
      key,
      key === "second"
        ? value
        : Math.min(Number(((value / totalEmotions) * 100).toFixed(2)), 100),
    ])
  );
});
const emotions = [
  { key: "happy", color: "#c4b5fd" },
  { key: "sad", color: "#a5b4fc" },
  { key: "angry", color: "#3b82f6" },
  { key: "fearful", color: "#60a5fa" },
  { key: "disgusted", color: "#93c5fd" },
  { key: "surprised", color: "#bfdbfe" },
  { key: "neutral", color: "#dbeafe" },
];

const EmotionChart = () => {
  const [visibleEmotions, setVisibleEmotions] = useState<
    Record<string, boolean>
  >(emotions.reduce((acc, emotion) => ({ ...acc, [emotion.key]: true }), {}));

  const toggleEmotion = (emotionKey: string) => {
    setVisibleEmotions((prev) => ({
      ...prev,
      [emotionKey]: !prev[emotionKey],
    }));
  };

  return (
    <Card className="h-auto shadow-sm">
      <CardHeader className="p-4">
        <div className="flex flex-col space-y-2">
          <CardTitle className="text-2xl">Virtual Interview</CardTitle>
          <CardDescription className="text-sm">
            Emotion analysis during the virtual interview
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            {emotions.map((emotion) => (
              <Badge
                key={emotion.key}
                className="cursor-pointer select-none"
                style={{
                  backgroundColor: visibleEmotions[emotion.key]
                    ? emotion.color
                    : "#e5e7eb",
                  color: visibleEmotions[emotion.key] ? "white" : "#6b7280",
                  opacity: visibleEmotions[emotion.key] ? 1 : 0.7,
                }}
                onClick={() => toggleEmotion(emotion.key)}
              >
                {emotion.key.charAt(0).toUpperCase() + emotion.key.slice(1)}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer
          config={Object.fromEntries(
            emotions.map((e) => [
              e.key,
              {
                label: e.key.charAt(0).toUpperCase() + e.key.slice(1),
                color: e.color,
              },
            ])
          )}
          className=" h-[200px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={virtualInterview}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="second"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}s`}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                tickCount={6}
                tickFormatter={(value) => `${Math.round(value)}%`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              {emotions.map((emotion) => (
                <defs key={`${emotion.key}-gradient`}>
                  <linearGradient
                    id={`color${emotion.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={emotion.color}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={emotion.color}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
              ))}
              {emotions.map(
                (emotion) =>
                  visibleEmotions[emotion.key] && (
                    <Area
                      key={emotion.key}
                      type="monotone"
                      dataKey={emotion.key}
                      stackId="1"
                      stroke={emotion.color}
                      fillOpacity={1}
                      fill={`url(#color${emotion.key})`}
                    />
                  )
              )}
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EmotionChart;
