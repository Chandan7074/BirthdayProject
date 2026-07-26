import axios from 'axios';
import { useRef, useState } from 'react';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // List of Kannada Audio Tracks from public/audio/
  const kannadaSongs = [
    { id: '1', title: '🎵 Click Enjoy (Kannada Wish Track 1)', path: '/audio/kannada-song-1.mp3' },
    { id: '2', title: '🎉 Click to Listen(Sweet Memories Track 2)', path: '/audio/kannada-song-2.mp3' },
    { id: '3', title: '✨ Click to Listen (Special Celebration Track 3)', path: '/audio/kannada-song-3.mp3' },
  ];

  const [selectedSong, setSelectedSong] = useState(kannadaSongs[0]);
  const [guestName, setGuestName] = useState('');
  const [dream, setDream] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('❤️ Loved it!');

  const [isPlaying, setIsPlaying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const audioRef = useRef(null);

  // Switch Audio Track & Play
  const handleSongChange = (song) => {
    setSelectedSong(song);
    if (audioRef.current) {
      audioRef.current.src = song.path;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Toggle Play/Pause
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Generate Future Suggestion for User Dream
  const generateSuggestion = (userDream) => {
    if (!userDream.trim()) {
      setSuggestion("ಪ್ರತಿ ದಿನ ಸಣ್ಣ ಹೆಜ್ಜೆಗಳನ್ನಿಡಿ, ನಿಮ್ಮ ಗುರಿ ಖಂಡಿತ ತಲುಪುತ್ತೀರಿ! ✨");
      return;
    }
    setSuggestion(`"${userDream}" - ನಿಮ್ಮ ಈ ಕನಸನ್ನು ನನಸು ಮಾಡಲು ಶ್ರಮವಹಿಸಿ. ನಿಮ್ಮ ಭವಿಷ್ಯ ಉಜ್ವಲವಾಗಲಿ! 🚀`);
  };

  // Submit Feedback to Spring Boot Backend (Port 9093)
  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      await axios.post('https://birthday-backend-production-xxxx.up.railway.app/api/feedback', {
        guestName: guestName || 'Anonymous Friend',
        dream: dream || 'Not specified',
        feedback: feedback,
        rating: rating,
        selectedSong: selectedSong.title,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Could not connect to Spring Boot backend! Make sure it is running on port 9093.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.viewport}>
      {/* Background Audio Element */}
      <audio ref={audioRef} src={selectedSong.path} loop />

      {/* Floating Animated Balloons */}
      <div style={styles.balloonContainer}>
        {['🎈', '🎉', '✨', '🎂', '💖', '⭐', '🎈'].map((emoji, i) => (
          <span
            key={i}
            className="balloon"
            style={{
              left: `${(i + 1) * 12}%`,
              animationDelay: `${i * 1.2}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Main Glassmorphism Card */}
      <div style={styles.card}>
        {/* Top Header Controls */}
        <div style={styles.cardHeader}>
          <span style={styles.stepBadge}>Step {currentSlide + 1} of 5</span>
          <button onClick={toggleAudio} style={styles.musicBtn}>
            {isPlaying ? '⏸️ Music On' : '🎵 Play Music'}
          </button>
        </div>

        {/* SLIDE 1: Name Input & Audio Selection */}
        {currentSlide === 0 && (
          <div style={styles.slideBody}>
            <div style={styles.icon}>🎁</div>
            <h1 style={styles.title}>This Is For You!</h1>
            <p style={styles.subtitle}>Enter your name and choose your favorite Kannada background song!</p>

            <input
              type="text"
              placeholder="Enter your name..."
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Choose Background Song:</label>
            <div style={styles.songSelector}>
              {kannadaSongs.map((song) => (
                <button
                  key={song.id}
                  onClick={() => handleSongChange(song)}
                  style={{
                    ...styles.songChip,
                    backgroundColor: selectedSong.id === song.id ? '#e91e63' : '#f0f4f8',
                    color: selectedSong.id === song.id ? '#ffffff' : '#333',
                  }}
                >
                  {song.title}
                </button>
              ))}
            </div>

            <button
              disabled={!guestName.trim()}
              onClick={() => {
                if (!isPlaying && audioRef.current) {
                  audioRef.current.play();
                  setIsPlaying(true);
                }
                setCurrentSlide(1);
              }}
              style={!guestName.trim() ? styles.disabledBtn : styles.primaryBtn}
            >
              Open Birthday Gift ✨
            </button>
          </div>
        )}

        {/* SLIDE 2: Celebration & Color Banner */}
        {currentSlide === 1 && (
          <div style={styles.slideBody}>
            <div style={styles.icon}>🎉</div>
            <h1 style={styles.title}>Have A Wonderfull, Happy Healthy Birth Day to Youhhh!, {guestName}! 🎂❤️🎇✨</h1>
            <p style={styles.subtitle}>Wishing you a day filled with laughter, success, and beautiful memories!</p>

            <div style={styles.colorBanner}>
              🌟 Celebrating the incredible person you are! 🌟
            </div>

            <button onClick={() => setCurrentSlide(2)} style={styles.primaryBtn}>
              Share Your Dreams 🚀
            </button>
          </div>
        )}

        {/* SLIDE 3: Dreams & Advice */}
        {currentSlide === 2 && (
          <div style={styles.slideBody}>
            <div style={styles.icon}>🌠</div>
            <h1 style={styles.title}>Future Dreams & Goals</h1>
            <p style={styles.subtitle}>What is your biggest dream or goal for the upcoming year?</p>

            <input
              type="text"
              placeholder="e.g. Learn Full Stack, Buy a Car, Travel..."
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              style={styles.input}
            />

            <button onClick={() => generateSuggestion(dream)} style={styles.secondaryBtn}>
              Get Future Advice 🔮
            </button>

            {suggestion && (
              <div style={styles.suggestionBox}>
                <p style={styles.suggestionText}>{suggestion}</p>
              </div>
            )}

            <button onClick={() => setCurrentSlide(3)} style={{ ...styles.primaryBtn, marginTop: '20px' }}>
              Read Long Birthday Wish 💌
            </button>
          </div>
        )}

        {/* SLIDE 4: Long Kannada Wish */}
        {currentSlide === 3 && (
          <div style={styles.slideBody}>
            <div style={styles.icon}>📜</div>
            <h1 style={styles.title}>Special Wish For You</h1>

            <div style={styles.longWishBox}>
              <p style={styles.longWishText}>
                ಪ್ರಿಯ <strong>{guestName}</strong>,<br /><br />
                ನಿಮ್ಮ ಈ ವಿಶೇಷ ದಿನದಂದು ನಿಮಗೆ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು. ನಿಮ್ಮ ಪ್ರತಿಯೊಂದು ಕನಸುಗಳು ನನಸಾಗಲಿ, ನಿಮ್ಮ ಜೀವನದಲ್ಲಿ ಸಂತೋಷ, ಆರೋಗ್ಯ ಮತ್ತು ಯಶಸ್ಸು ಸದಾ ಇರಲಿ! ✨🎉
              </p>
            </div>

            <button onClick={() => setCurrentSlide(4)} style={styles.primaryBtn}>
              Leave Your Reaction 💬
            </button>
          </div>
        )}

        {/* SLIDE 5: Response Form (Saved to MySQL) */}
        {currentSlide === 4 && (
          <div style={styles.slideBody}>
            <div style={styles.icon}>💌</div>
            <h1 style={styles.title}>How Did This Feel?</h1>
            <p style={styles.subtitle}>Leave your message. It will be saved directly into the MySQL database!</p>

            {!submitted ? (
              <>
                <div style={styles.ratingRow}>
                  {['❤️ Loved it!', '😊 Very Happy', '🥳 Best Surprise'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRating(r)}
                      style={{
                        ...styles.chipBtn,
                        backgroundColor: rating === r ? '#e91e63' : '#f0f4f8',
                        color: rating === r ? '#ffffff' : '#333',
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <textarea
                  placeholder="Type your message or reaction here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  style={styles.textarea}
                  rows={4}
                />

                <button
                  disabled={!feedback.trim() || isSubmitting}
                  onClick={handleSubmitFeedback}
                  style={!feedback.trim() ? styles.disabledBtn : styles.primaryBtn}
                >
                  {isSubmitting ? 'Saving to Database...' : 'Submit Reaction 🚀'}
                </button>
              </>
            ) : (
              <div style={styles.thankYouBox}>
                <h2>ಧನ್ಯವಾದಗಳು, {guestName}! 🎉</h2>
                <p>Your feedback has been saved successfully in the database.</p>
                <button onClick={() => setCurrentSlide(0)} style={styles.secondaryBtn}>
                  Replay Presentation 🔄
                </button>
              </div>
            )}
          </div>
        )}

        {/* Navigation Link */}
        {currentSlide > 0 && currentSlide < 4 && (
          <button onClick={() => setCurrentSlide((prev) => prev - 1)} style={styles.backLink}>
            ⬅️ Back
          </button>
        )}
      </div>
    </div>
  );
}

// Inline Mobile-First Styles
const styles = {
  viewport: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
  },
  balloonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '28px',
    padding: '28px 24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 10,
    minHeight: '480px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  stepBadge: { fontSize: '12px', fontWeight: 'bold', color: '#888' },
  musicBtn: {
    backgroundColor: '#ffe0b2',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#e65100',
  },
  slideBody: {
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: '56px', marginBottom: '10px' },
  title: { fontSize: '24px', fontWeight: '800', color: '#2d3748', marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: '#718096', lineHeight: '1.5', marginBottom: '20px' },
  label: { fontSize: '13px', fontWeight: 'bold', color: '#555', marginBottom: '8px' },
  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '15px',
    marginBottom: '16px',
    outline: 'none',
    textAlign: 'center',
  },
  songSelector: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    marginBottom: '20px',
  },
  songChip: {
    padding: '10px 14px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '14px',
    marginBottom: '16px',
    outline: 'none',
    resize: 'none',
  },
  primaryBtn: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #e91e63 0%, #ff6090 100%)',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
  },
  disabledBtn: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#a0aec0',
    backgroundColor: '#cbd5e0',
    border: 'none',
    borderRadius: '50px',
    cursor: 'not-allowed',
  },
  secondaryBtn: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#3182ce',
    backgroundColor: '#ebf8ff',
    border: '1px solid #90cdf4',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  colorBanner: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    borderRadius: '16px',
    color: '#1a365d',
    fontWeight: 'bold',
    fontSize: '15px',
    marginBottom: '24px',
  },
  suggestionBox: {
    backgroundColor: '#f0fff4',
    borderLeft: '4px solid #48bb78',
    padding: '12px',
    borderRadius: '8px',
    marginTop: '12px',
  },
  suggestionText: { fontSize: '13px', color: '#22543d', lineHeight: '1.4' },
  longWishBox: {
    backgroundColor: '#fff5f5',
    borderLeft: '4px solid #feb2b2',
    padding: '16px',
    borderRadius: '12px',
    marginBottom: '20px',
    textAlign: 'left',
  },
  longWishText: { fontSize: '14px', color: '#742a2a', lineHeight: '1.6' },
  ratingRow: { display: 'flex', gap: '8px', marginBottom: '16px', justifyContent: 'center' },
  chipBtn: { border: 'none', padding: '8px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' },
  thankYouBox: { backgroundColor: '#e6fffa', padding: '20px', borderRadius: '16px', color: '#234e52' },
  backLink: { background: 'none', border: 'none', color: '#a0aec0', fontSize: '13px', marginTop: '12px', cursor: 'pointer' },
};

export default App;