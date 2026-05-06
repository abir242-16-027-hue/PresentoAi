"use client";
import React, { useState, useRef } from "react";
import {
	RadialBarChart,
	RadialBar,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from "recharts";

export default function Home() {
	const [videoPreview, setVideoPreview] = useState(null);
	const [slideFile, setSlideFile] = useState(null);
	const [showFeedback, setShowFeedback] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isDraggingVideo, setIsDraggingVideo] = useState(false);
	const [isDraggingSlide, setIsDraggingSlide] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true); // New Toggle State

	const videoRef = useRef(null);

	const scoreData = [{ name: "Score", value: 75, fill: "#3b82f6" }];
	const mistakeData = [
		{ name: "Eye Contact", count: 12, fill: "#ef4444" },
		{ name: "Filler Words", count: 18, fill: "#3b82f6" },
		{ name: "Gestures", count: 8, fill: "#10b981" },
		{ name: "Pacing", count: 5, fill: "#f59e0b" },
	];

	const handleVideoDrop = (e) => {
		e.preventDefault();
		setIsDraggingVideo(false);
		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith("video/")) {
			setVideoPreview(URL.createObjectURL(file));
		}
	};

	const handleSlideDrop = (e) => {
		e.preventDefault();
		setIsDraggingSlide(false);
		const file = e.dataTransfer.files[0];
		if (
			file &&
			(file.name.endsWith(".pdf") || file.name.endsWith(".pptx"))
		) {
			setSlideFile(file);
		}
	};

	const handleVideoUpload = (e) => {
		const file = e.target.files[0];
		if (file) setVideoPreview(URL.createObjectURL(file));
	};

	const handleSlideUpload = (e) => {
		const file = e.target.files[0];
		if (file) setSlideFile(file);
	};

	const handleStartAnalysis = () => {
		if (!videoPreview) {
			alert("Please upload a video first!");
			return;
		}
		setIsLoading(true);
		setShowFeedback(false);
		setTimeout(() => {
			setIsLoading(false);
			setShowFeedback(true);
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: "smooth",
			});
		}, 3000);
	};

	return (
		<div className="min-h-screen bg-gray-950 text-white flex overflow-hidden">
			{/* Sidebar Navigation with Slide Animation */}
			<aside
				className={`bg-gray-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col sticky top-0 h-screen shrink-0 transition-all duration-300 ease-in-out ${
					isSidebarOpen
						? "w-64 translate-x-0 opacity-100"
						: "w-0 -translate-x-full opacity-0 overflow-hidden"
				}`}
			>
				<div className="p-8 flex items-center justify-between">
					<h2 className="text-2xl font-black italic bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent tracking-tighter">
						PresentoAi
					</h2>
				</div>

				<nav className="flex-1 px-4 space-y-2">
					{[
						{ name: "Dashboard", icon: "📊", active: true },
						{ name: "History", icon: "🕒", active: false },
						{ name: "Analytics", icon: "📈", active: false },
						{ name: "Settings", icon: "⚙️", active: false },
					].map((item) => (
						<button
							key={item.name}
							className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
								item.active
									? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
									: "text-gray-500 hover:text-gray-300 hover:bg-white/5"
							}`}
						>
							<span className="text-lg">{item.icon}</span>
							{item.name}
						</button>
					))}
				</nav>

				<div className="p-4 border-t border-white/5">
					<div className="flex items-center gap-3 p-2 bg-black/20 rounded-xl">
						<div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center font-bold text-xs shrink-0">
							NAF
						</div>
						<div className="flex-1 overflow-hidden">
							<p className="text-[10px] font-bold truncate">
								Team Innovex
							</p>
							<p className="text-[9px] text-gray-500">
								CIS Student
							</p>
						</div>
					</div>
				</div>
			</aside>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col h-screen overflow-y-auto scroll-smooth">
				{/* Toggle Button for Sidebar */}
				<div className="p-4 sticky top-0 z-50 flex items-center bg-gray-950/80 backdrop-blur-md border-b border-white/5">
					<button
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className="p-2 bg-gray-900 rounded-lg border border-white/10 hover:bg-gray-800 transition-all text-blue-400 text-xl"
					>
						{isSidebarOpen ? "⇠" : "☰"}
					</button>
					{!isSidebarOpen && (
						<h1 className="ml-4 text-xl font-black italic bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
							PresentoAi
						</h1>
					)}
				</div>

				<div className="max-w-5xl mx-auto w-full p-4">
					<main className="min-h-[90vh] flex flex-col">
						{/* Analysis Preview Section */}
						<section className="bg-gray-900/50 p-1 rounded-2xl border border-blue-500/20 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] flex flex-col flex-1 min-h-[400px] mb-6 transition-all">
							<div className="flex-1 bg-black/40 backdrop-blur-sm rounded-xl relative flex items-center justify-center overflow-hidden border border-white/5">
								{videoPreview ? (
									<video
										src={videoPreview}
										controls
										className="max-h-full w-auto object-contain"
									/>
								) : (
									<div className="text-center p-2">
										<div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20 text-2xl text-blue-400">
											📽️
										</div>
										<p className="text-gray-400 text-sm font-medium">
											Ready for Analysis
										</p>
									</div>
								)}
							</div>
						</section>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
							{/* 01 Source Video */}
							<div
								onDragOver={(e) => {
									e.preventDefault();
									setIsDraggingVideo(true);
								}}
								onDragLeave={() => setIsDraggingVideo(false)}
								onDrop={handleVideoDrop}
								className={`group bg-gray-900/40 p-5 rounded-2xl border-2 border-dashed transition-all ${isDraggingVideo ? "border-blue-500 bg-blue-500/10 scale-[1.01]" : "border-white/5 hover:border-blue-500/30"}`}
							>
								<h3 className="text-sm font-bold mb-3 flex items-center gap-3 text-blue-400 uppercase tracking-wider">
									<span className="bg-blue-600 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] text-white">
										01
									</span>
									Source Video
								</h3>
								<div className="relative border border-white/5 rounded-xl p-4 bg-black/20 text-center">
									<input
										type="file"
										accept="video/*"
										onChange={handleVideoUpload}
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
									/>
									<p className="text-xs text-gray-500 font-medium italic">
										Drag & drop or{" "}
										<span className="text-blue-400 underline">
											browse
										</span>
									</p>
								</div>
							</div>

							{/* 02 Reference Slides */}
							<div
								onDragOver={(e) => {
									e.preventDefault();
									setIsDraggingSlide(true);
								}}
								onDragLeave={() => setIsDraggingSlide(false)}
								onDrop={handleSlideDrop}
								className={`group bg-gray-900/40 p-5 rounded-2xl border-2 border-dashed transition-all ${isDraggingSlide ? "border-emerald-500 bg-emerald-500/10 scale-[1.01]" : "border-white/5 hover:border-emerald-500/30"}`}
							>
								<h3 className="text-sm font-bold mb-3 flex items-center gap-3 text-emerald-400 uppercase tracking-wider">
									<span className="bg-emerald-600 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] text-white">
										02
									</span>
									Reference Slides
								</h3>
								<div className="relative border border-white/5 rounded-xl p-4 bg-black/20 text-center">
									<input
										type="file"
										accept=".pdf,.pptx"
										onChange={handleSlideUpload}
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
									/>
									<p className="text-xs text-gray-500 font-medium italic truncate">
										{slideFile
											? slideFile.name
											: "Drag & drop or browse"}
									</p>
								</div>
							</div>
						</div>

						<div className="text-center py-6 shrink-0">
							<button
								onClick={handleStartAnalysis}
								disabled={isLoading}
								className={`group relative px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 
                  ${isLoading ? "bg-gray-800 cursor-not-allowed opacity-80" : "bg-blue-600 hover:bg-blue-500 shadow-blue-600/40"}`}
							>
								{isLoading ? (
									<div className="flex items-center gap-3">
										<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
										<span>Processing...</span>
									</div>
								) : (
									<>
										<span className="relative z-10">
											Start Analysis
										</span>
										<div className="absolute inset-0 rounded-2xl bg-blue-400 blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
									</>
								)}
							</button>
						</div>
					</main>

					{showFeedback && (
						<div className="mt-16 space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
							<div className="flex items-center gap-4 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
								<span className="text-emerald-400 text-xl font-bold italic">
									✓ Analysis Complete!
								</span>
								<div className="h-[1px] flex-1 bg-emerald-500/20"></div>
							</div>

							{/* Interactive Charts Section */}
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
								<div className="lg:col-span-1 bg-gray-900/60 p-6 rounded-[2rem] border border-white/5 flex flex-col items-center">
									<h3 className="text-lg font-bold text-gray-300 mb-2">
										Overall Score
									</h3>
									<div className="h-64 w-full relative">
										<ResponsiveContainer
											width="100%"
											height="100%"
										>
											<RadialBarChart
												cx="50%"
												cy="50%"
												innerRadius="70%"
												outerRadius="100%"
												barSize={20}
												data={scoreData}
												startAngle={90}
												endAngle={90 + 360 * 0.75}
											>
												<RadialBar
													minAngle={15}
													background
													dataKey="value"
													cornerRadius={10}
												/>
											</RadialBarChart>
										</ResponsiveContainer>
										<div className="absolute inset-0 flex items-center justify-center flex-col">
											<span className="text-4xl font-black text-blue-400">
												75%
											</span>
										</div>
									</div>
								</div>

								<div className="lg:col-span-2 bg-gray-900/60 p-6 rounded-[2rem] border border-white/5">
									<h3 className="text-lg font-bold text-gray-300 mb-6">
										Mistake Analysis
									</h3>
									<div className="h-64 w-full">
										<ResponsiveContainer
											width="100%"
											height="100%"
										>
											<BarChart
												data={mistakeData}
												margin={{
													top: 20,
													right: 30,
													left: 0,
													bottom: 0,
												}}
											>
												<CartesianGrid
													strokeDasharray="3 3"
													stroke="#374151"
													vertical={false}
												/>
												<XAxis
													dataKey="name"
													axisLine={false}
													tickLine={false}
													tick={{
														fill: "#9ca3af",
														fontSize: 12,
													}}
													dy={10}
												/>
												<YAxis hide />
												<Tooltip
													cursor={{
														fill: "rgba(255,255,255,0.05)",
													}}
													contentStyle={{
														backgroundColor:
															"#111827",
														borderColor: "#374151",
														borderRadius: "12px",
													}}
													itemStyle={{
														color: "#fff",
													}}
												/>
												<Bar
													dataKey="count"
													radius={[10, 10, 10, 10]}
													barSize={40}
												>
													{mistakeData.map(
														(entry, index) => (
															<Cell
																key={`cell-${index}`}
																fill={
																	entry.fill
																}
															/>
														),
													)}
												</Bar>
											</BarChart>
										</ResponsiveContainer>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
								<div className="bg-gray-900/60 p-8 rounded-[2rem] border border-red-500/10 shadow-[0_0_40px_-15px_rgba(239,68,68,0.15)]">
									<h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
										👁️ Visual Metrics
									</h3>
									<ul className="space-y-4">
										{[
											"Inconsistent eye contact detected",
											"Limited hand gestures",
											"Posture adjustment required",
										].map((item, i) => (
											<li
												key={i}
												className="flex items-center gap-3 text-gray-400 text-sm italic"
											>
												<span className="w-1.5 h-1.5 rounded-full bg-red-500/50"></span>{" "}
												{item}
											</li>
										))}
									</ul>
								</div>

								<div className="bg-gray-900/60 p-8 rounded-[2rem] border border-blue-500/10 shadow-[0_0_40px_-15px_rgba(59,130,246,0.15)]">
									<h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
										🎙️ Vocal Metrics
									</h3>
									<ul className="space-y-4">
										{[
											"Filler words detected (um, ah)",
											"Pacing: Slightly fast",
											"Voice clarity: 85%",
										].map((item, i) => (
											<li
												key={i}
												className="flex items-center gap-3 text-gray-400 text-sm italic"
											>
												<span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span>{" "}
												{item}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
