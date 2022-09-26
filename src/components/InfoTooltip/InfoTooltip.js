import './InfoTooltip.css';
import error from "../../images/errortool.svg";
import successfully from "../../images/successfully.svg"
import closeIcon from "../../images/close-icon.svg";

function InfoTooltip(props) {
  
    return (
      <section className={`tooltip ${props.isOpen && "tooltip_opened"}`}>
        <div className="tooltip__container">
          <button type="button" className="tooltip__button-close" onClick={props.onClose}>
            <img className="tooltip__button-close-img" src={closeIcon} alt="Закрыть"/>
          </button>
          <img className="success" src={props.goodMessageTooltip ? successfully : error} alt="успешно"/>
          <p className="success-text">{props.message}</p> 
        </div>
        <div className="tooltip__overlay" onClick={props.onClose}/>
      </section>
    );
  }
  
  export default InfoTooltip;