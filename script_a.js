___m2 = function({filename="", text="", label=""} = {}) {
  const button = document.createElement("button");

  button.textContent = label;

  Object.assign(button.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "999999",
    padding: "14px 22px",
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)"
  });

  button.addEventListener("click", () => {
    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    button.remove();
  });

  document.body.appendChild(button);

  return button;
}
___m1 = 5000
___0 = [];
___1 = document.getElementsByClassName("_75228706 _8a3a6f88 _9d763823 c62a27b1 _3f96ff52 _0d2d5ee0 _92864457 _67866338 _6a309aaf _77cf1b78 _0781da1b _0f41423d _3b42afd3")[0];

___2 = Array.from(___1.childNodes).filter(cn => {
    if (["_1e443747", "f7f2db8f", "_75228706", "_7ccf4dcd", "bee9d2b0"].filter(___x => cn.classList.contains(___x)).length > 0) return false;
    return true;
}).map(cn => {
    return cn.childNodes[0].childNodes[0].childNodes[0];
}).filter(cn => {
    if (cn.tagName == "P") return false;
    if (cn.getElementsByClassName("_3bc30ca8 _3b42afd3").length > 1) return false;
    return true;
})

___21 = (ms) => new Promise(resolve => setTimeout(resolve, ms));

___3 = async function() {
    let rs = [];
    for (let i in ___2) {
        try {
            console.log(`Loading ${i} of ${___2.length - 1}`)
            let item = ___2[i]
            item.click();
            await ___21(___m1);
            document.getElementsByClassName("_4e88d095 _694cee6a _77402215 dc5107e8 _9133a18d _7c492b7f _45de1ec9 _8bf40b42 c86a2eee _6a309aaf dae245d1 _3ef96e40 _156e4ad2 b0de4d6c _31b8c99a")[0].click();
            await ___21(100);
            rs.push(
                {
                    jobName: item.getElementsByClassName("_407a15d6")[0].children[1].innerText,
                    companyName: item.getElementsByClassName("e6590096 d2e620b9 _3ff84621 _0b90939f _52b33e66 _1ccd852b _2b366c9a fee11784 _381c41ae a303fa94")[0].innerText,
                    description: document.getElementsByClassName("_75228706 deb54ec4 f27679e3 _9d763823 c62a27b1 ca9510cb d71b598c _7c466880 ffa98c5a _3b42afd3")[0].children[2].innerText,
                    jobUrl: document.getElementsByClassName("e6590096 _3293afb7 _3ff84621 _0b90939f _4434babe _1ccd852b _2b366c9a fee11784 _381c41ae _91345936")[0]?.children[0]?.href || item.querySelector('a[href*="/jobs/view/"]')?.href || ""
                }
            )
        } catch (e) {console.log(e)}
    }
    
    ___m2({
        filename: `LinkedIn_jobs_${Date.now()}.json`,
        text: JSON.stringify(rs),
        label: "Download"
    })
}

___3().then(d => console.log(d))
