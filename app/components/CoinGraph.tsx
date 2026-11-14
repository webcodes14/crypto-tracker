"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatUsd } from "@/lib/coin-utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

interface CoinGraphProps {
    data: number[];
}

const compactUsdFormatter = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const CoinGraph = ({ data }: CoinGraphProps) => {
  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl bg-slate-50 px-5 text-center text-sm text-slate-500">
        Graf se nepodařilo načíst. Zkuste to prosím později.
      </div>
    );
  }

  const sampleStep = Math.max(1, Math.ceil(data.length / 28));
  const samples = data
    .map((price, index) => ({ price, index }))
    .filter(({ index }) => index % sampleStep === 0 || index === data.length - 1);
  const firstPrice = samples[0].price;
  const lastPrice = samples[samples.length - 1].price;
  const trendColor = lastPrice >= firstPrice ? "#15966a" : "#d4545e";
  const labels = samples.map(({ index }) => {
    const hoursAgo = Math.round(
      ((data.length - 1 - index) / Math.max(data.length - 1, 1)) * 168,
    );
    if (hoursAgo === 0) {
      return "Nyní";
    }

    return hoursAgo >= 24
      ? `Před ${Math.round(hoursAgo / 24)} d`
      : `Před ${hoursAgo} h`;
  });

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Cena v USD",
        data: samples.map(({ price }) => price),
        borderColor: trendColor,
        backgroundColor: "rgba(21, 150, 106, 0.1)",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.25,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "#f1f5f9",
        },
        ticks: {
          color: "#64748b",
          maxTicksLimit: 5,
          callback: (value) => compactUsdFormatter.format(Number(value)),
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b",
          maxTicksLimit: 6,
          maxRotation: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (context) => formatUsd(context.parsed.y),
        },
      },
    },
  };

  return (
    <div
      className="h-full w-full"
      role="img"
      aria-label={`Graf ceny za posledních sedm dní. Cena se změnila z ${formatUsd(firstPrice)} na ${formatUsd(lastPrice)}.`}
    >
      <Line options={options} data={chartData} />
    </div>
  );
};

export default CoinGraph;
