import './InfoTooltip.css';

export default function InfoTooltip(props) {
  const { isPopupOpened, closePopup } = props;
  const { isSuccess, title } = props.infoTooltipData;

  return (
    <div className={ `popup ${isPopupOpened && 'popup_opened' }` }>
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
