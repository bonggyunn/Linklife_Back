import React, {useState} from 'react'

const dataCollection = [
    {
        question: 'what makes blockcain trustworthy?',
        answer: 'Thera are three sides to this answer. Firstly, nobody but the owner of the data can access it without ~~'
    },
    {
        question: 'what makes blockcain trustworthy?',
        answer: 'Thera are three sides to this answer. Firstly, nobody but the owner of the data can access it without ~~'
    },
    {
        question: 'what makes blockcain trustworthy?',
        answer: 'Thera are three sides to this answer. Firstly, nobody but the owner of the data can access it without ~~'
    },
    {
        question: 'what makes blockcain trustworthy?',
        answer: 'Thera are three sides to this answer. Firstly, nobody but the owner of the data can access it without ~~'
    }
]

const Accordion = () => {
  
    const[accordion, setActiveAccordion] = useState(-1);

    function toggleAccordion(index) {
        if(index === accordion) {
            setActiveAccordion(-1);
            return;
        }    
        setActiveAccordion(index);
    }

    return (
    <>
      <div className='f-container'>
        <div className='f-accordion-faq'>
            {dataCollection.map((item, index) =>
                <div key={index} onClick={()=>toggleAccordion(index)}>
                    <div className='f-accordion-faq-heading'>
                        <h3 className={accordion === index ? "f-active" : ""}>
                            {item.question}
                        </h3>
                        <div>
                            {accordion === index ? (
                            <>
                                <span className='f-verticle'>-</span>
                            </> 
                            ) : ( 
                            <>
                                <span className='f-verticle'>+</span>
                            </> 
                            )}
                            
                        </div>
                    </div>
                    <div>
                        <p className={accordion === index ? "f-active" : "f-inactive"}>
                            {item.answer}
                        </p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </>
  )
}

export default Accordion
