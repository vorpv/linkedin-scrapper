___m1 = 100
___0 = ;
___1 = document.getElementsByClassName("_75228706 _8a3a6f88 _9d763823 c62a27b1 _3f96ff52 _0d2d5ee0 _92864457 _67866338 _6a309aaf _77cf1b78 _0781da1b _0f41423d _3b42afd3")[0];

___2 = Array.from(___1.childNodes).filter(cn => {
    if (["_1e443747", "f7f2db8f", "_75228706", "_7ccf4dcd", "bee9d2b0"].filter(___x => cn.classList.contains(___x)).length > 0) return false;
    return true;
}).map(cn => {
    return cn.childNodes[0].childNodes[0].childNodes[0];
}).filter(cn => {
    if (cn.tagName == "P") return false;
    
    const companyName = cn.getElementsByClassName("e6590096 d2e620b9 _3ff84621 _0b90939f _52b33e66 _1ccd852b _2b366c9a fee11784 _381c41ae a303fa94")[0].innerText;
    const jobName = cn.getElementsByClassName("_407a15d6")[0].children[1].innerText
    
    const arr = ___0.filter(x => jobName.trim() == x.jobName.trim() && companyName.trim() == x.companyName.trim());
    if (arr.length > 0) {
        cn._reason = arr[0].reason;
        return true;
    }
    
    return false;
})

___21 = (ms) => new Promise(resolve => setTimeout(resolve, ms));

___3 = async function() {
    let rs = [];
    for (let i in ___2) {
        console.log(`Killing ${i} of ${___2.length - 1}`)
        let item = ___2[i]
        item.getElementsByClassName("_3bc34f41 _5390511b dae245d1 bff196d8 _69ebbc25 _1ccd852b _10f25334 _14f01a89 bfbadfd0 daf373ac bf9216bb b8796dd2 _0f41423d")[0].click()
        await ___21(___m1);
        item.getElementsByClassName("e6590096 d2e620b9 _320e5786 _3ff84621 _0b90939f _52b33e66 _1ccd852b _2b366c9a _3ef96e40 _381c41ae a303fa94")[0].innerText = item._reason
    }
}

___3()
