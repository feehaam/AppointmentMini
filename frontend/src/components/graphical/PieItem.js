export default function PieItem({key, entry, bgcolor, color}){
    return (<>
        <p style={{
            color: color, 
            backgroundColor: bgcolor, 
            padding: '2px', 
            paddingLeft:'4px', 
            paddingRight:'4px', 
            margin: '1px', 
            borderRadius: '3px', 
            border: '1px solid '+color
            }}>{entry.name}: {entry.value}</p>
    </>)
}