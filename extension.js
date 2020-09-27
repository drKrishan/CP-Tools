// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const com = {
  ComponetsPath: "Components",
  StyleSheetPath: "StyleSheets",
};
const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath + "/src";
const projectName = vscode.workspace.workspaceFolders[0].name;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "cp-tools" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "cp-tools.cpCom",
    function () {
      // The code you place here will be executed every time your command is executed
      //const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
      //console.log(vscode.workspace.workspaceFolders[0].name);

      async function showInputBox() {
        const fileName = await vscode.window.showInputBox({
          placeHolder: "Please Enter the Componenet Name Only",
        });
        console.log(fileName);
        //console.log(vscode.window.showInformationMessage(`${fileName}.js`);

        const jsContent = `
		import React from 'react'
		import "${
      com.StyleSheetPath === ""
        ? `./${fileName}.css`
        : `../${com.StyleSheetPath}/${fileName}.css`
    }"
		
		
		function ${fileName}() {
			return (
				<div className="${
          fileName.substring(0, 1).toLowerCase() +
          fileName.substring(1, fileName.length)
        }">
					
				</div>
			)
		}
		
		export default ${fileName};`;

        const cssContent = `/*This is your CSS content  for ${fileName}.css*/`;
        writefile(folderPath, fileName, com.ComponetsPath, jsContent, "js");
        writefile(folderPath, fileName, com.StyleSheetPath, cssContent, "css");
      }

      function writefile(folderPath, fileName, subFilepath, content, ext) {
        fs.writeFile(
          subFilepath === ""
            ? path.join(folderPath, `${fileName}.${ext}`)
            : path.join(folderPath, subFilepath, `${fileName}.${ext}`),
          content,
          (err) => {
            if (err) {
              console.log(err);
              return vscode.window.showErrorMessage(
                `Failed to create File >> ${fileName}.${ext}`
              );
            }
            vscode.window.showInformationMessage(
              `File >> ${fileName}.${ext}  Successfully Created`
            );
          }
        );
      }

      showInputBox();
    }
  );

  context.subscriptions.push(disposable);

  //--------------------------------------------------

  let disposable1 = vscode.commands.registerCommand(
    "cp-tools.cpState",
    function () {
      const StateProviderContent = `
	  	import React, { createContext, useContext, useReducer } from "react";

		//Prepare the dataLayer
		export const StateContext = createContext();
		
		//Wrap our app and provide Data layer
		export const StateProvider = ({ reducer, initialState, children }) => (
		  <StateContext.Provider value={useReducer(reducer, initialState)}>
			{children}
		  </StateContext.Provider>
		);
		
		//Pull the Data
		export const useStateValue = () => useContext(StateContext);
		`;

      const ReducerContent = `export const initialState = {
			//Include the State here
		  };
		  
		  export const actionTypes = {
			KEY: "VALUE",
		  };
		  
		  const reducer = (state, action) => {
			console.log(action);
			switch (action.type) {
			  case actionTypes.KEY:
				return {
				 // Code Something Fun
				};
		  
			  default:
				return state;
			}
		  };
		  
		  export default reducer;
		  `;

      //const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

      writefile(folderPath, "StateProvider", "", StateProviderContent, "js");
      writefile(folderPath, "Reducer", "", ReducerContent, "js");

      function writefile(folderPath, fileName, subFilepath, content, ext) {
        fs.writeFile(
          subFilepath === ""
            ? path.join(folderPath, `${fileName}.${ext}`)
            : path.join(folderPath, subFilepath, `${fileName}.${ext}`),
          content,
          (err) => {
            if (err) {
              console.log(err);
              return vscode.window.showErrorMessage(
                `Failed to create File >> ${fileName}.${ext}`
              );
            }
            vscode.window.showInformationMessage(
              `File >> ${fileName}.${ext}  Successfully Created`
            );
          }
        );
      }
    }
  );

  context.subscriptions.push(disposable1);

  let disposable2 = vscode.commands.registerCommand(
    "cp-tools.cpFire",
    function () {
      const FireBaseContent = `
	  import firebase from "firebase";

	  const firebaseConfig = {
		
	  };
	  
	  const firebaseApp = firebase.initializeApp(firebaseConfig);
	  const db = firebaseApp.firestore();
	  const auth = firebase.auth();
	  
	  export { db, auth };
	  `;

      //const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

      writefile(folderPath, "Firebase", "", FireBaseContent, "js");

      function writefile(folderPath, fileName, subFilepath, content, ext) {
        fs.writeFile(
          subFilepath === ""
            ? path.join(folderPath, `${fileName}.${ext}`)
            : path.join(folderPath, subFilepath, `${fileName}.${ext}`),
          content,
          (err) => {
            if (err) {
              console.log(err);
              return vscode.window.showErrorMessage(
                `Failed to create File >> ${fileName}.${ext}`
              );
            }
            vscode.window.showInformationMessage(
              `File >> ${fileName}.${ext}  Successfully Created`
            );
          }
        );
      }
    }
  );

  context.subscriptions.push(disposable2);

  let disposable3 = vscode.commands.registerCommand(
    "cp-tools.cpInit",
    function () {
      //const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
      console.log(vscode.workspace.workspaceFolders[1]);
      deleteFile(folderPath, "App.test.js");
      deleteFile(folderPath, "logo.svg");
      deleteFile(folderPath, "setupTests.js");
      deleteFile(folderPath, "index.js");
      deleteFile(folderPath, "index.css");
      deleteFile(folderPath, "App.js");
      deleteFile(folderPath, "App.css");

      if (com.ComponetsPath !== "") {
        CreateFolder(folderPath, com.ComponetsPath);
        CreateFolder(folderPath, com.StyleSheetPath);
      } else {
        vscode.window.showInformationMessage(
          "No directry Created, Using Src as Directry"
        );
      }

      const AppJsContent = `
		import React from 'react'
		import "${
      com.StyleSheetPath === ""
        ? `./App.css`
        : `../${com.StyleSheetPath}/App.css`
    }"
		
		
		function App() {
			return (
				<div className="app">
					<h1> Lets Build ${projectName} together 🚀🚀🚀 !!!</h1>
				</div>
			)
		}
		
		export default App;`;

      const IndexJsContent = `
		import React from "react";
		import ReactDOM from "react-dom";
		import "./index.css";
		import App from ${
      com.ComponetsPath === "" ? `"./App"` : `"./${com.ComponetsPath}/App"`
    };
		import * as serviceWorker from "./serviceWorker";
		
		ReactDOM.render(
		  <React.StrictMode>
			<App />
		  </React.StrictMode>,
		  document.getElementById("root")
		);
		
		// If you want your app to work offline and load faster, you can change
		// unregister() to register() below. Note this comes with some pitfalls.
		// Learn more about service workers: https://bit.ly/CRA-PWA
		serviceWorker.unregister();
		`;

      const indexCSSContent = `* {
			margin: 0;
		  }
		  
		  body {
			margin: 0;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
			  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
			  sans-serif;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		  }
		  
		  code {
			font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
			  monospace;
		  }
		  `;

      const AppCssContent = `/*CSS file for App.css*/`;

      writefile(folderPath, "App", com.ComponetsPath, AppJsContent, "js");

      writefile(folderPath, "App", com.StyleSheetPath, AppCssContent, "css");

      writefile(folderPath, "index", "", IndexJsContent, "js");
      writefile(folderPath, "index", "", indexCSSContent, "css");

      function CreateFolder(folderPath, folderName) {
        fs.mkdir(path.join(folderPath, folderName), (err) => {
          if (err) {
            console.log(err);
            vscode.window.showErrorMessage(
              `Failed to Create New directory >> ${folderName}`
            );
          } else {
            vscode.window.showInformationMessage(
              `New Directory ( ${folderName})Succssfully Created`
            );
            console.log("New directory  successfully created.");
          }
        });
      }

      function deleteFile(folderPath, fileName) {
        fs.unlink(path.join(folderPath, fileName), (err) => {
          if (err) {
            console.log(err);
            return vscode.window.showErrorMessage(
              `Failed to DeleteFile >> ${fileName}`
            );
          }

          vscode.window.showInformationMessage(
            ` ${fileName} Deleted Successsfully`
          );
        });
      }

      //   writefile(folderPath, "Firebase", "", FireBaseContent, "js");

      function writefile(folderPath, fileName, subFilepath, content, ext) {
        fs.writeFile(
          subFilepath === ""
            ? path.join(folderPath, `${fileName}.${ext}`)
            : path.join(folderPath, subFilepath, `${fileName}.${ext}`),
          content,
          (err) => {
            if (err) {
              console.log(err);
              return vscode.window.showErrorMessage(
                `Failed to create File >> ${fileName}.${ext}`
              );
            }
            vscode.window.showInformationMessage(
              `File >> ${fileName}.${ext}  Successfully Created`
            );
          }
        );
      }
    }
  );

  context.subscriptions.push(disposable3);

  let disposable4 = vscode.commands.registerCommand(
    "cp-tools.cpChange",
    function () {
      if (com.ComponetsPath === "") {
        com.ComponetsPath = "Components";
        com.StyleSheetPath = "StyleSheets";
        vscode.window.showInformationMessage(
          "Directry Changed to Components & StyleSheets"
        );
      } else {
        com.ComponetsPath = "";
        com.StyleSheetPath = "";
        vscode.window.showInformationMessage("Directry Changed to Src");
      }
    }
  );

  context.subscriptions.push(disposable4);

  let disposable5 = vscode.commands.registerCommand(
    "cp-tools.cpAxios",
    function () {
      const AxiosContent = `
	  	import axios from "axios";

		const instance = axios.create({
		baseURL: "ENTER_BASE_URL",
		});

		export default instance;

	  `;

      //const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

      writefile(folderPath, "axios", "", AxiosContent, "js");

      function writefile(folderPath, fileName, subFilepath, content, ext) {
        fs.writeFile(
          subFilepath === ""
            ? path.join(folderPath, `${fileName}.${ext}`)
            : path.join(folderPath, subFilepath, `${fileName}.${ext}`),
          content,
          (err) => {
            if (err) {
              console.log(err);
              return vscode.window.showErrorMessage(
                `Failed to create File >> ${fileName}.${ext}`
              );
            }
            vscode.window.showInformationMessage(
              `File >> ${fileName}.${ext}  Successfully Created`
            );
          }
        );
      }
    }
  );

  context.subscriptions.push(disposable5);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
