import './info-component.css'
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";


function GoodOrBad ({detailedInfo, docType, children}) {

  

  //Check Rechnung for correctness
  if(
    docType === 'Rechnung' &&
    detailedInfo[0].Rechnung.gefunden === 'Ja' &&
    detailedInfo[0].Rechnung.betrag !== 'Nicht gefunden' &&
    detailedInfo[0].Rechnung.auftragsNummer !== 'Nicht gefunden'
    ) {
    return <div className='box-container-info-item green-info-item'>{children}</div>

    } else if (docType === 'Rechnung') {
      return <div className= 'box-container-info-item red-info-item'>{children}</div>
    }
  

  if(docType === 'Auftrag' &&
    detailedInfo[1].Auftrag.gefunden === 'Ja' &&
    detailedInfo[1].Auftrag.betragIstGleich
    ) {
      return <div className='box-container-info-item green-info-item'>{children}</div>
  
      } else if (docType === 'Auftrag') {
        return <div className= 'box-container-info-item red-info-item'>{children}</div>
      }
  

      if(docType === 'POD' &&
      detailedInfo[2].POD.gefunden === 'Ja' &&
      detailedInfo[2].POD.Unterschrift
      ) {
        return <div className='box-container-info-item green-info-item'>{children}</div>
    
        } else if (docType === 'POD') {
          return <div className= 'box-container-info-item red-info-item'>{children}</div>
        }
  
    }



function Info ({detailedInfo}) {

  console.log(detailedInfo)

  

return (    
    <div id='box-container-info' >
    <GoodOrBad  detailedInfo = {detailedInfo} docType={'Rechnung'}>
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
  
        </GoodOrBad>


    <GoodOrBad  detailedInfo = {detailedInfo} docType={'Auftrag'}>
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
  
      </GoodOrBad>

      <GoodOrBad  detailedInfo = {detailedInfo} docType={'POD'}>
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
  
      </GoodOrBad>
        
  </div>
)

}

export default Info



