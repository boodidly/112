interface CommandResult {
  output: string;
  type: 'terminal' | 'ai' | 'browser';
}

export async function executeCommand(command: string): Promise<CommandResult> {
  if (!command) {
    throw new Error('No command provided');
  }

  // Handle AI assistant commands
  if (command.startsWith('/ai')) {
    return {
      output: command.substring(4),
      type: 'ai'
    };
  }

  // Handle terminal commands
  if (command === 'terminal') {
    return {
      output: 'Terminal initialized\n$ _',
      type: 'terminal'
    };
  }

  // Simulate command execution in browser
  try {
    let output = '';
    
    // Basic command simulation
    switch (command.toLowerCase()) {
      case 'help':
        output = `Available commands:
  help     - Show this help message
  clear    - Clear the terminal
  /ai      - Send message to AI assistant
  terminal - Switch to terminal view\n`;
        break;
      
      case 'clear':
        output = '';
        break;
        
      default:
        output = `Command not found: ${command}\nType 'help' for available commands\n`;
    }

    return {
      output,
      type: 'terminal'
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Command execution failed: ${errorMessage}`);
  }
}