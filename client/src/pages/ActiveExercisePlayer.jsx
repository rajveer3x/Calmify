import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, Volume2, ArrowLeft, VolumeX } from 'lucide-react';
import { useCalmify } from '../context/CalmifyContext';
import api from '../lib/api';

const ActiveExercisePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recommendedResources } = useCalmify();

  const [resource, setResource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchResource = async () => {
      try {
        setIsLoading(true);
        // Look in recommended first to avoid unnecessary fetch
        const found = recommendedResources?.find(r => r?.id === id || r?._id === id);
        if (found) {
          if (isMounted) setResource(found);
          return;
        }

        // Fetch resource single data
        const response = await api.get(`/resources/${id}`);
        
        // Correctly extract mapping payload or fallback
        const fetchedData = response?.data?.payload || response?.data;
        
        if (isMounted && fetchedData) {
          setResource(fetchedData);
        }
      } catch (error) {
        console.error('Failed to load resource data.', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchResource();
    
    return () => {
      isMounted = false;
    };
  }, [id, recommendedResources]);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  // Dynamic resource audio or fallback
  const audioUrl = resource?.mediaUrl || 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=ambient-piano-amp-strings-10711.mp3';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Clean up when unmounting
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      if (total) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleScrubberChange = (e) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current && duration) {
      const newTime = (value / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(value);
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.8);
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = 0.8;
    } else {
      setVolume(0);
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-full flex flex-col p-8 md:p-12 transition-colors duration-500">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary dark:text-[#bcecdf] font-medium hover:text-primary-dim dark:hover:text-white transition-colors w-fit mb-12"
      >
        <ArrowLeft size={20} />
        Back to Library
      </button>

      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-on-surface/60 dark:text-[#9caaa7] transition-colors py-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-xl font-light">Preparing your serene space...</p>
          </div>
        ) : !resource ? (
          <div className="text-center text-on-surface/60 dark:text-[#9caaa7] transition-colors py-20">
            <p className="text-2xl font-light mb-4">Resource Not Found</p>
            <p className="text-sm">The content you are looking for is unavailable.</p>
          </div>
        ) : resource.type === 'VIDEO' ? (
          <>
            <div className="text-center mb-10 w-full px-4">
              <span className="text-sm font-bold tracking-[0.2em] text-primary dark:text-[#bcecdf] uppercase mb-3 block transition-colors">
                {resource.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-light text-on-surface dark:text-[#e0e8e6] mb-2 truncate transition-colors">
                {resource?.title}
              </h1>
              <p className="text-on-surface/60 dark:text-[#9caaa7] font-medium transition-colors">
                Focus & Relax
              </p>
            </div>
            <video src={resource?.mediaUrl} controls className="w-full max-w-2xl max-h-[60vh] object-contain mx-auto rounded-[2.5rem] shadow-[0_20px_40px_-5px_rgba(42,52,53,0.15)] dark:bg-[#1b2b28]" />
          </>
        ) : (
          <>
            {/* Soft abstract visualizer */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-primary-container to-serene-low shadow-[0_20px_60px_-15px_rgba(58,102,92,0.3)] dark:shadow-black/20 mb-12 flex items-center justify-center relative overflow-hidden group">
              <div className={`absolute inset-0 bg-primary/10 dark:bg-white/5 rounded-full transition-transform duration-1000 ease-out ${isPlaying ? 'scale-110' : 'scale-100'}`} />
              <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-b from-white/40 dark:from-white/10 to-transparent relative z-10 backdrop-blur-sm border border-white/50 dark:border-white/10 shadow-[inset_0_5px_15px_rgba(255,255,255,0.7)] dark:shadow-none" />
            </div>

            <div className="text-center mb-10 w-full px-4">
              <span className="text-sm font-bold tracking-[0.2em] text-primary dark:text-[#bcecdf] uppercase mb-3 block transition-colors">
                {resource.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-light text-on-surface dark:text-[#e0e8e6] mb-2 truncate transition-colors">
                {resource.title}
              </h1>
              <p className="text-on-surface/60 dark:text-[#9caaa7] font-medium transition-colors">
                Focus & Relax
              </p>
            </div>

            {/* Player Controls UI */}
            <div className="w-full bg-serene-lowest dark:bg-[#1b2b28] rounded-[2.5rem] p-8 shadow-[0_20px_40px_-5px_rgba(42,52,53,0.05)] dark:shadow-black/20 border border-outline-variant/10 dark:border-white/5 transition-colors duration-500">

              <audio
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />

              {/* Timeline Scrubber */}
              <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-on-surface/50 dark:text-[#9caaa7] mb-3 px-1 transition-colors">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>

                <div className="relative flex items-center h-4 cursor-pointer group">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleScrubberChange}
                    className="w-full absolute z-20 opacity-0 cursor-pointer h-full"
                  />
                  <div className="w-full h-1.5 bg-serene-lower dark:bg-[#121e1c] rounded-full relative z-10 overflow-hidden transition-colors">
                    <div
                      className="absolute top-0 left-0 h-full bg-primary dark:bg-[#8dbbab] transition-all shadow-[0_0_10px_rgba(58,102,92,0.5)] dark:shadow-[0_0_10px_rgba(188,236,223,0.5)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-1/3">
                  <button
                    onClick={toggleMute}
                    className="text-on-surface/50 dark:text-[#9caaa7] hover:text-primary dark:hover:text-[#e0e8e6] transition-colors h-10 w-10 flex items-center justify-center rounded-full hover:bg-serene-lower dark:hover:bg-[#121e1c]"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>

                  <div className="relative flex items-center w-20 h-4 cursor-pointer group hidden sm:flex">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full absolute z-20 opacity-0 cursor-pointer h-full"
                    />
                    <div className="w-full h-1 bg-serene-lower dark:bg-[#121e1c] rounded-full relative z-10 overflow-hidden transition-colors">
                      <div
                        className="absolute top-0 left-0 h-full bg-primary dark:bg-[#8dbbab] transition-all"
                        style={{ width: `${volume * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center w-1/3">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-dim transition-all hover:scale-105 shadow-[0_10px_20px_-5px_rgba(58,102,92,0.4)] active:scale-95"
                  >
                    {isPlaying ? <Pause size={28} className="fill-current" /> : <Play size={28} className="fill-current ml-1" />}
                  </button>
                </div>

                <div className="w-1/3">              </div>
              </div>
            </div>
          </>
        )}
          </div>
      </div>
      );
};

      export default ActiveExercisePlayer;
