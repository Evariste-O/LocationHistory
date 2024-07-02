import { RadioGroup ,Radio} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useData } from './DataProvider';

export default function DisplayTypePicker({}){
    const { setDisplayType } = useData();
    
    function onChange(value){
       setDisplayType(value)
    }

    const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;
    return(
        <RadioGroup onChange={onChange} name="radioList" inline appearance="picker" defaultValue="heatmap">
            <RadioLabel>Display: </RadioLabel>
            <Radio value="heatmap">Heatmap</Radio>
            <Radio value="points">Points</Radio>
        </RadioGroup>
    );
}
