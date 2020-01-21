import {RouteComponentProps} from 'react-router-dom';

export interface SignupProps {
  onSceneEnd?: () => void;
  onAnimationEnd?: () => void;
  className?: string;
}
