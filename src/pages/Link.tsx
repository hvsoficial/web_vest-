import React, { FormEvent, useState } from "react"



const LinkMap: React.FC = () => {

    const separatorLink = "@"

    const [link, setLink] = useState('')

    function handleLink(event: FormEvent) {
        event.preventDefault()
        const abstraction = link.split(separatorLink)
        const link_abstraction = abstraction[1].split(",")

        const lat = link_abstraction[0]
        const lng = link_abstraction[1]


        console.log({ link, link_abstraction, lat, lng })
        return console.log(link_abstraction)


    }

    return (
        <main>
            <form onSubmit={handleLink}>

                <div className="input-block" style={{ marginBottom: '24px' }} onSubmit={handleLink}>
                    <label htmlFor="link">Link <span>Insira o link da localização do local, caso necessite</span></label>
                    <input id="link" value={link} onChange={event => setLink(event.target.value)} />
                </div>
            </form>
        </main>
    )
}

export default LinkMap