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

    // loading pages
    LoadingStarted = "Loading Started",
    LoadingFailed = "Loading Failed",
    LoadingSuccess = "Loading Success",
}

/**
 * The parameters allowed for creating popup pages.
 */
export type PopupHelpPageParams =
        { page: Exclude<PopupHelpPage, PopupHelpPage.LoadingStarted | PopupHelpPage.LoadingFailed | PopupHelpPage.LoadingSuccess> } |
        { page: PopupHelpPage.LoadingStarted, location?: string } | // can give the location of the workspace being loaded
        { page: PopupHelpPage.LoadingFailed,  location?: string, error?: string } | // can give the location of the workspace being loaded and the error that caused it to fail to load
        { page: PopupHelpPage.LoadingSuccess, location?: string } // can give the location of the workspace being loaded
;

/**
 * @param params The new help page to switch to.
 * @param params The parameters for the page.
 * @returns The div for the given help page.
 */
export function popupHelpPageDiv(params: PopupHelpPage | PopupHelpPageParams): ReactElement {
    let _params = (typeof params === "string" ? { page: params } : params);

    let pageNameCleaned = _params.page.replaceAll(" ", "");

    // get popup content
    let content = popupHelpPageContent(_params);
    if (content === null) {
        return <></>; // no popup
    }

    return (<div>
        <div className={`HelpPopup HelpPopup-${pageNameCleaned}`}>
            {_params.page !== PopupHelpPage.LoadingStarted &&
                <button className="Xmark" onClick={() => APP.setPopupHelpPage(PopupHelpPage.None)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>}
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
 * @param params The parameters to give to the popup page.
 * @param className Any React classes that should be put on the button.
 * @returns A button that goes to the specified popup page.
 */
function goTo(page: PopupHelpPage | PopupHelpPageParams, buttonContent?: string, className: string = ""): ReactElement {
    let pageName = (typeof page === "string" ? page : page.page );
    return (<button
        className={className}
        onClick={() => APP.setPopupHelpPage(page)}>
        {buttonContent ? buttonContent : pageName}
    </button>);
}

/**
 * Gets the content of a popup page.
 * @param params The page to get content for.
 * @param params The parameters for the popup page.
 * @returns Returns the content of the given page or null if the popup should be closed.
 */
function popupHelpPageContent(params:PopupHelpPageParams): ReactElement | null {
    // the parameters of the page

    if (params.page === PopupHelpPage.None) {
        return null;
    } else if (params.page === PopupHelpPage.Home) {
        return <div>
            <h1>Motion Comparator</h1>
            <p>Motion Comparator is a web-based tool that help you visualize, understand, compare, and communicate robot motion data. </p>
            <br></br>
            <h3>Key Features</h3>
            <ul>
                <li>3D scenes</li>
                <li>Time-series plots</li>
                <li>Scrubbale timeline bar</li>
                <li>Object trace in Cartesian space</li>
                <li>Quaternion trace to encode an object&#39;s orientations</li>
                <li>UMAP graph of robot joint states</li>
                <li>Time warping to temporally align two motions</li>
                <li>Juxtaposition, superposition, and explicit encoding designs</li>
                <li>Sharable layout</li>
            </ul>
            <br></br>
            <h3>  Panels </h3>
            Panels are modular visualization interfaces that can be configured and arranged into customizable layouts. Each panel have its own help page. 
            <ul>
                <li>{goTo(PopupHelpPage.LoadAndSavePanel, "Load&Save panel")} loads or saves motion data.  </li>
                <li>{goTo(PopupHelpPage.SelectionPanel, "Selection panel")} serves as a road map of all loaded motions. You can create 3D scenes, traces, and various visualization using this panel.</li>
                <li>{goTo(PopupHelpPage.GraphPanel, "Graph panel")} visualizes robot motion in time-series plots.</li>
                <li>{goTo(PopupHelpPage.GraphOptionPanel, "Graph option panel")} customizes the graph panel.</li>
                <li>{goTo(PopupHelpPage.SceneOptionPanel, "3D scene option panel")} customizes the 3D scene, e.g., lighting, background color, or specifiy time-warping objectives.</li>
                <li>{goTo(PopupHelpPage.RobotOptionPanel, "Robot option panel")} customizes the robot or in a 3D scene.</li>           
            </ul>
            <br></br>
            <h3> Customizable Layout </h3>
            [Some gifs to show how to customize layout]

        </div>;
    } else if (params.page === PopupHelpPage.SelectionPanel) {
        return <div>
            <h1>Selection Panel</h1>
            <p>{goTo(PopupHelpPage.Home, "Home")}</p>
            <p> This panel lists out all motion data in the workspace. Each motion data may involve multiple robots or objects. </p>
            <h3> Open a 3D scene </h3>
            <p> You can visualize a motion in a 3D scene by clicking and draging the motion name. </p>
            [A gif to show how to open a 3D scene]
            <h3> Add a ghost robot a 3D scene </h3>
            <p> You can a ghost robot by clicking and draging the robot name. </p>
            [A gif to show how to add a ghost robot]
            <h3> Add a trace </h3>
            <p> You can add a trace of a robot part or an object by clicking and draging its name. </p>
            [A gif to show how to add a trace]
        </div>;
    } else if (params.page === PopupHelpPage.GraphPanel) {
        return <div>
            <h1>Graph Panel</h1>
            <p>{goTo(PopupHelpPage.Home, "Home")}</p>
            <p> This panel contains time-series plots. </p>
            <h3> Add a line</h3>
            <p> You can add a line by clicking and draging a robot part or an object from the {goTo(PopupHelpPage.SelectionPanel, "Selection Panel")}. </p>
            [A gif to show how to add a line]
            <h3> Open a legend </h3>
            [a gif to show how to click and drag to open a legend].
        </div>;
    } else if (params.page === PopupHelpPage.SceneOptionPanel) { 
        return <div>
            
        </div>;
    }
    else if (params.page === PopupHelpPage.LoadAndSavePanel) {
        return <div>
            <h1>Load and Save Panel</h1>
            <p>{goTo(PopupHelpPage.Home, "Home")}</p>
            <h3> Workspace </h3>

            <h3> Robot motions </h3>
        </div>;
    } else if (params.page === PopupHelpPage.LoadingStarted) {
        return <div className="LoadingMessage">
            <p>Loading workspace{/*(params.location ? ` from ${params.location}` : null)*/}. Please wait a few seconds...</p>
        </div>;
    } else if (params.page === PopupHelpPage.LoadingSuccess) {
        return null; // just close the popup
    } else if (params.page === PopupHelpPage.LoadingFailed) {
        return <div className="LoadingFailed">
            <p>Failed to load workspace{(params.location ? `from ${params.location}` : null)}.</p>
            {/*(params.error ? <p>Error: {params.error}.</p> : null)*/}
        </div>;
    } else {
        APP.error(`popupHelpPageContent missed a case: "${params}"`);
        return null; // no popup
    }
}
