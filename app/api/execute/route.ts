import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const SAFE_COMMANDS = new Set([
  'python3',
  'node',
  'cat',
  'ls',
  'pwd',
  'echo',
  'date',
  'uptime'
]);

const isSafeCommand = (command: string): boolean => {
  const baseCommand = command.trim().split(' ')[0];
  return SAFE_COMMANDS.has(baseCommand);
};

const sanitizeCommand = (command: string): string => {
  return command.replace(/[;&|`$]/g, '');
};

export async function POST(request: Request) {
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { message: 'Content-Type must be application/json' },
        { status: 415, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { command } = body;
    
    if (!command) {
      return NextResponse.json(
        { message: 'No command provided', output: 'Error: No command provided' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const sanitizedCommand = sanitizeCommand(command);

    if (!isSafeCommand(sanitizedCommand)) {
      return NextResponse.json(
        { 
          message: 'Command not allowed for security reasons',
          output: 'Error: Command not allowed for security reasons'
        },
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { stdout, stderr } = await execAsync(sanitizedCommand, {
      timeout: 5000,
      maxBuffer: 1024 * 1024,
      env: { ...process.env, PYTHONUNBUFFERED: '1' }
    });

    return NextResponse.json({
      output: stdout || stderr || 'Command executed successfully'
    }, { 
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Command execution error:', errorMessage);
    
    return NextResponse.json(
      { 
        message: 'Command execution failed',
        output: `Error: ${errorMessage}`
      },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export const dynamic = 'force-dynamic';