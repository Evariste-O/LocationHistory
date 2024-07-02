import { DateRangePicker} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useData } from './DataProvider';

export default function DatePicker({}){
    const { setFilteredLocations } = useData();

    function onDateSelected(date)
    {
        setFilteredLocations(date)
    }

    return(
        <DateRangePicker 
            style={{zIndex: 1000, width:300}} 
            onOk={onDateSelected} showMeridian  
            ranges={[]}  
            character=' - ' 
            format='yy.MM.dd hh:mm' 
            defaultCalendarValue={[new Date('2021-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
        />
    );
}
