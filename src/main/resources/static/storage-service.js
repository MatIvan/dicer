const DICER_PROPS = "dicer-props";
const DEFAULT = {
    name: "DicerUser",
    theme: "#000000",
}

function setCookies(cookieName, obj) {
    document.cookie = cookieName + "=" + JSON.stringify(obj);
};

function getCookie(name) {
    try {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        if (!matches) {
            return null;
        }
        return JSON.parse(matches[1]);
    } catch (e) {
        console.warn(e);
        return null;
    }
}

function getProps() {
    let props = getCookie(DICER_PROPS);
    if (props) {
        return props;
    };
    return setProps(DEFAULT);
}

function setProps(props) {
    setCookies(DICER_PROPS, props);
    return props;
}

function setName(name) {
    setProps({
        ...getProps(),
        name
    });
}

function setTheme(theme) {
    setProps({
        ...getProps(),
        theme
    });
}

export const StorageService = {
    getProps,
    setName,
    setTheme,
};
