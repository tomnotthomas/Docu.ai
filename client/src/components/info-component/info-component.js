import './info-component.css'
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";

function Info ({detailedInfo}) {

  console.log(detailedInfo)

return (
  <div id='box-container-info' >
      <div className='box-container-info-item green-info-item'>
        <h3 className='white'>Rechnung</h3>
        <div className='centered-row white'>
          <FaRegCheckCircle className='box-container-info-item-icon' />
          <p className='white'>
            Dokument vorhanden: {detailedInfo[0].Rechnung.gefunden}
          </p>
         
        </div>
        <div className='centered-row white'>
          <FaRegCheckCircle className='box-container-info-item-icon' />
          <p className='white'>
            Betrag: {detailedInfo[0].Rechnung.betrag}
          </p>
         
        </div>
        
        <div className='centered-row white'>
          <FaRegCheckCircle className='box-container-info-item-icon' />
          
        <p className='white'>
          Auftragsnummer: {detailedInfo[0].Rechnung.auftragsNummer}
         </p>
        </div>
        




        
      </div>
      <div className='box-container-info-item green-info-item'>
      <h3 className='white'>Transportauftrag</h3>
      <div className='centered-row white'>
          <FaRegCheckCircle className='box-container-info-item-icon' />
          <p className='white'>
            Dokument vorhanden: {detailedInfo[1].Auftrag.gefunden}
          </p>
         
        </div>
      <div className='centered-row white'>
          <FaRegCheckCircle className='box-container-info-item-icon' />
          <p className='white'>
            Gefundener Betrag: {detailedInfo[1].Auftrag.betragIstGleich}
          </p>
         
        </div>
      


      </div>
      <div className='box-container-info-item red-info-item'>
        <h3 className='white'>Abliefernachweis</h3>
        <div className='centered-row white'>
          <FaRegCheckCircle className='box-container-info-item-icon' />
          <p className='white'>
            Dokument vorhanden: {detailedInfo[2].POD.gefunden}
          </p>
         
        </div>
        <div className='centered-row white'>
          <FaRegCheckCircle className='box-container-info-item-icon' />
          <p className='white'>
            Unterschrift: {detailedInfo[2].POD.Unterschrift}
          </p>
         
        </div>
      </div>
  </div>
)

}

export default Info



