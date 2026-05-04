"use client";
import React, { useState } from "react";

export default function Home() {
	const [videoPreview, setVideoPreview] = useState(null);
	const [slideFile, setSlideFile] = useState(null);
	const [showFeedback, setShowFeedback] = useState(false);

	const handleVideoUpload = (e) => {
		const file = e.target.files[0];
		if (file) setVideoPreview(URL.createObjectURL(file));
	};

	const handleSlideUpload = (e) => {
		const file = e.target.files[0];
		if (file) setSlideFile(file);
	};

	return (
		<div className="min-h-screen bg-gray-950 text-white flex flex-col p-4 scroll-smooth">
			<div className="h-[95vh] flex flex-col max-w-6xl mx-auto w-full">
				<header className="mb-6 text-center shrink-0">
					<h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent italic tracking-tighter">
						PresentoAi
					</h1>
					<p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
						Next-Gen Presentation Coach
					</p>
				</header>

				{/* Analysis Preview with Neon Glow */}
				<section className="bg-gray-900/50 p-1 rounded-2xl border border-blue-500/20 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] flex flex-col flex-1 min-h-0 mb-6 transition-all hover:shadow-[0_0_60px_-12px_rgba(59,130,246,0.5)]">
					<div className="flex-1 bg-black/40 backdrop-blur-sm rounded-xl relative flex items-center justify-center overflow-hidden border border-white/5">
						{videoPreview ? (
							<video
								src={videoPreview}
								controls
								className="max-h-full w-auto object-contain"
							/>
						) : (
							<div className="text-center p-2">
								<div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
									<span className="text-2xl">📽️</span>
								</div>
								<p className="text-gray-400 text-sm font-medium">
									Ready for Analysis
								</p>
								<p className="text-gray-600 text-xs mt-1">
									Select a video to get started
								</p>
							</div>
						)}
					</div>
				</section>

				{/* Upload Grid with Soft Glow */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
					<div className="group bg-gray-900/40 p-5 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-all hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
						<h3 className="text-sm font-bold mb-4 flex items-center gap-3 text-blue-400 uppercase tracking-wider">
							<span className="bg-blue-600 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] text-white shadow-lg shadow-blue-600/40">
								01
							</span>
							Source Video
						</h3>
						<input
							type="file"
							accept="video/*"
							onChange={handleVideoUpload}
							className="w-full text-xs text-gray-500 file:bg-blue-600 file:text-white file:rounded-xl file:px-4 file:py-2 file:border-0 file:font-bold cursor-pointer file:mr-4 hover:file:bg-blue-500 transition-all"
						/>
					</div>

					<div className="group bg-gray-900/40 p-5 rounded-2xl border border-white/5 hover:border-emerald-500/50 transition-all hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] relative">
						<h3 className="text-sm font-bold mb-4 flex items-center gap-3 text-emerald-400 uppercase tracking-wider">
							<span className="bg-emerald-600 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] text-white shadow-lg shadow-emerald-600/40">
								02
							</span>
							Reference Slides
						</h3>
						<input
							type="file"
							accept=".pdf,.pptx"
							onChange={handleSlideUpload}
							className="w-full text-xs text-gray-500 file:bg-emerald-600 file:text-white file:rounded-xl file:px-4 file:py-2 file:border-0 file:font-bold cursor-pointer file:mr-4 hover:file:bg-emerald-500 transition-all"
						/>
						{slideFile && (
							<div className="absolute top-5 right-5 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
								✓ ATTACHED
							</div>
						)}
					</div>
				</div>

				{/* Start Button with Pulsing Glow */}
				<div className="text-center py-6 shrink-0">
					<button
						onClick={() => setShowFeedback(true)}
						className="group relative bg-blue-600 hover:bg-blue-500 text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-[0_20px_40px_-15px_rgba(59,130,246,0.5)] active:scale-95"
					>
						<span className="relative z-10">Start Analysis</span>
						<div className="absolute inset-0 rounded-2xl bg-blue-400 blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
					</button>
				</div>
			</div>

			{/* Feedback Section with Glow Accents */}
			{showFeedback && (
				<div className="max-w-6xl mx-auto w-full mt-16 space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
					<div className="flex items-center gap-4">
						<h2 className="text-3xl font-black text-white italic">
							Detailed{" "}
							<span className="text-blue-500 font-normal">
								Report
							</span>
						</h2>
						<div className="h-[2px] flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-gray-900/60 p-8 rounded-[2rem] border border-red-500/10 shadow-[0_0_40px_-15px_rgba(239,68,68,0.15)] hover:border-red-500/30 transition-all">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500">
									👁️
								</div>
								<h3 className="text-xl font-bold text-red-400">
									Visual Metrics
								</h3>
							</div>
							<ul className="space-y-4">
								{[
									"Inconsistent eye contact detected",
									"Limited hand gestures",
									"Posture adjustment required",
								].map((item, i) => (
									<li
										key={i}
										className="flex items-center gap-3 text-gray-400 text-sm"
									>
										<span className="w-1.5 h-1.5 rounded-full bg-red-500/50"></span>{" "}
										{item}
									</li>
								))}
							</ul>
						</div>

						<div className="bg-gray-900/60 p-8 rounded-[2rem] border border-blue-500/10 shadow-[0_0_40px_-15px_rgba(59,130,246,0.15)] hover:border-blue-500/30 transition-all">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
									🎙️
								</div>
								<h3 className="text-xl font-bold text-blue-400">
									Vocal Metrics
								</h3>
							</div>
							<ul className="space-y-4">
								{[
									"Filler words detected (um, ah)",
									"Pacing: Slightly fast",
									"Voice clarity: 85%",
								].map((item, i) => (
									<li
										key={i}
										className="flex items-center gap-3 text-gray-400 text-sm"
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
	);
}
