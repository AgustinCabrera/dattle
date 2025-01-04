"use client"

import { ComponentProps } from "react"
import { TooltipProps } from "recharts"
import { 
  Bar, 
  Line,
  Area,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
  Rectangle,
} from "recharts"

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends ComponentProps<"div"> {
  config: ChartConfig
}

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <div
      className={className}
      style={
        {
          "--chart-1": "215 25% 27%",
          "--chart-2": "142 72% 29%",
          "--chart-3": "198 93% 60%",
          "--chart-4": "158 64% 52%",
          "--chart-5": "34 80% 60%",
          "--chart-6": "267 56% 76%",
          "--chart-7": "338 67% 76%",
          "--chart-8": "50 95% 76%",
          "--chart-9": "222 67% 76%",
          "--chart-10": "180 67% 76%",
          ...Object.fromEntries(
            Object.entries(config).map(([key, value]) => [
              `--color-${key}`,
              value.color,
            ])
          ),
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  )
}

interface ChartTooltipProps<T = any> extends TooltipProps<any, any> {
  config: ChartConfig
}

export function ChartTooltip<T>({
  active,
  payload,
  config,
}: ChartTooltipProps<T>) {
  if (!active || !payload) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        {payload.map((item: any, index: number) => {
          const configKey = Object.keys(config).find(
            (key) => key === item.dataKey
          )
          if (!configKey) return null

          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="rounded-full px-1"
                style={{
                  backgroundColor: item.color ?? config[configKey]?.color,
                }}
              />
              <span className="text-sm font-medium">
                {config[configKey]?.label}
              </span>
              <span className="text-sm text-muted-foreground">
                {item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ChartTooltipContent<T>({
  active,
  payload,
}: TooltipProps<any, any>) {
  if (!active || !payload) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="rounded-full px-1"
              style={{
                backgroundColor: item.color,
              }}
            />
            <span className="text-sm font-medium">{item.name}</span>
            <span className="text-sm text-muted-foreground">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export {
  Bar,
  Line,
  Area,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
  Rectangle,
}

