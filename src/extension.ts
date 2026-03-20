/*
   Copyright (C) 2018-2021 Gourav Goyal and contributors.

   This file is part of the Shortcut Menu Bar extension.

   The Shortcut Menu Bar extension is free software: you can redistribute it
   and/or modify it under the terms of the GNU Lesser General Public License
   as published by the Free Software Foundation, either version 3 of the
   License, or (at your option) any later version.

   The Shortcut Menu Bar extension is distributed in the hope that it will
   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Lesser General Public License for more details.

   You should have received a copy of the GNU Lesser General Public License along
   with the Shortcut Menu Bar extension. If not,see <https://www.gnu.org/licenses/>.
*/

"use strict";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// let fs = require("fs");
import {
  commands,
  Disposable,
  ExtensionContext,
  window,
} from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  console.log("extension is now active!");

  // rest of code
  // Step: If simple commands then add to this array
  let commandArray = [
    //=> ["name in package.json" , "name of command to execute"]

    [
      "ShortcutMenuBar.toggleTerminal",
      "workbench.action.terminal.toggleTerminal",
    ],
    ["ShortcutMenuBar.navigateBack", "workbench.action.navigateBack"],
    ["ShortcutMenuBar.navigateForward", "workbench.action.navigateForward"],
    [
      "ShortcutMenuBar.compareWithSaved",
      "workbench.files.action.compareWithSaved",
    ],
  ];

  let disposableCommandsArray: Disposable[] = [];
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

  commandArray.forEach((command) => {
    disposableCommandsArray.push(
      commands.registerCommand(command[0], () => {
        commands.executeCommand(command[1]).then(function () {});
      })
    );
  });

  // Step: else add complex command separately

  let disposableBeautify = commands.registerCommand(
    "ShortcutMenuBar.beautify",
    () => {
      let editor = window.activeTextEditor;
      if (!editor) {
        return; // No open text editor
      }

      if (window.state.focused === true && !editor.selection.isEmpty) {
        commands
          .executeCommand("editor.action.formatSelection")
          .then(function () {});
      } else {
        commands
          .executeCommand("editor.action.formatDocument")
          .then(function () {});
      }
    }
  );

  // Adding 1) to a list of disposables which are disposed when this extension is deactivated

  disposableCommandsArray.forEach((i) => {
    context.subscriptions.push(i);
  });

  // Adding 2) to a list of disposables which are disposed when this extension is deactivated

  context.subscriptions.push(disposableBeautify);
}

// this method is called when your extension is deactivated
export function deactivate() {}
