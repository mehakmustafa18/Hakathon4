import { useState, useEffect } from 'react';
import api from '../context/api';
import { FiPlus, FiEye, FiEyeOff, FiTrash2 } from 'react-icons/fi';

const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    genre: 'Action',
    category: 'Action',
    releaseYear: 2024,
    duration: '',
    thumbnailUrl: '',
    videoUrl: ''
  });

  const fetchVideos = async () => {
    try {
      const { data } = await api.get('/videos');
      setVideos(data);
    } catch (err) {
      console.error('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleToggleVisibility = async (videoId) => {
    try {
      await api.patch(`/videos/${videoId}/visibility`);
      fetchVideos();
    } catch (err) {
      alert('Operation failed');
    }
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      await api.delete(`/videos/${videoId}`);
      fetchVideos();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleCreateVideo = async (e) => {
    e.preventDefault();
    try {
      await api.post('/videos', newVideo);
      setShowModal(false);
      setNewVideo({ title: '', description: '', genre: 'Action', category: 'Action', releaseYear: 2024, duration: '', thumbnailUrl: '', videoUrl: '' });
      fetchVideos();
    } catch (err) {
      alert('Upload failed');
    }
  };

  const handleChange = (field, value) => {
    setNewVideo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Video Management</h1>
        <button onClick={() => setShowModal(true)} className="admin-header-btn">
          <FiPlus /> Upload New Video
        </button>
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '560px' }}>
            <h2 className="admin-modal-title">Upload New Video</h2>
            <form onSubmit={handleCreateVideo} className="admin-modal-form">
              <div className="admin-modal-field">
                <label className="admin-modal-label">Video Title *</label>
                <input required className="admin-modal-input" placeholder="Enter movie title"
                  value={newVideo.title} onChange={e => handleChange('title', e.target.value)} />
              </div>
              <div className="admin-modal-field">
                <label className="admin-modal-label">Description *</label>
                <textarea required className="admin-modal-input" rows="3" placeholder="Enter description" style={{ resize: 'vertical' }}
                  value={newVideo.description} onChange={e => handleChange('description', e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="admin-modal-field">
                  <label className="admin-modal-label">Genre *</label>
                  <select className="admin-modal-select" value={newVideo.genre} onChange={e => { handleChange('genre', e.target.value); handleChange('category', e.target.value); }}>
                    <option>Action</option>
                    <option>Comedy</option>
                    <option>Horror</option>
                    <option>Sci-Fi</option>
                    <option>Drama</option>
                    <option>Romance</option>
                    <option>Thriller</option>
                    <option>Documentary</option>
                  </select>
                </div>
                <div className="admin-modal-field">
                  <label className="admin-modal-label">Release Year</label>
                  <input type="number" className="admin-modal-input" placeholder="e.g. 2024"
                    value={newVideo.releaseYear} onChange={e => handleChange('releaseYear', parseInt(e.target.value))} />
                </div>
              </div>
              <div className="admin-modal-field">
                <label className="admin-modal-label">Duration</label>
                <input className="admin-modal-input" placeholder="e.g. 2h 30min"
                  value={newVideo.duration} onChange={e => handleChange('duration', e.target.value)} />
              </div>
              <div className="admin-modal-field">
                <label className="admin-modal-label">Thumbnail URL *</label>
                <input required className="admin-modal-input" placeholder="https://example.com/poster.jpg"
                  value={newVideo.thumbnailUrl} onChange={e => handleChange('thumbnailUrl', e.target.value)} />
              </div>
              <div className="admin-modal-field">
                <label className="admin-modal-label">Video URL *</label>
                <input required className="admin-modal-input" placeholder="https://example.com/video.mp4"
                  value={newVideo.videoUrl} onChange={e => handleChange('videoUrl', e.target.value)} />
              </div>
              <div className="admin-modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="admin-modal-btn secondary">Cancel</button>
                <button type="submit" className="admin-modal-btn primary">Upload Video</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((vid) => (
              <tr key={vid._id}>
                <td>
                  {vid.thumbnailUrl ? (
                    <img src={vid.thumbnailUrl} alt={vid.title} style={{ width: '48px', height: '48px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                  ) : (
                    <div className="admin-video-thumb">VID</div>
                  )}
                </td>
                <td style={{ fontWeight: 500 }}>{vid.title}</td>
                <td><span className="admin-video-category">{vid.genre || vid.category}</span></td>
                <td className="admin-table-text-muted">{vid.releaseYear || '—'}</td>
                <td>
                  <span className={`admin-status ${vid.isVisible ? 'visible' : 'hidden'}`}>
                    <span className="admin-status-dot"></span>
                    {vid.isVisible ? 'Visible' : 'Hidden'}
                  </span>
                </td>
                <td>
                  <div className="admin-actions-group">
                    <button onClick={() => handleToggleVisibility(vid._id)} className="admin-action-btn toggle-btn">
                      {vid.isVisible ? <FiEyeOff /> : <FiEye />} {vid.isVisible ? 'Hide' : 'Show'}
                    </button>
                    <button onClick={() => handleDelete(vid._id)} className="admin-action-btn delete-btn">
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {videos.length === 0 && !loading && (
              <tr><td colSpan="6" className="admin-table-empty">No videos found. Upload some content!</td></tr>
            )}
            {loading && (
              <tr><td colSpan="6" className="admin-table-empty">Fetching Videos...</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VideoManagement;
