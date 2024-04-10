export function Hamburger ({hamburger, setHamburger}) {
    return (
        <div className='flex flex-col justify-between h-4 w-5 relative cursor-pointer' onClick={() => setHamburger(!hamburger)}>
            <HamburgerLine animation={hamburger ? {transform:'rotate(45deg)', top:'7px'} : {transform:'rotate(0)', left:0, top:0}}/>
            <HamburgerLine animation={hamburger ? {width:0} : {width:'100%'}} duration={'400ms'} />
            <HamburgerLine animation={hamburger ? {transform:'rotate(-45deg)', top:'-7px'} : {transform:'rotate(0)', left:0, top:0}}/>
        </div>
    )
  }


function HamburgerLine ({animation}) {
    return(
    <span className={`bg-primary h-[2px] w-full relative transition-all`}
          style={animation}></span>
    )
}