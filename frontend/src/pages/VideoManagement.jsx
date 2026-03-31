import { useState, useEffect } from 'react';
import api from '../context/api';
import { FiPlus, FiEye, FiEyeOff, FiTrash2 } from 'react-icons/fi';

const CLOUDINARY_UPLOAD_PRESET = 'stream'; // Replace with your preset
const CLOUDINARY_CLOUD_NAME = 'du6zpscb8'; // Replace with your Cloudinary name

const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

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

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  // Fetch videos
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

  // Toggle visibility
  const handleToggleVisibility = async (videoId) => {
    try {
      await api.patch(`/videos/${videoId}/visibility`);
      fetchVideos();
    } catch (err) {
      alert('Operation failed');
    }
  };

  // Delete video
  const handleDelete = async (videoId) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      await api.delete(`/videos/${videoId}`);
      fetchVideos();
    } catch (err) {
      alert('Delete failed');
    }
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setNewVideo(prev => ({ ...prev, [field]: value }));
  };

  // Upload to Cloudinary and create video
  const handleCreateVideo = async (e) => {
    e.preventDefault();
    if (!thumbnailFile || !videoFile) return alert("Select both thumbnail and video");

    setUploading(true);

    try {
      // Upload Thumbnail
      const thumbForm = new FormData();
      thumbForm.append('file', thumbnailFile);
      thumbForm.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const thumbRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: thumbForm
      });
      const thumbData = await thumbRes.json();

      // Upload Video
      const videoForm = new FormData();
      videoForm.append('file', videoFile);
      videoForm.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const videoRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`, {
        method: 'POST',
        body: videoForm
      });
      const videoData = await videoRes.json();

      // Save URLs in API
      const videoToCreate = {
        ...newVideo,
        thumbnailUrl: thumbData.secure_url,
        videoUrl: videoData.secure_url
      };

      await api.post('/videos', videoToCreate);

      // Reset modal and form
      setShowModal(false);
      setNewVideo({ title: '', description: '', genre: 'Action', category: 'Action', releaseYear: 2024, duration: '', thumbnailUrl: '', videoUrl: '' });
      setThumbnailFile(null);
      setVideoFile(null);

      fetchVideos();
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Video Management</h1>
        <button onClick={() => setShowModal(true)} className="admin-header-btn">
          <FiPlus /> Upload New Video
        </button>
      </div>

      {/* Upload Modal */}
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
                <textarea required className="admin-modal-input" rows="3" placeholder="Enter description"
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
                  <input type="number" className="admin-modal-input" placeholder="2024"
                    value={newVideo.releaseYear} onChange={e => handleChange('releaseYear', parseInt(e.target.value))} />
                </div>
              </div>

              <div className="admin-modal-field">
                <label className="admin-modal-label">Duration</label>
                <input className="admin-modal-input" placeholder="e.g. 2h 30min"
                  value={newVideo.duration} onChange={e => handleChange('duration', e.target.value)} />
              </div>

              {/* File Uploads */}
              <div className="admin-modal-field">
                <label className="admin-modal-label">Thumbnail *</label>
                <input type="file" accept="image/*" onChange={e => setThumbnailFile(e.target.files[0])} required />
              </div>

              <div className="admin-modal-field">
                <label className="admin-modal-label">Video *</label>
                <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} required />
              </div>

              <div className="admin-modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="admin-modal-btn secondary">Cancel</button>
                <button type="submit" className="admin-modal-btn primary" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Table */}
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
                  ) : (<div className="admin-video-thumb">VID</div>)}
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