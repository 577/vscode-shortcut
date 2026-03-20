'use strict';

import { commands, ExtensionContext, window } from 'vscode';

export function activate(context: ExtensionContext) {
  const builtinCommands = [
    ['ShortcutMenuBar.navigateBack', 'workbench.action.navigateBack'],
    ['ShortcutMenuBar.navigateForward', 'workbench.action.navigateForward'],
    ['ShortcutMenuBar.toggleTerminalOn', 'workbench.action.terminal.toggleTerminal'],
    ['ShortcutMenuBar.toggleTerminalOff', 'workbench.action.togglePanel'],
    ['ShortcutMenuBar.togglePrimarySideBarOn', 'workbench.action.toggleSidebarVisibility'],
    ['ShortcutMenuBar.togglePrimarySideBarOff', 'workbench.action.toggleSidebarVisibility'],
    ['ShortcutMenuBar.toggleSecondarySideBarOn', 'workbench.action.toggleAuxiliaryBar'],
    ['ShortcutMenuBar.toggleSecondarySideBarOff', 'workbench.action.toggleAuxiliaryBar'],
  ];

  for (const [name, command] of builtinCommands) {
    context.subscriptions.push(
      commands.registerCommand(name, () => {
        commands.executeCommand(command);
      }),
    );
  }

  context.subscriptions.push(
    commands.registerCommand('ShortcutMenuBar.format', () => {
      const editor = window.activeTextEditor;
      if (!editor) {
        return;
      }
      const command =
        window.state.focused && !editor.selection.isEmpty
          ? 'editor.action.formatSelection'
          : 'editor.action.formatDocument';
      commands.executeCommand(command);
    }),
  );
}

export function deactivate() {}
