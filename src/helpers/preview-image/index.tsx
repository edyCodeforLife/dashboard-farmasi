import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import previewImage from '../../services/redux/preview-image/action-creator';

const ServicePreviewImage = () => {
  const dispatch = useDispatch();
  const Executor = bindActionCreators(previewImage, dispatch);

  const HandlerPreviewImage = (image: string) => {
    Executor({
      image,
      reset: false,
    });
  };

  const ResetPreviewImage = () => { Executor({ reset: true }); };

  return {
    ResetPreviewImage,
    HandlerPreviewImage,
  };
};

export default ServicePreviewImage;
