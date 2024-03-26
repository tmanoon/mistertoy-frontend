import { Accordion } from "../cmps/Accordion";

export function AboutUs() {
    return (
        <section>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>

            <Accordion title="First Lorem">
                <h1>Title!</h1>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem debitis labore earum omnis eum iusto natus eos cum nihil, fugiat soluta aut vel rem quod. Dolore porro reiciendis commodi illum?
                <button>Save</button>
            </Accordion>
            <Accordion title="First Lorem">
                <h1>Title!</h1>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem debitis labore earum omnis eum iusto natus eos cum nihil, fugiat soluta aut vel rem quod. Dolore porro reiciendis commodi illum?
                <button>Save</button>
            </Accordion>
            <Accordion title="First Lorem">
                <h1>Title!</h1>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem debitis labore earum omnis eum iusto natus eos cum nihil, fugiat soluta aut vel rem quod. Dolore porro reiciendis commodi illum?
                <button>Save</button>
            </Accordion>
        </section>
    )
}
