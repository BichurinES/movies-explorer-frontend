import './InfoTooltip.css';

export default function InfoTooltip(props) {
  const { isOpen, isSuccess, title } = props.infoTooltipData;
  const { updateInfoTooltip } = props;

  function closePopup() {
    updateInfoTooltip({ isOpen: false });
  }

  return (
    <div className={ `popup ${isOpen && 'popup_opened' }` }>
      <div className="popup__container">
        <div className={ `popup__status-icon ${ isSuccess ? '' : 'popup__status-icon_error' }` }></div>
        <h2 className="popup__title">{ title }</h2>
        <button 
          type="button" 
          name="close-button" 
          className="popup__close-button"
          onClick={ closePopup }>
        </button>
      </div>
    </div>
  );
}
