"use client";
import React, { useState } from "react";

export default function Home() {
	const [videoPreview, setVideoPreview] = useState(null);
	const [slideFile, setSlideFile] = useState(null);

	const handleVideoUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			setVideoPreview(URL.createObjectURL(file));
		}
	};

	const handleSlideUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			setSlideFile(file);
		}
	};

	return (
		<div className="min-h-screen bg-gray-950 text-white p-8">
			<header className="mb-10 text-center">
				<h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic">
					PresentoAi
				</h1>
				<p className="text-gray-400 mt-2 text-lg">
					AI-Powered Presentation Analysis
				</p>
			</header>

			<main className="max-w-6xl mx-auto space-y-10">
				{/* Analysis Preview Section */}
				<section className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl overflow-hidden">
					<h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
						📽️ Analysis Preview
					</h2>
					<div className="aspect-video bg-black rounded-xl relative flex items-center justify-center border border-gray-800">
						{videoPreview ? (
							<video
								src={videoPreview}
								controls
								className="w-full h-full rounded-xl object-contain"
							/>
						) : (
							<div className="text-center">
								<p className="text-gray-600">
									No video selected for analysis
								</p>
								<p className="text-xs text-gray-500 mt-2">
									Upload a video below to see the preview
								</p>
							</div>
						)}
					</div>
				</section>

				{/* Upload Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Video Upload */}
					<div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl">
						<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
							<span className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">
								1
							</span>
							Select Video
						</h2>
						<input
							type="file"
							accept="video/*"
							onChange={handleVideoUpload}
							className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
						/>
					</div>

					{/* Slide Upload & Status */}
					<div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl">
						<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
							<span className="bg-emerald-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">
								2
							</span>
							Upload Slides
						</h2>
						<input
							type="file"
							accept=".pdf,.pptx"
							onChange={handleSlideUpload}
							className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
						/>

						{/* Status if file uploaded */}
						{slideFile && (
							<div className="mt-4 p-4 bg-gray-800/50 rounded-lg flex items-center gap-3 border border-emerald-500/30">
								<span className="text-2xl">📄</span>
								<div>
									<p className="text-sm font-medium text-emerald-400 truncate w-48">
										{slideFile.name}
									</p>
									<p className="text-xs text-gray-500">
										File uploaded successfully
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</main>

			<div className="mt-12 text-center pb-10">
				<button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-12 py-4 rounded-full font-bold text-xl transition-all shadow-lg active:scale-95">
					Start AI Analysis
				</button>
			</div>
		</div>
	);
}
