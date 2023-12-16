'use client';

import React from 'react';

import {
	Line,
	LineChart,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	TooltipProps,
	XAxis,
	YAxis,
} from 'recharts';

type Sentiment = {
	subject: string;
	sentimentScore: number;
	createdAt: Date;
	color: string;
};

type SentimentChartProps = {
	data: Sentiment[];
};

const SentimentChart = ({ data }: SentimentChartProps) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart width={300} height={200} data={data}>
				<Line
					type="monotone"
					dataKey="sentimentScore"
					stroke="#6366F1"
					strokeWidth={2}
					activeDot={{ r: 8 }}
				/>
				<YAxis dataKey="sentimentScore" label="Mood" hide />
				<XAxis dataKey="createdAt" label="Date" hide />
				<Tooltip content={CustomTooltip} />
				<ReferenceLine y={0} strokeDasharray="3 3" />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default SentimentChart;

const CustomTooltip = ({ payload, active }: TooltipProps<any, any>) => {
	if (!active || !payload) {
		return null;
	}

	const sentiment = payload[0].payload;
	const formattedDate = new Date(sentiment.createdAt).toLocaleString('en-us');

	return (
		<div
			className="p-4 bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative"
			style={{
				backgroundColor: sentiment.color,
			}}
		>
			<p className="capitalize text-white">{sentiment.subject}</p>
			<p className="text-sm text-white/50">{formattedDate}</p>
		</div>
	);
};
