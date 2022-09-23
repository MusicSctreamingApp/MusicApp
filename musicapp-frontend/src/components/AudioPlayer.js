import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/AudioPlayer.module.css";
import { BsFillSkipStartCircleFill, BsSkipEndCircleFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { songsdata } from "../audio";
const AudioPlayer = () => {
  // state
  const [songs, setSongs] = useState(songsdata);
  const [currentSong, setCurrentSong] = useState(songsdata[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef(); // reference audio html component
  const progressBar = useRef(); // reference audio html tag progress bar
  const animationRef = useRef(); // reference progress bar animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [
    audioPlayer?.current?.loadedmetadata,
    audioPlayer?.current?.readyState,
    setCurrentSong,
    isPlaying,
  ]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  };

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  };

  const skipBack = async () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    setIsPlaying(false);
    if (index == 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioPlayer.current.currentTime = 0;
    changePlayerCurrentTime();
    await audioPlayer.current.readyState;
    audioPlayer.current.play();
    setIsPlaying(true);
  };

  const skiptoNext = async () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    setIsPlaying(false);
    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioPlayer.current.currentTime = 0;
    changePlayerCurrentTime();
    await audioPlayer.current.readyState;
    audioPlayer.current.play();
    setIsPlaying(true);
  };

  const endedListener = () => {
    document.getElementById("audioPlayer");
    endedListener.addEventListener("ended", skiptoNext());
  };

  return (
    <div className={styles.audioPlayer}>
      {/* song info, title, artist, image */}
      <div className={styles.songInfo}>
        <p className={styles.title}>{currentSong.title}</p>
      </div>
      {/* html audio component */}
      <audio
        onEnded={skiptoNext}
        ref={audioPlayer}
        src={currentSong.url}
        preload="metadata"
      ></audio>

      <div className={styles.timeElements}>
        {/* current time */}
        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
        {/* duration */}
        <div className={styles.duration}>
          {duration && !isNaN(duration) && calculateTime(duration)}
        </div>
      </div>
      {/* progress bar */}
      <div className={styles.progressDiv}>
        <input
          type="range"
          className={styles.progressBar}
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
      </div>
      {/* buttons */}
      <div className={styles.controller}>
        <button className={styles.forwardBackward} onClick={skipBack}>
          <BsFillSkipStartCircleFill />
        </button>
        <button onClick={togglePlayPause} className={styles.playPause}>
          {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
        </button>
        <button className={styles.forwardBackward} onClick={skiptoNext}>
          <BsSkipEndCircleFill />
        </button>
      </div>
    </div>
  );
};

export { AudioPlayer };
