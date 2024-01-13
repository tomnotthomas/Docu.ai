import './info-component.css'
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";

function Info () {
return (
  <div id='box-container-info' >
      <div className='box-container-info-item green-info-item'>
        <h3 className='white'>Rechnung</h3>
        <div className='centered-row white'>
          <FaRegCheckCircle className='box-container-info-item-icon' />
          <p className='white'>
            Rechnungsbetrag unter 2000Eur
          </p>
        </div>
      </div>
      <div className='box-container-info-item green-info-item'>
      <h3 className='white'>Transportauftrag</h3>
      <div className='centered-row white'>
          <FaRegCheckCircle className='box-container-info-item-icon' />
          <p className='white'>
            Frachtpreis stimmt mit Rechnung überein.
          </p>
        </div>
        <div className='centered-row white'>
          <FaRegCheckCircle className='box-container-info-item-icon' />
          <p className='white'>
            Firmierung stimmt mit Rechnung überein.
          </p>
        </div>
      </div>
      <div className='box-container-info-item red-info-item'>
        <h3 className='white'>Abliefernachweis</h3>
        <div className='centered-row white'>
          <IoMdAlert className='box-container-info-item-icon' />
          <p className='white'>
            Keine passende Auftrags- nummer gefunden.
          </p>
        </div>
      </div>
  </div>
)

}

export default Info



