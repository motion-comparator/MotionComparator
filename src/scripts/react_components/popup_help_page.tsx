import { ReactElement } from "react";
import { APP } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


/**
 * An enum denoting what page of the popups should currently be shown.
 */
export enum PopupHelpPage {
    /** There should currently be no popup shown. */
    None = "None",
    /** The home popup help page shoud be shown. */
    Home = "Home Page",
    LoadAndSavePanel = "Load and Save Panel",
    DifferenceGraphPanel = "Difference Graph Panel",
    GraphOptionPanel = "Graph Option Panel",
    GraphPanel = "Graph Panel",
    UmapGraphOptionPanel = "Umap Graph Option Panel",
    UmapGraphPanel = "Umap Graph Panel",
    TimeWarpedGraphPanel = "Time Warped Graph Panel",
    SelectionPanel = "Selection Panel",
    RobotOptionPanel = "Robot Option Panel",
    QSceneOptionPanel = "QScene Option Panel",
    SceneOptionPanel = "Scene Option Panel",
}

/**
 * @param page The new help page to switch to.
 * @returns The div for the given help page.
 */
export function popupHelpPageDiv(page: PopupHelpPage): ReactElement {
    let pageNameCleaned = page.replaceAll(" ", "");

    // get popup content
    let content = popupHelpPageContent(page);
    if (content === null) {
        return <></>; // no popup
    }

    return (<div>
        <div className={`HelpPopup HelpPopup-${pageNameCleaned}`}>
            <button className="Xmark" onClick={() => APP.setPopupHelpPage(PopupHelpPage.None)}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="content">
                {content}
            </div>
        </div>
        <div className="overlay"></div>
    </div>);
}

/**
 * Creates and returns a new button that will go to the given popup page.
 * @param page The page to go to when this button is clicked.
 * @param buttonContent The text that the button will display.
 * @param className Any React classes that should be put on the button.
 * @returns A button that goes to the specified popup page.
 */
function goTo(page: PopupHelpPage, buttonContent?: string, className: string = ""): ReactElement {
    return (<button
            className={className}
            onClick={() => APP.setPopupHelpPage(page)}>
        {buttonContent ? buttonContent : page}
    </button>);
}

/**
 * Gets the content of a popup page.
 * @param page The page to get content for.
 * @returns Returns the content of the given page or null if the popup should be closed.
 */
function popupHelpPageContent(page: PopupHelpPage): ReactElement | null {
    if (page === PopupHelpPage.None) {
        return null;
    } else if (page === PopupHelpPage.Home) {
        return <div>
            <h1>Home</h1>
            <p>You can {goTo(PopupHelpPage.SelectionPanel, "select robots")}.</p>
            <p>You can {goTo(PopupHelpPage.GraphPanel, "graph robot motions.")}.</p>
        </div>;
    } else if (page === PopupHelpPage.SelectionPanel) {
        return <div>
            <h1>Selection Panel</h1>
            <p>{goTo(PopupHelpPage.Home, "Home")}</p>
            <p>You can {goTo(PopupHelpPage.SelectionPanel, "select robots")}.</p>
            <p>You can {goTo(PopupHelpPage.GraphPanel, "graph robot motions.")}.</p>
        </div>;
    } else if (page === PopupHelpPage.GraphPanel) {
        return <div>
            <h1>Graph Panel</h1>
            <p>{goTo(PopupHelpPage.Home, "Home")}</p>
            <p>You can {goTo(PopupHelpPage.SelectionPanel, "select robots")}.</p>
            <p>You can {goTo(PopupHelpPage.GraphPanel, "graph robot motions.")}.</p>
        </div>;
    } else {
        APP.error(`popupHelpPageContent missed a case: "${page}"`);
        return null; // no popup
    }
}
