import react from "react"
import Header from "./header"
import Footer from "./footer"

const Layout = (props) => {

    return(
        <div>
            <Header />
                <main style={{minHeight: "80vh"}}>{props.children}</main>
            <Footer />
        </div>
    )
}

export default Layout