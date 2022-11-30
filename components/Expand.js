function Expand({Data, Close}){
    return(
        <>
            <img 
            className="Expand hidden" 
            style={{top : Data.Top+"px", left : Data.Left+"px"}} 
            src={Data.Src || ""} 
            width={Data.Width || 0} 
            height={Data.Height || 0} />
            <div onClick={Close}  className="CloseExpand"></div>
        </>
    )
}

export default Expand;