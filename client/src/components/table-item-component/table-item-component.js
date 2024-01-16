import './table-item-component.css';
import { MdCheckBox } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import Info from '../info-component/info-component';

 function GreenOrRed({docType, info}){

  //Check invoice for correctness
  const parseCheck = function (docType, info){
    const objInfo = JSON.parse(info)
    return objInfo
      }
  
  const wholeObj = parseCheck(docType, info)
      console.log(wholeObj[docType])
  const pages = wholeObj[docType]


    let betrag = undefined;
    let transportAuftragsNummer =undefined;

    //I assume there is the betrag is only named once in one of the documents and
    //set the betrag and the transportAuftragsNummer then
  if(docType === 'Rechnung'){
    pages.forEach((page) => {
     const parsed= JSON.parse(page)
      console.log(parsed.invoice)
      const parsedInv = (parsed.invoice)
      const invDetails = JSON.parse(parsedInv)
      console.log(invDetails)
      betrag = invDetails.Betrag;
      console.log(betrag)
      transportAuftragsNummer = invDetails.TransportAuftragsNummer
      console.log(transportAuftragsNummer)
    })
  }

  if(docType === 'Rechnung' && betrag && transportAuftragsNummer) {
    return <MdCheckBox className='item-icon green'/>
  } else if(docType ==='Rechnung') {
    return <CgDanger className='item-icon red'/>
  }

    let unterschrift;
  if (docType === 'POD') {
    pages.forEach((page) => {
      const parsed=JSON.parse(page)
      console.log(parsed.pod)
      const parsedPod = (parsed.pod)
      const podDetails = JSON.parse(parsedPod);
      console.log(podDetails);
      unterschrift = podDetails.Unterschrift;
    })
  }


  if(docType === 'POD' && unterschrift) {
    return <MdCheckBox className='item-icon green'/>
  } else if(docType === 'POD') {
    return <CgDanger className='item-icon red'/>
  }

  let comparedBetrag = undefined;
  if (docType === 'Auftrag') {
    pages.forEach((page) => {
      const parsed=JSON.parse(page)
      console.log(parsed.order)
      const parsedOrder = (parsed.order)
      const orderDetails = JSON.parse(parsedOrder);
      console.log(orderDetails);
      if(comparedBetrag > orderDetails.Betrag){
        return
      } else {    comparedBetrag = orderDetails.Betrag;
      }
    })
  }


  if(docType === 'Auftrag' && comparedBetrag) {
    console.log(comparedBetrag)
    return <MdCheckBox className='item-icon green'/>
  } else if(docType === 'Auftrag') {
    return <CgDanger className='item-icon red'/>
  }
}

///getting the exact information of what is right and what is wrong for the info component
function allInfo (info){



  //This function takes a document type and includes the information 
  function exactInformationPerDocType({docType, info}){


    //Check invoice for correctness
    const parseCheck = function (docType, info){
      const objInfo = JSON.parse(info)
      return objInfo
        }
      
    const wholeObj = parseCheck(docType, info)
        console.log(wholeObj[docType])
    const pages = wholeObj[docType]
    if(pages.length < 1) {
      return {gefunden: "Nein", betrag:'nicht gefunden', auftragsNummer: 'nicht gefunden', Unterschrift: 'nicht gefunden', betragIstGleich: 'nicht gefunden'}
    }

      let betrag = 'Nicht gefunden';
      let transportAuftragsNummer ='Nicht gefunden';

      //I assume there is the betrag is only named once in one of the documents and
      //set the betrag and the transportAuftragsNummer then
    if(docType === 'Rechnung'){
      pages.forEach((page) => {
       const parsed= JSON.parse(page)
        console.log(parsed.invoice)
        const parsedInv = (parsed.invoice)
        const invDetails = JSON.parse(parsedInv)
        console.log(invDetails)
        betrag = invDetails.Betrag;
        console.log(betrag)
        if(invDetails.TransportAuftragsNummer){
        transportAuftragsNummer = invDetails.TransportAuftragsNummer
        console.log(transportAuftragsNummer)
        }
      })
      return {gefunden: 'ja', betrag: betrag, auftragsNummer: transportAuftragsNummer}
    }

      let unterschrift = ' Unterschrift nicht gefunden';
    if (docType === 'POD') {
      pages.forEach((page) => {
        const parsed=JSON.parse(page)
        console.log(parsed.pod)
        const parsedPod = (parsed.pod)
        const podDetails = JSON.parse(parsedPod);
        console.log(podDetails);
        unterschrift ="Unterschrift gefunden"
      })
      return {gefunden: 'ja', Unterschrift: unterschrift}

    }

    let comparedBetrag = 'Nicht gefunden';
    if (docType === 'Auftrag') {
      pages.forEach((page) => {
        const parsed=JSON.parse(page)
        console.log(parsed.order)
        const parsedOrder = (parsed.order)
        const orderDetails = JSON.parse(parsedOrder);
        console.log(orderDetails);
        if(comparedBetrag > orderDetails.Betrag){
          return
        } else {
           comparedBetrag = orderDetails.Betrag;
        }
      })
        return {gefunden: 'ja', betragIstGleich: comparedBetrag}
    }
  }

  const documents = info
  console.log({documents})

  let finalInformationForInfo = [
    { Rechnung: exactInformationPerDocType({ docType: 'Rechnung', info: documents }) },
    { Auftrag: exactInformationPerDocType({ docType: 'Auftrag', info: documents }) },
    { POD: exactInformationPerDocType({ docType: 'POD', info: documents }) }
  ];

  return finalInformationForInfo


}


export default function TableItem ({infos}){
  const data = JSON.parse(infos.documents)
  const infoForInfoComponent = allInfo(infos.documents)

  return (
    <div id='table-row' >
    <div id= 'table-row-item-icons'>
      <p id ='table-item-fixed-identifier'>{infos.workpackage}</p>
      <div id='table-item-icon-list'>
        <GreenOrRed 
          info ={infos.documents}
          docType = "Rechnung"
        />
        <GreenOrRed 
          info ={infos.documents}
          docType = "Auftrag"
        />
         <GreenOrRed 
          info ={infos.documents}
          docType = "POD"
        />
       
      </div>
    </div>
    <Info
      detailedInfo = {infoForInfoComponent} />
    </div>
  )
}
 