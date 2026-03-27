import { useNavigate } from 'react-router-dom';
import Button from './Button';
import '../styles/FreeTrial.css';

const FreeTrial = () => {
  const navigate = useNavigate();

  return (
    <section className="free-trial-section">
      <div className="free-trial-banner">
        <div className="free-trial-content">
          <h2>Start your free trial today!</h2>
          <p>This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.</p>
        </div>
        <div className="free-trial-action">
          <Button variant="primary" onClick={() => navigate('/subscriptions')}>Start a Free Trial</Button>
        </div>
      </div>
    </section>
  );
};

export default FreeTrial;
