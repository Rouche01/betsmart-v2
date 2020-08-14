import React from 'react';
import Header from './header/header';
import Footer from './footer/footer';

const layout = ({footerBgType, children}) => {
    return(
        <React.Fragment>
            <Header />
            <main>{children}</main>
            <Footer bgType={footerBgType} />
        </React.Fragment>
    );
}

export default layout;