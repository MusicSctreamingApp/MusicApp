import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/AudioPlayer.module.css";
import { BsFillSkipStartCircleFill, BsSkipEndCircleFill } from "react-icons/bs";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const AudioPlayer = ({ songsdata }) => {
  // state
  // const [songs, dispatch] = useSongsContext();
  const [songs, setSongs] = useState(songsdata);
  const [currentSong, setCurrentSong] = useState(songsdata[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  // references
  const audioPlayer = useRef(); // reference audio html component
  const progressBar = useRef(); // reference audio html tag progress bar
  const animationRef = useRef(); // reference progress bar animation
  const volumeBar = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [
    audioPlayer?.current?.loadedmetadata,
    audioPlayer?.current?.readyState,
    setCurrentSong,
    isPlaying,
    songs,
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
  //Keep +/- 30 sec?
  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  };

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  };

  const skipBack = async () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);
    setIsPlaying(false);
    if (index === 0) {
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
    const index = songs.findIndex((x) => x.title === currentSong.title);
    setIsPlaying(false);
    if (index === songs.length - 1) {
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
  //Sound controls
  const changeVolume = (e) => {
    audioPlayer.current.volume = e.target.value / 100;
  };

  const handleMute = () => {
    if (!isMuted) {
      setIsMuted(true);
      audioPlayer.current.muted = true;
    } else {
      setIsMuted(false);
      audioPlayer.current.muted = false;
    }
  };

  return (
    <>
      {songsdata && (
        <div className={styles.audioPlayer}>
          {/* song info, title, artist, image */}

          <div className={styles.songInfo}>
            <div className="cover"></div>
            <p className={styles.title}>{currentSong.title}</p>
          </div>
          {/* html audio component */}
          <audio
            onEnded={skiptoNext}
            ref={audioPlayer}
            src={currentSong.url}
            preload="metadata"
          ></audio>
          <div className="middle">
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
            <div className={styles.timeElements}>
              {/* current time */}
              <div className={styles.currentTime}>
                {calculateTime(currentTime)}
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
              {/* duration */}
              <div className={styles.duration}>
                {duration && !isNaN(duration) && calculateTime(duration)}
              </div>
            </div>
          </div>
          <div className={styles.volume}>
            <button className={styles.speaker} onClick={handleMute}>
              {!isMuted ? <BiVolumeFull /> : <BiVolumeMute />}
            </button>
            <input
              type="range"
              className={styles.volumeBar}
              defaultValue="100"
              ref={volumeBar}
              onChange={changeVolume}
            />
          </div>
        </div>
      )}
    </>
  );
};

export { AudioPlayer };
