import { InputGroup, Form } from 'react-bootstrap';

export const GetDate = ({title, selectedDate, setSelectedDate, fromDate}) => {

    const onChange = (e)=>{
        setSelectedDate(e.target.value);
    }

    const updatedDate = () => {
        if (fromDate) {
            const dateObj = new Date(fromDate);
            if (!isNaN(dateObj)) { 
                const nextDate = new Date(dateObj);
                nextDate.setDate(dateObj.getDate() + 1); 
                return nextDate.toISOString().split("T")[0];
            }
        }
        return "";
    }
  return (
    <InputGroup style={{height:'35px',width:'200px'}} >
        <InputGroup.Text style={{ backgroundColor: "#FFFFFF",width:'72px'}}>
            {title} :
        </InputGroup.Text>
        <Form.Control 
            className='ps-0'
            id="Fromdate" 
            type="date" 
            name="Fromdate" 
            style={{ fontSize: "small", borderLeft: "none",width:'128px'}} 
            value={selectedDate}
            onChange={onChange}
            min={ updatedDate() || ""}
        />
    </InputGroup>
  )
}
