import { useEffect, useRef } from 'react';
import type { VirtanceDiskMetrics } from '../types';
import { IChartApi, ISeriesApi, createChart } from 'lightweight-charts';
import { UTCTimestamp } from 'lightweight-charts';
import { CrosshairMode } from 'lightweight-charts';
import { usePrefersColorScheme } from '@/shared/hooks';
import { theme } from '@/shared/ui/chart';

export function VirtanceDiskGraph({ metrics }: { metrics: VirtanceDiskMetrics }) {
  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi>();
  const sysSeries = useRef<ISeriesApi<'Area'>>();
  const userSeries = useRef<ISeriesApi<'Area'>>();

  const preferredColorSchema = usePrefersColorScheme();

  useEffect(() => {
    if (chart.current) {
      if (preferredColorSchema === 'dark') {
        chart.current.applyOptions(theme.dark);
      } else {
        chart.current.applyOptions(theme.light);
      }
    }
  }, [preferredColorSchema, chart.current]);

  useEffect(() => {
    if (!chart.current && container.current) {
      chart.current = createChart(container.current, {
        autoSize: true,
        height: 400,
        layout: {
          fontFamily: "'Outfit', sans-serif",
        },
        timeScale: {
          timeVisible: true,
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        grid: {
          vertLines: {
            visible: false,
          },
        },
        localization: {
          priceFormatter: (value: number) => `${value.toFixed(2)}${metrics.unit}`,
        },
      });

      sysSeries.current = chart.current.addAreaSeries({
        topColor: 'rgba(0, 200, 255, 0.2)',
        bottomColor: 'rgba(0, 200, 255, 0.0)',
        lineColor: 'rgba(0, 200, 255, 1)',
        lineWidth: 2,
      });

      userSeries.current = chart.current.addAreaSeries({
        topColor: 'rgba(255, 0, 108, 0.2)',
        bottomColor: 'rgba(255, 0, 108, 0.0)',
        lineColor: 'rgba(255, 0, 108, 1)',
        lineWidth: 2,
      });

      if (preferredColorSchema === 'dark') {
        chart.current.applyOptions(theme.dark);
      } else {
        chart.current.applyOptions(theme.light);
      }
    }

    if (sysSeries.current && userSeries.current) {
      sysSeries.current.setData(
        metrics.data.read.map((d) => ({
          time: d[0] as UTCTimestamp,
          value: parseFloat(d[1]),
        })),
      );

      userSeries.current.setData(
        metrics.data.write.map((d) => ({
          time: d[0] as UTCTimestamp,
          value: parseFloat(d[1]),
        })),
      );
    }
  }, [metrics, container, chart]);

  return (
    <div
      className="overflow-hidden rounded-md border dark:border-neutral-700"
      ref={container}
    ></div>
  );
}
